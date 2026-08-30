import { spawn } from 'node:child_process';
import process from 'node:process';

import { chromium } from '@playwright/test';

const host = '127.0.0.1';
const port = 4329;
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
      const response = await globalThis.fetch(
        `${baseUrl}/fa/about/historical-creature/`,
      );
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
const pages = [
  {
    name: 'brand-story-fa',
    locale: 'fa',
    route: 'fa/about/historical-creature/',
  },
  {
    name: 'brand-story-en',
    locale: 'en',
    route: 'en/about/historical-creature/',
  },
  { name: 'about-fa', locale: 'fa', route: 'fa/about/' },
  { name: 'about-en', locale: 'en', route: 'en/about/' },
];

try {
  await waitForPreview();
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    for (const target of pages) {
      for (const mode of modes) {
        const page = await browser.newPage({
          locale: target.locale === 'fa' ? 'fa-IR' : 'en-US',
          reducedMotion: 'reduce',
          viewport: mode.viewport,
        });
        await page.goto(`${baseUrl}/${target.route}`);
        if (target.name.startsWith('brand-story-')) {
          await page.evaluate(async () => {
            const images = Array.from(
              globalThis.document.querySelectorAll(
                '.brand-story-figure img[loading="lazy"]',
              ),
            );
            for (const image of images) {
              image.scrollIntoView({ block: 'center' });
              await new Promise((resolve) =>
                globalThis.setTimeout(resolve, 120),
              );
            }
            globalThis.scrollTo(0, 0);
          });
          await page.waitForFunction(() =>
            Array.from(
              globalThis.document.querySelectorAll('.brand-story-figure img'),
            ).every((image) => image.complete && image.naturalWidth > 0),
          );
        }
        await page.screenshot({
          path: `docs/evidence/TASK-0404-${target.name}-${mode.name}.png`,
          fullPage: true,
          animations: 'disabled',
        });
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
} finally {
  preview.kill('SIGTERM');
}
