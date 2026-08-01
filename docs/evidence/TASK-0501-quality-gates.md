# TASK-0501 — Automated Quality Gates Evidence

| Field | Value |
|---|---|
| Task | `TASK-0501` |
| Date | 2026-08-01 |
| Outcome | Complete |
| Inputs | `SPEC-005`; completed `TASK-0402`; approved TASK-0202/TASK-0302 visual evidence |

## Outcome

The repository now has one repeatable `quality` command and a pinned GitHub
Actions quality job. The suite covers formatting, lint, strict Astro/TypeScript
checks, content invariants, production generation plus Pagefind, generated HTML
and local-link validation, accessibility, behavior, responsive reflow,
performance budgets and approved visual regression evidence.

The quality work exposed and corrected product defects instead of excluding
them: duplicated navigation landmark names, unnamed supporting regions,
invalid ARIA placement, invalid generated Pagefind metadata and inaccessible
syntax colors. Axe runs with its WCAG A/AA rule set intact.

## Coverage matrix

| Gate | FA | EN | Desktop | Mobile | Evidence |
|---|:---:|:---:|:---:|:---:|---|
| Home | ✓ | ✓ | ✓ | ✓ | no-JS, navigation, translation state, 320 px, axe, approved visual |
| Article | ✓ | ✓ | ✓ | ✓ | no-JS, TOC/keyboard, translation state, print, 320 px, axe, approved visual |
| Articles index | ✓ | ✓ | ✓ | ✓ | route matrix, 320 px, generated-link and HTML validation |
| Topics index/detail | ✓ | ✓ | ✓ | ✓ | route/content matrix, empty-topic 404, 320 px, axe, visual capture |
| Projects | ✓ | ✓ | ✓ | ✓ | fixture assertions, 320 px, axe, visual capture |
| About | ✓ | ✓ | ✓ | ✓ | no-invented-profile assertion, 320 px, axe, visual capture |
| Search/Pagefind | ✓ | ✓ | ✓ | ✓ | locale-contained live query results and axe |
| 404 | bilingual | bilingual | ✓ | ✓ | status, destinations, axe and visual capture |
| Feeds/publishing | ✓ | ✓ | ✓ | ✓ | RSS/XML, sitemap, robots, canonical/hreflang and JSON-LD |

Additional behavior gates cover 640 px reflow as the 200% zoom equivalent and
the reduced-motion media preference. Generated-output validation checks all 27
HTML documents, local resources and fragments.

## Visual regression policy

The only baseline inputs are the eight owner-approved Home and Article images
from TASK-0202 and TASK-0302. Their SHA-256 hashes are hard-coded and checked
before comparison, so modifying an evidence file cannot silently update the
oracle. Current full-page images are always captured and overflow-checked.

TASK-0401 and TASK-0402 intentionally added topic/project rows and footer links
after those approvals. Therefore pixel comparison uses the unchanged first 15%
of each approved image—the masthead and lead composition—at the strict 0.5%
pixel-difference ceiling. This keeps a real approval-backed regression gate
without misclassifying later accepted content as visual drift. No baseline was
created, copied or updated by TASK-0501.

Approved inputs:

- `TASK-0201-home-{fa,en}-{desktop,mobile}.png`
- `TASK-0301-article-{fa,en}-{desktop,mobile}.png`

## Build validation and budgets

| Check | Result | Budget |
|---|---:|---:|
| Generated HTML documents and local links | 27 valid | 0 errors |
| Total CSS | 18,222 bytes gzip | < 51,200 bytes |
| Largest initial custom JavaScript | 991 bytes gzip (`/en/search/`) | < 30,720 bytes/page |
| Critical font preloads | at most 2/document | ≤ 2/document |
| Third-party executable scripts | 0 | 0 |

`html-validate:recommended` and `html-validate:prettier` are enabled. Only the
stylistic `no-inline-style` rule is disabled because approved software-native
article SVG/callout content contains intentional inline presentation. No HTML
validity or accessibility rule was removed.

## Commands and results

```text
npm ci --engine-strict=false
                      PASS — 397 locked packages installed; 0 vulnerabilities
npm run quality       PASS — format, lint, check, unit, build, generated-output,
                             88 behavior/accessibility and 32 visual tests
npm run test          PASS — 18 unit/content tests
npm run build         PASS — 27 routes; 2 Pagefind languages; 21 pages;
                             909 indexed words
npm run validate:build
                      PASS — 27 HTML documents/links and all budgets
git diff --check      PASS
```

The host shell provides Node 22.17/npm 10.9, below the repository's deliberate
Node 24.18/npm 11.6 requirement. The clean-install proof used only the local
`--engine-strict=false` command override; engine policy was not changed. CI
installs exact Node 24.18.0 and npm 11.16.0 before running plain `npm ci`.

The first combined browser run oversubscribed the local preview server with ten
workers and delayed two otherwise healthy Pagefind loads beyond their existing
assertion window. The search test then passed 20/20 isolated repetitions. The
suite now uses four workers; the complete 88-test matrix passes without longer
timeouts or weaker assertions.

## Changed files

- Quality orchestration: `package.json`, `package-lock.json`,
  `.github/workflows/ci.yml`, `.htmlvalidate.json`,
  `playwright.visual.config.js`, `scripts/validate-build.mjs`.
- Automated coverage: `tests/accessibility/axe.spec.js`,
  `tests/e2e/responsive.spec.js`, `tests/visual/approved-baseline.js`, and the
  Home/Article visual specs.
- Product corrections: shared landmarks and metadata components, Article/Home
  supporting-region semantics, localized accessible names, article fixtures,
  and the light high-contrast Shiki theme.
- Task state and this evidence report.

## Decisions, assumptions and remaining risks

- GitHub Actions are pinned by full commit SHA and run on Ubuntu 24.04 with the
  repository's exact Node/npm toolchain. Deployment remains outside this task.
- Axe is an automated smoke test, not a substitute for keyboard and
  screen-reader human review. Those checks remain explicitly assigned to
  TASK-0502.
- Lighthouse, print aesthetics, bidi prose inspection and metadata editorial
  quality also remain human-review items in TASK-0502.
- CI has not yet executed on GitHub because publishing/external access is not
  authorized in this task; the workflow is locally validated through the same
  commands.

Next task: `TASK-0502`.
