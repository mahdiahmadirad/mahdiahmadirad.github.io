# TASK-0402 — Add Search and Publishing Metadata

| Field | Value |
|---|---|
| Status | `blocked` |
| Depends on | `TASK-0401` |
| Specs | `SPEC-003`, `SPEC-004`, `SPEC-005` |

## Objective

Complete static publishing, content discovery and bilingual SEO capabilities.

## In scope

Pagefind, search UI, separate RSS, sitemap, canonical, hreflang, Open Graph, Article JSON-LD and robots.

## Deliverables

build includes index and feed; test for translation states and metadata.

## Acceptance criteria

- [ ] Search results are separated based on the active language.
- [ ] Persian search is documented with real corpus/fixture and stemming restriction.
- [ ] hreflang is only generated for the published version.
- [ ] RSS FA/EN and sitemap are parsed.
- [ ] metadata comes from the single component and validated data.

## Verification/evidence

search scenarios, XML validation, HTML metadata assertions and build production.

## Prohibited work

backend search, analytics, auto-generated translations, fake social URL or third-party tracker.

## Stop condition

If Pagefind’s Persian behavior is unacceptable, document the limitation and request an ADR before replacing the architecture.

## Handoff

TASK-0501.
