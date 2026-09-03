export interface UiDictionary {
  siteName: string;
  accessibility: {
    skipToContent: string;
    primaryNavigation: string;
    secondaryNavigation: string;
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
    search: string;
    rss: string;
    github: string;
    linkedin: string;
  };
  article: {
    readingTime: (minutes: string) => string;
    published: string;
    updated: string;
    toc: string;
    allArticles: string;
    allPublishedArticles: string;
    sampleLabel: string;
    sampleNotice: string;
    permalink: string;
    related: string;
    relatedPublished: string;
    previous: string;
    next: string;
    noPrevious: string;
    noNext: string;
    noPreviousPublished: string;
    noNextPublished: string;
    coverTitle: string;
    coverCaption: string;
    printUrl: string;
    supportingInformation: string;
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
      publishedArticleCount: (count: string) => string;
      openTopic: string;
      writingTitle: string;
      publishedWritingTitle: string;
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
      notice: string;
    };
    brandStory: {
      eyebrow: string;
      aboutTitle: string;
      aboutDescription: string;
      aboutLink: string;
      aboutLinkOtherLocale: string;
      backToAbout: string;
      translationUnavailable: string;
    };
    search: {
      pageTitle: string;
      title: string;
      intro: string;
      label: string;
      placeholder: string;
      submit: string;
      initial: string;
      loading: string;
      noResults: string;
      error: string;
      resultCount: (count: string) => string;
      typeLabel: string;
      topicLabel: string;
      resultTypes: {
        article: string;
        topic: string;
        project: string;
        about: string;
        page: string;
      };
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
  publishing: {
    feedTitle: string;
    feedDescription: string;
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
