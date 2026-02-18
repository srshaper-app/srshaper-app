import Link from 'next/link';
import { headers } from 'next/headers';
import { ProductDetailClient } from '@/components/ProductDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProductoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hdrs = await headers();
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host');
  const proto = hdrs.get('x-forwarded-proto') || 'https';
  const baseUrl = host ? `${proto}://${host}` : 'https://srshaper-app-tv3i.vercel.app';

  const res = await fetch(`${baseUrl}/api/product?id=${id}`, { cache: 'no-store' });
  const json = await res.json().catch(() => ({}));
  const product = json.product;

  if (!product || !product.active) {
    return (
      <main>
        <section className="page-hero">
          <p className="breadcrumb">Producto no encontrado</p>
          <h1>No encontramos este producto.</h1>
          <p className="lead">ID: {id}</p>
          {json?.error && <p className="lead">Error: {json.error}</p>}
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
        <p className="lead preserve-lines">{product.description}</p>
      </section>

      <section className="section split">
        <div className="media-banner product-detail-media">
          <img src={product.image_url || '/logo-srshaper.svg'} alt={product.name} />
        </div>
        <div>
          <div className="badges">
            <span className="badge">{product.category}</span>
            <span className="badge">{product.subcategory}</span>
            {product.stock === 0 && <span className="badge danger">Agotado</span>}
            {product.stock > 0 && product.stock < 3 && (
              <span className="badge warn">Quedan pocas unidades</span>
            )}
          </div>
          <div className="hero-actions">
            <span className="price">€{(product.price_cents / 100).toFixed(0)}</span>
            <ProductDetailClient
              id={product.id}
              name={product.name}
              price_cents={product.price_cents}
              currency={product.currency}
              image_url={product.image_url}
              stock={product.stock}
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
