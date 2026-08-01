import type { CollectionEntry } from 'astro:content';

import { formatDate, formatNumber } from '../i18n/format';
import { getAlternateLocale, type Locale } from '../i18n/locales';
import { articlePath } from '../i18n/routing';
import { getUi } from '../i18n/ui';
import { calculateReadingTime } from './content/reading-time';
import { loadContentGraph } from './content/repository';
import {
  publishedArticles,
  resolveArticleTranslation,
  type TranslationResolution,
} from './content/validate';

export type ArticleEntry = CollectionEntry<'articles'>;

export interface ArticleLink {
  title: string;
  href: string;
}

export interface ArticlePageData {
  entry: ArticleEntry;
  published: string;
  updated?: string;
  readingTime: string;
  topicNames: string[];
  translation: TranslationResolution<ArticleEntry>;
  previous?: ArticleLink;
  next?: ArticleLink;
  related: ArticleLink[];
}

function newestFirst(first: ArticleEntry, second: ArticleEntry): number {
  return (
    second.data.publishedAt.getTime() - first.data.publishedAt.getTime() ||
    first.data.translationKey.localeCompare(second.data.translationKey)
  );
}

function toLink(entry: ArticleEntry): ArticleLink {
  return {
    title: entry.data.title,
    href: articlePath(entry.data.lang, entry.data.slug),
  };
}

export async function getArticlePaths() {
  const graph = await loadContentGraph();

  return publishedArticles(graph.articles).map((entry) => ({
    params: { lang: entry.data.lang, slug: entry.data.slug },
    props: { entry },
  }));
}

export async function getArticlePageData(
  entry: ArticleEntry,
): Promise<ArticlePageData> {
  const locale = entry.data.lang as Locale;
  const alternateLocale = getAlternateLocale(locale);
  const ui = getUi(locale);
  const graph = await loadContentGraph();
  const localizedArticles = publishedArticles(graph.articles, locale).sort(
    newestFirst,
  );
  const currentIndex = localizedArticles.findIndex(({ id }) => id === entry.id);
  const topics = new Map(
    graph.topics
      .filter(({ data }) => data.lang === locale)
      .map(({ data }) => [data.translationKey, data.name]),
  );
  const readingTime =
    entry.data.readingTimeOverride ??
    calculateReadingTime(entry.body ?? '', locale);
  const related = localizedArticles
    .filter(
      (candidate) =>
        candidate.id !== entry.id &&
        candidate.data.topics.some((topic) =>
          entry.data.topics.includes(topic),
        ),
    )
    .slice(0, 3)
    .map(toLink);

  return {
    entry,
    published: formatDate(entry.data.publishedAt, locale),
    updated: entry.data.updatedAt
      ? formatDate(entry.data.updatedAt, locale)
      : undefined,
    readingTime: ui.article.readingTime(formatNumber(readingTime, locale)),
    topicNames: entry.data.topics.map((topic) => topics.get(topic) ?? topic),
    translation: resolveArticleTranslation(
      graph.articles,
      entry,
      alternateLocale,
    ),
    previous:
      currentIndex >= 0 && currentIndex < localizedArticles.length - 1
        ? toLink(localizedArticles[currentIndex + 1])
        : undefined,
    next:
      currentIndex > 0
        ? toLink(localizedArticles[currentIndex - 1])
        : undefined,
    related,
  };
}
