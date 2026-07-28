# ADR-003 — First-class Bilingual Routing

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-07-29 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-003`, `SPEC-004`, `SPEC-005` |

## Context

Persian and English must be two first-class experiences. An article may be published in one or both languages and on different dates.

## Decision

- Both languages have prefixes: `/fa/` and `/en/`.
- Each version has its own URL, metadata and lifecycle.
- `translationKey` links corresponding versions.
- root, `lang` and `dir` are correct; CSS logical properties are mandatory.
- A non-existent translation will be displayed honestly and a fake page will not be created.

## Consequences

Canonical URLs, hreflang, RSS, Pagefind and date/number formatting must be locale-aware. Code, URLs and identifiers in Persian text remain LTR and isolated.

## Rejected alternatives

language query-string, default language without prefix, English fallback under Persian URL and published automatic translation.
