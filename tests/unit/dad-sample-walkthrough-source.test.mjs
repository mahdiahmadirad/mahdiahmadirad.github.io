import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('DaD III preserves the edited Persian prose and future Drift state', () => {
  const article = readFileSync(
    'src/content/articles/building-a-project-with-dad/fa.md',
    'utf8',
  );
  const prose = article
    .split('---')[2]
    .replace(/<figure[\s\S]*?<\/figure>/gu, '')
    .replace(/\[([^\]]+)\]\(\/fa\/articles\/[^)]+\)/gu, '$1')
    .trim();

  // Edited attachment: h1 and six presentation placeholders/flows excluded.
  // Visible series links do not change the approved wording.
  assert.equal(
    createHash('sha256').update(prose).digest('hex'),
    '7506072ec0129865b9be57b8d990744ddd781d8f7ddaf1c0e8aea86cbef35d9d',
  );
  assert.match(
    article,
    /در iteration بعدی repository، عمداً تغییری ایجاد خواهیم کرد/u,
  );
  assert.match(article, /مرحله‌ی بعدی برای همین sample این است که خرابش کنیم/u);
  assert.doesNotMatch(article, /سناریوی Drift (?:کامل|انجام|اجرا) شد/u);
});
