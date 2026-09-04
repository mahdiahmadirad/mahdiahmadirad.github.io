# TASK-0607 — Third DaD essay evidence

- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-05
- **Status:** locally verified; awaiting pull-request CI and production release
- **Task:** [TASK-0607](../tasks/phase-06-deployment/TASK-0607-publish-dad-sample-walkthrough.md)
- **Contract:** [SPEC-005](../specs/SPEC-005-TECHNICAL-ARCHITECTURE.md), section 7

## Source integrity and editorial state

The complete edited attachment `ساختن یک پروژه با Document-Aware Development.md`
was recovered from conversation `6a96d243-00e8-83eb-8ce5-028169fcf43a`.
Its original SHA-256 is
`5833f7800d8573de4b3bbfd3bd0f08674ddd2baf3b3786d85136d1e53a9a9a24`.

After excluding the source h1 and its six presentation placeholders/text
flows, the published Persian prose matches byte for byte. The two earlier-essay
links wrap existing words and do not change visible prose. The compared prose
SHA-256 is
`7506072ec0129865b9be57b8d990744ddd781d8f7ddaf1c0e8aea86cbef35d9d`.

The Drift section remains intentionally future-facing. It says the repository
will be made inconsistent in a later iteration and does not claim that the
experiment or reconciliation has already happened.

## Implementation

- The sole edition uses `building-a-project-with-dad` as translation key and
  slug, with the existing software-architecture topic.
- No English file or placeholder route exists. The standard unavailable
  translation state links to the English Home and emits no English hreflang.
- Existing words link to both earlier Persian DaD essays. The supplied `DaD`
  and `DaD-sample` GitHub links both returned HTTP 200 on 2026-09-05.
- Six source presentation blocks use the reviewed semantic static-diagram
  pattern. English technical labels are explicitly LTR; long flows stay
  vertical, remain meaningful without JavaScript and print as real text.
- The content schema, dependencies, design tokens and approved visual baselines
  did not change.

## Local verification

Runtime used locally: Node 25.2.1 and npm 11.6.2. Pull-request CI repeats the
complete gate with the repository-pinned Node 24.18.0 and npm 11.16.0.

| Check | Result |
|---|---|
| `npm run quality` | Passed, exit 0 |
| Format, lint, Astro/TypeScript | Passed; 0 errors, warnings or hints |
| Unit/content tests | 22 passed, including exact Persian source integrity and future Drift wording |
| Build and Pagefind | 25 HTML documents; 21 pages indexed in FA/EN |
| HTML/link/budget validation | Passed; CSS 17,769 bytes gzip; largest initial JS 997 bytes gzip |
| Browser and accessibility tests | 72 passed |
| Approved visual suite | 24 passed; no baseline updates |
| Target article checks | Six label sequences, no-JS, print, accessibility, monolingual metadata and series links passed |
| Responsive checks | Persian at 320, 390, 768 and 1440px; no page or diagram overflow |
| External repositories | `DaD` and `DaD-sample` both HTTP 200 |

Pagefind's existing message about unavailable Persian stemming and Astro's
existing empty-projects-collection message remain unchanged behavior.

## Visual evidence

The full Persian article, header and all six diagrams were inspected on desktop
and mobile. The third diagram was changed from a cramped horizontal row to the
existing long-flow layout after visual review exposed a broken English word.

| Locale | Desktop | Mobile |
|---|---|---|
| FA | [Full page](TASK-0607-fa-desktop.png) | [Full page](TASK-0607-fa-mobile.png) |

Header and diagram close-ups use filenames beginning
`TASK-0607-fa-{viewport}-header` and
`TASK-0607-fa-{viewport}-diagram-`. Reproduce them with
`node scripts/capture-dad-sample-walkthrough.mjs` after a build.

## Publication

Branch: `publish/dad-sample-walkthrough`.

Target route:

- `https://mehdiahmadirad.me/fa/articles/building-a-project-with-dad/`

Pull-request CI, merge/deployment identifiers and production smoke results will
be added after the standard release flow completes.
