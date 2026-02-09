import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  const { items } = await request.json();

  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: 'Items inválidos' }, { status: 400 });
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
    return {
      price_data: {
        currency: product.currency.toLowerCase(),
        product_data: {
          name: product.name,
          images: product.image_url ? [product.image_url] : [],
        },
        unit_amount: product.price_cents,
      },
      quantity: item.quantity || 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
