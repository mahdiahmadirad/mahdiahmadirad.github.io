# TASK-0405 — Publish Persian Loop Essay

| Field | Value |
|---|---|
| Status | `in-progress` |
| Depends on | Owner-approved Persian article copy |
| Specs | `SPEC-003`, `SPEC-004`, `SPEC-005` |
| ADRs | `ADR-001`, `ADR-003`, `ADR-006`, `ADR-007` |
| Approver | Mehdi Ahmadirad |

## Objective

Publish the owner-edited Persian essay «بازگشت به همان‌جا، اما نه همان آدم» as
a genuine monolingual article, while preserving the independent lifecycle of a
future English edition.

## Inputs and dependencies

- The owner-edited Persian copy approved for publication on 2026-09-03.
- The existing Article content schema, localized routes, RSS, sitemap and
  truthful missing-translation behavior.
- The owner-selected Netherlands Bach Society performance of
  `Canon a 2 per tonos` on YouTube.

## In scope

- Add the Persian article and localized metadata.
- Link the first mention of `Canon per Tonos` to its YouTube performance.
- Add a real Persian topic for complex systems.
- Verify the Persian route, external performance link, missing English edition,
  RSS, sitemap and repository quality gates.

## Deliverables

- `src/content/articles/same-place-different-self/fa.md`.
- `src/content/topics/complex-systems/fa.md`.
- Focused publishing assertions and verification evidence.

## Acceptance criteria

- [ ] The Persian article renders at `/fa/articles/same-place-different-self/`.
- [ ] The first `Canon per Tonos` mention links to the selected YouTube video.
- [ ] No English article or English `hreflang` is fabricated.
- [ ] The article appears in the Persian RSS feed and sitemap.
- [ ] Content validation, formatting, linting, build and focused publication
      checks pass.

## Verification/evidence

Command results and route/metadata assertions recorded in
`docs/evidence/TASK-0405-persian-loop-essay.md`.

## Prohibited work

Publishing a machine-generated English edition, changing the owner-edited
article beyond the requested link and required frontmatter, altering visual
tokens, weakening tests or changing approved visual baselines.

## Stop condition

Stop if the edited article cannot satisfy the existing content schema without
changing its meaning, the selected recording is unavailable, or publishing
requires a content-schema or URL decision.

## Handoff

Pending verification and production publication.
