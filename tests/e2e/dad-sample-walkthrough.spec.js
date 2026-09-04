import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const slug = 'building-a-project-with-dad';
const route = `/fa/articles/${slug}/`;
const sequences = [
  ['AGENTS.md', 'PROJECT-VISION.md', 'ADR', 'SPEC', 'TASK', 'Source & Tests'],
  [
    'Agent enters repository',
    'AGENTS.md',
    'PROJECT-VISION',
    'TASK',
    'ADR / SPEC',
    'Code',
    'Tests',
    'Reconciliation',
  ],
  [
    'ADR-0001Reason',
    'SPEC-0001Expected behavior',
    'TASK-0001Bounded work',
    'ImplementationCode',
    'TestsEvidence',
  ],
  ['Summarization Feature', 'IAIProvider', 'LocalTextAnalysisProvider'],
  ['Vision', 'Decision', 'Specification', 'Task', 'Implementation', 'Evidence'],
  [
    'Project Vision',
    'ADR-0001',
    'SPEC-0001',
    'TASK-0001',
    'Implementation',
    'Tests',
  ],
];

test('DaD III: monolingual metadata, links, static diagrams and accessibility', async ({
  browser,
  baseURL,
  request,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(route);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('.content-diagram')).toHaveCount(6);
  for (const [index, labels] of sequences.entries()) {
    const diagram = page.locator('.content-diagram').nth(index);
    await expect(diagram.locator('.content-diagram__label')).toHaveText(labels);
    await expect(diagram.locator('.content-diagram__items')).toHaveAttribute(
      'dir',
      'ltr',
    );
    await expect(diagram).toHaveAttribute('aria-label', /.+/u);
  }
  await expect(page.locator('.translation-status')).toHaveAttribute(
    'data-translation-state',
    'unavailable',
  );
  await expect(page.locator('.language-link')).toHaveAttribute('href', '/en/');
  await expect(page.locator('link[hreflang="en"]')).toHaveCount(0);
  await expect(page.locator('link[hreflang="fa"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `https://mehdiahmadirad.me${route}`,
  );

  const articleLinks = page.locator('.article-prose a');
  await expect(articleLinks.nth(0)).toHaveAttribute(
    'href',
    '/fa/articles/building-easier-than-understanding/',
  );
  await expect(articleLinks.nth(1)).toHaveAttribute(
    'href',
    '/fa/articles/project-should-explain-itself/',
  );
  await expect(articleLinks.nth(2)).toHaveAttribute(
    'href',
    'https://github.com/mahdiahmadirad/DaD-sample',
  );
  await expect(articleLinks.nth(3)).toHaveAttribute(
    'href',
    'https://github.com/mahdiahmadirad/DaD',
  );
  expect(await (await request.get('/fa/rss.xml')).text()).toContain(route);
  expect(await (await request.get('/sitemap-0.xml')).text()).toContain(route);
  expect((await request.get(`/en/articles/${slug}/`)).status()).toBe(404);

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () =>
          globalThis.document.documentElement.scrollWidth <=
          globalThis.document.documentElement.clientWidth,
      ),
      `fa at ${width}px`,
    ).toBe(true);
    for (const diagram of await page.locator('.content-diagram').all()) {
      expect(
        await diagram.evaluate((node) => node.scrollWidth <= node.clientWidth),
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
  const searchUrls = await accessiblePage.evaluate(async () => {
    const pagefind = await import('/pagefind/pagefind.js');
    const result = await pagefind.search('IAIProvider');
    return Promise.all(
      result.results.map(async (match) => (await match.data()).url),
    );
  });
  expect(searchUrls).toContain(route);
  expect(searchUrls.every((url) => url.startsWith('/fa/'))).toBe(true);
  await accessibleContext.close();
});
