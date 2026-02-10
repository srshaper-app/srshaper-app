import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const { data: orders, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: items, error: itemsError } = await supabaseAdmin
    .from('order_items')
    .select('*');

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ orders: orders || [], items: items || [] });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!body.id || !body.status) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }
  const { error } = await supabaseAdmin
    .from('orders')
    .update({ fulfillment_status: body.status })
    .eq('id', body.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
