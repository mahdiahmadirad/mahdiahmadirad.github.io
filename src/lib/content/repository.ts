import { getCollection, type CollectionEntry } from 'astro:content';

import type { Locale } from '../../i18n/locales';
import {
  publishedArticles,
  resolveArticleTranslation,
  validateContentGraph,
  type TranslationResolution,
} from './validate';

export type ArticleEntry = CollectionEntry<'articles'>;

export async function loadContentGraph() {
  const [articles, topics, projects, pages] = await Promise.all([
    getCollection('articles'),
    getCollection('topics'),
    getCollection('projects'),
    getCollection('pages'),
  ]);
  const graph = { articles, topics, projects, pages };

  validateContentGraph(graph);

  return graph;
}

export async function getPublishedArticles(
  locale?: Locale,
): Promise<ArticleEntry[]> {
  const { articles } = await loadContentGraph();

  return publishedArticles(articles, locale);
}

export async function getArticleTranslation(
  article: ArticleEntry,
  targetLocale: Locale,
): Promise<TranslationResolution<ArticleEntry>> {
  const { articles } = await loadContentGraph();

  return resolveArticleTranslation(articles, article, targetLocale);
}
