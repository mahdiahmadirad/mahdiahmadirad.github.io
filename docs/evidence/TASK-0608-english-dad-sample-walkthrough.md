# TASK-0608 — English DaD sample walkthrough evidence

- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-05
- **Status:** locally verified; awaiting pull-request CI and production release
- **Task:** [TASK-0608](../tasks/phase-06-deployment/TASK-0608-publish-english-dad-sample-walkthrough.md)
- **Contract:** [SPEC-005](../specs/SPEC-005-TECHNICAL-ARCHITECTURE.md), section 7

## Translation integrity

The English edition is a complete natural translation of the approved Persian
article. It preserves all 15 sections and six diagrams, the ASP.NET Core sample,
provider boundary, ADR/SPEC/TASK chain, evidence distinction, source-of-truth
discussion, CLI commands and documentation-scope qualification.

The Drift section remains explicitly future-facing: the inconsistency will be
introduced in the repository's next iteration, and the conclusion still says
the sample's next step is to break it while keeping build and tests green. The
edition does not claim that Drift or Reconciliation has been completed.

## Implementation

- `en.md` is colocated with `fa.md` under the existing
  `building-a-project-with-dad` translation key and slug.
- The article links to the two earlier English DaD essays and retains the
  verified `DaD` and `DaD-sample` repository URLs.
- Both editions now emit reciprocal language controls and hreflang metadata.
- All six diagrams reuse the established semantic pattern with localized
  accessible names and unchanged technical labels.
- Persian prose, schema, dependencies, tokens and approved baselines did not
  change.

## Local verification

| Check | Result |
|---|---|
| `npm run quality` | Passed, exit 0 |
| Format, lint, Astro/TypeScript | Passed; 0 errors, warnings or hints |
| Unit/content tests | 23 passed, including English structure and future Drift assertions |
| Build and Pagefind | 26 HTML documents; 22 pages indexed in FA/EN |
| HTML/link/budget validation | Passed; CSS 17,769 bytes gzip; largest initial JS 997 bytes gzip |
| Browser and accessibility tests | 74 passed |
| Approved visual suite | 24 passed; no baseline updates |
| Bilingual article checks | Reciprocal links/hreflang, six diagrams, no-JS, print, accessibility, RSS, sitemap and Pagefind passed |
| Responsive checks | Both editions at 320, 390, 768 and 1440px; no page or diagram overflow |

The existing Pagefind Persian-stemming and empty-projects-collection messages
remain unchanged behavior.

## Visual evidence

The English full article, header and all six diagrams were inspected at desktop
and mobile sizes.

| Locale | Desktop | Mobile |
|---|---|---|
| EN | [Full page](TASK-0608-en-desktop.png) | [Full page](TASK-0608-en-mobile.png) |

Header and diagram close-ups use filenames beginning
`TASK-0608-en-{viewport}-header` and
`TASK-0608-en-{viewport}-diagram-`. Reproduce them with
`node scripts/capture-english-dad-sample-walkthrough.mjs` after a build.

## Publication

Branch: `publish/english-dad-sample-walkthrough`.

Target route:

- `https://mehdiahmadirad.me/en/articles/building-a-project-with-dad/`

Pull-request CI, merge/deployment identifiers and production smoke results will
be added after the standard release flow completes.
