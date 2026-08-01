# TASK-0503 — Correct Critical Font Performance

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0501` |
| Unblocks | `TASK-0502` |
| Specs | `SPEC-002`, `SPEC-005`, `SPEC-006` |

## Objective

Restore green mobile Core Web Vitals and the Lighthouse performance target for
the English Home and Article without weakening typography, localization,
accessibility or approved visual behavior.

## Inputs and dependencies

- The blocked TASK-0502 review and its Lighthouse 13.4.1 evidence.
- Existing OFL-licensed Inter and Source Serif 4 source binaries and notices.
- The accepted typography choices and two-critical-font budget.

## In scope

- Produce and verify appropriately licensed/subset English webfont assets.
- Reduce critical English font transfer and avoid preloading non-critical files.
- Add a small repository-authored favicon so a missing asset does not emit a
  console error or reduce Lighthouse Best Practices.
- Re-run build, automated quality, approved visual regression and mobile
  Lighthouse for English Home/Article.

## Deliverables

Optimized font delivery, favicon, tests/checksums, Lighthouse comparison and a
corrective evidence report.

## Acceptance criteria

- [x] English Home and Article have green mobile LCP (≤ 2.5 seconds) in a
  repeatable Lighthouse run; median Performance is at least 95.
- [x] Accessibility, Best Practices and SEO behavior have no new regression;
  the deliberate review-build `noindex` deviation remains documented.
- [x] Fonts render the published English fixture corpus, required punctuation,
  code-adjacent glyphs and locale controls without missing glyphs or layout
  breakage.
- [x] The font license notices and reproducible subset inputs/commands are
  documented and verified.
- [x] The complete `quality` command and approved visual baselines remain green
  without updating owner-approved snapshots.
- [x] `/favicon.ico` or an explicitly declared favicon resolves without a
  console/network error.

## Verification/evidence

Before/after font bytes, Lighthouse reports for English Home/Article, font
coverage/checksums, quality command output and visual regression results.

## Prohibited work

Changing the approved font families, hiding text during font loading, weakening
Lighthouse/visual assertions, updating approved baselines, or adding an asset
without clear license provenance.

## Stop condition

Stop if subsetting cannot preserve the required corpus/glyphs, font licensing
becomes unclear, or visual metrics require a typography/design change.

## Handoff

Resume TASK-0502.
