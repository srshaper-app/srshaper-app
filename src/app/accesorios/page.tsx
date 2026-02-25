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

export default function AccesoriosPage() {
  const { lang } = useLang();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabasePublic
      .from('products')
      .select('*')
      .eq('active', true)
      .eq('category', 'Accesorios')
      .order('created_at', { ascending: false })
      .then(({ data }) => setProducts(data || []));
  }, []);

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'nav_accesorios')}</p>
        <h1>{t(lang, 'accesorios_h1')}</h1>
        <p className="lead">{t(lang, 'accesorios_lead')}</p>
        <details className="category-drop" open>
          <summary>{t(lang, 'accesorios_categorias')}</summary>
          <div className="subnav">
            <a href="/accesorios/quillas">{t(lang, 'nav_quillas')}</a>
            <a href="/accesorios/grips">{t(lang, 'nav_grips')}</a>
            <a href="/accesorios/fundas">{t(lang, 'nav_fundas')}</a>
            <a href="/accesorios/wax">{t(lang, 'nav_wax')}</a>
            <a href="/accesorios/cuerdas-amarres">{t(lang, 'nav_leashes')}</a>
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>{t(lang, 'accesorios_disponibles')}</h2>
          <p>{t(lang, 'accesorios_disponibles_p')}</p>
        </div>
        <div className="grid cards">
          {products.length ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                name={lang === 'en' && product.name_en ? product.name_en : product.name}
                name_en={product.name_en}
              />
            ))
          ) : (
            <p>{t(lang, 'accesorios_vacio')}</p>
          )}
        </div>
      </section>
    </main>
  );
}
