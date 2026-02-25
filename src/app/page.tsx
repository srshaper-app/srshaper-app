'use client';

import Link from 'next/link';
import { NewsletterForm } from '@/components/NewsletterForm';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

export const dynamic = 'force-dynamic';

const modelLogos = [
  {
    src: '/models/princess.png',
    alt: 'Logo del modelo Princess',
    title: 'Princess',
    description: 'Round / Roundpin',
    href: '/tablas/modelos/princess',
  },
  {
    src: '/models/gentleman.png',
    alt: 'Logo del modelo Gentleman',
    title: 'Gentleman',
    description: 'Wider Squash / Bump Squash / Squash',
    href: '/tablas/modelos/gentleman',
  },
  {
    src: '/models/gangster.png',
    alt: 'Logo del modelo Gangster',
    title: 'Gangster',
    description: 'Retro Bonzer / Single',
    href: '/tablas/modelos/gangster',
  },
  {
    src: '/models/shark-attack.png',
    alt: 'Logo del modelo Shark Attack',
    title: 'Shark Attack',
    description: 'Retro Twinzer / Quad',
    href: '/tablas/modelos/shark-attack',
  },
];

export default function Home() {
  const { lang } = useLang();

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">{t(lang, 'home_eyebrow')}</p>
          <h1>{t(lang, 'home_h1')}</h1>
          <p className="lead">{t(lang, 'home_lead')}</p>
          <div className="hero-actions">
            <Link className="btn" href="/tablas/crea-tu-tabla">{t(lang, 'home_cta_crea')}</Link>
            <Link className="btn btn-ghost" href="/tablas">{t(lang, 'home_cta_compra')}</Link>
          </div>
          <div className="badges">
            <span className="badge">{t(lang, 'home_badge_custom')}</span>
            <span className="badge">{t(lang, 'home_badge_catalogo')}</span>
            <span className="badge">{t(lang, 'home_badge_asesoria')}</span>
          </div>
        </div>
        <div className="hero-card">
          <span className="tag">{t(lang, 'home_card_tag')}</span>
          <h3>{t(lang, 'home_card_h3')}</h3>
          <p>{t(lang, 'home_card_p')}</p>
          <div className="hero-actions">
            <Link className="btn btn-small" href="/tablas">{t(lang, 'home_card_ver')}</Link>
            <Link className="btn btn-small btn-ghost" href="/tablas/crea-tu-tabla">{t(lang, 'home_card_crear')}</Link>
          </div>
          <img
            src="/photos/home/canteras-session-1.jpg"
            alt="Sesión de surf en Las Palmas de Gran Canaria"
          />
          <p style={{ fontSize: 12, color: '#4b5a60' }}>Foto real de sesión en Gran Canaria.</p>
        </div>
      </section>

      <section className="strip">
        <div>Shaping artesanal</div>
        <div>Pagos seguros</div>
        <div>Soporte experto</div>
        <div>Garantía 12 meses</div>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>{t(lang, 'home_modelos_h2')}</h2>
          <p>{t(lang, 'home_modelos_p')}</p>
        </div>
        <div className="grid model-grid">
          {modelLogos.map((model) => (
            <Link key={model.title} className="model-card" href={model.href || '/tablas'}>
              <img src={model.src} alt={model.alt} />
              <h3>{model.title}</h3>
              <p>{model.description}</p>
              <span className="card-link">{t(lang, 'home_modelos_ver')}</span>
            </Link>
          ))}
        </div>
        <div className="hero-actions" style={{ marginTop: 20 }}>
          <Link className="btn" href="/tablas/crea-tu-tabla">{t(lang, 'home_cta_crea')}</Link>
          <Link className="btn btn-ghost" href="/tablas">{t(lang, 'home_modelos_cta_ver')}</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{t(lang, 'home_accesorios_h2')}</h2>
          <p>{t(lang, 'home_accesorios_p')}</p>
        </div>
        <div className="grid category-grid">
          <Link className="category" href="/accesorios/quillas">
            <span>{t(lang, 'nav_quillas')}</span>
            <h3>Control + velocidad</h3>
            <p>Sets thruster, twin y quad para cada ola.</p>
          </Link>
          <Link className="category" href="/accesorios/wax">
            <span>{t(lang, 'nav_wax')}</span>
            <h3>Grip inmediato</h3>
            <p>Fórmulas tropical, templada y fría.</p>
          </Link>
          <Link className="category" href="/accesorios/fundas">
            <span>{t(lang, 'nav_fundas')}</span>
            <h3>Viaje seguro</h3>
            <p>Boardbags térmicos y travel bags.</p>
          </Link>
          <Link className="category" href="/accesorios/cuerdas-amarres">
            <span>{t(lang, 'nav_leashes')}</span>
            <h3>Seguridad</h3>
            <p>Leashs reforzados 6&apos; a 9&apos;.</p>
          </Link>
          <Link className="category" href="/accesorios/grips">
            <span>{t(lang, 'nav_grips')}</span>
            <h3>Tracción final</h3>
            <p>Arch bar y kick tail de alto agarre.</p>
          </Link>
        </div>
        <div className="featured featured-media">
          <img
            src="/photos/home/accessories-pack.png"
            alt="Pack de leashes, wax y grips en Sr.Shaper"
          />
          <div>
            <h3>Pack Ready</h3>
            <p>Leash + wax + grips para tu próxima sesión.</p>
          </div>
          <Link className="btn btn-small" href="/accesorios">{t(lang, 'nav_accesorios')}</Link>
        </div>
      </section>

      <section className="section split">
        <div>
          <h2>{t(lang, 'home_recursos_h2')}</h2>
          <p>{t(lang, 'home_recursos_p')}</p>
          <div className="badges">
            <span className="badge">Guías de shaping</span>
            <span className="badge">Cuidado de tablas</span>
            <span className="badge">Performance</span>
          </div>
          <div className="hero-actions">
            <Link className="btn" href="/academia">{t(lang, 'home_recursos_cta')}</Link>
            <Link className="btn btn-outline" href="/contacto">{t(lang, 'nav_contacto')}</Link>
          </div>
        </div>
        <div className="quote">
          &quot;Moldeamos a mano cada tabla como si fuera única, porque lo es. Creamos más que equipos;
          esculpimos la conexión entre el surfista y la ola perfecta, donde tu estilo y tu pasión por el mar cobran vida.&quot;
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{t(lang, 'home_sesiones_h2')}</h2>
          <p>{t(lang, 'home_sesiones_p')}</p>
        </div>
        <div className="team-sessions-grid">
          <figure>
            <img src="/photos/home/team-session-1.jpg" alt="Sesión de surf del equipo en Gran Canaria" />
          </figure>
          <figure>
            <img src="/photos/home/team-session-2.jpg" alt="Proceso de shaping en el taller Sr.Shaper" />
          </figure>
          <figure>
            <img src="/photos/home/team-session-3.jpg" alt="Olas potentes en sesión de prueba del equipo" />
          </figure>
          <figure>
            <img src="/photos/home/team-session-4.jpg" alt="Ajuste de plantilla durante el shaping artesanal" />
          </figure>
        </div>
      </section>

      <section className="newsletter">
        <h2>{t(lang, 'newsletter_h2')}</h2>
        <p>{t(lang, 'newsletter_p')}</p>
        <NewsletterForm />
      </section>
    </main>
  );
}
