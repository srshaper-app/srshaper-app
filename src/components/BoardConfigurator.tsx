'use client';

import { useMemo, useState } from 'react';
import { useCart } from './CartContext';
import type { BoardOutlineOption } from '@/lib/boardCatalog';

type Props = {
  modelSlug: string;
  modelName: string;
  imageUrl: string;
  outlineOptions: BoardOutlineOption[];
  measures: string[];
};

const formatMoney = (value: number, currency = 'EUR') =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value / 100);

export function BoardConfigurator({
  modelSlug,
  modelName,
  imageUrl,
  outlineOptions,
  measures,
}: Props) {
  const { addItem, openCart } = useCart();
  const [outline, setOutline] = useState(outlineOptions[0]?.label || '');
  const [measure, setMeasure] = useState(measures[0] || '');

  const selectedOutline = useMemo(
    () => outlineOptions.find((option) => option.label === outline),
    [outlineOptions, outline]
  );
  const priceCents = selectedOutline?.price_cents || 0;
  const variant = `${outline} · ${measure}`;
  const itemId = `${modelSlug}::${outline}::${measure}`;

  return (
    <div className="board-configurator" id="configurador-tabla">
      <h3>Configura y añade tu {modelName}</h3>
      <div className="board-config-grid">
        <div className="checkout-field">
          <label>Outline</label>
          <select value={outline} onChange={(event) => setOutline(event.target.value)}>
            {outlineOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label} ({formatMoney(option.price_cents)})
              </option>
            ))}
          </select>
        </div>
        <div className="checkout-field">
          <label>Medida de fabricación</label>
          <select value={measure} onChange={(event) => setMeasure(event.target.value)}>
            {measures.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="board-config-summary">
        <span className="price">{formatMoney(priceCents)}</span>
        <button
          type="button"
          className="btn"
          onClick={() => {
            addItem({
              id: itemId,
              name: modelName,
              price_cents: priceCents,
              currency: 'EUR',
              image_url: imageUrl,
              variant,
              custom_board: true,
              model_slug: modelSlug,
              outline,
              measure,
            });
            openCart();
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
