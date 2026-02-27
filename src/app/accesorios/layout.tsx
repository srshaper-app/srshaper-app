import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Accesorios de Surf',
    description:
        'Accesorios de surf en Sr.Shaper: quillas (Single, Twin, Thruster, Quad), grips, fundas, wax y leashes. Materiales resistentes al sol, sal y arena.',
    keywords: [
        'accesorios surf',
        'quillas surf',
        'grips surf',
        'fundas tabla surf',
        'wax surf',
        'leashes surf',
        'accesorios surf Gran Canaria',
        'comprar quillas surf España',
    ],
    openGraph: {
        title: 'Accesorios de Surf | Sr.Shaper Surfboards',
        description:
            'Quillas, grips, fundas, wax y leashes seleccionados para sesiones intensas. Materiales top en Sr.Shaper.',
    },
    alternates: { canonical: '/accesorios' },
};

export default function AccesoriosLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
