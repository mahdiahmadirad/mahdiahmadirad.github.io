# TASK-0607 — Publish the third DaD essay

- **Status:** review
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-05
- **Governing ADRs:** ADR-002, ADR-003, ADR-004, ADR-005, ADR-006, ADR-007
- **Specs:** SPEC-002, SPEC-003, SPEC-004, SPEC-005, SPEC-006
- **Dependencies:** TASK-0605 and TASK-0606 (done), including their article, diagram, publishing and deployment foundations

## Objective

Publish «ساختن یک پروژه با Document-Aware Development» as the third DaD
essay, using the owner's edited Persian Markdown attachment as the canonical
source and preserving its voice, wording and intentionally future-facing Drift
section.

## Inputs and assumptions

The complete edited file `ساختن یک پروژه با Document-Aware Development.md`
was recovered from conversation `6a96d243-00e8-83eb-8ce5-028169fcf43a`.
The owner authorizes publication through the existing feature branch → pull
request → passing CI → merge → Pages flow. No English edition is authorized;
the existing honest missing-translation state applies under ADR-003.

## In scope and deliverables

- One Persian article edition with a stable ASCII slug and the existing
  software-architecture topic.
- Links to both earlier Persian DaD essays and to the verified `DaD` and
  `DaD-sample` repositories.
- Reuse the approved static article-diagram pattern for the source's proposed
  diagrams and structural text flows, without changing the prose.
- Source-integrity, monolingual metadata, responsive, no-JS, accessibility,
  feed, sitemap, Pagefind and external-link checks.
- Persian desktop/mobile screenshots and publication evidence.

## Acceptance criteria

- Published Persian prose matches the edited source after excluding its h1 and
  replacing only presentation placeholders/text diagrams with semantic figures.
- The Drift section still says the intentional inconsistency will be created in
  a later repository iteration; it must not imply that work is complete.
- No English article or placeholder route is generated.
- The language control exposes the established unavailable-translation state.
- Diagrams preserve source labels and relationships, fit 320px, remain useful
  without JavaScript and print clearly.
- `DaD`, `DaD-sample`, earlier-essay, RSS, sitemap and canonical links resolve.
- The complete repository quality gate and PR CI pass without changing approved
  visual baselines.

## Verification and evidence

Run `npm run quality`, targeted source/metadata/link tests and Persian article
capture. Record the results in `docs/evidence/TASK-0607-dad-sample-walkthrough.md`.

## Prohibited work

Rewriting or normalizing the Persian prose; claiming the Drift experiment was
performed; creating an unsolicited English translation; changing schema,
dependencies, global tokens, approved visual baselines, DNS or unrelated scope.

## Stop condition

Stop if the complete source cannot be recovered, either repository link is not
valid, or a required gate needs an unrelated architectural or content change.

## Handoff

Report the article path and URL, source-integrity evidence, checks, screenshots,
PR, merge/deployment commits and any remaining risk.

The complete local quality gate and visual review pass. Publication is awaiting
pull-request CI, merge and production verification; see the linked evidence.
