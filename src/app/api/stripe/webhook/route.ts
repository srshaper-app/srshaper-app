import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type Stripe from 'stripe';

export async function POST(request: Request) {
  const stripe = getStripe();
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Falta firma' }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    });

    const total = session.amount_total || 0;
    const currency = (session.currency || 'usd').toUpperCase();
    const meta = session.metadata || {};
    const discountCents = Number(meta.discount_cents || 0);
    const subtotalCents = Number(meta.subtotal_cents || 0);

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({
        stripe_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
        customer_email: session.customer_details?.email,
        customer_name: meta.customer_name || null,
        customer_phone: meta.customer_phone || null,
        shipping_address: meta.shipping_address || null,
        pickup: meta.pickup === 'true',
        coupon_code: meta.coupon_code || null,
        discount_cents: discountCents || 0,
        subtotal_cents: subtotalCents || total,
        status: 'paid',
        total_cents: total,
        currency,
        fulfillment_status: 'preparando',
      })
      .select('*')
      .single();

    if (!error && order) {
      if (meta.subscribe === 'true' && session.customer_details?.email) {
        await supabaseAdmin
          .from('newsletter_subscribers')
          .upsert(
            {
              name: meta.customer_name || null,
              email: session.customer_details.email,
            },
            { onConflict: 'email' }
          );
      }
      const items = lineItems.data.map((item) => {
        const product = item.price?.product as Stripe.Product | null;
        return {
          order_id: order.id,
          product_id: null,
          name: product?.name || 'Producto',
          price_cents: item.amount_total || 0,
          quantity: item.quantity || 1,
        };
      });
      if (items.length > 0) {
        await supabaseAdmin.from('order_items').insert(items);
      }
    }
  }

  return NextResponse.json({ received: true });
}
