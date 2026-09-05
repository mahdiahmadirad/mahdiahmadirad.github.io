import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('DaD III English edition preserves the source structure and future Drift', () => {
  const persian = readFileSync(
    'src/content/articles/building-a-project-with-dad/fa.md',
    'utf8',
  );
  const english = readFileSync(
    'src/content/articles/building-a-project-with-dad/en.md',
    'utf8',
  );

  assert.equal((english.match(/^## /gmu) ?? []).length, 15);
  assert.equal(
    (english.match(/^## /gmu) ?? []).length,
    (persian.match(/^## /gmu) ?? []).length,
  );
  assert.equal((english.match(/<figure/gu) ?? []).length, 6);
  assert.match(
    english,
    /In the repository's next iteration, we will deliberately introduce a change/u,
  );
  assert.match(english, /The next step for this sample is to break it/u);
  assert.match(
    english,
    /We will keep the build and tests green while making the project inconsistent/u,
  );
  assert.doesNotMatch(
    english,
    /(?:Drift experiment|Reconciliation) (?:is|has been) complete/iu,
  );
});
