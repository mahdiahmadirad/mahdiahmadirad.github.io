# TASK-0201 — Bilingual Home Slice

| Field | Value |
|---|---|
| Task | `TASK-0201` |
| Date | 2026-07-30 |
| Outcome | Implementation complete; awaiting owner visual approval |
| Baseline commit | `4f13405` |
| Astro | `7.1.5` |
| Runtime | Node.js `24.18.0` LTS |

## Outcome

The first complete Home vertical slice is statically rendered at `/fa/` and
`/en/`. Both editions use the real content graph, localized dates and numbers,
licensed active-language fonts, independent direction-aware composition, and
the shared Engineering Editorial primitives from TASK-0102.

The page order follows SPEC-003:

1. localized header
2. identity-led Hero and software system graphic
3. featured sample essay and bespoke decision-flow graphic
4. recent sample writing rows
5. sample Topics, Projects, and transparent fixture note
6. localized footer

The Home remains `noindex` because all available editorial data is explicitly
sample fixture content. Removing `noindex` belongs to the later publishing and
metadata task after genuine content is provided.

## Content safety and fixture behavior

No biography, project, quotation, social link, or professional claim was
invented.

- every essay title already contains a localized `Sample` marker
- the page repeats a visible fixture disclosure before editorial content
- topic and project headings are explicitly labeled as sample data
- the fictional project remains identified as a concept fixture
- no quote is rendered because no real, authorized quote exists
- no fake fourth article was created to imitate the reference
- the Persian-only article honestly shows its unavailable English edition
- English content never appears as a fallback under a Persian URL, or vice versa

The content corpus currently provides three Persian and two English articles.
All are shown, ordered by the active edition's publication date with a stable
translation-key tie-breaker. This is intentionally below SPEC-003's target of
four to eight recent articles rather than fabricating more authorial content.

## Reference comparison

Compared with `assets/design-reference.png`, the implementation preserves:

- a fine-rule global header with wordmark, short navigation, and language name
- a large, asymmetric identity Hero with generous surrounding whitespace
- the brick lead rule, restrained lapis secondary text, and warm canvas
- approximately equal text/graphic visual weight on wide screens
- one prominent featured essay followed by open editorial rows
- numbered writing rows with metadata and language availability
- a ruled three-column bottom index and compact footer
- text-before-graphic order on compact screens

Intentional differences:

- both raster architectural images are replaced by static, hand-coded SVGs
  using modules, boundaries, nodes, dependencies, and flow
- the fixture disclosure adds a slim safety row absent from the reference
- the bottom quotation is replaced by a transparent fixture note because no
  authorized personal quotation exists
- only the available two/three article fixtures are rendered
- no social links, notes navigation, dark-mode control, or publishing metadata
  is invented ahead of its owning task

The Persian desktop composition was not produced as a raw English mirror.
CSS grid direction places identity text on the right and graphics on the left;
writing rows retain index-first reading order on the right. Persian was reviewed
independently at full page length on desktop and mobile.

## Software-native graphics

The Hero reuses `SystemGraphic.astro`. The featured essay adds
`DecisionFlowGraphic.astro`. Both are inline, decorative SVGs with CSS-token
colors and no text, animation, photo, building, plan, dome, tile, monument, or
other architectural subject matter.

## Functional and accessibility evidence

Playwright verifies:

- correct `lang` and `dir` for both editions
- functional Home-to-Home language switching
- active Home wordmark with `aria-current="page"`
- server-rendered primary content with JavaScript disabled
- no page scripts in the generated Home
- semantic heading, section, list, time, navigation, and footer structures
- first-Tab skip link and focus transfer to `#main-content`
- honest published/unpublished language-edition states
- decorative treatment of both SVGs
- `noindex` while sample content is visible
- no document-level horizontal overflow at exactly 320 CSS pixels

## Screenshots

The four screenshots were captured with self-hosted fonts loaded and reduced
motion enabled:

- [Persian desktop](TASK-0201-home-fa-desktop.png)
- [Persian mobile](TASK-0201-home-fa-mobile.png)
- [English desktop](TASK-0201-home-en-desktop.png)
- [English mobile](TASK-0201-home-en-mobile.png)

They are approval candidates and task evidence only. No visual baseline was
created or updated.

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
| `npm run test:e2e` | exit 0; 28 desktop/mobile checks passed |
| `npm run test:visual` | exit 0; 10 rendering checks passed |
| `npm run evidence:home` | exit 0; four screenshots generated |
| `npm audit` | exit 0; 0 vulnerabilities |
| `git diff --check` | exit 0 |

## Changed areas

```text
src/pages/[lang]/index.astro
src/components/home/
src/components/global/{SiteHeader,SiteFooter}.astro
src/layouts/BaseLayout.astro
src/lib/home.ts
src/i18n/ui.{types,fa,en}.ts
tests/e2e/{bootstrap,home}.spec.js
tests/visual/home.spec.js
scripts/capture-home.mjs
package.json
docs/evidence/TASK-0201-*
```

## Decisions, assumptions, and remaining risks

- No ADR or design-token change was required.
- Home content links point to their stable future Article, Topic, Project, and
  About routes. Those destination pages are intentionally not implemented in
  this task.
- The active sample corpus is smaller than the final four-to-eight article
  target. Genuine owner-provided content should replace or extend it.
- Full upstream fonts prioritize glyph integrity over a premature content
  subset; the font provenance note records the later optimization conditions.
- TASK-0202 must now perform owner visual review. No Article work may begin
  until that approval task is completed.
