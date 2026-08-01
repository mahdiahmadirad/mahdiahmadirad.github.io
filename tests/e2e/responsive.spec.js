import { expect, test } from '@playwright/test';

const routes = [
  '',
  'articles/',
  'articles/document-aware-development/',
  'topics/',
  'topics/software-architecture/',
  'projects/',
  'about/',
  'search/',
];

for (const locale of ['fa', 'en']) {
  test(`${locale} primary route matrix has no document overflow at 320px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });

    for (const route of routes) {
      const path = `/${locale}/${route}`;
      await page.goto(path);
      const dimensions = await page.evaluate(() => ({
        documentWidth: globalThis.document.documentElement.scrollWidth,
        viewportWidth: globalThis.document.documentElement.clientWidth,
      }));
      expect(dimensions.documentWidth, path).toBeLessThanOrEqual(
        dimensions.viewportWidth,
      );
    }
  });

  test(`${locale} Home and Article reflow at the 200% equivalent width`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 640, height: 900 });

    for (const route of ['', 'articles/document-aware-development/']) {
      const path = `/${locale}/${route}`;
      await page.goto(path);
      const dimensions = await page.evaluate(() => ({
        documentWidth: globalThis.document.documentElement.scrollWidth,
        viewportWidth: globalThis.document.documentElement.clientWidth,
      }));
      expect(dimensions.documentWidth, path).toBeLessThanOrEqual(
        dimensions.viewportWidth,
      );
    }
  });
}

test('reduced-motion preference reaches the rendered site', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/');

  expect(
    await page.evaluate(
      () => globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches,
    ),
  ).toBe(true);
});
