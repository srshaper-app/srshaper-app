export default function AcademiaPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Academia</p>
        <h1>Academia Sr.Shaper</h1>
        <p className="lead">Pronto lanzamos un curso para aprender a hacer tu propia tabla.</p>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Próximamente</h2>
          <p>Curso de shaping completo: desde el diseño del outline hasta el laminado final.</p>
        </div>
        <div className="grid cards">
          <article className="card">
            <h3>Diseño & medidas</h3>
            <p>Cómo definir volumen, rocker y distribución de foam.</p>
          </article>
          <article className="card">
            <h3>Shaping práctico</h3>
            <p>Herramientas, lijado y acabado profesional.</p>
          </article>
          <article className="card">
            <h3>Laminado & quillas</h3>
            <p>Resinas, fibras y configuración de quillas.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
