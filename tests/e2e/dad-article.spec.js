import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const slug = 'building-easier-than-understanding';
const sequences = [
  ['Intent', 'Decision', 'Specification', 'Task', 'Implementation', 'Test'],
  ['Change', 'Impact Analysis', 'Implementation', 'Reconciliation'],
  ['Human', 'Prompt', 'Agent', 'Code'],
  ['Human', 'Project Knowledge', 'Agent', 'Implementation'],
  ['Source Code', 'Tests', 'Configuration'],
  ['Code', 'Intent', 'Decisions', 'Specifications', 'Constraints', 'History'],
];

for (const locale of ['fa', 'en']) {
  test(`DaD ${locale}: static diagrams, translation, metadata and accessibility`, async ({
    browser,
    baseURL,
    request,
  }) => {
    const context = await browser.newContext({
      baseURL,
      javaScriptEnabled: false,
    });
    const page = await context.newPage();
    const route = `/${locale}/articles/${slug}/`;
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute(
      'dir',
      locale === 'fa' ? 'rtl' : 'ltr',
    );
    await expect(page.locator('.content-diagram')).toHaveCount(6);
    await expect(page.locator('.article-prose pre')).toHaveCount(0);
    for (const [index, labels] of sequences.entries()) {
      const diagram = page.locator('.content-diagram').nth(index);
      await expect(diagram.locator('.content-diagram__label')).toHaveText(
        labels,
      );
      await expect(diagram.locator('.content-diagram__items')).toHaveAttribute(
        'dir',
        'ltr',
      );
      await expect(diagram).toHaveAttribute('aria-label', /.+/u);
    }
    await expect(page.locator('.language-link')).toHaveAttribute(
      'href',
      `/${locale === 'fa' ? 'en' : 'fa'}/articles/${slug}/`,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://mehdiahmadirad.me${route}`,
    );
    await expect(page.locator('link[hreflang="en"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="fa"]')).toHaveCount(1);
    expect(await (await request.get(`/${locale}/rss.xml`)).text()).toContain(
      route,
    );
    expect(await (await request.get('/sitemap-0.xml')).text()).toContain(route);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => {
        const doc = globalThis.document;
        return (
          doc.documentElement.scrollWidth > doc.documentElement.clientWidth
        );
      });
      expect(overflow, `${locale} at ${width}px`).toBe(false);
      for (const diagram of await page.locator('.content-diagram').all()) {
        expect(
          await diagram.evaluate(
            (node) => node.scrollWidth <= node.clientWidth,
          ),
        ).toBe(true);
      }
    }
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.content-diagram__label').last()).toBeVisible();
    await context.close();

    const accessibleContext = await browser.newContext({ baseURL });
    const accessiblePage = await accessibleContext.newPage();
    await accessiblePage.goto(route);
    const scan = await new AxeBuilder({ page: accessiblePage }).analyze();
    expect(scan.violations).toEqual([]);
    const searchUrls = await accessiblePage.evaluate(
      async (query) => {
        const pagefind = await import('/pagefind/pagefind.js');
        const result = await pagefind.search(query);
        return Promise.all(
          result.results.map(async (match) => (await match.data()).url),
        );
      },
      locale === 'fa' ? 'هم‌راستا' : 'Reconciliation',
    );
    expect(searchUrls).toContain(route);
    expect(searchUrls.every((url) => url.startsWith(`/${locale}/`))).toBe(true);
    await accessibleContext.close();
  });
}
