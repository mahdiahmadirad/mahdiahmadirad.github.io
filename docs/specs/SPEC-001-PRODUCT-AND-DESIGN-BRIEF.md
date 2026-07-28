# SPEC-001 — Product & Design Brief

| Field | Value |
|---|---|
| ID | `SPEC-001` |
| Status | `approved` |
| Owner | Mehdi Ahmadirad |
| Governing ADRs | `ADR-001`, `ADR-002`, `ADR-003`, `ADR-004`, `ADR-005` |
| Implemented by | `TASK-0201`, `TASK-0301`, `TASK-0401` |
| Last updated | 2026-07-29 |

## 1. Product summary

`mehdiahmadirad.me` is Mehdi Ahmadirad's professional and intellectual home: a personal, bilingual website for in-depth essays and articles on software architecture, systems engineering, evidence-based development, AI-assisted development, technical leadership, and selected projects.

The site is primarily **a place to read and think**—not an online résumé, sales landing page, multi-author magazine or product showcase.

## 2. Identity statement

### English

> Software architecture, engineering, and the reasoning behind systems.

### Persian

> معماری نرم‌افزار، مهندسی و منطق پشت سیستم‌ها

This is a subtitle and can be edited later, but it should keep the same three axes: software, engineering and reasoning.

## 3. Objectives

- Build a long-term reference for the author's writings, projects, and professional identity.
- Publish each article independently in Persian, English or both.
- Provide a first-class reading experience for long-form technical articles.
- Create a distinctive, contemporary and calm design with a subtle Iranian identity.
- Fast, stable, archiveable and low-cost static output generation.
- Providing a foundation that expands to Topics, Projects, About, RSS, and Search without a radical redesign.

## 4. Non-goals

- Social network, tracking system or community platform
- Content management panel in the first version
- Internal comments, user account or database
- Heavy visual effects, cinematic animations or WebGL
- Terminal appearance, green on black code, or common developer site clichés
- Imitation of building architecture to show "software architecture"
- Turning the home page into a résumé, store or grid of product cards

## 5. Audience

### Main audience

- Architects and senior software engineers
- Technical Leads and Engineering Managers
- Developers interested in why decisions are made
- Persian- or English-speaking readers of in-depth technical writing

### Secondary audience

- Partners, event organizers and publishers
- People who are familiar with the author's projects, speeches or resume
- Search engines, sharing tools and feed readers

## 6. Key needs of users

The user must be able to:

- Understand the subject and the author of the site in a few seconds.
- View content in their own language without being forced into a translation.
- Detect the presence or absence of a corresponding version of an article.
- Find articles by recency and topic.
- Understand direction, position and estimated reading time in a long article.
- Easily read code, tables, graphs, footnotes and quotations.
- Receive the same content quality on mobile as on desktop.
- Access RSS, stable links, reliable metadata and a suitable print version.

## 7. Brand personality

| Feature | should be | should not be |
|---|---|---|
| personal | A distinct authorial voice | self-promotion |
| technical | Accurate and based on experience | Hacker stereotype |
| serious | Calm and credible | Dry and corporate |
| minimal | Removes nonfunctional elements | Empty and impersonal |
| Iranian | Present in language and rhythm | Decorative and touristic |
| global | Natural for an English audience | A version stripped of its Persian identity |

## 8. Principles of experience

1. **The content is the hero of the page.**
2. **Persian and English are two first-class experiences, not the original and the translation.**
3. **Each element must have a clear function or meaning.**
4. **Iranian identity comes from design rules, not from affixing symbols.**
5. **Speed, accessibility and readability are part of beauty.**
6. **Editorial details have priority over the number of features.**
7. **Progressive enhancement:** The absence of JavaScript must not disrupt primary reading and navigation.

## 9. Version 1 scope

### Mandatory

- Persian and English Home
- Persian and English Article
- Topics index and Topic detail
- Projects index
- About
- Static search
- RSS, sitemap, canonical, hreflang, Open Graph
- 404 bilingual
- Article printing mode
- At least two corresponding sample essays and one monolingual essay for the content model test

### After version 1

- Project detail
- Notes or Now
- newsletter integration
- Collection of articles
- MDX Interactive Charts
- Dark theme, only if it is compatible with the readability and identity of the design

## 10. Quality indicators

- The main content can be seen in the common viewport without hindrance and delay.
- Green Core Web Vitals on sample static pages.
- Target Lighthouse scores: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. These numbers are targets, not substitutes for human review.
- No unwanted horizontal scrolling at 320px width.
- No bidirectional failures in Persian text containing code and English words.
- All internal routes and language links are checked during the build.
- Article pages can be read without JavaScript.

## 11. Open decisions

- Final selection and hosting licenses for Persian and Latin fonts
- Real About content and a short Home introduction
- Initial list of Topics and Projects
- Exact Persian display calendar and timezone policy
- GitHub, LinkedIn and RSS feeds
- analytics policy; First version default: no analytics
