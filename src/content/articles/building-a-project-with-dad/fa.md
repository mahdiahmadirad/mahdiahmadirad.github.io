---
title: "ساختن یک پروژه با Document-Aware Development"
description: "مقاله‌ی سوم DaD؛ ساختن یک API کوچک با زنجیره‌ی Vision، ADR، Specification، Task، Implementation و Evidence، و زمینه‌سازی برای یک Drift واقعی."
lang: "fa"
translationKey: "building-a-project-with-dad"
slug: "building-a-project-with-dad"
publishedAt: 2026-09-05
topics:
  - software-architecture
featured: false
draft: false
sample: false
---

در دو مقاله‌ی قبل بیشتر درباره‌ی مسئله حرف زدم.

اول درباره‌ی این‌که [وقتی تولید کد آسان‌تر می‌شود، بخش دشوارتر کار ممکن است فهمیدن پروژه و حفظ دانشی باشد که پشت آن قرار دارد](/fa/articles/building-easier-than-understanding/). بعد درباره‌ی این‌که [repository چطور می‌تواند فقط مجموعه‌ای از فایل‌های کد نباشد و بخشی از دانش پروژه را هم به‌شکلی قابل دنبال کردن نگه دارد](/fa/articles/project-should-explain-itself/).

اما همه‌ی این حرف‌ها تا وقتی روی یک پروژه‌ی واقعی دیده نشوند کمی انتزاعی باقی می‌مانند.

