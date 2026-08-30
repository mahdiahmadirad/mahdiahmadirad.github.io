import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '',
  'articles/document-aware-development/',
  'topics/',
  'topics/software-architecture/',
  'projects/',
  'about/',
  'search/',
];

for (const locale of ['fa', 'en']) {
  test(`${locale} main routes have no detectable WCAG A/AA violations`, async ({
    page,
  }) => {
    for (const route of routes) {
      const path = `/${locale}/${route}`;
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(
        results.violations,
        `${path}\n${JSON.stringify(results.violations, null, 2)}`,
      ).toEqual([]);
    }
  });
}

test('the bilingual 404 has no detectable WCAG A/AA violations', async ({
  page,
}) => {
  await page.goto('/missing-route/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2),
  ).toEqual([]);
});

test('the Persian brand story has no detectable WCAG A/AA violations', async ({
  page,
}) => {
  await page.goto('/fa/about/historical-creature/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2),
  ).toEqual([]);
});
