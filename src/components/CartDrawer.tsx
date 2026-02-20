'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';

const formatMoney = (value: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value / 100);
};

export function CartButton() {
  const { count, openCart } = useCart();

  return (
    <button className="btn btn-outline" onClick={openCart}>
      Carrito (<span>{count}</span>)
    </button>
  );
}

export function CartOverlay() {
  const { items, removeItem, clear, totalCents, isOpen, closeCart } = useCart();
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
          <h3>Tu carrito</h3>
          <button className="cart-close" type="button" onClick={closeCart}>
            Cerrar
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 && <div className="empty-cart">Tu carrito está vacío.</div>}
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image_url || '/logo-srshaper.svg'} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                {item.variant ? <p>{item.variant}</p> : null}
                <p>{formatMoney(item.price_cents)} · Cantidad {item.quantity}</p>
              </div>
              <button onClick={() => removeItem(item.id)}>Quitar</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div>
            <span>Total</span>
            <strong>{formatMoney(totalCents)}</strong>
          </div>
          <button className="btn" type="button" onClick={handleCheckout} disabled={items.length === 0}>
            Finalizar compra
          </button>
          <button className="btn btn-ghost" type="button" onClick={clear}>
            Vaciar carrito
          </button>
        </div>
      </aside>
    </>
  );
}
