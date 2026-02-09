import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function TablasPage() {
  const { data: products } = await supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .eq('category', 'Tablas')
    .order('created_at', { ascending: false });

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Tablas</p>
        <h1>Tablas hechas para tu estilo de ola.</h1>
        <p className="lead">Desde shortboards rápidos a longboards con flow, y diseños 100% personalizados.</p>
        <details className="category-drop" open>
          <summary>Opciones de tablas</summary>
          <div className="subnav">
            <a href="/tablas/catalogo">Catálogo</a>
            <a href="/tablas/crea-tu-tabla">Crea tu tabla a medida</a>
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Tablas disponibles</h2>
          <p>Encuentra tu próxima tabla o diseña una completamente nueva.</p>
        </div>
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
