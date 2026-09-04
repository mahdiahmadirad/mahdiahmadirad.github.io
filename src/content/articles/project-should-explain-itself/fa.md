---
title: "پروژه باید بتواند خودش را توضیح دهد"
description: "مقاله‌ی دوم DaD؛ درباره‌ی رابطه‌ی قواعد، تصمیم‌ها، specification و taskها، و این‌که repository چطور می‌تواند دانش معتبر پروژه را برای انسان و Agent روشن کند."
lang: "fa"
translationKey: "project-should-explain-itself"
slug: "project-should-explain-itself"
publishedAt: 2026-09-04
topics:
  - software-architecture
featured: false
draft: false
sample: false
---

فرض کنیم یک Agent را وارد repository یک پروژه می‌کنیم و از او می‌خواهیم تغییری انجام دهد.

در ساده‌ترین حالت، Agent شروع می‌کند به خواندن کد. ساختار پروژه را بررسی می‌کند، فایل‌های مرتبط را پیدا می‌کند، dependencyها را می‌بیند و سعی می‌کند بفهمد برای انجام task باید چه چیزی را تغییر دهد.

این کار تا حدی جواب می‌دهد.

اما خیلی زود به همان مسئله‌ای می‌رسیم که در [مقاله‌ی قبل](/fa/articles/building-easier-than-understanding/) به آن اشاره کردم: همه‌ی حقیقت پروژه در کد نیست.

Agent ممکن است بفهمد یک interface وجود دارد، اما نداند چرا وجود دارد.

ممکن است یک abstraction را ببیند، اما نداند حذف کردنش خلاف یک تصمیم معماری است.

ممکن است دو document پیدا کند که درباره‌ی یک موضوع حرف متفاوتی می‌زنند، اما نداند کدام‌یک هنوز معتبر است.

و ممکن است taskی را درست اجرا کند که دیگر نباید اصلن اجرا می‌شده است.

برای همین سؤال اصلی برای من این نیست که:

**Agent چطور repository را بخواند؟**

سؤال دقیق‌تر این است:

**repository چطور باید خودش را برای Agent قابل فهم کند؟**

این تفاوت کوچک به نظر می‌رسد، اما بخش مهمی از ایده‌ی Document-Aware Development از همین‌جا می‌آید.

## خواندن کد کافی نیست

وقتی یک برنامه‌نویس باتجربه وارد پروژه‌ای قدیمی می‌شود، معمولاً فقط کد را نمی‌خواند.

با آدم‌ها حرف می‌زند.

از تاریخچه‌ی تصمیم‌ها می‌پرسد.

می‌فهمد کدام قسمت‌های سیستم قدیمی‌اند، کدام‌ها موقتی‌اند و به کدام بخش‌ها بهتر است دست نزند.

خیلی از این اطلاعات هیچ‌وقت به صورت رسمی ثبت نشده‌اند.

بخشی در ذهن اعضای تیم است.

بخشی در جلسه‌ای قدیمی مطرح شده.

بخشی داخل Slack یا Teams مانده.

بخشی در یک Pull Request توضیح داده شده و بعد فراموش شده است.

تا وقتی همان آدم‌ها در تیم هستند، این سیستم تا حدی کار می‌کند.

نه سیستم خوبی است، ولی کار می‌کند.

Agent چنین امتیازی ندارد.

Agent تازه وارد پروژه می‌شود و باید از چیزی که در اختیارش گذاشته‌ایم بفهمد جهان این پروژه چه قواعدی دارد.

اگر اطلاعات لازم ثبت نشده باشند، مدل مجبور است آن‌ها را از روی نشانه‌های موجود استنتاج کند.

و استنتاج با دانستن فرق دارد.

## پروژه به یک نقشه نیاز دارد

در DaD تلاش کرده‌ام repository فقط جایی برای نگهداری artifactها نباشد.

باید بتواند به یک Agent پاسخ چند سؤال پایه را بدهد:

- این پروژه برای چه ساخته شده است؟
- قواعد کار کردن در این repository چیست؟
- تصمیم‌های معماری معتبر فعلی کدام‌اند؟
- specification فعال هر بخش کدام است؟
- چه چیزی superseded شده و دیگر نباید مبنای تصمیم باشد؟
- task فعلی به کدام تصمیم و specification وابسته است؟
- اگر تغییری ایجاد شود، چه بخش‌های دیگری ممکن است تحت تأثیر قرار بگیرند؟

