import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mehdiahmadirad.me',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'github-light-high-contrast',
    },
  },
  integrations: [
    sitemap({
      filter: (page) =>
        new globalThis.URL(page).pathname !== '/' &&
        new globalThis.URL(page).pathname !== '/404.html' &&
        !page.includes('/design-system/') &&
        !page.includes('/search/') &&
        !page.endsWith('/rss.xml') &&
        !page.endsWith('/robots.txt'),
    }),
  ],
  i18n: {
    locales: ['fa', 'en'],
    defaultLocale: 'fa',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
