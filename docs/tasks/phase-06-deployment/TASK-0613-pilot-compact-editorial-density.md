# TASK-0613 — Pilot compact editorial density

- **Status:** done
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-18
- **Governing ADRs:** ADR-004, ADR-008, ADR-010, ADR-012 (accepted)
- **Specs:** SPEC-001, SPEC-002, SPEC-003, SPEC-005, SPEC-006
- **Dependencies:** TASK-0612 (done)

## Objective

Produce a reversible branch and bilingual visual evidence for a more compact
desktop reading and browsing rhythm without redesigning the blog.

## In scope and deliverables

- Reduce the desktop type-scale ceiling and shared vertical spacing.
- Tune Persian and English reading leading independently.
- Reduce the Home Hero, historical creature, Featured artwork and Article
  artwork footprint.
- Preserve content, routes, component order, palette, fonts and artwork.
- Capture Home and Article evidence for FA/EN at desktop and mobile sizes.

## Acceptance criteria

- A 1440×1100 Home viewport exposes substantially more content than the
  approved layout while preserving a clear Hero and Featured hierarchy.
- Article title, deck, metadata and optional artwork remain legible but occupy
  less vertical and visual space on desktop.
- Persian and English each retain natural reading rhythm and correct direction.
- Compact viewports retain readable type, 44px targets and natural stacking.
- Existing functional, accessibility, build and overflow checks pass.
- Existing approved visual baselines remain unchanged and may report expected
  visual differences during this approval pilot.

## Verification/evidence

- `docs/evidence/TASK-0613-density-review.md`
- `docs/evidence/TASK-0613-home-{fa|en}-{desktop|mobile}.png`
- `docs/evidence/TASK-0613-{home|article}-{fa|en}-{desktop|mobile}-viewport.png`
- Format, lint, type, unit, build, behavior and accessibility results.

## Prohibited work

Changing content, navigation behavior, article selection, palette, font
families, image sources, content schema, dependencies or approved baselines.

## Stop condition

Stop for product-owner review after the bilingual evidence is produced. Do not
accept ADR-012, change the normative SPEC token values or merge the pilot
without explicit approval.

## Handoff

The product owner approved the visual changes and explicitly requested a push
to origin/main. ADR-012 is accepted and the normative SPEC values are updated.
The next step is deployment verification, not another visual approval gate.
