# TASK-0301 — Build Bilingual Article Slice

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0202` approved |
| Specs | `SPEC-002`, `SPEC-003`, `SPEC-004`, `SPEC-006` |

## Objective

Create complete FA/EN article with prose, navigation and translation states.

## In scope

Article header, metadata, TOC desktop/mobile, abstract cover, h2-h4, code, table, figure, footnote, callout, related and previous/next, print CSS.

## Deliverables

A bilingual fixture article and a monolingual mode with screenshots of four viewports.

## Acceptance criteria

- [x] line length/leading of each language according to the token.
- [x] Code, URLs and identifiers are correctly isolated in Persian.
- [x] TOC and heading anchor work with keyboard.
- [x] The article is readable without JavaScript.
- [x] Available and unavailable translation states and initial hreflang are correct.
- [x] mobile rail is recomposed in logical DOM order.

## Verification/evidence

Four screenshots, print preview, keyboard/no-JS check and translation test.

## Prohibited work

Unnecessary interactive chart, share tracker, fake personal content, changing Home baseline or secondary pages.

## Stop condition

If the readability or structure requires changing the accepted token, stop the TASK and request a SPEC/visual review change. At the end, stop for approval.

## Handoff

TASK-0302.

Completed in [`../../evidence/TASK-0301-bilingual-article.md`](../../evidence/TASK-0301-bilingual-article.md).
