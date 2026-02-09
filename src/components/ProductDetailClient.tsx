'use client';

import { useCart } from './CartContext';

type Props = {
  id: string;
  name: string;
  price_cents: number;
  currency: string;
  image_url?: string | null;
};

export function ProductDetailClient({ id, name, price_cents, currency, image_url }: Props) {
  const { addItem, openCart } = useCart();

  return (
    <button
      className="btn"
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
      Añadir al carrito
    </button>
  );
}
