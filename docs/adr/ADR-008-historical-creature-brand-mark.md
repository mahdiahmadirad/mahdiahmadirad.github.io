# ADR-008 — Historical Creature as the Personal Brand Mark

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-08-12 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-001`, `SPEC-002`, `SPEC-005`, `SPEC-006` |
| Refines | `ADR-004`, `ADR-005` |

## Context

The owner supplied an image that he personally extracted from a historical
Seljuk-period bowl and confirmed that he may publish and adapt it without a
third-party license restriction. The creature has been selected as a personal
mark for the site header, Home Hero and favicon.

The earlier visual decision reserved identity-defining graphics for abstract,
software-native SVG and prohibited an attached historical motif. That rule
protected the site from generic or stereotypical decoration, but it also
excludes this owner-selected, source-specific personal mark.

## Decision

The supplied creature is an explicit, bounded exception to `ADR-005`:

- it is the site's personal brand mark, not a metaphor for software
  architecture and not a general decorative vocabulary;
- the Home Hero may use a derived raster or vector-friendly rendition of the
  complete creature with a transparent background;
- the global header uses a compact complete-creature rendition next to the
  localized author name;
- the favicon uses a deliberately simplified head-only rendition;
- English and Persian remain equally authored compositions rather than one
  blindly mirrored page.

Directional behavior is semantic:

| Placement | English | Persian |
|---|---|---|
| Home Hero | creature on the right, head facing left toward the copy | creature on the left, head facing right toward the copy |
| Header wordmark | mark on the left of the name, head facing right toward the name | mark on the right of the name, head facing left toward the name |

The source image is preserved unchanged. Web derivatives are non-destructive,
optimized and recolored to the approved Engineering Editorial palette. The
mark must not introduce domes, buildings, tile patterns, national symbols or
new pseudo-historical ornament.

Software-native node, edge, state and flow graphics remain the visual language
for diagrams, article graphics and technical concepts.

## Accessibility and asset policy

- The header mark is part of a text wordmark and is decorative there.
- The Hero mark is decorative because adjacent text supplies the page identity.
- Decorative instances use empty alternative text or `aria-hidden="true"`.
- The mark must remain recognizable without relying on color alone.
- Fixed intrinsic dimensions must prevent layout shift.
- The original and derivatives require provenance documentation in the public
  asset directory before release.

## Consequences

- `SPEC-002`, `SPEC-005` and `SPEC-006` require a bounded update.
- The four Home visual baselines must be reviewed again by the owner; existing
  approved evidence remains immutable historical evidence.
- Header changes affect all localized routes and require responsive,
  accessibility, print and overflow checks.
- The favicon needs small-size review at 16, 32 and 180 CSS pixels.

## Rejected alternatives

- Keeping the source photograph unchanged: its gray-brown background and low
  contrast conflict with the site palette and create unnecessary weight.
- Cropping the original photograph directly for the favicon: the head loses
  recognition at browser-tab size.
- Replacing every software diagram with the creature: this confuses personal
  identity with technical meaning.
- Mirroring all instances from document direction alone: Hero and header have
  different relationships between mark and text.
