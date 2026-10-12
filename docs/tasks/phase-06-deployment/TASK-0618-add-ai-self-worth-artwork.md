# TASK-0618 — Add the selected AI/self-worth artwork to both editions

- **Status:** in-progress
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-10-13
- **Governing ADRs:** ADR-003, ADR-006, ADR-007, ADR-010
- **Specs:** SPEC-002, SPEC-003, SPEC-004, SPEC-005
- **Dependencies:** TASK-0609 artwork foundations, TASK-0617 bilingual article publication

## Objective and inputs

The owner selected concept 1, “آدم و سیل”, from the symbolic artwork workshop
and requested it for both Persian and English editions. That request authorizes
its addition and publication through the existing PR/Pages workflow.

## Scope and deliverables

- Preserve the selected generated composition; match the existing artwork's paper color and print texture as additionally requested by the owner, then create a 1254-square WebP at quality 88.
- Share one cover path across both editions with independently authored alt text.
- Record provenance and the owner's use authorization.
- Keep prose, dates, categories, templates, styles and historical baselines unchanged.

## Acceptance and verification

Both article pages display the chosen asset. Home displays it when this article is selected as featured writing.
Article indexes, related links and other lists remain text-only. Validate the
optimized file, generated markup, unchanged prose, full quality gate and
the live asset after Pages completes. Record evidence in
`docs/evidence/TASK-0618-ai-self-worth-artwork.md`.

## Prohibited work and stop condition

No alternative artwork generation, photo substitution, illustration redesign, article
rewriting, baseline updates or additional product scope. Stop if the chosen
source is missing or a gate requires an unrelated change.

## Handoff

Report publication on both live article URLs after production verification.
