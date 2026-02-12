export default function AcademiaPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Academia</p>
        <h1>Academia Sr.Shaper</h1>
        <p className="lead">Cursos para aprender a crear y cuidar tu tabla. Próximamente.</p>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Cursos disponibles</h2>
          <p>Todos los cursos aparecerán como “Próximamente”.</p>
        </div>
        <div className="grid cards">
          <article className="card">
            <h3>Curso de shape</h3>
            <p>Próximamente.</p>
          </article>
          <article className="card">
            <h3>Curso de laminación</h3>
            <p>Próximamente.</p>
          </article>
          <article className="card">
            <h3>Curso de glassing and sanding</h3>
            <p>Próximamente.</p>
          </article>
          <article className="card">
            <h3>Curso completo 0 a 100</h3>
            <p>Próximamente.</p>
          </article>
          <article className="card">
            <h3>Curso de reparación</h3>
            <p>Próximamente.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
