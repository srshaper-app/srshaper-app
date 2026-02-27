'use client';

import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

export default function SobreNosotrosPage() {
  const { lang } = useLang();

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'nav_sobre_nosotros')}</p>
        <h1>{t(lang, 'sobre_h1')}</h1>
        <p className="lead">{t(lang, 'sobre_lead')}</p>
      </section>

      <section className="section">
        <div className="split about-section">
          <div>
            <h2>{t(lang, 'sobre_historia_h2')}</h2>
            <p>{t(lang, 'sobre_historia_p1')}</p>
            <p>{t(lang, 'sobre_historia_p2')}</p>
            <p>{t(lang, 'sobre_historia_p3')}</p>
          </div>
          <div className="about-image-card">
            <img
              src="/photos/about/shaper-mint-board.jpg"
              alt="Shaper de Sr.Shaper sosteniendo una tabla en el exterior del taller"
            />
          </div>
        </div>
      </section>

      <section className="section wave">
        <div className="about-section">
          <div>
            <h2>{t(lang, 'sobre_artesania_h2')}</h2>
            <p>{t(lang, 'sobre_artesania_p1')}</p>
            <p>{t(lang, 'sobre_artesania_p2')}</p>
            <p>{t(lang, 'sobre_artesania_p3')}</p>
            <p>{t(lang, 'sobre_artesania_p4')}</p>
          </div>
          <div className="about-gallery-grid">
            <img src="/photos/custom/workshop-shaping-1.jpg" alt="Proceso de shape en el taller Sr.Shaper" />
            <img src="/photos/custom/workshop-shaping-3.jpg" alt="Detalle del shape artesanal en taller" />
            <img src="/photos/custom/workshop-tools.jpg" alt="Herramientas y banco de trabajo del taller" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="about-section">
          <div>
            <h2>{t(lang, 'sobre_mas_h2')}</h2>
            <p>{t(lang, 'sobre_mas_p1')}</p>
            <p>{t(lang, 'sobre_mas_p2')}</p>
          </div>
          <div className="about-gallery-grid">
            <img src="/photos/about/purple-board-beach.png" alt="Tabla personalizada morada en costa rocosa" />
            <img src="/photos/about/green-board-portrait.png" alt="Tabla personalizada verde en mano del shaper" />
            <img src="/photos/about/blue-board-shaper.jpg" alt="Shaper sosteniendo tabla azul con diseño artístico en el taller" />
            <img src="/photos/about/shaper-fish-door.jpg" alt="Shaper con tabla fish verde apoyado en puerta del taller" />
          </div>
        </div>
      </section>
    </main>
  );
}
