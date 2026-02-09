'use client';

import { useEffect, useMemo, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type Analytics = {
  uniqueVisitors: number;
  totalImpressions: number;
  avgEngagementTimeSeconds: number;
  sessions: number;
};

type Order = {
  id: string;
  customer_email: string | null;
  status: string;
  total_cents: number;
  currency: string;
  created_at: string;
};

const formatMoney = (value: number, currency: string) => {
  const amount = value / 100;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function StatsPanel() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const load = async () => {
      const analyticsRes = await fetch('/api/analytics');
      if (analyticsRes.ok) {
        const analyticsJson = await analyticsRes.json();
        setAnalytics(analyticsJson);
      }

      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      setOrders(ordersData || []);
    };
    load();
  }, [supabase]);

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <h2>Estadísticas (GA4)</h2>
        {analytics ? (
          <div className="admin-metrics">
            <div>
              <strong>{analytics.uniqueVisitors}</strong>
              <span>Usuarios únicos</span>
            </div>
            <div>
              <strong>{analytics.totalImpressions}</strong>
              <span>Impresiones totales</span>
            </div>
            <div>
              <strong>{analytics.sessions}</strong>
              <span>Sesiones</span>
            </div>
            <div>
              <strong>{analytics.avgEngagementTimeSeconds}s</strong>
              <span>Tiempo de retención</span>
            </div>
          </div>
        ) : (
          <p>Conecta GA4 para ver estadísticas.</p>
        )}
      </section>

      <section className="admin-card">
        <h2>Ventas recientes</h2>
        <div className="admin-list">
          {orders.length === 0 && <p>No hay ventas registradas todavía.</p>}
          {orders.map((order) => (
            <div key={order.id} className="admin-list-item">
              <div>
                <strong>{formatMoney(order.total_cents, order.currency)}</strong>
                <p>{order.customer_email || 'Cliente sin email'} · {order.status}</p>
              </div>
              <span>{new Date(order.created_at).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
