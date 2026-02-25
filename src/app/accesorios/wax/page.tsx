'use client';

import { ProductCard } from '@/components/ProductCard';
import { supabasePublic } from '@/lib/supabase/public';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';
import { useEffect, useState } from 'react';

type Product = {
  id: string; name: string; name_en?: string | null;
  description?: string | null; description_en?: string | null;
  price_cents: number; currency: string; image_url?: string | null; stock?: number | null;
};

export const dynamic = 'force-dynamic';

export default function WaxPage() {
  const { lang } = useLang();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabasePublic.from('products').select('*').eq('active', true).eq('category', 'Accesorios')
      .eq('subcategory', 'Wax').order('created_at', { ascending: false })
      .then(({ data }) => setProducts(data || []));
  }, []);

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'nav_accesorios')} / {t(lang, 'nav_wax')}</p>
        <h1>{t(lang, 'wax_h1')}</h1>
        <p className="lead">{t(lang, 'wax_lead')}</p>
        <details className="category-drop" open>
          <summary>{t(lang, 'quillas_categorias')}</summary>
          <div className="subnav">
            <a href="/accesorios/quillas">{t(lang, 'nav_quillas')}</a>
            <a href="/accesorios/wax">{t(lang, 'nav_wax')}</a>
            <a href="/accesorios/fundas">{t(lang, 'nav_fundas')}</a>
            <a href="/accesorios/cuerdas-amarres">{t(lang, 'nav_leashes')}</a>
            <a href="/accesorios/grips">{t(lang, 'nav_grips')}</a>
          </div>
        </details>
      </section>
      <section className="section wave">
        <div className="section-head">
          <h2>{t(lang, 'wax_disponibles')}</h2>
          <p>{t(lang, 'wax_disponibles_p')}</p>
        </div>
        <div className="grid cards">
          {products.length ? products.map((p) => (
            <ProductCard key={p.id} {...p} name={lang === 'en' && p.name_en ? p.name_en : p.name} name_en={p.name_en} />
          )) : <p>{t(lang, 'wax_vacio')}</p>}
        </div>
      </section>
    </main>
  );
}
