import { expect, test } from '@playwright/test';

for (const locale of ['fa', 'en']) {
  test(`${locale} design system renders at the project viewport`, async ({
    page,
  }, testInfo) => {
    await page.goto(`/${locale}/design-system/`);
    await page.emulateMedia({ reducedMotion: 'reduce' });

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
    await testInfo.attach(`${locale}-design-system`, {
      body: screenshot,
      contentType: 'image/png',
    });
  });
}