این یعنی پروژه باید فقط اطلاعات داشته باشد، نه.

باید **ساختار اطلاعات** هم داشته باشد.

اگر همه‌چیز را در صد فایل Markdown بریزیم ولی Agent نداند از کجا شروع کند، فقط شکل پیچیده‌تری از همان آشفتگی قبلی ساخته‌ایم.

## اولین نقطه‌ی ورود: Governance

وقتی Agent وارد repository می‌شود، قبل از این‌که سراغ implementation برود باید بفهمد قواعد این محیط چیست.

در DaD این نقش معمولاً با فایل‌هایی مثل `AGENTS.md` و مستندات Governance شروع می‌شود.

من `AGENTS.md` را چیزی شبیه README برای Agent نمی‌بینم.

وظیفه‌اش این نیست که پروژه را معرفی کند.

وظیفه‌اش این است که به Agent بگوید:

**برای کار کردن در این repository چه قواعدی داری؟**

مثلن:

- قبل از تغییر implementation چه مستنداتی باید خوانده شوند؟
- source of truth کجاست؟
- آیا Agent اجازه دارد specification را تغییر دهد؟
- چه نوع تغییری نیاز به ADR دارد؟
- وضعیت documentها چطور مشخص می‌شود؟
- قبل از پایان task چه validationهایی باید اجرا شوند؟
- در صورت تناقض بین دو منبع، کدام authority بالاتر است؟

یعنی Agent از همان ابتدا فقط یک task دریافت نمی‌کند.

یک محیط governed یا حکمرانی‌شده هم دریافت می‌کند.

این تفاوت برای من مهم است.

## تصمیم‌ها باید از Implementation جدا باشند

یکی از چیزهایی که در پروژه‌های نرم‌افزاری راحت گم می‌شود، reasoning پشت تصمیم‌هاست.

فرض کنیم سیستم و پروژه‌ای طراحی کرده‌ایم که در آن قرار است با یک AI Provider در ارتباط باشد تا داده‌هایی را تحلیل کند و تصمیم‌گرفته‌ایم سیستم طوری باشد که به یک AI provider خاص وابسته نباشد.

در implementation ممکن است این تصمیم خودش را در قالب یک interface و چند adapter نشان دهد.

اما interface خود تصمیم نیست.

تصمیم چیزی شبیه این است:

> سیستم باید provider-agnostic باقی بماند چون امکان تغییر provider یک requirement معماری است.

این اطلاعات باید جایی مستقل از implementation ثبت شود.

در DaD این نقش معمولاً با ADR یا Architecture Decision Record انجام می‌شود.

ADR قرار نیست توضیح دهد کد چطور نوشته شده.

قرار است بگوید:

- چه مسئله‌ای وجود داشته؟
- چه تصمیمی گرفته شده؟
- چرا این تصمیم انتخاب شده؟
- چه گزینه‌هایی کنار گذاشته شده‌اند؟
- پیامدهای تصمیم چیست؟

این تفکیک مفاهیم بسیار مهم است.

implementation می‌تواند تغییر کند، ولی reasoning ممکن است هنوز معتبر بماند.

یا برعکس، reasoning ممکن است تغییر کند و implementation هنوز از تصمیم قدیمی پیروی کند.

اگر این دو را از هم جدا نکنیم، تشخیص این وضعیت‌ها خیلی سخت می‌شود.

## Specification دقیق‌تر می‌کند که چه چیزی باید ساخته شود

ADR به ما می‌گوید چرا یک تصمیم گرفته شده است.

Specification می‌گوید نتیجه‌ی مورد انتظار آن تصمیم در سیستم چیست.

برای مثال ADR می‌گوید:

> وابستگی به AI provider باید abstract باشد.

Specification ممکن است دقیق‌تر کند:

- سیستم باید یک `IAIProvider` داشته باشد.
- implementation اصلی نباید مستقیماً SDK یک vendor را صدا بزند.
- provider باید از configuration انتخاب شود.
- قابلیت failover فعلاً خارج از scope است.

این تفاوت شاید در ابتدا بیش از حد رسمی به نظر برسد.

اما برای Agent بسیار مهم است.

Agent نباید مجبور باشد از روی یک تصمیم معماری کلی، جزئیات مورد انتظار implementation را حدس بزند.

