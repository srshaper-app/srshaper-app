import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function QuillasPage() {
  const { data: products } = await supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', 'Accesorios')
    .eq('subcategory', 'Quillas')
    .order('created_at', { ascending: false });

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Accesorios / Quillas</p>
        <h1>Quillas diseñadas para velocidad y control.</h1>
        <p className="lead">Sets thruster, twin y quad para adaptarte a cada ola.</p>
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
