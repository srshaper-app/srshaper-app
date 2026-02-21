'use client';

import { useMemo, useState } from 'react';

type Props = {
  images: string[];
  name: string;
};

export function ProductImageGallery({ images, name }: Props) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);

  const total = safeImages.length;
  const current = total ? safeImages[index] : '/logo-srshaper.svg';

  const goPrev = () => {
    if (!total) return;
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    if (!total) return;
    setIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="product-image-gallery">
      <div className="product-image-main">
        <img src={current} alt={`${name} ${total > 1 ? `(${index + 1}/${total})` : ''}`} />
        {total > 1 ? (
          <>
            <button type="button" className="product-gallery-arrow prev" onClick={goPrev} aria-label="Imagen anterior">
              ‹
            </button>
            <button type="button" className="product-gallery-arrow next" onClick={goNext} aria-label="Siguiente imagen">
              ›
            </button>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="product-image-thumbs">
          {safeImages.map((url, idx) => (
            <button
              key={`${url}-${idx}`}
              type="button"
              className={`product-thumb ${idx === index ? 'active' : ''}`}
              onClick={() => setIndex(idx)}
              aria-label={`Ver imagen ${idx + 1}`}
            >
              <img src={url} alt={`${name} miniatura ${idx + 1}`} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

