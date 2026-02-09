import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';
import { ConsentBanner } from '@/components/ConsentBanner';

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
      <body>
        <ConsentBanner gaId={gaId} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
