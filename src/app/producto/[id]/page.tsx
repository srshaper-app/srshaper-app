import Link from 'next/link';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import { supabasePublic } from '@/lib/supabase/public';

export const dynamic = 'force-dynamic';

export default async function ProductoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: product, error } = await supabasePublic
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('active', true)
    .single();

  if (!product) {
    return (
      <main>
        <section className="page-hero">
          <p className="breadcrumb">Producto no encontrado</p>
          <h1>No encontramos este producto.</h1>
          <p className="lead">ID: {id}</p>
          {error?.message && <p className="lead">Error: {error.message}</p>}
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
            <span className="price">
              {new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: product.currency || 'EUR',
                maximumFractionDigits: 2,
              }).format((product.price_cents || 0) / 100)}
            </span>
            <ProductDetailClient
              id={product.id}
              name={product.name}
              price_cents={product.price_cents}
              currency={product.currency}
              image_url={product.image_url}
              stock={product.stock}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
