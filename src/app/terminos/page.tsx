export default function TerminosPage() {
  return (
    <main className="legal">
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Términos</p>
        <h1>Términos y condiciones</h1>
        <p className="lead">
          Condiciones generales de uso y compra en Sr.Shaper.
        </p>
      </section>

      <section className="section">
        <h2>Identificación</h2>
        <p><strong>Sr.Shaper Surfboards</strong></p>
        <p>Dirección: Calle Mary Sanchez 41 bajo</p>
        <p>Teléfono: 603 124 611</p>
        <p>Email: sr.shapersurfboards@gmail.com</p>
      </section>

      <section className="section">
        <h2>Uso del sitio</h2>
        <p>
          El usuario se compromete a utilizar el sitio de forma lícita y responsable.
        </p>
      </section>

      <section className="section">
        <h2>Compras y pagos</h2>
        <p>
          Los precios se muestran en euros e incluyen los impuestos aplicables.
          El pago se realiza mediante Stripe.
        </p>
      </section>

      <section className="section">
        <h2>Envíos y devoluciones</h2>
        <p>
          Las condiciones de envío y devolución se comunicarán al confirmar el pedido.
          Para dudas, contáctanos por email.
        </p>
      </section>

      <section className="section">
        <h2>Propiedad intelectual</h2>
        <p>
          Los contenidos del sitio son propiedad de Sr.Shaper y no pueden ser
          reproducidos sin autorización.
        </p>
      </section>

      <section className="section">
        <h2>Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estas condiciones en cualquier momento.
        </p>
      </section>
    </main>
  );
}
