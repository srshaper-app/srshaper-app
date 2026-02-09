'use client';

import { useEffect, useMemo, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type Order = {
  id: string;
  customer_email: string | null;
  status: string;
  total_cents: number;
  currency: string;
  created_at: string;
};

type OrderItem = {
  id: string;
  order_id: string;
  name: string;
  price_cents: number;
  quantity: number;
};

const formatMoney = (value: number, currency: string) => {
  const amount = value / 100;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function OrdersPanel() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      setOrders(ordersData || []);

      const { data: itemsData } = await supabase
        .from('order_items')
        .select('*');
      setItems(itemsData || []);
    };
    load();
  }, [supabase]);

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <h2>Pedidos recientes</h2>
        <div className="admin-list">
          {orders.length === 0 && <p>No hay pedidos registrados.</p>}
          {orders.map((order) => (
            <div key={order.id} className="admin-list-item admin-order">
              <div>
                <strong>{formatMoney(order.total_cents, order.currency)}</strong>
                <p>{order.customer_email || 'Cliente sin email'} · {order.status}</p>
                <small>{new Date(order.created_at).toLocaleString()}</small>
              </div>
              <div className="admin-order-items">
                {(items || [])
                  .filter((item) => item.order_id === order.id)
                  .map((item) => (
                    <span key={item.id}>
                      {item.name} × {item.quantity}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
