import Link from 'next/link';
import { headers } from 'next/headers';
import { ProductDetailClient } from '@/components/ProductDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProductoDetallePage({ params }: { params: { id: string } }) {
  const hdrs = await headers();
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host');
  const proto = hdrs.get('x-forwarded-proto') || 'https';
  const baseUrl = host ? `${proto}://${host}` : 'https://srshaper-app-tv3i.vercel.app';

  const res = await fetch(`${baseUrl}/api/product?id=${params.id}`, { cache: 'no-store' });
  const json = await res.json();
  const product = json.product;

  if (!product || !product.active) {
    return (
      <main>
        <section className="page-hero">
          <p className="breadcrumb">Producto no encontrado</p>
          <h1>No encontramos este producto.</h1>
          <p className="lead">ID: {params.id}</p>
          <Link className="btn" href="/">Volver al inicio</Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {product.category} / {product.subcategory}</p>
        <h1>{product.name}</h1>
        <p className="lead">{product.description}</p>
      </section>

      <section className="section split">
        <div className="media-banner">
          <img src={product.image_url || '/logo-srshaper.svg'} alt={product.name} />
        </div>
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="badges">
            <span className="badge">{product.category}</span>
            <span className="badge">{product.subcategory}</span>
          </div>
          <div className="hero-actions">
            <span className="price">€{(product.price_cents / 100).toFixed(0)}</span>
            <ProductDetailClient
              id={product.id}
              name={product.name}
              price_cents={product.price_cents}
              currency={product.currency}
              image_url={product.image_url}
            />
          </div>
          <p style={{ marginTop: 16 }}>
            Materiales premium, laminado resistente y diseño probado en olas reales.
          </p>
        </div>
      </section>
    </main>
  );
}
