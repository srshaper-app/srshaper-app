'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  fulfillment_status: string | null;
  total_cents: number;
  currency: string;
  stripe_payment_intent_id: string | null;
  created_at: string;
};

type OrderItem = {
  id: string;
  name: string;
  price_cents: number;
  quantity: number;
};

const formatMoney = (value: number, currency: string) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value / 100);
};

export function OrderDetail({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId || orderId === 'undefined') {
      setError('ID de pedido inválido.');
      return;
    }
    const load = async () => {
      const res = await fetch(`/api/orders?id=${orderId}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'No se pudo cargar el pedido');
        return;
      }
      setOrder(data.order);
      setItems(data.items || []);
    };
    load();
  }, [orderId]);

  if (error) {
    return (
      <div className="admin-card">
        <p className="admin-error">{error}</p>
        <Link className="admin-btn ghost" href="/admin/pedidos">Volver</Link>
      </div>
    );
  }

  if (!order) {
    return <div className="admin-card">Cargando pedido...</div>;
  }

  return (
    <div className="admin-grid">
      <div className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Pedido #{order.id.slice(0, 8)}</h2>
            <p>{new Date(order.created_at).toLocaleString()}</p>
          </div>
          <Link className="admin-btn ghost" href="/admin/pedidos">Volver</Link>
        </div>
        <div className="admin-detail-grid">
          <div>
            <h3>Cliente</h3>
            <p>{order.customer_name || 'Cliente'}</p>
            <p>{order.customer_email || 'Sin email'}</p>
            <p>{order.customer_phone || 'Sin teléfono'}</p>
          </div>
          <div>
            <h3>Envío</h3>
            <p>{order.pickup ? 'Recogida en tienda' : order.shipping_address || 'Sin dirección'}</p>
            <p>Estado: {order.fulfillment_status || 'preparando'}</p>
          </div>
          <div>
            <h3>Pago</h3>
            <p>Estado: {order.status}</p>
            <p>Stripe: {order.stripe_payment_intent_id || '-'}</p>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3>Productos</h3>
        <div className="admin-table">
          <div className="admin-table-row admin-table-head">
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Importe</span>
          </div>
          {items.map((item) => (
            <div className="admin-table-row" key={item.id}>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>{formatMoney(item.price_cents, order.currency)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h3>Resumen</h3>
        <div className="admin-detail-summary">
          <div>
            <span>Subtotal</span>
            <strong>{formatMoney(order.subtotal_cents || order.total_cents, order.currency)}</strong>
          </div>
          <div>
            <span>Descuento</span>
            <strong>{formatMoney(order.discount_cents || 0, order.currency)}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>{formatMoney(order.total_cents, order.currency)}</strong>
          </div>
          {order.coupon_code ? <p>Cupón aplicado: {order.coupon_code}</p> : null}
        </div>
      </div>
    </div>
  );
}
