import type { UiDictionary } from './ui.types';

export const fa = {
  siteName: 'مهدی احمدی‌راد',
  accessibility: {
    skipToContent: 'رفتن به محتوای اصلی',
    primaryNavigation: 'ناوبری اصلی',
  },
  nav: {
    articles: 'مقاله‌ها',
    topics: 'موضوع‌ها',
    projects: 'پروژه‌ها',
    about: 'درباره‌ی من',
  },
  language: {
    label: 'انتخاب زبان',
    fa: 'فارسی',
    en: 'English',
  },
  footer: {
    sampleNotice: 'نسخه‌ی داخلی برای بررسی سامانه‌ی طراحی',
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
  designSystem: {
    title: 'سامانه‌ی طراحی مهندسی–تحریریه‌ای',
    intro:
      'صفحه‌ای داخلی برای بررسی ریتم، تایپوگرافی، رنگ، اجزای محتوایی و رفتار راست‌به‌چپ.',
    sampleLabel: 'نمونه‌ی آزمایشی',
    typographyTitle: 'تایپوگرافی و نثر',
    headingDisplay: 'منطق پشت سیستم‌ها',
    headingSection: 'مرزها، تصمیم‌ها و بازخورد',
    prose:
      'متن خواندنی باید آرام، دقیق و بدون تراکم تزئینی باشد. این بند فقط برای سنجش طول خط، فاصله‌ی سطر و کیفیت ترکیب فارسی با عبارت‌های فنی نوشته شده است.',
    linkLabel: 'مشاهده‌ی حالت پیوند و تمرکز',
    listItems: [
      'تصمیم‌ها را به زمینه‌ی آن‌ها متصل کنید.',
      'مرزهای سیستم را صریح و قابل بازبینی نگه دارید.',
      'بازخورد را نزدیک به محل تغییر قرار دهید.',
    ],
    quote:
      'این یک نقل‌قول واقعی نیست؛ نمونه‌ای برای بررسی وزن، خط تأکید و ریتم متن است.',
    quoteSource: 'برچسب نمونه',
    componentsTitle: 'اجزای محتوایی',
    calloutTitle: 'یادداشت نمونه',
    calloutBody:
      'رنگ تنها حامل معنا نیست؛ عنوان، خط کناری و ساختار متن نیز نوع این پیام را مشخص می‌کنند.',
    rowIndex: '۰۱',
    rowTitle: 'ردیف تحریریه‌ای نمونه',
    rowSummary:
      'الگوی باز برای نمایش عنوان، توضیح کوتاه و فراداده بدون کارت و سایه.',
    rowMeta: '۷ دقیقه مطالعه · نمونه',
    tableCaption: 'نمونه‌ی جدول تصمیم',
    tableHeaders: ['مرحله', 'خروجی', 'وضعیت'],
    tableRow: ['مشخصات', 'قرارداد قابل‌آزمون', 'بررسی‌شده'],
    codeLabel: 'نمونه‌ی کد',
    codeSample: 'const locale: Locale = "fa";',
    focusLabel: 'کنترل نمونه',
    graphicTitle: 'گراف سامانه‌ی نرم‌افزاری',
    graphicBody:
      'گره‌ها، مرزها و جریان وابستگی جایگزین هرگونه استعاره‌ی معماری ساختمانی شده‌اند.',
  },
} satisfies UiDictionary;
