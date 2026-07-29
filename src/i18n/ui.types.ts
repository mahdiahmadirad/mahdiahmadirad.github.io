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
