import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { texts } = await request.json() as { texts: string[] };
        if (!Array.isArray(texts) || texts.length === 0) {
            return NextResponse.json({ translations: [] });
        }

        const translations: string[] = [];

        for (const text of texts) {
            if (!text || !text.trim()) {
                translations.push('');
                continue;
            }
            try {
                const encoded = encodeURIComponent(text);
                const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=es|en`;
                const res = await fetch(url, { next: { revalidate: 0 } });
                const data = await res.json() as { responseData?: { translatedText?: string }; responseStatus?: number };

                if (data.responseData?.translatedText && data.responseStatus !== 403) {
                    translations.push(data.responseData.translatedText);
                } else {
                    translations.push(text); // fallback: keep original
                }
            } catch {
                translations.push(text);
            }
        }

        return NextResponse.json({ translations });
    } catch {
        return NextResponse.json({ translations: [] }, { status: 500 });
    }
}
