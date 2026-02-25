'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { getPrimaryProductImage } from '@/lib/productImages';
import { formatMoney } from '@/lib/format';
import { useLang } from '@/components/LanguageContext';
import { t } from '@/lib/translations';

type ProductCardProps = {
  id: string;
  name: string;
  name_en?: string | null;
  description?: string | null;
  description_en?: string | null;
  price_cents: number;
  currency: string;
  image_url?: string | null;
  stock?: number | null;
};

export function ProductCard({ id, name, name_en, price_cents, currency, image_url, stock }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { lang } = useLang();
  const available = (stock ?? 0) > 0;
  const lowStock = (stock ?? 0) > 0 && (stock ?? 0) < 3;
  const primaryImage = getPrimaryProductImage(image_url);
  const displayName = lang === 'en' && name_en ? name_en : name;

  return (
    <article className="card product-card">
      <Link className="product-card-media" href={`/producto/${id}`}>
        <img src={primaryImage} alt={displayName} />
      </Link>
      <h3>{displayName}</h3>
      <span className="price">{formatMoney(price_cents, currency)}</span>
      {!available && <span className="stock-badge out">{t(lang, 'card_agotado')}</span>}
      {lowStock && <span className="stock-badge low">{t(lang, 'producto_pocas')}</span>}
      <button
        className="btn btn-ghost"
        disabled={!available}
        onClick={() => {
          addItem({
            id,
            name: displayName,
            price_cents,
            currency,
            image_url: primaryImage,
          });
          openCart();
        }}
      >
        {available ? t(lang, 'card_agregar') : t(lang, 'card_agotado')}
      </button>
      <Link className="card-link" href={`/producto/${id}`}>
        {t(lang, 'card_ver')}
      </Link>
    </article>
  );
}