هرچه فاصله‌ی بین خواست (intent) و پیاده‌سازی (implementation) مبهم‌تر باشد، فضای تفسیر (interpretation) برای Agent بزرگ‌تر می‌شود.

و Agentها معمولاً با فضای تفسیر زیاد، رفتارهای جالبی نشان می‌دهند. جالب، نه لزومن مفید.

## Task فقط یک دستور نیست

بعد به Task می‌رسیم.

در بسیاری از workflowهای AI-assisted development، task تقریباً همان prompt است:

> این feature را اضافه کن.

یا:

> این bug را رفع کن.

در DaD ترجیح می‌دهم task بخشی از زنجیره‌ی knowledge باشد.

یعنی task باید مشخص کند:

- براساس کدام specification ایجاد شده است؟
- چه deliverableای دارد؟
- چه چیزهایی خارج از scope هستند؟
- completion criteria چیست؟
- چه validationهایی باید انجام شوند؟

در نتیجه Agent فقط نمی‌داند چه کاری انجام دهد.

می‌داند **این کار از کجا آمده است**.

این مرزبندی اهمیت زیادی دارد.

اگر بعداً specification تغییر کند، می‌توان فهمید کدام taskها ممکن است دیگر معتبر نباشند.

## وضعیت اسناد مهم‌تر از تعداد آن‌هاست

یکی از بدترین حالت‌ها این است که documentation زیاد داشته باشیم ولی معلوم نباشد کدام document هنوز معتبر است.

فرض کنیم Agent دو specification پیدا می‌کند:

`SPEC-0004`

و

`SPEC-0011`

هر دو درباره‌ی authentication هستند.

یکی می‌گوید JWT استفاده شود.

دیگری می‌گوید session-based authentication.

Agent باید چه کند؟

اگر مجبور شود از تاریخ Git، تاریخ فایل یا محتوا حدس بزند، ساختار documentation شکست خورده است.

در DaD یک document باید lifecycle مشخص داشته باشد.

مثلاً:

- Draft - پیش‌نویس و تایید نشده
- Active - فعال و تایید شده برای پیاده‌سازی
- Superseded - جایگزین شده با یک Task جدید‌تر
- Deprecated - منسوخ شده و دیگر نامعتبر است

و اگر documentی superseded شده است، بهتر است مشخص باشد **چه چیزی جایگزینش کرده است**.

این یعنی knowledge پروژه فقط مجموعه‌ای از نوشته‌ها نیست.

یک graph دارد.

و این graph باید تا جای ممکن قابل دنبال کردن باشد.

## وقتی پروژه با خودش تناقض دارد

اینجا مسئله‌ی Project Drift دوباره وارد می‌شود.

فرض کنیم یک ADR داریم:

<blockquote lang="en" dir="ltr">
  <p><strong>ADR-0003</strong><br />AI provider must remain replaceable.</p>
</blockquote>

بعد specificationای داریم که نوشته:

<blockquote lang="en" dir="ltr">
  <p><strong>SPEC-0007</strong><br />Use OpenAI SDK directly for all AI operations.</p>
</blockquote>

و task هم براساس آن ساخته شده:

<blockquote lang="en" dir="ltr">
  <p><strong>TASK-0012</strong><br />Integrate OpenAI SDK into application services.</p>
</blockquote>

Agent task را اجرا می‌کند.

کد هم کاملاً درست کار می‌کند.

اما پروژه دیگر با خودش سازگار نیست.

در این حالت مشکل در syntax یا test نیست.

مشکل در رابطه‌ی بین artifactهاست.

ADR می‌گوید provider باید قابل تعویض باشد.

Specification خلاف آن را الزام کرده.

Task هم همان specification را اجرا کرده.

Implementation در واقع فقط آخرین حلقه‌ی یک زنجیره‌ی اشتباه است.

این همان دلیلی است که برای من traceability مهم می‌شود.

اگر بتوانیم رابطه را ببینیم:

<figure class="content-diagram" aria-label="زنجیره‌ی تصمیم، specification، task و کد">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">ADR</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">SPEC</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">TASK</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">CODE</span></li>
  </ol>
</figure>

در زمان تغییر، راحت‌تر می‌توانیم بپرسیم:

کدام بخش زنجیره از حقیقت فعلی پروژه فاصله گرفته است؟

## Agent باید قبل از اجرا، موقعیت خودش را بفهمد

