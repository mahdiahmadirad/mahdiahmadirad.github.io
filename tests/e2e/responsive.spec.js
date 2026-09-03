import { expect, test } from '@playwright/test';

const routesByLocale = {
  fa: [
    '',
    'articles/',
    'articles/same-place-different-self/',
    'topics/',
    'topics/complex-systems/',
    'about/',
    'about/historical-creature/',
    'search/',
  ],
  en: [
    '',
    'articles/',
    'topics/',
    'about/',
    'about/historical-creature/',
    'search/',
  ],
};

for (const [locale, routes] of Object.entries(routesByLocale)) {
  test(`${locale} production routes have no document overflow at 320px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });

    for (const route of routes) {
      const path = `/${locale}/${route}`;
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      const dimensions = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
      }));
      expect(dimensions.documentWidth, path).toBeLessThanOrEqual(
        dimensions.viewportWidth,
      );
    }
  });
}

test('Home and published article reflow at the 200% equivalent width', async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 900 });

  for (const path of [
    '/fa/',
    '/en/',
    '/fa/articles/same-place-different-self/',
  ]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.documentWidth, path).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );
  }
});

test('reduced-motion preference reaches the rendered site', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/');
  expect(
    await page.evaluate(
      () => matchMedia('(prefers-reduced-motion: reduce)').matches,
    ),
  ).toBe(true);
});
