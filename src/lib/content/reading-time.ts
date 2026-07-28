import type { Locale } from '../../i18n/locales';

const wordsPerMinute: Record<Locale, number> = {
  fa: 180,
  en: 220,
};

function wordCount(value: string): number {
  return value.trim() ? value.trim().split(/\s+/u).length : 0;
}

export function calculateReadingTime(markdown: string, locale: Locale): number {
  let codeWords = 0;
  const prose = markdown.replace(/```[\s\S]*?```/gu, (codeBlock) => {
    codeWords += wordCount(codeBlock.replace(/```[^\n]*\n?/gu, ''));
    return ' ';
  });
  const weightedWords = wordCount(prose) + codeWords * 0.5;

  return Math.max(1, Math.ceil(weightedWords / wordsPerMinute[locale]));
}
