# ADR-010 — Conceptual Artifact Artwork for Articles

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-09-05 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-002`, `SPEC-003`, `SPEC-004`, `SPEC-005` |
| Refines | `ADR-004`, `ADR-005`, `ADR-008` |

## Context

The owner wants each essay to be able to carry a small, semantically related
work that feels like an imagined historical object: primitive, handmade and
specific to the essay, but without claiming historical provenance. The
historical creature already remains the personal brand mark; a second fixed
sun or seal would compete with it and resemble contemporary AI branding.

## Decision

- Allow an optional square raster artwork in article `cover` metadata.
- Treat it as editorial content, not as a logo, badge, historical document or
  replacement for the historical-creature brand mark.
- Show it only on the article's own page and, when that article is selected,
  in the Home `Featured writing` section.
- Do not show article artwork in recent-writing rows, article/topic indexes,
  search results, related-writing links, feeds or navigation.
- Use a restrained pilot vocabulary: off-white paper, black line or ink, at
  most one brick accent, simple geometry, visible handmade irregularity and a
  concept derived from the essay. Do not add a recurring seal or emblem.
- Share one artwork across language editions of the same conceptual article;
  localize its meaningful alt text independently.
- Store optimized web derivatives with dimensions and provenance. Preserve
  the generated source separately when it is needed for later iteration.

## Consequences

This is a bounded editorial-image exception to the raster prohibition in
`ADR-005`; software diagrams inside articles remain accessible, hand-coded
graphics. The pilot can be evaluated without turning the entire site into a
historical theme, and lists remain text-led. A later decision may refine or
replace the visual vocabulary without changing the content model.

## Rejected alternatives

- A fixed brick sun/seal: it competes with the established creature and can be
  mistaken for another brand mark.
- Artwork on every article listing: it makes the archive image-led and weakens
  the current editorial hierarchy.
- Faux archaeological captions or dates: the works have no historical claim.
- Reusing one random motif: each work must gain meaning from its article.
