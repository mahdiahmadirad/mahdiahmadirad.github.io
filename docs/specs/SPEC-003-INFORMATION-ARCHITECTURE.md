# SPEC-003 — Information Architecture

| Field | Value |
|---|---|
| ID | `SPEC-003` |
| Status | `approved` |
| Owner | Mehdi Ahmadirad |
| Governing ADRs | `ADR-001`, `ADR-003`, `ADR-009` |
| Implemented by | `TASK-0201`, `TASK-0301`, `TASK-0401`, `TASK-0402`, `TASK-0403`, `TASK-0404`, `TASK-0506`, `TASK-0507`, `TASK-0508` |
| Last updated | 2026-08-30 |

## 1. Sitemap

```text
/
├── fa/
│   ├── articles/
│   │   └── {slug}/
│   ├── topics/
│   │   └── {topic-slug}/
│   ├── projects/
│   ├── about/
│   │   └── historical-creature/
│   └── search/
├── en/
│   ├── articles/
│   │   └── {slug}/
│   ├── topics/
│   │   └── {topic-slug}/
│   ├── projects/
│   ├── about/
│   │   └── historical-creature/
│   └── search/
├── fa/rss.xml
├── en/rss.xml
├── sitemap-index.xml
└── 404.html
```

The root `/` is not a standalone content page; it redirects consistently to the default locale. Pending a final decision, `fa` is the recommended default, but both locales always retain prefixes so the URLs remain symmetric.

## 2. Global navigation

### English

`Articles · Topics · Projects · About`

### Persian

`مقاله‌ها · موضوع‌ها · پروژه‌ها · درباره‌ی من`

Lower-priority items such as Search, RSS and social links may live in the footer or as separate controls. Navigation must not exceed five items.

Language control should keep the user in the same concept:

- Article → Translation of the same article, if available
- Topic → Same Topic in another language
- General page → same page
- Missing translation → show a clear status and a link to the other locale’s landing page; creating a fake page or automatic translation is prohibited

## 3. Home

The reference layout comes from the Home view in [`assets/design-reference.png`](../../assets/design-reference.png). The Persian view is cropped and must be validated separately at full length.

### Order

1. Header
2. Intro/Hero
3. Featured Essay
4. Recent Writing
5. Topics + Projects + editorial quote/short note
6. Footer

### Hero

- Author's name in active language font
- Two or three line subtitle
- About link
- Software abstract SVG in place of reference image graphics
- No portrait photos, video backgrounds or sales CTAs

### Featured Essay

- Maximum of one article
- Title, deck, topic, reading time and date
- A content image or bespoke graphic; if no suitable asset exists, use an abstract software-native graphic.
- On mobile: text before image

### Recent Writing

- 4 to 8 articles
- Display sequence number, not data ID
- title, short description, topic, reading time, date
- Available language states (`FA`, `EN`) as links
- Order: Most recent release date, then stable tie-breaker

### Bottom Index

- Selected topics
- Selected Projects
- A short quote or note only if there is real and authorized content
- Fake quote or quote without source is prohibited

## 4. Article

The reference layout follows the image Article view: main content column + side rail on desktop, previous/next navigation and footer.

### Structure

1. Breadcrumb or Back to all articles
2. title
3. deck
4. metadata
5. translation switch
6. optional hero/cover
7. body
8. footnotes/references
9. previous/next
10. related articles

### Rail desktop

- Table of contents
- Share/copy link
- Related articles

On mobile:

- The TOC becomes the disclosure near the beginning of the article.
- Share and Related should come after the body.
- The DOM layout must support this logical flow.

### The text of the article

Support for:

- `h2–h4`
- paragraph, ordered/unordered list
- Blockquote and pull quote limited
- footnote
- figure + figcaption
- table responsive
- inline/block code
- Limited callouts: note, caution, example
- Approved MDX components

`h1` is just the title of the article. Headings should not override level for appearance.

## 5. Topics

### Topics index

- Short introduction
- Topics with localized name and number of articles
- simple list or open grid; No tag cloud
- Do not publish an empty topic.

### Topic detail

- Topic name and description in the same language
- A list of articles with the same component as the Home list
- Dedicated Topic RSS is optional in the next phase
- If the Topic has a different name in another language, `translationKey` will maintain the relationship.

## 6. Projects

The first version is a curated and limited index, not an automatic GitHub dump.

Each project:

- name
- role/status
- One or two sentence explanation
- Limited and meaningful technologies
- Repository/site link if public
- Image only if there is content

Manual arrangement with `order`. A project without an understandable explanation should not enter Home.

## 7. About

An About page completes a professional identity, but is not a complete resume.

Structure:

- Brief introduction of the first person
- Areas of focus
- engineering approach or beliefs
- Selected work/experience
- speaking/writing if any
- contact and valid links

Portrait photo is optional. The language of each copy should be written naturally, not a literal translation.

### Brand story

The story of the owner-selected historical creature is a subordinate About
page at `/{locale}/about/historical-creature/` when that locale has a genuinely
authored edition.

- The parent About page must provide the primary text link to the story.
- The story must not add a primary-navigation item or replace the author's
  About content.
- It uses page metadata and editorial reading typography, not Article dates,
  topics, RSS, related-writing or previous/next navigation.
- Missing editions must not generate placeholder routes. The page must disclose
  the missing translation and the language control must lead to the other
  locale's About landing page.
- Historical-object photographs are content figures with meaningful alt text,
  semantic captions, attribution and documented rights basis.

## 8. Search

- index and language-oriented UI
- Active language results, with title, excerpt, type and topic
- Persian UI strings are manual and high quality
- Clear empty and no-results states
- keyboard accessible
- Search in navigation should not be alone with an icon without a label.

## 9. 404

- A technical page may provide both languages.
- Short message, link to FA/EN Homes and Search
- No auto-translation or complex path guessing required.

## 10. Footer

- Dynamic copyright
- RSS for the active language
- GitHub and LinkedIn after providing the actual URL, each with its official black monochrome brand mark and an explicit text label
- Secondary language switch
- No fake newsletter, technology badges or logo clouds

## 11. Content Priority on Small Screens

```text
Identity
→ Page title/value
→ Primary content
→ Translation status
→ Navigation aids
→ Related/supporting content
→ Footer
```

Do not remove any primary content on mobile; only recompose it.
