# Evidence — TASK-0611 GoatCounter analytics

| Field | Value |
|---|---|
| TASK | `TASK-0611` |
| Date | 2026-09-08 |
| Status | pending CI |

## Implemented scope

- Added the owner-supplied GoatCounter endpoint and counting script once in `src/layouts/BaseLayout.astro`.
- Preserved asynchronous loading and static-first operation.
- Added `tests/unit/goatcounter-source.test.mjs` to verify endpoint, source, async loading and single integration.
- Added ADR-011, SPEC-007 and traceability records.

## Verification

GitHub pull-request CI is the execution evidence for format, lint, type, unit and production-build gates. This record must be updated with the final run result before TASK-0611 is marked done.

## Visual evidence

No visual baseline update is required: the analytics integration has no rendered UI and the task explicitly prohibits visual changes.
