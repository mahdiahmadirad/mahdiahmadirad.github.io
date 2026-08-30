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
      ['search', '[data-search-page]'],
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

test('the Persian brand story is a semantic monolingual About subpage', async ({
  page,
}) => {
  const response = await page.goto('/fa/about/historical-creature/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('[data-brand-story-page]')).toBeVisible();
  await expect(page.locator('[data-brand-story-page] h1')).toHaveCount(1);
  await expect(page.locator('.brand-story__prose h2')).toHaveCount(3);
  await expect(page.locator('.brand-story__toc a')).toHaveCount(3);
  await expect(page.locator('.brand-story-figure')).toHaveCount(4);
  await expect(page.locator('.brand-story-figure figcaption')).toHaveCount(4);
  await expect(page.locator('.brand-story-figure img')).toHaveCount(4);
  await expect(page.locator('header a[aria-current="page"]')).toHaveAttribute(
    'href',
    '/fa/about/',
  );
  await expect(page.locator('.language-link')).toHaveAttribute(
    'href',
    '/en/about/',
  );

  for (const image of await page.locator('.brand-story-figure img').all()) {
    await expect(image).toHaveAttribute('width', /\d+/u);
    await expect(image).toHaveAttribute('height', /\d+/u);
    await expect(image).not.toHaveAttribute('alt', '');
  }

  const missingEdition = await page.request.get(
    '/en/about/historical-creature/',
  );
  expect(missingEdition.status()).toBe(404);

  await page.setViewportSize({ width: 320, height: 800 });
  const dimensions = await page.evaluate(() => ({
    documentWidth: globalThis.document.documentElement.scrollWidth,
    viewportWidth: globalThis.document.documentElement.clientWidth,
  }));
  expect(dimensions.documentWidth).toBeLessThanOrEqual(
    dimensions.viewportWidth,
  );
});

test('both About editions disclose the available Persian brand story', async ({
  page,
}) => {
  for (const locale of ['fa', 'en']) {
    await page.goto(`/${locale}/about/`);
    const link = page.locator(
      '[data-brand-story-link] a[href="/fa/about/historical-creature/"]',
    );
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('hreflang', 'fa');
    if (locale === 'en') await expect(link).toHaveAttribute('lang', 'fa');
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

test('footer exposes verified GitHub and LinkedIn profiles in both locales', async ({
  page,
}) => {
  for (const locale of ['fa', 'en']) {
    await page.goto(`/${locale}/`);

    const github = page.locator(
      'footer a[href="https://github.com/mahdiahmadirad"]',
    );
    const linkedin = page.locator(
      'footer a[href="https://www.linkedin.com/in/mehdiahmadirad"]',
    );

    await expect(github).toHaveCount(1);
    await expect(linkedin).toHaveCount(1);
    const githubIcon = github.locator('[data-social-icon="github"]');
    const linkedinIcon = linkedin.locator('[data-social-icon="linkedin"]');

    await expect(githubIcon).toHaveCount(1);
    await expect(linkedinIcon).toHaveCount(1);
    await expect(githubIcon.locator('path')).toHaveCount(1);
    await expect(linkedinIcon.locator('path')).toHaveCount(1);
    await expect(github.locator('svg')).toHaveAttribute('aria-hidden', 'true');
    await expect(linkedin.locator('svg')).toHaveAttribute('focusable', 'false');

    for (const icon of [githubIcon, linkedinIcon]) {
      const presentation = await icon.evaluate((element) => {
        const styles = globalThis.getComputedStyle(element);
        return {
          width: styles.width,
          height: styles.height,
          fill: styles.fill,
        };
      });
      expect(presentation).toEqual({
        width: '20px',
        height: '20px',
        fill: 'rgb(0, 0, 0)',
      });
    }
    await expect(github).toHaveAttribute('rel', 'me noopener noreferrer');
    await expect(linkedin).toHaveAttribute('rel', 'me noopener noreferrer');

    await page.setViewportSize({ width: 320, height: 800 });
    const dimensions = await page.evaluate(() => ({
      documentWidth: globalThis.document.documentElement.scrollWidth,
      viewportWidth: globalThis.document.documentElement.clientWidth,
    }));
    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );
  }
});
