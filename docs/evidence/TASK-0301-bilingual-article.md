# TASK-0301 — Bilingual Article Slice Evidence

| Field | Value |
|---|---|
| Task | `TASK-0301` |
| Date | 2026-08-01 |
| Outcome | Implemented and verified; awaiting the separate `TASK-0302` owner approval gate |
| Runtime used for final checks | Bundled Node `v24.14.0`; system npm `10.9.2` only installed the exact lockfile with local engine enforcement disabled |

## Outcome

The repository now generates a static Article page for every published locale
edition. The bilingual `document-aware-development` fixture exercises the full
reading surface, while the Persian-only `signals-before-solutions` fixture
proves the unavailable-translation state without generating a fake English
route.

The slice includes:

- localized header, deck, dates, reading time, topics and sample disclosure
- canonical and published-edition-only `hreflang` links
- desktop outer-rail and mobile near-header table of contents
- abstract document-to-code SVG cover using modules, nodes and flow
- `h2`–`h4`, inline and block code, responsive table, callout, figure and footnote
- related articles, previous/next navigation and a stable permalink
- print composition with navigation, controls and cover removed, plus author and canonical address
- zero client scripts; primary reading and navigation work without JavaScript

## Changed files

- Article routing/data: `src/pages/[lang]/articles/[slug]/index.astro`,
  `src/lib/article.ts`
- Article components: `src/components/article/ArticleCover.astro`,
  `TableOfContents.astro`, `TranslationStatus.astro`
- Article styling/print: `src/styles/article.css`, `src/styles/main.css`,
  `src/styles/print.css`
- Metadata shell and localized UI: `src/layouts/BaseLayout.astro`,
  `src/i18n/ui.types.ts`, `src/i18n/ui.en.ts`, `src/i18n/ui.fa.ts`
- Sample corpus: both `document-aware-development` Markdown editions
- Verification: `tests/e2e/article.spec.js`, `tests/visual/article.spec.js`,
  `scripts/capture-article.mjs`, `package.json`
- Portable formatting check: `prettier.config.mjs` now uses
  `endOfLine: 'auto'` so CRLF and LF worktrees are checked without rewriting
  approved files

No Home component, design token or approved Home evidence file changed. No
Playwright screenshot baseline was created or updated.

## Acceptance evidence

| Criterion | Evidence |
|---|---|
| Locale line length and leading | Article columns use `--reading-max` and `--reading-leading`; FA/EN captures reviewed independently |
| Persian bidi isolation | Code blocks are globally LTR; Persian fixture uses `bdi`, `dir="ltr"` and `data-bidi="ltr"`; e2e passed |
| Keyboard TOC and anchors | First TOC link is focused and activated in both locales and both Playwright projects |
| No-JS reading | Both complete editions were loaded in a JavaScript-disabled context with zero script elements |
| Translation and hreflang states | Bilingual editions expose two alternates; Persian-only fixture exposes one and links the language control to `/en/` |
| Logical mobile rail | DOM-order assertion proves TOC precedes prose; support content follows prose; 320px overflow checks passed |
| Print | Print media test and dedicated capture verify hidden UI/cover and visible author/canonical address |

## Captures

| Locale/mode | Size | SHA-256 |
|---|---:|---|
| [EN desktop](TASK-0301-article-en-desktop.png) | `1440 × 4250` | `1a8e3ec4dbeca54e1a562546dfbd1c538b74ca3a2b41725532b068a6331b5be1` |
| [EN mobile](TASK-0301-article-en-mobile.png) | `390 × 4563` | `56598249cfbdb64d25ab7a35180088555c19fabffef4872add2ee98dc1780abe` |
| [FA desktop](TASK-0301-article-fa-desktop.png) | `1440 × 4218` | `17d5a4bc9e1bf050040e353a8451671ad2928d3974add3687949ab79a5c7c80e` |
| [FA mobile](TASK-0301-article-fa-mobile.png) | `390 × 4479` | `72d0c9610365af41b22c5796ca6ac2cca8f8e80bbda29bd96eb9977ff4b991e5` |
| [EN print](TASK-0301-article-en-print.png) | `1240 × 2354` | `a957f848774999ddd13ace2e01afbeb4d4f29bc9b61dbef6a88e53628a58980f` |

The visual inspection found no building, architectural-plan, photographic or
ready-made Iranian motif. The table remains inside an independently scrollable
region on compact screens, and the document itself has no horizontal overflow.

## Commands and results

```text
npm ci --engine-strict=false
PASS — 370 exact-lockfile packages installed; 0 vulnerabilities

npm run format:check
PASS — all matched files use Prettier style

npm run lint
PASS — 0 errors

npm run check
PASS — 57 files, 0 errors, 0 warnings, 0 hints

npm run test
PASS — 18/18 unit tests

npm run build
PASS — 10 static pages, including five published article editions

npm run test:e2e
PASS — 44/44 across desktop and mobile projects

npm run test:visual
PASS — 14/14 across desktop and mobile projects

npm run evidence:article
PASS — four article viewports and one print capture generated

git diff --check
PASS — no whitespace errors (Git emitted only expected autocrlf notices)
```

## Decisions and assumptions

- All editorial prose remains explicitly labeled fixture content; it is not a
  statement of Mehdi's experience or views and is not a machine translation.
- Article fixture routes remain `noindex` while still exposing initial
  canonical/hreflang markup for validation.
- Until the Articles index is built in phase 04, the “all sample articles” link
  returns to the existing Home writing index instead of creating a prohibited
  secondary page.
- No accepted token required modification. The design-specific choice was the
  restrained document-to-code dependency cover and outer editorial rail.
- The available bundled runtime is Node `24.14.0`, below the repository's
  declared `>=24.18.0` minimum, and the system npm is `10.9.2`. The version
  contract was not weakened; this local variance remains for a future run on
  the exact required toolchain.

## Remaining risks and handoff

- Human long-form reading, 200% zoom judgment and baseline approval belong to
  `TASK-0302`; this evidence does not self-approve them.
- The sample English print capture proves print CSS behavior but is not a
  product-owner approval of final pagination.
- `TASK-0302` is the next task and must stop for Mehdi Ahmadirad's explicit
  readability/composition decision before phase 04 begins.
