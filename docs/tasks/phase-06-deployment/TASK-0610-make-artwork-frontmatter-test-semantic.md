# TASK-0610 — Make artwork tests content-semantic

- **Status:** done
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-06
- **Governing ADRs:** ADR-006, ADR-010
- **Specs:** SPEC-004, SPEC-005
- **Dependencies:** TASK-0501, TASK-0609 (done)

## Objective

Make the article-artwork regressions validate content relationships without
requiring one non-semantic YAML quoting style or one hard-coded featured essay.

## In scope and deliverables

- Parse the small `cover` mapping used by the source-level artwork regression.
- Require the expected article-specific `hero.webp` path and non-empty localized
  alt text for all four bilingual pilot articles.
- Accept equivalent quoted and unquoted YAML scalar values.
- Verify that Home's selected featured article renders its own artwork without
  duplicating the current editorial selection in the E2E test.

## Acceptance criteria

- The regression fails for a missing cover, an unexpected artwork path or empty
  alt text.
- Equivalent quoted and unquoted cover scalars pass.
- Changing the valid featured article does not require changing the Home E2E
  expectation.
- Format, lint, type, unit and production-build checks pass.
- Production templates, content and visual baselines remain unchanged.

## Verification/evidence

Record the relevant command results in
`docs/evidence/TASK-0610-artwork-frontmatter-test.md`.

## Prohibited work

Removing artwork coverage, weakening path or alt-text checks, changing article
content, or updating approved visual baselines.

## Stop condition

Stop if the failure reveals invalid production content rather than a
representation-only mismatch in the test.

## Handoff

The corrective source test and the non-visual quality gate pass. See
`docs/evidence/TASK-0610-artwork-frontmatter-test.md`.
