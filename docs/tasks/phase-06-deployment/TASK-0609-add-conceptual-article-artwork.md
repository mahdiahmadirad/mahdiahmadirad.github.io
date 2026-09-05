# TASK-0609 — Add conceptual article artwork

- **Status:** done
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-05
- **Governing ADRs:** ADR-004, ADR-006, ADR-008, ADR-010
- **Specs:** SPEC-002, SPEC-003, SPEC-004, SPEC-005, SPEC-006
- **Dependencies:** TASK-0604 through TASK-0608 (done)

## Objective

Integrate the four owner-approved pilot artworks with the loop essay and three
DaD essays while keeping every non-featured article listing text-only.

## In scope and deliverables

- Optimized, dimensioned web assets with provenance notes.
- Localized `cover` metadata for all four bilingual essays.
- Responsive article-header artwork in Persian and English.
- The selected featured article's artwork on Home, with text before image on
  compact viewports.
- Explicit regression checks that lists, topics, search and related links do
  not render article artwork.
- Desktop/mobile visual evidence for Persian and English.

## Acceptance criteria

- Artwork appears only on its article page and the Home featured section.
- The Home writing list and all other discovery surfaces remain text-only.
- Images have meaningful localized alt text, explicit dimensions and no CLS.
- The existing historical creature remains the only personal brand mark.
- Format, lint, type, build, functional and accessibility checks pass.
- Approved visual baselines are not overwritten.

## Stop condition

Stop if the source images cannot provide a sharp web derivative at the required
size, or if the layout requires changing the established reading-column or
brand-mark contract.

## Handoff

Implementation, browser verification and the required bilingual responsive
screenshots are complete. The approved historical baselines were not changed;
see `docs/evidence/TASK-0609-conceptual-article-artwork.md`.
