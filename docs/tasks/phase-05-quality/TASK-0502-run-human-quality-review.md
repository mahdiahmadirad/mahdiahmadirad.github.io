# TASK-0502 — Run Human Quality Review

| Field | Value |
|---|---|
| Status | `blocked` |
| Depends on | `TASK-0501` |
| Approver | product owner/reviewer |

## Objective

Check the cases where automation is not enough with human review and final evidence.

## In scope

keyboard path, screen-reader smoke, zoom, bidi prose, typography, print, reduced motion, lighthouse and metadata content.

## Deliverables

quality report with pass/fail, bounded defects and justified deviations.

## Acceptance criteria

- [ ] There are no accessibility or overflow blockers left.
- [ ] Lighthouse targets are reviewed and deviations are documented.
- [ ] Primary content remains usable without JavaScript.
- [ ] All main track TODOs are resolved or explicitly deferred.
- [ ] The reviewer has registered readiness for deployment.

## Verification/evidence

Manual report, Lighthouse output and list of closed defects.

## Prohibited work

Turning a target into a nominal pass, ignoring Persian, or deploying before review.

## Stop condition

Any defect with blocker/high intensity stops the TASK and turns it into a corrective TASK.

## Handoff

TASK-0601.
