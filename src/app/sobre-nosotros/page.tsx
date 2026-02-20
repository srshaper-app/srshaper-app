export default function SobreNosotrosPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Sobre nosotros</p>
        <h1>Sobre nosotros</h1>
        <p className="lead">Nuestra historia nace en el Atlántico, entre olas, madera y shaping artesanal.</p>
      </section>

      <section className="section">
        <div className="split about-section">
          <div>
            <h2>Nuestra Historia</h2>
            <p>
              En Las Palmas de Gran Canaria, donde el Atlántico dibuja líneas
              perfectas contra la costa volcánica, nació algo más que un taller
              de tablas de surf. Nació una conversación silenciosa entre el
              océano, la madera, y las manos que conocen ambos idiomas.
            </p>
            <p>
              Mi historia comenzó donde comienzan todas las buenas historias de
              surf: en el agua. Años de leer olas, de sentir cómo cada tabla
              respondía diferente a cada sección, de entender que el océano no
              perdona la mediocridad pero recompensa la constancia. Fue en esas
              sesiones interminables en el norte de la isla, bajo el cielo
              cambiante del Atlántico, donde aprendí que una tabla de surf no es
              un objeto, es un puente entre el surfista y la ola.
            </p>
            <p>
              Lo que comenzó como una inquietud se transformó en obsesión.
              Necesitaba entender por qué algunas tablas bailaban en el agua y
              otras simplemente flotaban. Por qué ciertas líneas de rail hacían
              que el tiempo se detuviera en el tubo. Por qué un centímetro podía
              ser la diferencia entre la magia y la medianía.
            </p>
          </div>
          <div className="about-image-card">
            <img
              src="/photos/about/shaper-mint-board.jpg"
              alt="Shaper de Sr.Shaper sosteniendo una tabla en el exterior del taller"
            />
          </div>
        </div>
      </section>

      <section className="section wave">
        <div className="about-section">
          <div>
            <h2>Artesanía con Alma Atlántica</h2>
            <p>
              En nuestro taller, cada tabla es un acto de fe. Fe en el proceso,
              en la paciencia, en la idea de que las cosas bien hechas llevan su
              tiempo. Aquí no hay prisa, porque el océano no tiene prisa y las
              olas perfectas no se pueden forzar.
            </p>
            <p>
              El foam blanco es nuestro lienzo, la resina es escultura líquida,
              arquitectura fluida diseñada no para museos sino para momentos
              efímeros de perfección en agua salada.
            </p>
            <p>
              Trabajamos con las manos y la mente clara. Cada tabla lleva las
              marcas invisibles de nuestras sesiones. Creemos en la honestidad
              del shape. En tablas que no prometen milagros pero entregan
              rendimiento. En diseños que respetan tanto la tradición como la
              innovación, porque el océano es antiguo pero cada ola es nueva.
            </p>
            <p>
              Creemos en conocer a quien va a surfear nuestras tablas. En
              escuchar no solo lo que dicen, sino lo que buscan cuando miran el
              horizonte del mar. En entender que cada surfista tiene su propia
              danza con las olas, y nuestra misión es crear el instrumento
              perfecto para esa música.
            </p>
          </div>
          <div className="about-gallery-grid">
            <img src="/photos/custom/workshop-shaping-1.jpg" alt="Proceso de shape en el taller Sr.Shaper" />
            <img src="/photos/custom/workshop-shaping-3.jpg" alt="Detalle del shape artesanal en taller" />
            <img src="/photos/custom/workshop-tools.jpg" alt="Herramientas y banco de trabajo del taller" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="about-section">
          <div>
            <h2>Más Allá del Shape</h2>
            <p>
              Cuando entregas una tabla terminada, con el cristal brillando bajo
              la luz del taller, sabes que estás entregando parte de ti. Cada una
              lleva horas de trabajo, años de aprendizaje, décadas de amor por el
              surf.
            </p>
            <p>
              Pero más que eso, lleva una promesa: que cuando esa tabla toque el
              agua, cuando sienta el peso del surfista y la fuerza de la ola, va
              a responder. Va a estar ahí, firme y fluida, permitiendo ese
              momento de gracia donde todo desaparece excepto el surfista, la ola
              y la línea perfecta que los une.
            </p>
          </div>
          <div className="about-gallery-grid">
            <img src="/photos/about/purple-board-beach.png" alt="Tabla personalizada morada en costa rocosa" />
            <img src="/photos/about/green-board-portrait.png" alt="Tabla personalizada verde en mano del shaper" />
            <img src="/photos/home/canteras-session-2.jpg" alt="Sesión de surf probando una tabla Sr.Shaper" />
          </div>
        </div>
      </section>
    </main>
  );
}
