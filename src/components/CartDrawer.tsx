'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { getPrimaryProductImage } from '@/lib/productImages';
import { formatMoney } from '@/lib/format';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

export function CartButton() {
  const { count, openCart } = useCart();
  const { lang } = useLang();

  return (
    <button className="btn btn-outline" onClick={openCart}>
      {t(lang, 'cart_titulo')} (<span>{count}</span>)
    </button>
  );
}

export function CartOverlay() {
  const { items, removeItem, clear, totalCents, isOpen, closeCart } = useCart();
  const { lang } = useLang();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const handler = (event: MouseEvent) => {
      if (!drawerRef.current) return;
      if (!drawerRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [isOpen, closeCart]);

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <>
      <div className={`cart-backdrop ${isOpen ? 'open' : ''}`} />
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} ref={drawerRef}>
        <div className="cart-header">
          <h3>{t(lang, 'cart_titulo')}</h3>
          <button className="cart-close" type="button" onClick={closeCart}>
            {t(lang, 'cart_cerrar')}
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 && <div className="empty-cart">{t(lang, 'cart_vacio')}</div>}
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={getPrimaryProductImage(item.image_url)} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                {item.variant ? <p>{item.variant}</p> : null}
                <p>{formatMoney(item.price_cents)} · {lang === 'en' ? 'Qty' : 'Cantidad'} {item.quantity}</p>
              </div>
              <button onClick={() => removeItem(item.id)}>{t(lang, 'cart_quitar')}</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div>
            <span>{t(lang, 'cart_total')}</span>
            <strong>{formatMoney(totalCents)}</strong>
          </div>
          <button className="btn" type="button" onClick={handleCheckout} disabled={items.length === 0}>
            {t(lang, 'cart_pagar')}
          </button>
          <button className="btn btn-ghost" type="button" onClick={clear}>
            {lang === 'en' ? 'Clear cart' : 'Vaciar carrito'}
          </button>
        </div>
      </aside>
    </>
  );
}
