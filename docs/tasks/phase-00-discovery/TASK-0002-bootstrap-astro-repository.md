# TASK-0002 — Bootstrap Astro Repository

| Field | Value |
|---|---|
| Status | `blocked` |
| Depends on | `TASK-0001` |
| Specs | `SPEC-005` |

## Objective

Create a repeatable Astro baseline with strict TypeScript, static output, and a single-repo structure.

## In scope

- Scaffold or adapt Astro without overwriting user files
- exact dependencies and lockfile
- Structure `src/public/tests/docs`
- Basic config `site`, static output and trailing slash
- commands `format:check`, `lint`, `check`, `build`, `test`, `test:e2e`, `test:visual`, `preview`

## Deliverables

A buildable repository, version inventory, and installation/build evidence.

## Acceptance criteria

- [ ] clean install from lockfile is successful.
- [ ] TypeScript strict and static build are enabled.
- [ ] `site` is equal to `https://mehdiahmadirad.me`.
- [ ] docs/source/articles/assets are in the same repository.
- [ ] command interface is defined and has no deceptive placeholder.

## Verification/evidence

clean install, `check` and `build` with zero exit code.

## Prohibited work

Complete Home or Article pages, a ready-made theme, Tailwind/UI kit, final Pagefind integration, deployment or DNS changes.

## Stop condition

Stop if the selected stable version is incompatible with the existing runtime, or if the scaffold requires the removal of a user file.

## Handoff

prepare TASK-0101 and TASK-0102; Do not create a feature page.
