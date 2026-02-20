'use client';

import Link from 'next/link';
import { useRef } from 'react';

type CarouselItem = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  href?: string;
  actionLabel?: string;
};

type Props = {
  items: CarouselItem[];
  className?: string;
};

export function ImageCarousel({ items, className = '' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.carousel-card');
    const step = (card?.offsetWidth || 280) + 14;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <div className={`carousel ${className}`.trim()}>
      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-arrow"
          onClick={() => scrollByCard(-1)}
          aria-label="Anterior"
        >
          ←
        </button>
        <button
          type="button"
          className="carousel-arrow"
          onClick={() => scrollByCard(1)}
          aria-label="Siguiente"
        >
          →
        </button>
      </div>

      <div className="carousel-track" ref={trackRef}>
        {items.map((item, index) => (
          <article className="carousel-card" key={`${item.src}-${index}`}>
            <img src={item.src} alt={item.alt} />
            {item.title || item.description || item.href ? (
              <div className="carousel-meta">
                {item.title ? <h3>{item.title}</h3> : null}
                {item.description ? <p>{item.description}</p> : null}
                {item.href ? (
                  <Link className="btn btn-small" href={item.href}>
                    {item.actionLabel || 'Ver'}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
