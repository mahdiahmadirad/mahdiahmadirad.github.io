---
title: "وقتی ساختن آسان‌تر از فهمیدن می‌شود"
description: "وقتی Agentها سریع‌تر کد می‌نویسند، فهم مشترک از پروژه چه می‌شود؟ تأملی درباره‌ی حافظه، تصمیم‌ها و Document-Aware Development."
lang: "fa"
translationKey: "building-easier-than-understanding"
slug: "building-easier-than-understanding"
publishedAt: 2026-09-04
topics:
  - software-architecture
featured: false
draft: false
sample: false
---

در سال‌های گذشته، بخش قابل‌توجهی از زمان من در پروژه‌های نرم‌افزاری صرف خودِ ساختن می‌شد. باید مسئله را می‌فهمیدیم، طراحی می‌کردیم، کد می‌زدیم، تست می‌کردیم و دوباره برمی‌گشتیم سراغ چیزی که درست کار نکرده بود. سرعت توسعه محدودیت طبیعی خودش را داشت.

ورود ابزارهای مبتنی بر هوش مصنوعی، و بعدتر Agentهایی که می‌توانند مستقیم وارد یک repository شوند، چند فایل را بخوانند، تغییر ایجاد کنند، تست بنویسند و حتا بخشی از مسیر حل مسئله را خودشان پیش ببرند، این محدودیت را تا حدی جابه‌جا کرده است.

امروز می‌شود در چند ساعت کاری انجام داد که قبلن با سردرد زیاد چند روز زمان می‌برد.

در نگاه اول، این واقعن خبر خوبی است.

اما من به مرور متوجه شدم مسئله‌ی دیگری دارد از جای دیگری بیرون می‌زند: وقتی ساختن این‌قدر سریع می‌شود، آیا فهم ما از چیزی که ساخته‌ایم هم با همان سرعت جلو می‌رود؟

## چیزی که در کد نیست

فرض کنیم قرار است یک Agent، تغییر نسبتاً ساده‌ای در یک پروژه انجام دهد.

repository را در اختیارش می‌گذاریم. Agent ساختار پروژه را بررسی می‌کند، کدهای مرتبط را پیدا می‌کند و feature را پیاده‌سازی می‌کند. شاید testها را هم اجرا کند و نتیجه کاملاً قابل قبول باشد.

چند هفته بعد قرار است تغییر دیگری در همان قسمت انجام شود.

Agent جدید کد قبلی را می‌بیند. interfaceها را می‌بیند. testها را می‌بیند. شاید Git history را هم بتواند بخواند.

اما چیزهایی وجود دارند که لزومن در هیچ‌کدام از این‌ها قابل مشاهده نیستند:

چرا این abstraction ایجاد شده است؟

آیا قرار بوده implementation فعلی موقتی باشد؟

آیا قبلاً گزینه‌ی دیگری بررسی شده و به دلیل مشخصی کنار گذاشته شده است؟

این محدودیت مربوط به معماری سیستم است یا صرفاً نتیجه‌ی یک تصمیم اجرایی در آن مقطع؟

اگر این بخش را تغییر دهیم، چه فرض دیگری در قسمت دیگری از سیستم دیگر معتبر نخواهد بود؟

بخشی از پاسخ این سؤال‌ها ممکن است در کد قابل حدس زدن باشد. اما حدس زدن با دانستن فرق دارد.



کد معمولاً به ما می‌گوید سیستم **الان چه کار می‌کند**. خیلی کمتر به ما می‌گوید **چرا به این شکل درآمده است**.

و هنوز مهم است و به نظرم برای ما مهم خواهد ماند که **چرا به این شکل در آمده** است.

این مسئله البته تازه نیست. برنامه‌نویس‌ها هم سال‌هاست با آن درگیرند. کافی است شش ماه بعد به کدی که خودمان نوشته‌ایم برگردیم تا بفهمیم حافظه‌ی انسان هم آن‌قدرها که تبلیغش را می‌کنند قابل اعتماد نیست.

حضور Agentها این مسئله را برای من پررنگ‌تر کردند.

## Context با حافظه‌ی پروژه یکی نیست

یکی از پاسخ‌های رایج به این مشکل، بزرگ‌تر شدن Context Window مدل‌هاست.

اگر مدل بتواند کل repository را ببیند، احتمالاً بهتر می‌تواند پروژه را بفهمد.

این حرف تا حدی درست است، اما به نظرم دو مسئله را با هم مخلوط می‌کند.

این‌که یک Agent بتواند اطلاعات زیادی را **ببیند**، به این معنی نیست که آن اطلاعات اصلن در پروژه **وجود دارند**.

