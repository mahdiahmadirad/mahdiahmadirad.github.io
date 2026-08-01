import { spawn } from 'node:child_process';
import process from 'node:process';

import { chromium } from '@playwright/test';

const host = '127.0.0.1';
const port = 4326;
const baseUrl = `http://${host}:${port}`;
const preview = spawn(
  process.execPath,
  [
    'node_modules/astro/bin/astro.mjs',
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
      const response = await globalThis.fetch(`${baseUrl}/en/topics/`);
      if (response.ok) return;
    } catch {
      // The static preview server is still starting.
    }
    await new Promise((resolve) => globalThis.setTimeout(resolve, 250));
  }
  throw new Error(`Preview did not start.\n${previewOutput}`);
}

const modes = [
  { name: 'desktop', viewport: { width: 1440, height: 1100 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
];
const pageTypes = [
  { name: 'topics', route: 'topics/' },
  { name: 'topic-detail', route: 'topics/software-architecture/' },
  { name: 'projects', route: 'projects/' },
  { name: 'about', route: 'about/' },
];

try {
  await waitForPreview();
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    for (const locale of ['fa', 'en']) {
      for (const pageType of pageTypes) {
        for (const mode of modes) {
          const page = await browser.newPage({
            locale: locale === 'fa' ? 'fa-IR' : 'en-US',
            reducedMotion: 'reduce',
            viewport: mode.viewport,
          });
          await page.goto(`${baseUrl}/${locale}/${pageType.route}`);
          await page.screenshot({
            path: `docs/evidence/TASK-0401-${pageType.name}-${locale}-${mode.name}.png`,
            fullPage: true,
            animations: 'disabled',
          });
          await page.close();
        }
      }
    }

    for (const mode of modes) {
      const page = await browser.newPage({
        reducedMotion: 'reduce',
        viewport: mode.viewport,
      });
      await page.goto(`${baseUrl}/missing-route/`);
      await page.screenshot({
        path: `docs/evidence/TASK-0401-404-bilingual-${mode.name}.png`,
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
