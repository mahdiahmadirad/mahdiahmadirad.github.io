# TASK-0402 — Search and Publishing Evidence

| Field | Value |
|---|---|
| Task | `TASK-0402` |
| Date | 2026-08-01 |
| Outcome | Complete |
| Inputs | `SPEC-003`, `SPEC-004`, `SPEC-005`; completed `TASK-0401` |

## Outcome

The production build now generates separate Persian and English Pagefind
indexes, two localized RSS feeds, a sitemap index, a URL sitemap and robots
instructions. The former Search placeholder is an accessible, progressively
enhanced editorial search tool. Search, RSS and language-switch links are
available from the shared footer without adding a backend, tracker or social
profile.

`SiteMetadata.astro` is the single renderer for descriptions, canonical URLs,
published hreflang entries, Open Graph, RSS discovery, Pagefind metadata and
Article JSON-LD. It receives typed values from validated Content Collection
data; `canonicalOverride` remains URL-validated by the article schema.

## Search and Persian behavior

Pagefind 1.5.2 discovered `fa` and `en` from each document's `<html lang>` and
created separate indexes. The build indexed 21 intended pages and ignored the
root redirect, 404, Search and design-system documents.

Real fixture queries were exercised in both Playwright projects:

| Edition | Fixture query | Visible results | URL assertion |
|---|---|---:|---|
| Persian | `معماری` | 8 | every result begins `/fa/` |
| English | `architecture` | 7 | every result begins `/en/` |

Pagefind reports that Persian stemming is not supported. Exact Persian corpus
tokens search successfully, as the query above demonstrates, but inflected or
derived forms do not automatically match a shared root. This is a documented
Pagefind limitation, not an observed failure of exact-term search. Replacing
Pagefind would require the stop-condition ADR; no replacement is warranted by
the current fixture evidence.

## Publishing metadata evidence

- The translated document-aware article emits self-canonical plus exactly one
  `fa` and one `en` hreflang entry.
- The Persian-only signals-before-solutions article emits only its published
  `fa` hreflang; it does not claim an unpublished English edition.
- Article metadata parses as JSON and identifies `@type: Article`, publication
  and modification dates, language, author, canonical entity and the default
  software-native preview graphic.
- `/fa/rss.xml` and `/en/rss.xml` parse without XML errors and contain 3 and 2
  published fixture editions respectively.
- `sitemap-index.xml` and `sitemap-0.xml` parse without XML errors; the URL
  sitemap contains 22 production URLs including both locale homes.
- `robots.txt` allows crawling and names the absolute sitemap index URL.

## Commands and results

```text
npm run format:check  PASS — all files match Prettier style
npm run lint          PASS — 0 errors
npm run check         PASS — 76 files, 0 errors/warnings/hints
npm run test          PASS — 18 unit tests
npm run build         PASS — 27 static routes; 2 Pagefind languages,
                             21 pages and 907 words indexed
npm run test:e2e      PASS — 72 tests across desktop/mobile projects
npm run test:visual   PASS — 32 tests across desktop/mobile projects
node scripts/capture-publishing.mjs
                      PASS — 4 committed search captures
git diff --check      PASS
```

The host shell provides Node 22.17/npm 10.9 while the repository intentionally
requires Node 24.18/npm 11.6 or newer within their pinned major ranges.
Dependency installation therefore used a one-command local
`--engine-strict=false` override. Repository engines and `.npmrc` were not
weakened; all project commands still passed in the host environment.

## Visual evidence

The live search result state was reviewed across `FA/EN × Desktop/Mobile` with
reduced motion. The search design uses an open ruled input, status line and
editorial result rows within the approved tokens and typography. Existing
Home/Article visual baselines were not updated.

| Capture | Bytes | SHA-256 |
|---|---:|---|
| [Search EN desktop](TASK-0402-search-en-desktop.png) | 301929 | `84f865c586914bac0a68584a7f955b795129092452f0e8c4755a68ed588dff76` |
| [Search EN mobile](TASK-0402-search-en-mobile.png) | 246266 | `52237a09db686d066049756790a837dbd64b6a901db6db3ec82d91fa1d486edb` |
| [Search FA desktop](TASK-0402-search-fa-desktop.png) | 313742 | `5a6c704e83977849d50cba6f9db3f632f52dceba5aaa623adc306d60f606eeb8` |
| [Search FA mobile](TASK-0402-search-fa-mobile.png) | 244527 | `39aee027af12b287a47a125773c3f68c91c12ea1668582275fb11f2e31b7b398` |

## Changed files

- Publishing configuration: `package.json`, `package-lock.json`,
  `astro.config.mjs`, localized RSS and robots endpoints.
- Shared metadata/navigation: `SiteMetadata.astro`, `BaseLayout.astro`,
  `SiteFooter.astro`, typed publishing metadata and localized routing/UI copy.
- Search: localized Search route, Pagefind build integration and
  `secondary.css` editorial search styles.
- Page metadata: Home, article, topic, project, About and internal route
  declarations; one software-native default Open Graph SVG.
- Verification: publishing e2e suite, corrected earlier selectors that now
  distinguish JSON-LD/RSS from executable scripts/hreflang, capture script,
  this report and four PNGs.

## Decisions, assumptions and remaining risks

- Pagefind's automatic document-language selection is the locale boundary;
  e2e tests additionally assert every returned URL stays under the active
  locale prefix.
- RSS uses summaries and canonical article paths; it does not fabricate author
  biography, external profiles or social metadata.
- The default Open Graph preview is repository-authored SVG software geometry.
  A future platform-specific PNG derivative may improve compatibility, but is
  not required by the current specification.
- Persian stemming remains the only known functional limitation. Exact fixture
  terms pass in desktop and mobile search.
- No analytics, tracker, backend search, automatic translation or fake social
  URL was added.

Next task: `TASK-0501`.
