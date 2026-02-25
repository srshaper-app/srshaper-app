import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { BOARD_MODELS } from '@/lib/boardCatalog';
import { getPrimaryProductImage } from '@/lib/productImages';

type CheckoutItemPayload = {
  id: string;
  quantity: number;
  name?: string;
  price_cents?: number;
  currency?: string;
  image_url?: string | null;
  variant?: string;
  custom_board?: boolean;
  model_slug?: string;
  outline?: string;
  measure?: string;
};

type StripeLineItem = {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      images: string[];
      metadata: Record<string, string>;
    };
    unit_amount: number;
  };
  quantity: number;
};

type ProductRow = {
  id: string;
  name: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  stock: number | null;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://srshaper-app-tv3i.vercel.app';

export async function POST(request: Request) {
  const stripe = getStripe();
  const { items, customer, shipping, coupon, subscribe } = await request.json();

  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: 'Items inválidos' }, { status: 400 });
  }
  if (!customer?.name || !customer?.email || !customer?.phone) {
    return NextResponse.json({ error: 'Datos de cliente incompletos' }, { status: 400 });
  }
  if (!shipping?.pickup && !shipping?.address?.line1) {
    return NextResponse.json({ error: 'Dirección de envío requerida' }, { status: 400 });
  }

  const payloadItems = items as CheckoutItemPayload[];
  const standardItems = payloadItems.filter((item) => !item.custom_board);
  const productIds = standardItems.map((item) => item.id);
  let products: ProductRow[] = [];
  if (productIds.length > 0) {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .in('id', productIds);
    if (error || !data) {
      return NextResponse.json({ error: 'No se pudieron cargar productos' }, { status: 500 });
    }
    products = data;
  }

  let subtotalCents = 0;
  let lineItems: StripeLineItem[] = [];
  try {
    lineItems = payloadItems.map((item) => {
      const quantity = Math.max(1, item.quantity || 1);

      if (item.custom_board) {
        const slug = (item.model_slug || '').toLowerCase();
        const model = BOARD_MODELS[slug];
        if (!model) {
          throw new Error('Modelo de tabla no válido');
        }
        const outline = item.outline || '';
        const measure = item.measure || '';
        const outlineOption = model.outlineOptions.find((opt) => opt.label === outline);

        if (!outlineOption) {
          throw new Error(`Outline no válido para ${model.name}`);
        }
        if (!model.measures.includes(measure)) {
          throw new Error(`Medida no válida para ${model.name}`);
        }

        const unitAmount = outlineOption.price_cents;
        subtotalCents += unitAmount * quantity;
        const displayName = `${model.name} · ${outline} · ${measure}`;

        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: displayName,
              images: model.image ? [`${SITE_URL}${model.image}`] : [],
              metadata: {
                product_id: '',
                custom_board: 'true',
                model_slug: model.slug,
                outline,
                measure,
              },
            },
            unit_amount: unitAmount,
          },
          quantity,
        };
      }

      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      if ((product.stock ?? 0) < quantity) {
        throw new Error(`Sin stock suficiente para ${product.name}`);
      }
      subtotalCents += product.price_cents * quantity;

      return {
        price_data: {
          currency: product.currency.toLowerCase(),
          product_data: {
            name: item.variant ? `${product.name} · ${item.variant}` : product.name,
            images: product.image_url ? [getPrimaryProductImage(product.image_url)] : [],
            metadata: {
              product_id: product.id,
              custom_board: 'false',
              model_slug: '',
              outline: item.outline || '',
              measure: item.measure || '',
            },
          },
          unit_amount: product.price_cents,
        },
        quantity,
      };
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Items inválidos';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  let discountCents = 0;
  let couponCode: string | null = null;
  let stripeCouponId: string | null = null;

  if (typeof coupon === 'string' && coupon.trim()) {
    const code = coupon.trim().toUpperCase();
    const { data: couponRow } = await supabaseAdmin
      .from('coupons')
      .select('*')
      .eq('code', code)
      .eq('active', true)
      .maybeSingle();

    const now = new Date();
    if (couponRow) {
      const startsAt = couponRow.starts_at ? new Date(couponRow.starts_at) : null;
      const endsAt = couponRow.ends_at ? new Date(couponRow.ends_at) : null;
      if ((!startsAt || startsAt <= now) && (!endsAt || endsAt >= now)) {
        if (couponRow.type === 'percent' && couponRow.percent_off) {
          discountCents = Math.round(subtotalCents * (couponRow.percent_off / 100));
          const created = await stripe.coupons.create({
            percent_off: couponRow.percent_off,
            duration: 'once',
            name: couponRow.name || couponRow.code,
          });
          stripeCouponId = created.id;
        }
        if (couponRow.type === 'fixed' && couponRow.amount_off_cents) {
          discountCents = Math.min(subtotalCents, couponRow.amount_off_cents);
          const created = await stripe.coupons.create({
            amount_off: couponRow.amount_off_cents,
            currency: 'eur',
            duration: 'once',
            name: couponRow.name || couponRow.code,
          });
          stripeCouponId = created.id;
        }
        couponCode = code;
      }
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : undefined,
    customer_email: customer.email,
    success_url: `${SITE_URL}/success`,
    cancel_url: `${SITE_URL}/checkout`,
    metadata: {
      customer_name: customer.name,
      customer_phone: customer.phone,
      pickup: shipping?.pickup ? 'true' : 'false',
      shipping_address: shipping?.pickup
        ? 'RECOGIDA EN TIENDA'
        : `${shipping?.address?.line1 || ''} ${shipping?.address?.line2 || ''}, ${shipping?.address?.city || ''}, ${shipping?.address?.region || ''}, ${shipping?.address?.postalCode || ''}, ${shipping?.address?.country || ''}`,
      coupon_code: couponCode || '',
      discount_cents: String(discountCents),
      subtotal_cents: String(subtotalCents),
      subscribe: subscribe ? 'true' : 'false',
    },
  });

  return NextResponse.json({ url: session.url });
}