برای همین یک repository کوچک به نام [DaD-sample](https://github.com/mahdiahmadirad/DaD-sample) ساختم.

پروژه عمداً ساده است: یک ASP.NET Core Web API که متن می‌گیرد و خلاصه‌ای از آن برمی‌گرداند.

اگر فقط هدف ساختن چنین APIی بود، احتمالن می‌شد در چند دقیقه endpoint را نوشت، یک SDK مربوط به یکی از AI providerها را اضافه کرد و کار را تمام کرد.

ولی هدف این repository چیز دیگری است.

می‌خواهیم ببینیم اگر همین پروژه‌ی کوچک را با Document-Aware Development جلو ببریم، رابطه‌ی بین چیزی که **می‌خواهیم بسازیم**، تصمیم‌هایی که می‌گیریم، کاری که باید انجام شود و کدی که در نهایت نوشته می‌شود چه شکلی پیدا می‌کند.

## پروژه‌ای که تقریباً هیچ کاری نمی‌کند

صورت مسئله‌ی اولیه خیلی ساده است.

می‌خواهیم APIای داشته باشیم با endpointی شبیه این:

```http
POST /api/summaries
```

که چنین ورودی‌ای بگیرد:

```json
{
  "text": "A long piece of text to summarize."
}
```

و چیزی شبیه این برگرداند:

```json
{
  "summary": "..."
}
```

در نسخه‌ی فعلی sample حتا از یک AI واقعی هم استفاده نمی‌کنیم.

یک provider محلی و deterministic داریم که برای متن‌های کوتاه همان متن را برمی‌گرداند و برای متن‌های بلندتر سی کلمه‌ی اول را نگه می‌دارد.

طبعاً این summarization نیست، مگر این‌که تعریف ما از هوش مصنوعی به شکل نگران‌کننده‌ای پایین آمده باشد. ولی اینجا کیفیت خلاصه‌سازی مسئله‌ی اصلی نیست. می‌خواهیم بتوانیم کل پروژه را بدون API Key، سرویس خارجی یا dependency اضافه اجرا و test کنیم و در عین حال یک مسئله‌ی معماری واقعی داشته باشیم.

آن مسئله این است:

**برنامه نباید به یک AI provider خاص وابسته شود.**

همین تصمیم کوچک برای نمونه‌ی ما کافی است.

## قبل از کد، repository چه چیزی می‌داند؟

ساختار فعلی پروژه تقریباً به این شکل است:

```text
.
├── AGENTS.md
├── PROJECT-VISION.md
├── docs/
│   ├── adr/
│   │   └── ADR-0001.md
│   ├── specs/
│   │   └── SPEC-0001.md
│   └── tasks/
│       ├── TASK-0001.md
│       └── TASK-0002.md
├── src/
│   └── DaDSample.Api/
├── tests/
│   └── DaDSample.Api.Tests/
└── scripts/
```

<figure class="content-diagram content-diagram--composition" aria-label="بخش‌های اصلی repository و انواع دانش و پیاده‌سازی">
  <ul class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">AGENTS.md</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">PROJECT-VISION.md</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">ADR</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">SPEC</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">TASK</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Source &amp; Tests</span></li>
  </ul>
</figure>

چیزی که برای من در این ساختار مهم است نام‌ها و شکل قرارگیری folderها نیست. می‌توانستیم نامشان را عوض کنیم یا بعضی‌هایشان را با ساختار دیگری نگه داریم. مهم این است که انواع مختلف دانش پروژه را از هم جدا کرده‌ایم.

`PROJECT-VISION.md` قرار است درباره‌ی چرایی وجود پروژه و مرزهای کلی آن حرف بزند.

ADR درباره‌ی تصمیمی که گرفته‌ایم و reasoning پشت آن است.

Specification رفتار مورد انتظار سیستم را دقیق‌تر می‌کند.

Task واحد اجرایی تغییر است.

و implementation چیزی است که در نهایت آن تصمیم‌ها را به یک سیستم قابل اجرا تبدیل می‌کند.

در نتیجه وقتی وارد repository می‌شویم، فقط نمی‌توانیم بپرسیم:

«کد کجاست؟»

می‌توانیم بپرسیم:

«این کد چرا این شکلی شده است؟»

این سؤال دوم برای DaD مهم‌تر است.

## نقطه‌ی ورود Agent

فرض کنیم به یک Agent بگوییم:

> قابلیت خلاصه‌سازی متن را به این پروژه اضافه کن.

در workflow معمول، Agent ممکن است مستقیم سراغ `src` برود، ساختار پروژه را بررسی کند و شروع به implementation کند.

در این repository، `AGENTS.md` قبل از هر چیز دیگری قواعد کار را تعریف کرده است.

از Agent خواسته می‌شود ابتدا `PROJECT-VISION.md` را بخواند، بعد Task فعال را پیدا کند و سپس ADR و Specificationهایی را که آن Task به آن‌ها وابسته است بررسی کند.

یعنی مسیر ذهنی مورد انتظار چیزی شبیه این است:

<figure class="content-diagram content-diagram--long" aria-label="مسیر ورود Agent تا تطبیق مستندات و کد">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Agent enters repository</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">AGENTS.md</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">PROJECT-VISION</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">TASK</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">ADR / SPEC</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Code</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Tests</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reconciliation</span></li>
  </ol>
</figure>

این ترتیب شاید در نگاه اول کندتر به نظر برسد.

قبل از نوشتن پنجاه خط کد، چند فایل Markdown هم باید خوانده شوند. اما نکته این است که این documentها قرار نیست تشریفات باشند.
هر کدام اطلاعاتی دارند که از روی implementation به‌تنهایی قابل استخراج نیست.

## اولین تصمیم

در `ADR-0001` تصمیم گرفته‌ایم text-analysis provider باید قابل تعویض باقی بماند.

ساده‌تر اگر بگویم:

feature مربوط به summarization نباید بداند پشت سیستم OpenAI است، یک مدل local است یا provider دیگری.

این تصمیم خودش را بعداً در کد به شکل interfaceای به نام `IAIProvider` نشان می‌دهد. اما `IAIProvider` خود تصمیم نیست.

از دیدن چنین interfaceی در codebase می‌توان حدس زد که نویسنده احتمالاً قصد abstraction داشته است، ولی نمی‌توان فهمید چرا!

شاید قرار بوده چند provider داشته باشیم.

شاید فقط برای unit testing ساخته شده.

شاید abstraction قدیمی‌ای است که دیگر دلیل وجودش از بین رفته.

یا شاید مثل پروژه‌ی ما، **replaceability یک constraint معماری است**.

ADR این ابهام را حذف می‌کند.

در آن ثبت کرده‌ایم که اتصال مستقیم feature code به SDK یک vendor، انتخاب کوتاه‌تر و ساده‌تری بود، اما آن را نپذیرفتیم چون provider choice نباید تبدیل به بخشی از رفتار اصلی application شود.

همچنین تصمیم گرفته‌ایم provider اولیه local باشد تا پروژه بدون secret و account خارجی قابل اجرا بماند.

این همان بخشی از knowledge است که interface به‌تنهایی نمی‌تواند نگه دارد.

## از Decision به Specification

اما ADR هنوز برای implementation کافی نیست.

این‌که بگوییم:

> Provider باید replaceable باشد.

یک جهت معماری به ما می‌دهد، نه یک قرارداد دقیق برای ساختن سیستم.

برای همین `SPEC-0001` قدم بعدی است.

در Specification می‌گوییم قابلیت اولیه‌ی ما summarization است و feature code باید به `IAIProvider` وابسته باشد.

قرارداد ساده‌ی provider چیزی شبیه این است:

```csharp
Task<string> SummarizeAsync(
    string text,
    CancellationToken cancellationToken);
```

همچنین رفتار HTTP دقیق‌تر می‌شود:

- درخواست خالی باید `400` برگرداند.
- درخواست معتبر باید `200` و یک `summary` برگرداند.
- provider پیش‌فرض نباید نیازمند network یا secret باشد.
- رفتار provider محلی باید deterministic باشد تا بتوانیم آن را test کنیم.

در همین document چند چیز را هم صریحاً **خارج از scope** گذاشته‌ایم:

authentication، persistence، streaming، failover و حتا اتصال به provider واقعی.

این بخش شاید کم‌اهمیت به نظر برسد، ولی برای Agent اتفاقاً مهم است.

اگر فقط بگوییم «یک Text Analysis API بساز»، اضافه کردن configuration پیچیده، retry policy، persistence یا چند abstraction دیگر ممکن است از نظر فنی ایده‌های بدی نباشند.

مشکل این است که ما آن‌ها را نخواسته‌ایم.

Specification فقط نمی‌گوید چه چیزی باید ساخته شود.

بخشی از کارش این است که بگوید **چه چیزی هنوز نباید ساخته شود**.

## حالا می‌توانیم Task بسازیم

بعد از Decision و Specification، به `TASK-0001` می‌رسیم:

**Implement the first summarization vertical slice**

Task دیگر قرار نیست دوباره معماری را تعریف کند.

قرار نیست requirement تازه‌ای اختراع کند.

وظیفه‌اش این است که یک تغییر محدود و قابل پایان را تعریف کند.

در این نمونه Task می‌گوید:

- ASP.NET Core API ساخته شود.
- `IAIProvider` تعریف شود.
- local provider پیاده‌سازی شود.
- endpoint مربوط به summarization اضافه شود.
- validation نوشته شود.
- testها اضافه شوند.
- build و test قابل تکرار باشند.

و در کنار آن مشخص می‌کند چه چیزهایی خارج از scope هستند.

همچنین Task به ADR و SPEC مربوط به خودش reference دارد.

در نتیجه رابطه تقریباً این می‌شود:

<figure class="content-diagram content-diagram--long" aria-label="زنجیره‌ی دلیل، رفتار مورد انتظار، کار محدود، کد و شواهد">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">ADR-0001<small>Reason</small></span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">SPEC-0001<small>Expected behavior</small></span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">TASK-0001<small>Bounded work</small></span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation<small>Code</small></span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Tests<small>Evidence</small></span></li>
  </ol>
</figure>

برای من این trace مهم‌تر از خود folder structure است.

اگر شش ماه بعد کسی `TASK-0001` را ببیند، لازم نیست از روی متن task حدس بزند چرا `IAIProvider` وجود دارد.

می‌تواند یک مرحله به عقب برگردد.

و دوباره یک مرحله‌ی دیگر.

## Implementation بالاخره وارد می‌شود

حالا Agent یا developer implementation را انجام می‌دهد.

در پروژه‌ی sample، feature مربوط به Summarization فقط `IAIProvider` را می‌شناسد.

provider اولیه هم implementation محلی و ساده‌ای است.

در نتیجه dependency تقریباً چنین شکلی دارد:

<figure class="content-diagram" aria-label="وابستگی feature خلاصه‌سازی به provider محلی از مسیر interface">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Summarization Feature</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">IAIProvider</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">LocalTextAnalysisProvider</span></li>
  </ol>
</figure>

اگر بعداً بخواهیم یک OpenAI provider یا هر vendor دیگری اضافه کنیم، integration باید پشت همین boundary قرار بگیرد.

در حالت ایده‌آل endpoint summarization برای این تغییر اهمیتی قائل نیست.

این معماری پیچیده‌ای نیست.

اصلن هدف sample این نیست که معماری خیره‌کننده‌ای نشان بدهد.

برعکس، ترجیح می‌دهم decision آن‌قدر ساده باشد که بتوانیم رابطه‌ی بین document و code را بدون سروصدای بقیه‌ی سیستم ببینیم.

## Test فقط test کد نیست

Task با نوشته شدن implementation تمام نمی‌شود. Specification چند رفتار قابل بررسی تعریف کرده است.

مثلاً:

- blank input باید `400` باشد.
- input معتبر باید summary برگرداند.
- local provider باید deterministic باشد.
- feature code نباید به vendor SDK وابسته باشد.

بخشی از این‌ها را automated test بررسی می‌کند.
در نتیجه test در اینجا فقط ابزاری برای پیدا کردن bug نیست. **evidence است.**
Task ادعا کرده بود یک outcome مشخص تحویل داده خواهد شد.
Specification رفتار مورد انتظار را تعریف کرده بود.
Test بخشی از شواهدی است که نشان می‌دهد implementation واقعاً با این انتظارات هم‌راستاست.
بعد از اجرای CI هم evidence واقعی داخل خود Task ثبت شده است.
این تفاوت کوچکی با نوشتن checkboxهایی مثل این دارد:

```text
[x] Tests passed
```

به نظرم بهتر است اگر repository ادعا می‌کند validation انجام شده، تا جای ممکن بتوانیم بفهمیم این ادعا به چه اجرای واقعی‌ای اشاره می‌کند.

## پس Source of Truth کدام است؟

در این نقطه ممکن است سؤال مهمی پیش بیاید.

آیا ADR حقیقت است؟ Specification؟ Task؟ یا code؟

به نظرم این سؤال اگر به دنبال یک پاسخ واحد باشد، کمی گمراه‌کننده است. هر کدام authority خودش را دارد.

ADR درباره‌ی decision است.
Specification درباره‌ی رفتار مورد انتظار.
Task درباره‌ی change فعلی.
Implementation درباره‌ی چیزی که سیستم واقعاً در حال حاضر انجام می‌دهد.

اگر این‌ها با هم سازگار باشند، مشکلی نداریم.

مسئله وقتی شروع می‌شود که دو بخش از این زنجیره روایت متفاوتی از پروژه داشته باشند.

برای همین در `AGENTS.md` قاعده‌ای داریم که اگر دو منبع authoritative با هم conflict داشتند، Agent نباید منبعی را انتخاب کند که implementation را برایش راحت‌تر می‌کند.

باید conflict را آشکار کند.

این نقطه جایی است که workflow از یک documentation convention ساده فاصله می‌گیرد.

## اگر فردا یک Task جدید بدهیم چه اتفاقی می‌افتد؟

فرض کنیم حالا از Agent بخواهیم:

> برای summarization از OpenAI SDK استفاده کن.

این جمله به‌تنهایی کاملاً قابل اجراست.

Agent می‌تواند package را اضافه کند، client بسازد و feature را به API وصل کند.

اما در repository فعلی ما این تغییر یک مسئله دارد.

ADR می‌گوید feature code نباید به provider خاص وابسته شود.

Specification هم همان boundary را الزام کرده است.

پس Task جدید نمی‌تواند بدون بررسی این دو document، مستقیم implementation شود.

دو حالت داریم.

ممکن است منظور ما این باشد:

> یک OpenAI adapter جدید پشت `IAIProvider` اضافه کن.

این با معماری موجود سازگار است.

اما شاید واقعاً تصمیم گرفته‌ایم abstraction را کنار بگذاریم و application را مستقیم به OpenAI متصل کنیم.

در آن صورت مسئله فقط code change نیست.**Decision تغییر کرده است.**

و اگر Decision تغییر کرده، باید بتوانیم این تغییر را در مدل knowledge پروژه هم ببینیم.

اینجا دقیقاً همان جایی است که DaD برای من معنا پیدا می‌کند.

نه وقتی همه‌چیز مرتب است.

وقتی یک تغییر جدید با بخشی از حقیقت قبلی پروژه برخورد می‌کند.

## یک Drift واقعی

من برای ادامه‌ی این sample می‌خواهم دقیقاً همین اتفاق را ایجاد کنم. در iteration بعدی repository، عمداً تغییری ایجاد خواهیم کرد که بین Task، Specification، Decision و Implementation ناسازگاری ایجاد کند. بعد repository را در همان وضعیت بررسی می‌کنیم.

می‌خواهیم ببینیم Agent چه چیزی می‌بیند، conflict کجا قابل تشخیص است و Reconciliation دقیقاً باید چه چیزی را تغییر دهد.

احتمالن آن بخش از این مثال مهم‌تر از bootstrap اولیه باشد، چون پروژه‌های واقعی معمولاً مشکلشان این نیست که روز اول نمی‌توانند structure تمیزی بسازند.

مشکل از روز دویستم شروع می‌شود.

وقتی تصمیم‌های تازه وارد شده‌اند، documentهای قدیمی هنوز وجود دارند، implementation در چند مرحله تغییر کرده و هیچ‌کس دقیقن مطمئن نیست کدام بخش از داستان هنوز معتبر است.

## یک نکته درباره‌ی خود ساختار

ممکن است با دیدن این repository این برداشت ایجاد شود که DaD یعنی داشتن این folderها:

```text
docs/adr
docs/specs
docs/tasks
```

من این تعریف را دقیق نمی‌دانم.

این‌ها فقط convention فعلی framework هستند.

ممکن است پروژه‌ای ساختار دیگری داشته باشد و همان ایده را بهتر اجرا کند. شما می‌توانید آن‌ها را تغییر دهید. کما این که خود من در پروژه‌های مختلف به دلایل مختلفی تصمیم‌ گرفتم این ساختار را کمی تغییر دهم.

چیزی که برای من مهم است رابطه‌ی بین artifactهاست:

<figure class="content-diagram content-diagram--long" aria-label="زنجیره‌ی دانش پروژه از Vision تا Evidence">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Vision</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Decision</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Specification</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Task</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Evidence</span></li>
  </ol>
</figure>

و البته رابطه فقط رو به پایین نیست.

Implementation ممکن است نشان دهد Specification ناقص بوده.

یک Task ممکن است Decision جدیدی لازم داشته باشد.

یک Decision جدید ممکن است چند Specification موجود را تحت تأثیر قرار دهد.

پس اگر بخواهم دقیق‌تر بگویم، این شکل هم هنوز زیادی ساده است.

پروژه در عمل بیشتر شبیه graph است.

ولی برای شروع، همین زنجیره کمک می‌کند بدانیم هر نوع اطلاعات را کجا باید دنبال کنیم.

## آیا برای یک API کوچک این همه document لازم است؟

اگر قرار بود همین Text Analysis API را بسازم و فردا repository را پاک کنم، نه.

احتمالن هیچ ADR و SPECی برایش نمی‌نوشتم.

این sample عمداً یک مقدار documentation بیشتر از نیاز عملی خودش دارد، چون قرار است رابطه‌ی بین artifactها را واضح کند.

اما این سؤال در پروژه‌ی واقعی شکل دیگری پیدا می‌کند. برای یک پروژه‌ی جدی. یک پروژه که ارزش اساسی‌ای را خلق می‌کند و قرار است مدت زمان محسوسی چرخه‌ی حیات داشته باشد.

ببینید قرار نیست برای هر تصمیم کوچک ADR بنویسیم.

قرار نیست برای هر function یک specification داشته باشیم.

و قرار نیست documentation تبدیل به نسخه‌ای کم‌کیفیت‌تر از خود code شود.

معیاری که من فعلن برای خودم مفید می‌بینم این است:

**آیا نبودن این اطلاعات می‌تواند باعث شود توسعه‌دهنده یا Agent بعدی تصمیم متفاوتی بگیرد؟**

اگر پاسخ بله باشد، احتمال ثبت کردنش بیشتر است.

چرا provider باید replaceable باشد؟

ارزش ثبت شدن دارد.

نام یک local variable؟

احتمالن نه.

مرز مهم یک feature؟

ممکن است.

جزئیات implementationی که از روی code واضح است؟

احتمالن document جدیدی لازم ندارد.

DaD قرار نیست مشکل کمبود context را با تولید کوهی از context حل کند.

آن بیماری فقط اسمش عوض می‌شود.

## ساختن این structure با CLI

من در این مقاله structure را تقریباً به‌شکل دستی ساختم، چون اگر از همان ابتدا چند command اجرا کنیم و مجموعه‌ای از فایل‌ها ظاهر شوند، خیلی راحت می‌شود خود ساختار را دید ولی دلیل وجودش را نفهمید.

اما برای استفاده‌ی واقعی لازم نیست هر بار همه‌ی این scaffolding را دستی بسازیم.

در repository اصلی [Document-Aware Development](https://github.com/mahdiahmadirad/DaD) یک CLI برای همین کار وجود دارد.

می‌توان repository را initialize کرد و artifactهایی مثل ADR، Specification و Task را با command ساخت.

مثلاً workflow می‌تواند از چیزی شبیه این شروع شود:

```bash
dad init
```

و برای ساخت artifact جدید:

```bash
dad new ADR
dad new SPEC
dad new TASK
```

CLI conventionهای DaD را اعمال می‌کند، شماره‌ی documentها را مدیریت می‌کند و Taskها را در مسیر canonical فعلی یعنی:

```text
docs/tasks/
```

قرار می‌دهد.

ابزار commandهای دیگری هم برای دیدن وضعیت repository، context و بررسی consistency دارد.

هدف CLI این نیست که reasoning را automate کند.

نمی‌تواند تصمیم بگیرد چرا architecture باید provider-agnostic باشد.

نمی‌تواند به جای تیم مشخص کند Specification چه چیزی باید الزام کند.

کاری که می‌کند بخش مکانیکی framework را ساده‌تر می‌کند تا انرژی کمتری صرف درست کردن folder، filename، numbering و structure شود.

## چیزی که تا اینجا ساخته‌ایم

در sample فعلی زنجیره‌ی کامل اولیه را داریم:

<figure class="content-diagram content-diagram--long" aria-label="زنجیره‌ی کامل پروژه‌ی نمونه از Vision تا Tests">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Project Vision</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">ADR-0001</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">SPEC-0001</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">TASK-0001</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Tests</span></li>
  </ol>
</figure>

این پروژه هنوز عمداً کوچک و تقریباً بی‌اهمیت است.

اما حالا یک ویژگی دارد که نسخه‌ی ساده‌ی همان API نداشت:

اگر کسی بپرسد:

> چرا feature مستقیماً OpenAI SDK را صدا نمی‌زند؟

پاسخ فقط این نیست که:

> چون یک نفر قبلاً interface گذاشته.

repository می‌تواند مسیر رسیدن به پاسخ را نشان دهد.

می‌توانیم از code به Task برسیم.

از Task به Specification.

و از Specification به Decision.

به نظرم این همان تفاوتی است که در مقاله‌ی قبل سعی کردم با جمله‌ی «پروژه باید بتواند خودش را توضیح دهد» بیان کنم.

اینجا دیگر آن جمله فقط یک ایده نیست.

یک repository کوچک داریم که می‌توانیم آن را باز کنیم، documentهایش را بخوانیم، code را اجرا کنیم و ببینیم این توضیح دادن در عمل چه شکلی است.

البته تا وقتی همه‌چیز با هم سازگار است، داستان کمی بیش از حد تمیز به نظر می‌رسد.

پروژه‌های واقعی این‌قدر مؤدب نیستند.

مرحله‌ی بعدی برای همین sample این است که خرابش کنیم.

نه آن‌قدر که build fail شود.

بدتر.

طوری که build و test همچنان سبز باشند، اما پروژه دیگر با چیزی که درباره‌ی خودش نوشته سازگار نباشد.

آنجا می‌توانیم ببینیم Project Drift و Reconciliation وقتی از تعریف بیرون می‌آیند و وارد یک repository واقعی می‌شوند، چه شکلی پیدا می‌کنند.
