export const parseProductImageUrls = (raw?: string | null): string[] => {
  if (!raw) return [];
  const value = raw.trim();
  if (!value) return [];

  if (value.startsWith('[')) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => (typeof item === 'string' ? item.trim() : ''))
          .filter(Boolean);
      }
    } catch {
      // Fall through to plain URL parsing.
    }
  }

  if (value.includes('|')) {
    return value
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [value];
};

export const serializeProductImageUrls = (urls: string[]): string | null => {
  const unique = Array.from(
    new Set(
      urls
        .map((url) => url.trim())
        .filter(Boolean)
    )
  );

  if (!unique.length) return null;
  if (unique.length === 1) return unique[0];
  return JSON.stringify(unique);
};

export const getPrimaryProductImage = (
  raw?: string | null,
  fallback = '/logo-srshaper.svg'
): string => {
  const images = parseProductImageUrls(raw);
  return images[0] || fallback;
};

