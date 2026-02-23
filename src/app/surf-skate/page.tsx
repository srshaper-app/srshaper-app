import { ProductCard } from '@/components/ProductCard';
import { supabasePublic } from '@/lib/supabase/public';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ tipo?: string }>;
};

export default async function SurfSkatePage({ searchParams }: Props) {
  const params = await searchParams;
  const requestedType = typeof params?.tipo === 'string' ? params.tipo : '';

  const { data: allProducts } = await supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', 'Surf Skate')
    .order('created_at', { ascending: false });

  const subcategories = Array.from(
    new Set(
      (allProducts || [])
        .map((product) => product.subcategory)
        .filter((subcategory): subcategory is string => Boolean(subcategory))
    )
  );

  const currentType = subcategories.find(
    (subcategory) => subcategory.toLowerCase() === requestedType.toLowerCase()
  );

  const products = currentType
    ? (allProducts || []).filter((product) => product.subcategory === currentType)
    : allProducts || [];

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Surf Skate</p>
        <h1>Surf Skate para entrenar tus giros fuera del agua.</h1>
        <p className="lead">
          {currentType
            ? `Mostrando artículos de: ${currentType}.`
            : 'Configura tu set de surf skate con tablas, ejes, ruedas y accesorios.'}
        </p>
        <details className="category-drop" open>
          <summary>Categorías de Surf Skate</summary>
          <div className="subnav">
            <a href="/surf-skate">Todos</a>
            {subcategories.map((subcategory) => (
              <a key={subcategory} href={`/surf-skate?tipo=${encodeURIComponent(subcategory)}`}>
                {subcategory}
              </a>
            ))}
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Artículos disponibles</h2>
          <p>Material real para practicar técnica de surf en asfalto.</p>
        </div>
        <div className="grid cards">
          {products.length ? (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p>No hay artículos de Surf Skate cargados todavía.</p>
          )}
        </div>
      </section>
    </main>
  );
}
