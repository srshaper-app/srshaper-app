'use client';

import Link from 'next/link';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

export default function CartPage() {
  const { lang } = useLang();

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'cart_h1')}</p>
        <h1>{t(lang, 'cart_h1')}</h1>
        <p className="lead">{t(lang, 'cart_lead')}</p>
        <div className="hero-actions">
          <Link className="btn" href="/">{t(lang, 'cart_volver')}</Link>
          <Link className="btn btn-ghost" href="/accesorios">{t(lang, 'cart_ver_accesorios')}</Link>
        </div>
      </section>
    </main>
  );
}
