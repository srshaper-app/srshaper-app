'use client';

import { useMemo, useState } from 'react';
import { useCart } from '@/components/CartContext';

export default function CheckoutPage() {
  const { items, totalCents } = useCart();
  const [pickup, setPickup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    coupon: '',
  });

  const totalFormatted = useMemo(() => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(totalCents / 100);
  }, [totalCents]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!items.length) {
      setError('Tu carrito está vacío.');
      return;
    }
    if (!pickup && !form.address.trim()) {
      setError('Introduce la dirección de envío o selecciona recogida en tienda.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
          customer: {
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
          },
          shipping: {
            pickup,
            address: pickup ? null : form.address.trim(),
          },
          coupon: form.coupon.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo iniciar el pago.');
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="page-hero">
        <p className="breadcrumb">Inicio / Checkout</p>
        <h1>Finaliza tu compra</h1>
        <p className="lead">Completa tus datos para continuar con el pago seguro.</p>
      </section>

      <section className="section checkout-grid">
        <form className="checkout-card" onSubmit={handleSubmit}>
          <h2>Datos de envío</h2>
          <div className="checkout-row">
            <div className="checkout-field">
              <label>Nombre</label>
              <input
                value={form.firstName}
                onChange={(event) => setForm({ ...form, firstName: event.target.value })}
                required
              />
            </div>
            <div className="checkout-field">
              <label>Apellidos</label>
              <input
                value={form.lastName}
                onChange={(event) => setForm({ ...form, lastName: event.target.value })}
                required
              />
            </div>
          </div>
          <div className="checkout-row">
            <div className="checkout-field">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                required
              />
            </div>
            <div className="checkout-field">
              <label>Teléfono</label>
              <input
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                required
              />
            </div>
          </div>
          <label className="checkout-checkbox">
            <input
              type="checkbox"
              checked={pickup}
              onChange={(event) => setPickup(event.target.checked)}
            />
            Recoger en tienda
          </label>
          {!pickup && (
            <div className="checkout-field">
              <label>Dirección de envío</label>
              <textarea
                value={form.address}
                onChange={(event) => setForm({ ...form, address: event.target.value })}
                required={!pickup}
              />
            </div>
          )}
          <div className="checkout-row">
            <div className="checkout-field">
              <label>Cupón de descuento</label>
              <input
                value={form.coupon}
                onChange={(event) => setForm({ ...form, coupon: event.target.value })}
                placeholder="SURF10"
              />
            </div>
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Redirigiendo...' : 'Continuar al pago'}
          </button>
        </form>

        <aside className="checkout-card">
          <h2>Resumen</h2>
          <div className="checkout-summary">
            {items.map((item) => (
              <div key={item.id} className="checkout-item">
                <span>{item.name} × {item.quantity}</span>
                <span>
                  €{((item.price_cents * item.quantity) / 100).toFixed(0)}
                </span>
              </div>
            ))}
            <div className="checkout-total">
              <strong>Total actual</strong>
              <strong>{totalFormatted}</strong>
            </div>
            <p className="checkout-note">
              El descuento se aplicará si el cupón es válido.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
