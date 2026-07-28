# TASK-0101 — Content and i18n Foundation

| Field | Value |
|---|---|
| Task | `TASK-0101` |
| Date | 2026-07-29 |
| Outcome | Complete |
| Baseline commit | `4e4a2cb` |
| Astro | `7.1.5` |
| Runtime | Node.js `24.18.0` LTS |

## Outcome

The repository now proves the accepted article-centric bilingual model with
Astro 7 Content Collections, symmetric `/fa/` and `/en/` routes, typed UI
dictionaries, locale formatting and routing helpers, explicit bidirectional
isolation, independent translation states, draft filtering, and build-time
content-graph validation.

The implementation uses the current Astro Content Layer API documented for the
pinned release:

- `src/content.config.ts`
- `defineCollection()` from `astro:content`
- `glob()` from `astro/loaders`
- Zod 4 schemas from `astro/zod`

Official references:

- <https://docs.astro.build/en/guides/content-collections/>
- <https://docs.astro.build/en/reference/content-loader-reference/>
- <https://docs.astro.build/en/reference/modules/astro-content/>

No ADR change was required. The loader supports the accepted
`{translation-key}/fa.md|en.md` structure directly.

## Content contract

Four collections are defined:

| Collection | Required identity | Key validation |
|---|---|---|
| Articles | locale, translation key, stable slug | dates, topics, draft, cover, reading-time override |
| Topics | locale, translation key, stable slug | localized description and order |
| Projects | locale, translation key, stable slug | status, links, technologies, order |
| Pages | locale, translation key, stable slug | description and draft state |

All collections use generated IDs in the form
`{translation-key}/{locale}`. The content graph rejects:

- a filename locale that differs from frontmatter `lang`
- a folder that differs from `translationKey`
- a slug that differs from the stable translation key
- duplicate language editions of one conceptual work
- duplicate topic or technology values
- an article topic missing in the article's active locale
- invalid dates, URLs, lengths, or kebab-case identifiers

Every sample entry has `sample: true`, a title or body disclaimer, and no claim
about the author's experience, projects, biography, or views.

## Sample fixtures

Article fixtures:

| Translation key | Persian | English | State |
|---|---|---|---|
| `document-aware-development` | published 2026-07-01 | published 2026-07-02 | bilingual, independent dates |
| `feedback-boundaries` | published 2026-06-10 | published 2026-06-12 | bilingual, independent dates |
| `signals-before-solutions` | published 2026-05-20 | absent | intentionally monolingual |

Supporting sample fixtures include two topics in both languages, one fictional
project in both languages, and one draft general page in both languages. The
project and page fixtures are explicitly fictional/sample data and are not
published as genuine personal content.

## Translation and publication behavior

`resolveArticleTranslation()` distinguishes:

```text
published counterpart → available
missing counterpart   → unavailable / missing
draft counterpart     → unavailable / draft
```

`publishedArticles()` excludes drafts and can filter by active locale. It does
not substitute one language under another language's URL.

The build loads and validates the complete graph before rendering either locale
foundation. Therefore a cross-collection error stops static generation rather
than appearing later at runtime.

## i18n contract

Implemented helpers and typed contracts:

- locales are the closed union `'fa' | 'en'`
- Persian direction is `rtl`; English direction is `ltr`
- locale routes always retain their language prefix
- UI strings live in `ui.fa.ts` and `ui.en.ts`
- Persian numbers use `fa-IR-u-nu-arabext`
- Persian dates use the Persian calendar
- English dates use the English locale
- display timezone is `Asia/Tehran`
- code, URLs, and identifiers can use `<bdi dir="ltr" data-bidi="ltr">`
- reading time uses 180 words/minute for Persian and 220 for English
- fenced-code words have a 0.5 weighting; the result is at least one minute

The timezone, calendar, and reading-rate choices are documented reversible
implementation assumptions. Stored content dates remain ISO/Gregorian values.

## Routes

The static build now generates:

```text
/
/fa/
/en/
```

The root remains a static redirect to `/fa/`. Both locale pages have correct
`<html lang dir>` values, get visible strings from the typed dictionary, and
render a technical URL through the LTR-isolating `BidiText` component.

These pages are deliberately unstyled, `noindex` foundation shells. TASK-0201,
not this task, owns the final Home page.

## Automated tests

Unit coverage includes:

- article defaults and date chronology
- duplicate topics and invalid slugs
- valid bilingual and monolingual graphs
- unknown localized topics
- draft filtering
- published, missing, and draft translation states
- locale guards, directions, and route generation
- localized numbers and dates
- bidi isolation attributes
- Persian/English reading-time rates
- typed dictionary selection

The same graph validator is invoked by both locale routes during prerendering.
For explicit negative evidence, the controlled Persian monolingual fixture was
temporarily changed to reference `unknown-topic`. `npm run build` exited 1 with:

```text
Content graph validation failed:
- articles/signals-before-solutions/fa references unknown topic unknown-topic for locale fa.
```

The fixture was immediately restored to `software-architecture`, and the final
positive build passed.

## Verification

Final commands use Node `v24.18.0` and npm `11.16.0`:

| Command | Result |
|---|---|
| `npm ci` | exit 0 |
| `npm run format:check` | exit 0 |
| `npm run lint` | exit 0 |
| `npm run check` | exit 0; 0 errors, warnings, or hints |
| `npm run build` | exit 0; `/`, `/fa/`, and `/en/` generated |
| `npm test` | exit 0; 14 tests passed |
| `npm run test:e2e` | exit 0; 4 desktop/mobile checks passed |
| `npm run test:visual` | exit 0; 2 bootstrap rendering checks passed |
| `npm audit` | exit 0; 0 vulnerabilities |
| negative unknown-topic build | expected exit 1 with explicit graph error |
| `git diff --check` | exit 0 |

No screenshot or approved visual baseline was added or changed.

## Changed areas

```text
src/content.config.ts
src/content/schemas.ts
src/content/{articles,topics,projects,pages}/
src/i18n/
src/lib/content/
src/components/content/BidiText.astro
src/layouts/LocaleFoundation.astro
src/pages/[lang]/index.astro
tests/unit/
tests/e2e/bootstrap.spec.js
package.json
package-lock.json
```

## Remaining risks and handoff

- All authored entries remain sample fixtures. Genuine About, project, topic,
  and article content still requires owner-provided material.
- Locale pages are infrastructure shells, not the Home visual slice.
- Article detail routes, canonical/hreflang metadata, and rendering belong to
  later tasks.
- The exact Persian calendar/timezone policy can be revised by the owner before
  genuine publication; helpers centralize that change.
- TASK-0102 is the only next ready task. It must add the design-system
  foundation without introducing unlicensed fonts or self-approving a visual
  baseline.
