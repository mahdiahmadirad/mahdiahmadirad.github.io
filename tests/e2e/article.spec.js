import { expect, test } from '@playwright/test';

const articlePath = '/fa/articles/same-place-different-self/';
const englishArticlePath = '/en/articles/same-place-different-self/';

test('published Persian article is readable and indexable', async ({
  page,
}) => {
  const response = await page.goto(articlePath);
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('[data-article-page]')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'بازگشت به همان‌جا، اما نه همان آدم',
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await expect(
    page.getByRole('link', { name: 'Canon per Tonos', exact: true }).first(),
  ).toHaveAttribute('href', 'https://www.youtube.com/watch?v=eXXO2dN3P_w');
});

test('published article editions link to one another truthfully', async ({
  page,
}) => {
  await page.goto(articlePath);
  await expect(
    page.locator('[data-translation-state="available"]'),
  ).toBeVisible();
  await expect(page.locator('.language-link')).toHaveAttribute(
    'href',
    englishArticlePath,
  );
  await expect(page.locator('link[hreflang="fa"]')).toHaveCount(1);
  await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);
});

test('published English article preserves the approved links and bilingual poem', async ({
  page,
}) => {
  const response = await page.goto(englishArticlePath);
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Returning to the Same Place, but Not as the Same Person',
  );
  await expect(page).toHaveTitle(
    'Returning to the Same Place, but Not as the Same Person',
  );
  await expect(
    page.getByRole('link', { name: 'Canon per Tonos', exact: true }).first(),
  ).toHaveAttribute('href', 'https://www.youtube.com/watch?v=eXXO2dN3P_w');

  const poemLines = await page
    .locator('.article-prose blockquote')
    .first()
    .evaluate((quote) =>
      quote.innerText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    );
  expect(poemLines.slice(0, 4)).toEqual([
    'هزار گل، ز چمن رفت و باز برگردید',
    'A thousand flowers left the garden, then returned once more.',
    'بهارِ رنگ چه مقدار ذوقِ گردش داشت.',
    'How deeply the spring of colour delighted in turning and returning.',
  ]);
});

test('published article has no document overflow at 320px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(articlePath);
  const dimensions = await page.evaluate(() => ({
    documentWidth: globalThis.document.documentElement.scrollWidth,
    viewportWidth: globalThis.document.documentElement.clientWidth,
  }));
  expect(dimensions.documentWidth).toBeLessThanOrEqual(
    dimensions.viewportWidth,
  );
});
