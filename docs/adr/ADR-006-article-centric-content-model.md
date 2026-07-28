# ADR-006 — Article-centric Content Model

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-07-29 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-004`, `SPEC-005` |

## Context

The Persian and English versions of the publication are independent, but they belong to the same work in terms of concept and asset.

## Decision

Each work has its own folder:

```text
src/content/articles/{translation-key}/
  fa.md
  en.md
  assets/
```

Each language file has independent schema and lifecycle and the relationship is validated with `translationKey`. The same template can be used for topic, project and content page.

## Consequences

Adding translations and shared assets is discoverable. Loader and schema should cross-validate filename/language, slug and translationKey.
