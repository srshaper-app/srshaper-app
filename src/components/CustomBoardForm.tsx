'use client';

import { useState } from 'react';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

export function CustomBoardForm() {
  const { lang } = useLang();
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
      setMessage(t(lang, 'form_ok'));
      setForm({ name: '', email: '', phone: '', wave_type: '', level: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Error');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t(lang, 'form_nombre')}
        value={form.name}
        onChange={(event) => setForm({ ...form, name: event.target.value })}
        required
      />
      <input
        type="email"
        placeholder={t(lang, 'form_email')}
        value={form.email}
        onChange={(event) => setForm({ ...form, email: event.target.value })}
        required
      />
      <input
        type="tel"
        placeholder={t(lang, 'form_telefono')}
        value={form.phone}
        onChange={(event) => setForm({ ...form, phone: event.target.value })}
      />
      <select value={form.wave_type} onChange={(event) => setForm({ ...form, wave_type: event.target.value })}>
        <option value="">{t(lang, 'form_ola')}</option>
        <option>Beach break</option>
        <option>Point break</option>
        <option>Reef break</option>
      </select>
      <select value={form.level} onChange={(event) => setForm({ ...form, level: event.target.value })}>
        <option value="">{t(lang, 'form_nivel')}</option>
        <option value="Principiante">{t(lang, 'form_principiante')}</option>
        <option value="Intermedio">{t(lang, 'form_intermedio')}</option>
        <option value="Avanzado">{t(lang, 'form_avanzado')}</option>
      </select>
      <textarea
        placeholder={t(lang, 'form_mensaje')}
        value={form.message}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
      />
      <button className="btn" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? t(lang, 'form_enviando') : t(lang, 'form_enviar')}
      </button>
      {message && <p className={`form-message ${status}`}>{message}</p>}
    </form>
  );
}
