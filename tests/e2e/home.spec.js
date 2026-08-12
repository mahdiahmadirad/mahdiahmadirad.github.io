import { expect, test } from '@playwright/test';

const homes = {
  fa: {
    direction: 'rtl',
    heading: 'مهدی احمدی‌راد',
    alternateHeading: 'Mehdi Ahmadirad',
    recentCount: 3,
  },
  en: {
    direction: 'ltr',
    heading: 'Mehdi Ahmadirad',
    alternateHeading: 'مهدی احمدی‌راد',
    recentCount: 2,
  },
};

for (const [locale, expected] of Object.entries(homes)) {
  test(`${locale} Home renders localized sample content without JavaScript`, async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    try {
      await page.goto(`http://127.0.0.1:4321/${locale}/`);

      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute(
        'dir',
        expected.direction,
      );
      await expect(page.locator('[data-home-page]')).toBeVisible();
      await expect(page.locator('script')).toHaveCount(0);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        expected.heading,
      );
      await expect(page.locator('.writing-row')).toHaveCount(
        expected.recentCount,
      );
      const heroCreature = page.locator('[data-brand-creature="hero"]');
      const headerCreature = page.locator('[data-brand-creature="header"]');
      await expect(heroCreature).toHaveAttribute('aria-hidden', 'true');
      await expect(heroCreature).toHaveAttribute('alt', '');
      await expect(headerCreature).toHaveAttribute('aria-hidden', 'true');
      await expect(headerCreature).toHaveAttribute('alt', '');
      await expect(heroCreature).toHaveAttribute(
        'data-facing',
        locale === 'fa' ? 'right' : 'left',
      );
      await expect(headerCreature).toHaveAttribute(
        'data-facing',
        locale === 'fa' ? 'left' : 'right',
      );
      const headerGeometry = await page.evaluate(() => {
        const mark = globalThis.document.querySelector(
          '[data-brand-creature="header"]',
        );
        const name = globalThis.document.querySelector('.wordmark > span');
        const markBox = mark.getBoundingClientRect();
        const nameBox = name.getBoundingClientRect();
        return {
          markLeft: markBox.left,
          markRight: markBox.right,
          markHeight: markBox.height,
          nameLeft: nameBox.left,
          nameRight: nameBox.right,
          compact: globalThis.innerWidth <= 768,
        };
      });
      if (locale === 'fa') {
        expect(headerGeometry.markLeft).toBeGreaterThanOrEqual(
          headerGeometry.nameRight,
        );
      } else {
        expect(headerGeometry.markRight).toBeLessThanOrEqual(
          headerGeometry.nameLeft,
        );
      }
      expect(headerGeometry.markHeight).toBe(headerGeometry.compact ? 32 : 40);
      await expect(
        page.locator('[data-decision-flow-graphic]'),
      ).toHaveAttribute('aria-hidden', 'true');
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex',
      );
      await expect(page.locator('.wordmark')).toHaveAttribute(
        'aria-current',
        'page',
      );
    } finally {
      await context.close();
    }
  });

  test(`${locale} Home language control preserves the Home concept`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/`);
    const languageLink = page.locator('.language-link');
    const alternateLocale = locale === 'fa' ? 'en' : 'fa';

    await expect(languageLink).toHaveAttribute('href', `/${alternateLocale}/`);
    await languageLink.click();
    await expect(page).toHaveURL(new RegExp(`/${alternateLocale}/$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      expected.alternateHeading,
    );
  });

  test(`${locale} Home has no document overflow at 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(`/${locale}/`);

    const dimensions = await page.evaluate(() => ({
      documentWidth: globalThis.document.documentElement.scrollWidth,
      viewportWidth: globalThis.document.documentElement.clientWidth,
    }));

    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );
  });
}

test('Home exposes honest translation states and a keyboard skip path', async ({
  page,
}) => {
  await page.goto('/fa/');

  await expect(page.locator('.edition-links__unavailable')).toHaveCount(1);
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'رفتن به محتوای اصلی' });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});
