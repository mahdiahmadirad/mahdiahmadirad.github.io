# TASK-0505 — Historical Creature Brand Mark Evidence

| Field | Value |
|---|---|
| Task | `TASK-0505` |
| Date | 2026-08-12 |
| Outcome | Candidate implementation complete; waiting for owner visual approval |
| Decision | `ADR-008` |

## Outcome

The owner-supplied Seljuk-period creature is integrated as a transparent,
palette-aligned personal mark:

- Home Hero EN: full creature on the right, facing left toward the copy.
- Home Hero FA: full creature on the left, facing right toward the copy.
- Header EN: compact creature left of and facing the English name.
- Header FA: compact creature right of and facing the Persian name.
- Favicon: faithful head-only artwork preserving both eyes, the original proportions and both curls at 512, 32, 16 and 180 pixels.

Technical node/edge graphics outside the Home Hero remain unchanged. Existing
approved Home screenshots remain unchanged and retain their recorded hashes.

## Source and asset evidence

The owner confirmed on 2026-08-12 that he personally extracted the supplied
image from a historical Seljuk-period bowl and may publish and adapt it without
a third-party license restriction. Detailed provenance, transformation method
and final prompts are recorded in
[`../../public/images/brand/README.md`](../../public/images/brand/README.md).

| Asset | Dimensions | Size | SHA-256 |
|---|---:|---:|---|
| Source PNG | 1536×1024 | 2.8 MB | `05e332366c9c1a447a678a381e52dbd232cfb24558ee0b4cca91b81dc5ef9882` |
| Hero WebP | 902×800 | 153 KB | `51b06296fa75f5be1949ab606054cffcb237ed573cc0ae8f617f5580ca427c95` |
| Header WebP | 180×160 | 16 KB | `433fa09a4479cbe76c6a2248053c9e2e1b0fb075bc1fe16cfed3c169d1bee19d` |
| Head PNG | 512×512 | 256 KB | `015c3cf3aa47a98b89a6877f342544a45dc6fdeae84055b5942d9d10421819c1` |
| Favicon 32 PNG | 32×32 | 1.9 KB | `cda4632e875a83a3467d89468317f426986f63b12b431e2b587620770e927cd8` |
| Favicon 16 PNG | 16×16 | 781 B | `fbf99db34d8f5a051eb244912aa6d5fc68e355e3a155ddf0c5c9a4e608c49df9` |
| Apple touch icon | 180×180 | 34 KB | `01af4074b5ca2fface4a23ed92b55e52ae42ed92432e8163f6989c1987c1d464` |

The built-in OpenAI image editing tool produced the two source derivatives on
a flat green background. The ImageGen skill's chroma-key helper produced alpha
output. Pillow created responsive dimensions and optimized WebP/PNG outputs.
The Hero decreased from a 598 KB lossless candidate to a 153 KB high-quality
WebP without a visible layout or recognition change.

## Candidate visual matrix

These files are additive review evidence, not replacements for TASK-0201's
approved files:

| Locale | Viewport | SHA-256 |
|---|---|---|
| [EN desktop](TASK-0505-home-en-desktop.png) | 1440×1100 viewport, full page | `fe63c1a19fe7086d8af41ae5ca831f4618f09e598d5f3133a77d3ebacf7454d7` |
| [EN mobile](TASK-0505-home-en-mobile.png) | 390×844 viewport, full page | `2d63a40ca17ce3911a5b6e61221526a34e6759679405ed292f436723974b99bf` |
| [FA desktop](TASK-0505-home-fa-desktop.png) | 1440×1100 viewport, full page | `e6effbabdb242b63328a2ed61f4ad1a50b489b05947d1e90fb5a585484cb1d94` |
| [FA mobile](TASK-0505-home-fa-mobile.png) | 390×844 viewport, full page | `efc4307ec0d4c257843eddc0b7d7e37c3dfb09e436a60d53e06f84a71869e8db` |

Manual review confirms:

- transparent edges have no visible chroma-key fringe on the canvas;
- the source orientation and all four required placement directions are correct;
- header marks render at 40 px wide-layout height and 32 px compact height;
- mobile keeps text before the Hero image and does not overflow at 320 px;
- the mark retains the existing ink, canvas, brick and restrained-lapis palette;
- the favicon preserves both eyes, the original slanted proportions and both curls, and remains recognizable at 16 and 32 px.

## Commands and results

```text
npm run format:check
PASS — all files formatted

npm run lint
PASS

npm run check
PASS — 83 files, 0 errors, 0 warnings, 0 hints

npm run test
PASS — 19/19

npm run build
PASS — 27 pages; Pagefind indexed 21 pages in en/fa

npm run validate:build
PASS — 27 HTML documents; CSS 18,430 bytes gzip; maximum initial JS 997 bytes gzip

npm run test:e2e
PASS — 90/90 desktop/mobile behavior and accessibility tests

npm run evidence:brand-candidate
PASS — four additive full-page captures created
```

`npm run test:visual` is intentionally deferred at this approval gate. It
correctly compares against the immutable TASK-0201 owner-approved Home images,
and this intentional visual change must not replace that oracle before the
owner approves the four TASK-0505 candidates.

## Decisions, assumptions and remaining risk

- Header and Hero orientation are explicit component data, not inferred by a
  blanket RTL transform; E2E tests assert facing, physical placement and size.
- Decorative instances use empty `alt` plus `aria-hidden="true"`; the adjacent
  localized text remains the accessible site identity.
- The visual outcome still requires owner approval. Until approval, TASK-0505
  remains `in-progress` and the old visual oracle remains authoritative.
- After approval, a bounded follow-up must record the approval and update the
  Home visual oracle without altering the historical TASK-0201 evidence.
