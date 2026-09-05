# TASK-0609 — Conceptual article artwork evidence

Date: 2026-09-05

## Implemented contract

- Four 1254 × 1254 owner-selected PNG sources were converted to 98–108 KB
  WebP derivatives without reducing intrinsic dimensions.
- Both language editions of the loop essay and three DaD essays carry the same
  conceptual artwork with independently written alt text.
- The article template renders the artwork beside the lead on wide screens and
  after the lead copy on compact screens.
- Home renders an article artwork only inside Featured Writing. Writing lists,
  article/topic indexes, search rendering, related links and RSS stay text-only.

## Automated verification

- `prettier --check .`: passed.
- `eslint .`: passed.
- `astro check`: passed with 0 errors, warnings or hints.
- Unit suite: 25 tests passed using Node's test runner and the local `tsx`
  loader. The repository's `tsx` CLI wrapper could not open its IPC socket in
  this execution environment, so the equivalent direct runner was used.
- `astro build`: passed; 26 static pages built.
- Pagefind: passed; 22 pages indexed in Persian and English.
- `scripts/validate-build.mjs`: passed; 26 documents and local links valid,
  CSS 17,875 bytes gzip, largest initial custom JS 991 bytes gzip.
- Static distribution audit: article-artwork URLs occur in exactly ten HTML
  pages—the eight localized article pages and the two localized Home pages.
  None occur in article indexes, topic pages, search pages or RSS feeds.
- Playwright functional and accessibility suite: 74 tests passed across the
  desktop and mobile Chromium projects, including axe scans of the Persian,
  English and bilingual 404 production routes.
- Playwright visual suite: 28 tests passed across desktop and mobile without
  horizontal overflow.

## Visual evidence

The optimized artwork files were inspected at original resolution and retain
their print texture, black forms and brick accents. The article header keeps
the copy before the artwork on compact viewports, while the wide layout gives
the artwork and lead separate columns. Home keeps all Recent Writing rows
text-only and exposes the artwork only in Featured Writing.

The review set contains Home and the featured article in the required matrix:

- `TASK-0609-home-fa-desktop.png`
- `TASK-0609-home-fa-mobile.png`
- `TASK-0609-home-en-desktop.png`
- `TASK-0609-home-en-mobile.png`
- `TASK-0609-article-fa-desktop.png`
- `TASK-0609-article-fa-mobile.png`
- `TASK-0609-article-en-desktop.png`
- `TASK-0609-article-en-mobile.png`

These are additive TASK-0609 review captures. No approved visual baseline was
changed or replaced.

## Browser execution note

The default repository configuration still targets the Google Chrome channel.
For this environment, the same Playwright 1.62 runner was pointed temporarily
at a locally extracted headless Chromium 149 executable because the Playwright
browser CDN returned HTTP 502. The runtime override was not committed. The
repeatable capture entry point is `npm run evidence:article-artwork`; it accepts
`PLAYWRIGHT_EXECUTABLE_PATH` when Chrome is not available.
