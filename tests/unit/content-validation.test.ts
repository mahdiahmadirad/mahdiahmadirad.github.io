import assert from 'node:assert/strict';
import test from 'node:test';

import { articleSchema, topicSchema } from '../../src/content/schemas';
import {
  ContentGraphError,
  publishedArticles,
  resolveArticleTranslation,
  validateContentGraph,
  type ArticleRecord,
  type ContentGraph,
} from '../../src/lib/content/validate';

function article(
  translationKey: string,
  lang: 'fa' | 'en',
  options: { draft?: boolean; topics?: string[] } = {},
): ArticleRecord {
  return {
    id: `${translationKey}/${lang}`,
    data: articleSchema.parse({
      title: `Sample article ${translationKey}`,
      description:
        'A sufficiently descriptive sample summary used only for content validation tests.',
      lang,
      translationKey,
      slug: translationKey,
      publishedAt: '2026-07-01',
      topics: options.topics ?? ['software-architecture'],
      draft: options.draft ?? false,
      sample: true,
    }),
  };
}

function graph(articles: ArticleRecord[]): ContentGraph {
  return {
    articles,
    topics: [
      {
        id: 'software-architecture/fa',
        data: topicSchema.parse({
          name: 'معماری نرم‌افزار',
          description:
            'توضیح نمونه برای اعتبارسنجی موضوع فارسی در زیرساخت محتوا.',
          lang: 'fa',
          translationKey: 'software-architecture',
          slug: 'software-architecture',
          order: 10,
          sample: true,
        }),
      },
      {
        id: 'software-architecture/en',
        data: topicSchema.parse({
          name: 'Software Architecture',
          description:
            'A sample description for validating an English topic relationship.',
          lang: 'en',
          translationKey: 'software-architecture',
          slug: 'software-architecture',
          order: 10,
          sample: true,
        }),
      },
    ],
    projects: [],
    pages: [],
  };
}

test('content graph accepts independent bilingual editions', () => {
  const articles = [
    article('sample-work', 'fa'),
    article('sample-work', 'en'),
    article('fa-only-work', 'fa'),
  ];

  assert.doesNotThrow(() => validateContentGraph(graph(articles)));
  assert.equal(publishedArticles(articles, 'fa').length, 2);
  assert.equal(publishedArticles(articles, 'en').length, 1);
});

test('unknown localized topics fail content graph validation', () => {
  const invalidGraph = graph([
    article('sample-work', 'en', { topics: ['unknown-topic'] }),
  ]);

  assert.throws(
    () => validateContentGraph(invalidGraph),
    (error: unknown) =>
      error instanceof ContentGraphError &&
      error.message.includes('references unknown topic unknown-topic'),
  );
});

test('draft editions are filtered and unavailable as translations', () => {
  const persian = article('sample-work', 'fa');
  const englishDraft = article('sample-work', 'en', { draft: true });
  const articles = [persian, englishDraft];

  assert.deepEqual(publishedArticles(articles), [persian]);
  assert.deepEqual(resolveArticleTranslation(articles, persian, 'en'), {
    state: 'unavailable',
    reason: 'draft',
    targetLocale: 'en',
  });
});

test('published and missing translation states resolve honestly', () => {
  const persian = article('sample-work', 'fa');
  const english = article('sample-work', 'en');
  const monolingual = article('fa-only-work', 'fa');
  const articles = [persian, english, monolingual];

  assert.equal(
    resolveArticleTranslation(articles, persian, 'en').state,
    'available',
  );
  assert.deepEqual(resolveArticleTranslation(articles, monolingual, 'en'), {
    state: 'unavailable',
    reason: 'missing',
    targetLocale: 'en',
  });
});
