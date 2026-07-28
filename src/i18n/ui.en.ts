import type { UiDictionary } from './ui.types';

export const en = {
  siteName: 'Mehdi Ahmadirad',
  nav: {
    articles: 'Articles',
    topics: 'Topics',
    projects: 'Projects',
    about: 'About',
  },
  article: {
    readingTime: (minutes) => `${minutes} min read`,
    published: 'Published',
    updated: 'Updated',
    toc: 'On this page',
  },
  translation: {
    available: 'Another language edition is published',
    unavailable: 'Translation not yet published',
    switchTo: 'Read in Persian',
  },
  foundation: {
    title: 'Bilingual content foundation',
    sampleNotice:
      'This page shows infrastructure status and sample fixtures only.',
    bidiExample: 'https://example.com/sample',
  },
} satisfies UiDictionary;
