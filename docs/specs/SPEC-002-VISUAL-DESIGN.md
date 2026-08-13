# SPEC-002 — Visual Design Specification

| Field | Value |
|---|---|
| ID | `SPEC-002` |
| Status | `approved` |
| Owner | Mehdi Ahmadirad |
| Governing ADRs | `ADR-004`, `ADR-005`, `ADR-008` |
| Implemented by | `TASK-0102`, `TASK-0201`, `TASK-0301`, `TASK-0505`, `TASK-0507`, `TASK-0508` |
| Last updated | 2026-08-13 |

## 1. Art direction

The internal name of the design path: **Engineering Editorial**

A combination of an intellectual magazine, an engineering note and contemporary digital design:

- Bright and warm background
- Very dark navy/charcoal text
- Controlled brick emphasis
- Lapis only as a secondary color
- Narrow lines and frames
- Generous white space
- Characteristic and calm typography
- Abstract software graphics instead of Hero photo

The image [`assets/design-reference.png`](../../assets/design-reference.png) is the primary reference for layout, Home/Article composition, hierarchy, proportions, feel and palette; the earlier HTML prototype is not authoritative. The goal is not blind pixel reproduction, but the actual pages must remain faithful to the image’s structure while being responsive, accessible and bilingual from the outset. The building-architecture sketches in the image are composition placeholders only. Technical diagrams must replace them with abstract, software-native graphics. The Home Hero uses the owner-selected historical creature under `ADR-008` as a personal identity mark, not as a software-architecture metaphor.

The Persian view at the bottom of the image is cropped and is not a complete Persian layout reference. The Persian version must be implemented and reviewed independently at full viewport length, against this SPEC and the visual-test matrix.

## 2. Color palette

| Role | Base value | Use |
|---|---:|---|
| Canvas | `#F7F4ED` | Main background |
| Surface | `#FCFAF6` | Limited surface and code/table |
| Ink | `#18222D` | Text and title |
| Accent Brick | `#A34B35` | Active link, number, emphasis |
| Lapis | `#304F68` | Secondary data/graphics |
| Muted | `#706E68` | metadata and description |
| Rule | `#DDD7CC` | border and divider |
| Focus | `#7C3AED` | Focus ring with bright contrast |

Rules:

- Brick is the identity color, not the background color of the big blocks.
- Lapis and brick may appear together only in restrained graphics or data states.
- Color must not be the only carrier of meaning.
- Body text must never use `Muted`.
- Contrast according to WCAG AA and preferably higher than 7:1 for normal text.

## 3. Typography

### Persian

- UI and text: `Vazirmatn`
- Title: `Estedad`
- fallback: `Tahoma`, `Arial`, `sans-serif`
- Text of the article: weight 400, line-height about `1.95`
- Titles with controlled weight; Avoid black and excessive compression.

### English

- UI: `Inter`
- Title and text of the article: `Source Serif 4`
- fallback: `Georgia`, `serif` for text and system sans for UI
- Article text: line-height about `1.68`

### Common rules

- Fonts are self-hosted and subset; `font-display: swap`.
- Set size and line-height independently for Persian and Latin.
- Target line length: Persian 60-75 characters approximately; English 55–70.
- The body of any language should use responsive and zoomable font-size.
- All-caps text is limited to short English labels and is prohibited in Persian.
- Manual typesetting or letter spacing is prohibited for Persian text.

## 4. Grid and composition

- general container: maximum `72rem`
- English reading column: Maximum `43rem`
- Persian reading column: maximum `46rem`
- gutter: from `1rem` mobile to `2rem` desktop
- Home desktop grid: 12 columns
- Text-led, asymmetric Hero without photographic imagery
- Editorial elements with semi-open lines, not enclosed and round cards
- Small global radius (`0–6px`); pill shapes only for genuine controls such as filters

White space should create rhythm. Do not fill the lack of content with cards, shadows or illustrations.

## 5. Subtle Iranian identity

Iranian identity comes from five sources:

1. Typography quality and respect for Persian script
2. Persian numbers in Persian interface
3. Solar Hijri dates in Persian and Gregorian dates in English
4. Grid rhythm, repetition of units and controlled geometric proportions
5. Limited warm brick and azure palette

Allowed:

- Square and modular grid
- Cross lines and connecting points
- Incomplete or broken symmetry
- Numbering `۰۱` / `01`
- Semi-open framing and annotation
- Persian quotation marks « »

Prohibited, except for the bounded owner-selected mark in `ADR-008`:

- Photos of mosques, domes, Persepolis or traditional architecture as an identity shortcut
- Ready-made shamsa, arabesque or tilework motifs
- Predominant and stereotyped use of turquoise
- Pseudo-calligraphy for UI
- Combining the national symbol with the code icon

## 6. Brand mark and abstract software graphics

### Historical creature brand mark

