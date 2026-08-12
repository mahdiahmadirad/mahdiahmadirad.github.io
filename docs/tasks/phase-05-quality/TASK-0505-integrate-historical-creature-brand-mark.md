# TASK-0505 — Integrate Historical Creature Brand Mark

| Field | Value |
|---|---|
| Status | `in-progress` |
| Depends on | `TASK-0504`, owner asset provenance and direction decision |
| Specs | `SPEC-001`, `SPEC-002`, `SPEC-005`, `SPEC-006` |
| ADRs | `ADR-004`, `ADR-005`, `ADR-008` |
| Approver | Mehdi Ahmadirad |

## Objective

Produce and integrate palette-aligned derivatives of the owner-supplied
historical creature as the bilingual Home Hero, localized header wordmark mark
and head-only favicon without weakening accessibility, performance or the
software-native language of technical diagrams.

## Inputs and dependencies

- Owner-supplied source image: `ChatGPT Image Aug 12, 2026 at 01_43_17 PM.png`.
- Owner confirmation on 2026-08-12 that he extracted the image from a
  Seljuk-period bowl and may publish and adapt it without a third-party license
  restriction.
- Owner direction decision: Hero EN faces left, Hero FA faces right; header
  marks face the adjacent localized name.
- Existing immutable Home visual evidence and visual comparison gate.

## In scope

- Preserve the source and document provenance.
- Produce transparent, palette-aligned full-creature Hero/header derivatives.
- Produce a simplified head-only PNG favicon plus 16px, 32px and 180px derivatives.
- Integrate the mark into the global bilingual header and Home Hero.
- Keep technical diagrams elsewhere unchanged.
- Add direction, accessibility, intrinsic-size, responsive and asset checks.
- Capture a new candidate Home matrix for owner review.

## Deliverables

- Versioned source and optimized brand derivatives in `public/images/brand/`.
- Updated global header, Home Hero, favicon metadata and tests.
- Four candidate captures: `FA/EN × Desktop/Mobile`.
- Evidence report with prompts, asset dimensions/bytes, commands and results.

## Acceptance criteria

- [x] Hero EN creature faces left toward copy; Hero FA faces right toward copy.
- [x] Header EN mark is left of and faces the English name; header FA mark is right of and faces the Persian name.
- [x] The mark remains recognizable at the specified header sizes and does not create overflow at 320px.
- [x] Favicon preserves the source head proportions, both eyes and both curls at 16px and 32px, with PNG fallbacks and Apple icon present.
- [x] All rendered mark instances are decorative and do not duplicate the accessible site name.
- [x] The original source remains unchanged and provenance is documented.
- [x] `format:check`, `lint`, `check`, `build`, `test`, `test:e2e` and pre-approval visual capture checks pass.
- [x] Existing approved baseline files and hashes remain unchanged.
- [ ] The owner reviews all four candidate Home captures before any new baseline is approved.

## Verification/evidence

Asset inspection and checksums; DOM direction assertions; keyboard,
accessibility and 320px overflow checks; full quality commands; candidate Home
screenshots and an owner approval/rejection note.

## Prohibited work

Overwriting the supplied source, inventing additional historical ornament,
replacing technical diagrams with the creature, adding a new palette, changing
real content, weakening visual thresholds, or overwriting approved evidence.

## Stop condition

Stop if source provenance changes, clean extraction cannot preserve the
creature, performance budgets cannot be met without visible degradation, or
after presenting the candidate FA/EN desktop/mobile matrix for owner approval.

## Handoff

If approved, record the new visual approval as additive evidence and update the
visual oracle through an explicitly owner-approved corrective step. If rejected,
keep the existing baseline and list bounded corrections.
