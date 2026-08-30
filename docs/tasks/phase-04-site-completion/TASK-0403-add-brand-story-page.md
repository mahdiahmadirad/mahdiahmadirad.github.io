# TASK-0403 — Add Brand Story Page

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0402`, `TASK-0505`, owner-authored Persian copy and attributable museum images |
| Specs | `SPEC-001`, `SPEC-002`, `SPEC-003`, `SPEC-004`, `SPEC-005`, `SPEC-006` |
| ADRs | `ADR-003`, `ADR-004`, `ADR-008`, `ADR-009` |
| Approver | Mehdi Ahmadirad |

## Objective

Publish the owner-authored Persian story of the historical creature as an
About subpage, with semantic historical figures, honest translation behavior
and a discoverable parent-About link, while preserving existing Home, Article
and brand-mark contracts.

## Inputs and dependencies

- Finalized editorial source in the private `blog-editorial` repository.
- Existing source and approved derivatives in `public/images/brand/`.
- Brooklyn Museum object record `125960`, accession `86.227.177`.
- Brooklyn Museum web-image policy permitting noncommercial website use with
  attribution; the precise source URLs and access date must be recorded.
- Completed `TASK-0402` metadata/search behavior and `TASK-0505` brand mark.

## In scope

- Record `ADR-009` and update the affected specifications.
- Add the Persian `historical-creature` page entry and localized static route.
- Add semantic heading, figure, caption, attribution and missing-translation
  behavior.
- Add a subordinate discovery link to both About editions; the English link
  must identify the Persian destination.
- Add responsive, accessibility, metadata, search and generated-output tests.
- Capture non-baseline review evidence for Persian desktop/mobile and the
  affected About editions.

## Deliverables

- Page content, historical assets and provenance documentation.
- Localized route, typed UI copy, routing/content helpers and page styling.
- Unit/e2e/accessibility coverage and bounded visual-review captures.
- Evidence report with command results, route/metadata matrix and checksums.

## Acceptance criteria

- [x] `/fa/about/historical-creature/` renders one `h1`, ordered `h2` sections
      and semantic `figure`/`figcaption` pairs without horizontal overflow.
- [x] No English story route or English `hreflang` is emitted before an
      authored English edition exists.
- [x] The Persian page discloses the unavailable English edition and its
      language control leads to `/en/about/`.
- [x] Both About pages expose the story without adding a global-navigation item
      or changing the decorative header/Home brand-mark behavior.
- [x] Museum photographs have explicit alt text, caption, source link,
      attribution and recorded rights basis; the existing extracted source is
      not overwritten.
- [x] The page is indexed by Persian Pagefind as a page, excluded from Article
      RSS/pagers and represented correctly in canonical/sitemap output.
- [x] `format:check`, `lint`, `check`, `test`, `build`, `validate:build`,
      `test:e2e` and `test:visual` pass without updating approved baselines.
- [x] Persian desktop/mobile and affected About review captures are presented
      to the owner before activating any new visual oracle.

## Verification/evidence

Route, DOM, metadata, Pagefind/RSS, internal-link, 320px, axe and print checks;
asset dimensions/checksums; non-baseline screenshots; full command results in
`docs/evidence/TASK-0403-brand-story-page.md`.

## Prohibited work

Adding a primary-navigation item, turning header/Home decorative marks into
links, publishing a fabricated translation, changing design tokens, assigning
a fixed historical identity that the owner has not asserted, overwriting the
source extraction, weakening tests or replacing approved visual baselines.

## Stop condition

Stop before release if the museum image-use basis becomes incompatible with
the public noncommercial blog, if an authored English edition is required but
not supplied, or after presenting visual candidates when owner approval is
required.

## Handoff

Owner visual/content review completed on 2026-08-30; prepare the approved
commit and deployment handoff.
