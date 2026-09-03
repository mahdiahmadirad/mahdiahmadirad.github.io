import { expect, test } from '@playwright/test';

const articlePath = '/fa/articles/same-place-different-self/';

test('published Persian article is readable and indexable', async ({ page }) => {
  const response = await page.goto(articlePath);
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('[data-article-page]')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'بازگشت به همان‌جا، اما نه همان آدم',
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'Canon per Tonos', exact: true }).first(),
  ).toHaveAttribute('href', 'https://www.youtube.com/watch?v=eXXO2dN3P_w');
});

test('published Persian article reports its missing English translation honestly', async ({
  page,
}) => {
  await page.goto(articlePath);
  await expect(page.locator('[data-translation-state="unavailable"]')).toBeVisible();
  await expect(page.locator('.language-link')).toHaveAttribute('href', '/en/');
  await expect(page.locator('link[hreflang="fa"]')).toHaveCount(1);
  await expect(page.locator('link[hreflang="en"]')).toHaveCount(0);
});

test('published article has no document overflow at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(articlePath);
  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
});