فرض کنیم در یک جلسه تصمیم گرفته‌ایم که وابستگی مستقیم به یک سرویس خارجی را حذف کنیم و آن را پشت یک abstraction قرار دهیم، چون می‌خواهیم در آینده بتوانیم provider را عوض کنیم.

implementation فعلی ممکن است این تصمیم را نشان دهد. یک interface وجود دارد و یک adapter پشت آن قرار گرفته است.

اما آیا Agent می‌تواند فقط از روی این ساختار بفهمد که امکان تعویض provider یک constraint معماری پروژه است؟

شاید.

شاید هم برداشت کند که این abstraction اضافه است و برای ساده‌تر کردن کد آن را حذف کند.

Context Window این مشکل را حل نمی‌کند، چون مسئله این نیست که مدل آن اطلاعات را ندیده است. مسئله این است که reasoning پشت تصمیم جایی ثبت نشده که بتواند آن را ببیند.

اینجا برای من سه مفهوم از هم جدا می‌شوند:

**Context** چیزی است که Agent در این لحظه در اختیار دارد.

**Memory** چیزی است که از تعامل‌ها و کارهای قبلی باقی مانده است.

اما **Project Knowledge** چیز دیگری است: مجموعه‌ی تصمیم‌ها، محدودیت‌ها، فرض‌ها و تعریف‌هایی که مشخص می‌کنند این پروژه قرار است چه باشد.

این دانش نمی‌تواند فقط در ذهن آدم‌ها، chat history یا promptهای پراکنده باقی بماند.

## پروژه‌ها آرام‌آرام از خودشان فاصله می‌گیرند

فرض کنیم در ابتدای پروژه یک تصمیم معماری گرفته‌ایم.

بعد specification براساس آن نوشته شده است.

چند task از specification استخراج شده‌اند و implementation شکل گرفته است.

در حالت ایده‌آل رابطه چیزی شبیه این است:

<figure class="content-diagram content-diagram--long" aria-label="از نیت تا آزمون">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Intent</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Decision</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Specification</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Task</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Test</span></li>
  </ol>
</figure>

اما پروژه‌های واقعی به این تمیزی نیستند.

در میانه‌ی کار implementation نشان می‌دهد یکی از فرض‌های specification اشتباه بوده است. تصمیم معماری تغییر می‌کند. task جدیدی اضافه می‌شود. بخشی از document قدیمی می‌شود ولی هنوز همان‌جا باقی می‌ماند.

بعد از مدتی ممکن است چیزی شبیه این داشته باشیم:

- کدی که براساس تصمیم جدید نوشته شده است
- specificationای که هنوز تصمیم قدیمی را توصیف می‌کند
- taskی که نصف آن دیگر موضوعیت ندارد
- یک conversation که دلیل تغییر در آن توضیح داده شده
- READMEای که مدت‌هاست به‌روز نشده است

هیچ‌کدام به تنهایی الزاماً غلط نیستند.

اما مجموعه‌ی آن‌ها دیگر یک تصویر منسجم از پروژه نمی‌دهد.

من این وضعیت را نوعی **Project Drift** می‌بینم: فاصله‌ای که به‌تدریج بین چیزی که پروژه قرار بوده باشد، چیزی که درباره‌اش نوشته‌ایم و چیزی که واقعاً ساخته‌ایم شکل می‌گیرد.

باز هم این مسئله را AI به وجود نیاورده است.

فقط سرعتش را بیشتر کرده است.

وقتی یک تیم انسانی در یک هفته چند تغییر قابل توجه ایجاد می‌کند، فرصت داریم بخشی از این فاصله را در code review، جلسات فنی یا حتا گفتگوهای روزمره جبران کنیم.

اما وقتی Agentها می‌توانند در همان زمان چند برابر آن تغییر ایجاد کنند، سرعت تولید implementation ممکن است از سرعتی که تیم می‌تواند تغییرات را بفهمد و در مدل ذهنی مشترکش جذب کند جلو بزند.

به بیان دیگر، شاید گلوگاه جدید توسعه‌ی نرم‌افزار دیگر فقط **تولید کد** نباشد.

ممکن است **حفظ انسجام پروژه** باشد.

## آیا Repository فقط محل نگهداری کد است؟

این سؤال من را به نقطه‌ی دیگری رساند.

ما معمولاً repository را تقریباً معادل codebase در نظر می‌گیریم.

کد، testها، configurationها و تعدادی document در کنارشان قرار دارند.

اما اگر قرار باشد Agent واقعاً بخشی از فرایند توسعه باشد، شاید repository باید نقش متفاوتی پیدا کند.

