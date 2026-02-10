import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';

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

  const productIds = items.map((item: { id: string }) => item.id);
  const { data: products, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .in('id', productIds);

  if (error || !products) {
    return NextResponse.json({ error: 'No se pudieron cargar productos' }, { status: 500 });
  }

  const lineItems = items.map((item: { id: string; quantity: number }) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    if ((product.stock ?? 0) < (item.quantity || 1)) {
      throw new Error(`Sin stock suficiente para ${product.name}`);
    }
    return {
      price_data: {
        currency: product.currency.toLowerCase(),
        product_data: {
          name: product.name,
          images: product.image_url ? [product.image_url] : [],
          metadata: {
            product_id: product.id,
          },
        },
        unit_amount: product.price_cents,
      },
      quantity: item.quantity || 1,
    };
  });

  const subtotalCents = items.reduce((acc: number, item: { id: string; quantity: number }) => {
    const product = products.find((p) => p.id === item.id);
    return acc + (product?.price_cents || 0) * (item.quantity || 1);
  }, 0);

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://srshaper-app-tv3i.vercel.app';

    const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : undefined,
    customer_email: customer.email,
    success_url: `${siteUrl}/success`,
    cancel_url: `${siteUrl}/checkout`,
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
