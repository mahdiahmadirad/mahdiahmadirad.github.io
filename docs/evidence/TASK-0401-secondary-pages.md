# TASK-0401 — Secondary Pages Evidence

| Field | Value |
|---|---|
| Task | `TASK-0401` |
| Date | 2026-08-01 |
| Outcome | Complete |
| Inputs | `SPEC-001`, `SPEC-003`, `SPEC-004`; approved `TASK-0302` baseline |

## Outcome

The static site now exposes localized Topics index/detail, Projects index,
About, Articles index and bilingual 404 routes. The shared header reaches only
valid localized routes. All public-facing material remains clearly identified
as sample fixture data.

The About routes intentionally publish a content-pending structure rather than
inventing biography, experience, views, projects or contact links. The Search
links required by the 404 resolve to explicit, no-index review placeholders;
Pagefind indexing and the real search experience remain entirely in
`TASK-0402`.

## Route matrix

| Page type | Persian | English | Result |
|---|---|---|---|
| Articles index | `/fa/articles/` | `/en/articles/` | `200`, localized |
| Topics index | `/fa/topics/` | `/en/topics/` | `200`, 3 non-empty topics |
| Software Architecture | `/fa/topics/software-architecture/` | `/en/topics/software-architecture/` | `200`, article rows present |
| Systems Engineering | `/fa/topics/systems-engineering/` | `/en/topics/systems-engineering/` | `200`, article rows present |
| Evidence-based Development | `/fa/topics/evidence-based-development/` | `/en/topics/evidence-based-development/` | `200`, article rows present |
| Empty-topic fixture | `/fa/topics/unpublished-sample/` | `/en/topics/unpublished-sample/` | `404`, deliberately not generated |
| Projects | `/fa/projects/` | `/en/projects/` | `200`, 2 manually ordered fixtures |
| About | `/fa/about/` | `/en/about/` | `200`, explicit content-pending copy |
| Search review target | `/fa/search/` | `/en/search/` | `200`, no-index placeholder only |
| Not found | `404.html` contains FA | `404.html` contains EN | both Homes and both Search routes linked |

## Acceptance evidence

- Empty topics are removed by the shared content selector before Home/index
  links are created, and `getTopicPaths()` only emits topics referenced by a
  published article. The deliberate `unpublished-sample` fixture returns 404.
- Project entries are sourced from manually authored, ordered Content
  Collection fixtures. No GitHub API/import, repository scraping or project
  detail route was added.
- About copy states exactly what has not been supplied and contains no claimed
  personal fact or external profile link.
- The bilingual 404 exposes one section per locale with correct local `lang`,
  `dir`, typography, Home link and Search link.
- Page headers, open ruled rows, logical properties, token colors, typography
  and compact recomposition reuse the approved Engineering Editorial system.
- The internal-link crawler found no broken link among the seeded Home,
  Articles, Topics, Projects, About, Search-placeholder and 404 pages.

## Commands and results

```text
npm run format:check  PASS — all files match Prettier style
npm run lint          PASS — 0 errors
npm run check         PASS — 70 files, 0 errors/warnings/hints
npm run test          PASS — 18 unit tests
npm run build         PASS — 27 static pages
npm run test:e2e      PASS — 64 tests across desktop/mobile projects
npm run test:visual   PASS — 32 tests across desktop/mobile projects
npm run evidence:secondary
                      PASS — build plus 18 committed review captures
git diff --check      PASS
```

The shell printed a transient Oh My Posh init-cache sharing warning during two
parallel command launches; both affected commands exited `0` and their actual
Prettier/Astro checks passed.

## Visual evidence

Every in-scope page type was reviewed in the `FA/EN × Desktop/Mobile` matrix.
The bilingual 404 was reviewed at desktop and mobile. Captures were generated
with reduced motion and without updating an approved visual baseline.

