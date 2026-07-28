import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mehdiahmadirad.me',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    locales: ['fa', 'en'],
    defaultLocale: 'fa',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
