'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type AdminShellProps = {
  children: React.ReactNode;
  title: string;
};

export function AdminShell({ children, title }: AdminShellProps) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (loading) {
    return <main className="admin-loading">Cargando panel...</main>;
  }

  if (!session) {
    return (
      <main className="admin-login">
        <div className="admin-login-card">
          <h1>Panel Admin Sr.Shaper</h1>
          <p>Acceso restringido para administración.</p>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="admin-btn">Entrar</button>
            {error && <span className="admin-error">{error}</span>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/logo-srshaper.svg" alt="Sr.Shaper" />
          <div>
            <strong>Sr.Shaper</strong>
            <span>Admin</span>
          </div>
        </div>
        <nav>
          <Link className={pathname === '/admin/estadisticas' ? 'active' : ''} href="/admin/estadisticas">
            Estadísticas
          </Link>
          <Link className={pathname === '/admin/productos' ? 'active' : ''} href="/admin/productos">
            Productos
          </Link>
          <Link className={pathname === '/admin/pedidos' ? 'active' : ''} href="/admin/pedidos">
            Pedidos
          </Link>
          <Link className={pathname === '/admin/newsletter' ? 'active' : ''} href="/admin/newsletter">
            Newsletter
          </Link>
        </nav>
        <Link className="admin-store-link" href="/" target="_blank" rel="noreferrer">
          Ver tienda
        </Link>
        <button className="admin-logout" onClick={handleLogout}>Cerrar sesión</button>
      </aside>
      <section className="admin-content">
        <header className="admin-topbar">
          <div>
            <h1>{title}</h1>
            <p>Panel interno para control de ventas y catálogo.</p>
          </div>
        </header>
        <div className="admin-page">{children}</div>
      </section>
    </div>
  );
}
