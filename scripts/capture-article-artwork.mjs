import { spawn } from 'node:child_process';
import process from 'node:process';

import { chromium } from '@playwright/test';

const host = '127.0.0.1';
const port = 4335;
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
  { stdio: 'ignore' },
);

let browser;

async function waitForPreview() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      if ((await globalThis.fetch(baseUrl)).ok) return;
    } catch {
      // The static preview server is still starting.
    }
    await new Promise((resolve) => globalThis.setTimeout(resolve, 250));
  }
  throw new Error('Preview did not start.');
}

const modes = {
  desktop: { width: 1440, height: 1100 },
  mobile: { width: 390, height: 844 },
};

const pages = {
  article: '/articles/building-a-project-with-dad/',
  home: '/',
};

try {
  await waitForPreview();
  const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  browser = await chromium.launch(
    executablePath ? { executablePath } : { channel: 'chrome' },
  );

  for (const locale of ['fa', 'en']) {
    for (const [mode, viewport] of Object.entries(modes)) {
      for (const [pageName, route] of Object.entries(pages)) {
        const page = await browser.newPage({
          locale: locale === 'fa' ? 'fa-IR' : 'en-US',
          reducedMotion: 'reduce',
          viewport,
        });
        await page.goto(`${baseUrl}/${locale}${route}`);
        await page.evaluate(async () => {
          await globalThis.document.fonts.ready;
          await Promise.all(
            [...globalThis.document.images].map((image) =>
              image.decode().catch(() => undefined),
            ),
          );
        });
        await page.screenshot({
          path: `docs/evidence/TASK-0609-${pageName}-${locale}-${mode}.png`,
          fullPage: true,
          animations: 'disabled',
        });
        await page.close();
      }
    }
  }
} finally {
  await browser?.close();
  preview.kill('SIGTERM');
}
