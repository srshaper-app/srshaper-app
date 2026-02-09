'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/components/CartContext';

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Compra confirmada</p>
        <h1>Pago confirmado.</h1>
        <p className="lead">Gracias por tu compra. Te enviaremos el detalle por email.</p>
        <div className="hero-actions">
          <Link className="btn" href="/">Volver al inicio</Link>
          <Link className="btn btn-ghost" href="/tablas/catalogo">Seguir comprando</Link>
        </div>
      </section>
    </main>
  );
}
