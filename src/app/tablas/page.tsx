import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TablasPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Tablas</p>
        <h1>Tablas de Surf</h1>
        <p className="lead">
          No trabajamos un catálogo cerrado de stock: fabricamos cada tabla bajo pedido sobre estos 4 modelos base.
        </p>
        <details className="category-drop" open>
          <summary>Modelos disponibles</summary>
          <div className="subnav">
            <a href="/tablas/modelos/princess">Princess</a>
            <a href="/tablas/modelos/gentleman">Gentleman</a>
            <a href="/tablas/modelos/gangster">Gangster</a>
            <a href="/tablas/modelos/shark-attack">Shark Attack</a>
            <a href="/tablas/crea-tu-tabla">Crea tu tabla a medida</a>
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Catálogo de Tablas</h2>
          <p>Conoce nuestros 4 modelos insignia y elige tu próxima tabla.</p>
        </div>
        <div className="grid model-grid">
          <Link className="model-card" href="/tablas/modelos/princess">
            <img src="/models/princess.png" alt="Logo del modelo Princess" />
            <h3>Princess</h3>
            <p>Round / Roundpin</p>
            <span className="card-link">Ver modelo</span>
          </Link>
          <Link className="model-card" href="/tablas/modelos/gentleman">
            <img src="/models/gentleman.png" alt="Logo del modelo Gentleman" />
            <h3>Gentleman</h3>
            <p>Wider Squash / Bump Squash / Squash</p>
            <span className="card-link">Ver modelo</span>
          </Link>
          <Link className="model-card" href="/tablas/modelos/gangster">
            <img src="/models/gangster.png" alt="Logo del modelo Gangster" />
            <h3>Gangster</h3>
            <p>Retro Bonzer / Single</p>
            <span className="card-link">Ver modelo</span>
          </Link>
          <Link className="model-card" href="/tablas/modelos/shark-attack">
            <img src="/models/shark-attack.png" alt="Logo del modelo Shark Attack" />
            <h3>Shark Attack</h3>
            <p>Retro Twinzer / Quad</p>
            <span className="card-link">Ver modelo</span>
          </Link>
        </div>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Cómo comprar tu tabla</h2>
          <p>Proceso simple y claro para cada pedido.</p>
        </div>
        <div className="process-grid">
          <article className="process-card">
            <h3>1. Elige modelo</h3>
            <p>Selecciona Princess, Gentleman, Gangster o Shark Attack.</p>
          </article>
          <article className="process-card">
            <h3>2. Configura</h3>
            <p>Define outline y medida de fabricación desde la página de cada modelo.</p>
          </article>
          <article className="process-card">
            <h3>3. Compra y empezamos</h3>
            <p>Tras el pago, iniciamos el shape de tu tabla con la configuración elegida.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
