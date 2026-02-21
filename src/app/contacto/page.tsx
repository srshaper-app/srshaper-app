export default function ContactoPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Contacto</p>
        <h1>Hablemos de tu próxima sesión.</h1>
        <p className="lead">Escríbenos para cotizar tablas o asesoría personalizada.</p>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Formulario de contacto</h2>
          <p>Respondemos en menos de 24 horas.</p>
        </div>
        <form className="form">
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Ciudad" />
          <textarea placeholder="Cuéntanos qué necesitas"></textarea>
          <button className="btn" type="submit">Enviar mensaje</button>
        </form>
      </section>

      <section className="section split">
        <div>
          <h2>Visítanos</h2>
          <p>Showroom y taller de shaping abierto de lunes a sábado.</p>
          <div className="badges">
            <span className="badge">Calle Mary Sanchez 41 bajo</span>
            <span className="badge">603 124 611</span>
            <span className="badge">sr.shapersurfboards@gmail.com</span>
          </div>
          <div className="contact-actions">
            <a
              className="btn btn-whatsapp"
              href="https://wa.me/34603124611"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="btn btn-instagram"
              href="https://www.instagram.com/sr.shaper/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="contact-side-stack">
          <div className="contact-map">
            <iframe
              title="Ubicación Sr.Shaper"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=28.47763,-16.24780&z=16&output=embed"
            />
            <a
              className="btn btn-outline"
              href="https://www.google.com/maps?q=28.47763,-16.24780"
              target="_blank"
              rel="noreferrer"
            >
              Abrir en mapa
            </a>
          </div>
          <div className="contact-logo-showcase">
            <img src="/logo-srshaper.svg" alt="Logo Sr.Shaper" />
          </div>
        </div>
      </section>
    </main>
  );
}
