import { expect, test } from '@playwright/test';

for (const locale of ['fa', 'en']) {
  test(`${locale} design system is localized and excluded from indexing`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/design-system/`);

    const root = page.locator('html');
    await expect(root).toHaveAttribute('lang', locale);
    await expect(root).toHaveAttribute('dir', locale === 'fa' ? 'rtl' : 'ltr');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex',
    );
    await expect(page.locator('[data-design-system]')).toBeVisible();
    await expect(page.locator('[data-system-graphic]')).toHaveAttribute(
      'aria-hidden',
      'true',
    );

    const expectedFonts =
      locale === 'fa' ? ['Vazirmatn', 'Estedad'] : ['Inter', 'Source Serif 4'];
    await page.evaluate(() => globalThis.document.fonts.ready);

    for (const family of expectedFonts) {
      const loaded = await page.evaluate(
        (fontFamily) => globalThis.document.fonts.check(`16px "${fontFamily}"`),
        family,
      );
      expect(loaded, `${family} should be loaded`).toBe(true);
    }

    await expect(page.locator('link[rel="preload"][as="font"]')).toHaveCount(2);
  });

  test(`${locale} design system has no page overflow at 320px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(`/${locale}/design-system/`);

    const dimensions = await page.evaluate(() => ({
      documentWidth: globalThis.document.documentElement.scrollWidth,
      viewportWidth: globalThis.document.documentElement.clientWidth,
    }));

    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );
  });
}

test('keyboard users can reach the content and see the focus treatment', async ({
  page,
}) => {
  await page.goto('/en/design-system/');

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  const sampleControl = page.getByRole('button', { name: 'Sample control' });
  await sampleControl.focus();
  const focusStyle = await sampleControl.evaluate((element) => {
    const style = globalThis.getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });

  expect(focusStyle.outlineStyle).toBe('solid');
  expect(Number.parseFloat(focusStyle.outlineWidth)).toBeGreaterThanOrEqual(2);
});
