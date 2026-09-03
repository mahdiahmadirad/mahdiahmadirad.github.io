import AxeBuilder from '@axe-core/playwright';
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
  en: ['', 'articles/', 'topics/', 'about/', 'about/historical-creature/', 'search/'],
};

for (const [locale, routes] of Object.entries(routesByLocale)) {
  test(`${locale} production routes have no detectable WCAG A/AA violations`, async ({
    page,
  }) => {
    for (const route of routes) {
      const path = `/${locale}/${route}`;
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations, `${path}\n${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
    }
  });
}

test('the bilingual 404 has no detectable WCAG A/AA violations', async ({ page }) => {
  await page.goto('/missing-route/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});