| Capture | Bytes | SHA-256 |
|---|---:|---|
| [Topics EN desktop](TASK-0401-topics-en-desktop.png) | 125100 | `7789dddb8fed4788e04403318107701e7d1ae3cfc0f7388c253af9fea805d42c` |
| [Topics EN mobile](TASK-0401-topics-en-mobile.png) | 99031 | `2bd879b26b7abe2654ad0aa43f0536ad1f8dc03bb20583476bfe73c7fc52b057` |
| [Topics FA desktop](TASK-0401-topics-fa-desktop.png) | 114055 | `7c0539dc98c5f8c1d23bbdff90f81c211c09aee41f7fe1447d16cadf17ce72c2` |
| [Topics FA mobile](TASK-0401-topics-fa-mobile.png) | 86956 | `166693a5a96061dcc786df12c37ae3924f9e8690a3458ef5785c55b0a71b54dd` |
| [Topic detail EN desktop](TASK-0401-topic-detail-en-desktop.png) | 95850 | `2d1f32d72809f34033968cba3dbc04745aaefeafb690f4d39a4dbaef916da871` |
| [Topic detail EN mobile](TASK-0401-topic-detail-en-mobile.png) | 74457 | `6c61794975b02ac9b090039627f344be7f51e991162d142c0dd40d1f2d152f26` |
| [Topic detail FA desktop](TASK-0401-topic-detail-fa-desktop.png) | 103334 | `fcb9abd5e71f90f3c4dd9434353fa7235e6c8c905e38e484c816be7c6a72cfea` |
| [Topic detail FA mobile](TASK-0401-topic-detail-fa-mobile.png) | 78810 | `24980f71fce87c758aac627bd1902f1a6bdfb1b01e01d5a2bba86d2559839185` |
| [Projects EN desktop](TASK-0401-projects-en-desktop.png) | 112001 | `094ba6c7b09bbe817b2077652cc7c5462306ed6091ebaa1bcf1452251a46f912` |
| [Projects EN mobile](TASK-0401-projects-en-mobile.png) | 84538 | `8b931f51a2cb0b1fc86d9de334ac6ad256919b1088390b4a1a0cbf399de87c79` |
| [Projects FA desktop](TASK-0401-projects-fa-desktop.png) | 103368 | `45448d09d9cb7795df5c902f44872b7dec2d77d1c849d733a6a26dd125b9c7f6` |
| [Projects FA mobile](TASK-0401-projects-fa-mobile.png) | 77744 | `990e23eb13914e9b01ff7c64dcdd04cd93e2b1e78f425e4c4d3adbcb91e3fe70` |
| [About EN desktop](TASK-0401-about-en-desktop.png) | 145300 | `f6d3f5364fbdaf30e239b247129c1d92fc18c8649de1773dc181fc2a07b9f4fd` |
| [About EN mobile](TASK-0401-about-en-mobile.png) | 108826 | `5ce570c73196cb9ff4e8859b60f7ea632202a3fed5bcb35c6b379640291f0ba9` |
| [About FA desktop](TASK-0401-about-fa-desktop.png) | 132031 | `358c795f027e64192bf23fa914871be078d943f1b2fe02dc38c1c68d2667d643` |
| [About FA mobile](TASK-0401-about-fa-mobile.png) | 99072 | `c2c08b5567ed15280d7abc3b6c8c4c890bcb195bda25392cf2c133e2c5451281` |
| [404 bilingual desktop](TASK-0401-404-bilingual-desktop.png) | 64403 | `46b68fca22be9d32f4c033cbf05c564493e153e81e59fafb7264d0efb2b2feab` |
| [404 bilingual mobile](TASK-0401-404-bilingual-mobile.png) | 41565 | `4dce6a2c1a10130b8d0d52f5003c3a785eb76e32b89680e762c4b6424e45d90a` |

## Changed files

- Routes and rendering: `src/pages/404.astro`, localized Articles, Topics,
  Projects, About and Search-placeholder pages, `src/lib/secondary.ts`.
- Shared UI: `PageIntro.astro`, `SiteHeader.astro`, `WritingList.astro`,
  `secondary.css`, routing helpers and typed FA/EN dictionaries.
- Content: one third non-empty topic pair, one deliberate empty-topic pair,
  one second project pair, bilingual content-pending About fixtures and topic
  references on the bilingual document-aware article.
- Verification: `tests/e2e/secondary.spec.js`,
  `tests/visual/secondary.spec.js`, `scripts/capture-secondary.mjs`, this report
  and 18 PNGs.

## Decisions and assumptions

- The existing sample-fixture policy is preserved: no sample is presented as
  genuine personal content and every secondary page is `noindex`.
- A minimal Search placeholder is the smallest way to satisfy the required 404
  links without introducing broken navigation. It has no input, Pagefind data,
  client script or search behavior.
- The Topics “connection mark” represents one topic gathering related article
  editions; it uses only tokenized software-native geometry and is not an
  identity illustration or new visual baseline.

## Remaining risks and handoff

- Genuine About copy, real projects and verified external links are still
  owner-supplied content dependencies. Their absence is visible and does not
  block this fixture-completeness task.
- Search placeholders are intentionally incomplete and must be replaced by the
  locale-aware Pagefind experience in `TASK-0402`.
- No Home/Article baseline or design token was changed.

Next task: `TASK-0402`.
