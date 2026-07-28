import type {
  ArticleData,
  PageData,
  ProjectData,
  TopicData,
} from '../../content/schemas';
import type { Locale } from '../../i18n/locales';

export interface ContentRecord<TData> {
  id: string;
  data: TData;
}

export type ArticleRecord = ContentRecord<ArticleData>;
export type TopicRecord = ContentRecord<TopicData>;
export type ProjectRecord = ContentRecord<ProjectData>;
export type PageRecord = ContentRecord<PageData>;

export interface ContentGraph {
  articles: ArticleRecord[];
  topics: TopicRecord[];
  projects: ProjectRecord[];
  pages: PageRecord[];
}

export class ContentGraphError extends Error {
  readonly issues: string[];

  constructor(issues: string[]) {
    super(`Content graph validation failed:\n- ${issues.join('\n- ')}`);
    this.name = 'ContentGraphError';
    this.issues = issues;
  }
}

interface IdentityData {
  lang: Locale;
  translationKey: string;
  slug: string;
}

function validateIdentity(
  collection: string,
  entry: ContentRecord<IdentityData>,
  issues: string[],
): void {
  const parts = entry.id.split('/');

  if (parts.length !== 2) {
    issues.push(
      `${collection}/${entry.id} must use {translation-key}/{locale}.md.`,
    );
    return;
  }

  const [folder, filename] = parts;

  if (filename !== entry.data.lang) {
    issues.push(
      `${collection}/${entry.id} filename locale does not match lang=${entry.data.lang}.`,
    );
  }

  if (folder !== entry.data.translationKey) {
    issues.push(
      `${collection}/${entry.id} folder does not match translationKey=${entry.data.translationKey}.`,
    );
  }

  if (entry.data.slug !== entry.data.translationKey) {
    issues.push(
      `${collection}/${entry.id} slug must match its stable translationKey.`,
    );
  }
}

function validateUniqueEditions(
  collection: string,
  entries: ContentRecord<IdentityData>[],
  issues: string[],
): void {
  const editions = new Set<string>();

  for (const entry of entries) {
    const edition = `${entry.data.translationKey}:${entry.data.lang}`;

    if (editions.has(edition)) {
      issues.push(`${collection} contains duplicate edition ${edition}.`);
    }

    editions.add(edition);
  }
}

export function validateContentGraph(graph: ContentGraph): void {
  const issues: string[] = [];
  const collections = [
    ['articles', graph.articles],
    ['topics', graph.topics],
    ['projects', graph.projects],
    ['pages', graph.pages],
  ] as const;

  for (const [name, entries] of collections) {
    for (const entry of entries) {
      validateIdentity(name, entry, issues);
    }

    validateUniqueEditions(name, entries, issues);
  }

  const localizedTopics = new Set(
    graph.topics.map(({ data }) => `${data.lang}:${data.translationKey}`),
  );

  for (const article of graph.articles) {
    for (const topic of article.data.topics) {
      const reference = `${article.data.lang}:${topic}`;

      if (!localizedTopics.has(reference)) {
        issues.push(
          `articles/${article.id} references unknown topic ${topic} for locale ${article.data.lang}.`,
        );
      }
    }
  }

  if (issues.length > 0) {
    throw new ContentGraphError(issues);
  }
}

export function publishedArticles<TArticle extends ArticleRecord>(
  articles: TArticle[],
  locale?: Locale,
): TArticle[] {
  return articles.filter(
    ({ data }) => !data.draft && (!locale || data.lang === locale),
  );
}

export type TranslationResolution<
  TArticle extends ArticleRecord = ArticleRecord,
> =
  | {
      state: 'available';
      entry: TArticle;
    }
  | {
      state: 'unavailable';
      reason: 'missing' | 'draft';
      targetLocale: Locale;
    };

export function resolveArticleTranslation<TArticle extends ArticleRecord>(
  articles: TArticle[],
  article: TArticle,
  targetLocale: Locale,
): TranslationResolution<TArticle> {
  const translation = articles.find(
    ({ data }) =>
      data.translationKey === article.data.translationKey &&
      data.lang === targetLocale,
  );

  if (!translation) {
    return { state: 'unavailable', reason: 'missing', targetLocale };
  }

  if (translation.data.draft) {
    return { state: 'unavailable', reason: 'draft', targetLocale };
  }

  return { state: 'available', entry: translation };
}
