import Link from 'next/link';
import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

type ModelInfo = {
  name: string;
  image: string;
  tagline: string;
  description: string;
  longDescription?: string;
  manufacturingMeasures?: string[];
  buildSpecs?: string[];
  prices?: string[];
};

const MODELS: Record<string, ModelInfo> = {
  'princess': {
    name: 'Princess',
    image: '/models/princess.png',
    tagline: 'Elegancia, control y flow.',
    description: 'Modelo balanceado para olas suaves y líneas largas.',
  },
  'gentleman': {
    name: 'Gentleman',
    image: '/models/gentleman.png',
    tagline: 'Clásico, estable y confiable.',
    description: 'Ideal para surf limpio y técnica precisa.',
  },
  'gangster': {
    name: 'Gangster',
    image: '/models/gangster.png',
    tagline: 'Actitud rápida, respuesta inmediata.',
    description: 'Diseñado para maniobras agresivas y velocidad.',
  },
  'shark-attack': {
    name: 'Shark Attack',
    image: '/models/shark-attack.png',
    tagline: 'Potencia y mordida en cada giro.',
    description: 'Perfecto para olas potentes y drops verticales.',
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
      'Quad High Performance: 500€',
    ],
  },
};

export default async function ModeloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = MODELS[slug?.toLowerCase()];

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

  const { data: products } = await supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', 'Tablas')
    .eq('subcategory', model.name)
    .order('created_at', { ascending: false });

  return (
    <main>
      <section className="page-hero model-hero">
        <p className="breadcrumb">Inicio / Tablas / {model.name}</p>
        <h1>{model.name}</h1>
        <p className="lead">{model.tagline}</p>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{model.name}</h2>
          <p>Tablas disponibles de la categoría {model.name}.</p>
        </div>
        <div className="grid cards">
          {products?.length ? (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p>No hay tablas disponibles en esta categoría.</p>
          )}
        </div>
      </section>

      <section className="section split">
        <div className="model-logo">
          <img src={model.image} alt={`Logo ${model.name}`} />
        </div>
        <div>
          <h2>{model.name}</h2>
          <p>{model.description}</p>
          <div className="hero-actions">
            <Link className="btn" href="/tablas">Ver tablas disponibles</Link>
            <Link className="btn btn-ghost" href="/tablas/crea-tu-tabla">Crea tu tabla</Link>
          </div>
        </div>
      </section>

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
