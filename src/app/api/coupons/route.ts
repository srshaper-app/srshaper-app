import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('coupons')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ coupons: data || [] });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => ({}));
  const code = typeof body.code === 'string' ? body.code.trim().toUpperCase() : null;
  if (!code) {
    return NextResponse.json({ error: 'Código requerido' }, { status: 400 });
  }

  const { data: coupon } = await supabaseAdmin
    .from('coupons')
    .select('*')
    .eq('code', code)
    .eq('active', true)
    .maybeSingle();

  if (!coupon) {
    return NextResponse.json({ valid: false, error: 'Cupón no válido' });
  }

  const now = new Date();
  const startsAt = coupon.starts_at ? new Date(coupon.starts_at) : null;
  const endsAt = coupon.ends_at ? new Date(coupon.ends_at) : null;
  if ((startsAt && startsAt > now) || (endsAt && endsAt < now)) {
    return NextResponse.json({ valid: false, error: 'Cupón fuera de fecha' });
  }

  return NextResponse.json({
    valid: true,
    coupon: {
      code: coupon.code,
      name: coupon.name,
      type: coupon.type,
      percent_off: coupon.percent_off,
      amount_off_cents: coupon.amount_off_cents,
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const code = typeof body.code === 'string' ? body.code.trim().toUpperCase() : null;
  const type = body.type === 'fixed' ? 'fixed' : 'percent';
  const value = Number(body.value);

  if (!code || Number.isNaN(value)) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  const payload: any = {
    code,
    name: body.name || null,
    type,
    percent_off: type === 'percent' ? value : null,
    amount_off_cents: type === 'fixed' ? Math.round(value * 100) : null,
    max_redemptions: body.maxRedemptions ?? null,
    starts_at: body.startsAt ?? null,
    ends_at: body.endsAt ?? null,
    active: body.active ?? true,
  };

  const { error } = await supabaseAdmin.from('coupons').insert(payload);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));
  const id = body.id;
  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const type = body.type === 'fixed' ? 'fixed' : 'percent';
  const value = Number(body.value);
  if (Number.isNaN(value)) {
    return NextResponse.json({ error: 'Valor inválido' }, { status: 400 });
  }

  const payload: any = {
    code: body.code?.trim().toUpperCase(),
    name: body.name || null,
    type,
    percent_off: type === 'percent' ? value : null,
    amount_off_cents: type === 'fixed' ? Math.round(value * 100) : null,
    max_redemptions: body.maxRedemptions ?? null,
    starts_at: body.startsAt ?? null,
    ends_at: body.endsAt ?? null,
    active: body.active ?? true,
  };

  const { error } = await supabaseAdmin
    .from('coupons')
    .update(payload)
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

  const { error } = await supabaseAdmin.from('coupons').delete().eq('id', body.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
