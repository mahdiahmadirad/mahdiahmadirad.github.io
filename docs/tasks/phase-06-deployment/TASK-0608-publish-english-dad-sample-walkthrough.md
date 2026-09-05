# TASK-0608 — Publish the English edition of the third DaD essay

- **Status:** review
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-05
- **Governing ADRs:** ADR-002, ADR-003, ADR-004, ADR-005, ADR-006, ADR-007
- **Specs:** SPEC-002, SPEC-003, SPEC-004, SPEC-005, SPEC-006
- **Dependencies:** TASK-0607 (done), including its approved Persian source, diagrams and production route

## Objective

Publish a natural English edition of “ساختن یک پروژه با Document-Aware
Development” as the corresponding edition of the third DaD essay.

## Inputs and assumptions

The owner's 2026-09-05 request explicitly authorizes this English edition.
The Persian article remains authoritative for the argument, examples,
qualifications and intentionally future-facing Drift section. The translation
may read naturally in English but must not add claims or imply that the planned
Drift experiment has already happened.

## In scope and deliverables

- English Markdown beside the Persian edition with the same translation key,
  slug, date and topic.
- Same-locale links to the two earlier English DaD essays and the unchanged
  `DaD` and `DaD-sample` repositories.
- Reuse all six semantic diagrams with localized accessible names.
- Translation, reciprocal metadata, responsive, no-JS, accessibility, feed,
  sitemap, Pagefind and visual evidence checks.
- Feature branch → pull request → passing CI → merge → Pages verification.

## Acceptance criteria

- The English edition preserves every section, example, distinction and open
  question from the Persian article.
- Drift remains explicitly planned for a later repository iteration.
- Both language controls, canonicals and reciprocal hreflang values are valid.
- Both RSS feeds, sitemap and Pagefind expose the correct edition.
- Six diagrams preserve their labels and relationships at 320px and in print.
- The full quality gate passes without changing approved visual baselines.

## Verification and evidence

Run `npm run quality`, targeted bilingual article checks and English
desktop/mobile capture. Record results in
`docs/evidence/TASK-0608-english-dad-sample-walkthrough.md`.

## Prohibited work

Changing Persian prose, implying the Drift experiment is complete, adding new
claims, changing schema/dependencies/tokens/baselines/DNS or unrelated scope.

## Stop condition

Stop if a complete natural translation cannot preserve the source argument or
if a gate requires unrelated architectural or content changes.

## Handoff

Report the English URL and path, reciprocal publication behavior, checks,
screenshots, PR, merge/deployment commits and remaining risks.

The complete local quality gate and English desktop/mobile visual review pass.
Publication is awaiting pull-request CI, merge and production verification.
