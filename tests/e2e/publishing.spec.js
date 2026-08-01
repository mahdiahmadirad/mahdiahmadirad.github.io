import { expect, test } from '@playwright/test';

const cases = [
  { locale: 'fa', term: 'معماری' },
  { locale: 'en', term: 'architecture' },
];

for (const { locale, term } of cases) {
  test(`${locale} search stays inside its language edition`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/search/`);
    await page.getByRole('searchbox').fill(term);
    const results = page.locator('[data-search-results] > li');
    await expect(results.first()).toBeVisible();
    await expect(page.locator('[data-search-status]')).not.toContainText('…');
    const links = await results
      .locator('a')
      .evaluateAll((nodes) =>
        nodes.map((node) => new globalThis.URL(node.href).pathname),
      );
    expect(links.length).toBeGreaterThan(0);
    expect(links.every((path) => path.startsWith(`/${locale}/`))).toBe(true);
  });
}

test('metadata is centralized and published alternates are truthful', async ({
  page,
}) => {
  await page.goto('/fa/articles/document-aware-development/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://mehdiahmadirad.me/fa/articles/document-aware-development/',
  );
  await expect(page.locator('link[hreflang="fa"]')).toHaveCount(1);
  await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'article',
  );
  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(JSON.parse(structuredData)['@type']).toBe('Article');

  await page.goto('/fa/articles/signals-before-solutions/');
  await expect(page.locator('link[hreflang="fa"]')).toHaveCount(1);
  await expect(page.locator('link[hreflang="en"]')).toHaveCount(0);
});

test('RSS feeds, sitemap, and robots are parseable', async ({ page }) => {
  await page.goto('/en/');
  const result = await page.evaluate(async () => {
    const parse = async (path) => {
      const response = await globalThis.fetch(path);
      const text = await response.text();
      const document = new globalThis.DOMParser().parseFromString(
        text,
        'application/xml',
      );
      return {
        ok: response.ok,
        errorCount: document.querySelectorAll('parsererror').length,
        document,
      };
    };
    const faFeed = await parse('/fa/rss.xml');
    const enFeed = await parse('/en/rss.xml');
    const sitemapIndex = await parse('/sitemap-index.xml');
    const sitemapLocation =
      sitemapIndex.document.querySelector('loc')?.textContent;
    const sitemap = await parse(new globalThis.URL(sitemapLocation).pathname);
    const robots = await (await globalThis.fetch('/robots.txt')).text();
    return {
      fa: {
        ok: faFeed.ok,
        errors: faFeed.errorCount,
        language: faFeed.document.querySelector('language')?.textContent,
        items: faFeed.document.querySelectorAll('item').length,
      },
      en: {
        ok: enFeed.ok,
        errors: enFeed.errorCount,
        language: enFeed.document.querySelector('language')?.textContent,
        items: enFeed.document.querySelectorAll('item').length,
      },
      sitemap: {
        indexErrors: sitemapIndex.errorCount,
        errors: sitemap.errorCount,
        locations: Array.from(sitemap.document.querySelectorAll('loc')).map(
          (node) => node.textContent,
        ),
      },
      robots,
    };
  });

  expect(result.fa).toMatchObject({ ok: true, errors: 0, language: 'fa' });
  expect(result.en).toMatchObject({ ok: true, errors: 0, language: 'en' });
  expect(result.fa.items).toBeGreaterThan(0);
  expect(result.en.items).toBeGreaterThan(0);
  expect(result.sitemap.indexErrors).toBe(0);
  expect(result.sitemap.errors).toBe(0);
  expect(result.sitemap.locations).toContain('https://mehdiahmadirad.me/fa/');
  expect(result.sitemap.locations).toContain('https://mehdiahmadirad.me/en/');
  expect(result.robots).toContain(
    'Sitemap: https://mehdiahmadirad.me/sitemap-index.xml',
  );
});
