import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Academia de Shaping',
    description:
        'Aprende a fabricar tablas de surf desde cero con los cursos de Sr.Shaper: curso de shape, laminación, glassing & sanding y reparación. Formación artesanal en Gran Canaria.',
    keywords: [
        'curso de shaping surf',
        'aprender a hacer tablas de surf',
        'curso laminación surf',
        'curso glassing surfboard',
        'academia surf shaping',
        'cursos surf Gran Canaria',
    ],
    openGraph: {
        title: 'Academia de Shaping | Sr.Shaper Surfboards',
        description:
            'Cursos de shaping artesanal en Sr.Shaper. Aprende a fabricar, laminar y reparar tus propias tablas de surf en Gran Canaria.',
    },
    alternates: { canonical: '/academia' },
};

export default function AcademiaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
