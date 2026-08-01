import { expect, test } from '@playwright/test';

const localeState = {
  en: { direction: 'ltr', topicCount: '3 sample articles' },
  fa: { direction: 'rtl', topicCount: '۳ مقاله‌ی نمونه' },
};

const topicSlugs = [
  'software-architecture',
  'systems-engineering',
  'evidence-based-development',
];

for (const [locale, expected] of Object.entries(localeState)) {
  test(`${locale} secondary route matrix is localized and complete`, async ({
    page,
  }) => {
    const routes = [
      ['articles', '[data-articles-index]'],
      ['topics', '[data-topics-index]'],
      ['projects', '[data-projects-index]'],
      ['about', '[data-about-page]'],
      ['search', '[data-search-placeholder]'],
    ];

    for (const [route, selector] of routes) {
      const response = await page.goto(`/${locale}/${route}/`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute(
        'dir',
        expected.direction,
      );
      await expect(page.locator(selector)).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex',
      );
    }
  });

  test(`${locale} publishes three non-empty topic details and omits the empty fixture`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/topics/`);
    await expect(page.locator('.topic-row')).toHaveCount(3);

    for (const slug of topicSlugs) {
      const response = await page.goto(`/${locale}/topics/${slug}/`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('[data-topic-detail]')).toBeVisible();
      expect(await page.locator('.writing-row').count()).toBeGreaterThan(0);
    }

    const emptyResponse = await page.goto(
      `/${locale}/topics/unpublished-sample/`,
    );
    expect(emptyResponse?.status()).toBe(404);
  });

  test(`${locale} projects are curated fixtures and About contains no invented profile`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/projects/`);
    await expect(page.locator('.project-row')).toHaveCount(2);
    await expect(page.locator('.project-row a')).toHaveCount(0);

    await page.goto(`/${locale}/about/`);
    await expect(page.locator('[data-about-page]')).toBeVisible();
    await expect(page.locator('.placeholder-prose h2')).toHaveCount(2);
  });

  test(`${locale} secondary pages retain mobile priority without document overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });

    for (const route of ['topics', 'projects', 'about']) {
      await page.goto(`/${locale}/${route}/`);
      const dimensions = await page.evaluate(() => ({
        documentWidth: globalThis.document.documentElement.scrollWidth,
        viewportWidth: globalThis.document.documentElement.clientWidth,
      }));
      expect(dimensions.documentWidth).toBeLessThanOrEqual(
        dimensions.viewportWidth,
      );
    }
  });
}

test('navigation and secondary-page internal links resolve', async ({
  page,
}) => {
  const seeds = [
    '/fa/',
    '/en/',
    '/fa/articles/',
    '/en/articles/',
    '/fa/topics/',
    '/en/topics/',
    '/fa/projects/',
    '/en/projects/',
    '/fa/about/',
    '/en/about/',
    '/fa/search/',
    '/en/search/',
    '/missing-route/',
  ];
  const internalPaths = new Set(seeds);

  for (const seed of seeds) {
    await page.goto(seed);
    const links = await page
      .locator('a[href^="/"]')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute('href')).filter(Boolean),
      );
    for (const link of links) internalPaths.add(link);
  }

  for (const path of internalPaths) {
    if (path === '/missing-route/') continue;
    const response = await page.request.get(path);
    expect(response.status(), path).toBeLessThan(400);
  }
});

test('the bilingual 404 links to both homes and both search routes', async ({
  page,
}) => {
  const response = await page.goto('/missing-route/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('[data-not-found] section')).toHaveCount(2);

  for (const href of ['/fa/', '/en/', '/fa/search/', '/en/search/']) {
    await expect(page.locator(`a[href="${href}"]`)).toHaveCount(1);
  }
});
