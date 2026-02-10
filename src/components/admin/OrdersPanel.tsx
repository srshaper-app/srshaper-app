'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  shipping_address: string | null;
  pickup: boolean | null;
  coupon_code: string | null;
  discount_cents: number | null;
  subtotal_cents: number | null;
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
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/orders');
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error || 'No se pudieron cargar pedidos');
        return;
      }
      const json = await res.json();
      setOrders(json.orders || []);
      setItems(json.items || []);
    };
    load();
  }, []);

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <h2>Pedidos recientes</h2>
        {error && <p className="admin-error">{error}</p>}
        <div className="admin-list">
          {orders.length === 0 && <p>No hay pedidos registrados.</p>}
          {orders.map((order) => (
            <div key={order.id} className="admin-list-item admin-order">
              <div>
                <strong>{formatMoney(order.total_cents, order.currency)}</strong>
                <p>{order.customer_name || 'Cliente'} · {order.customer_email || 'Sin email'}</p>
                <p>{order.customer_phone || 'Sin teléfono'} · {order.status}</p>
                <p>{order.pickup ? 'Recogida en tienda' : order.shipping_address || 'Sin dirección'}</p>
                {order.coupon_code ? (
                  <p>Cupón: {order.coupon_code} · Descuento {formatMoney(order.discount_cents || 0, order.currency)}</p>
                ) : null}
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
