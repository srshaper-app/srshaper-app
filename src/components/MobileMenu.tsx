'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';
import { LangSelector } from '@/components/LangSelector';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        className={`mobile-toggle ${open ? 'open' : ''}`}
        type="button"
        aria-label="Abrir menú"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`mobile-menu-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span>{t(lang, 'mobile_menu')}</span>
          <button type="button" onClick={() => setOpen(false)}>{t(lang, 'mobile_cerrar')}</button>
        </div>
        <nav className="mobile-menu-links">
          <span className="mobile-group">{t(lang, 'nav_tablas')}</span>
          <Link href="/tablas" onClick={() => setOpen(false)}>{t(lang, 'nav_tablas_todas')}</Link>
          <Link href="/tablas/crea-tu-tabla" onClick={() => setOpen(false)}>{t(lang, 'nav_tablas_crea')}</Link>
          <Link href="/tablas/modelos/princess" onClick={() => setOpen(false)}>Princess</Link>
          <Link href="/tablas/modelos/gentleman" onClick={() => setOpen(false)}>Gentleman</Link>
          <Link href="/tablas/modelos/gangster" onClick={() => setOpen(false)}>Gangster</Link>
          <Link href="/tablas/modelos/shark-attack" onClick={() => setOpen(false)}>Shark Attack</Link>
          <span className="mobile-group">{t(lang, 'nav_academia')}</span>
          <Link href="/academia" onClick={() => setOpen(false)}>{t(lang, 'nav_academia')}</Link>
          <Link href="/academia/curso-shape" onClick={() => setOpen(false)}>{t(lang, 'nav_academia_shape')}</Link>
          <Link href="/academia/curso-laminacion" onClick={() => setOpen(false)}>{t(lang, 'nav_academia_laminacion')}</Link>
          <Link href="/academia/curso-glassing-sanding" onClick={() => setOpen(false)}>{t(lang, 'nav_academia_glassing')}</Link>
          <Link href="/academia/curso-completo" onClick={() => setOpen(false)}>{t(lang, 'nav_academia_completo')}</Link>
          <Link href="/academia/curso-reparacion" onClick={() => setOpen(false)}>{t(lang, 'nav_academia_reparacion')}</Link>
          <span className="mobile-group">{t(lang, 'nav_accesorios')}</span>
          <Link href="/accesorios" onClick={() => setOpen(false)}>{t(lang, 'nav_accesorios_todos')}</Link>
          <Link href="/accesorios/quillas" onClick={() => setOpen(false)}>{t(lang, 'nav_quillas')}</Link>
          <Link href="/accesorios/grips" onClick={() => setOpen(false)}>{t(lang, 'nav_grips')}</Link>
          <Link href="/accesorios/fundas" onClick={() => setOpen(false)}>{t(lang, 'nav_fundas')}</Link>
          <Link href="/accesorios/wax" onClick={() => setOpen(false)}>{t(lang, 'nav_wax')}</Link>
          <Link href="/accesorios/cuerdas-amarres" onClick={() => setOpen(false)}>{t(lang, 'nav_leashes')}</Link>
          <span className="mobile-group">{t(lang, 'nav_surf_skate')}</span>
          <Link href="/surf-skate" onClick={() => setOpen(false)}>{t(lang, 'surfskate_todos')}</Link>
          <Link href="/surf-skate?tipo=Surfskates" onClick={() => setOpen(false)}>Surfskates</Link>
          <Link href="/surf-skate?tipo=Decks" onClick={() => setOpen(false)}>Decks</Link>
          <Link href="/surf-skate?tipo=Ejes" onClick={() => setOpen(false)}>Ejes</Link>
          <Link href="/surf-skate?tipo=Ruedas" onClick={() => setOpen(false)}>Ruedas</Link>
          <Link href="/surf-skate?tipo=Bushings" onClick={() => setOpen(false)}>Bushings</Link>
          <Link href="/surf-skate?tipo=Rodamientos" onClick={() => setOpen(false)}>Rodamientos</Link>
          <Link href="/surf-skate?tipo=Accesorios" onClick={() => setOpen(false)}>{t(lang, 'nav_accesorios_todos')}</Link>
          <Link href="/sobre-nosotros" onClick={() => setOpen(false)}>{t(lang, 'nav_sobre_nosotros')}</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>{t(lang, 'nav_contacto')}</Link>
          <div className="mobile-lang-selector">
            <LangSelector />
          </div>
        </nav>
      </aside>
    </>
  );
}
