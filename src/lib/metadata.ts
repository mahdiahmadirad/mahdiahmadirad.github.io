import type { Locale } from '../i18n/locales';

export interface ArticleMetadata {
  publishedAt: Date;
  updatedAt?: Date;
}

export interface PublishingMetadata {
  locale: Locale;
  title: string;
  description?: string;
  canonicalPath?: string;
  alternates?: Partial<Record<Locale, string>>;
  noindex?: boolean;
  pageType?: string;
  pageTopic?: string;
  article?: ArticleMetadata;
}
