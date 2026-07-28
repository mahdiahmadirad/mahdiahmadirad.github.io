# TASK-0601 — Configure GitHub Pages Workflow

| Field | Value |
|---|---|
| Status | `blocked` |
| Depends on | `TASK-0502` |
| Specs | `SPEC-005` |

## Objective

Prepare official GitHub Pages CI and workflow without changing DNS.

## In scope

PR checks, production build, Pagefind, Pages artifact, pinned deployment action, minimal permissions and `public/CNAME`.

## Deliverables

workflows, rollback documentation and the result of dry/build validation.

## Acceptance criteria

- [ ] workflow uses clean install and lockfile.
- [ ] All quality commands are executed before uploading.
- [ ] The artifact is the validated `dist` output.
- [ ] `CNAME` has only `mehdiahmadirad.me`.
- [ ] Actions have version/SHA checked.

## Verification/evidence

workflow syntax, local production build and test run if available.

## Prohibited work

Changing DNS, deploy bypassing gate, secret in repository or floating action version.

## Stop condition

If GitHub permission or Pages setting is required, stop to get access; Do not create an insecure workaround.

## Handoff

TASK-0602 Only with owner access and approval.
