'use client';

import { useEffect, useState } from 'react';

type RequestRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  wave_type: string | null;
  level: string | null;
  message: string | null;
  created_at: string;
};

export function CustomBoardRequestsPanel() {
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch('/api/custom-requests');
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'No se pudieron cargar solicitudes');
      return;
    }
    setRequests(data.requests || []);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="admin-grid">
      <section className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Solicitudes recibidas</h2>
            <p>Formularios de tablas personalizadas enviados desde la web.</p>
          </div>
          <button className="admin-btn ghost" type="button" onClick={load}>Actualizar</button>
        </div>
        {error && <p className="admin-error">{error}</p>}
        <div className="admin-table">
          <div className="admin-table-row admin-table-head">
            <span>Cliente</span>
            <span>Preferencias</span>
            <span>Fecha</span>
          </div>
          {requests.length ? (
            requests.map((req) => (
              <div className="admin-table-row" key={req.id}>
                <div>
                  <strong>{req.name}</strong>
                  <div>{req.email}</div>
                  <div>{req.phone || 'Sin teléfono'}</div>
                </div>
                <div>
                  <div>{req.wave_type || '-'}</div>
                  <div>{req.level || '-'}</div>
                  <div>{req.message || '-'}</div>
                </div>
                <div>{new Date(req.created_at).toLocaleDateString('es-ES')}</div>
              </div>
            ))
          ) : (
            <p>No hay solicitudes todavía.</p>
          )}
        </div>
      </section>
    </div>
  );
}
