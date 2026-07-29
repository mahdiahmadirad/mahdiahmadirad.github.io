import { expect, test } from '@playwright/test';

test('the static root points to the prefixed default locale', async ({
  request,
}) => {
  const response = await request.get('/');
  const html = await response.text();

  expect(response.status()).toBe(200);
  expect(html).toContain('http-equiv="refresh"');
  expect(html).toContain('content="0;url=/fa/"');
  expect(html).toContain('href="https://mehdiahmadirad.me/fa/"');
  expect(html).toContain('<html lang="fa" dir="rtl">');
});

test('both locale foundations have the correct language and direction', async ({
  request,
}) => {
  const [persian, english] = await Promise.all([
    request.get('/fa/'),
    request.get('/en/'),
  ]);
  const [persianHtml, englishHtml] = await Promise.all([
    persian.text(),
    english.text(),
  ]);

  expect(persian.status()).toBe(200);
  expect(english.status()).toBe(200);
  expect(persianHtml).toContain('<html lang="fa" dir="rtl">');
  expect(englishHtml).toContain('<html lang="en" dir="ltr">');
  expect(persianHtml).toContain('data-home-page');
  expect(englishHtml).toContain('data-home-page');
});
