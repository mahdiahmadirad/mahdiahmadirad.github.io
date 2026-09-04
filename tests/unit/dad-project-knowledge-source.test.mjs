import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('DaD II preserves the approved Persian prose and quoted artifact excerpts', () => {
  const article = readFileSync(
    'src/content/articles/project-should-explain-itself/fa.md',
    'utf8',
  );
  const prose = article
    .split('---')[2]
    .replace(/<figure[\s\S]*?<\/figure>/gu, '')
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gu, '')
    .replace(/\[مقاله‌ی قبل\]\([^)]*\)/u, 'مقاله‌ی قبل')
    .trim();
  // Edited writing block 74218: only h1 and eight presentation blocks removed.
  // No whitespace, orthography or punctuation normalization.
  assert.equal(
    createHash('sha256').update(prose).digest('hex'),
    '4204ff517e55f815d240c8cd508dd1689b65e21b34ecc26fbd8ad7965d36b2a6',
  );
  const excerpts = [
    ...article.matchAll(/<blockquote[^>]*>\s*<p>(.*?)<\/p>\s*<\/blockquote>/gu),
  ].map((match) =>
    match[1].replace(/<br \/>/gu, '\n').replace(/<\/?strong>/gu, ''),
  );
  assert.deepEqual(excerpts, [
    'ADR-0003\nAI provider must remain replaceable.',
    'SPEC-0007\nUse OpenAI SDK directly for all AI operations.',
    'TASK-0012\nIntegrate OpenAI SDK into application services.',
  ]);
});
