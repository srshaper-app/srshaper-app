'use client';

import Link from 'next/link';
import { BoardConfigurator } from '@/components/BoardConfigurator';
import { BOARD_MODELS } from '@/lib/boardCatalog';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';
import { use } from 'react';

type ModelInfo = {
  name: string;
  image: string;
  photo?: string;
  tagline: string;
  tagline_en: string;
  description: string;
  description_en: string;
  longDescription?: string;
  longDescription_en?: string;
  manufacturingMeasures?: string[];
  buildSpecs?: string[];
  buildSpecs_en?: string[];
  prices?: string[];
  gallery?: { src: string; alt: string; label?: string; label_en?: string }[];
};

const MODELS: Record<string, ModelInfo> = {
  'princess': {
    name: 'Princess',
    image: '/models/princess.png',
    photo: '/photos/models/princess/princess-front.jpg',
    tagline: 'Elegancia, control y flow.',
    tagline_en: 'Elegance, control and flow.',
    description: 'Shortboard de alto rendimiento para olas medianas y grandes.',
    description_en: 'High-performance shortboard for medium and large waves.',
    longDescription:
      'Tabla corta de alto rendimiento diseñada para olas medianas y grandes, con un rocker de entrada bien pronunciado que facilita la maniobrabilidad. Single cóncavo central para inyectar velocidad terminado en vee para más control, y round pin tail para giros cerrados y radicales. Sin duda, esta hermosa Princesa te cautivará con sus curvas.',
    longDescription_en:
      'High-performance shortboard designed for medium and large waves, with a well-pronounced entry rocker for easy manoeuvrability. Central single concave for speed injection finishing in a vee for more control, and a round pin tail for tight, radical turns. Without doubt, this beautiful Princess will captivate you with her curves.',
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
    buildSpecs_en: [
      'Polyurethane (PU) core with PVC or wood stringer',
      '4oz/4/4oz fibreglass',
      'UV-filter polyester resin',
      'High entry rocker',
      'Low exit rocker',
      'Single concave + vee',
      'Round/Roundpin tail',
      'Thruster 9° cant',
      'Rails 80/20% / 70%/30',
    ],
    prices: ['Round / Roundpin: 450€'],
    gallery: [
      { src: '/photos/models/princess/princess-front.jpg', alt: 'Princess vista superior', label: 'Princess · Vista superior', label_en: 'Princess · Top view' },
      { src: '/photos/models/princess/princess-back.jpg', alt: 'Princess vista inferior', label: 'Princess · Vista inferior', label_en: 'Princess · Bottom view' },
      { src: '/photos/models/princess/princess-roundpin.jpg', alt: 'Princess Roundpin', label: 'Princess · Roundpin', label_en: 'Princess · Roundpin' },
    ],
  },
  'gentleman': {
    name: 'Gentleman',
    image: '/models/gentleman.png',
    photo: '/photos/models/gentleman/wider-squash.jpg',
    tagline: 'Clásico, estable y confiable.',
    tagline_en: 'Classic, stable and reliable.',
    description: 'Tabla de alto rendimiento con control y porte elegante.',
    description_en: 'High-performance board with control and elegant poise.',
    longDescription:
      'Tabla corta de alto rendimiento diseñada para olas medianas y grandes con un rocker de entrada pronunciado que facilita la maniobrabilidad, single cóncavo terminado en Vee y un squash tail que aporta estabilidad y control. Con su porte elegante, este distinguido Caballero será el mejor aliado que puedas tener en tu equipo.',
    longDescription_en:
      'High-performance shortboard designed for medium and large waves with a pronounced entry rocker for easy manoeuvrability, single concave finishing in a vee, and a squash tail for stability and control. With his elegant poise, this distinguished Gentleman will be the best ally in your quiver.',
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
    buildSpecs_en: [
      'Polyurethane (PU) core with PVC or wood stringer.',
      '4oz/4/4oz fibreglass.',
      'UV-filter polyester resin.',
      'High entry rocker',
      'Low exit rocker',
      'Single concave + Vee',
      'Squash Tail',
      'Thruster 9° cant',
      'Rails 80%/20% / 70%/30%',
    ],
    prices: ['Squash high performance: 450€', 'Wider Squash/ bump squash: 430€'],
    gallery: [
      { src: '/photos/models/gentleman/wider-squash.jpg', alt: 'Gentleman Wider Squash', label: 'Wider Squash', label_en: 'Wider Squash' },
      { src: '/photos/models/gentleman/bump-squash.jpg', alt: 'Gentleman Bump Squash', label: 'Bump Squash', label_en: 'Bump Squash' },
      { src: '/photos/models/gentleman/squash.jpg', alt: 'Gentleman Squash', label: 'Squash', label_en: 'Squash' },
    ],
  },
  'gangster': {
    name: 'Gangster',
    image: '/models/gangster.png',
    tagline: 'Actitud rápida, respuesta inmediata.',
    tagline_en: 'Fast attitude, instant response.',
    description: 'MidLength con mucho carácter para olas pequeñas y medianas.',
    description_en: 'Character-packed midlength for small and medium waves.',
    longDescription:
      'MidLength diseñada para olas pequeñas y medianas, single fin o bonzer, cola estrecha estilo diamante para aportar mayor maniobrabilidad sin importar el volumen que elijas, wide point adelantado y bottom plano. El chico malo de la familia, este bandido robará toda tu atención con su hermoso diamante.',
    longDescription_en:
      'Midlength designed for small and medium waves, single fin or bonzer, narrow diamond tail for greater manoeuvrability regardless of your chosen volume, forward wide point and flat bottom. The bad boy of the family, this bandit will steal all your attention with his beautiful diamond.',
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
    buildSpecs_en: [
      'Polyurethane (PU) core with wood stringer',
      '4oz and 6oz fibreglass',
      'UV-filter polyester resin',
      'Medium entry rocker',
      'Low exit rocker',
      'Flat + vee',
      'Diamond tail',
      'Single fin / Bonzer',
      'Rails 60/40%',
    ],
    prices: ['Retro Bonzer: 560€', 'Single: 480€'],
  },
  'shark-attack': {
    name: 'Shark Attack',
    image: '/models/shark-attack.png',
    photo: '/photos/models/shark-attack/retro-twinzer.jpg',
    tagline: 'Potencia y mordida en cada giro.',
    tagline_en: 'Power and bite in every turn.',
    description: 'Perfecto para olas pequeñas y olas de verano.',
    description_en: 'Perfect for small waves and summer surf.',
    longDescription:
      'Tan rápida como el ataque de un tiburón, esta tabla fue diseñada para olas pequeñas y medianas. Presenta poco rocker en la entrada y salida. Wide point adelantado, doble cóncavo central, Twin Fins o Quad y su cola de pez es la combinación perfecta para obtener la máxima velocidad. No habrá ola que pueda escapar de este ataque de tiburón.',
    longDescription_en:
      "As fast as a shark attack, this board was designed for small and medium waves. It features a low entry and exit rocker, a forward wide point, central double concave, Twin Fins or Quad, and a fish tail — the perfect combination for maximum speed. No wave will escape this shark attack.",
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
    buildSpecs_en: [
      'Polyurethane (PU) core with PVC or wood stringer',
      '6oz / 4oz fibreglass',
      'UV-filter polyester resin',
      'Low entry rocker',
      'Low exit rocker',
      'Double concave',
      'Fish tail',
      'Twinzer fins 5° cant / Quad',
      'Rails 60/40%',
    ],
    prices: ['Retro Twinzer: 550€', 'Quad: 500€'],
    gallery: [
      { src: '/photos/models/shark-attack/retro-twinzer.jpg', alt: 'Shark Attack Retro Twinzer', label: 'Retro Twinzer', label_en: 'Retro Twinzer' },
      { src: '/photos/models/shark-attack/outline-retro-twinzer.png', alt: 'Outline Retro Twinzer', label: 'Outline · Retro Twinzer', label_en: 'Outline · Retro Twinzer' },
      { src: '/photos/models/shark-attack/outline-quad.png', alt: 'Outline Quad', label: 'Outline · Quad', label_en: 'Outline · Quad' },
    ],
  },
};

