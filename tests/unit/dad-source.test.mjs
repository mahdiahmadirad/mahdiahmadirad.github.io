import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('DaD Persian prose preserves the approved edited conversation text', () => {
  const article = readFileSync(
    'src/content/articles/building-easier-than-understanding/fa.md',
    'utf8',
  );
  const prose = article
    .split('---')[2]
    .replace(/<figure[\s\S]*?<\/figure>/gu, '')
    .trim();
  // Retrieved writing block 58341, excluding its h1 and six diagram blocks.
  assert.equal(
    createHash('sha256').update(prose).digest('hex'),
    '96392496254caf3a881cd76a47578aaafcc33f25502ed47e37fdd38d4301c040',
  );
});
