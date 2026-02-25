'use client';

import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

export default function AcademiaPage() {
  const { lang } = useLang();
  const coming = t(lang, 'academia_proximamente');

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'nav_academia')}</p>
        <h1>{t(lang, 'academia_h1')}</h1>
        <p className="lead">{t(lang, 'academia_lead')}</p>
      </section>
      <section className="section wave">
        <div className="section-head">
          <h2>{t(lang, 'academia_disponibles')}</h2>
          <p>{t(lang, 'academia_disponibles_p')}</p>
        </div>
        <div className="grid cards">
          <article className="card">
            <h3>{t(lang, 'nav_academia_shape')}</h3>
            <p>{coming}</p>
          </article>
          <article className="card">
            <h3>{t(lang, 'nav_academia_laminacion')}</h3>
            <p>{coming}</p>
          </article>
          <article className="card">
            <h3>{t(lang, 'nav_academia_glassing')}</h3>
            <p>{coming}</p>
          </article>
          <article className="card">
            <h3>{t(lang, 'nav_academia_completo')}</h3>
            <p>{coming}</p>
          </article>
          <article className="card">
            <h3>{t(lang, 'nav_academia_reparacion')}</h3>
            <p>{coming}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
