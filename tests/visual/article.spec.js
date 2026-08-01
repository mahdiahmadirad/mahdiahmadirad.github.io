import { expect, test } from '@playwright/test';

import { compareApprovedBaseline } from './approved-baseline.js';

for (const locale of ['fa', 'en']) {
  test(`${locale} Article renders fully without document overflow`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/${locale}/articles/document-aware-development/`);

    const dimensions = await page.evaluate(() => ({
      documentWidth: globalThis.document.documentElement.scrollWidth,
      viewportWidth: globalThis.document.documentElement.clientWidth,
    }));
    const mode = testInfo.project.name.startsWith('mobile')
      ? 'mobile'
      : 'desktop';

    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );
    await compareApprovedBaseline(
      page,
      testInfo,
      `TASK-0301-article-${locale}-${mode}.png`,
    );
  });
}
