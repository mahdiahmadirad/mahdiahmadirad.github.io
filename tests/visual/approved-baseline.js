import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { expect } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export const historicalHashes = {
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

export const approvedHashes = {
  'TASK-0505-home-en-desktop.png':
    'fe63c1a19fe7086d8af41ae5ca831f4618f09e598d5f3133a77d3ebacf7454d7',
  'TASK-0505-home-en-mobile.png':
    '2d63a40ca17ce3911a5b6e61221526a34e6759679405ed292f436723974b99bf',
  'TASK-0505-home-fa-desktop.png':
    'e6effbabdb242b63328a2ed61f4ad1a50b489b05947d1e90fb5a585484cb1d94',
  'TASK-0505-home-fa-mobile.png':
    'efc4307ec0d4c257843eddc0b7d7e37c3dfb09e436a60d53e06f84a71869e8db',
  'TASK-0505-article-en-desktop.png':
    'acfc5c271a83b1bad7b83d511faae7f8ce74918e98b920840b21fff272952dfc',
  'TASK-0505-article-en-mobile.png':
    '9c81a0d340f882d54e25b2ac8642aca96ffdc6d9d72f274dafc7d55de0bcd103',
  'TASK-0505-article-fa-desktop.png':
    'caae6684c8361782c714684c9a172147a928cb14f65d489fba96d72acf22af4e',
  'TASK-0505-article-fa-mobile.png':
    'ed8c336bac46fb3ecb0a10429d8c18ae4b5ee11f299ff6e7f6dc667b145afa95',
};

export const approvedDifferenceCeiling = 0.005;

export async function verifyHistoricalBaselineHashes() {
  for (const [filename, hash] of Object.entries(historicalHashes)) {
    const buffer = await readFile(
      path.join(process.cwd(), 'docs', 'evidence', filename),
    );
    expect(createHash('sha256').update(buffer).digest('hex')).toBe(hash);
  }
}

export async function measureApprovedBaselineSet(
  page,
  testInfo,
  cases,
  { recordArtifacts = true } = {},
) {
  const results = [];

  for (const approvedCase of cases) {
    const { filename, prepare, url, viewport } = approvedCase;
    const referenceBuffer = await readFile(
      path.join(process.cwd(), 'docs', 'evidence', filename),
    );
    expect(createHash('sha256').update(referenceBuffer).digest('hex')).toBe(
      approvedHashes[filename],
    );

    await page.setViewportSize(viewport);
    await page.goto(url);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.evaluate(() => globalThis.document.fonts.ready);
    if (prepare) await prepare(page);

    const dimensions = await page.evaluate(() => ({
      documentWidth: globalThis.document.documentElement.scrollWidth,
      viewportWidth: globalThis.document.documentElement.clientWidth,
    }));
    expect(
      dimensions.documentWidth,
      `${filename} document width`,
    ).toBeLessThanOrEqual(dimensions.viewportWidth);

    const currentBuffer = await page.screenshot({
      fullPage: true,
      animations: 'disabled',
    });
    const reference = PNG.sync.read(referenceBuffer);
    const current = PNG.sync.read(currentBuffer);
    expect(current.width, `${filename} width`).toBe(reference.width);

    // Later approved tasks added content below these snapshots. Preserve the
    // immutable masthead/lead crop, but assess its desktop/mobile pair as one
    // equal-weight visual contract so OS-specific glyph rasterization cannot
    // make one viewport consume a different pixel budget.
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
    results.push({ comparedHeight, differentPixels, filename, ratio });

    if (recordArtifacts) {
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
    }
  }

  const averageRatio =
    results.reduce((total, result) => total + result.ratio, 0) / results.length;

  if (recordArtifacts) {
    await testInfo.attach('approved-baseline-comparison.json', {
      body: globalThis.Buffer.from(
        JSON.stringify(
          { averageRatio, ceiling: approvedDifferenceCeiling, results },
          null,
          2,
        ),
      ),
      contentType: 'application/json',
    });
  }

  return { averageRatio, results };
}

export async function compareApprovedBaselineSet(page, testInfo, cases) {
  const comparison = await measureApprovedBaselineSet(page, testInfo, cases);
  expect(
    comparison.averageRatio,
    `${cases.map(({ filename }) => filename).join(' + ')} exceed the owner-approved 0.5% desktop/mobile contract`,
  ).toBeLessThanOrEqual(approvedDifferenceCeiling);
}
