'use client';

import { ProductCard } from '@/components/ProductCard';
import { supabasePublic } from '@/lib/supabase/public';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const QUILLAS_TYPES = ['Single', 'Twin', 'Thruster', 'Quad'] as const;

type Product = {
  id: string; name: string; name_en?: string | null;
  description?: string | null; description_en?: string | null;
  price_cents: number; currency: string; image_url?: string | null; stock?: number | null;
};

export const dynamic = 'force-dynamic';

function QuillasContent() {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const requestedType = searchParams.get('tipo') || '';
  const currentType = QUILLAS_TYPES.find((type) => type.toLowerCase() === requestedType.toLowerCase());
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const subcategories = currentType
      ? [`Quillas - ${currentType}`]
      : ['Quillas', ...QUILLAS_TYPES.map((type) => `Quillas - ${type}`)];
    supabasePublic.from('products').select('*').eq('active', true).eq('category', 'Accesorios')
      .in('subcategory', subcategories).order('created_at', { ascending: false })
      .then(({ data }) => setProducts(data || []));
  }, [currentType]);

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'nav_accesorios')} / {t(lang, 'nav_quillas')}</p>
        <h1>{t(lang, 'quillas_h1')}</h1>
        <p className="lead">{currentType ? `${t(lang, 'quillas_mostrando')} ${currentType}.` : t(lang, 'quillas_lead_all')}</p>
        <details className="category-drop" open>
          <summary>{t(lang, 'quillas_categorias')}</summary>
          <div className="subnav">
            <a href="/accesorios/quillas">{t(lang, 'nav_quillas')}</a>
            <a href="/accesorios/quillas?tipo=single">Single</a>
            <a href="/accesorios/quillas?tipo=twin">Twin</a>
            <a href="/accesorios/quillas?tipo=thruster">Thruster</a>
            <a href="/accesorios/quillas?tipo=quad">Quad</a>
            <a href="/accesorios/wax">{t(lang, 'nav_wax')}</a>
            <a href="/accesorios/fundas">{t(lang, 'nav_fundas')}</a>
            <a href="/accesorios/cuerdas-amarres">{t(lang, 'nav_leashes')}</a>
            <a href="/accesorios/grips">{t(lang, 'nav_grips')}</a>
          </div>
        </details>
      </section>
      <section className="section wave">
        <div className="section-head">
          <h2>{t(lang, 'quillas_disponibles')}</h2>
          <p>{t(lang, 'quillas_disponibles_p')}</p>
        </div>
        <div className="grid cards">
          {products.length ? products.map((p) => (
            <ProductCard key={p.id} {...p} name={lang === 'en' && p.name_en ? p.name_en : p.name} name_en={p.name_en} />
          )) : <p>{t(lang, 'quillas_vacio')}</p>}
        </div>
      </section>
    </main>
  );
}

export default function QuillasPage() {
  return (
    <Suspense>
      <QuillasContent />
    </Suspense>
  );
}
