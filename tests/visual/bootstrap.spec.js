import { expect, test } from '@playwright/test';

test('the generated root document renders without horizontal overflow', async ({
  page,
  request,
}) => {
  const response = await request.get('/', { maxRedirects: 0 });
  const html = await response.text();
  const renderableHtml = html.replace(/<meta http-equiv="refresh"[^>]*>/i, '');

  await page.setContent(renderableHtml);

  const dimensions = await page.evaluate(() => ({
    documentWidth: globalThis.document.documentElement.scrollWidth,
    viewportWidth: globalThis.document.documentElement.clientWidth,
  }));
  const screenshot = await page.screenshot();

  expect(dimensions.documentWidth).toBeLessThanOrEqual(
    dimensions.viewportWidth,
  );
  expect(screenshot.byteLength).toBeGreaterThan(100);
});
