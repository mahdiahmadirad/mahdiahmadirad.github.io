import type { Locale } from './locales';
import { en } from './ui.en';
import { fa } from './ui.fa';
import type { UiDictionary } from './ui.types';

const dictionaries = { fa, en } satisfies Record<Locale, UiDictionary>;

export function getUi(locale: Locale): UiDictionary {
  return dictionaries[locale];
}
