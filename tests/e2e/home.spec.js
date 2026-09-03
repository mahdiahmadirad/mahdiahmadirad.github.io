import { expect, test } from '@playwright/test';

const homes = {
  fa: { direction: 'rtl', heading: 'مهدی احمدی‌راد', recentCount: 1 },
  en: { direction: 'ltr', heading: 'Mehdi Ahmadirad', recentCount: 0 },
};

for (const [locale, expected] of Object.entries(homes)) {
  test(`${locale} Home reflects production content`, async ({ page }) => {
    const response = await page.goto(`/${locale}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('html')).toHaveAttribute('dir', expected.direction);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(expected.heading);
    await expect(page.locator('.writing-row')).toHaveCount(expected.recentCount);
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText(/sample|fixture/i);
  });

  test(`${locale} Home has no document overflow at 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(`/${locale}/`);
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
  });
}

test('Home language control preserves the Home concept', async ({ page }) => {
  await page.goto('/fa/');
  await expect(page.locator('.language-link')).toHaveAttribute('href', '/en/');
  await page.locator('.language-link').click();
  await expect(page).toHaveURL(/\/en\/$/);
});
