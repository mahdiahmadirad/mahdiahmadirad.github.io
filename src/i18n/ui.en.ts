import type { UiDictionary } from './ui.types';

export const en = {
  siteName: 'Mehdi Ahmadirad',
  accessibility: {
    skipToContent: 'Skip to main content',
    primaryNavigation: 'Primary navigation',
  },
  nav: {
    articles: 'Articles',
    topics: 'Topics',
    projects: 'Projects',
    about: 'About',
  },
  language: {
    label: 'Choose language',
    fa: 'فارسی',
    en: 'English',
  },
  footer: {
    sampleNotice: 'Internal design-system review build',
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
  designSystem: {
    title: 'Engineering Editorial design system',
    intro:
      'An internal page for reviewing rhythm, typography, color, content primitives, and left-to-right behavior.',
    sampleLabel: 'Sample fixture',
    typographyTitle: 'Typography and prose',
    headingDisplay: 'The reasoning behind systems',
    headingSection: 'Boundaries, decisions, and feedback',
    prose:
      'Reading should feel calm, precise, and free of decorative density. This paragraph exists only to test line length, leading, and the relationship between editorial prose and technical expressions.',
    linkLabel: 'Inspect link and focus states',
    listItems: [
      'Connect decisions to the context that shaped them.',
      'Keep system boundaries explicit and reviewable.',
      'Place feedback close to the point of change.',
    ],
    quote:
      'This is not a real quotation; it is a fixture for reviewing emphasis, rules, and reading rhythm.',
    quoteSource: 'Sample label',
    componentsTitle: 'Content primitives',
    calloutTitle: 'Sample note',
    calloutBody:
      'Color is not the only carrier of meaning; the heading, side rule, and text structure also identify this message.',
    rowIndex: '01',
    rowTitle: 'Sample editorial row',
    rowSummary:
      'An open pattern for a title, short description, and metadata without a card or shadow.',
    rowMeta: '7 min read · Sample',
    tableCaption: 'Sample decision table',
    tableHeaders: ['Stage', 'Output', 'State'],
    tableRow: ['Specification', 'Testable contract', 'Reviewed'],
    codeLabel: 'Code sample',
    codeSample: 'const locale: Locale = "en";',
    focusLabel: 'Sample control',
    graphicTitle: 'Software system graph',
    graphicBody:
      'Nodes, boundaries, and dependency flow replace every building-architecture metaphor.',
  },
} satisfies UiDictionary;
