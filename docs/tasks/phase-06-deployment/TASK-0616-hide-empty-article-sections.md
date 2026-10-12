# TASK-0616 — Hide empty article navigation sections

- **Status:** done
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-10-13
- **Governing ADRs:** ADR-002, ADR-003, ADR-004, ADR-007
- **Specs:** SPEC-003, SPEC-005
- **Dependencies:** TASK-0301 (done), TASK-0302 (done), TASK-0612 (done)

## Objective

Show article navigation only when it has content, in both Persian and English.

## Inputs and scope

The owner authorizes implementation, verification, commit, push and deployment.
Use the existing h2–h4 filter and same-locale related-article selection.
This corrective task does not change the earlier visual approval contract.

## Deliverables and acceptance criteria

- No TOC aside, summary or navigation when no displayable headings exist.
- No related section or title when no related articles exist.
- Nonempty TOCs keep valid heading links and keyboard disclosure behavior.
- Nonempty related sections retain their published same-locale links.
- Permalink, prose and previous/next navigation continue to render.
- Both locales work on desktop/mobile and without JavaScript.
- Required quality gate and production deployment pass.

## Verification/evidence

Regression tests and FA/EN desktop/mobile screenshots; command and deployment
results in `docs/evidence/TASK-0616-empty-article-sections.md`.
Pages run `38313725879` succeeded; all five production article smoke checks passed.

## Prohibited work

Changing article content, topics, URLs, selection policy, tokens, dependencies
or approved visual baselines; publishing a placeholder English edition.

## Stop condition

Stop if a fix requires an architectural change or baseline update, or if
publication access is unavailable.

## Handoff

Report changed files, verification, commit/push and production URLs. No new
feature task is selected by this corrective task.
