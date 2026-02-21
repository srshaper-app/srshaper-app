import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

const QUILLAS_TYPES = ['Single', 'Twin', 'Thruster', 'Quad'] as const;

type Props = {
  searchParams: Promise<{ tipo?: string }>;
};

export default async function QuillasPage({ searchParams }: Props) {
  const params = await searchParams;
  const requestedType = typeof params?.tipo === 'string' ? params.tipo : '';
  const currentType = QUILLAS_TYPES.find((type) => type.toLowerCase() === requestedType.toLowerCase());

  let query = supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', 'Accesorios');

  if (currentType) {
    query = query.eq('subcategory', `Quillas - ${currentType}`);
  } else {
    query = query.in('subcategory', ['Quillas', ...QUILLAS_TYPES.map((type) => `Quillas - ${type}`)]);
  }

  const { data: products } = await query.order('created_at', { ascending: false });

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Accesorios / Quillas</p>
        <h1>Quillas diseñadas para velocidad y control.</h1>
        <p className="lead">
          {currentType
            ? `Mostrando quillas tipo ${currentType}.`
            : 'Selecciona tipo de quilla: Single, Twin, Thruster o Quad.'}
        </p>
        <details className="category-drop" open>
          <summary>Categorías de accesorios</summary>
          <div className="subnav">
            <a href="/accesorios/quillas">Quillas</a>
            <a href="/accesorios/quillas?tipo=single">Single</a>
            <a href="/accesorios/quillas?tipo=twin">Twin</a>
            <a href="/accesorios/quillas?tipo=thruster">Thruster</a>
            <a href="/accesorios/quillas?tipo=quad">Quad</a>
            <a href="/accesorios/wax">Wax</a>
            <a href="/accesorios/fundas">Fundas</a>
            <a href="/accesorios/cuerdas-amarres">Cuerdas amarres</a>
            <a href="/accesorios/grips">Grips</a>
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Quillas disponibles</h2>
          <p>Materiales livianos y respuesta inmediata en giro.</p>
        </div>
        <div className="grid cards">
          {products?.length ? (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p>No hay quillas cargadas.</p>
          )}
        </div>
      </section>
    </main>
  );
}
