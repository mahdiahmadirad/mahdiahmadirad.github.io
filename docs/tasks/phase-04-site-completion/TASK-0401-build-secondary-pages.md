# TASK-0401 — Build Secondary Pages

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0302` approved |
| Specs | `SPEC-001`, `SPEC-003`, `SPEC-004` |

## Objective

Complete the IA first version by reusing approved patterns.

## In scope

Topics index/detail, Projects index, About and 404 in both languages; navigation/footer localized.

## Deliverables

Complete routes and obvious fixtures for at least three topics, two projects and bilingual About.

## Acceptance criteria

- [x] An empty Topic page will not be published.
- [x] Projects are curated and not automatic GitHub dumps.
- [x] About does not contain fake content.
- [x] The 404 page links to both language Home pages and Search.
- [x] Mobile priority and the approved visual system have been preserved.

## Verification/evidence

route matrix, internal-link check and representative snapshot of each page type.

## Prohibited work

Project detail, Notes/Now, newsletter, CMS, card redesign or personal profile scraping.

## Stop condition

If an actual personal About/link is required, leave an obvious placeholder and stop for content; Do not invent reality.

## Handoff

TASK-0402.

Completed in [`../../evidence/TASK-0401-secondary-pages.md`](../../evidence/TASK-0401-secondary-pages.md).
