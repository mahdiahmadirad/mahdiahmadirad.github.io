export interface UiDictionary {
  siteName: string;
  accessibility: {
    skipToContent: string;
    primaryNavigation: string;
  };
  nav: {
    articles: string;
    topics: string;
    projects: string;
    about: string;
  };
  language: {
    label: string;
    fa: string;
    en: string;
  };
  footer: {
    sampleNotice: string;
  };
  article: {
    readingTime: (minutes: string) => string;
    published: string;
    updated: string;
    toc: string;
    allArticles: string;
    sampleLabel: string;
    sampleNotice: string;
    permalink: string;
    related: string;
    previous: string;
    next: string;
    noPrevious: string;
    noNext: string;
    coverTitle: string;
    coverCaption: string;
    printUrl: string;
  };
  translation: {
    available: string;
    unavailable: string;
    switchTo: string;
  };
  foundation: {
    title: string;
    sampleNotice: string;
    bidiExample: string;
  };
  home: {
    pageTitle: string;
    subtitle: string;
    aboutLink: string;
    fixtureNotice: string;
    featuredLabel: string;
    readEssay: string;
    recentWriting: string;
    topics: string;
    projects: string;
    viewTopics: string;
    viewProjects: string;
    sampleLabel: string;
    languageEditions: string;
    unavailableEdition: string;
    projectStatus: string;
  };
  secondary: {
    sampleLabel: string;
    fixtureNotice: string;
    articles: {
      pageTitle: string;
      title: string;
      intro: string;
      listTitle: string;
    };
    topics: {
      pageTitle: string;
      title: string;
      intro: string;
      articleCount: (count: string) => string;
      openTopic: string;
      writingTitle: string;
    };
    projects: {
      pageTitle: string;
      title: string;
      intro: string;
      technologies: string;
      status: Record<'active' | 'maintained' | 'archived' | 'concept', string>;
    };
    about: {
      pageTitle: string;
      title: string;
      intro: string;
    };
    search: {
      pageTitle: string;
      title: string;
      deferred: string;
      homeLink: string;
    };
    notFound: {
      pageTitle: string;
      code: string;
      title: string;
      message: string;
      homeLink: string;
      searchLink: string;
    };
  };
  designSystem: {
    title: string;
    intro: string;
    sampleLabel: string;
    typographyTitle: string;
    headingDisplay: string;
    headingSection: string;
    prose: string;
    linkLabel: string;
    listItems: [string, string, string];
    quote: string;
    quoteSource: string;
    componentsTitle: string;
    calloutTitle: string;
    calloutBody: string;
    rowIndex: string;
    rowTitle: string;
    rowSummary: string;
    rowMeta: string;
    tableCaption: string;
    tableHeaders: [string, string, string];
    tableRow: [string, string, string];
    codeLabel: string;
    codeSample: string;
    focusLabel: string;
    graphicTitle: string;
    graphicBody: string;
  };
}
