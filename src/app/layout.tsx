import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';
import { ConsentBanner } from '@/components/ConsentBanner';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://srshaper-app-tv3i.vercel.app'
  ),
  title: 'Sr.Shaper — Surfboards a medida',
  description:
    'Tablas de surf personalizadas, catálogo inmediato y accesorios. Shaping artesanal desde Gran Canaria.',
  openGraph: {
    title: 'Sr.Shaper — Surfboards a medida',
    description:
      'Tablas de surf personalizadas, catálogo inmediato y accesorios. Shaping artesanal desde Gran Canaria.',
    url: '/',
    siteName: 'Sr.Shaper',
    images: [{ url: '/logo-srshaper.svg', alt: 'Sr.Shaper logo' }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sr.Shaper — Surfboards a medida',
    description:
      'Tablas de surf personalizadas, catálogo inmediato y accesorios. Shaping artesanal desde Gran Canaria.',
    images: ['/logo-srshaper.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-0MKTD86YTW';

  return (
    <html lang="es">
      <body>
        <ConsentBanner gaId={gaId} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
