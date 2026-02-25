import Link from 'next/link';
import { BoardConfigurator } from '@/components/BoardConfigurator';
import { BOARD_MODELS } from '@/lib/boardCatalog';

type ModelInfo = {
  name: string;
  image: string;
  photo?: string;
  tagline: string;
  description: string;
  longDescription?: string;
  manufacturingMeasures?: string[];
  buildSpecs?: string[];
  prices?: string[];
  gallery?: { src: string; alt: string; label?: string }[];
};

const MODELS: Record<string, ModelInfo> = {
  'princess': {
    name: 'Princess',
    image: '/models/princess.png',
    photo: '/photos/models/princess/princess-front.jpg',
    tagline: 'Elegancia, control y flow.',
    description: 'Shortboard de alto rendimiento para olas medianas y grandes.',
    longDescription:
      'Tabla corta de alto rendimiento diseñada para olas medianas y grandes, con un rocker de entrada bien pronunciado que facilita la maniobrabilidad. Single cóncavo central para inyectar velocidad terminado en vee para más control, y round pin tail para giros cerrados y radicales. Sin duda, esta hermosa Princesa te cautivará con sus curvas.',
    manufacturingMeasures: [
      `5'5" x 19" x 2 1/4" Round`,
      `5'8" x 18" x 2 3/8" Roundpin`,
      `5'8" x 19.5" x 2 3/8" Round`,
      `5'11" x 18.5" x 2 3/8" Roundpin`,
      `5'11" x 20" x 2 3/8" Round`,
      `6'2" x 19" x 2 3/8" Roundpin`,
      `6'2" x 20" x 2 1/2" Round`,
      `6'5" x 19.5" x 2 1/2" Roundpin`,
    ],
    buildSpecs: [
      'Núcleo de poliuretano (PU) stringer PVC o madera',
      'Fibra de vidrio de 4oz/4/4oz',
      'Resina de poliéster con filtro UV',
      'High rocker en la entrada',
      'Low rocker en la salida',
      'Cóncavo simple + vee',
      'Round/Roundpin tail',
      'Thruster 9° de angulación',
      'Rails 80/20% / 70%/30',
    ],
    prices: [
      'Round / Roundpin: 450€',
    ],
    gallery: [
      {
        src: '/photos/models/princess/princess-front.jpg',
        alt: 'Princess vista superior con gráficos en naranja',
        label: 'Princess · Vista superior',
      },
      {
        src: '/photos/models/princess/princess-back.jpg',
        alt: 'Princess vista inferior para quillas y configuración',
        label: 'Princess · Vista inferior',
      },
      {
        src: '/photos/models/princess/princess-roundpin.jpg',
        alt: 'Princess Roundpin con gráficos en azul y rojo',
        label: 'Princess · Roundpin',
      },
    ],
  },
  'gentleman': {
    name: 'Gentleman',
    image: '/models/gentleman.png',
    photo: '/photos/models/gentleman/wider-squash.jpg',
    tagline: 'Clásico, estable y confiable.',
    description: 'Tabla de alto rendimiento con control y porte elegante.',
    longDescription:
      'Tabla corta de alto rendimiento diseñada para olas medianas y grandes con un rocker de entrada pronunciado que facilita la maniobrabilidad, single cóncavo terminado en Vee y un squash tail que aporta estabilidad y control. Con su porte elegante, este distinguido Caballero será el mejor aliado que puedas tener en tu equipo.',
    manufacturingMeasures: [
      `5'5" x 19" x 2 1/4" Wider squash`,
      `5'7" x 18.5" x 2 1/2" Bump squash`,
      `5'8" x 18" x 2 3/8" Squash`,
      `5'8"x19.5" x 2 3/8" Wider squash`,
      `5'10" x 19" x 2 3/8" Bump squash`,
      `5'11" x 18.5" x 2 3/8" Squash`,
      `5'11" x 20" x 2 1/2" Wider squash`,
      `6'1" x 19.5" x 2 1/2" Bump squash`,
      `6'2" x 19" x 2 3/8" Squash`,
      `6'2 x 20.5" x 2 1/2" Wider squash`,
    ],
    buildSpecs: [
      'Núcleo de Poliuretano(PU) Stringer PVC o Madera.',
      'Fibra de Vidrio de 4oz. /4/4oz.',
      'Resina de Poliéster con filtro UV.',
      'High rocker en la entrada',
      'Low rocker en la salida',
      'Cóncavo simple + Vee',
      'Squash Tail',
      'Thruster 9° de angulación',
      'Rails 80%/20% / 70%/30%',
    ],
    prices: [
      'Squash high performance: 450€',
      'Wider Squash/ bump squash: 430€',
    ],
    gallery: [
      {
        src: '/photos/models/gentleman/wider-squash.jpg',
        alt: 'Gentleman Wider Squash, acabado negro',
        label: 'Wider Squash',
      },
      {
        src: '/photos/models/gentleman/bump-squash.jpg',
        alt: 'Gentleman Bump Squash, acabado azul y blanco',
        label: 'Bump Squash',
      },
      {
        src: '/photos/models/gentleman/squash.jpg',
        alt: 'Gentleman Squash, acabado azul y gris',
        label: 'Squash',
      },
    ],
  },
  'gangster': {
    name: 'Gangster',
    image: '/models/gangster.png',
    tagline: 'Actitud rápida, respuesta inmediata.',
    description: 'MidLength con mucho carácter para olas pequeñas y medianas.',
    longDescription:
      'MidLength diseñada para olas pequeñas y medianas, single fin o bonzer, cola estrecha estilo diamante para aportar mayor maniobrabilidad sin importar el volumen que elijas, wide point adelantado y bottom plano. El chico malo de la familia, este bandido robará toda tu atención con su hermoso diamante.',
    manufacturingMeasures: [
      `5'4" x 19.25" x 2 1/2" Single`,
      `5'6" x 19.25" x 2 5/8" Retro bonzer`,
      `5'8" x 19.75" x 2 1/2" Single`,
      `6'0" x 20" x 2 5/8" Retro bonzer`,
      `6'0" x 20.75" x 2 5/8" Single`,
      `6'4" x 20.75" x 2 5/8" Single`,
      `6'6" x 20.75" x 2 5/8" Retro bonzer`,
      `7'0" x 21.50" x 2 5/8" Retro bonzer`,
    ],
    buildSpecs: [
      'Núcleo de poliuretano (PU) stringer de madera',
      'Fibra de vidrio de 4oz y 6oz',
      'Resina de poliéster con filtro UV',
      'Medium rocker en la entrada',
      'Low rocker en la salida',
      'Flat + vee',
      'Diamond tail',
      'Single fin / Bonzer',
      'Rails 60/40%',
    ],
    prices: [
      'Retro Bonzer: 560€',
      'Single: 480€',
    ],
  },
  'shark-attack': {
    name: 'Shark Attack',
    image: '/models/shark-attack.png',
    photo: '/photos/models/shark-attack/retro-twinzer.jpg',
    tagline: 'Potencia y mordida en cada giro.',
    description: 'Perfecto para olas pequeñas y olas de verano.',
    longDescription:
      'Tan rápida como el ataque de un tiburón, esta tabla fue diseñada para olas pequeñas y medianas. Presenta poco rocker en la entrada y salida. Wide point adelantado, doble cóncavo central, Twin Fins o Quad y su cola de pez es la combinación perfecta para obtener la máxima velocidad. No habrá ola que pueda escapar de este ataque de tiburón.',
    manufacturingMeasures: [
      `5'4" x 20" x 2 1/2" Retro Twinzer`,
      `5'6" x 20" x 2 1/2" Quad`,
      `5'7" x 20.5" x 2 1/2" Retro Twinzer`,
      `5'9" x 20.5" x 2 1/2" Quad`,
      `5'10" x 21" x 2 5/8" Retro Twinzer`,
      `6'0" x 21" x 2 5/8" Quad`,
      `6'1" x 21.5" x 2 3/4" Retro Twinzer`,
      `6'3" x 21.5" x 2 3/4" Quad`,
    ],
    buildSpecs: [
      'Núcleo de poliuretano (PU) stringer PVC o madera',
      'Fibra de vidrio de 6oz / 4oz',
      'Resina de poliéster con filtro UV',
      'Low rocker en la entrada',
      'Low rocker en la salida',
      'Doble cóncavo',
      'Fish tail',
      'Twinzer fins 5° de angulación / Quad',
      'Rails 60/40%',
    ],
    prices: [
      'Retro Twinzer: 550€',
      'Quad: 500€',
    ],
    gallery: [
      {
        src: '/photos/models/shark-attack/retro-twinzer.jpg',
        alt: 'Shark Attack Retro Twinzer en acabado azul y blanco',
        label: 'Retro Twinzer',
      },
      {
        src: '/photos/models/shark-attack/outline-retro-twinzer.png',
        alt: 'Outline Shark Attack Retro Twinzer',
        label: 'Outline · Retro Twinzer',
      },
      {
        src: '/photos/models/shark-attack/outline-quad.png',
        alt: 'Outline Shark Attack Quad',
        label: 'Outline · Quad',
      },
    ],
  },
};

