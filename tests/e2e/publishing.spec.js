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

test('the English brand story is present in the English search index', async ({
  page,
}) => {
  await page.goto('/en/search/');
  await page.getByRole('searchbox').fill('quadruped');
  await expect(
    page.locator(
      '[data-search-results] a[href="/en/about/historical-creature/"]',
    ),
  ).toBeVisible();
});

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

  await page.goto('/fa/about/historical-creature/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://mehdiahmadirad.me/fa/about/historical-creature/',
  );
  await expect(page.locator('link[hreflang="fa"]')).toHaveCount(1);
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
    'href',
    'https://mehdiahmadirad.me/en/about/historical-creature/',
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'website',
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    0,
  );
  await expect(page.locator('meta[name="pagefind:type"]')).toHaveAttribute(
    'content',
    'صفحه',
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);

  await page.goto('/en/about/historical-creature/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://mehdiahmadirad.me/en/about/historical-creature/',
  );
  await expect(page.locator('link[hreflang="fa"]')).toHaveAttribute(
    'href',
    'https://mehdiahmadirad.me/fa/about/historical-creature/',
  );
  await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'website',
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    0,
  );
  await expect(page.locator('meta[name="pagefind:type"]')).toHaveAttribute(
    'content',
    'Page',
  );
});

test('brand favicon metadata points to available head-only assets', async ({
  page,
}) => {
  await page.goto('/en/');
  await expect(
    page.locator('link[rel="icon"][sizes="512x512"]'),
  ).toHaveAttribute('href', '/favicon.png');
  await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute(
    'href',
    '/favicon-32.png',
  );
  await expect(page.locator('link[rel="icon"][sizes="16x16"]')).toHaveAttribute(
    'href',
    '/favicon-16.png',
  );
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'href',
    '/apple-touch-icon.png',
  );

  for (const path of [
    '/favicon.png',
    '/favicon-32.png',
    '/favicon-16.png',
    '/apple-touch-icon.png',
  ]) {
    const response = await page.request.get(path);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('image/png');
  }
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
        links: Array.from(faFeed.document.querySelectorAll('item > link')).map(
          (node) => node.textContent,
        ),
      },
      en: {
        ok: enFeed.ok,
        errors: enFeed.errorCount,
        language: enFeed.document.querySelector('language')?.textContent,
        items: enFeed.document.querySelectorAll('item').length,
        links: Array.from(enFeed.document.querySelectorAll('item > link')).map(
          (node) => node.textContent,
        ),
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
  expect(result.fa.links).not.toContain(
    'https://mehdiahmadirad.me/fa/about/historical-creature/',
  );
  expect(result.en.links).not.toContain(
    'https://mehdiahmadirad.me/en/about/historical-creature/',
  );
  expect(result.sitemap.indexErrors).toBe(0);
  expect(result.sitemap.errors).toBe(0);
  expect(result.sitemap.locations).toContain('https://mehdiahmadirad.me/fa/');
  expect(result.sitemap.locations).toContain('https://mehdiahmadirad.me/en/');
  expect(result.sitemap.locations).toContain(
    'https://mehdiahmadirad.me/fa/about/historical-creature/',
  );
  expect(result.sitemap.locations).toContain(
    'https://mehdiahmadirad.me/en/about/historical-creature/',
  );
  expect(result.robots).toContain(
    'Sitemap: https://mehdiahmadirad.me/sitemap-index.xml',
  );
});
