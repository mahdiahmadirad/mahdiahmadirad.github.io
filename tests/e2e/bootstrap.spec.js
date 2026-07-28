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
