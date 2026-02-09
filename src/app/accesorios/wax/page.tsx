import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

export default async function WaxPage() {
  const { data: products } = await supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', 'Accesorios')
    .eq('subcategory', 'Wax')
    .order('created_at', { ascending: false });

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Accesorios / Wax</p>
        <h1>Wax para cada temperatura.</h1>
        <p className="lead">Fórmulas con agarre inmediato y larga duración.</p>
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
          <h2>Wax disponible</h2>
          <p>Desde agua tropical hasta invierno frío.</p>
        </div>
        <div className="grid cards">
          {products?.length ? (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p>No hay wax cargado.</p>
          )}
        </div>
      </section>
    </main>
  );
}
