'use client';

import { useEffect, useState } from 'react';

type Subscriber = {
  id: string;
  name: string | null;
  email: string;
  created_at: string;
};

export function NewsletterPanel() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubscribers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/newsletter');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al cargar emails');
      setSubscribers(data.subscribers || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const downloadCsv = () => {
    const header = ['Nombre', 'Email', 'Fecha'];
    const rows = subscribers.map((sub) => [
      sub.name || '',
      sub.email,
      new Date(sub.created_at).toLocaleString('es-ES'),
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter-srshaper-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-grid">
      <div className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Suscriptores</h2>
            <p>Emails registrados desde el formulario público.</p>
          </div>
          <div className="admin-actions">
            <button className="admin-btn ghost" type="button" onClick={loadSubscribers}>Actualizar</button>
            <button className="admin-btn" type="button" onClick={downloadCsv} disabled={!subscribers.length}>
              Descargar CSV
            </button>
          </div>
        </div>
        {loading ? (
          <p>Cargando suscriptores...</p>
        ) : error ? (
          <p className="admin-error">{error}</p>
        ) : (
          <div className="admin-table">
            <div className="admin-table-row admin-table-head">
              <span>Nombre</span>
              <span>Email</span>
              <span>Fecha</span>
            </div>
            {subscribers.length ? (
              subscribers.map((sub) => (
                <div className="admin-table-row" key={sub.id}>
                  <span>{sub.name || '-'}</span>
                  <span className="admin-pill">{sub.email}</span>
                  <span>{new Date(sub.created_at).toLocaleDateString('es-ES')}</span>
                </div>
              ))
            ) : (
              <p>No hay suscriptores todavía.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
