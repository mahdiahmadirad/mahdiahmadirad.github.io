# TASK-0621 — Feature the 15 engineering principles article on Home

- **Status:** done
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-10-24
- **Governing ADRs:** ADR-003, ADR-006, ADR-007, ADR-010
- **Specs:** SPEC-002, SPEC-003, SPEC-004, SPEC-005
- **Dependencies:** TASK-0619, TASK-0620 (done)

## Objective and inputs

The owner selects the 15 engineering principles article as Home's featured writing. Apply the selection to Persian and English using existing metadata and rendering behavior.

## Scope and deliverables

Set featured:true on both editorial/public editions of 15-engineering-principles and featured:false on the previously selected public same-place-different-self editions. Keep exactly one explicit selection per locale. Under ADR-010, the selected article's existing numeral cover also appears in Home's Featured writing section. Update asset placement documentation and private publication notes to reflect the new owner selection.

## Acceptance and verification

Both Home pages feature the intended localized title, article URL, shared numeral cover and bilingual edition links. Check desktop/mobile rendering and 320px overflow. Build and HTML/link validation must pass; the complete Pages quality/deploy gate and live Home checks must succeed before completion. Save the four Home featured-section captures and verification in docs/evidence/TASK-0621-featured-writing.md.

## Prohibited work and stop condition

No article prose, dates, slugs, assets, templates, styles, dependencies or baseline changes; no new tests for this metadata-only selection. Stop if an unrelated architectural change or new approval gate is required.

## Handoff

Report the two live Home URLs after verification. No further task is selected.

## Verified completion

Private selection commit `d5e0bd6` and public selection commit `92690379caea96a42568757b2f86f1a56e85ecc2` are pushed. Pages run `40033331519` passed the complete quality/build and deploy jobs. Both live Home pages match the verified local HTML; the four FA/EN desktop/mobile checks confirm the selected title, links, cover and no overflow at 320px. Evidence is in `docs/evidence/TASK-0621-featured-writing.md`.
