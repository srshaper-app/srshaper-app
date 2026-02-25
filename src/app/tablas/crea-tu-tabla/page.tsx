'use client';

import Link from 'next/link';
import { CustomBoardForm } from '@/components/CustomBoardForm';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

export default function CreaTuTablaPage() {
  const { lang } = useLang();

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'nav_tablas')} / {lang === 'en' ? 'Build your board' : 'Crea tu tabla'}</p>
        <h1>{t(lang, 'crea_h1')}</h1>
        <p className="lead">{t(lang, 'crea_lead')}</p>
        <details className="category-drop" open>
          <summary>{t(lang, 'crea_opciones')}</summary>
          <div className="subnav">
            <Link href="/tablas">{t(lang, 'nav_tablas_todas')}</Link>
            <Link href="/tablas/crea-tu-tabla">{t(lang, 'nav_tablas_crea')}</Link>
          </div>
        </details>
        <div className="media-banner">
          <img src="/photos/custom/workshop-shaping-4.jpg" alt="Shaper trabajando una tabla a medida en el taller" />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{t(lang, 'crea_proceso_h2')}</h2>
          <p>{t(lang, 'crea_proceso_p')}</p>
        </div>
        <div className="process-grid">
          <article className="process-card">
            <img src="/photos/custom/workshop-shaping-2.jpg" alt="Medición inicial del blank antes del shape" />
            <h3>{t(lang, 'crea_paso1_h3')}</h3>
            <p>{t(lang, 'crea_paso1_p')}</p>
          </article>
          <article className="process-card">
            <img src="/photos/custom/workshop-shaping-1.jpg" alt="Ajuste manual de líneas y curvas en la tabla" />
            <h3>{t(lang, 'crea_paso2_h3')}</h3>
            <p>{t(lang, 'crea_paso2_p')}</p>
          </article>
          <article className="process-card">
            <img src="/photos/custom/workshop-shaping-3.jpg" alt="Blank de tabla listo en banco de trabajo del taller" />
            <h3>{t(lang, 'crea_paso3_h3')}</h3>
            <p>{t(lang, 'crea_paso3_p')}</p>
          </article>
        </div>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>{t(lang, 'crea_brief_h2')}</h2>
          <p>{t(lang, 'crea_brief_p')}</p>
        </div>
        <CustomBoardForm />
      </section>
    </main>
  );
}