در یک workflow ایده‌آل DaD، Agent مستقیم از task به code نمی‌رود.

مسیر چیزی شبیه این است:

<figure class="content-diagram content-diagram--long" aria-label="مسیر ورود Agent تا تطبیق مستندات و کد">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Agent enters repository</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reads governance</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Finds canonical documentation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reads relevant decisions</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reads active specification</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Validates task context</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Changes implementation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Runs validation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reconciles documentation and code</span></li>
  </ol>
</figure>

این flow ممکن است در پروژه‌های مختلف شکل متفاوتی داشته باشد.

من هم ادعا نمی‌کنم این تنها ترتیب درست است.

اما اصل ماجرا برایم مهم است:

**Agent قبل از تغییر دادن پروژه باید جایگاه آن تغییر را در مدل دانش پروژه بفهمد.**

این همان چیزی است که یک prompt ساده معمولاً در اختیارش نمی‌گذارد.

## Canonical Source

یکی از مفاهیمی که در DaD زیاد استفاده می‌کنم، canonical source یا منبع رسمی و پذیرفته‌شده است.

معنایش ساده است.

برای هر نوع حقیقت مهم پروژه باید مشخص باشد کجا باید دنبال نسخه‌ی معتبر آن بگردیم.

اگر معماری در ADRها تعریف می‌شود، README نباید نسخه‌ی دیگری از همان تصمیم را به‌عنوان حقیقت مستقل نگه دارد.

اگر رفتار در specification تعریف شده، task نباید نیازمندی جدیدی اختراع کند.

اگر task فقط واحد اجرایی یا execution unit است، نباید تصمیم معماری جدیدی را بی‌سروصدا داخل خودش وارد کند.

این به معنای حذف duplication کامل نیست.

گاهی لازم است یک مفهوم در چند جا اشاره شود.

اما باید مشخص باشد authority کجاست.

در غیر این صورت هر duplicate بالقوه یک منبع Drift است.

## Reconciliation فقط مرحله‌ی آخر نیست

در مقاله‌ی قبل Reconciliation یا «تطبیق» را به عنوان تلاش برای هم‌راستا کردن documentation و implementation معرفی کردم.

اما در عمل بهتر است آن را فقط مرحله‌ی پایانی کار نبینیم.

Reconciliation می‌تواند قبل، وسط و بعد از implementation اتفاق بیفتد.

قبل از کار:

Agent ممکن است بفهمد task با specification سازگار نیست.

در حین کار:

ممکن است implementation نشان دهد specification ناقص یا غیرواقعی است.

بعد از کار:

ممکن است implementation درست باشد ولی documentation هنوز state قبلی را توصیف کند.

در هر سه حالت، هدف یکی است:

بفهمیم آیا تصویری که documentation از پروژه ارائه می‌دهد با چیزی که واقعاً در پروژه وجود دارد سازگار است یا نه.

و اگر نیست، به جای پنهان کردن اختلاف، آن را explicit کنیم.

## Documentation نباید مقدس باشد

اینجا یک خطر مهم وجود دارد.

اگر بگوییم مستندات ما source of truth است، ممکن است ناخودآگاه به این نتیجه برسیم که پیاده‌سازی همیشه باید با مستندات تطبیق داده شود.

من این‌طور نمی‌بینم.

Document هم می‌تواند اشتباه باشد.

Specification ممکن است ناقص باشد.

ADR ممکن است براساس فرضی نوشته شده باشد که حالا دیگر درست نیست.

گاهی implementation است که یک واقعیت تازه را آشکار می‌کند.

برای همین رابطه باید دوطرفه باشد.

<figure class="content-diagram content-diagram--reciprocal" aria-label="رابطه‌ی دوطرفه‌ی مستندات و پیاده‌سازی">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Documentation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">↔</span><span class="content-diagram__label">Implementation</span></li>
  </ol>
</figure>

نه:

<figure class="content-diagram" aria-label="رابطه‌ی یک‌طرفه‌ی مستندات به پیاده‌سازی؛ مدل ناکافی">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Documentation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
  </ol>
</figure>

در DaD، document قرار نیست قانون مقدسی باشد که هیچ‌وقت تغییر نمی‌کند.

قرار است state قابل بررسی پروژه باشد.

اگر تغییر کرد، باید تغییرش روشن، قابل ردیابی و آگاهانه باشد.

