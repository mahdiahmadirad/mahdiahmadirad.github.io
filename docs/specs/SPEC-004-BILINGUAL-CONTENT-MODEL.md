# SPEC-004 — Bilingual Content Model

| Field | Value |
|---|---|
| ID | `SPEC-004` |
| Status | `approved` |
| Owner | Mehdi Ahmadirad |
| Governing ADRs | `ADR-001`, `ADR-003`, `ADR-006`, `ADR-009` |
| Implemented by | `TASK-0101`, `TASK-0301`, `TASK-0401`, `TASK-0402`, `TASK-0403` |
| Last updated | 2026-08-30 |

## 1. The principle of the model

Each language version is an independent publication with its own URL, metadata and release lifecycle. Persian is not a subordinate translation of English, nor vice versa. The versions are related through `translationKey`.

## 2. URL

```text
/fa/articles/document-aware-development/
/en/articles/document-aware-development/

/fa/topics/software-architecture/
/en/topics/software-architecture/

/fa/projects/
/en/projects/
```

Rules:

- Both languages have prefixes.
- The article slug is preferably ASCII, stable and identical in both languages.
- Changing the title does not change the URL.
- The trailing-slash policy is consistent across the site; recommended value: `always`.
- A slug change must have an explicit redirect.
- Query parameters are prohibited for locale selection.

## 3. Content structure

```text
src/content/
├── articles/
│   └── document-aware-development/
│       ├── fa.md
│       ├── en.md
│       └── assets/
├── topics/
│   └── software-architecture/
│       ├── fa.md
│       └── en.md
├── projects/
│   └── dad/
│       ├── fa.md
│       └── en.md
└── pages/
    ├── about/
    │   ├── fa.md
    │   └── en.md
    └── historical-creature/
        ├── fa.md
        └── assets/
```

Language versions of an article are placed together in a conceptual folder, but are still independent publications with their own metadata and publication cycle. The specific asset of the article is also preferably placed in the same folder or public path of the same name.

In new versions of Astro, collections are defined with `src/content.config.ts` and loader/schema. Agent must implement the API of the pinned version from the official documentation of the same version.

## 4. Article Schema

```ts
type Locale = 'fa' | 'en';

interface ArticleFrontmatter {
  title: string;
  description: string;
  lang: Locale;
  translationKey: string;
  slug: string;
  publishedAt: Date;
  updatedAt?: Date;
  topics: string[];
  featured?: boolean;
  draft?: boolean;
  cover?: {
    src: string;
    alt: string;
    caption?: string;
  };
  canonicalOverride?: string;
  readingTimeOverride?: number;
}
```

Validation:

- `title`: approximately 8–120 characters
- `description`: approximately 40–180 characters, written as a natural snippet
- `translationKey`: lowercase kebab-case and shared between translations
- `slug`: lowercase ASCII kebab-case
- `topics`: At least 1, no repetition
- `publishedAt`: Mandatory
- `updatedAt >= publishedAt`
- `draft`: Default `false`
- If there is a cover, `alt` is required; Allow `alt: ""` for decorative image intentionally.

## 5. Persian example

```yaml
---
title: "توسعه‌ی آگاه از مستندات"
description: "چارچوبی عملی برای هم‌راستا نگه‌داشتن توسعه با کمک هوش مصنوعی، معماری و مستندات."
lang: "fa"
translationKey: "document-aware-development"
slug: "document-aware-development"
publishedAt: 2026-08-10
updatedAt: 2026-08-15
topics:
  - software-architecture
  - ai-assisted-development
featured: true
draft: false
cover:
  src: "/images/articles/document-aware-development/cover.svg"
  alt: "نمای انتزاعی ارتباط میان تصمیم معماری، مشخصات، وظیفه و کد"
---
```

## 6. English example

