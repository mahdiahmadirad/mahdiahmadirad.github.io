# TASK-0404 — Publish English Brand Story Edition

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0403`, owner request for an English edition |
| Specs | `SPEC-003`, `SPEC-004`, `SPEC-005` |
| ADRs | `ADR-003`, `ADR-006`, `ADR-009` |
| Approver | Mehdi Ahmadirad |

## Objective

Publish a natural English edition of the historical-creature brand story at
the symmetric About subpage, using the owner's current Persian copy as its
editorial source and preserving the existing page semantics and visual system.

## Inputs and dependencies

- The current Persian edition in
  `src/content/pages/historical-creature/fa.md`, including the owner's
  uncommitted editorial revisions.
- The route, assets, provenance, styling and tests completed by `TASK-0403`.
- The owner's explicit request on 2026-08-30 to translate and produce the
  English page.

## In scope

- Add the English page entry with localized metadata, prose, headings, image
  alternative text and captions.
- Activate symmetric route, About discovery, language-switch and `hreflang`
  behavior.
- Extend route, metadata, sitemap, accessibility, responsive and visual-review
  checks to the English edition.
- Record bounded evidence without changing approved Home or Article baselines.

## Deliverables

- `src/content/pages/historical-creature/en.md`.
- Updated tests and applicable content-model documentation.
- English desktop/mobile review captures and an evidence report.

## Acceptance criteria

- [x] `/en/about/historical-creature/` renders a natural English edition with
      one `h1`, three ordered `h2` sections and four semantic figures.
- [x] Both editions expose self-canonical metadata and reciprocal `fa`/`en`
      alternates, and their language controls stay on the same concept.
- [x] Each About edition links directly to its same-language brand story.
- [x] The English page is indexed as a Page, appears in the sitemap and remains
      excluded from Article RSS, JSON-LD, pagers and related-writing.
- [x] Both editions pass narrow-width, accessibility and non-baseline visual
      review checks.
- [x] Required repository verification passes without updating an approved
      visual baseline.

## Verification/evidence

Content/schema checks; localized route, DOM and metadata assertions; Pagefind,
sitemap and RSS validation; axe and 320 px checks; English desktop/mobile
review captures; command results in
`docs/evidence/TASK-0404-english-brand-story.md`.

## Prohibited work

Inventing new historical or personal claims, changing the Persian prose,
altering design tokens or page structure, adding global navigation, weakening
tests, or replacing approved visual baselines.

## Stop condition

Stop if the English text would require a historical or personal claim absent
from the Persian source, if image rights change, or if the visual review
requires a new approved baseline.

## Handoff

Completed on 2026-08-30 with evidence in
`docs/evidence/TASK-0404-english-brand-story.md`; the owner approved the final
English copy and visual review on 2026-08-30.
