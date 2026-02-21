import Link from 'next/link';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import { ProductImageGallery } from '@/components/ProductImageGallery';
import { supabasePublic } from '@/lib/supabase/public';
import { parseProductImageUrls, getPrimaryProductImage } from '@/lib/productImages';

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

  const productImages = parseProductImageUrls(product.image_url);
  const primaryImage = getPrimaryProductImage(product.image_url);
  const subcategoryLabel =
    typeof product.subcategory === 'string'
      ? product.subcategory.replace('Quillas - ', 'Quillas · ')
      : product.subcategory;

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {product.category} / {subcategoryLabel}</p>
        <h1>{product.name}</h1>
        <p className="lead preserve-lines">{product.description}</p>
      </section>

      <section className="section split">
        <div className="media-banner product-detail-media">
          <ProductImageGallery images={productImages.length ? productImages : [primaryImage]} name={product.name} />
        </div>
        <div>
          <div className="badges">
            <span className="badge">{product.category}</span>
            <span className="badge">{subcategoryLabel}</span>
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
              image_url={primaryImage}
              stock={product.stock}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
