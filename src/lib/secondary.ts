import type { CollectionEntry } from 'astro:content';

import { formatDate, formatNumber } from '../i18n/format';
import { getAlternateLocale, type Locale } from '../i18n/locales';
import { articlePath, brandStoryPath, topicPath } from '../i18n/routing';
import { getUi } from '../i18n/ui';
import type { HomeArticle } from './home';
import { calculateReadingTime } from './content/reading-time';
import { loadContentGraph } from './content/repository';
import {
  publishedArticles,
  resolveArticleTranslation,
} from './content/validate';

export type TopicEntry = CollectionEntry<'topics'>;
export type PageEntry = CollectionEntry<'pages'>;

const brandStoryKey = 'historical-creature';

function newestFirst(
  first: CollectionEntry<'articles'>,
  second: CollectionEntry<'articles'>,
): number {
  return (
    second.data.publishedAt.getTime() - first.data.publishedAt.getTime() ||
    first.data.translationKey.localeCompare(second.data.translationKey)
  );
}

async function articleSummaries(
  locale: Locale,
  topicKey?: string,
): Promise<HomeArticle[]> {
  const graph = await loadContentGraph();
  const ui = getUi(locale);
  const alternateLocale = getAlternateLocale(locale);
  const topicNames = new Map(
    graph.topics
      .filter(({ data }) => data.lang === locale)
      .map(({ data }) => [data.translationKey, data.name]),
  );

  return publishedArticles(graph.articles, locale)
    .filter(({ data }) => !topicKey || data.topics.includes(topicKey))
    .sort(newestFirst)
    .map((article) => {
      const alternate = resolveArticleTranslation(
        graph.articles,
        article,
        alternateLocale,
      );
      const minutes =
        article.data.readingTimeOverride ??
        calculateReadingTime(article.body ?? '', locale);

      return {
        title: article.data.title,
        description: article.data.description,
        href: articlePath(locale, article.data.slug),
        date: formatDate(article.data.publishedAt, locale),
        readingTime: ui.article.readingTime(formatNumber(minutes, locale)),
        topic: topicNames.get(article.data.topics[0]) ?? article.data.topics[0],
        sample: article.data.sample,
        editions: [locale, alternateLocale].map((editionLocale) =>
          editionLocale === locale
            ? {
                locale: editionLocale,
                href: articlePath(locale, article.data.slug),
                available: true,
              }
            : alternate.state === 'available'
              ? {
                  locale: editionLocale,
                  href: articlePath(editionLocale, alternate.entry.data.slug),
                  available: true,
                }
              : { locale: editionLocale, available: false },
        ),
      };
    });
}

export async function getArticleIndex(locale: Locale) {
  return articleSummaries(locale);
}

export async function getTopicIndex(locale: Locale) {
  const graph = await loadContentGraph();
  const articles = publishedArticles(graph.articles, locale);

  return graph.topics
    .filter(({ data }) => data.lang === locale)
    .map(({ data }) => ({
      name: data.name,
      description: data.description,
      href: topicPath(locale, data.slug),
      count: articles.filter(({ data: article }) =>
        article.topics.includes(data.translationKey),
      ).length,
      order: data.order,
    }))
    .filter(({ count }) => count > 0)
    .sort((first, second) => first.order - second.order);
}

export async function getTopicPaths() {
  const graph = await loadContentGraph();
  const articles = publishedArticles(graph.articles);

  return graph.topics
    .filter(({ data }) =>
      articles.some(
        ({ data: article }) =>
          article.lang === data.lang &&
          article.topics.includes(data.translationKey),
      ),
    )
    .map((entry) => ({
      params: { lang: entry.data.lang, slug: entry.data.slug },
      props: { entry },
    }));
}

export async function getTopicPage(entry: TopicEntry) {
  return articleSummaries(entry.data.lang as Locale, entry.data.translationKey);
}

export async function getProjects(locale: Locale) {
  const { projects } = await loadContentGraph();

  return projects
    .filter(({ data }) => data.lang === locale)
    .sort((first, second) => first.data.order - second.data.order);
}

export async function getAboutPage(locale: Locale): Promise<PageEntry> {
  const { pages } = await loadContentGraph();
  const entry = pages.find(
    ({ data }) =>
      data.lang === locale && data.translationKey === 'about' && !data.draft,
  );

  if (!entry) {
    throw new Error(
      `A published placeholder About page is required for ${locale}.`,
    );
  }

  return entry;
}

export async function getBrandStoryPaths() {
  const { pages } = await loadContentGraph();

  return pages
    .filter(({ data }) => data.translationKey === brandStoryKey && !data.draft)
    .map((entry) => ({
      params: { lang: entry.data.lang },
      props: { entry },
    }));
}

export async function getBrandStoryTranslation(
  entry: PageEntry,
  targetLocale: Locale,
) {
  const { pages } = await loadContentGraph();
  const translation = pages.find(
    ({ data }) =>
      data.translationKey === entry.data.translationKey &&
      data.lang === targetLocale,
  );

  if (!translation || translation.data.draft) {
    return { state: 'unavailable' as const, targetLocale };
  }

  return { state: 'available' as const, entry: translation };
}

export async function getBrandStoryLink(locale: Locale) {
  const { pages } = await loadContentGraph();
  const entries = pages.filter(
    ({ data }) => data.translationKey === brandStoryKey && !data.draft,
  );
  const entry =
    entries.find(({ data }) => data.lang === locale) ??
    entries.find(({ data }) => data.lang === 'fa') ??
    entries[0];

  return entry
    ? {
        href: brandStoryPath(entry.data.lang as Locale),
        locale: entry.data.lang as Locale,
      }
    : undefined;
}
