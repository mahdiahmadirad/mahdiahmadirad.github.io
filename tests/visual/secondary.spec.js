import { expect, test } from '@playwright/test';

const routes = {
  fa: ['topics', 'topics/complex-systems', 'about', 'about/historical-creature'],
  en: ['topics', 'about', 'about/historical-creature'],
};

for (const [locale, paths] of Object.entries(routes)) {
  for (const route of paths) {
    test(`${locale} ${route} renders without overflow`, async ({ page }, testInfo) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const response = await page.goto(`/${locale}/${route}/`);
      expect(response?.status()).toBe(200);
      const dimensions = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));
      const screenshot = await page.screenshot({ fullPage: true, animations: 'disabled' });
      expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
      expect(screenshot.byteLength).toBeGreaterThan(1_000);
      await testInfo.attach(`${locale}-${route.replaceAll('/', '-')}`, {
        body: screenshot,
        contentType: 'image/png',
      });
    });
  }
}

test('bilingual 404 renders without overflow', async ({ page }) => {
  await page.goto('/missing-route/');
  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
});
