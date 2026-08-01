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
    sampleNotice: 'Editorial content is visibly marked sample fixture data',
    search: 'Search',
    rss: 'RSS feed',
  },
  article: {
    readingTime: (minutes) => `${minutes} min read`,
    published: 'Published',
    updated: 'Updated',
    toc: 'On this page',
    allArticles: 'All sample articles',
    sampleLabel: 'Sample fixture',
    sampleNotice:
      'This article is sample content for reviewing the bilingual reading experience. It makes no claim about the author’s work or views.',
    permalink: 'Article permalink',
    related: 'Related sample articles',
    previous: 'Previous article',
    next: 'Next article',
    noPrevious: 'No previous sample article',
    noNext: 'No next sample article',
    coverTitle: 'A document-to-code dependency flow',
    coverCaption:
      'An abstract sample diagram of decisions becoming specifications, tasks, and code.',
    printUrl: 'Canonical address',
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
  home: {
    pageTitle: 'Mehdi Ahmadirad — Software architecture and engineering',
    subtitle:
      'Software architecture, engineering, and the reasoning behind systems.',
    aboutLink: 'About this sample Home',
    fixtureNotice:
      'Review build: every essay, topic, and project shown below is sample fixture data—not a claim about the author.',
    featuredLabel: 'Featured sample essay',
    readEssay: 'Read sample essay',
    recentWriting: 'Recent sample writing',
    topics: 'Sample topics',
    projects: 'Sample projects',
    viewTopics: 'View sample topics',
    viewProjects: 'View sample projects',
    sampleLabel: 'Sample',
    languageEditions: 'Language editions',
    unavailableEdition: 'edition not published',
    projectStatus: 'Concept fixture',
  },
  secondary: {
    sampleLabel: 'Sample fixture',
    fixtureNotice:
      'This review build uses clearly marked fictional entries. It makes no claim about the author’s projects, biography, or views.',
    articles: {
      pageTitle: 'Sample articles — Mehdi Ahmadirad',
      title: 'Sample articles',
      intro:
        'A review index for the bilingual publishing model, ordered by each edition’s publication date.',
      listTitle: 'Published sample editions',
    },
    topics: {
      pageTitle: 'Sample topics — Mehdi Ahmadirad',
      title: 'Sample topics',
      intro:
        'A small subject index showing how published editions gather around related engineering questions.',
      articleCount: (count) =>
        count === '1' ? '1 sample article' : `${count} sample articles`,
      openTopic: 'View topic',
      writingTitle: 'Writing in this sample topic',
    },
    projects: {
      pageTitle: 'Sample projects — Mehdi Ahmadirad',
      title: 'Sample projects',
      intro:
        'A manually ordered project-index fixture—not a GitHub import and not a record of the author’s work.',
      technologies: 'Fixture technologies',
      status: {
        active: 'Active',
        maintained: 'Maintained',
        archived: 'Archived',
        concept: 'Concept fixture',
      },
    },
    about: {
      pageTitle: 'About — content pending',
      title: 'About content pending',
      intro:
        'This route reserves the approved About structure without inventing biography, experience, links, or personal views.',
    },
    search: {
      pageTitle: 'Search — Mehdi Ahmadirad',
      title: 'Search this edition',
      intro:
        'Search the published English sample corpus. Results stay within this language edition.',
      label: 'Search term',
      placeholder: 'Architecture, feedback, decisions…',
      submit: 'Search',
      initial: 'Enter a term to search this edition.',
      loading: 'Searching the static index…',
      noResults: 'No results in this edition.',
      error: 'The search index could not be loaded. Please try again.',
      resultCount: (count) => (count === '1' ? '1 result' : `${count} results`),
      typeLabel: 'Type',
      topicLabel: 'Topic',
      resultTypes: {
        article: 'Article',
        topic: 'Topic',
        project: 'Project',
        about: 'About',
        page: 'Page',
      },
    },
    notFound: {
      pageTitle: 'Page not found',
      code: '404 / route not found',
      title: 'This path does not resolve.',
      message:
        'Choose a language home or continue to the corresponding search page.',
      homeLink: 'English home',
      searchLink: 'English search',
    },
  },
  publishing: {
    feedTitle: 'Mehdi Ahmadirad — English sample writing',
    feedDescription:
      'Published English sample articles for reviewing the bilingual site.',
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
