import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('custom_board_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ requests: data || [] });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const payload = {
    name: body.name?.trim(),
    email: body.email?.trim(),
    phone: body.phone?.trim() || null,
    wave_type: body.wave_type || null,
    level: body.level || null,
    message: body.message?.trim() || null,
  };

  if (!payload.name || !payload.email) {
    return NextResponse.json({ error: 'Nombre y email requeridos' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('custom_board_requests').insert(payload);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
