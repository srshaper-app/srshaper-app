export default function SobreNosotrosPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Sobre nosotros</p>
        <h1>Nacimos en la orilla.</h1>
        <p className="lead">Somos shapers, surfistas y entrenadores con la misma obsesión: la ola perfecta.</p>
      </section>

      <section className="section split">
        <div>
          <h2>Historia Sr.Shaper</h2>
          <p>
            Empezamos en un taller pequeño, con foam, resina y muchas
            madrugadas frente al mar. Hoy combinamos diseño artesanal con
            tecnología para entregar tablas rápidas, resistentes y con estilo.
          </p>
          <div className="badges">
            <span className="badge">Shaping artesanal</span>
            <span className="badge">Taller local</span>
            <span className="badge">Comunidad surfer</span>
          </div>
        </div>
        <div className="media-banner">
          <img src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1400&q=80" alt="Equipo surfer" />
        </div>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Nuestros valores</h2>
          <p>Calidad, respeto por el océano y atención cercana.</p>
        </div>
        <div className="grid cards">
          <article className="card">
            <h3>Diseño con propósito</h3>
            <p>Tablas ajustadas a tu peso, estilo y spot preferido.</p>
          </article>
          <article className="card">
            <h3>Materiales responsables</h3>
            <p>Espumas y resinas de menor impacto.</p>
          </article>
          <article className="card">
            <h3>Comunidad primero</h3>
            <p>Clínicas, sesiones y encuentros mensuales.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
