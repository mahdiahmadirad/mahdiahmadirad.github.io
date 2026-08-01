import { expect, test } from '@playwright/test';

const routes = [
  ['topics', 'topics'],
  ['topics/software-architecture', 'topic-detail'],
  ['projects', 'projects'],
  ['about', 'about'],
];

for (const locale of ['fa', 'en']) {
  for (const [route, pageType] of routes) {
    test(`${locale} ${pageType} renders without overflow`, async ({
      page,
    }, testInfo) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(`/${locale}/${route}/`);
      const dimensions = await page.evaluate(() => ({
        documentWidth: globalThis.document.documentElement.scrollWidth,
        viewportWidth: globalThis.document.documentElement.clientWidth,
      }));
      const screenshot = await page.screenshot({
        fullPage: true,
        animations: 'disabled',
      });

      expect(dimensions.documentWidth).toBeLessThanOrEqual(
        dimensions.viewportWidth,
      );
      expect(screenshot.byteLength).toBeGreaterThan(1_000);
      await testInfo.attach(`${locale}-${pageType}`, {
        body: screenshot,
        contentType: 'image/png',
      });
    });
  }
}

test('bilingual 404 renders without overflow', async ({ page }, testInfo) => {
  await page.goto('/missing-route/');
  const dimensions = await page.evaluate(() => ({
    documentWidth: globalThis.document.documentElement.scrollWidth,
    viewportWidth: globalThis.document.documentElement.clientWidth,
  }));
  const screenshot = await page.screenshot({
    fullPage: true,
    animations: 'disabled',
  });

  expect(dimensions.documentWidth).toBeLessThanOrEqual(
    dimensions.viewportWidth,
  );
  expect(screenshot.byteLength).toBeGreaterThan(1_000);
  await testInfo.attach('bilingual-404', {
    body: screenshot,
    contentType: 'image/png',
  });
});
