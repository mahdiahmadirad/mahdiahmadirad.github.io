# TASK-0605 — Bilingual DaD essay evidence

- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-04
- **Status:** local verification complete; pull-request CI pending
- **Task:** [TASK-0605](../tasks/phase-06-deployment/TASK-0605-publish-bilingual-dad-essay.md)
- **Contract:** [SPEC-005](../specs/SPEC-005-TECHNICAL-ARCHITECTURE.md), section 7

## Source integrity and translation

The full edited writing block 58341 was retrieved from the owner's referenced
conversation. The Persian prose was compared exactly after removing the source
h1 and its six text diagram blocks, and removing frontmatter and the replacement
figures from the publication. No spelling, punctuation, wording or internal
whitespace was normalized. The equality check passed.

SHA-256 of this prose:
`96392496254caf3a881cd76a47578aaafcc33f25502ed47e37fdd38d4301c040`.
The regression assertion is in `tests/unit/dad-source.test.mjs`.

The English edition was translated for the owner's explicit simultaneous
publication request and reviewed against all sections of the Persian source.
It preserves the provider-abstraction example, distinctions among context,
memory and project knowledge, drift, reconciliation, and the author's uncertainty
about DaD. It adds no promises, personal experiences or external claims.

## Implementation

- Two Markdown articles, shared `building-easier-than-understanding` key/slug,
  date 2026-09-04, independent localized metadata.
- Two software-architecture topic editions, avoiding unrelated categorization.
- Six reviewed HTML figures per article: ordered flows and composition lists.
- Shared `src/styles/content-diagram.css`, imported into the existing CSS layer.
- Four-step flows become horizontal only when their reading container fits;
  long flows/compositions stay vertical. DOM label order remains unchanged.
- Technical English labels are explicitly LTR; figure names match page locale.
- No dependencies, schema, renderer integration, global tokens or JS added.
- Existing home test expectations now account for two real articles per locale.

## Local verification

Runtime: Node 24.19.0, npm 11.6.2; clean locked install.

| Check | Result |
|---|---|
| `npm run quality` | Passed, exit 0 |
| `format:check`, `lint`, `check` | Passed; Astro 0 errors/warnings/hints |
| `test` | 20 passed, including exact Persian-source integrity |
| `build` | 22 pages; Pagefind indexes 18 pages in FA/EN |
| `validate:build` | 22 HTML documents and local references validated |
| Behavior/accessibility Playwright suite | 66 passed |
| Visual Playwright suite | 24 passed; no baseline updates |
| Diagram checks | Six correct label sequences; no JS needed; print labels visible |
| Responsive checks | Both locales at 320, 390, 768 and 1440px; no overflow |
| Metadata | Canonical, reciprocal FA/EN alternates, RSS and sitemap verified |
| Targeted article suite after adding search checks | 4 passed; Pagefind returns the new article only in the active locale |
| CSS budget | 17,726 bytes gzip, below 51,200 |
| Initial JS | Unchanged; maximum 991 bytes gzip on Search |

Build messages about the empty Projects collection and Pagefind's lack of
Persian stemming are existing project behavior. The locked dependency install
reported four high-severity audit findings; this publication changes no
dependencies and does not run automatic dependency upgrades.

## Visual evidence

The complete pages and diagram close-ups were inspected, including desktop
horizontal arrows and mobile vertical arrows, clear English text inside the
Persian page, and the six-item composition.

| Locale | Desktop | Mobile |
|---|---|---|
| FA | [Full page](TASK-0605-fa-desktop.png) | [Full page](TASK-0605-fa-mobile.png) |
| EN | [Full page](TASK-0605-en-desktop.png) | [Full page](TASK-0605-en-mobile.png) |

Each view also has `-diagram-1.png`, `-diagram-2.png` and
`-diagram-6.png` close-ups. Reproduce with
`node scripts/capture-dad-article.mjs` after the production build.

## Publication

Branch: `publish/bilingual-dad-essay`. Standard flow is pull-request CI, merge
to main, then the existing Pages deployment quality gate. CI/deployment status
and production smoke results are reported in the task handoff.

Target routes:

- `https://mehdiahmadirad.me/fa/articles/building-easier-than-understanding/`
- `https://mehdiahmadirad.me/en/articles/building-easier-than-understanding/`
