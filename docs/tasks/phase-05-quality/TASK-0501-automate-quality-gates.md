# TASK-0501 — Automate Quality Gates

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0402` |
| Specs | `SPEC-005` |

## Objective

Build a repeatable quality suite for build, behavior, accessibility and visual regression.

## In scope

format/lint/check, content tests, Playwright e2e/visual, axe checks, links/HTML, RSS, no-JS, 320px, reduced motion and performance budget.

## Deliverables

Green commands, config and coverage matrix report.

## Acceptance criteria

- [x] Home/Article and main page types are covered in FA/EN and desktop/mobile.
- [x] Baseline comes only from 0202/0302 approvals.
- [x] Genuine failures are neither skipped nor hidden by updating snapshots.
- [x] internal link, 404, translation, Pagefind and feeds are tested.
- [x] Tests can be repeated in a clean environment.

## Verification/evidence

Output of all AGENTS commands and list of snapshots.

## Prohibited work

Reducing assertion for green, auto-update baseline, removing accessibility rule without reason or changing feature scope.

## Stop condition

If the test fails due to a product defect, isolate the TASK defect; Do not bypass the quality gate.

## Handoff

TASK-0502.
