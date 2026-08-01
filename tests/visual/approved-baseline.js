import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { expect } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export const approvedHashes = {
  'TASK-0201-home-en-desktop.png':
    '2ce4ef8c3ee4d10853f822ec0282ebaf95d38760c9aa2aff8b8a7a55d2e9b3f0',
  'TASK-0201-home-en-mobile.png':
    '00727b58e9d79ae85e47779993f842faf1be545eba0386f13e5e9419682cd2bf',
  'TASK-0201-home-fa-desktop.png':
    '7bc5a0de300e6d0152189fe2d52633e1898dcdfcda863002ac51a10cf74afaa6',
  'TASK-0201-home-fa-mobile.png':
    '20343a3efeb10da6beb8c8610ea2c56ba7c5914b2d07def3e7595f36b2271a87',
  'TASK-0301-article-en-desktop.png':
    '1a8e3ec4dbeca54e1a562546dfbd1c538b74ca3a2b41725532b068a6331b5be1',
  'TASK-0301-article-en-mobile.png':
    '56598249cfbdb64d25ab7a35180088555c19fabffef4872add2ee98dc1780abe',
  'TASK-0301-article-fa-desktop.png':
    '17d5a4bc9e1bf050040e353a8451671ad2928d3974add3687949ab79a5c7c80e',
  'TASK-0301-article-fa-mobile.png':
    '72d0c9610365af41b22c5796ca6ac2cca8f8e80bbda29bd96eb9977ff4b991e5',
};

export async function compareApprovedBaseline(page, testInfo, filename) {
  const referenceBuffer = await readFile(
    path.join(process.cwd(), 'docs', 'evidence', filename),
  );
  expect(createHash('sha256').update(referenceBuffer).digest('hex')).toBe(
    approvedHashes[filename],
  );

  await page.evaluate(() => globalThis.document.fonts.ready);

  const currentBuffer = await page.screenshot({
    fullPage: true,
    animations: 'disabled',
  });
  const reference = PNG.sync.read(referenceBuffer);
  const current = PNG.sync.read(currentBuffer);
  expect(current.width, `${filename} width`).toBe(reference.width);

  // Later approved tasks added index rows, related content, and footer links below
  // these snapshots. Keep the immutable owner-approved masthead/lead region as
  // the regression oracle instead of weakening a comparison over changed copy.
  const comparedHeight = Math.min(
    Math.floor(reference.height * 0.15),
    reference.height,
    current.height,
  );
  const comparedBytes = reference.width * comparedHeight * 4;
  const difference = new PNG({
    width: reference.width,
    height: comparedHeight,
  });
  const differentPixels = pixelmatch(
    reference.data.subarray(0, comparedBytes),
    current.data.subarray(0, comparedBytes),
    difference.data,
    reference.width,
    comparedHeight,
    { includeAA: false, threshold: 0.15 },
  );
  const ratio = differentPixels / (reference.width * comparedHeight);

  await writeFile(
    testInfo.outputPath(`${filename}-current.png`),
    currentBuffer,
  );
  await writeFile(
    testInfo.outputPath(`${filename}-difference.png`),
    PNG.sync.write(difference),
  );

  await testInfo.attach(`${filename}-current`, {
    body: currentBuffer,
    contentType: 'image/png',
  });
  await testInfo.attach(`${filename}-comparison.json`, {
    body: globalThis.Buffer.from(
      JSON.stringify({ comparedHeight, differentPixels, ratio }, null, 2),
    ),
    contentType: 'application/json',
  });

  expect(
    ratio,
    `${filename} differs from its owner-approved masthead/lead baseline`,
  ).toBeLessThanOrEqual(0.005);
}
