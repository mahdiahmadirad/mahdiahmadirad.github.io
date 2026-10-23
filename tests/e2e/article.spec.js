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
  await expect(page.locator('.article-lead__artwork img')).toBeVisible();
  await expect(page.locator('.article-lead__artwork img')).toHaveAttribute(
    'src',
    '/images/articles/same-place-different-self/hero.webp',
  );
  await expect(page.locator('.article-support img')).toHaveCount(0);
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
  await expect(page.locator('.article-lead__artwork img')).toHaveAttribute(
    'width',
    '1254',
  );
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

for (const path of [
  '/fa/articles/building-a-project-with-dad/',
  '/en/articles/building-a-project-with-dad/',
]) {
  test(`sticky table of contents stops before article support links: ${path}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path);

    const tableOfContents = page.locator('.article-toc');
    const articleSupport = page.locator('.article-support');
    await expect(tableOfContents).toBeVisible();
    await expect(articleSupport).toBeVisible();

    await articleSupport.scrollIntoViewIfNeeded();

    const positions = await page.evaluate(() => {
      const toc = globalThis.document.querySelector('.article-toc');
      const support = globalThis.document.querySelector('.article-support');

      if (!toc || !support) {
        throw new Error('Article rail regions are missing.');
      }

      const tocBounds = toc.getBoundingClientRect();
      const supportBounds = support.getBoundingClientRect();

      return {
        tocBottom: tocBounds.bottom,
        supportTop: supportBounds.top,
      };
    });

    expect(positions.tocBottom).toBeLessThanOrEqual(positions.supportTop);
  });
}

test.describe('optional article navigation without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('heading-free Persian essay omits the TOC and retains related AI writing', async ({
    page,
  }) => {
    await page.goto('/fa/articles/ai-and-self-worth/');
    await expect(
      page.locator('.article-prose h2, .article-prose h3, .article-prose h4'),
    ).toHaveCount(0);
    await expect(page.locator('.article-toc')).toHaveCount(0);
    await expect(
      page.locator('section[aria-labelledby="related-title"]'),
    ).toBeVisible();
    await expect(
      page.locator(
        'section[aria-labelledby="related-title"] a[href="/fa/articles/15-engineering-principles/"]',
      ),
    ).toBeVisible();
    await expect(page.locator('.article-prose')).toBeVisible();
    await expect(page.locator('.article-support__permalink')).toBeVisible();
    await expect(page.locator('.article-pager')).toBeVisible();
  });

  for (const locale of ['fa', 'en']) {
    test(`${locale} standalone essay keeps heading links but omits empty related section`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/articles/same-place-different-self/`);
      await expect(
        page.locator('section[aria-labelledby="related-title"]'),
      ).toHaveCount(0);
      await expect(page.locator('#related-title')).toHaveCount(0);
      const headings = await page
        .locator('.article-prose h2, .article-prose h3, .article-prose h4')
        .evaluateAll((nodes) => nodes.map((node) => `#${node.id}`));
      expect(headings.length).toBeGreaterThan(0);
      const links = await page
        .locator('.article-toc a')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')));
      expect(links).toEqual(headings);
      const disclosure = page.locator('.article-toc details');
      await expect(disclosure).toHaveAttribute('open', '');
      await page.locator('.article-toc summary').focus();
      await page.keyboard.press('Enter');
      await expect(disclosure).not.toHaveAttribute('open');
      await page.keyboard.press('Enter');
      await expect(disclosure).toHaveAttribute('open', '');
    });

    test(`${locale} related articles remain visible with same-locale links`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/articles/building-a-project-with-dad/`);
      const section = page.locator('section[aria-labelledby="related-title"]');
      await expect(section).toBeVisible();
      await expect(section.locator('#related-title')).toBeVisible();
      const links = await section
        .locator('a')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')));
      expect(links.length).toBeGreaterThan(0);
      expect(
        links.every((href) => href.startsWith(`/${locale}/articles/`)),
      ).toBe(true);
    });
  }
});
