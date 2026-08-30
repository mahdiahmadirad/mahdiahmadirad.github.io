import type { Locale } from './locales';

export function localeHomePath(locale: Locale): `/${Locale}/` {
  return `/${locale}/`;
}

export function articlesPath(locale: Locale): `/${Locale}/articles/` {
  return `/${locale}/articles/`;
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

export function topicsPath(locale: Locale): `/${Locale}/topics/` {
  return `/${locale}/topics/`;
}

export function projectsPath(locale: Locale): `/${Locale}/projects/` {
  return `/${locale}/projects/`;
}

export function aboutPath(locale: Locale): `/${Locale}/about/` {
  return `/${locale}/about/`;
}

export function brandStoryPath(
  locale: Locale,
): `/${Locale}/about/historical-creature/` {
  return `/${locale}/about/historical-creature/`;
}

export function searchPath(locale: Locale): `/${Locale}/search/` {
  return `/${locale}/search/`;
}

export function rssPath(locale: Locale): `/${Locale}/rss.xml` {
  return `/${locale}/rss.xml`;
}
