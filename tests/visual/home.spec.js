import { expect, test } from '@playwright/test';

import {
  approvedDifferenceCeiling,
  compareApprovedBaselineSet,
  measureApprovedBaselineSet,
} from './approved-baseline.js';

const modes = [
  { name: 'desktop', viewport: { width: 1440, height: 1100 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];

function homeCases(locale, prepareMobile) {
  return modes.map(({ name, viewport }) => ({
    filename: `TASK-0201-home-${locale}-${name}.png`,
    prepare: name === 'mobile' ? prepareMobile : undefined,
    url: `/${locale}/`,
    viewport,
  }));
}

for (const locale of ['fa', 'en']) {
  test(`${locale} Home preserves its approved desktop/mobile contract`, async ({
    page,
  }, testInfo) => {
    await compareApprovedBaselineSet(page, testInfo, homeCases(locale));
  });
}

test('approved Home contract rejects geometry, wrapping, and font regressions', async ({
  page,
}, testInfo) => {
  const geometry = await measureApprovedBaselineSet(
    page,
    testInfo,
    homeCases('en', (target) =>
      target.addStyleTag({
        content: '.home-hero h1 { transform: translateX(8px) !important; }',
      }),
    ),
    { recordArtifacts: false },
  );
  expect(geometry.averageRatio).toBeGreaterThan(approvedDifferenceCeiling);

  const wrapping = await measureApprovedBaselineSet(
    page,
    testInfo,
    homeCases('en', (target) =>
      target.addStyleTag({
        content: '.home-hero h1 { max-inline-size: 8ch !important; }',
      }),
    ),
    { recordArtifacts: false },
  );
  expect(wrapping.averageRatio).toBeGreaterThan(approvedDifferenceCeiling);

  const typography = await measureApprovedBaselineSet(
    page,
    testInfo,
    homeCases('en', (target) =>
      target.addStyleTag({
        content: '.home-hero h1 { font-family: monospace !important; }',
      }),
    ),
    { recordArtifacts: false },
  );
  expect(typography.averageRatio).toBeGreaterThan(approvedDifferenceCeiling);

  await testInfo.attach('approved-baseline-negative-controls.json', {
    body: globalThis.Buffer.from(
      JSON.stringify({ geometry, wrapping, typography }, null, 2),
    ),
    contentType: 'application/json',
  });
});
