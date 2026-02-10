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
        </div>
        <div className="media-banner">
          <img src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1400&q=80" alt="Tienda de surf" />
        </div>
      </section>
    </main>
  );
}
