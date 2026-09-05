import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const articleKeys = [
  'building-a-project-with-dad',
  'building-easier-than-understanding',
  'project-should-explain-itself',
  'same-place-different-self',
];

function parseYamlScalar(value) {
  if (value.startsWith('"') && value.endsWith('"')) {
    return JSON.parse(value);
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replaceAll("''", "'");
  }

  return value;
}

function readCover(source) {
  const coverBlock = source.match(/^cover:\s*\n((?: {2}\S[^\n]*(?:\n|$))+)/m);

  assert.ok(coverBlock, 'article frontmatter must include a cover mapping');

  return Object.fromEntries(
    coverBlock[1]
      .trimEnd()
      .split('\n')
      .map((line) => {
        const separator = line.indexOf(':');

        assert.ok(separator > 2, `invalid cover field: ${line}`);

        const key = line.slice(2, separator).trim();
        const value = line.slice(separator + 1).trim();

        return [key, parseYamlScalar(value)];
      }),
  );
}

test('cover reader accepts equivalent YAML scalar quoting styles', () => {
  const quoted = readCover(
    'cover:\n  src: "/images/article/hero.webp"\n  alt: "Artwork"\n',
  );
  const unquoted = readCover(
    'cover:\n  src: /images/article/hero.webp\n  alt: Artwork\n',
  );

  assert.deepEqual(unquoted, quoted);
});

test('pilot artwork is localized across all four bilingual articles', async () => {
  for (const articleKey of articleKeys) {
    for (const locale of ['fa', 'en']) {
      const source = await readFile(
        `src/content/articles/${articleKey}/${locale}.md`,
        'utf8',
      );
      const cover = readCover(source);

      assert.equal(
        cover.src,
        `/images/articles/${articleKey}/hero.webp`,
        `${articleKey}/${locale} must use its expected hero artwork`,
      );
      assert.ok(
        cover.alt,
        `${articleKey}/${locale} must provide localized artwork alt text`,
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