## Agent نباید حدس بزند کدام حقیقت معتبر است

به نظرم یکی از معیارهای خوب برای ارزیابی ساختار documentation همین است:

اگر Agent برای فهمیدن وضعیت پروژه مجبور است زیاد حدس بزند، ساختار ما هنوز کافی نیست.

نه به این معنی که همه‌چیز باید نوشته شود.

این خودش می‌تواند پروژه را زیر وزن documentها دفن کند.

هدف این نیست که تمام دانش ممکن را ذخیره کنیم.

هدف این است که **دانشی را ثبت کنیم که نبودنش تصمیم‌های بعدی را تغییر می‌دهد**.

مثلن:

چرا این abstraction وجود دارد؟

چه constraintی نباید شکسته شود؟

کدام تصمیم هنوز active است؟

چه چیزی عمداً خارج از scope است؟

اگر این اطلاعات حذف شوند و Agent بتواند بدون آن‌ها به نتیجه‌ی متفاوتی برسد، احتمالاً ارزش ثبت شدن دارند.

## ساختار Documentation در DaD برای انسان هم هست

اگرچه من DaD را در مواجهه با Agentها جدی‌تر دنبال کردم، این ساختار فقط برای ماشین ساخته نشده است.

یک توسعه‌دهنده‌ی تازه‌وارد هم همان سؤال‌ها را دارد.

چرا این تصمیم گرفته شده؟

کدام specification معتبر است؟

این task چرا وجود دارد؟

چه چیزی را نباید تغییر دهم؟

تفاوت این است که انسان‌ها معمولاً می‌توانند بخشی از این knowledge را از دیگران بپرسند.

Agent عمدتاً به چیزی محدود است که repository به او می‌گوید.

به همین دلیل Agentها شاید فقط یک ضعف قدیمی را واضح‌تر کرده‌اند:

بسیاری از پروژه‌ها در واقع نمی‌توانند خودشان را توضیح دهند.

آدم‌هایی وجود دارند که پروژه را توضیح می‌دهند.

وقتی آن آدم‌ها بروند، بخشی از پروژه هم با آن‌ها می‌رود.

## پروژه به‌عنوان یک سیستم دانش

اگر بخواهم DaD را در این بخش خلاصه کنم، repository را دیگر فقط codebase نمی‌بینم.

بیشتر شبیه یک سیستم دانش است که implementation یکی از اجزای آن است.

چیزی شبیه:

<figure class="content-diagram content-diagram--long" aria-label="از قواعد پروژه تا پیاده‌سازی">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Governance</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Decisions</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Specifications</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Tasks</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
  </ol>
</figure>

اما این رابطه فقط رو به پایین نیست.

از implementation هم باید بتوانیم دوباره به بالا برگردیم.

یک تغییر در code ممکن است specification را به چالش بکشد.

تغییر specification ممکن است decision جدیدی لازم داشته باشد.

decision جدید ممکن است taskهای قدیمی را نامعتبر کند.

یعنی پروژه بیشتر شبیه یک graph است تا مجموعه‌ای از documentهای مرتب در چند folder.

این همان چیزی است که در DaD می‌خواهم Agent بتواند در آن حرکت کند.

نه فقط فایل پیدا کند. بلکه رابطه‌ها را بفهمد.

## و هنوز مشکل باقی است

ساختار دادن به دانش پروژه، همه‌چیز را حل نمی‌کند. همچنان Agent ممکن است document را اشتباه تفسیر کند.

ممکن است dependency مهمی را نبیند.

ممکن است reconciliation ناقص انجام دهد.

ممکن است خود documentation قدیمی باشد.

DaD این مشکلات را حذف نمی‌کند.

فقط تلاش می‌کند چیزی را که قبلن ضمنی و پراکنده بوده، تا حدی explicit و قابل بررسی کند.

برای من تفاوت اصلی همین است.

اگر Agent اشتباه کند ولی بتوانیم بفهمیم بر اساس کدام تصمیم، specification و task به آن نتیجه رسیده، خطا قابل تحلیل‌تر است.

اما اگر فقط prompt و code داشته باشیم، بخش مهمی از reasoning بین این دو ناپدید شده است.

و شاید همین برای شروع کافی باشد:

پروژه لازم نیست همه‌چیز را بداند.

اما باید بتواند مهم‌ترین چیزهایی را که درباره‌ی خودش می‌داند، توضیح دهد.
