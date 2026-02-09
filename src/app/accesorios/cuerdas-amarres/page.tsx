import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

export default async function CuerdasPage() {
  const { data: products } = await supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', 'Accesorios')
    .eq('subcategory', 'Cuerdas amarres')
    .order('created_at', { ascending: false });

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Accesorios / Cuerdas amarres</p>
        <h1>Leashs y amarras seguras.</h1>
        <p className="lead">Sistemas de doble swivel y uretano reforzado.</p>
        <details className="category-drop" open>
          <summary>Categorías de accesorios</summary>
          <div className="subnav">
            <a href="/accesorios/quillas">Quillas</a>
            <a href="/accesorios/wax">Wax</a>
            <a href="/accesorios/fundas">Fundas</a>
            <a href="/accesorios/cuerdas-amarres">Cuerdas amarres</a>
            <a href="/accesorios/grips">Grips</a>
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Leashs disponibles</h2>
          <p>Largos de 6' a 9' según tu tabla.</p>
        </div>
        <div className="grid cards">
          {products?.length ? (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p>No hay leashs cargados.</p>
          )}
        </div>
      </section>
    </main>
  );
}
