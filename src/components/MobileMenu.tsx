'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        className={`mobile-toggle ${open ? 'open' : ''}`}
        type="button"
        aria-label="Abrir menú"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`mobile-menu-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span>Menú</span>
          <button type="button" onClick={() => setOpen(false)}>Cerrar</button>
        </div>
        <nav className="mobile-menu-links">
          <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
          <span className="mobile-group">Accesorios</span>
          <Link href="/accesorios" onClick={() => setOpen(false)}>Todos los accesorios</Link>
          <Link href="/accesorios/quillas" onClick={() => setOpen(false)}>Quillas</Link>
          <Link href="/accesorios/wax" onClick={() => setOpen(false)}>Wax</Link>
          <Link href="/accesorios/fundas" onClick={() => setOpen(false)}>Fundas</Link>
          <Link href="/accesorios/cuerdas-amarres" onClick={() => setOpen(false)}>Cuerdas amarres</Link>
          <Link href="/accesorios/grips" onClick={() => setOpen(false)}>Grips</Link>
          <span className="mobile-group">Tablas</span>
          <Link href="/tablas" onClick={() => setOpen(false)}>Todas las tablas</Link>
          <Link href="/tablas/catalogo" onClick={() => setOpen(false)}>Catálogo</Link>
          <Link href="/tablas/crea-tu-tabla" onClick={() => setOpen(false)}>Crea tu tabla</Link>
          <Link href="/academia" onClick={() => setOpen(false)}>Academia</Link>
          <Link href="/sobre-nosotros" onClick={() => setOpen(false)}>Sobre nosotros</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
        </nav>
      </aside>
    </>
  );
}
