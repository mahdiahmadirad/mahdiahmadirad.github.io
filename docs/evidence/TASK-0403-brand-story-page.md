# TASK-0403 — Brand Story Page Evidence

| Field | Value |
|---|---|
| Task | `TASK-0403` |
| Date | 2026-08-30 |
| Outcome | Approved and complete; review captures retained as evidence |
| Decision | `ADR-009` |
| Inputs | `SPEC-003`, `SPEC-004`, `SPEC-005`; `TASK-0402`; `TASK-0505` |

## Outcome

The owner-authored Persian historical-creature story is implemented as the
brand-story child of About. The page preserves the supplied personal voice,
keeps the creature's identity deliberately non-definitive and presents the
software-engineering interpretation as the owner's reading of the historical
image.

The current implementation:

- publishes the authored edition at `/fa/about/historical-creature/`;
- adds a subordinate discovery card to both About editions without changing
  primary navigation or the decorative Header/Home brand mark;
- renders the museum views, the unchanged owner extraction and the existing
  brand rendition as semantic figures with captions;
- treats the page as a Page, not an Article, so it has no article dates,
  Article JSON-LD, RSS entry, article pager or related-article block;
- retains the existing typography, spacing, color and responsive contracts.

## Route and translation matrix

| Context | Published destination | Language behavior |
|---|---|---|
| Persian brand story | `/fa/about/historical-creature/` | Self-canonical; Persian `hreflang` only |
| English brand story | Not published | `/en/about/historical-creature/` returns 404 |
| Persian language control | `/en/about/` | Discloses that English story copy is unavailable |
| Persian About | Persian brand story | Direct localized discovery link |
| English About | Persian brand story | Link is explicitly labelled as Persian and carries `lang`/`hreflang` |

This matrix applies `ADR-004` and `ADR-009`: no machine-generated or placeholder
translation claims parity with the owner-authored Persian edition.

## Content, DOM and publishing evidence

- The page has one `h1`, three ordered `h2` sections, a local table of
  contents and four `figure`/`figcaption` pairs.
- Every informative image has intrinsic dimensions and contextual Persian alt
  text. The two below-the-fold historical images and the brand rendition use
  native lazy loading.
- The layout does not overflow at the required 320 px width and passes the axe
  accessibility suite in both Playwright projects.
- The generated page has a Persian canonical URL and no false English
  alternate. The Persian story is present in the generated sitemap and
  Pagefind page index, but absent from localized RSS and Article JSON-LD.
- Print output removes interactive-only navigation and supplies the canonical
  page URL.

## Source and image-use evidence

The two museum photographs are attributable views of Brooklyn Museum object
`125960`, accession `86.227.177`. Exact source URLs, access date, original and
derivative dimensions, transformations and SHA-256 values are recorded in
[`../../public/images/pages/historical-creature/README.md`](../../public/images/pages/historical-creature/README.md).

The current rights basis is the Brooklyn Museum Image Services statement that
website images may be used and shared for noncommercial purposes with museum
attribution. The page includes visible attribution and an object-record link.
Commercial reuse or a changed object-specific statement is a stop condition
that requires reassessment.

The owner extraction and palette-aligned brand rendition remain the files
approved by `TASK-0505`; neither source was overwritten.

## Review captures

These six files are approved review evidence, not active visual-regression
oracles. No approved Home or Article baseline changed.

| Capture | Output dimensions | SHA-256 |
|---|---:|---|
| [Brand story FA desktop](TASK-0403-brand-story-fa-desktop.png) | 1440×5475 | `ddb4cf7a9b2834f56506267c1c71ee22b854a0c44aacfdba2220ec21cb0f2e54` |
| [Brand story FA mobile](TASK-0403-brand-story-fa-mobile.png) | 390×6491 | `afc0e7ffb4cfe1388396e2efdf8003fdc31f097120f9d05098e09ae8d1e8ca28` |
| [About FA desktop](TASK-0403-about-fa-desktop.png) | 1440×1572 | `b7ad10dfe376c58f7890e2952369d47458ac61fff83483a8a8ddf6ca3666e20b` |
| [About FA mobile](TASK-0403-about-fa-mobile.png) | 390×1740 | `1eae387a0628569b12ebc19019197b7d418206397d6a00b898710d78c3aea844` |
| [About EN desktop](TASK-0403-about-en-desktop.png) | 1440×1515 | `e037c5417f56b514f5759951bae0352be26fbb70c99ea699e9229aa93593774e` |
| [About EN mobile](TASK-0403-about-en-mobile.png) | 390×1793 | `c55267b1cb415d900a6278b481678e588cc5c05644ebeca4a751be3b35a459b1` |

Manual candidate review confirms that all images load, captions remain paired
with their figures, the two-up historical detail gallery stacks on mobile,
the table of contents stays readable and the About discovery card follows the
existing placeholder content without competing with primary navigation.

## Commands and results

```text
npm run quality
PASS — format, lint, Astro/TypeScript, 19 unit tests, 28-route Pagefind
build, generated-output validation, 98 behavior/accessibility tests and 32
visual tests

npm run evidence:brand-story
PASS — six bounded full-page review captures created

git diff --check
PASS
```

The quality run preserves all approved visual baselines. The brand-story
screenshots are attachments generated by the visual suite and the dedicated
capture script; owner approval retains them as evidence without converting
them into automated comparison references.

## Changed areas

- Governance: `ADR-009`, affected specification indexes and this task/evidence.
- Content and assets: Persian page entry, original museum downloads,
  non-destructive WebP derivatives and provenance documentation.
- Rendering: localized static route, About discovery links, route/content
  helpers, typed UI copy, responsive screen styles and print styles.
- Verification: unit, generated-output, semantic, accessibility, narrow-width
  and visual-review coverage plus the reproducible capture script.

## Decisions, assumptions and remaining risk

- No historical label more specific than the museum record and the owner's
  description is assigned to the creature. Similar figures are context, not an
  assertion that this creature is a sphinx or another fixed identity.
- No emphasis on glossiness or a corresponding visual/text claim was added.
- The article voice and engineering metaphor remain owner-authored; structural
  changes are limited to headings, captions, links and page semantics.
- The owner explicitly approved the content and presented desktop/mobile
  captures on 2026-08-30. `TASK-0403` is complete and ready for its approved
  commit and deployment handoff.
