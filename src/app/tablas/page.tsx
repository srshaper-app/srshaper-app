'use client';

import Link from 'next/link';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

export const dynamic = 'force-dynamic';

export default function TablasPage() {
  const { lang } = useLang();

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'nav_tablas')}</p>
        <h1>{t(lang, 'tablas_h1')}</h1>
        <p className="lead">{t(lang, 'tablas_lead')}</p>
        <details className="category-drop" open>
          <summary>{t(lang, 'tablas_modelos_disponibles')}</summary>
          <div className="subnav">
            <a href="/tablas/modelos/princess">Princess</a>
            <a href="/tablas/modelos/gentleman">Gentleman</a>
            <a href="/tablas/modelos/gangster">Gangster</a>
            <a href="/tablas/modelos/shark-attack">Shark Attack</a>
            <a href="/tablas/crea-tu-tabla">{t(lang, 'tablas_crea_medida')}</a>
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>{t(lang, 'tablas_catalogo_h2')}</h2>
          <p>{t(lang, 'tablas_catalogo_p')}</p>
        </div>
        <div className="grid model-grid">
          <Link className="model-card" href="/tablas/modelos/princess">
            <img src="/models/princess.png" alt="Logo del modelo Princess" />
            <h3>Princess</h3>
            <p>Round / Roundpin</p>
            <span className="card-link">{t(lang, 'tablas_ver_modelo')}</span>
          </Link>
          <Link className="model-card" href="/tablas/modelos/gentleman">
            <img src="/models/gentleman.png" alt="Logo del modelo Gentleman" />
            <h3>Gentleman</h3>
            <p>Wider Squash / Bump Squash / Squash</p>
            <span className="card-link">{t(lang, 'tablas_ver_modelo')}</span>
          </Link>
          <Link className="model-card" href="/tablas/modelos/gangster">
            <img src="/models/gangster.png" alt="Logo del modelo Gangster" />
            <h3>Gangster</h3>
            <p>Retro Bonzer / Single</p>
            <span className="card-link">{t(lang, 'tablas_ver_modelo')}</span>
          </Link>
          <Link className="model-card" href="/tablas/modelos/shark-attack">
            <img src="/models/shark-attack.png" alt="Logo del modelo Shark Attack" />
            <h3>Shark Attack</h3>
            <p>Retro Twinzer / Quad</p>
            <span className="card-link">{t(lang, 'tablas_ver_modelo')}</span>
          </Link>
        </div>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>{t(lang, 'tablas_como_comprar_h2')}</h2>
          <p>{t(lang, 'tablas_como_comprar_p')}</p>
        </div>
        <div className="process-grid">
          <article className="process-card">
            <h3>{t(lang, 'tablas_paso1_h3')}</h3>
            <p>{t(lang, 'tablas_paso1_p')}</p>
          </article>
          <article className="process-card">
            <h3>{t(lang, 'tablas_paso2_h3')}</h3>
            <p>{t(lang, 'tablas_paso2_p')}</p>
          </article>
          <article className="process-card">
            <h3>{t(lang, 'tablas_paso3_h3')}</h3>
            <p>{t(lang, 'tablas_paso3_p')}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
