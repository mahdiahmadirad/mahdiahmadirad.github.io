import type { CollectionEntry } from 'astro:content';

import { formatDate, formatNumber } from '../i18n/format';
import { getAlternateLocale, type Locale, locales } from '../i18n/locales';
import { articlePath, topicPath } from '../i18n/routing';
import { getUi } from '../i18n/ui';
import { calculateReadingTime } from './content/reading-time';
import { loadContentGraph } from './content/repository';
import {
  publishedArticles,
  resolveArticleTranslation,
} from './content/validate';

type ArticleEntry = CollectionEntry<'articles'>;

export interface HomeEdition {
  locale: Locale;
  href?: string;
  available: boolean;
}

export interface HomeArticle {
  title: string;
  description: string;
  href: string;
  date: string;
  readingTime: string;
  topic: string;
  sample: boolean;
  editions: HomeEdition[];
}

export interface HomeTopic {
  name: string;
  description: string;
  href: string;
  sample: boolean;
}

export interface HomeProject {
  name: string;
  summary: string;
  sample: boolean;
}

export interface HomePageData {
  featured: HomeArticle;
  recent: HomeArticle[];
  topics: HomeTopic[];
  projects: HomeProject[];
}

function newestFirst(first: ArticleEntry, second: ArticleEntry): number {
  const dateDifference =
    second.data.publishedAt.getTime() - first.data.publishedAt.getTime();

  return (
    dateDifference ||
    first.data.translationKey.localeCompare(second.data.translationKey)
  );
}

export async function getHomePageData(locale: Locale): Promise<HomePageData> {
  const graph = await loadContentGraph();
  const ui = getUi(locale);
  const alternateLocale = getAlternateLocale(locale);
  const topicNames = new Map(
    graph.topics
      .filter(({ data }) => data.lang === locale)
      .map(({ data }) => [data.translationKey, data.name]),
  );
  const articles = publishedArticles(graph.articles, locale).sort(newestFirst);

  if (articles.length === 0) {
    throw new Error(`Home requires at least one published ${locale} article.`);
  }

  const toHomeArticle = (article: ArticleEntry): HomeArticle => {
    const alternate = resolveArticleTranslation(
      graph.articles,
      article,
      alternateLocale,
    );
    const readingTime =
      article.data.readingTimeOverride ??
      calculateReadingTime(article.body ?? '', locale);

    return {
      title: article.data.title,
      description: article.data.description,
      href: articlePath(locale, article.data.slug),
      date: formatDate(article.data.publishedAt, locale),
      readingTime: ui.article.readingTime(formatNumber(readingTime, locale)),
      topic: topicNames.get(article.data.topics[0]) ?? article.data.topics[0],
      sample: article.data.sample,
      editions: locales.map((editionLocale) => {
        if (editionLocale === locale) {
          return {
            locale: editionLocale,
            href: articlePath(locale, article.data.slug),
            available: true,
          };
        }

        return alternate.state === 'available'
          ? {
              locale: editionLocale,
              href: articlePath(editionLocale, alternate.entry.data.slug),
              available: true,
            }
          : {
              locale: editionLocale,
              available: false,
            };
      }),
    };
  };

  const featuredEntry =
    articles.find(({ data }) => data.featured) ?? articles[0];

  return {
    featured: toHomeArticle(featuredEntry),
    recent: articles.slice(0, 8).map(toHomeArticle),
    topics: graph.topics
      .filter(({ data }) => data.lang === locale)
      .sort((first, second) => first.data.order - second.data.order)
      .map(({ data }) => ({
        name: data.name,
        description: data.description,
        href: topicPath(locale, data.slug),
        sample: data.sample,
      })),
    projects: graph.projects
      .filter(({ data }) => data.lang === locale)
      .sort((first, second) => first.data.order - second.data.order)
      .map(({ data }) => ({
        name: data.name,
        summary: data.summary,
        sample: data.sample,
      })),
  };
}
