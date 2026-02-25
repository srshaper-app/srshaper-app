'use client';

import Link from 'next/link';
import { ProductDetailClient } from '@/components/ProductDetailClient';
import { ProductImageGallery } from '@/components/ProductImageGallery';
import { supabasePublic } from '@/lib/supabase/public';
import { parseProductImageUrls, getPrimaryProductImage } from '@/lib/productImages';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';
import { useEffect, useState } from 'react';
import { use } from 'react';

export const dynamic = 'force-dynamic';

type Product = {
  id: string;
  name: string;
  name_en?: string | null;
  description?: string | null;
  description_en?: string | null;
  price_cents: number;
  currency: string;
  image_url?: string | null;
  stock?: number | null;
  category?: string | null;
  subcategory?: string | null;
};

export default function ProductoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang } = useLang();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabasePublic
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single()
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        setProduct(data);
      });
  }, [id]);

  if (!product) {
    return (
      <main>
        <section className="page-hero">
          <p className="breadcrumb">{lang === 'en' ? 'Product not found' : 'Producto no encontrado'}</p>
          <h1>{lang === 'en' ? 'We couldn\'t find this product.' : 'No encontramos este producto.'}</h1>
          {error && <p className="lead">Error: {error}</p>}
          <Link className="btn" href="/">{lang === 'en' ? 'Back to home' : 'Volver al inicio'}</Link>
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

  const displayName = lang === 'en' && product.name_en ? product.name_en : product.name;
  const displayDescription = lang === 'en' && product.description_en ? product.description_en : product.description;

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {product.category} / {subcategoryLabel}</p>
        <h1>{displayName}</h1>
        <p className="lead preserve-lines">{displayDescription}</p>
      </section>

      <section className="section split">
        <div className="media-banner product-detail-media">
          <ProductImageGallery images={productImages.length ? productImages : [primaryImage]} name={displayName} />
        </div>
        <div>
          <div className="badges">
            <span className="badge">{product.category}</span>
            <span className="badge">{subcategoryLabel}</span>
            {product.stock === 0 && <span className="badge danger">{t(lang, 'producto_agotado')}</span>}
            {(product.stock ?? 0) > 0 && (product.stock ?? 0) < 3 && (
              <span className="badge warn">{t(lang, 'producto_pocas')}</span>
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
              name={displayName}
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
