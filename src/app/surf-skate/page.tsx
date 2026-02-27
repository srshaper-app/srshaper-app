'use client';

import { ProductCard } from '@/components/ProductCard';
import { supabasePublic } from '@/lib/supabase/public';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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
  subcategory?: string | null;
};

export const dynamic = 'force-dynamic';

const SURF_SKATE_SUBCATS = ['Surfskates', 'Decks', 'Ejes', 'Ruedas', 'Bushings', 'Rodamientos', 'Accesorios'];

export default function SurfSkatePage() {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get('tipo');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabasePublic
      .from('products')
      .select('*')
      .eq('active', true)
      .eq('category', 'Surf Skate')
      .order('created_at', { ascending: false })
      .then(({ data }) => setAllProducts(data || []));
  }, []);

  // Filter client-side by the ?tipo= query param
  const filteredProducts = tipoParam
    ? allProducts.filter((p) => p.subcategory === tipoParam)
    : allProducts;

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'nav_surf_skate')}</p>
        <h1>{t(lang, 'surfskate_h1')}</h1>
        <p className="lead">
          {tipoParam
            ? `${t(lang, 'surfskate_mostrando')} ${tipoParam}`
            : t(lang, 'surfskate_lead_all')}
        </p>
        <div className="subnav">
          <a href="/surf-skate" className={!tipoParam ? 'active' : ''}>{t(lang, 'surfskate_todos')}</a>
          {SURF_SKATE_SUBCATS.map((s) => (
            <a
              key={s}
              href={`/surf-skate?tipo=${encodeURIComponent(s)}`}
              className={tipoParam === s ? 'active' : ''}
            >
              {s}
            </a>
          ))}
        </div>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>
            {tipoParam
              ? tipoParam
              : t(lang, 'surfskate_disponibles')}
          </h2>
          <p>{t(lang, 'surfskate_disponibles_p')}</p>
        </div>
        <div className="grid cards">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                name={lang === 'en' && product.name_en ? product.name_en : product.name}
                name_en={product.name_en}
              />
            ))
          ) : (
            <p>{t(lang, 'surfskate_vacio')}</p>
          )}
        </div>
      </section>
    </main>
  );
}