```yaml
---
title: "Document-Aware Development"
description: "A practical framework for keeping AI-assisted development aligned with architecture and documentation."
lang: "en"
translationKey: "document-aware-development"
slug: "document-aware-development"
publishedAt: 2026-08-10
updatedAt: 2026-08-15
topics:
  - software-architecture
  - ai-assisted-development
featured: true
draft: false
cover:
  src: "/images/articles/document-aware-development/cover.svg"
  alt: "An abstract relationship between architecture decisions, specifications, tasks, and code"
---
```

## 7. Translation States

| State | Behavior |
|---|---|
| Both versions published | switch to the corresponding URL |
| Only the active language is published | label “Translation not yet published”; an optional link to the other locale’s Home |
| Other version is a draft | Treat it as unavailable to the user |
| Different dates | Each version displays its own date |
| Non-literal titles | Allowed; preserve the relationship through `translationKey` |

Must not:

- Rewrite the content of another language in the URL of the active language.
- Create a blank page merely to preserve symmetry.
- Publish an automatic machine translation.
- Generate `hreflang` for non-existent version.

## 8. UI Dictionary

UI strings in typed files:

```text
src/i18n/ui.fa.ts
src/i18n/ui.en.ts
```

Example:

```ts
export const fa = {
  nav: {
    articles: 'مقاله‌ها',
    topics: 'موضوع‌ها',
    projects: 'پروژه‌ها',
    about: 'درباره‌ی من',
  },
  article: {
    readingTime: (minutes: string) => `${minutes} دقیقه مطالعه`,
    published: 'منتشرشده در',
    updated: 'آخرین ویرایش',
    toc: 'در این صفحه',
  },
} as const;
```

The hard-coded visible string in the component is prohibited, except for the brand name and the content of the article itself.

## 9. Numbers and date

- Display with `Intl.NumberFormat`.
- Persian: suggested locale `fa-IR-u-nu-arabext`.
- English: `en`.
- Persian date decided by Persian calendar and timezone; The stored ISO/Gregorian date remains.
- English date with `Intl.DateTimeFormat('en', ...)`.
- Manual digit conversion with a global replacement is prohibited; code and URLs must not change.

## 10. Reading Time

- Calculate it from the text of the same language version.
- Persian and English rates can be different and must be documented.
- code blocks should have a lower coefficient in the calculation or a transparent unit policy should be selected.
- The output is at least 1 minute.

## 11. Topic Schema

```yaml
---
name: "معماری نرم‌افزار"
lang: "fa"
translationKey: "software-architecture"
slug: "software-architecture"
description: "تصمیم‌ها، مرزها و نیروهایی که شکل سیستم را تعیین می‌کنند."
order: 10
---
```

The article references `topics` with a slug/translation key. build will fail if Topic is unknown.

## 12. Project Schema

```yaml
---
name: "DaD"
lang: "fa"
translationKey: "dad"
slug: "dad"
summary: "ابزارها و الگوهایی برای توسعه‌ی آگاه از مستندات."
status: "active"
order: 10
links:
  repository: "https://github.com/..."
technologies:
  - ".NET"
  - "AI-assisted development"
featured: true
---
```

## 13. SEO

Each page:

- `<html lang dir>`
- title and description localized
- canonical self-reference
- `hreflang="fa"` and `"en"` for existing versions only
- `hreflang="x-default"` to select/default page if defined
- Open Graph locale and alternate locale
- `Article` JSON-LD for article with author, datePublished, dateModified and inLanguage
- The sitemap contains each version as a separate URL

General pages use the same independent-edition rule. A missing page edition
does not emit a route or `hreflang`; its language control leads to the other
locale's corresponding landing page with an explicit unavailable state.

## 14. Editorial Rules

- Correct Persian half-spaces and punctuation.
- Persian quotation marks « » in Persian prose.
- The names of the technologies according to the official name and with `<bdi>` in complex text.
- Translations do not have to be equal paragraph-by-paragraph.
- Quote, source, alt text and caption should be independent and valid in any language.
- filename and frontmatter remain ASCII; prose UTF-8.
