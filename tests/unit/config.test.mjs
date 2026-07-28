import assert from 'node:assert/strict';
import test from 'node:test';

import config from '../../astro.config.mjs';

test('Astro is configured for the bilingual static production site', () => {
  assert.equal(config.site, 'https://mehdiahmadirad.me');
  assert.equal(config.output, 'static');
  assert.equal(config.trailingSlash, 'always');
  assert.deepEqual(config.i18n.locales, ['fa', 'en']);
  assert.equal(config.i18n.defaultLocale, 'fa');
  assert.equal(config.i18n.routing.prefixDefaultLocale, true);
});
