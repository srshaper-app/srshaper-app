import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';
import { ConsentBanner } from '@/components/ConsentBanner';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://srshaper-app-tv3i.vercel.app'
  ),
  title: {
    default: 'Sr.Shaper — Tablas de Surf a Medida | Gran Canaria',
    template: '%s | Sr.Shaper Surfboards',
  },
  description:
    'Sr.Shaper fabrica tablas de surf artesanales a medida desde Las Palmas de Gran Canaria. Compra online tablas custom, quillas, grips, wax, fundas y surf skate. Envíos a toda España.',
  keywords: [
    'tablas de surf a medida',
    'tablas de surf Gran Canaria',
    'shaping artesanal',
    'tablas custom surfboard',
    'Sr. Shaper',
    'surf skate',
    'quillas surf',
    'accesorios surf',
    'tabla de surf personalizada',
    'comprar tabla de surf online',
    'Las Palmas surf',
    'surfboard shop España',
    'tablas shortboard',
    'fish surfboard',
    'longboard a medida',
  ],
  authors: [{ name: 'Sr.Shaper Surfboards', url: 'https://srshaper-app-tv3i.vercel.app' }],
  creator: 'Sr.Shaper',
  publisher: 'Sr.Shaper Surfboards',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo-srshaper.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'Sr.Shaper — Tablas de Surf a Medida | Gran Canaria',
    description:
      'Fabrica tu tabla de surf personalizada con Sr.Shaper. Shaping artesanal desde Gran Canaria con envíos a toda España. Shortboards, fish, quillas, grips y surf skate.',
    url: '/',
    siteName: 'Sr.Shaper Surfboards',
    images: [{ url: '/logo-srshaper.svg', alt: 'Sr.Shaper Surfboards — Tablas a medida Gran Canaria', width: 1200, height: 630 }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sr.Shaper — Tablas de Surf a Medida | Gran Canaria',
    description:
      'Fabrica tu tabla de surf personalizada con Sr.Shaper. Shaping artesanal desde Gran Canaria. Envíos a toda España.',
    images: ['/logo-srshaper.svg'],
    creator: '@sr.shaper',
  },
  alternates: {
    canonical: '/',
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
