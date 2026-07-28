# TASK-0001 — Audit Repository and Decisions

| Field | Value |
|---|---|
| Status | `ready` |
| Depends on | none |
| Inputs | root guides, ADRs, SPECs |

## Objective

Record the state of the repository, tools, user files, open decisions and the possibility of using the asset/font without changing the product.

## In scope

- Structure inventory, lockfile, runtime and available guides
- Record uncommitted changes and conflict points
- see `assets/design-reference.png`
- List of content, font, GitHub and DNS TBDs
- Offer package manager only if there is no lockfile

## Deliverables

`docs/evidence/TASK-0001-audit.md` including inventory, assumptions, risks and command baseline.

## Acceptance criteria

- [ ] repository and full local guides have been checked.
- [ ] The distinction between the reference composition and the prohibited architectural imagery is recorded.
- [ ] No user changes are overwritten.
- [ ] Real blockers are separated from reversible details.
- [ ] TASK-0002 has sufficient input.

## Verification/evidence

File list, version control status, runtime version and checksum of the reference image.

## Prohibited work

scaffold, install dependency, redesign, build page, change DNS or deploy.

## Stop condition

Stop and report if target repository is unknown/unreachable, user changes in direct conflict, or essential asset/font is unlicensed.

## Handoff

Set TASK-0002 to `ready` only after the audit is complete.
