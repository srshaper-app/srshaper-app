import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

export default async function AccesoriosPage() {
  const { data: products } = await supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', 'Accesorios')
    .order('created_at', { ascending: false });

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Accesorios</p>
        <h1>Accesorios que aguantan sesiones intensas.</h1>
        <p className="lead">Seleccionamos materiales resistentes al sol, sal y arena. Todo pensado para que rindas mejor.</p>
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
          <h2>Accesorios disponibles</h2>
          <p>Arma tu set completo y sal al agua sin preocuparte.</p>
        </div>
        <div className="grid cards">
          {products?.length ? (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p>No hay accesorios cargados.</p>
          )}
        </div>
      </section>
    </main>
  );
}
