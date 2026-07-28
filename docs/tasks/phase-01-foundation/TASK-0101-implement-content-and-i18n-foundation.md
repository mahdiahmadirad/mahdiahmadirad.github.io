# TASK-0101 — Implement Content and i18n Foundation

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0002` |
| Specs | `SPEC-003`, `SPEC-004`, `SPEC-005` |

## Objective

Prove the article-centric content model, symmetric routes and Persian/English typed infrastructure.

## In scope

- Content Collections and article/topic/project/page schemas
- `translationKey` and validation between versions
- typed UI dictionaries
- `/fa/`, `/en/`, `lang`, `dir` and root redirect
- Clearly labeled sample fixtures: two bilingual works and one monolingual work
- locale date/number and bidi helpers

## Deliverables

schema, fixtures, route helpers and validation tests.

## Acceptance criteria

- [ ] Each language version is an independent publication.
- [ ] The existing and non-existing translation is resolved correctly.
- [ ] Unknown topic or invalid metadata will fail the build.
- [ ] code/URL in Persian LTR remains isolated.
- [ ] No visible UI string exists outside the dictionary.

## Verification/evidence

Test schema, draft filtering, translation states, dates/numbers and build both locales.

## Prohibited work

Machine translation, English fallback under Persian URL, query-string locale, Home design or complete SEO.

## Stop condition

If the API Content Collections pinned version is incompatible with the specified structure, propose and stop before changing the ADR model.

## Handoff

Document contract data and locale helpers for TASK-0201.

Completed in [`../../evidence/TASK-0101-content-i18n.md`](../../evidence/TASK-0101-content-i18n.md).
