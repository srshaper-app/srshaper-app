'use client';

import { useCart } from './CartContext';

type Props = {
  id: string;
  name: string;
  price_cents: number;
  currency: string;
  image_url?: string | null;
  stock?: number | null;
};

export function ProductDetailClient({ id, name, price_cents, currency, image_url, stock }: Props) {
  const { addItem, openCart } = useCart();
  const available = (stock ?? 0) > 0;

  return (
    <button
      className="btn"
      disabled={!available}
      onClick={() => {
        addItem({
          id,
          name,
          price_cents,
          currency,
          image_url,
        });
        openCart();
      }}
    >
      {available ? 'Añadir al carrito' : 'Agotado'}
    </button>
  );
}
