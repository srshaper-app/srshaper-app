'use client';

import { useState } from 'react';

export function CustomBoardForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    wave_type: '',
    level: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/custom-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al enviar la solicitud');
      setStatus('ok');
      setMessage('Solicitud enviada. Te contactaremos pronto.');
      setForm({
        name: '',
        email: '',
        phone: '',
        wave_type: '',
        level: '',
        message: '',
      });
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={(event) => setForm({ ...form, name: event.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(event) => setForm({ ...form, email: event.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={form.phone}
        onChange={(event) => setForm({ ...form, phone: event.target.value })}
      />
      <select
        value={form.wave_type}
        onChange={(event) => setForm({ ...form, wave_type: event.target.value })}
      >
        <option value="">Tipo de ola preferida</option>
        <option>Beach break</option>
        <option>Point break</option>
        <option>Reef break</option>
      </select>
      <select
        value={form.level}
        onChange={(event) => setForm({ ...form, level: event.target.value })}
      >
        <option value="">Nivel actual</option>
        <option>Principiante</option>
        <option>Intermedio</option>
        <option>Avanzado</option>
      </select>
      <textarea
        placeholder="Cuéntanos tu estilo, medidas y objetivo"
        value={form.message}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
      />
      <button className="btn" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Enviando...' : 'Enviar brief'}
      </button>
      {message && <p className={`form-message ${status}`}>{message}</p>}
    </form>
  );
}
