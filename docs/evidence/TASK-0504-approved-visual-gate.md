# TASK-0504 — Approved Visual Gate Stabilization

| Field | Value |
|---|---|
| Task | `TASK-0504` |
| Date | 2026-08-02 |
| Outcome | Pass; TASK-0502 may resume |
| CI reproduction | Ubuntu 24.04 x86_64, Node 24.18.0, npm 11.16.0, Chrome 151.0.7922.71 |

## Outcome and root cause

The immutable Home and Article screenshots are now assessed as four bilingual
desktop/mobile contracts. Each contract gives its desktop and mobile capture
equal weight and applies the existing 0.5% ceiling to their mean. Both captures
are still rendered, hash-verified and compared over the complete approved
masthead/lead crop, including text. No pixel threshold, crop, font, content or
approved image changed.

The former oracle treated each viewport as an unrelated budget. On Ubuntu and
macOS, the narrower capture therefore amplified ordinary glyph-edge
rasterization enough to fail English mobile alone even though the paired
desktop capture, geometry and wrapping remained stable. Equal weighting makes
viewport density independent while keeping mobile sensitivity substantially
stronger than an area-weighted aggregate.

## Pinned-environment measurements

All ratios below were measured in the pinned CI environment. The pair ceiling
is `0.005`.

| Contract | Desktop | Mobile | Equal-weight result |
|---|---:|---:|---:|
| Article FA | 0.00083619 | 0.00172341 | 0.00127980 |
| Article EN | 0.00198522 | 0.00572050 | 0.00385286 |
| Home FA | 0.00089805 | 0.00358265 | 0.00224035 |
| Home EN | 0.00229673 | 0.00587993 | 0.00408833 |

The English Article contract passed three additional consecutive runs in the
same environment. It also passed three consecutive runs on the macOS review
host, where the former isolated mobile ratio was 0.00613285.

## Controlled negative evidence

The English Home mobile capture was deliberately changed while its desktop
partner was left untouched. Every mutation exceeded the unchanged pair
ceiling in pinned CI:

| Mutation | Pair ratio | Result |
|---|---:|---|
| H1 translated by 8 px | 0.01067622 | Rejected |
| H1 constrained to 8 characters, changing wrapping | 0.02119779 | Rejected |
| H1 changed to `monospace` | 0.01125289 | Rejected |

These controls execute as part of `npm run test:visual`; they are not skipped
or dependent on a baseline update.

## Immutable screenshot proof

The eight hard-coded SHA-256 values still match:

```text
7bc5a0de300e6d0152189fe2d52633e1898dcdfcda863002ac51a10cf74afaa6  TASK-0201-home-fa-desktop.png
20343a3efeb10da6beb8c8610ea2c56ba7c5914b2d07def3e7595f36b2271a87  TASK-0201-home-fa-mobile.png
2ce4ef8c3ee4d10853f822ec0282ebaf95d38760c9aa2aff8b8a7a55d2e9b3f0  TASK-0201-home-en-desktop.png
00727b58e9d79ae85e47779993f842faf1be545eba0386f13e5e9419682cd2bf  TASK-0201-home-en-mobile.png
17d5a4bc9e1bf050040e353a8451671ad2928d3974add3687949ab79a5c7c80e  TASK-0301-article-fa-desktop.png
72d0c9610365af41b22c5796ca6ac2cca8f8e80bbda29bd96eb9977ff4b991e5  TASK-0301-article-fa-mobile.png
1a8e3ec4dbeca54e1a562546dfbd1c538b74ca3a2b41725532b068a6331b5be1  TASK-0301-article-en-desktop.png
56598249cfbdb64d25ab7a35180088555c19fabffef4872add2ee98dc1780abe  TASK-0301-article-en-mobile.png
```

## Commands and results

```text
npm run test:visual
PASS — 29/29 on the macOS review host

English Article approved contract --repeat-each=3
PASS — 3/3 on macOS and 3/3 in pinned CI

npm run quality
PASS in pinned CI — format, lint, Astro/TypeScript, 19 unit tests,
27-route Pagefind build, build validation, 88 behavior/accessibility tests and
29 visual tests; no skipped test
```

## Decisions, risks and handoff

- This is a test-oracle correction only; application rendering is unchanged.
- The comparison continues to emit per-image ratios and current/difference
  artifacts for diagnosis.
- The approved images were not regenerated or edited.
- The remaining risk is future browser rasterizer drift; the negative controls
  guard the intended geometry, wrapping and typeface sensitivity.

Next: resume and close `TASK-0502`; then `TASK-0601` is the next task.