export default function ModeloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { lang } = useLang();
  const model = MODELS[slug?.toLowerCase()];
  const boardConfig = BOARD_MODELS[slug?.toLowerCase()];

  if (!model) {
    return (
      <main>
        <section className="page-hero">
          <h1>{t(lang, 'modelo_no_encontrado')}</h1>
          <Link className="btn" href="/tablas">{t(lang, 'modelo_volver')}</Link>
        </section>
      </main>
    );
  }

  const tagline = lang === 'en' ? model.tagline_en : model.tagline;
  const description = lang === 'en' ? model.description_en : model.description;
  const longDescription = lang === 'en' ? model.longDescription_en : model.longDescription;
  const specs = lang === 'en' ? (model.buildSpecs_en || model.buildSpecs) : model.buildSpecs;

  return (
    <main>
      <section className="page-hero model-hero">
        <div className="model-hero-header">
          <div className="model-hero-text">
            <p className="breadcrumb">Inicio / {t(lang, 'nav_tablas')} / {model.name}</p>
            <h1>{model.name}</h1>
            <p className="lead">{tagline}</p>
          </div>
          <div className="model-hero-logo">
            <img src="/logo-srshaper.svg" alt="SRShaper logo" />
          </div>
        </div>
      </section>

      <section className="section split">
        <div className="model-logo">
          <img src={model.photo || model.image} alt={`${lang === 'en' ? 'Photo of model' : 'Foto del modelo'} ${model.name}`} />
        </div>
        <div>
          <h2>{model.name} {t(lang, 'modelo_medida')}</h2>
          <p>{description}</p>
          <p>{t(lang, 'modelo_no_stock')}</p>
          <ul className="model-order-list">
            <li>{t(lang, 'modelo_paso1')}</li>
            <li>{t(lang, 'modelo_paso2')}</li>
            <li>{t(lang, 'modelo_paso3')}</li>
          </ul>
          <div className="hero-actions">
            <Link className="btn" href="#configurador-tabla">{t(lang, 'modelo_configurar')}</Link>
            <Link className="btn btn-ghost" href="/tablas/crea-tu-tabla">{t(lang, 'modelo_crea')}</Link>
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
            <h2>{t(lang, 'modelo_variaciones')}</h2>
            <p>{t(lang, 'modelo_variaciones_p')} {model.name}.</p>
          </div>
          <div className="catalog-photo-grid">
            {model.gallery.map((image) => (
              <figure key={`${model.name}-${image.src}`} className="model-gallery-card">
                <img src={image.src} alt={image.alt} />
                {image.label ? <figcaption>{lang === 'en' && image.label_en ? image.label_en : image.label}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {longDescription ? (
        <section className="section wave">
          <div className="model-tech">
            <h2>{t(lang, 'modelo_descripcion')}</h2>
            <p>{longDescription}</p>
          </div>
        </section>
      ) : null}

      {model.manufacturingMeasures?.length ? (
        <section className="section">
          <div className="model-tech">
            <h2>{t(lang, 'modelo_medidas')}</h2>
            <ul>
              {model.manufacturingMeasures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {specs?.length ? (
        <section className="section wave">
          <div className="model-tech">
            <h2>{t(lang, 'modelo_specs')}</h2>
            <ul>
              {specs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {model.prices?.length ? (
        <section className="section">
          <div className="model-tech">
            <h2>{t(lang, 'modelo_precio')}</h2>
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
