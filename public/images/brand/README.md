# Historical creature brand assets

## Provenance and permission

Mehdi Ahmadirad supplied `historical-creature-source.png` on 2026-08-12. He
states that he personally extracted the creature from a historical
Seljuk-period bowl and that no third-party license restricts his publication or
adaptation of this extraction.

The source is retained unchanged. Its SHA-256 at intake is:

```text
05e332366c9c1a447a678a381e52dbd232cfb24558ee0b4cca91b81dc5ef9882
```

## Derivatives

- `historical-creature-hero.webp`: transparent, palette-aligned full creature
  for the Home Hero.
- `historical-creature-header.webp`: compact full-creature derivative for the
  global wordmark.
- `historical-creature-head.png`: transparent, faithful two-eye head used to
  derive favicon and touch-icon sizes.

The full-creature and head derivatives were created with the built-in OpenAI
image editing tool. Flat green chroma-key output was removed locally with the
ImageGen skill's `remove_chroma_key.py`; final resizing used Pillow with Lanczos
resampling. Placement-specific mirroring is performed in CSS according to
`ADR-008`.

## Full-creature edit prompt

Preserve the exact creature, pose, proportions, facial expression, silhouette,
raised foreleg, wings, curled tail, crown-like head edge and historically
irregular hand-drawn character. Remove the photographic background. Use
`#18222d` for primary lines, `#f7f4ed`/`#fcfaf6` for the light body, restrained
`#a34b35` and very restrained `#304f68`. Preserve handmade variation and a
small amount of aged surface texture. Do not add text, symbols, architecture,
tilework, national emblems, software icons, a badge, frame or shadow.

## Favicon edit prompt

Isolate the creature's complete original head and immediately attached hair
curls. Preserve its tall slanted trapezoidal proportions, crown-like top edge,
both visible almond-shaped eyes and eyebrows, nose, smiling mouth, jawline, the
prominent spiral on the image-right side and the lower spiral on the image-left
side near the jaw. Exclude the body and necklace, but do not omit, merge,
relocate or invent any facial feature or curl. Retain the asymmetric historical
line; only clean contrast and strengthen essential outlines for reduction. Do
not turn it into a side-profile mascot or add a container, badge, text, symbol
or shadow.
