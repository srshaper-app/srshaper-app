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
        <div className="media-banner">
          <img src="/photos/custom/workshop-shaping-4.jpg" alt="Shaper trabajando una tabla a medida en el taller" />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Proceso en el taller</h2>
          <p>Diseño, medición y shape con trabajo artesanal en cada etapa.</p>
        </div>
        <div className="process-grid">
          <article className="process-card">
            <img src="/photos/custom/workshop-shaping-2.jpg" alt="Medición inicial del blank antes del shape" />
            <h3>1. Medición y concepto</h3>
            <p>Definimos outline, rocker y volumen según tu estilo y ola objetivo.</p>
          </article>
          <article className="process-card">
            <img src="/photos/custom/workshop-shaping-1.jpg" alt="Ajuste manual de líneas y curvas en la tabla" />
            <h3>2. Shape a mano</h3>
            <p>Trabajo manual de rails y foil para lograr respuesta real en agua.</p>
          </article>
          <article className="process-card">
            <img src="/photos/custom/workshop-shaping-3.jpg" alt="Blank de tabla listo en banco de trabajo del taller" />
            <h3>3. Revisión final</h3>
            <p>Control de medidas y detalles antes de pasar a laminación y acabado.</p>
          </article>
        </div>
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
