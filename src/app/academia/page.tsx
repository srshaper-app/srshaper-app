export default function AcademiaPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Academia</p>
        <h1>Academia Sr.Shaper</h1>
        <p className="lead">Programas diseñados para que avances con seguridad y estilo en el agua.</p>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Programas</h2>
          <p>Clases grupales, coaching personalizado y clinics de maniobras.</p>
        </div>
        <div className="grid cards">
          <article className="card">
            <h3>Iniciación</h3>
            <p>4 clases · técnicas básicas y lectura de ola.</p>
            <span className="price">$180</span>
          </article>
          <article className="card">
            <h3>Progresión</h3>
            <p>6 clases · maniobras y timing.</p>
            <span className="price">$260</span>
          </article>
          <article className="card">
            <h3>Performance</h3>
            <p>Coaching 1:1 · video análisis.</p>
            <span className="price">$340</span>
          </article>
        </div>
      </section>

      <section className="section split">
        <div>
          <h2>Equipo de coaches</h2>
          <p>
            Surfistas certificados con experiencia en mar abierto. Ajustamos el
            plan a tu nivel, tu tabla y tu objetivo.
          </p>
          <div className="badges">
            <span className="badge">Video análisis</span>
            <span className="badge">Entrenamiento físico</span>
            <span className="badge">Seguridad</span>
          </div>
        </div>
        <div className="quote">
          “El progreso real llega cuando entendés la ola y tu tabla.”
          <span>— Sofi M., coach Sr.Shaper</span>
        </div>
      </section>
    </main>
  );
}
