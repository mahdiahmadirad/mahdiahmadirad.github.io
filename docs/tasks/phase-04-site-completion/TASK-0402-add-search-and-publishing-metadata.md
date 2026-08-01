# TASK-0402 — Add Search and Publishing Metadata

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0401` |
| Specs | `SPEC-003`, `SPEC-004`, `SPEC-005` |

## Objective

Complete static publishing, content discovery and bilingual SEO capabilities.

## In scope

Pagefind, search UI, separate RSS, sitemap, canonical, hreflang, Open Graph, Article JSON-LD and robots.

## Deliverables

build includes index and feed; test for translation states and metadata.

## Acceptance criteria

- [x] Search results are separated based on the active language.
- [x] Persian search is documented with real corpus/fixture and stemming restriction.
- [x] hreflang is only generated for the published version.
- [x] RSS FA/EN and sitemap are parsed.
- [x] metadata comes from the single component and validated data.

## Verification/evidence

See [`TASK-0402-search-and-publishing.md`](../../evidence/TASK-0402-search-and-publishing.md)
for search scenarios, parsed XML, HTML metadata assertions, production-build
output and the `FA/EN × Desktop/Mobile` capture matrix.

## Prohibited work

backend search, analytics, auto-generated translations, fake social URL or third-party tracker.

## Stop condition

If Pagefind’s Persian behavior is unacceptable, document the limitation and request an ADR before replacing the architecture.

## Handoff

TASK-0501.
