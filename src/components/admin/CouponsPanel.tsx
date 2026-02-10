'use client';

import { useEffect, useState } from 'react';

type Coupon = {
  id: string;
  code: string;
  name: string | null;
  type: 'percent' | 'fixed';
  percent_off: number | null;
  amount_off_cents: number | null;
  max_redemptions: number | null;
  starts_at: string | null;
  ends_at: string | null;
  active: boolean;
  created_at: string;
};

type FormState = {
  id?: string;
  code: string;
  name: string;
  type: 'percent' | 'fixed';
  value: string;
  maxRedemptions: string;
  startsAt: string;
  endsAt: string;
  active: boolean;
};

const emptyForm: FormState = {
  code: '',
  name: '',
  type: 'percent',
  value: '',
  maxRedemptions: '',
  startsAt: '',
  endsAt: '',
  active: true,
};

export function CouponsPanel() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/coupons');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al cargar cupones');
      setCoupons(data.coupons || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const resetForm = () => setForm(emptyForm);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        id: form.id,
        code: form.code.trim().toUpperCase(),
        name: form.name.trim() || null,
        type: form.type,
        value: Number(form.value),
        maxRedemptions: form.maxRedemptions ? Number(form.maxRedemptions) : null,
        startsAt: form.startsAt || null,
        endsAt: form.endsAt || null,
        active: form.active,
      };

      const method = form.id ? 'PATCH' : 'POST';
      const res = await fetch('/api/coupons', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar cupón');
      resetForm();
      loadCoupons();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setForm({
      id: coupon.id,
      code: coupon.code,
      name: coupon.name || '',
      type: coupon.type,
      value:
        coupon.type === 'percent'
          ? String(coupon.percent_off ?? '')
          : String(coupon.amount_off_cents ? coupon.amount_off_cents / 100 : ''),
      maxRedemptions: coupon.max_redemptions ? String(coupon.max_redemptions) : '',
      startsAt: coupon.starts_at ? coupon.starts_at.slice(0, 10) : '',
      endsAt: coupon.ends_at ? coupon.ends_at.slice(0, 10) : '',
      active: coupon.active,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este cupón?')) return;
    const res = await fetch('/api/coupons', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Error al eliminar cupón');
      return;
    }
    loadCoupons();
  };

  return (
    <div className="admin-grid">
      <div className="admin-card">
        <h2>{form.id ? 'Editar cupón' : 'Crear cupón'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <div className="admin-form-row">
              <label>Código</label>
              <input
                value={form.code}
                onChange={(event) => setForm({ ...form, code: event.target.value })}
                placeholder="SURF10"
                required
              />
            </div>
            <div className="admin-form-row">
              <label>Nombre</label>
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Descuento verano"
              />
            </div>
            <div className="admin-form-row">
              <label>Tipo</label>
              <select
                value={form.type}
                onChange={(event) => setForm({ ...form, type: event.target.value as FormState['type'] })}
              >
                <option value="percent">Porcentaje</option>
                <option value="fixed">Importe fijo (€)</option>
              </select>
            </div>
            <div className="admin-form-row">
              <label>Valor</label>
              <input
                type="number"
                min="0"
                step="1"
                value={form.value}
                onChange={(event) => setForm({ ...form, value: event.target.value })}
                placeholder={form.type === 'percent' ? '10' : '15'}
                required
              />
            </div>
            <div className="admin-form-row">
              <label>Límite usos</label>
              <input
                type="number"
                min="0"
                step="1"
                value={form.maxRedemptions}
                onChange={(event) => setForm({ ...form, maxRedemptions: event.target.value })}
                placeholder="100"
              />
            </div>
            <div className="admin-form-row">
              <label>Inicio</label>
              <input
                type="date"
                value={form.startsAt}
                onChange={(event) => setForm({ ...form, startsAt: event.target.value })}
              />
            </div>
            <div className="admin-form-row">
              <label>Fin</label>
              <input
                type="date"
                value={form.endsAt}
                onChange={(event) => setForm({ ...form, endsAt: event.target.value })}
              />
            </div>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) => setForm({ ...form, active: event.target.checked })}
              />
              Activo
            </label>
          </div>
          <div className="admin-actions">
            <button className="admin-btn" type="submit" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar cupón'}
            </button>
            {form.id && (
              <button className="admin-btn ghost" type="button" onClick={resetForm}>
                Cancelar edición
              </button>
            )}
          </div>
          {error && <span className="admin-error">{error}</span>}
        </form>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Cupones disponibles</h2>
            <p>Gestiona los descuentos activos y programados.</p>
          </div>
          <button className="admin-btn ghost" type="button" onClick={loadCoupons}>
            Actualizar
          </button>
        </div>
        {loading ? (
          <p>Cargando cupones...</p>
        ) : error ? (
          <p className="admin-error">{error}</p>
        ) : coupons.length ? (
          <div className="admin-table">
            <div className="admin-table-row admin-table-head">
              <span>Código</span>
              <span>Tipo</span>
              <span>Estado</span>
            </div>
            {coupons.map((coupon) => (
              <div className="admin-table-row" key={coupon.id}>
                <div>
                  <strong>{coupon.code}</strong>
                  <div>{coupon.name || 'Sin nombre'}</div>
                </div>
                <div>
                  {coupon.type === 'percent'
                    ? `${coupon.percent_off || 0}%`
                    : `€${coupon.amount_off_cents ? coupon.amount_off_cents / 100 : 0}`}
                </div>
                <div className="admin-actions">
                  <span>{coupon.active ? 'Activo' : 'Inactivo'}</span>
                  <button className="admin-btn ghost" type="button" onClick={() => handleEdit(coupon)}>
                    Editar
                  </button>
                  <button className="admin-btn danger" type="button" onClick={() => handleDelete(coupon.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay cupones todavía.</p>
        )}
      </div>
    </div>
  );
}
