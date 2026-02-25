'use client';

import { useCart } from './CartContext';
import { getPrimaryProductImage } from '@/lib/productImages';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

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
  const { lang } = useLang();
  const available = (stock ?? 0) > 0;
  const primaryImage = getPrimaryProductImage(image_url);

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
          image_url: primaryImage,
        });
        openCart();
      }}
    >
      {available ? t(lang, 'producto_anadir') : t(lang, 'producto_agotado')}
    </button>
  );
}
