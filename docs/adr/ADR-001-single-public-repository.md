# ADR-001 — Single Public Repository

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-07-29 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-001`, `SPEC-004`, `SPEC-005` |

## Context

Blog depends on source, template, CSS, article, asset and decision documentation. Separating theme and content complicates the versioning and changing of content components for no reason.

## Decision

A public repository is maintained including Astro source, articles, `docs/`, tests and public assets. The same repository is the input of GitHub Actions and GitHub Pages.

## Consequences

- Content and renderer changes can be tracked in a commit.
- DaD remains next to implementation.
- source and CSS are public; This is accepted.
- Secrets, private draft, unlicensed asset and temporary artifact are not committed.

## Rejected alternatives

- Separate repository for theme: package release overhead and version coordination.
- private repository for source and public for output: workflow complexity without the need of the first version.
