# ADR-012 — Density-calibrated editorial layout

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-09-18 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-002`, `SPEC-006` |
| Refines | `ADR-004`, `ADR-008`, `ADR-010` |

## Context

The released visual language is intentionally minimal and editorial, but its
desktop scale combines a large display-title ceiling, uniformly generous
section spacing, an almost viewport-height Home Hero and prominent square
artwork. Together these choices make browsing and moving between essays feel
slower than the content-led product intent in `SPEC-001`.

The issue is density and hierarchy, not the palette, typeface choices, grid or
illustration language. Mobile minimum sizes should remain readable, and
Persian and English must be tuned as distinct scripts rather than assigned an
identical line-height.

## Decision

Run a reversible visual pilot that:

- preserves the Engineering Editorial language, content order and components;
- reduces the desktop ceiling of the typographic scale while keeping compact
  viewport minimums close to the approved values;
- changes Persian reading leading from `1.95` to `1.78` and English from
  `1.68` to `1.62`;
- changes the shared section-space ceiling from `8rem` to `5rem`;
- reduces the header, Home Hero, brand creature, Featured artwork and Article
  artwork footprint;
- keeps body copy at `1rem–1.0625rem`, avoiding a small-text solution to a
  hierarchy problem.

Whitespace remains intentional but varies by surface: identity may stay more
open, reading surfaces use a moderate rhythm and browsing lists are denser.

## Approval boundary

The product owner explicitly approved the changes and requested a push to
`origin/main` after reviewing the captures. TASK-0613 captures are the accepted
visual review evidence. Older evidence remains immutable historical evidence.
SPEC-002 and SPEC-006 now describe this accepted density contract.

## Rejected alternatives

- Full redesign: the existing identity is not the problem being tested.
- Shrinking body text aggressively: it would trade density for readability.
- Applying one line-height to both scripts: Persian and Latin reading rhythm
  require separate calibration.
- Scaling the rendered page with transforms: it breaks layout semantics and
  responsive behavior.
