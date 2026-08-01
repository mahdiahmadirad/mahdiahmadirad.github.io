# TASK-0504 — Stabilize Approved Visual Gate

| Field | Value |
|---|---|
| Status | `ready` |
| Depends on | `TASK-0503` |
| Unblocks | `TASK-0502` |
| Specs | `SPEC-005` |

## Objective

Make the immutable owner-approved Home/Article visual check reproducible in the
pinned Ubuntu CI environment and on supported developer environments without
weakening its ability to detect layout or typography regressions.

## Inputs and dependencies

- TASK-0502's reproducible macOS English Article mobile failure.
- The eight immutable approved images and SHA-256 hashes.
- The pinned Ubuntu 24.04, Node 24.18.0, npm 11.16.0 and Chrome CI contract.

## In scope

- Reproduce and measure the failure in the exact CI browser/runtime environment.
- Separate font-rasterization variance from geometry, wrapping or content drift.
- Make the comparison or execution environment deterministic across the
  supported quality workflow.
- Re-run the complete quality suite and the failing visual case repeatedly.

## Deliverables

A portable approved-visual gate, root-cause evidence and a green repeatable
quality report that allows TASK-0502 to resume.

## Acceptance criteria

- [ ] The exact pinned CI environment passes the complete visual matrix.
- [ ] The English Article mobile check passes at least three consecutive runs.
- [ ] The approved screenshots and their hard-coded hashes remain unchanged.
- [ ] The 0.5% difference ceiling is not increased or bypassed.
- [ ] Genuine geometry, wrapping and font-family changes still fail the gate.
- [ ] `npm run quality` passes completely with no skipped test.

## Verification/evidence

Environment inventory, per-image difference ratios, controlled negative test,
three-repeat failing-case proof and complete quality output.

## Prohibited work

Updating an approved baseline, increasing the pixel threshold, excluding text,
skipping the failing platform, removing the third accepted topic, or changing
approved typography merely to make the test pass.

## Stop condition

Stop for product-owner approval if the only valid remedy requires changing an
approved screenshot, visual token, typography decision or acceptance ceiling.

## Handoff

Resume TASK-0502; do not start deployment configuration first.
