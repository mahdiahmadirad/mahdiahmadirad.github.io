import { test } from '@playwright/test';

import { compareApprovedBaselineSet } from './approved-baseline.js';

const modes = [
  { name: 'desktop', viewport: { width: 1440, height: 1100 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

for (const locale of ['fa', 'en']) {
  test(`${locale} Article preserves its approved desktop/mobile contract`, async ({
    page,
  }, testInfo) => {
    await compareApprovedBaselineSet(
      page,
      testInfo,
      modes.map(({ name, viewport }) => ({
        filename: `TASK-0301-article-${locale}-${name}.png`,
        url: `/${locale}/articles/document-aware-development/`,
        viewport,
      })),
    );
  });
}
