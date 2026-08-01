import { spawn } from 'node:child_process';
import process from 'node:process';

import { chromium } from '@playwright/test';

const host = '127.0.0.1';
const port = 4325;
const baseUrl = `http://${host}:${port}`;
const preview = spawn(
  process.execPath,
  [
    './node_modules/astro/bin/astro.mjs',
    'preview',
    '--host',
    host,
    '--port',
    String(port),
  ],
  {
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let previewOutput = '';
preview.stdout.on('data', (chunk) => {
  previewOutput += chunk.toString();
});
preview.stderr.on('data', (chunk) => {
  previewOutput += chunk.toString();
});

async function waitForPreview() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await globalThis.fetch(
        `${baseUrl}/en/articles/document-aware-development/`,
      );
      if (response.ok) return;
    } catch {
      // The static preview server is still starting.
    }

    await new Promise((resolve) => globalThis.setTimeout(resolve, 250));
  }

  throw new Error(`Preview did not start.\n${previewOutput}`);
}

try {
  await waitForPreview();
  const browser = await chromium.launch({ channel: 'chrome' });

  try {
    for (const locale of ['fa', 'en']) {
      const page = await browser.newPage({
        locale: locale === 'fa' ? 'fa-IR' : 'en-US',
        reducedMotion: 'reduce',
        viewport: { width: 640, height: 900 },
      });
      await page.goto(
        `${baseUrl}/${locale}/articles/document-aware-development/`,
      );

      const measurements = await page.evaluate(() => {
        const viewportWidth = globalThis.document.documentElement.clientWidth;
        const measuredSelectors = [
          '.article-header h1',
          '.article-toc',
          '.article-cover',
          '.article-prose',
          '.article-support',
          '.article-pager',
        ];
        const withinViewport = measuredSelectors.every((selector) => {
          const element = globalThis.document.querySelector(selector);
          if (!element) return false;
          const bounds = element.getBoundingClientRect();
          return bounds.left >= 0 && bounds.right <= viewportWidth;
        });
        const tableRegion = globalThis.document.querySelector('.table-scroll');
        const codeRegion =
          globalThis.document.querySelector('.article-prose pre');

        return {
          locale: globalThis.document.documentElement.lang,
          direction: globalThis.document.documentElement.dir,
          documentWidth: globalThis.document.documentElement.scrollWidth,
          viewportWidth,
          withinViewport,
          tableOverflowContained: tableRegion
            ? tableRegion.scrollWidth >= tableRegion.clientWidth
            : false,
          codeOverflowContained: codeRegion
            ? codeRegion.scrollWidth >= codeRegion.clientWidth
            : false,
        };
      });

      if (
        measurements.documentWidth > measurements.viewportWidth ||
        !measurements.withinViewport ||
        !measurements.tableOverflowContained ||
        !measurements.codeOverflowContained
      ) {
        throw new Error(
          `${locale} 200% reflow-equivalent check failed: ${JSON.stringify(measurements)}`,
        );
      }

      process.stdout.write(`${JSON.stringify(measurements)}\n`);
      await page.screenshot({
        path: `docs/evidence/TASK-0302-article-${locale}-zoom-200.png`,
        fullPage: true,
        animations: 'disabled',
      });
      await page.close();
    }
  } finally {
    await browser.close();
  }
} finally {
  preview.kill('SIGTERM');
}
