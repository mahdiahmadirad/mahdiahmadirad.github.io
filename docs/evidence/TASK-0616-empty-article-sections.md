# TASK-0616 — Optional article navigation evidence

- Date: 2026-10-13 (Asia/Tehran)
- Status: local verification passed; production deployment pending
- Governing contract: SPEC-003 / ADR-002, ADR-003, ADR-004, ADR-007

## Outcome and changed files

`src/components/article/TableOfContents.astro` guards the entire aside using
its existing filtered h2–h4 list. `src/pages/[lang]/articles/[slug]/index.astro`
guards the entire related section using the existing selected links. Both
conditions run during static rendering and are shared by Persian and English.
`tests/e2e/article.spec.js` adds five regressions, run in both browser projects,
covering absent TOC/related sections, preserved heading links, keyboard-operated
disclosure and same-locale related links without JavaScript.

SPEC-003, the TASK/index and TRACEABILITY record this bounded correction.
Content, related-selection policy, styling and approved baselines are unchanged.
The checkout started at origin/main `ab98b11`. Before release, the fix was
rebased onto `5d26897` after the independently published AI classification
arrived on main. The full quality gate passed again and Persian AI screenshots
were refreshed. Pre-existing local branches and commits were preserved.

## Verification

`npm run quality` passed (exit 0) using Node 24.19.0 / npm 11.6.2:

- `format:check`, `lint`: passed.
- `check`: 0 errors, 0 warnings; existing GoatCounter inline-script hint.
- `test`: 27 passed.
- `build`: static output and separate FA/EN Pagefind indexes generated.
- `validate:build`: HTML, links, metadata, feeds and budgets passed.
- Playwright e2e/accessibility: 88 passed, including 10 new regression runs.
- Playwright visual: 24 passed; no approved baseline updates.
- `git diff --check`: passed.

The existing empty-project-collection warning remains informational.

## Visual evidence

Full-page screenshots were captured without JavaScript at desktop 1280×800
and mobile 390×844. Viewport and support-region captures were also inspected
locally at readable scale. No new overflow, missing prose or support overlap
was observed. These are corrective evidence, not replacement baselines.

| Locale / article | TOC | Related | Captures |
|---|---|---|---|
| FA / ai-and-self-worth | absent | absent | [desktop](TASK-0616-fa-desktop-ai-and-self-worth.png), [mobile](TASK-0616-fa-mobile-ai-and-self-worth.png) |
| EN / same-place-different-self | present | absent | [desktop](TASK-0616-en-desktop-same-place-different-self.png), [mobile](TASK-0616-en-mobile-same-place-different-self.png) |
| FA / building-a-project-with-dad | present | present | [desktop](TASK-0616-fa-desktop-building-a-project-with-dad.png), [mobile](TASK-0616-fa-mobile-building-a-project-with-dad.png) |
| EN / building-a-project-with-dad | present | present | [desktop](TASK-0616-en-desktop-building-a-project-with-dad.png), [mobile](TASK-0616-en-mobile-building-a-project-with-dad.png) |

There is no published heading-free English article. The shared component handles
that state identically; English existing/missing related states are exercised
on real published editions without inventing or publishing fixture content.

## Release and handoff

The owner explicitly authorized commit, push and production deployment.
Deployment and production smoke-test results will be recorded after the Pages
workflow completes. No new decision or next feature task is required.
