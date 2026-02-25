/**
 * Formats a price in cents into a locale-aware currency string.
 * Defaults to EUR with Spanish locale formatting.
 */
export const formatMoney = (valueCents: number, currency = 'EUR'): string =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(valueCents / 100);
