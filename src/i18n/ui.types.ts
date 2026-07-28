export interface UiDictionary {
  siteName: string;
  nav: {
    articles: string;
    topics: string;
    projects: string;
    about: string;
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
}
