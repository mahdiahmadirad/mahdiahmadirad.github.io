# ADR-004 — Engineering Editorial Design

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-07-29 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-001`, `SPEC-002`, `SPEC-006` |

## Context

The site should be personal and technical, serious but not corporate, and minimal but with identity. Long essay is the main priority.

## Decision

The visual language is **Engineering Editorial**: a warm off-white background, dark navy text, restrained brick accents, secondary lapis, fine rules, white space, row-based lists and editorial typography.

Custom CSS and centralized design tokens are used. Card grids, heavy shadows, large radii, terminal aesthetics and ready-made themes are not primary patterns.

## Consequences

Home and Article must be approved as a visual slice before developing the rest of the pages. Token change requires regression review of both languages.
