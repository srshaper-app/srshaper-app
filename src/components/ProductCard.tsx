'use client';

import { useCart } from './CartContext';

type ProductCardProps = {
  id: string;
  name: string;
  description?: string | null;
  price_cents: number;
  currency: string;
  image_url?: string | null;
};

const formatMoney = (value: number, currency = 'USD') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value / 100);
};

export function ProductCard({ id, name, description, price_cents, currency, image_url }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="card">
      <img src={image_url || '/logo-srshaper.svg'} alt={name} />
      <h3>{name}</h3>
      {description && <p>{description}</p>}
      <span className="price">{formatMoney(price_cents, currency)}</span>
      <button
        className="btn btn-ghost"
        onClick={() =>
          addItem({
            id,
            name,
            price_cents,
            currency,
            image_url,
          })
        }
      >
        Agregar al carrito
      </button>
    </article>
  );
}
