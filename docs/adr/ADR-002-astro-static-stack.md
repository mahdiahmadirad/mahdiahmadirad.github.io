# ADR-002 — Astro Static Stack

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-07-29 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-001`, `SPEC-005` |

## Context

The product is content-oriented and does not require a runtime server, database or SPA; At the same time, custom design, Markdown/MDX, content schema and bilingual routes are required.

## Decision

The stack of the first version:

`Astro + TypeScript strict + Markdown/MDX + custom CSS + SVG + Pagefind + Playwright`

The output is static. JavaScript hydrates only for small, essential interactions.

## Consequences

- high performance and archivability; simple hosting
- Schema and build-time validation for content.
- search after build and without backend.
- Dependencies and actions must be exact and lockfile committed.

## Rejected alternatives

Next.js or an SPA, because the runtime and hydration are unnecessary; Jekyll or a ready-made theme, because of design and bilingual-architecture constraints; CMS/WordPress, because they fall outside GitHub Pages and the v1 scope.
