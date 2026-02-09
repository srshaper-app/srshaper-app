'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

const formatMoney = (value: number, currency = 'USD') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value / 100);
};

export function CartButton() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn btn-outline" onClick={() => setOpen(true)}>
        Carrito (<span>{count}</span>)
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, clear, totalCents } = useCart();

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
      }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <>
      <div className={`cart-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Tu carrito</h3>
          <button className="cart-close" type="button" onClick={onClose}>
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
                <p>{formatMoney(item.price_cents, item.currency)} · Cantidad {item.quantity}</p>
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
