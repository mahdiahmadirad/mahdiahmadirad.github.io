# TASK-0601 — Configure GitHub Pages Workflow

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0502` |
| Specs | `SPEC-005` |

## Objective

Prepare official GitHub Pages CI and workflow without changing DNS.

## In scope

PR checks, production build, Pagefind, Pages artifact, pinned deployment action, minimal permissions and `public/CNAME`.

## Deliverables

workflows, rollback documentation and the result of dry/build validation.

## Acceptance criteria

- [x] workflow uses clean install and lockfile.
- [x] All quality commands are executed before uploading.
- [x] The artifact is the validated `dist` output.
- [x] `CNAME` has only `mehdiahmadirad.me`.
- [x] Actions have version/SHA checked.

## Verification/evidence

workflow syntax, local production build and test run if available.

## Prohibited work

Changing DNS, deploy bypassing gate, secret in repository or floating action version.

## Stop condition

If GitHub permission or Pages setting is required, stop to get access; Do not create an insecure workaround.

## Handoff

TASK-0602 Only with owner access and approval.

Completed in
[`../../evidence/TASK-0601-github-pages-workflow.md`](../../evidence/TASK-0601-github-pages-workflow.md).
