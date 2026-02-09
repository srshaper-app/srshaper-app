'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  gaId: string;
};

export function ConsentBanner({ gaId }: Props) {
  const [consent, setConsent] = useState<'accepted' | 'rejected' | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('cookie_consent');
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem('cookie_consent', 'accepted');
    setConsent('accepted');
  };

  const reject = () => {
    window.localStorage.setItem('cookie_consent', 'rejected');
    setConsent('rejected');
  };

  return (
    <>
      {consent !== 'accepted' ? null : (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}
      {consent === null ? (
        <div className="cookie-banner">
          <div>
            <strong>Cookies y privacidad</strong>
            <p>
              Usamos cookies técnicas y, si aceptas, cookies analíticas de GA4 para medir
              visitas. Puedes aceptar o rechazar las cookies no esenciales.
            </p>
            <div className="cookie-links">
              <Link href="/cookies">Política de cookies</Link>
              <Link href="/privacidad">Política de privacidad</Link>
            </div>
          </div>
          <div className="cookie-actions">
            <button className="btn btn-ghost" onClick={reject}>Rechazar</button>
            <button className="btn" onClick={accept}>Aceptar</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
