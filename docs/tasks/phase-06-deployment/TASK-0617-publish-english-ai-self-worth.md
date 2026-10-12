# TASK-0617 — Publish the English AI and self-worth essay

- **Status:** in-progress
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-10-13
- **Governing ADRs:** ADR-003, ADR-006, ADR-007, ADR-010
- **Specs:** SPEC-003, SPEC-004, SPEC-005
- **Dependencies:** TASK-0614 Persian publication, TASK-0615 AI classification, TASK-0616 article navigation fixes

## Objective and inputs

The owner's explicit request authorizes translating and publishing the English edition of final edited writing block 71386. The deployed Persian article is the source. Preserve its personal voice, challenging imperatives, paragraph rhythm, reasoning, uncertainty, flood/cigarette and robot/eviction scenes, history/time-lapse reflection, and Babak Karimi ending. Do not soften or summarize the essay.

## Scope and deliverables

- Publish `en.md` with shared slug/translationKey `ai-and-self-worth`, date 2026-10-13 and AI topic.
- Add the English AI topic so translated article metadata and topic references resolve naturally.
- Verify reciprocal language controls, hreflang, metadata, feeds, sitemap and search.
- Add the new English route/topic to existing responsive coverage.

## Acceptance and evidence

Persian source is unchanged. All reasoning, examples and qualifications are represented in natural English. Existing quality gate passes with no baseline changes. Verify `/en/articles/ai-and-self-worth/` and `/en/topics/ai/` after Pages deployment. Record evidence in `docs/evidence/TASK-0617-english-ai-self-worth.md`.

## Prohibited work and stop condition

Do not edit Persian prose, other essays, publication dates, styles, schema, dependencies or artwork. Do not publish to LinkedIn. Stop if the source cannot be preserved, a check requires an unrelated change or publishing access fails.

## Handoff

Report the English live URL after successful deployment and production checks.
