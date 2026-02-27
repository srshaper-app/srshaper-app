import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tablas de Surf a Medida',
    description:
        'Elige entre los 4 modelos Sr.Shaper (Princess, Gentleman, Gangster, Shark Attack) o diseña tu tabla personalizada. Fabricación artesanal en Gran Canaria, envíos a toda España.',
    keywords: [
        'tablas de surf a medida',
        'comprar tabla de surf',
        'Princess surfboard',
        'Gentleman surfboard',
        'Gangster surfboard',
        'Shark Attack surfboard',
        'tablas surf Gran Canaria',
        'custom surfboard España',
    ],
    openGraph: {
        title: 'Tablas de Surf a Medida | Sr.Shaper Surfboards',
        description:
            'Fabrica tu tabla ideal con Sr.Shaper: 4 modelos base, configuración personalizada y shaping artesanal en Gran Canaria.',
        images: [{ url: '/photos/custom/workshop-shaping-1.jpg', alt: 'Shaping artesanal Sr.Shaper' }],
    },
    alternates: { canonical: '/tablas' },
};

export default function TablasLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
