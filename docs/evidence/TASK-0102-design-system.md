# TASK-0102 — Design System Foundation

| Field | Value |
|---|---|
| Task | `TASK-0102` |
| Date | 2026-07-30 |
| Outcome | Complete |
| Baseline commit | `4c40cc3` |
| Astro | `7.1.5` |
| Runtime | Node.js `24.18.0` LTS |

## Outcome

The repository now has a bilingual Engineering Editorial foundation: exact
palette tokens, independent Persian and English typography/reading measures,
reset/global/type/print styles, a shared localized page shell, keyboard skip
navigation, header/footer primitives, and a software-native SVG system graph.

The internal showcase is statically generated at:

```text
/fa/design-system/
/en/design-system/
```

Both editions have correct `lang` and `dir`, use dictionary-owned visible
strings, link to the corresponding locale edition, and emit
`<meta name="robots" content="noindex">`.

## Registered visual primitives and constraints

- canvas `#f7f4ed`, surface `#fcfaf6`, ink `#18222d`
- brick accent `#a34b35`, restrained lapis `#304f68`
- muted `#706e68`, rule `#ddd7cc`, focus `#7c3aed`
- independent `--reading-max-fa` and `--reading-max-en` measures
- locale-specific heading, reading, UI, and leading tokens
- open editorial rows and rules instead of card grids
- one restrained surface callout, without shadow or decorative radius
- visible two-pixel focus outline plus a three-pixel focus halo
- CSS logical properties for spacing, borders, sizes, and alignment
- motion reduced to near-zero when `prefers-reduced-motion` is active
- print removes navigation and the decorative graphic

## Self-hosted typography

The owner approved the specified fonts after their licenses were verified.
Every family is now self-hosted from an unmodified official release artifact:

| Role | Family | Version | License |
|---|---|---:|---|
| Persian UI and reading | Vazirmatn | `v33.003` | OFL-1.1 |
| Persian headings | Estedad | `8.5` | OFL-1.1 |
| English UI | Inter | `v4.1` | OFL-1.1 |
| English headings and reading | Source Serif 4 Roman/Italic | `4.005R` | OFL-1.1 |
| Code | JetBrains Mono | `v2.304` | OFL-1.1 |

The exact release links, artifact paths, SHA-256 hashes, and delivery policy are
recorded in `public/fonts/README.md`. Each upstream OFL notice is distributed
beside its font. Unit tests lock all six binary hashes and validate every
license notice; browser tests wait for and verify the active locale fonts.

Each page preloads exactly two locale-critical fonts. Source Serif Italic and
JetBrains Mono load only when used. System faces remain fallback entries but
their files are not copied or redistributed.

The upstream WOFF2 files are intentionally unmodified. Subsetting is deferred
until the genuine publishing character set is known: premature glyph removal
would risk broken Persian/technical content, and modifying Source Serif invokes
its Reserved Font Name condition. Any later subset must have a reproducible
build, retained OFL notices, new hashes, glyph-coverage tests, and compliant
family naming.

## Software graphic

`SystemGraphic.astro` is an inline, decorative, software-native SVG. It depicts:

- modules as bounded rectangles
- system boundaries as dashed rectangles
- dependencies and flow as curved edges
- nodes as brick-colored points
- a restrained grid and lapis strokes

It contains no photo, building, plan, dome, tile, monument, or other
building-architecture metaphor. The adjacent localized caption carries the
meaning; the SVG is hidden from assistive technology to avoid duplicate
content.

## Content primitive coverage

The showcase includes:

- display, section, and prose typography
- link, list, and explicitly fictional quote fixtures
- a non-color-only callout
- an open editorial row
- a responsive decision table
- isolated left-to-right code
- a native button for focus-state review

All examples are explicitly labeled as samples and do not claim personal facts,
projects, quotations, or views.

## Contrast evidence

Ratios were calculated against the warm canvas with the WCAG relative
luminance formula and are asserted by the unit suite:

| Pair | Ratio | Threshold used |
|---|---:|---:|
| ink / canvas | 14.64:1 | 4.5:1 |
| brick accent / canvas | 5.29:1 | 4.5:1 |
| lapis / canvas | 7.82:1 | 4.5:1 |
| focus / canvas | 5.19:1 | 3:1 |

## Keyboard and responsive evidence

The browser suite verifies that:

- first `Tab` exposes and focuses the skip link
- activating the skip link moves focus to `#main-content`
- the sample control receives a solid focus outline at least two pixels wide
- FA and EN retain their correct language/direction metadata
- both active locale font families finish loading
- each locale emits exactly two critical font preloads
- the SVG remains decorative
- both pages have no document-level horizontal overflow at exactly 320 pixels

Wide and compact screenshots were captured with reduced motion and visually
reviewed. The Persian page was reviewed independently at full length rather
than inferred from the English layout:

- [Persian wide](TASK-0102-design-system-fa-wide.png)
- [Persian compact](TASK-0102-design-system-fa-compact.png)
- [English wide](TASK-0102-design-system-en-wide.png)
- [English compact](TASK-0102-design-system-en-compact.png)

These files are task evidence only. They do not create or update an approved
visual baseline.

## Verification

Final commands use Node `v24.18.0` and npm `11.16.0`:

| Command | Result |
|---|---|
| `npm ci` | exit 0 |
| `npm run format:check` | exit 0 |
| `npm run lint` | exit 0 |
| `npm run check` | exit 0; 0 errors, warnings, or hints |
| `npm run build` | exit 0; 5 static pages generated |
| `npm test` | exit 0; 18 tests passed |
| `npm run test:e2e` | exit 0; 14 desktop/mobile checks passed |
| `npm run test:visual` | exit 0; 6 rendering checks passed |
| `npm run evidence:design-system` | exit 0; four screenshots generated |
| `npm audit` | exit 0; 0 vulnerabilities |
| `git diff --check` | exit 0 |

## Changed areas

```text
src/styles/
public/fonts/
src/components/global/
src/layouts/BaseLayout.astro
src/layouts/LocaleFoundation.astro
src/pages/[lang]/design-system/index.astro
src/i18n/ui.{types,fa,en}.ts
tests/unit/design-system.test.ts
tests/e2e/design-system.spec.js
tests/visual/design-system.spec.js
scripts/capture-design-system.mjs
package.json
docs/evidence/TASK-0102-*
```

## Decisions, assumptions, and remaining risks

- No ADR change was required.
- The current full upstream webfonts total approximately 1.4 MB. Only two are
  preloaded per locale; a content-aware subset remains a later performance
  opportunity with the licensing and glyph-coverage safeguards above.
- Header destinations beyond Home and the language counterpart belong to later
  tasks and are not generated yet.
- The showcase is an internal review artifact, not the final Home.
- TASK-0201 is now ready. It should reuse these tokens and primitives to build
  the bilingual Home and must keep every published fixture visibly marked as
  sample content.
