# TASK-0202 — Home Visual Baseline Approval

| Field | Value |
|---|---|
| Task | `TASK-0202` |
| Date | 2026-07-30 |
| Outcome | Approved |
| Approver | Mehdi Ahmadirad |
| Approved implementation | `8e1764b` |
| Input evidence | `TASK-0201-bilingual-home.md` |

## Owner decision

After receiving direct links to all four full-page Home captures and the
TASK-0201 comparison report, the product owner replied:

> go to next...

This instruction was explicitly acknowledged as approval to progress through
the TASK-0202 visual gate. It records acceptance of the presented Home set and
authorizes TASK-0301 to become ready. It does not authorize an automatic
Playwright baseline rewrite or a change to the accepted design tokens.

## Approved screenshot set

| Locale | Viewport | Captured size | SHA-256 |
|---|---|---:|---|
| EN | Desktop | `1440 × 2562` | `2ce4ef8c3ee4d10853f822ec0282ebaf95d38760c9aa2aff8b8a7a55d2e9b3f0` |
| EN | Mobile | `390 × 3326` | `00727b58e9d79ae85e47779993f842faf1be545eba0386f13e5e9419682cd2bf` |
| FA | Desktop | `1440 × 2548` | `7bc5a0de300e6d0152189fe2d52633e1898dcdfcda863002ac51a10cf74afaa6` |
| FA | Mobile | `390 × 3378` | `20343a3efeb10da6beb8c8610ea2c56ba7c5914b2d07def3e7595f36b2271a87` |

Approved files:

- [English desktop](TASK-0201-home-en-desktop.png)
- [English mobile](TASK-0201-home-en-mobile.png)
- [Persian desktop](TASK-0201-home-fa-desktop.png)
- [Persian mobile](TASK-0201-home-fa-mobile.png)

These immutable hashes identify the approved evidence set. The files remain
review evidence rather than generated `toHaveScreenshot()` baselines.

## Independent Persian review

The Persian Home was reviewed separately at full desktop and mobile lengths:

- identity copy appears on the right and the Hero graph on the left at wide
  width
- featured text remains on the right and its software graphic on the left
- numbered writing rows begin from the right in reading order
- localized Persian digits and Solar Hijri dates are visible
- Estedad and Vazirmatn preserve controlled heading weight and Persian rhythm
- compact layout keeps text before graphics and does not remove primary content
- English edition labels remain isolated technical tokens
- no clipping or document-level overflow is visible

The pre-approval visual review found and corrected a double-mirroring defect.
The approved files were captured only after that correction.

## Difference classification

### Defects

No outstanding visual defect was accepted into the approved set.

### Acceptable variances

- Reference building sketches and photography are replaced by abstract SVG
  modules, nodes, boundaries, dependencies, and flow.
- A narrow fixture-disclosure row is added because all current editorial data
  is sample content.
- The reference quotation block is replaced by an explicit fixture note because
  no authorized personal quotation exists.
- The available corpus produces two English and three Persian writing rows
  rather than fabricating four rows.
- Topics replaces the reference's Notes navigation item according to the
  accepted information architecture.
- Social links and dark-mode controls are absent because neither is authorized
  in the current scope.
- Mobile sections are recomposed vertically while preserving semantic and
  reading order.

### Decision requests

None. Genuine Home content and social destinations remain owner inputs for
later publishing work, not blockers for this sample visual baseline.

## Prohibited-imagery review

Both Home graphics are inline, hand-coded SVGs. The approved pages contain no
photo, building, plan, mosque, dome, Persepolis, tilework, arabesque, monument,
or other building-architecture metaphor.

## Approval scope and handoff

The owner approval covers Home hierarchy, typography, palette, rhythm,
software-native graphics, RTL/LTR composition, and responsive behavior as
captured in the four hashed files.

TASK-0301 may now build the bilingual Article slice. It must not change this
Home baseline, and its own readability/composition will require the separate
TASK-0302 approval gate.
