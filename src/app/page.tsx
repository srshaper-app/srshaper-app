import Link from 'next/link';
import { NewsletterForm } from '@/components/NewsletterForm';

export const dynamic = 'force-dynamic';

export default async function Home() {
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

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Tablas personalizadas · Envíos a todo el país</p>
          <h1>Diseña tu tabla a medida o elige una de nuestro catálogo para surfear.</h1>
          <p className="lead">
            Priorizamos el shaping personalizado con opciones listas para entrega.
            Todo con estilo surfero, funcional y auténtico.
          </p>
          <div className="hero-actions">
            <Link className="btn" href="/tablas/crea-tu-tabla">Crea tu tabla</Link>
            <Link className="btn btn-ghost" href="/tablas">Comprar tablas</Link>
          </div>
          <div className="badges">
            <span className="badge">Custom shaping</span>
            <span className="badge">Catálogo inmediato</span>
            <span className="badge">Asesoría experta</span>
          </div>
        </div>
        <div className="hero-card">
          <span className="tag">Sesión real · Las Palmas</span>
          <h3>Olas reales, tablas reales</h3>
          <p>
            Nuestra referencia está en el agua: condiciones reales para
            diseñar tablas que respondan de verdad cuando toca surfear.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-small" href="/tablas">Ver tablas</Link>
            <Link className="btn btn-small btn-ghost" href="/tablas/crea-tu-tabla">Crear a medida</Link>
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
          <h2>Modelos de tablas Sr.Shaper</h2>
          <p>Estos son nuestros modelos base. Cada compra inicia fabricación a medida en taller.</p>
        </div>
        <div className="grid model-grid">
          {modelLogos.map((model) => (
            <Link key={model.title} className="model-card" href={model.href || '/tablas'}>
              <img src={model.src} alt={model.alt} />
              <h3>{model.title}</h3>
              <p>{model.description}</p>
              <span className="card-link">Ver modelo</span>
            </Link>
          ))}
        </div>
        <div className="hero-actions" style={{ marginTop: 20 }}>
          <Link className="btn" href="/tablas/crea-tu-tabla">Crea tu tabla</Link>
          <Link className="btn btn-ghost" href="/tablas">Ver todas las tablas</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Accesorios esenciales</h2>
          <p>Quillas, wax, fundas y grips seleccionados para sesiones fuertes.</p>
        </div>
        <div className="grid category-grid">
          <Link className="category" href="/accesorios/quillas">
            <span>Quillas</span>
            <h3>Control + velocidad</h3>
            <p>Sets thruster, twin y quad para cada ola.</p>
          </Link>
          <Link className="category" href="/accesorios/wax">
            <span>Wax</span>
            <h3>Grip inmediato</h3>
            <p>Fórmulas tropical, templada y fría.</p>
          </Link>
          <Link className="category" href="/accesorios/fundas">
            <span>Fundas</span>
            <h3>Viaje seguro</h3>
            <p>Boardbags térmicos y travel bags.</p>
          </Link>
          <Link className="category" href="/accesorios/cuerdas-amarres">
            <span>Leashes</span>
            <h3>Seguridad</h3>
            <p>Leashs reforzados 6' a 9'.</p>
          </Link>
          <Link className="category" href="/accesorios/grips">
            <span>Grips</span>
            <h3>Tracción final</h3>
            <p>Arch bar y kick tail de alto agarre.</p>
          </Link>
        </div>
        <div className="featured featured-media">
          <img
            src="/photos/home/accessories-pack.jpg"
            alt="Tabla y accesorios disponibles en Sr.Shaper"
          />
          <div>
            <h3>Pack Ready</h3>
            <p>Leash + wax + grips para tu próxima sesión.</p>
          </div>
          <Link className="btn btn-small" href="/accesorios">Ver accesorios</Link>
        </div>
      </section>

      <section className="section split">
        <div>
          <h2>Recursos Sr.Shaper</h2>
          <p>
            Guías, recomendaciones y contenido práctico sobre shaping,
            mantenimiento y elección de tablas.
          </p>
          <div className="badges">
            <span className="badge">Guías de shaping</span>
            <span className="badge">Cuidado de tablas</span>
            <span className="badge">Performance</span>
          </div>
          <div className="hero-actions">
            <Link className="btn" href="/academia">Ver contenidos</Link>
            <Link className="btn btn-outline" href="/contacto">Contactar</Link>
          </div>
        </div>
        <div className="quote">
          "Moldeamos a mano cada tabla como si fuera única, porque lo es. Creamos más que equipos;
          esculpimos la conexión entre el surfista y la ola perfecta, donde tu estilo y tu pasión por el mar cobran vida."
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Sesiones del equipo</h2>
          <p>Probamos cada concepto de diseño en el mar, no solo en el taller.</p>
        </div>
        <div className="team-sessions-grid">
          <figure className="team-session-main">
            <img src="/photos/home/canteras-session-1.jpg" alt="Surf en Gran Canaria con tabla shortboard" />
          </figure>
          <figure className="team-session-side team-session-side-top">
            <img src="/photos/home/canteras-session-2.jpg" alt="Surf de alto rendimiento en olas locales" />
          </figure>
          <figure className="team-session-side team-session-side-bottom">
            <img src="/photos/home/canteras-session-1.jpg" alt="Sesión de equipo en olas de Gran Canaria" />
          </figure>
          <figure className="team-session-wide">
            <img src="/photos/home/canteras-session-2.jpg" alt="Sesión de equipo en el mar con olas potentes" />
          </figure>
        </div>
      </section>

      <section className="newsletter">
        <h2>Únete a la comunidad Sr.Shaper</h2>
        <p>Noticias, drops y tips de entrenamiento directo a tu correo.</p>
        <NewsletterForm />
      </section>
    </main>
  );
}
