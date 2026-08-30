# TASK-0404 — English Brand Story Evidence

| Field | Value |
|---|---|
| Task | `TASK-0404` |
| Date | 2026-08-30 |
| Outcome | Approved and complete; English edition generated and verified |
| Inputs | Current Persian edition, `ADR-009`, `SPEC-003`, `SPEC-004`, `SPEC-005` |

## Outcome

The historical-creature story now has a natural English edition at
`/en/about/historical-creature/`. The translation follows the owner's current
Persian revisions, preserves the first-person and deliberately non-definitive
interpretation, and introduces no personal or historical claim beyond that
source.

The existing page renderer now discovers both editions without a route-level
special case. Each About page links to its same-language story, and each story
language control links directly to the corresponding edition.

## Route and publishing evidence

| Check | Result |
|---|---|
| English route | `200`, `lang="en"`, `dir="ltr"` |
| Semantic structure | one `h1`, three `h2` sections, four figures/captions |
| Translation | reciprocal FA/EN language controls and `hreflang` |
| Metadata | self-canonical, `og:type=website`, Pagefind type `Page` |
| Discovery | same-language link from both About editions |
| Publishing | both routes in sitemap; neither story in Article RSS or JSON-LD |
| Search | `quadruped` returns the English story in the English Pagefind index |
| Responsive/accessibility | no overflow at 320 px; axe A/AA checks pass |

The build generated 29 HTML documents. Pagefind indexed 23 pages across `fa`
and `en`; generated-output validation found no broken local links and kept CSS,
JavaScript and font-preload budgets within their limits.

## Review captures

These captures are review evidence, not visual-regression baselines. Approved
Home and Article oracles were not updated.

| Capture | Dimensions | SHA-256 |
|---|---:|---|
| [English story desktop](TASK-0404-brand-story-en-desktop.png) | 1440×5862 | `4d386b74a1c4f666f8fe22a6d0974ef05d0d481bdff5ddbb863d1665bd86251c` |
| [English story mobile](TASK-0404-brand-story-en-mobile.png) | 390×6887 | `660907739d8bb2172b3354179bcd70d4d1a71542dfd50d72e9568a34f33f1b47` |
| [English About desktop](TASK-0404-about-en-desktop.png) | 1440×1485 | `151d9a9a4a8c107f31ec8def8ddb28eac8863025460216da5c3add390cf8ef67` |
| [English About mobile](TASK-0404-about-en-mobile.png) | 390×1766 | `abc8dbb4974d822be42d6a820af2d389e667c75a588a2fe04d6b14e89e844319` |
| [Persian story desktop](TASK-0404-brand-story-fa-desktop.png) | 1440×5510 | `3c60e0d5c5bc94f29acc40107f881ad5ef8f631182c065fcc0ff324d0dddc629` |
| [Persian story mobile](TASK-0404-brand-story-fa-mobile.png) | 390×6460 | `5af4810bb7e97c8029ca1a0b5ad91df4868568e046383dd924ffbc39fb08e825` |
| [Persian About desktop](TASK-0404-about-fa-desktop.png) | 1440×1572 | `b7ad10dfe376c58f7890e2952369d47458ac61fff83483a8a8ddf6ca3666e20b` |
| [Persian About mobile](TASK-0404-about-fa-mobile.png) | 390×1740 | `1eae387a0628569b12ebc19019197b7d418206397d6a00b898710d78c3aea844` |

Manual review of the English desktop and mobile captures confirms that the
heading hierarchy, table of contents, image/caption pairing, two-up gallery,
reading measure and footer remain coherent. The gallery stacks correctly on
mobile and no copy or image is clipped.

The owner approved the English copy and presented visual review on 2026-08-30.
The captures remain review evidence and are not promoted to automated visual
baselines.

## Commands and results

```text
npm run format:check
PASS

npm run lint
PASS

npm run check
PASS — 87 files, 0 errors, 0 warnings, 0 hints

npm run test
PASS — 19 unit tests

npm run build
PASS — 29 pages built; Pagefind indexed 23 pages in 2 languages

npm run validate:build
PASS — 29 HTML documents and local links validated

npx playwright test tests/e2e tests/accessibility
PASS — 100 tests across desktop and mobile projects

npx playwright test --config playwright.visual.config.js
PASS — 34 tests; approved Home and Article contracts unchanged

npm run evidence:brand-story
PASS — eight bounded review captures generated

git diff --check
PASS
```

## Decisions, assumptions and remaining risk

- The translation uses British spelling where prose required a locale choice
  (`centimetres`, `civilisations`) and keeps official object names unchanged.
- The owner's explicit request is the editorial authorization for this English
  edition. The prose is a natural English adaptation rather than a literal
  paragraph-by-paragraph rendering.
- The owner completed the final voice-and-wording review and approved the
  edition on 2026-08-30. No technical, editorial, accessibility or visual risk
  remains known.

## Next task

`TASK-0602` remains the next blocked repository task and still requires the
owner's GitHub/DNS access for production verification.
