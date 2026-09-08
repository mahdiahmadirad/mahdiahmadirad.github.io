import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { URL } from 'node:url';

const layoutPath = new URL(
  '../../src/layouts/BaseLayout.astro',
  import.meta.url,
);

const readLayout = () => readFile(layoutPath, 'utf8');

test('GoatCounter is integrated once in the global layout', async () => {
  const source = await readLayout();

  assert.equal((source.match(/data-goatcounter=/g) ?? []).length, 1);
  assert.match(
    source,
    /data-goatcounter="https:\/\/mehdiahmadirad\.goatcounter\.com\/count"/,
  );
  assert.match(source, /src="\/\/gc\.zgo\.at\/count\.js"/);
  assert.match(
    source,
    /<script[\s\S]*data-goatcounter=[\s\S]*async[\s\S]*src="\/\/gc\.zgo\.at\/count\.js"[\s\S]*><\/script>/,
  );
});
