'use client';

import { useMemo, useState } from 'react';
import { useCart } from '@/components/CartContext';

export default function CheckoutPage() {
  const { items, totalCents } = useCart();
  const [pickup, setPickup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountCents, setDiscountCents] = useState(0);
  const [couponStatus, setCouponStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [couponMessage, setCouponMessage] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'ES',
    coupon: '',
  });

  const totalFormatted = useMemo(() => {
    const amount = Math.max(totalCents - discountCents, 0);
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount / 100);
  }, [totalCents, discountCents]);

  const validateCoupon = async () => {
    if (!form.coupon.trim()) {
      setDiscountCents(0);
      setCouponStatus('idle');
      setCouponMessage('');
      return;
    }
    const res = await fetch('/api/coupons', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: form.coupon.trim() }),
    });
    const data = await res.json();
    if (!data.valid) {
      setDiscountCents(0);
      setCouponStatus('error');
      setCouponMessage(data.error || 'Cupón no válido');
      return;
    }

    let discount = 0;
    if (data.coupon.type === 'percent') {
      discount = Math.round(totalCents * (data.coupon.percent_off / 100));
    }
    if (data.coupon.type === 'fixed') {
      discount = Math.min(totalCents, data.coupon.amount_off_cents || 0);
    }
    setDiscountCents(discount);
    setCouponStatus('ok');
    setCouponMessage(`Cupón aplicado: ${data.coupon.code}`);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!items.length) {
      setError('Tu carrito está vacío.');
      return;
    }
    if (!pickup && (!form.addressLine1.trim() || !form.city.trim() || !form.region.trim() || !form.postalCode.trim())) {
      setError('Completa todos los campos de envío o selecciona recogida en tienda.');
      return;
    }
    setLoading(true);
    try {
      await validateCoupon();
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
            address: pickup
              ? null
              : {
                  line1: form.addressLine1.trim(),
                  line2: form.addressLine2.trim() || null,
                  city: form.city.trim(),
                  region: form.region.trim(),
                  postalCode: form.postalCode.trim(),
                  country: form.country.trim(),
                },
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
            <>
              <div className="checkout-field">
                <label>Dirección</label>
                <input
                  value={form.addressLine1}
                  onChange={(event) => setForm({ ...form, addressLine1: event.target.value })}
                  required={!pickup}
                />
              </div>
              <div className="checkout-field">
                <label>Dirección (opcional)</label>
                <input
                  value={form.addressLine2}
                  onChange={(event) => setForm({ ...form, addressLine2: event.target.value })}
                />
              </div>
              <div className="checkout-row">
                <div className="checkout-field">
                  <label>Ciudad</label>
                  <input
                    value={form.city}
                    onChange={(event) => setForm({ ...form, city: event.target.value })}
                    required={!pickup}
                  />
                </div>
                <div className="checkout-field">
                  <label>Provincia</label>
                  <input
                    value={form.region}
                    onChange={(event) => setForm({ ...form, region: event.target.value })}
                    required={!pickup}
                  />
                </div>
              </div>
              <div className="checkout-row">
                <div className="checkout-field">
                  <label>Código postal</label>
                  <input
                    value={form.postalCode}
                    onChange={(event) => setForm({ ...form, postalCode: event.target.value })}
                    required={!pickup}
                  />
                </div>
                <div className="checkout-field">
                  <label>País</label>
                  <input
                    value={form.country}
                    onChange={(event) => setForm({ ...form, country: event.target.value })}
                  />
                </div>
              </div>
            </>
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
            <div className="checkout-field checkout-actions">
              <label>&nbsp;</label>
              <button className="btn btn-ghost" type="button" onClick={validateCoupon}>
                Validar cupón
              </button>
            </div>
          </div>
          {couponMessage && (
            <p className={`form-message ${couponStatus}`}>{couponMessage}</p>
          )}
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
            {discountCents > 0 && (
              <div className="checkout-item">
                <span>Descuento</span>
                <span>-€{(discountCents / 100).toFixed(0)}</span>
              </div>
            )}
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
