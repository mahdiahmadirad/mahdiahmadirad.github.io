import type { Locale } from './locales';

export function localeHomePath(locale: Locale): `/${Locale}/` {
  return `/${locale}/`;
}

export function articlePath(
  locale: Locale,
  slug: string,
): `/${Locale}/articles/${string}/` {
  return `/${locale}/articles/${slug}/`;
}

export function topicPath(
  locale: Locale,
  slug: string,
): `/${Locale}/topics/${string}/` {
  return `/${locale}/topics/${slug}/`;
}
