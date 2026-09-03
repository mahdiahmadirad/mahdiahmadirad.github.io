import { expect, test } from '@playwright/test';

test('published Persian article metadata is indexable and truthful', async ({
  page,
}) => {
  await page.goto('/fa/articles/same-place-different-self/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://mehdiahmadirad.me/fa/articles/same-place-different-self/',
  );
  await expect(page.locator('link[hreflang="fa"]')).toHaveCount(1);
  await expect(page.locator('link[hreflang="en"]')).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'article',
  );
});

test('brand story metadata is bilingual and indexable', async ({ page }) => {
  for (const locale of ['fa', 'en']) {
    await page.goto(`/${locale}/about/historical-creature/`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://mehdiahmadirad.me/${locale}/about/historical-creature/`,
    );
    await expect(page.locator('link[hreflang="fa"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  }
});

test('robots and sitemap expose the production site to crawlers', async ({
  page,
}) => {
  const robots = await (await page.request.get('/robots.txt')).text();
  expect(robots).toContain('Allow: /');
  expect(robots.toLowerCase()).not.toContain('disallow: /');

  const sitemapIndex = await page.request.get('/sitemap-index.xml');
  expect(sitemapIndex.ok()).toBe(true);
  const sitemapIndexText = await sitemapIndex.text();
  expect(sitemapIndexText).toContain('sitemap');
});

test('RSS feeds reflect currently published articles only', async ({
  page,
}) => {
  const faFeed = await page.request.get('/fa/rss.xml');
  const enFeed = await page.request.get('/en/rss.xml');
  expect(faFeed.ok()).toBe(true);
  expect(enFeed.ok()).toBe(true);

  const faText = await faFeed.text();
  const enText = await enFeed.text();
  expect(faText).toContain('/fa/articles/same-place-different-self/');
  expect(faText).not.toMatch(
    /document-aware-development|signals-before-solutions/,
  );
  expect(enText).not.toMatch(
    /document-aware-development|signals-before-solutions/,
  );
});

test('removed test routes stay absent', async ({ page }) => {
  for (const path of [
    '/fa/projects/',
    '/en/projects/',
    '/fa/design-system/',
    '/en/design-system/',
    '/fa/articles/document-aware-development/',
    '/en/articles/document-aware-development/',
  ]) {
    const response = await page.request.get(path);
    expect(response.status(), path).toBe(404);
  }
});