Agent برای کار کردن فقط به source code نیاز ندارد.

باید بتواند بفهمد:

- تصمیم‌های معتبر فعلی چیست؟
- چه تصمیم‌هایی قبلاً گرفته شده و بعداً کنار گذاشته شده‌اند؟
- specification فعال کدام است؟
- چه محدودیت‌هایی نباید شکسته شوند؟
- یک task به کدام نیاز یا تصمیم وابسته است؟
- تغییر فعلی چه documentهای دیگری را احتمالاً نامعتبر می‌کند؟

در چنین مدلی، documentation دیگر چیزی نیست که بعد از تمام شدن کار برای آدم‌های آینده بنویسیم.

خودش بخشی از state پروژه است.

این نقطه‌ای بود که من شروع کردم به فکر کردن درباره‌ی چیزی که بعداً اسمش را **Document-Aware Development** یا به اختصار **DaD** گذاشتم.

## Document-Aware Development

DaD را نمی‌خواهم یک روش جدید برای «بیشتر مستند نوشتن» تعریف کنم.

اگر نتیجه‌ی استفاده از آن فقط تعداد بیشتری فایل Markdown باشد، به نظرم شکست خورده است.

ایده برای من از جای دیگری می‌آید:

تصمیم‌ها، specificationها، taskها و implementation نباید مجموعه‌ای از artifactهای مستقل باشند. آن‌ها بخش‌های مختلف یک سیستم‌اند و باید بتوان رابطه‌ی بینشان را دنبال کرد.

برای مثال، اگر یک تصمیم معماری تغییر کند، سؤال فقط این نیست که چه کدی باید عوض شود.

باید بپرسیم:

کدام specification تحت تأثیر قرار می‌گیرد؟

چه taskهایی براساس تصمیم قبلی ساخته شده‌اند؟

آیا document دیگری هنوز تصمیم قدیمی را به عنوان حقیقت پروژه معرفی می‌کند؟

و در جهت عکس هم همین مسئله وجود دارد.

اگر در implementation مجبور شدیم از specification فاصله بگیریم، این فاصله نباید فقط در کد باقی بماند. باید مشخص شود که آیا implementation اشتباه است یا specification دیگر معتبر نیست.

من به این فرایند **Reconciliation** می‌گویم: تلاش برای دوباره هم‌راستا کردن آنچه درباره‌ی پروژه می‌دانیم با آنچه واقعاً در آن وجود دارد.

در ساده‌ترین شکل:

<figure class="content-diagram" aria-label="از تغییر تا هم‌راستاسازی">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Change</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Impact Analysis</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reconciliation</span></li>
  </ol>
</figure>

این حلقه برای من مهم‌تر از خود مستندات است.

## پروژه هم باید چیزی برای گفتن داشته باشد

در استفاده‌ی معمول از Agentهای برنامه‌نویسی، رابطه تقریباً این شکلی است:

<figure class="content-diagram" aria-label="رابطه‌ی معمول انسان و Agent">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Human</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Prompt</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Agent</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Code</span></li>
  </ol>
</figure>

انسان به Agent می‌گوید چه کاری انجام دهد و Agent تا حدی که context در اختیارش باشد تلاش می‌کند آن را اجرا کند.

اما این مدل یک مشکل دارد.

Prompt آخرین کاربر می‌تواند ناخواسته با تصمیم‌های قبلی پروژه در تضاد باشد.

حتا خود من ممکن است شش ماه بعد چیزی بخواهم که با یکی از constraintهایی که قبلن تعیین کرده‌ام ناسازگار باشد و آن را به خاطر نیاورم.

برای همین در DaD مدلی که در ذهن دارم کمی متفاوت است:

<figure class="content-diagram" aria-label="رابطه با دانش پروژه">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Human</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Project Knowledge</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Agent</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
  </ol>
</figure>

Agent فقط از prompt دستور نمی‌گیرد.

خود پروژه هم باید بتواند محدودیت‌ها و قواعدش را به Agent تحمیل کند.

فایل‌هایی مثل `AGENTS.md`، ADRها، specificationها و taskها در این مدل صرفاً documentation نیستند. هرکدام بخشی از مکانیزمی هستند که Agent از طریق آن می‌تواند بفهمد قبل از ایجاد تغییر باید چه چیزهایی را در نظر بگیرد.

به همین دلیل هم مسئله فقط نوشتن document نیست.

باید مشخص باشد کدام document معتبر است.

اگر دو specification درباره‌ی یک موضوع حرف متفاوتی می‌زنند، Agent نباید مجبور شود حدس بزند.

