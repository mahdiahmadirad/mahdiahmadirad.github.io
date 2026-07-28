import type { UiDictionary } from './ui.types';

export const fa = {
  siteName: 'مهدی احمدی‌راد',
  nav: {
    articles: 'مقاله‌ها',
    topics: 'موضوع‌ها',
    projects: 'پروژه‌ها',
    about: 'درباره‌ی من',
  },
  article: {
    readingTime: (minutes) => `${minutes} دقیقه مطالعه`,
    published: 'منتشرشده در',
    updated: 'آخرین ویرایش',
    toc: 'در این صفحه',
  },
  translation: {
    available: 'نسخه‌ی دیگر منتشر شده است',
    unavailable: 'ترجمه هنوز منتشر نشده است',
    switchTo: 'مطالعه به انگلیسی',
  },
  foundation: {
    title: 'زیرساخت محتوای دوزبانه',
    sampleNotice: 'این صفحه فقط وضعیت زیرساخت و محتوای نمونه را نشان می‌دهد.',
    bidiExample: 'https://example.com/sample',
  },
} satisfies UiDictionary;
