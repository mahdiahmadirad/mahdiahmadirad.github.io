import { expect, test } from '@playwright/test';

const articlePath = (locale) =>
  `/${locale}/articles/document-aware-development/`;

const articles = {
  fa: {
    direction: 'rtl',
    heading: 'نمونه: توسعه‌ی آگاه از مستندات',
    firstSection: 'از تصمیم آغاز کنید',
    alternate: '/en/articles/document-aware-development/',
  },
  en: {
    direction: 'ltr',
    heading: 'Sample: Document-Aware Development',
    firstSection: 'Begin with the decision',
    alternate: '/fa/articles/document-aware-development/',
  },
};

for (const [locale, expected] of Object.entries(articles)) {
  test(`${locale} article is complete and readable without JavaScript`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    try {
      await page.goto(`http://127.0.0.1:4321${articlePath(locale)}`);

      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute(
        'dir',
        expected.direction,
      );
      await expect(page.locator('[data-article-page]')).toBeVisible();
      await expect(
        page.locator('script:not([type="application/ld+json"])'),
      ).toHaveCount(0);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        expected.heading,
      );
      await expect(page.locator('.article-prose h2')).toHaveCount(3);
      await expect(page.locator('.article-prose h3')).toHaveCount(1);
      await expect(page.locator('.article-prose h4')).toHaveCount(1);
      await expect(page.locator('.article-prose pre')).toHaveCount(1);
      await expect(page.locator('.article-prose table')).toHaveCount(1);
      await expect(page.locator('.article-prose .callout')).toHaveCount(1);
      await expect(page.locator('.article-prose .article-figure')).toHaveCount(
        1,
      );
      await expect(page.locator('.article-prose .footnotes')).toHaveCount(1);
    } finally {
      await context.close();
    }
  });

  test(`${locale} TOC and translation links work from the keyboard`, async ({
    page,
  }) => {
    await page.goto(articlePath(locale));
    const tocLink = page.locator('.article-toc a').first();
    const target = await tocLink.getAttribute('href');

    await tocLink.focus();
    await expect(tocLink).toBeFocused();
    await page.keyboard.press('Enter');
    expect(target).toBeTruthy();
    await expect(page).toHaveURL(new RegExp(`${encodeURI(target)}$`));
    await expect(
      page.getByRole('heading', { level: 2, name: expected.firstSection }),
    ).toBeVisible();

    await expect(
      page.locator('[data-translation-state="available"] a'),
    ).toHaveAttribute('href', expected.alternate);
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(
      2,
    );
  });

  test(`${locale} article has no document overflow at 320px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(articlePath(locale));

    const dimensions = await page.evaluate(() => ({
      documentWidth: globalThis.document.documentElement.scrollWidth,
      viewportWidth: globalThis.document.documentElement.clientWidth,
      tocBeforeBody:
        (globalThis.document
          .querySelector('.article-toc')
          ?.compareDocumentPosition(
            globalThis.document.querySelector('.article-prose'),
          ) ?? 0) & 4,
    }));

    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );
    expect(dimensions.tocBeforeBody).toBeTruthy();
  });
}

test('monolingual article exposes an honest missing-translation state', async ({
  page,
}) => {
  await page.goto('/fa/articles/signals-before-solutions/');

  await expect(
    page.locator('[data-translation-state="unavailable"]'),
  ).toBeVisible();
  await expect(
    page.locator('[data-translation-state="unavailable"] a'),
  ).toHaveAttribute('href', '/en/');
  await expect(page.locator('.language-link')).toHaveAttribute('href', '/en/');
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(1);
  await expect(page.locator('link[hreflang="en"]')).toHaveCount(0);
});

test('article print mode exposes author and canonical address only', async ({
  page,
}) => {
  await page.goto(articlePath('en'));
  await page.emulateMedia({ media: 'print' });

  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.article-cover')).toBeHidden();
  await expect(page.locator('.article-print-header')).toBeVisible();
  await expect(page.locator('.article-print-header')).toContainText(
    'https://mehdiahmadirad.me/en/articles/document-aware-development/',
  );
});
