# TASK-0102 — Implement Design System Foundation

| Field | Value |
|---|---|
| Status | `blocked` |
| Depends on | `TASK-0002` |
| Specs | `SPEC-002`, `SPEC-006` |

## Objective

Implement tokens, typography, layout primitives and internal page design system for FA/EN.

## In scope

- tokens, reset, global, typography and print baseline
- BaseLayout, SkipLink, Header/Footer primitive
- Examples of heading, prose, link, focus, list, quote, table, code, callout and row
- Software SVG primitive
- fallback fonts; self-host only with clear licensing permission

## Deliverables

A `/design-system/` page excluded from production indexing, plus compact/wide FA/EN screenshots.

## Acceptance criteria

- [ ] The warm off-white/navy/brick/lapis palette matches the SPEC.
- [ ] Typography and reading width of each language is independent.
- [ ] Logical properties and a clear focus indicator are used.
- [ ] The page has no overflow at 320px.
- [ ] SVG uses node/edge/module/flow and has no building architecture.

## Verification/evidence

Screenshots of four modes, contrast check and keyboard smoke test.

## Prohibited work

Final Home, showy animation, unlicensed fonts, excessive cards/shadows/radii, or a self-approved baseline.

## Stop condition

If the agreed fonts are not legally hostable or the required token conflicts with the SPEC, report stop and options.

## Handoff

Register visual primitives and constraints for TASK-0201.
