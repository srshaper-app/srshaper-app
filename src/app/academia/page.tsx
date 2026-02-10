export default function AcademiaPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Academia</p>
        <h1>Recursos Sr.Shaper</h1>
        <p className="lead">Pronto publicaremos guías y recursos sobre shaping y cuidado de tablas.</p>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Próximamente</h2>
          <p>Contenido práctico: desde el diseño del outline hasta el laminado final.</p>
        </div>
        <div className="grid cards">
          <article className="card">
            <h3>Diseño & medidas</h3>
            <p>Cómo definir volumen, rocker y distribución de foam.</p>
          </article>
          <article className="card">
            <h3>Taller y mantenimiento</h3>
            <p>Herramientas, lijado, reparaciones y acabado profesional.</p>
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
