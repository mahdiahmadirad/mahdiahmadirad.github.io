import { expect, test } from '@playwright/test';

const localeState = {
  en: { direction: 'ltr' },
  fa: { direction: 'rtl' },
};

for (const [locale, expected] of Object.entries(localeState)) {
  test(`${locale} production secondary routes are localized and indexable`, async ({
    page,
  }) => {
    const routes = [
      ['articles', '[data-articles-index]'],
      ['topics', '[data-topics-index]'],
      ['about', '[data-about-page]'],
      ['search', '[data-search-page]'],
    ];

    for (const [route, selector] of routes) {
      const response = await page.goto(`/${locale}/${route}/`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute(
        'dir',
        expected.direction,
      );
      await expect(page.locator(selector)).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    }
  });

  test(`${locale} removed project route stays removed`, async ({ page }) => {
    const response = await page.goto(`/${locale}/projects/`);
    expect(response?.status()).toBe(404);
  });

  test(`${locale} About exposes the brand story from the footer`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/`);
    await expect(
      page.locator(`footer a[href="/${locale}/about/historical-creature/"]`),
    ).toBeVisible();

    const response = await page.goto(`/${locale}/about/historical-creature/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('[data-brand-story-page]')).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  });
}

test('published Persian topic detail resolves and removed sample topic does not', async ({
  page,
}) => {
  const response = await page.goto('/fa/topics/complex-systems/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('[data-topic-detail]')).toBeVisible();
  expect(await page.locator('.writing-row').count()).toBeGreaterThan(0);

  const missing = await page.goto('/fa/topics/unpublished-sample/');
  expect(missing?.status()).toBe(404);
});

test('navigation contains no Projects link', async ({ page }) => {
  for (const locale of ['fa', 'en']) {
    await page.goto(`/${locale}/`);
    await expect(page.locator(`a[href="/${locale}/projects/"]`)).toHaveCount(0);
  }
});