یک تصمیم قدیمی باید بتواند وضعیت `Superseded` داشته باشد.

یک specification باید بتواند جایگزین specification قبلی شود.

و ideally بتوان از روی repository فهمید که source of truth فعلی کدام است.

## این مسئله چقدر جدید است؟

نه خیلی.

Architecture Decision Record مدت‌هاست وجود دارد.

Specification-driven development چیز تازه‌ای نیست.

Traceability هم سابقه‌ی طولانی دارد.

روش‌های مختلف software engineering سال‌هاست تلاش می‌کنند intent، requirement و implementation را به هم مرتبط نگه دارند.

بنابراین نمی‌گویم DaD مجموعه‌ای از ایده‌های کاملاً جدید است.

برداشت من این است که Agentic Development وزن این مسئله را تغییر داده است.

در گذشته documentation عمدتاً برای ارتباط بین انسان‌ها و حفظ دانش پروژه اهمیت داشت.

حالا یک مصرف‌کننده‌ی جدید هم وارد شده است: ماشین.

و این مصرف‌کننده ویژگی عجیبی دارد.

خیلی سریع است.

می‌تواند حجم زیادی از کد را بخواند و تغییر دهد.

اما هر بار باید دوباره بفهمد در چه جهانی قرار گرفته است.

شاید به همین دلیل چیزی که قبلاً یک ضعف قابل تحمل در فرایند توسعه بود، در پروژه‌های Agent-driven تبدیل به یک محدودیت جدی شود.

## DaD چه چیزی را حل نمی‌کند؟

من هنوز نمی‌دانم DaD شکل نهایی پاسخ به این مسئله است یا نه.

احتمالن نیست.

این یک framework در حال شکل‌گیری است که از تجربه‌ی من در کار با Agentها و پروژه‌هایی که بخش قابل توجهی از development در آن‌ها با کمک AI انجام شده بیرون آمده است.

DaD جلوی hallucination مدل را نمی‌گیرد.

تضمین نمی‌کند Agent تصمیم درستی بگیرد.

جای معماری خوب یا code review را نمی‌گیرد.

و مهم‌تر از همه، اگر documentهای پروژه اشتباه باشند، تبدیل کردنشان به source of truth فقط باعث می‌شود اشتباه را با انضباط بیشتری تکرار کنیم.

به همین دلیل reconciliation بخش مهمی از ایده است.

Documentation نباید فقط implementation را کنترل کند.

Implementation هم باید بتواند documentation را به چالش بکشد.

رابطه باید دوطرفه باشد.

## شاید مسئله‌ی اصلی دیگر نوشتن کد نباشد

برای مدت طولانی بخش بزرگی از ابزارهای software engineering حول این سؤال ساخته شده‌اند:

**چطور سریع‌تر و بهتر کد بنویسیم؟**

Compiler بهتر، IDE بهتر، framework بهتر، library بهتر و حالا AI بهتر.

ولی اگر روند فعلی ادامه پیدا کند، ممکن است به نقطه‌ای برسیم که نوشتن کد بخش آسان مسئله باشد.

Agent می‌تواند implementation تولید کند.

Agent دیگری می‌تواند test بنویسد.

Agent سوم می‌تواند refactor کند.

و آن وقت سؤال مهم‌تر شاید این باشد:

**چه کسی مطمئن می‌شود همه‌ی این تغییرها هنوز متعلق به یک پروژه‌اند؟**

شاید repository آینده فقط مجموعه‌ای از این‌ها نباشد:

<figure class="content-diagram content-diagram--composition" aria-label="محتوای معمول repository">
  <ul class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Source Code</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Tests</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Configuration</span></li>
  </ul>
</figure>

بلکه چیزی شبیه این باشد:

<figure class="content-diagram content-diagram--composition" aria-label="ترکیب دانش و کد پروژه">
  <ul class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Code</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Intent</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Decisions</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Specifications</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Constraints</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">History</span></li>
  </ul>
</figure>

یعنی نه فقط چیزی که نرم‌افزار را برای ماشین قابل اجرا می‌کند، بلکه چیزی که پروژه را برای انسان و Agent قابل فهم نگه می‌دارد.

Document-Aware Development تلاشی است که من برای فکر کردن به همین مسئله شروع کرده‌ام.

نه به این دلیل که فکر می‌کنم documentation جواب همه چیز است.

بلکه به این دلیل که هرچه ساختن آسان‌تر می‌شود، به نظرم **فهمیدن چیزی که ساخته‌ایم دارد به بخش سخت‌تر ماجرا تبدیل می‌شود.**

