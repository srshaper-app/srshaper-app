'use client';

import { usePathname } from 'next/navigation';
import { CartProvider } from '@/components/CartContext';
import { SiteHeader, SiteFooter } from '@/components/Layout';
import { CartOverlay } from '@/components/CartDrawer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <div className="page">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
      <CartOverlay />
    </CartProvider>
  );
}
