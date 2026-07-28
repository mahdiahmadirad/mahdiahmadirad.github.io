import assert from 'node:assert/strict';
import test from 'node:test';

import { articleSchema } from '../../src/content/schemas';

const validArticle = {
  title: 'Sample article title',
  description:
    'A sufficiently descriptive sample summary for validating article metadata.',
  lang: 'en',
  translationKey: 'sample-article',
  slug: 'sample-article',
  publishedAt: '2026-07-01',
  topics: ['software-architecture'],
  sample: true,
};

test('article schema applies publication defaults', () => {
  const article = articleSchema.parse(validArticle);

  assert.equal(article.draft, false);
  assert.equal(article.featured, false);
  assert.ok(article.publishedAt instanceof Date);
});

test('article schema rejects invalid chronology', () => {
  assert.throws(() =>
    articleSchema.parse({
      ...validArticle,
      updatedAt: '2026-06-30',
    }),
  );
});

test('article schema rejects duplicate topics and unstable slugs', () => {
  assert.throws(() =>
    articleSchema.parse({
      ...validArticle,
      topics: ['software-architecture', 'software-architecture'],
    }),
  );
  assert.throws(() =>
    articleSchema.parse({
      ...validArticle,
      slug: 'Sample Article',
    }),
  );
});
