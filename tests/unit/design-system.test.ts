import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const tokens = await readFile(
  new URL('../../src/styles/tokens.css', import.meta.url),
  'utf8',
);
const fontStyles = await readFile(
  new URL('../../src/styles/fonts.css', import.meta.url),
  'utf8',
);

const expectedColors = {
  '--color-canvas': '#f7f4ed',
  '--color-surface': '#fcfaf6',
  '--color-ink': '#18222d',
  '--color-accent': '#a34b35',
  '--color-lapis': '#304f68',
  '--color-muted': '#706e68',
  '--color-rule': '#ddd7cc',
  '--color-focus': '#7c3aed',
} as const;

function channelToLinear(channel: number): number {
  const normalized = channel / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    ?.map((channel) => Number.parseInt(channel, 16));

  assert.ok(channels);
  const [red, green, blue] = channels.map(channelToLinear);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(first: string, second: string): number {
  const lighter = Math.max(luminance(first), luminance(second));
  const darker = Math.min(luminance(first), luminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

test('design tokens preserve the approved palette', () => {
  for (const [token, value] of Object.entries(expectedColors)) {
    assert.match(tokens, new RegExp(`${token}: ${value};`, 'i'));
  }
});

test('text and focus colors meet WCAG AA contrast on the canvas', () => {
  const canvas = expectedColors['--color-canvas'];

  assert.ok(contrast(expectedColors['--color-ink'], canvas) >= 4.5);
  assert.ok(contrast(expectedColors['--color-accent'], canvas) >= 4.5);
  assert.ok(contrast(expectedColors['--color-lapis'], canvas) >= 4.5);
  assert.ok(contrast(expectedColors['--color-focus'], canvas) >= 3);
});

const fontArtifacts = {
  'vazirmatn/vazirmatn-variable.woff2':
    '4e3fa217d38fdafc1fea4414ceb58ca5e662cf0ab5fa735a8c8c20e8b42cad92',
  'estedad/estedad-variable.woff2':
    'b40ce2504e442a79e8adddf1d7b27bc4bd171bb94c9e7c93e0732d095bc051b0',
  'inter/inter-variable.woff2':
    '693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3',
  'source-serif-4/source-serif-4-variable.woff2':
    'f146ee102dddcc5bc7a2cf4af5bcf129832195941b92bd0a512626f390688c1e',
  'source-serif-4/source-serif-4-variable-italic.woff2':
    'da0aa4649d3a48d10809ee4c55099abe797653abfceda94abd31b2f42a3e0f0f',
  'jetbrains-mono/jetbrains-mono-regular.woff2':
    'a9cb1cd82332b23a47e3a1239d25d13c86d16c4220695e34b243effa999f45f2',
} as const;

const derivedFontArtifacts = {
  'inter/inter-latin.woff2':
    '04ec0fe4202bb20fe7dd86359f4087237f6f934e25579f1841953d8e9788e20f',
  'source-serif-4/mar-editorial-variable.woff2':
    'e1ec0d8a6ec7f5304609f52b587fc95211b1fd61fdb6a6281e4436598d3a61d1',
  'source-serif-4/mar-editorial-lcp.woff2':
    '1c12e448fb829311257f0bb6fc2a85950b93bc50852c16d0ebe613df86fc1adb',
  'source-serif-4/mar-editorial-variable-italic.woff2':
    '9f8ec6f894c2832ebefa39548d5a6dfb7b5bba7aecb6f8205527d829b4b3ecc5',
  'jetbrains-mono/jetbrains-mono-latin.woff2':
    'f8fe2ef0df2b60c31cb98937d67adf60f96b92a6788dedfcb8a3cd3403656ac4',
} as const;

test('the foundation declares every approved self-hosted font', () => {
  for (const family of [
    'Vazirmatn',
    'Estedad',
    'Inter',
    'MAR Editorial',
    'JetBrains Mono',
  ]) {
    assert.match(fontStyles, new RegExp(`font-family: '${family}'`));
  }

  assert.doesNotMatch(fontStyles, /https?:\/\//);
  assert.equal(fontStyles.match(/font-display: swap/g)?.length, 7);
});

test('English webfont subsets match the reproducible derivatives', async () => {
  for (const [relativePath, expectedHash] of Object.entries(
    derivedFontArtifacts,
  )) {
    const artifact = await readFile(
      new URL(`../../public/fonts/${relativePath}`, import.meta.url),
    );
    const actualHash = createHash('sha256').update(artifact).digest('hex');
    assert.equal(actualHash, expectedHash, relativePath);
  }
});

test('font binaries match approved upstream releases and include OFL notices', async () => {
  for (const [relativePath, expectedHash] of Object.entries(fontArtifacts)) {
    const artifact = await readFile(
      new URL(`../../public/fonts/${relativePath}`, import.meta.url),
    );
    const actualHash = createHash('sha256').update(artifact).digest('hex');
    assert.equal(actualHash, expectedHash, relativePath);

    const [family] = relativePath.split('/');
    const license = await readFile(
      new URL(`../../public/fonts/${family}/OFL.txt`, import.meta.url),
      'utf8',
    );
    assert.match(license, /SIL Open Font License, Version 1\.1/i);
  }
});
