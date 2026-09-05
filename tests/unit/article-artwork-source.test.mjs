import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const articleKeys = [
  'building-a-project-with-dad',
  'building-easier-than-understanding',
  'project-should-explain-itself',
  'same-place-different-self',
];

test('pilot artwork is localized across all four bilingual articles', async () => {
  for (const articleKey of articleKeys) {
    for (const locale of ['fa', 'en']) {
      const source = await readFile(
        `src/content/articles/${articleKey}/${locale}.md`,
        'utf8',
      );
      assert.match(
        source,
        /^cover:\n {2}src: ".+\/hero\.webp"\n {2}alt: ".+"$/m,
      );
    }
  }
});

test('templates limit artwork to article and featured Home surfaces', async () => {
  const articleTemplate = await readFile(
    'src/pages/[lang]/articles/[slug]/index.astro',
    'utf8',
  );
  const featured = await readFile(
    'src/components/home/FeaturedEssay.astro',
    'utf8',
  );
  const writingList = await readFile(
    'src/components/home/WritingList.astro',
    'utf8',
  );

  assert.match(articleTemplate, /<ArticleArtwork/);
  assert.match(featured, /<ArticleArtwork/);
  assert.doesNotMatch(writingList, /ArticleArtwork|<img/);
});
