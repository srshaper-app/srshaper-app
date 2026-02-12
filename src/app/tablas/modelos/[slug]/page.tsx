import Link from 'next/link';
import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

const MODELS: Record<string, { name: string; image: string; tagline: string; description: string }> = {
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
    </main>
  );
}
