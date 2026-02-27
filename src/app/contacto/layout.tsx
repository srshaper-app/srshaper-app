import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacto',
    description:
        'Contacta con Sr.Shaper en Las Palmas de Gran Canaria. Escríbenos por WhatsApp, email o visítanos en C. Mary Sánchez 41. Respondemos en menos de 24 horas.',
    openGraph: {
        title: 'Contacto | Sr.Shaper Surfboards',
        description:
            'Contacta con Sr.Shaper por WhatsApp, email o visítanos en nuestro taller en Las Palmas de Gran Canaria.',
    },
    alternates: { canonical: '/contacto' },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
