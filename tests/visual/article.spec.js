import { expect, test } from '@playwright/test';

for (const locale of ['fa', 'en']) {
  test(`${locale} Article renders fully without document overflow`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/${locale}/articles/document-aware-development/`);

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
    await testInfo.attach(`${locale}-article`, {
      body: screenshot,
      contentType: 'image/png',
    });
  });
}
