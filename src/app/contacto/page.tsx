'use client';

import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

export default function ContactoPage() {
  const { lang } = useLang();

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / {t(lang, 'nav_contacto')}</p>
        <h1>{t(lang, 'contacto_h1')}</h1>
        <p className="lead">{t(lang, 'contacto_lead')}</p>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>{t(lang, 'contacto_whatsapp_h2')}</h2>
          <p>{t(lang, 'contacto_whatsapp_p')}</p>
        </div>
        <div className="contact-actions" style={{ marginTop: 16 }}>
          <a className="btn btn-whatsapp" href="https://wa.me/34603124611" target="_blank" rel="noreferrer">
            {t(lang, 'contacto_whatsapp_btn')}
          </a>
        </div>
      </section>

      <section className="section split">
        <div>
          <h2>{t(lang, 'contacto_email_h2')}</h2>
          <p>{t(lang, 'contacto_email_p')}</p>
          <div className="badges" style={{ marginTop: 12 }}>
            <span className="badge">sr.shapersurfboards@gmail.com</span>
            <span className="badge">603 124 611</span>
            <span className="badge">Calle Mary Sanchez 41 bajo</span>
          </div>
          <div className="contact-actions" style={{ marginTop: 16 }}>
            <a className="btn btn-instagram" href="https://www.instagram.com/sr.shaper/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
        <div className="contact-side-stack">
          <div className="contact-map">
            <iframe
              title="Ubicación Sr.Shaper"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=28.47763,-16.24780&z=16&output=embed"
            />
            <a
              className="btn btn-outline"
              href="https://www.google.com/maps?q=28.47763,-16.24780"
              target="_blank"
              rel="noreferrer"
            >
              {lang === 'en' ? 'Open in map' : 'Abrir en mapa'}
            </a>
          </div>
          <div className="contact-logo-showcase">
            <img src="/logo-srshaper.svg" alt="Logo Sr.Shaper" />
          </div>
        </div>
      </section>
    </main>
  );
}
