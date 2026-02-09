import Link from 'next/link';

export default function CartPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Carrito</p>
        <h1>Tu carrito</h1>
        <p className="lead">Revisa tu selección desde el botón de carrito en la barra superior.</p>
        <div className="hero-actions">
          <Link className="btn" href="/">Volver al inicio</Link>
          <Link className="btn btn-ghost" href="/accesorios">Ver accesorios</Link>
        </div>
      </section>
    </main>
  );
}
