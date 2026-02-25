'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Lang } from '@/lib/translations';

type LangContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextType>({
    lang: 'es',
    setLang: () => { },
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>('es');

    useEffect(() => {
        const stored = localStorage.getItem('srshaper-lang') as Lang | null;
        if (stored === 'es' || stored === 'en') {
            setLangState(stored);
        }
    }, []);

    const setLang = (newLang: Lang) => {
        setLangState(newLang);
        localStorage.setItem('srshaper-lang', newLang);
    };

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() {
    return useContext(LangContext);
}
