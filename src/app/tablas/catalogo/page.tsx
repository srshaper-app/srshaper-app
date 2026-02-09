import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

export default async function CatalogoPage() {
  const { data: products } = await supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', 'Tablas')
    .order('created_at', { ascending: false });

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Tablas / Catálogo</p>
        <h1>Catálogo Sr.Shaper 2026</h1>
        <p className="lead">Modelos probados en beach breaks, reefs y point breaks.</p>
        <details className="category-drop" open>
          <summary>Opciones de tablas</summary>
          <div className="subnav">
            <a href="/tablas/catalogo">Catálogo</a>
            <a href="/tablas/crea-tu-tabla">Crea tu tabla a medida</a>
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="grid cards">
          {products?.length ? (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p>No hay tablas cargadas.</p>
          )}
        </div>
      </section>
    </main>
  );
}
