import { CustomBoardForm } from '@/components/CustomBoardForm';

export default function CreaTuTablaPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Tablas / Crea tu tabla</p>
        <h1>Diseña tu tabla a medida.</h1>
        <p className="lead">Completa tu perfil de surf, olas favoritas y estilo para que nuestro shaper diseñe el outline perfecto.</p>
        <details className="category-drop" open>
          <summary>Opciones de tablas</summary>
          <div className="subnav">
            <a href="/tablas">Todas las tablas</a>
            <a href="/tablas/crea-tu-tabla">Crea tu tabla a medida</a>
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Brief de shaping</h2>
          <p>Te respondemos en 24h con propuesta de diseño y tiempos.</p>
        </div>
        <CustomBoardForm />
      </section>
    </main>
  );
}
