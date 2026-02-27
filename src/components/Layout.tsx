'use client';

import Link from 'next/link';
import { CartButton } from './CartDrawer';
import { MobileMenu } from './MobileMenu';
import { LangSelector } from './LangSelector';
import { useLang } from './LanguageContext';
import { t } from '@/lib/translations';

export function SiteHeader() {
  const { lang } = useLang();

  return (
    <header className="nav">
      <Link className="brand header-brand" href="/">
        <img src="/logo-srshaper.svg" alt="Logo Sr.Shaper" />
        <span className="brand-text">
          <span className="brand-main">SR.SHAPER</span>
          <span className="brand-sub">Surfboards</span>
        </span>
      </Link>
      <nav className="links">
        <div className="menu-item">
          <Link className="menu-label" href="/tablas">{t(lang, 'nav_tablas')}</Link>
          <div className="dropdown">
            <Link href="/tablas">{t(lang, 'nav_tablas_todas')}</Link>
            <Link href="/tablas/crea-tu-tabla">{t(lang, 'nav_tablas_crea')}</Link>
            <Link href="/tablas/modelos/princess">Princess</Link>
            <Link href="/tablas/modelos/gentleman">Gentleman</Link>
            <Link href="/tablas/modelos/gangster">Gangster</Link>
            <Link href="/tablas/modelos/shark-attack">Shark Attack</Link>
          </div>
        </div>
        <div className="menu-item">
          <Link className="menu-label" href="/academia">{t(lang, 'nav_academia')}</Link>
          <div className="dropdown">
            <Link href="/academia/curso-shape">{t(lang, 'nav_academia_shape')}</Link>
            <Link href="/academia/curso-laminacion">{t(lang, 'nav_academia_laminacion')}</Link>
            <Link href="/academia/curso-glassing-sanding">{t(lang, 'nav_academia_glassing')}</Link>
            <Link href="/academia/curso-completo">{t(lang, 'nav_academia_completo')}</Link>
            <Link href="/academia/curso-reparacion">{t(lang, 'nav_academia_reparacion')}</Link>
          </div>
        </div>
        <div className="menu-item">
          <Link className="menu-label" href="/accesorios">{t(lang, 'nav_accesorios')}</Link>
          <div className="dropdown">
            <Link href="/accesorios">{t(lang, 'nav_accesorios_todos')}</Link>
            <Link href="/accesorios/quillas">{t(lang, 'nav_quillas')}</Link>
            <Link href="/accesorios/grips">{t(lang, 'nav_grips')}</Link>
            <Link href="/accesorios/fundas">{t(lang, 'nav_fundas')}</Link>
            <Link href="/accesorios/wax">{t(lang, 'nav_wax')}</Link>
            <Link href="/accesorios/cuerdas-amarres">{t(lang, 'nav_leashes')}</Link>
          </div>
        </div>
        <div className="menu-item">
          <Link className="menu-label" href="/surf-skate">{t(lang, 'nav_surf_skate')}</Link>
          <div className="dropdown">
            <Link href="/surf-skate">{t(lang, 'surfskate_todos')}</Link>
            <Link href="/surf-skate?tipo=Surfskates">Surfskates</Link>
            <Link href="/surf-skate?tipo=Decks">Decks</Link>
            <Link href="/surf-skate?tipo=Ejes">Ejes</Link>
            <Link href="/surf-skate?tipo=Ruedas">Ruedas</Link>
            <Link href="/surf-skate?tipo=Bushings">Bushings</Link>
            <Link href="/surf-skate?tipo=Rodamientos">Rodamientos</Link>
            <Link href="/surf-skate?tipo=Accesorios">{t(lang, 'nav_accesorios_todos')}</Link>
          </div>
        </div>
        <Link href="/sobre-nosotros">{t(lang, 'nav_sobre_nosotros')}</Link>
        <Link href="/contacto">{t(lang, 'nav_contacto')}</Link>
      </nav>
      <div className="nav-actions">
        <LangSelector />
        <MobileMenu />
        <CartButton />
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { lang } = useLang();

  return (
    <footer className="footer">
      <div className="brand footer-brand">
        <img src="/logo-srshaper.svg" alt="Logo Sr.Shaper" />
        <span className="brand-text">
          <span className="brand-main">SR.SHAPER</span>
          <span className="brand-sub">Surfboards</span>
        </span>
      </div>
      <div className="footer-links">
        <Link href="/tablas">{t(lang, 'nav_tablas')}</Link>
        <Link href="/academia">{t(lang, 'nav_academia')}</Link>
        <Link href="/accesorios">{t(lang, 'nav_accesorios')}</Link>
        <Link href="/surf-skate">{t(lang, 'nav_surf_skate')}</Link>
        <Link href="/sobre-nosotros">{t(lang, 'nav_sobre_nosotros')}</Link>
        <Link href="/contacto">{t(lang, 'nav_contacto')}</Link>
        <Link href="/terminos">Términos y condiciones</Link>
        <Link href="/privacidad">Privacidad</Link>
        <Link href="/cookies">Cookies</Link>
      </div>
      <div className="footer-social">
        <a
          className="btn btn-whatsapp footer-social-btn"
          href="https://wa.me/34603124611"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Sr.Shaper"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.5 5.9L0 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4h0c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3ZM12 21.7h0a9.8 9.8 0 0 1-5-1.3l-.4-.2-3.8 1 1-3.7-.3-.4a9.9 9.9 0 1 1 8.5 4.6Zm5.4-7.3c-.3-.2-1.8-.9-2-.9-.3-.1-.5-.1-.8.2-.2.3-.8.9-1 .9-.2 0-.4 0-.7-.2a8 8 0 0 1-2.3-1.4 8.8 8.8 0 0 1-1.6-2c-.2-.4 0-.6.2-.8.2-.2.3-.4.5-.6.2-.2.2-.4.3-.6.1-.2 0-.5 0-.6l-.8-2.1c-.2-.4-.5-.4-.7-.4h-.6c-.2 0-.6 0-.9.4-.3.3-1.1 1-1.1 2.6 0 1.5 1.1 3 1.3 3.2.2.2 2.2 3.4 5.2 4.8.8.4 1.4.6 1.9.8.8.3 1.5.3 2 .2.6-.1 1.8-.8 2.1-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.2-.6-.4Z" />
          </svg>
          WhatsApp
        </a>
        <a
          className="btn btn-instagram footer-social-btn"
          href="https://www.instagram.com/sr.shaper/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram Sr.Shaper"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.5.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.5-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2Zm0-2.2C8.7 0 8.3 0 7 0 5.7.1 4.8.3 4 .6a5.5 5.5 0 0 0-2 1.3A5.5 5.5 0 0 0 .6 4C.3 4.8.1 5.7 0 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.3.3 2.2.6 3 .3.8.8 1.5 1.3 2 .5.5 1.2 1 2 1.3.8.3 1.7.5 3 .6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 3-.6a5.5 5.5 0 0 0 2-1.3 5.5 5.5 0 0 0 1.3-2c.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-3a5.5 5.5 0 0 0-1.3-2A5.5 5.5 0 0 0 20 .6c-.8-.3-1.7-.5-3-.6C15.7 0 15.3 0 12 0Zm0 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8Zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4Zm7.8-11.4a1.4 1.4 0 1 1-1.4 1.4 1.4 1.4 0 0 1 1.4-1.4Z" />
          </svg>
          Instagram
        </a>
      </div>
      <div className="footer-note">{t(lang, 'footer_note')}</div>
    </footer>
  );
}
