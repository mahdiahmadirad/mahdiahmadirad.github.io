# TASK-0302 — Article Reading Baseline Review

| Field | Value |
|---|---|
| Task | `TASK-0302` |
| Date | 2026-08-01 |
| Outcome | Approved |
| Approver required | Mehdi Ahmadirad |
| Input | [`TASK-0301-bilingual-article.md`](TASK-0301-bilingual-article.md) |

## Review scope

The complete English and Persian fixture articles were reviewed independently
across desktop, mobile, a 200% reflow-equivalent width, and print. The review
covered prose rhythm, heading hierarchy, TOC placement, code, responsive table,
callout, figure, footnote, translation controls, related/pager navigation and
bidirectional technical expressions.

## Owner decision

After receiving direct links to the complete FA/EN desktop/mobile set, print
capture, 200% reflow-equivalent captures and this review report, the product
owner replied:

> approved.

This records approval of the article readability, composition, bidirectional
behavior, responsive reflow and print baseline presented for TASK-0302. It
authorizes TASK-0401 to become `ready`; it does not authorize automatic visual
baseline updates or changes to accepted design tokens.

## Preliminary reading review

### English

- Source Serif 4 gives the title and reading column a clear editorial voice;
  Inter keeps metadata, navigation and annotations distinct from prose.
- The `43rem` maximum column and `1.68` leading remain comfortable from the
  deck through the footnote. Heading transitions are visible without excessive
  weight or decorative interruption.
- The sample argument follows a coherent sequence: decision, executable
  contract, explicit states and review distance. The cover and feedback figure
  explain that sequence without introducing unrelated imagery.
- The outer rail is clearly secondary at desktop width. At compact widths the
  TOC appears before the cover and article, while permalink and related content
  follow the prose.

### Persian

- Estedad headings and Vazirmatn prose retain a controlled Persian rhythm; the
  `46rem` maximum column and `1.95` leading avoid compression.
- The Persian edition is naturally composed rather than mechanically mirrored:
  title and metadata begin on the right, the desktop rail occupies the outer
  left side, and compact ordering remains logical.
- The prose was checked around `ADR → SPEC → TASK → CODE`, `npm run check`,
  `translationKey`, the sample URL and the TypeScript block. LTR sequences stay
  ordered and isolated without displacing Persian punctuation or alignment.
- Persian digits and Solar Hijri dates are visible in metadata and footnotes.

## Responsive and zoom evidence

The existing TASK-0301 tests passed at `320px` for both locales with no document
overflow. TASK-0302 adds a `640` CSS-pixel review mode, equivalent to the layout
viewport created by 200% browser zoom on a 1280px viewport. In both locales:

- `documentWidth === viewportWidth === 640`
- header, TOC, cover, prose, support rail and pager remained within the viewport
- code and table overflow remained inside their local scroll regions
- no primary content was removed

| Locale | Capture | Size | SHA-256 |
|---|---|---:|---|
| EN | [200% reflow equivalent](TASK-0302-article-en-zoom-200.png) | `640 × 4107` | `aa2fc59eb9b71c57272ca40ee86a93f7c8fd38dad73b38f1878a301ced42f062` |
| FA | [200% reflow equivalent](TASK-0302-article-fa-zoom-200.png) | `640 × 4100` | `02b671282867da72bca7a2ef1956b8d194852f3dad10addfbdf16db4afae1d5c` |

## Component review

| Area | Result |
|---|---|
| TOC | Keyboard-operable links; desktop outer rail; compact placement before cover/prose |
| Code | LTR, isolated, locally scrollable, restrained surface and border |
| Table | Semantic headers and labeled keyboard-scroll region; local horizontal scroll on compact screens |
| Callout | Meaning carried by heading/text plus rule, not color alone |
| Figure | Software-native modules, edges and feedback path; localized title, description and caption |
| Footnote | Reference and return link work with keyboard and retain locale rhythm |
| Translation | Bilingual switch preserves concept; monolingual fixture states absence honestly |
| Print | Navigation, cover and controls hidden; prose, author and canonical URL visible |

## Difference classification

### Defects

No implementation defect was found in the preliminary review.

### Acceptable variances proposed for approval

- The reference photograph is replaced by an abstract document-to-code SVG.
- Fixture disclosure is more prominent than it would be for genuine published
  content because fabrication safety must remain explicit.
- Compact tables scroll horizontally inside a labeled region rather than
  shrinking technical content to an unreadable size.
- Social share controls are represented by a stable permalink; no trackers or
  unauthorized social destinations were added.
- The print evidence is a continuous print-media capture. Final pagination
  remains part of the owner's human judgment.

### Decision

The product owner approved the presented article reading baseline. No
corrective task is required.

## Commands and results

```text
npm run evidence:article-review
PASS — build succeeded; FA/EN 640px captures generated
FA — width 640/640, all regions contained, table/code overflow local
EN — width 640/640, all regions contained, table/code overflow local

TASK-0301 inherited checks
PASS — 18 unit, 44 e2e and 14 visual tests
PASS — FA/EN 320px, keyboard, no-JS, translation and print checks
```

## Changed files in this review task

- `docs/tasks/phase-03-article/TASK-0302-review-article-reading-baseline.md`
- `docs/evidence/TASK-0302-article-reading-review.md`
- `docs/evidence/TASK-0302-article-en-zoom-200.png`
- `docs/evidence/TASK-0302-article-fa-zoom-200.png`
- `scripts/capture-article-review.mjs`
- `package.json`

No Article/Home implementation, accepted design token or visual baseline was
changed during this review.

## Remaining risk and handoff

The owner has accepted the long-form reading comfort, responsive behavior and
printed composition represented by the recorded evidence. TASK-0401 is the
next ready task; real About content remains its documented content-safety risk.
