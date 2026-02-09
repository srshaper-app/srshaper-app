import Link from 'next/link';
import { supabasePublic } from '@/lib/supabase/public';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: products } = await supabasePublic
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Shapers locales · Envíos a todo el país</p>
          <h1>Sr.Shaper nace en el agua. Tablas hechas para tu ola.</h1>
          <p className="lead">
            Diseñamos surfboards a medida, seleccionamos accesorios premium y
            formamos riders en nuestra academia. Todo con estilo surfero,
            funcional y auténtico.
          </p>
          <div className="hero-actions">
            <Link className="btn" href="/tablas/crea-tu-tabla">Crear mi tabla</Link>
            <Link className="btn btn-ghost" href="/tablas/catalogo">Ver catálogo</Link>
          </div>
          <div className="badges">
            <span className="badge">Custom shaping</span>
            <span className="badge">Accesorios pro</span>
            <span className="badge">Academia</span>
          </div>
        </div>
        <div className="hero-card">
          <span className="tag">Drop 2026</span>
          <h3>Modelo “Blue Tide”</h3>
          <p>6'1" · Thruster · Volumen 29L</p>
          <div className="hero-actions">
            <span className="price">$720</span>
            <Link className="btn btn-small" href="/tablas/catalogo">Comprar</Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=80"
            alt="Surfista con tabla"
          />
        </div>
      </section>

      <section className="strip">
        <div>Shaping artesanal</div>
        <div>Pagos seguros</div>
        <div>Soporte experto</div>
        <div>Garantía 12 meses</div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Accesorios esenciales</h2>
          <p>Quillas, wax, fundas y grips seleccionados para sesiones fuertes.</p>
        </div>
        <div className="grid category-grid">
          <Link className="category" href="/accesorios/quillas">
            <span>Quillas</span>
            <h3>Control + velocidad</h3>
            <p>Sets thruster, twin y quad para cada ola.</p>
          </Link>
          <Link className="category" href="/accesorios/wax">
            <span>Wax</span>
            <h3>Grip inmediato</h3>
            <p>Fórmulas tropical, templada y fría.</p>
          </Link>
          <Link className="category" href="/accesorios/fundas">
            <span>Fundas</span>
            <h3>Viaje seguro</h3>
            <p>Boardbags térmicos y travel bags.</p>
          </Link>
          <Link className="category" href="/accesorios/cuerdas-amarres">
            <span>Cuerdas amarres</span>
            <h3>Seguridad</h3>
            <p>Leashs reforzados 6' a 9'.</p>
          </Link>
          <Link className="category" href="/accesorios/grips">
            <span>Grips</span>
            <h3>Tracción final</h3>
            <p>Arch bar y kick tail de alto agarre.</p>
          </Link>
        </div>
        <div className="featured">
          <div>
            <h3>Pack Ready</h3>
            <p>Leash + wax + grips para tu próxima sesión.</p>
          </div>
          <Link className="btn btn-small" href="/accesorios">Ver accesorios</Link>
        </div>
      </section>

      <section className="section wave">
        <div className="section-head">
          <h2>Tablas de surf</h2>
          <p>Catálogo inmediato o diseño 100% a medida con nuestros shapers.</p>
        </div>
        <div className="grid cards">
          {products?.length ? (
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <p>No hay productos cargados todavía.</p>
          )}
        </div>
      </section>

      <section className="section split">
        <div>
          <h2>Academia Sr.Shaper</h2>
          <p>
            Clases para todos los niveles, clinics de maniobras y entrenamientos
            en el agua con coaches certificados.
          </p>
          <div className="badges">
            <span className="badge">Principiantes</span>
            <span className="badge">Intermedio</span>
            <span className="badge">Competencia</span>
          </div>
          <div className="hero-actions">
            <Link className="btn" href="/academia">Ver programas</Link>
            <Link className="btn btn-outline" href="/contacto">Agendar clase</Link>
          </div>
        </div>
        <div className="quote">
          “Cada tabla que sale del taller tiene el sello de nuestro océano.”
          <span>— Nico R., shaper principal</span>
        </div>
      </section>

      <section className="newsletter">
        <h2>Únete a la comunidad Sr.Shaper</h2>
        <p>Noticias, drops y tips de entrenamiento directo a tu correo.</p>
        <form className="form">
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Email" />
          <button className="btn" type="submit">Suscribirme</button>
        </form>
      </section>
    </main>
  );
}
