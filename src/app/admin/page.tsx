'use client';

import { useEffect, useMemo, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  subcategory: string | null;
  price_cents: number;
  currency: string;
  image_url: string | null;
  active: boolean;
};

type Order = {
  id: string;
  customer_email: string | null;
  status: string;
  total_cents: number;
  currency: string;
  created_at: string;
};

type Analytics = {
  uniqueVisitors: number;
  totalImpressions: number;
  avgEngagementTimeSeconds: number;
  sessions: number;
};

const formatMoney = (value: number, currency: string) => {
  const amount = value / 100;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function AdminPage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Accesorios',
    subcategory: 'Quillas',
    price_cents: 0,
    currency: 'USD',
    image_url: '',
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!session) return;

    const loadData = async () => {
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      setProducts(productsData || []);

      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      setOrders(ordersData || []);

      const analyticsRes = await fetch('/api/analytics');
      if (analyticsRes.ok) {
        const analyticsJson = await analyticsRes.json();
        setAnalytics(analyticsJson);
      }
    };

    loadData();
  }, [session, supabase]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data, error } = await supabase.from('products').insert({
      ...newProduct,
      price_cents: Number(newProduct.price_cents),
    }).select('*');
    if (error) {
      setError(error.message);
      return;
    }
    setProducts([...(data || []), ...products]);
    setNewProduct({
      name: '',
      description: '',
      category: 'Accesorios',
      subcategory: 'Quillas',
      price_cents: 0,
      currency: 'USD',
      image_url: '',
    });
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      setError(error.message);
      return;
    }
    setProducts(products.filter((product) => product.id !== id));
  };

  if (!session) {
    return (
      <main style={{ padding: '60px 6vw' }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>Panel Admin Sr.Shaper</h1>
        <p style={{ marginBottom: 24 }}>Acceso restringido.</p>
        <form onSubmit={handleLogin} style={{ display: 'grid', gap: 12, maxWidth: 380 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          {error && <span style={{ color: 'crimson' }}>{error}</span>}
        </form>
      </main>
    );
  }

  return (
    <main style={{ padding: '60px 6vw', display: 'grid', gap: 40 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 32, marginBottom: 6 }}>Panel Admin Sr.Shaper</h1>
          <p>Gestiona ventas, catálogo y estadísticas reales.</p>
        </div>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>

      <section>
        <h2 style={{ marginBottom: 12 }}>Estadísticas (GA4)</h2>
        {analytics ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            <div style={{ padding: 16, borderRadius: 12, border: '1px solid #e1e1e1' }}>
              <strong>{analytics.uniqueVisitors}</strong>
              <p>Usuarios únicos</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, border: '1px solid #e1e1e1' }}>
              <strong>{analytics.totalImpressions}</strong>
              <p>Impresiones totales</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, border: '1px solid #e1e1e1' }}>
              <strong>{analytics.sessions}</strong>
              <p>Sesiones</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, border: '1px solid #e1e1e1' }}>
              <strong>{analytics.avgEngagementTimeSeconds}s</strong>
              <p>Tiempo de retención</p>
            </div>
          </div>
        ) : (
          <p>Conecta GA4 para ver estadísticas.</p>
        )}
      </section>

      <section>
        <h2 style={{ marginBottom: 12 }}>Ventas recientes</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {orders.length === 0 && <p>No hay ventas registradas todavía.</p>}
          {orders.map((order) => (
            <div key={order.id} style={{ padding: 16, borderRadius: 12, border: '1px solid #e1e1e1' }}>
              <strong>{formatMoney(order.total_cents, order.currency)}</strong>
              <p>{order.customer_email || 'Cliente sin email'} · {order.status}</p>
              <small>{new Date(order.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: 12 }}>Catálogo</h2>
        <form onSubmit={handleAddProduct} style={{ display: 'grid', gap: 10, marginBottom: 20, maxWidth: 520 }}>
          <input
            placeholder="Nombre"
            value={newProduct.name}
            onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })}
            required
          />
          <input
            placeholder="Descripción"
            value={newProduct.description}
            onChange={(event) => setNewProduct({ ...newProduct, description: event.target.value })}
          />
          <input
            placeholder="Categoría"
            value={newProduct.category}
            onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}
          />
          <input
            placeholder="Subcategoría"
            value={newProduct.subcategory}
            onChange={(event) => setNewProduct({ ...newProduct, subcategory: event.target.value })}
          />
          <input
            placeholder="Precio (centavos)"
            type="number"
            value={newProduct.price_cents}
            onChange={(event) => setNewProduct({ ...newProduct, price_cents: Number(event.target.value) })}
          />
          <input
            placeholder="URL imagen"
            value={newProduct.image_url}
            onChange={(event) => setNewProduct({ ...newProduct, image_url: event.target.value })}
          />
          <button type="submit">Agregar producto</button>
        </form>

        <div style={{ display: 'grid', gap: 12 }}>
          {products.map((product) => (
            <div key={product.id} style={{ padding: 16, borderRadius: 12, border: '1px solid #e1e1e1', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{product.name}</strong>
                <p>{product.category} · {product.subcategory}</p>
                <small>{formatMoney(product.price_cents, product.currency)}</small>
              </div>
              <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
            </div>
          ))}
        </div>
      </section>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </main>
  );
}
