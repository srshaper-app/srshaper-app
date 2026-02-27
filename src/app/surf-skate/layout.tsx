import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Surf Skate — Tablas, Ejes, Ruedas y Accesorios',
    description:
        'Compra surf skate online en Sr.Shaper: surfskates completos, decks, ejes, ruedas, bushings y rodamientos. Entrena tus giros de surf fuera del agua.',
    keywords: [
        'surf skate',
        'comprar surf skate España',
        'surf skate Gran Canaria',
        'ejes surf skate',
        'ruedas surf skate',
        'decks surf skate',
        'entrenamiento surf skate',
        'surfskate online',
    ],
    openGraph: {
        title: 'Surf Skate | Sr.Shaper Surfboards',
        description:
            'Surf skate para entrenar tus giros fuera del agua. Surfskates completos, decks, ejes, ruedas y más en Sr.Shaper.',
    },
    alternates: { canonical: '/surf-skate' },
};

export default function SurfSkateLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
