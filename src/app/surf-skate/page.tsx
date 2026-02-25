'use client';

import { ProductCard } from '@/components/ProductCard';
import { supabasePublic } from '@/lib/supabase/public';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';
import { useEffect, useState } from 'react';

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

export default function SurfSkatePage() {
  const { lang } = useLang();
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

  const subcategories = Array.from(
    new Set(allProducts.map((p) => p.subcategory).filter((s): s is string => Boolean(s)))
  );

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'nav_surf_skate')}</p>
        <h1>{t(lang, 'surfskate_h1')}</h1>
        <p className="lead">{t(lang, 'surfskate_lead_all')}</p>
        <details className="category-drop" open>
          <summary>{t(lang, 'surfskate_categorias')}</summary>
          <div className="subnav">
            <a href="/surf-skate">{t(lang, 'surfskate_todos')}</a>
            {subcategories.map((s) => (
              <a key={s} href={`/surf-skate?tipo=${encodeURIComponent(s)}`}>{s}</a>
            ))}
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>{t(lang, 'surfskate_disponibles')}</h2>
          <p>{t(lang, 'surfskate_disponibles_p')}</p>
        </div>
        <div className="grid cards">
          {allProducts.length ? (
            allProducts.map((product) => (
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
