# TASK-0606 — Publish the second bilingual DaD essay

- **Status:** review
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-04
- **Governing ADRs:** ADR-002, ADR-003, ADR-004, ADR-005, ADR-006, ADR-007
- **Specs:** SPEC-002, SPEC-003, SPEC-004, SPEC-005, SPEC-006
- **Dependencies:** TASK-0605 (done), including its article, publishing and deployment foundations

## Objective

Publish “پروژه باید بتواند خودش را توضیح دهد” and a natural English edition.
Preserve the edited, approved Persian writing block 74218 retrieved in full
from conversation 6a96d243-00e8-83eb-8ce5-028169fcf43a.

## Inputs and assumptions

The owner's explicit request authorizes translation and publication through
the existing feature branch → PR → passing CI → merge → Pages flow.
Persian prose must remain exact, including unconventional wording. Only
diagram markup and an internal link around existing words may change.
The explicit English translation request governs this edition; the general
prohibition on unsolicited automatic translations remains unchanged.

## In scope and deliverables

- Both editions, shared slug/translationKey, software-architecture topic.
- Link to the first essay in each locale; automatic reciprocal language links.
- Reuse the reviewed content-diagram pattern, extending reciprocal connectors.
- Render the three artifact excerpts as quotations rather than code blocks.
- Source-integrity check, bilingual responsive/no-JS/accessibility/metadata checks.
- FA/EN desktop/mobile screenshots and publication evidence.

## Acceptance criteria

- All Persian prose and artifact labels match the approved source.
- English retains the complete reasoning, examples and qualifications.
- Five diagrams preserve relationships and order, fit 320px, and print clearly.
- English diagram labels stay LTR within either locale, without JavaScript.
- Full quality gate passes without modifying approved visual baselines.
- Both production URLs, feeds, sitemap and translation links are verified.

## Verification and evidence

Run npm run quality and capture the four article/diagram views.
Record results in docs/evidence/TASK-0606-dad-project-knowledge.md.

## Prohibited work

Rewriting Persian prose, changing existing articles, schema, global tokens,
dependencies, baseline images, DNS or unrelated product scope.

## Stop condition

Stop if the approved source cannot be recovered or a gate requires unrelated
architectural or content changes.

## Handoff

Report files, URLs, checks, screenshots, deployment and any remaining risks.
