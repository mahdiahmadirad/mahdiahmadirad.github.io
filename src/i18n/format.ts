import type { Locale } from './locales';

const localeTags: Record<Locale, string> = {
  fa: 'fa-IR-u-ca-persian-nu-arabext',
  en: 'en',
};

export const displayTimeZone = 'Asia/Tehran';

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale]).format(value);
}

export function formatDate(value: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: displayTimeZone,
  }).format(value);
}
