import './globals.css';
import Script from 'next/script';
import { CartProvider } from '@/components/CartContext';
import { SiteHeader, SiteFooter } from '@/components/Layout';

export const metadata = {
  title: 'Sr.Shaper',
  description: 'Surfboards & accesorios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-0MKTD86YTW';

  return (
    <html lang="es">
      <head>
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
      </head>
      <body>
        <CartProvider>
          <div className="page">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
