import { spawn } from 'node:child_process';
import process from 'node:process';
import { chromium } from '@playwright/test';

const baseUrl = 'http://127.0.0.1:4332';
const preview = spawn(
  process.execPath,
  [
    'node_modules/astro/bin/astro.mjs',
    'preview',
    '--host',
    '127.0.0.1',
    '--port',
    '4332',
  ],
  { stdio: 'ignore' },
);
let browser;
try {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      if ((await globalThis.fetch(baseUrl)).ok) break;
    } catch {
      /* Preview is starting. */
    }
    await new Promise((resolve) => globalThis.setTimeout(resolve, 250));
  }
  browser = await chromium.launch({ channel: 'chrome' });
  for (const [mode, viewport] of Object.entries({
    desktop: { width: 1440, height: 1100 },
    mobile: { width: 390, height: 844 },
  })) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    await page.goto(`${baseUrl}/fa/articles/building-a-project-with-dad/`);
    await page.evaluate(() => globalThis.document.fonts.ready);
    const prefix = `docs/evidence/TASK-0607-fa-${mode}`;
    await page.screenshot({ path: `${prefix}.png`, fullPage: true });
    await page.screenshot({ path: `${prefix}-header.png` });
    for (const index of [0, 1, 2, 3, 4, 5]) {
      await page
        .locator('.content-diagram')
        .nth(index)
        .screenshot({
          path: `${prefix}-diagram-${index + 1}.png`,
        });
    }
    await page.close();
  }
} finally {
  await browser?.close();
  preview.kill('SIGTERM');
}
