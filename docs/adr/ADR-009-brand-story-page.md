# ADR-009 — Brand Story as an About Subpage

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-08-30 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-003`, `SPEC-004`, `SPEC-005` |
| Refines | `ADR-003`, `ADR-006`, `ADR-008` |

## Context

The owner has authored a first-person account of the historical creature used
as the blog's personal mark. The text explains the Iranian historical source,
the owner's interpretation of the imagined creature and its relationship to
the evolving nature of software engineering.

The work is identity content rather than a dated editorial article. Publishing
it through the Article template would add unrelated article metadata, cover,
topic, RSS, related-writing and pager behavior. Replacing the main About page
would also conflate the author's professional introduction with the story of a
single brand element.

## Decision

- Publish the work as a dedicated Content Collection page under
  `/{locale}/about/historical-creature/` for each genuinely authored edition.
- Keep `/{locale}/about/` as the author's primary About page and expose the
  brand story from a subordinate section there.
- Do not add a fifth global-navigation destination. The existing About item is
  the stable parent concept.
- Do not change the header or Home Hero mark into an interactive link. Those
  placements remain decorative beside accessible identity text under
  `ADR-008`.
- Render the page with About/editorial typography, semantic figures and an
  optional local table of contents, without article dates, topics, RSS,
  related-writing or previous/next navigation.
- Generate only authored language editions. When the corresponding edition is
  unavailable, disclose that state and link the language control to the other
  locale's About landing page.
- Treat photographs of the historical object as page content rather than as a
  reusable identity vocabulary. Record source, rights basis and attribution
  beside the versioned assets.

## Consequences

- `SPEC-003` gains an optional localized About subpage and discovery rule.
- `SPEC-004` documents independent lifecycle behavior for general pages.
- `SPEC-005` gains a bounded static route and page-specific visual checks.
- The existing Home, Article, header and brand-mark visual contracts remain
  unchanged.

## Rejected alternatives

- Publishing the story as a normal article: incorrect metadata and discovery
  model.
- Replacing the author's About page: it removes the distinct professional
  identity purpose defined by `SPEC-003`.
- Adding a primary-navigation item: the story is subordinate and does not need
  global prominence.
- Publishing a placeholder or machine-translated English edition: prohibited
  by `ADR-003`.
