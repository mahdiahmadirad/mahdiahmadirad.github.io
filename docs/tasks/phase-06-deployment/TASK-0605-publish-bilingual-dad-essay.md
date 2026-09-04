# TASK-0605 — Publish the bilingual DaD essay

- **Status:** done
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-04
- **Governing ADRs:** ADR-002, ADR-003, ADR-004, ADR-005, ADR-006, ADR-007
- **Specs:** SPEC-002, SPEC-003, SPEC-004, SPEC-005, SPEC-006
- **Dependencies:** TASK-0301, TASK-0402, TASK-0601 (done)

## Objective

Publish “وقتی ساختن آسان‌تر از فهمیدن می‌شود” and its natural English
edition together, preserving the approved Persian prose exactly.

## Inputs and assumptions

The owner explicitly requests publication, translation and replacement of text
diagrams on 2026-09-04. The source is the full edited writing block `58341`
retrieved from conversation `6a96d243-00e8-83eb-8ce5-028169fcf43a`.
This explicit request authorizes the English translation for this article;
the general prohibition against unsolicited automatic editions remains intact.

## In scope and deliverables

- Two Markdown editions with shared translationKey, publication date and topic.
- A reusable semantic HTML/CSS diagram pattern, using existing design tokens.
- Four ordered flows and two composition lists replacing all six text blocks.
- Topic editions for software architecture, metadata, reciprocal links and feeds.
- Automated checks and FA/EN desktop/mobile evidence.
- Feature branch → pull request → passing CI → merge → Pages verification.

## Acceptance criteria

- Persian prose matches the retrieved source after removing title/diagram markup.
- English preserves the complete argument, qualifications and examples.
- Diagrams retain label order, work without JS, print legibly and fit 320px.
- Technical English labels remain LTR within the RTL Persian page.
- Metadata, translations, RSS, sitemap and Pagefind include both editions.
- All repository quality gates pass without changing approved baselines.

## Verification and evidence

`npm run quality`; targeted no-JS, diagram-order, responsive, accessibility and
metadata checks; screenshots in `docs/evidence/`; CI and production smoke checks.

## Prohibited work

Rewriting Persian prose, adding unrelated product scope, changing existing
article copy, dependencies, schema, global tokens, baseline images or DNS.

## Stop condition

Stop if the complete approved source cannot be recovered, or a required gate
cannot be satisfied without an unrelated architectural or content change.

## Handoff

Record files, commands, screenshots, source-integrity evidence, CI/deployment
URLs and remaining risks in `docs/evidence/TASK-0605-bilingual-dad-essay.md`.

Implementation and all acceptance criteria verified locally and in [PR #5 CI](https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/actions/runs/33874974913).
See [evidence](../../evidence/TASK-0605-bilingual-dad-essay.md).
The verified release proceeds through main and the Pages workflow; live smoke
results are reported in the publication handoff. No next implementation task.
