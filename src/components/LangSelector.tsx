'use client';

import { useLang } from '@/components/LanguageContext';

export function LangSelector() {
    const { lang, setLang } = useLang();

    return (
        <div className="lang-selector" aria-label="Seleccionar idioma">
            <button
                className={lang === 'es' ? 'active' : ''}
                onClick={() => setLang('es')}
                type="button"
                aria-pressed={lang === 'es'}
            >
                ES
            </button>
            <span className="lang-divider">|</span>
            <button
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
                type="button"
                aria-pressed={lang === 'en'}
            >
                EN
            </button>
        </div>
    );
}
