import assert from 'node:assert/strict';
import test from 'node:test';

import { getLtrIsolationAttributes } from '../../src/i18n/bidi';
import { formatDate, formatNumber } from '../../src/i18n/format';
import {
  getAlternateLocale,
  getDirection,
  isLocale,
} from '../../src/i18n/locales';
import { articlePath, localeHomePath } from '../../src/i18n/routing';
import { getUi } from '../../src/i18n/ui';
import { calculateReadingTime } from '../../src/lib/content/reading-time';

test('locale metadata keeps Persian RTL and English LTR', () => {
  assert.equal(isLocale('fa'), true);
  assert.equal(isLocale('de'), false);
  assert.equal(getDirection('fa'), 'rtl');
  assert.equal(getDirection('en'), 'ltr');
  assert.equal(getAlternateLocale('fa'), 'en');
});

test('routes keep both locale prefixes and stable ASCII slugs', () => {
  assert.equal(localeHomePath('fa'), '/fa/');
  assert.equal(localeHomePath('en'), '/en/');
  assert.equal(
    articlePath('fa', 'document-aware-development'),
    '/fa/articles/document-aware-development/',
  );
});

test('numbers and dates are localized with Intl', () => {
  assert.match(formatNumber(1234, 'fa'), /[۰-۹]/u);
  assert.equal(formatNumber(1234, 'en').replace(/,/gu, ''), '1234');
  assert.match(formatDate(new Date('2026-07-01T12:00:00Z'), 'fa'), /[۰-۹]/u);
  assert.match(formatDate(new Date('2026-07-01T12:00:00Z'), 'en'), /July/u);
});

test('technical strings receive explicit LTR isolation', () => {
  assert.deepEqual(getLtrIsolationAttributes(), {
    dir: 'ltr',
    'data-bidi': 'ltr',
  });
});

test('reading time uses independent language rates and discounts code', () => {
  const words = Array.from({ length: 200 }, () => 'word').join(' ');

  assert.equal(calculateReadingTime(words, 'en'), 1);
  assert.equal(calculateReadingTime(words, 'fa'), 2);
  assert.equal(calculateReadingTime(`\`\`\`ts\n${words}\n\`\`\``, 'en'), 1);
});

test('typed dictionaries provide natural locale-specific strings', () => {
  assert.equal(getUi('fa').nav.articles, 'مقاله‌ها');
  assert.equal(getUi('en').nav.articles, 'Articles');
});
