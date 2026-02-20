import Link from 'next/link';
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
        <h1>Tablas de Surf</h1>
        <p className="lead">Desde shortboards rápidos a longboards con flow, y diseños 100% personalizados.</p>
        <details className="category-drop" open>
          <summary>Opciones de tablas</summary>
          <div className="subnav">
            <a href="/tablas">Todas las tablas</a>
            <a href="/tablas/crea-tu-tabla">Crea tu tabla a medida</a>
          </div>
        </details>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Catálogo de Tablas</h2>
          <p>Conoce nuestros 4 modelos insignia y elige tu próxima tabla.</p>
        </div>
        <div className="grid model-grid">
          <Link className="model-card" href="/tablas/modelos/princess">
            <img src="/models/princess.png" alt="Modelo Princess" />
            <h3>Princess</h3>
            <p>Configura medida y outline.</p>
            <span className="card-link">Añadir al carrito</span>
          </Link>
          <Link className="model-card" href="/tablas/modelos/gentleman">
            <img src="/models/gentleman.png" alt="Modelo Gentleman" />
            <h3>Gentleman</h3>
            <p>Configura medida y outline.</p>
            <span className="card-link">Añadir al carrito</span>
          </Link>
          <Link className="model-card" href="/tablas/modelos/gangster">
            <img src="/models/gangster.png" alt="Modelo Gangster" />
            <h3>Gangster</h3>
            <p>Configura medida y outline.</p>
            <span className="card-link">Añadir al carrito</span>
          </Link>
          <Link className="model-card" href="/tablas/modelos/shark-attack">
            <img src="/models/shark-attack.png" alt="Modelo Shark Attack" />
            <h3>Shark Attack</h3>
            <p>Configura medida y outline.</p>
            <span className="card-link">Añadir al carrito</span>
          </Link>
        </div>
      </section>

      <section className="section">
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