export default async function ModeloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = MODELS[slug?.toLowerCase()];
  const boardConfig = BOARD_MODELS[slug?.toLowerCase()];

  if (!model) {
    return (
      <main>
        <section className="page-hero">
          <h1>Modelo no encontrado</h1>
          <Link className="btn" href="/tablas">Volver a tablas</Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-hero model-hero">
        <div className="model-hero-header">
          <div className="model-hero-text">
            <p className="breadcrumb">Inicio / Tablas / {model.name}</p>
            <h1>{model.name}</h1>
            <p className="lead">{model.tagline}</p>
          </div>
          <div className="model-hero-logo">
            <img src="/logo-srshaper.svg" alt="SRShaper logo" />
          </div>
        </div>
      </section>

      <section className="section split">
        <div className="model-logo">
          <img src={model.photo || model.image} alt={`Foto del modelo ${model.name}`} />
        </div>
        <div>
          <h2>{model.name} a medida</h2>
          <p>{model.description}</p>
          <p>
            Este modelo no se vende en stock prefabricado: cada compra inicia la fabricación personalizada en taller
            según outline y medida seleccionados.
          </p>
          <ul className="model-order-list">
            <li>Selecciona outline y medida de fabricación.</li>
            <li>Añade la tabla al carrito y completa tu compra.</li>
            <li>Con el pago confirmado, comenzamos el shape de tu tabla.</li>
          </ul>
          <div className="hero-actions">
            <Link className="btn" href="#configurador-tabla">Configurar este modelo</Link>
            <Link className="btn btn-ghost" href="/tablas/crea-tu-tabla">Crea tu tabla</Link>
          </div>
        </div>
      </section>

      {boardConfig ? (
        <section className="section wave">
          <BoardConfigurator
            modelSlug={boardConfig.slug}
            modelName={boardConfig.name}
            imageUrl={boardConfig.image}
            outlineOptions={boardConfig.outlineOptions}
            measures={boardConfig.measures}
          />
        </section>
      ) : null}

      {model.gallery?.length ? (
        <section className="section">
          <div className="section-head">
            <h2>Variaciones del modelo</h2>
            <p>Acabados y opciones reales disponibles para {model.name}.</p>
          </div>
          <div className="catalog-photo-grid">
            {model.gallery.map((image) => (
              <figure key={`${model.name}-${image.src}`} className="model-gallery-card">
                <img src={image.src} alt={image.alt} />
                {image.label ? <figcaption>{image.label}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {model.longDescription ? (
        <section className="section wave">
          <div className="model-tech">
            <h2>Descripción del modelo</h2>
            <p>{model.longDescription}</p>
          </div>
        </section>
      ) : null}

      {model.manufacturingMeasures?.length ? (
        <section className="section">
          <div className="model-tech">
            <h2>Medidas de fabricación</h2>
            <ul>
              {model.manufacturingMeasures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {model.buildSpecs?.length ? (
        <section className="section wave">
          <div className="model-tech">
            <h2>Especificaciones de construcción</h2>
            <ul>
              {model.buildSpecs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {model.prices?.length ? (
        <section className="section">
          <div className="model-tech">
            <h2>Precio</h2>
            <ul>
              {model.prices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
