import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function GripsPage() {
  const { data: products } = await supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', 'Accesorios')
    .eq('subcategory', 'Grips')
    .order('created_at', { ascending: false });

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Accesorios / Grips</p>
        <h1>Grips de alto agarre.</h1>
        <p className="lead">Arch bar marcado y kick tail estable para maniobras rápidas.</p>
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
          <h2>Grips disponibles</h2>
          <p>Arch bar y kick tail de alto agarre.</p>
        </div>
        <div className="grid cards">
          {products?.length ? (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p>No hay grips cargados.</p>
          )}
        </div>
      </section>
    </main>
  );
}
