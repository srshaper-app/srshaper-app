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
          <li>Cookies técnicas necesarias para el funcionamiento del sitio.</li>
          <li>Cookies analíticas (GA4) solo si aceptas su uso.</li>
        </ul>
      </section>

      <section className="section">
        <h2>Gestión de cookies</h2>
        <p>
          Puedes aceptar o rechazar las cookies no esenciales desde el aviso de cookies.
          También puedes borrar cookies desde tu navegador.
        </p>
      </section>
    </main>
  );
}
