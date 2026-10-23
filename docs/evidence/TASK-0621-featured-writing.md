# TASK-0621 — Featured writing selection

- Date: 2026-10-24 (Asia/Tehran)
- State: local verification complete; production deployment pending.

The owner explicitly selected the 15 engineering principles article as Home's featured writing. Both finalized editorial editions use featured:true (private commit `d5e0bd6`). Both public editions use featured:true; the previously featured same-place-different-self editions use featured:false. Each locale has exactly one explicit selection. Article bodies are byte-identical to their preceding revisions.

The existing FeaturedEssay component displays the article's localized title, metadata, article link, both edition links and shared numeral cover under ADR-010. Artwork provenance documentation and private publication notes reflect its new Home placement. No template, style, schema, dependency or baseline changed.

## Local verification

- `npm run build`: exit 0, production output and Pagefind generated.
- `npm run validate:build`: exit 0, 32 HTML documents and local links validated.
- Existing Home behavior tests: 10 passed across desktop/mobile.
- Separate no-JavaScript Home smoke: FA/EN × desktop/mobile passed HTTP 200, one featured section, correct localized title/article URL, shared decoded cover, both edition links and no document overflow at 320px.
- Diff checks passed. Exactly one featured edition per locale; all four affected article bodies unchanged.

## Visual inspection

- [Persian desktop](TASK-0621-fa-desktop.png)
- [Persian mobile](TASK-0621-fa-mobile.png)
- [English desktop](TASK-0621-en-desktop.png)
- [English mobile](TASK-0621-en-mobile.png)

## Production verification

Pending the complete GitHub Pages quality/deploy gate and live Home checks. Do not infer live publication from local captures.
