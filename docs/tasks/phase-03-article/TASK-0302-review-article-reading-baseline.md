# TASK-0302 — Review Article Reading Baseline

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0301` |
| Approver | Mehdi Ahmadirad |

## Objective

Verify article readability, composition and bidirectional behavior with human review.

## In scope

desktop/mobile, FA/EN, prose rhythm, TOC, code/table/footnote, print and translation controls.

## Deliverables

Review and approval reports or corrective TASKs.

## Acceptance criteria

- [x] Long-form text in both languages has actually been read and reviewed.
- [x] zoom 200% and 320px do not obstruct the content.
- [x] bidi Persian examples do not fail.
- [x] print has readable output.
- [x] Owner approval is recorded.

## Verification/evidence

screenshot set, print evidence and approval text.

## Prohibited work

Agent self-validation, removing difficult test cases or starting next pages before the gate.

## Stop condition

Always stop for the owner's decision; Rejection becomes a bounded modification TASK.

## Handoff

After approval, TASK-0401.

Approved in [`../../evidence/TASK-0302-article-reading-review.md`](../../evidence/TASK-0302-article-reading-review.md).
