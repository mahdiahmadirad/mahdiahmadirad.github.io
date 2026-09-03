import { expect, test } from '@playwright/test';

for (const locale of ['fa', 'en']) {
  test(`published ${locale} article renders without overflow`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/${locale}/articles/same-place-different-self/`);
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
    await testInfo.attach(`${locale}-published-article`, {
      body: screenshot,
      contentType: 'image/png',
    });
  });
}
