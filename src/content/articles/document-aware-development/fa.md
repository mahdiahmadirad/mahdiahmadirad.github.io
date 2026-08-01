---
title: "نمونه: توسعه‌ی آگاه از مستندات"
description: "نمونه‌ای آزمایشی برای سنجش ارتباط میان تصمیم، مشخصات، وظیفه و کد در مدل محتوای فارسی."
lang: "fa"
translationKey: "document-aware-development"
slug: "document-aware-development"
publishedAt: 2026-07-01
updatedAt: 2026-07-03
topics:
  - software-architecture
  - systems-engineering
  - evidence-based-development
featured: true
draft: false
sample: true
---

> این نوشته فقط یک نمونه‌ی آزمایشی است و ادعایی درباره‌ی تجربه یا دیدگاه شخصی نویسنده ندارد.

## از تصمیم آغاز کنید

بازبینی یک تغییر کد زمانی ساده‌تر است که دلیل آن دیده شود. در این گردش‌کار نمونه، تصمیم پذیرفته‌شده پیش از تبدیل شدن به وظیفه‌ی پیاده‌سازی، به مشخصاتی آزمون‌پذیر تبدیل می‌شود. زنجیره عمداً کوتاه است: <bdi dir="ltr">ADR → SPEC → TASK → CODE</bdi>.

هدف، تولید مستندات بیشتر نیست. هدف این است که محدودیت شکل‌دهنده‌ی تغییر آن‌قدر به خود تغییر نزدیک بماند که بازبین بتواند هم‌راستایی این دو را بیازماید.

<aside class="callout">
  <p><strong>یادداشت نمونه.</strong> یک مستند فقط زمانی ارزش نگهداری دارد که شیوه‌ی پیاده‌سازی، بازبینی یا راستی‌آزمایی کار را تغییر دهد.</p>
</aside>

### قرارداد را آزمون‌پذیر نگه دارید

مشخصات باید یک نتیجه‌ی مشاهده‌پذیر را نام ببرد. سپس وظیفه می‌تواند کوچک‌ترین تغییری را انتخاب کند که آن نتیجه را اثبات می‌کند و شواهد نیز آنچه واقعاً رخ داده است ثبت می‌کنند.

```ts
type Stage = 'adr' | 'spec' | 'task' | 'code';

const trace = (stages: Stage[]) =>
  stages.every((stage, index) => index === 0 || stage !== stages[index - 1]);
```

#### جداسازی شناسه‌های فنی

دستور <bdi dir="ltr"><code>npm run check</code></bdi>، شناسه‌ی <bdi dir="ltr"><code>translationKey</code></bdi> و نشانی <span data-bidi="ltr" dir="ltr">https://example.com/system-boundary</span> حتی در میان متن فارسی جهت چپ‌به‌راست خود را حفظ می‌کنند.

## حرکت میان وضعیت‌های صریح

این گردش‌کار زمانی مفید است که هر گذار، مالک روشن و آزمون قابل‌مشاهده داشته باشد. یک وظیفه‌ی پیش‌نویس نمی‌تواند تصمیم پذیرفته‌شده را پنهانی کنار بزند و یک وظیفه‌ی تمام‌شده نمی‌تواند به شواهدی تکیه کند که هرگز ثبت نشده‌اند.

<div class="table-scroll" role="region" aria-label="جدول نمونه‌ی وضعیت گردش‌کار" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">مرحله</th><th scope="col">پرسش</th><th scope="col">شاهد</th></tr>
    </thead>
    <tbody>
      <tr><td><bdi dir="ltr">ADR</bdi></td><td>چرا این مسیر؟</td><td>تصمیم پذیرفته‌شده</td></tr>
      <tr><td><bdi dir="ltr">SPEC</bdi></td><td>چه چیزی باید دیده شود؟</td><td>معیار آزمون‌پذیر</td></tr>
      <tr><td><bdi dir="ltr">TASK</bdi></td><td>کوچک‌ترین تغییر چیست؟</td><td>فرمان‌ها و تصاویر</td></tr>
    </tbody>
  </table>
</div>

<figure class="article-figure">
  <svg viewBox="0 0 720 220" role="img" aria-labelledby="sample-flow-fa-title sample-flow-fa-desc">
    <title id="sample-flow-fa-title">مسیر بازخورد محدود</title>
    <desc id="sample-flow-fa-desc">چهار ماژول که به‌ترتیب متصل‌اند و یک یال بازخورد از کد به مرز تصمیم بازمی‌گردد.</desc>
    <g fill="none" stroke="currentColor" stroke-width="2">
      <rect x="28" y="70" width="112" height="80"/><rect x="210" y="70" width="112" height="80"/>
      <rect x="392" y="70" width="112" height="80"/><rect x="574" y="70" width="112" height="80"/>
      <path d="M140 110H210M322 110H392M504 110H574"/>
      <path d="M630 70V30H84V70" stroke="var(--color-accent)"/>
    </g>
    <g fill="var(--color-lapis)"><circle cx="140" cy="110" r="5"/><circle cx="322" cy="110" r="5"/><circle cx="504" cy="110" r="5"/></g>
  </svg>
  <figcaption>شکل نمونه: بازخورد پیاده‌سازی به مرز تصمیم بازمی‌گردد و در کد ناپدید نمی‌شود.</figcaption>
</figure>

## فاصله را بازبینی کنید

خطر عملی، فاصله است: تصمیم در یک محل، وظیفه در محلی دیگر و آزمونی که رابطه‌ی آشکاری با هیچ‌کدام ندارد. یک سابقه‌ی کوچک ردیابی‌پذیری این فاصله را کم می‌کند، بی‌آنکه وانمود کند مستندات جای قضاوت را می‌گیرند.<sup id="note-ref-fa"><a href="#note-fa" aria-label="مطالعه‌ی یادداشت نمونه‌ی ۱">۱</a></sup>

پرسش بازبینی ساده می‌ماند: آیا فردی دیگر می‌تواند دلیل، قرارداد، تغییر و شاهد را دنبال کند، بی‌آنکه مجبور باشد تمام تاریخچه‌ی پروژه را از نو بسازد؟

<section class="footnotes" aria-label="یادداشت‌های نمونه">
  <ol>
    <li id="note-fa">این یادداشت محتوای آزمایشی برای بررسی ریتم پانویس و ناوبری صفحه‌کلید است. <a href="#note-ref-fa" aria-label="بازگشت به ارجاع یادداشت نمونه">↩</a></li>
  </ol>
</section>
