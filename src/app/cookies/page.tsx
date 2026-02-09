export default function CookiesPage() {
  return (
    <main className="legal">
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Cookies</p>
        <h1>Política de cookies</h1>
        <p className="lead">
          Explicamos qué cookies usamos y cómo puedes gestionarlas.
        </p>
      </section>

      <section className="section">
        <h2>¿Qué son las cookies?</h2>
        <p>
          Son pequeños archivos que se almacenan en tu dispositivo para recordar
          información sobre tu visita.
        </p>
      </section>

      <section className="section">
        <h2>Cookies que utilizamos</h2>
        <ul>
          <li>
            Cookies técnicas necesarias para el funcionamiento del sitio
            (por ejemplo, recordar tu elección de cookies).
          </li>
          <li>
            Cookies analíticas de Google Analytics 4 (GA4), solo si aceptas su uso.
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>Cookies analíticas (GA4)</h2>
        <ul>
          <li><strong>_ga</strong>: identifica usuarios para estadísticas. Duración aproximada: 2 años.</li>
          <li><strong>_ga_&lt;ID&gt;</strong>: mantiene el estado de sesión. Duración aproximada: 2 años.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Gestión y retirada del consentimiento</h2>
        <p>
          Puedes aceptar o rechazar las cookies no esenciales desde el aviso de cookies.
          Para cambiar tu decisión, borra las cookies del navegador y recarga el sitio.
        </p>
      </section>

      <section className="section">
        <h2>Más información</h2>
        <p>
          Las cookies analíticas son gestionadas por Google LLC. Puedes consultar sus políticas
          en la documentación oficial de Google Analytics.
        </p>
      </section>
    </main>
  );
}
