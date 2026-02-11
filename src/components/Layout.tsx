import Link from 'next/link';
import { CartButton } from './CartDrawer';
import { MobileMenu } from './MobileMenu';

export function SiteHeader() {
  return (
    <header className="nav">
      <Link className="brand" href="/">
        <img src="/logo-srshaper.svg" alt="Logo Sr.Shaper" />
        <span>Sr.Shaper</span>
      </Link>
      <nav className="links">
        <Link href="/tablas">Tablas</Link>
        <div className="menu-item">
          <Link className="menu-label" href="/tablas">Tablas</Link>
          <div className="dropdown">
            <Link href="/tablas">Todas las tablas</Link>
            <Link href="/tablas/catalogo">Catálogo</Link>
            <Link href="/tablas/crea-tu-tabla">Crea tu tabla</Link>
          </div>
        </div>
        <Link href="/academia">Cursos</Link>
        <div className="menu-item">
          <Link className="menu-label" href="/accesorios">Accesorios</Link>
          <div className="dropdown">
            <Link href="/accesorios">Todos los accesorios</Link>
            <Link href="/accesorios/quillas">Quillas</Link>
            <Link href="/accesorios/wax">Wax</Link>
            <Link href="/accesorios/fundas">Fundas</Link>
            <Link href="/accesorios/cuerdas-amarres">Cuerdas amarres</Link>
            <Link href="/accesorios/grips">Grips</Link>
          </div>
        </div>
        <Link href="/sobre-nosotros">Sobre nosotros</Link>
        <Link href="/contacto">Contacto</Link>
      </nav>
      <div className="nav-actions">
        <MobileMenu />
        <CartButton />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="brand">
        <img src="/logo-srshaper.svg" alt="Logo Sr.Shaper" />
        <span>Sr.Shaper</span>
      </div>
      <div className="footer-links">
        <Link href="/tablas">Tablas</Link>
        <Link href="/academia">Cursos</Link>
        <Link href="/accesorios">Accesorios</Link>
        <Link href="/sobre-nosotros">Sobre nosotros</Link>
        <Link href="/contacto">Contacto</Link>
        <Link href="/terminos">Términos y condiciones</Link>
        <Link href="/privacidad">Privacidad</Link>
        <Link href="/cookies">Cookies</Link>
      </div>
      <div className="footer-note">© 2026 Sr.Shaper Surfboards. Hecho con sal y madera.</div>
    </footer>
  );
}
