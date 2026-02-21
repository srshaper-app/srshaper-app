'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { getPrimaryProductImage } from '@/lib/productImages';

type ProductCardProps = {
  id: string;
  name: string;
  description?: string | null;
  price_cents: number;
  currency: string;
  image_url?: string | null;
  stock?: number | null;
};

const formatMoney = (value: number, currency = 'EUR') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

export function ProductCard({ id, name, price_cents, currency, image_url, stock }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const available = (stock ?? 0) > 0;
  const lowStock = (stock ?? 0) > 0 && (stock ?? 0) < 3;
  const primaryImage = getPrimaryProductImage(image_url);

  return (
    <article className="card product-card">
      <Link className="product-card-media" href={`/producto/${id}`}>
        <img src={primaryImage} alt={name} />
      </Link>
      <h3>{name}</h3>
      <span className="price">{formatMoney(price_cents, currency)}</span>
      {!available && <span className="stock-badge out">Agotado</span>}
      {lowStock && <span className="stock-badge low">Quedan pocas unidades</span>}
      <button
        className="btn btn-ghost"
        disabled={!available}
        onClick={() => {
          addItem({
            id,
            name,
            price_cents,
            currency,
            image_url: primaryImage,
          });
          openCart();
        }}
      >
        {available ? 'Agregar al carrito' : 'Agotado'}
      </button>
      <Link className="card-link" href={`/producto/${id}`}>
        Ver detalle
      </Link>
    </article>
  );
}
