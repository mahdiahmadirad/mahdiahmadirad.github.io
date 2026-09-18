# TASK-0612 — Prevent article rail overlap

- **Status:** done
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-18
- **Governing ADRs:** ADR-002, ADR-003, ADR-004
- **Specs:** SPEC-002, SPEC-003, SPEC-005, SPEC-006
- **Dependencies:** TASK-0301 (done), TASK-0302 (done)

## Objective

Keep the desktop article table of contents sticky while preventing it from overlapping the permalink and related-articles support content below it.

## In scope and deliverables

- Constrain the sticky table of contents to the article-body region.
- Preserve the existing desktop rail composition and mobile disclosure order.
- Add a regression check for overlap after scrolling a long Persian article.
- Record bilingual desktop/mobile visual evidence and verification results.

## Acceptance criteria

- On desktop, the sticky table of contents stops before the article-support region and never covers its permalink or related links.
- On mobile, the table of contents remains a non-sticky disclosure before the article body.
- Persian and English article layouts retain their approved reading widths and direction behavior.
- Previous/next navigation and related-article selection logic remain unchanged.
- Format, lint, type, unit, build, behavior and accessibility checks pass.

## Verification/evidence

Verified by `docs/evidence/TASK-0612-article-rail-overlap.md` and GitHub Actions
CI run `35372135231`, including bilingual overlap checks, accessibility tests
and the unchanged approved visual baselines.

## Prohibited work

Changing previous/next ordering, related-article selection, article content, design tokens, dependencies, approved visual baselines or unrelated page layouts.

## Stop condition

Stop if preventing the overlap requires a token change, content-model change, navigation-policy decision or approved-baseline update.

## Handoff

The sticky TOC is now bounded by the article body and stops before support
links. Article-series navigation remains a separate product decision.
