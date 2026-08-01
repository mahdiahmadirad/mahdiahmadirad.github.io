import { defineConfig } from '@playwright/test';

import baseConfig from './playwright.config.js';

export default defineConfig({
  ...baseConfig,
  testDir: './tests/visual',
  use: {
    ...baseConfig.use,
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { viewport: { width: 1440, height: 1100 } },
    },
    {
      name: 'mobile-chromium',
      use: { viewport: { width: 390, height: 844 } },
    },
  ],
});
