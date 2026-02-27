import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sobre Nosotros — Historia y Filosofía',
    description:
        'Conoce la historia de Sr.Shaper: un taller de shaping artesanal nacido en Las Palmas de Gran Canaria, donde el Atlántico y la madera se unen para crear tablas únicas.',
    openGraph: {
        title: 'Sobre Nosotros | Sr.Shaper Surfboards',
        description:
            'Shaping artesanal en Gran Canaria. Conoce nuestra historia, filosofía y el proceso detrás de cada tabla Sr.Shaper.',
    },
    alternates: { canonical: '/sobre-nosotros' },
};

export default function SobreNosotrosLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