- The source is the owner-supplied extraction from a Seljuk-period bowl; the original must remain unchanged and its provenance must be documented.
- Web derivatives use a transparent background, crisp silhouette and the existing canvas, ink, brick and restrained-lapis palette.
- The rendition should preserve the irregular historical line and recognizable character; it must not become a glossy mascot, cartoon, heraldic badge or faux-luxury emblem.
- The full creature is used in the Home Hero and compact header wordmark. The favicon uses a simplified head-only derivative.
- Hero direction: English head faces left toward copy; Persian head faces right toward copy.
- Header direction: the mark sits beside the localized name and faces it—right-facing in English and left-facing in Persian.
- Do not mirror through a global `dir` selector. Each placement must expose and test its intended orientation explicitly.
- Header and Hero instances are decorative beside the localized author name and use `aria-hidden="true"` or equivalent empty alternative text.
- No text is embedded in the asset.

### Technical graphics

Technical illustrations use hand-coded SVG. Their vocabulary:

- node, edge, module and boundary
- dependency and flow
- layer and state
- ADR → SPEC → TASK → CODE
- Regular blocks with few significant deviations

Rules:

- SVG should be decorative unless it conveys actual information; in decorative mode with `aria-hidden="true"`.
- Essential text should not be placed inside the SVG.
- It must take color from CSS custom properties.
- RTL and LTR forms may be mirrored or recomposed; text and directional arrows must not be mirrored blindly.
- It must remain static under `prefers-reduced-motion`.
- animation, if used, only slight movement of node/edge after load, without creating obstacles or eye-catching looping.
- Raster identity imagery other than the `ADR-008` brand mark is prohibited unless explicitly decided later.

## 7. RTL and LTR

- Page root: `<html lang="fa" dir="rtl">` or `<html lang="en" dir="ltr">`.
- CSS with logical properties: `margin-inline`, `padding-inline`, `inset-inline`, `border-inline-start`.
- Mirror layout should make sense: TOC should be placed on the outside of the reading column.
- code, URL, email, ID and command with `dir="ltr"` and if needed `unicode-bidi: isolate`.
- `<bdi>` should be used for expressions inside bidirectional text.
- Article text alignment follows the language; `justify` is prohibited by default.
- directional icons should be reviewed based on direction; Non-directional icons should not be mirrored.
- The order of the DOM remains logical and the same; Visual change with CSS should not break screen reader layout.

## 8. Visual components

### Header

- wordmark with the compact full-creature mark facing the author's name in the font of the same language
- Short navigation
- Language control with legible name: `فارسی` / `English`
- Fine lower border
- sticky only if it does not occupy the vertical space of the mobile phone
- the creature must remain recognizable without making the header taller than necessary; target rendered height is `30–34px` compact and `36–40px` wide

### Featured Essay

- Small label, big title, summary, metadata and link
- No card shadow
- A brick accent line or index
- Hero graphics next to or behind the grid, not behind the text

### Writing List

- List of rows with number, title, short summary and metadata
- hover with color/line changes, not card moves
- The entire row can be clickable, but keep the semantic link clear.

### Article

- Title, deck, metadata, translation/share controls limited
- TOC on desktop and disclosure on mobile
- Footnote and sidenote with editorial style
- Heading anchors are visually restrained and keyboard accessible

### Code

- Always LTR
- A slightly distinct background, delicate border, no neon theme
- copy button with translatable label
- Horizontal scroll only inside the code block

## 9. Images, icons and charts

- Linear and simple icons, fixed thickness.
- Footer social links pair the official GitHub and LinkedIn brand marks with explicit localized text labels; the approved black monochrome variants must retain their original shape and color, and icon-only social links are prohibited.
- Do not use emoji as an interface icon.
- The photo is only when it is content and belongs to the article/project.
- Charts should be made with the same palette and typography.
- Alt text must describe the image’s meaning; decorative images must use empty alt text.
- Favicon artwork must preserve the source head's proportions, both visible eyes and both side curls, and be evaluated at `16×16` and `32×32`; the crown edge, face and curls remain distinguishable.

## 10. Responsive and movement

Breakpoints are a function of content; Starting point:

- compact: `< 40rem`
- medium: `40–64rem`
- wide: `> 64rem`

On mobile:

- Simple and usable navigation without heavy overlay
- Hero graphic small or below the text
- Collapsible TOC
- Natural metadata wrap
- hit target at least 44x44 CSS px

Movement:

- short duration `120–220ms`
- Calm easing
- Big transform, parallax and scroll hijacking are prohibited
- Full support for `prefers-reduced-motion: reduce`

## 11. Printing

- navigation, search, decorative SVG and controls should be removed.
- Recognizable links, black text and white background.
- Control the width of the text for A4 and the page break of the titles.
- The canonical URL and the author's name should be visible in the printed header/footer.
