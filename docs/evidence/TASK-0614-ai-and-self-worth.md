# TASK-0614 — AI and self-worth publication evidence

## Source and scope

The final edited writing block 71386 supplied by the owner is the source. Its title, paragraphs, argument, flood/cigarette passage and open ending are retained. Typographical corrections are limited to خودتا → خودتان, خاهید → خواهید and در حال که → در حالی که. The three questions are an ordered Markdown list, and one doubled space was collapsed. No new section headings or translation were added.

Publication date: 2026-10-13 in Asia/Tehran. Stable URL: https://mehdiahmadirad.me/fa/articles/ai-and-self-worth/.

The existing topic vocabulary did not fit this personal essay; the Persian topic “یادگیری و زندگی” is added. Its missing English edition is handled by the existing independent-edition model. The selected generated flood photograph is reserved for LinkedIn; blog styling and artwork policy are unchanged.

## Local verification

- `npm run format:check`: passed.
- `npm run lint`: passed.
- `npm run check`: 0 errors, 0 warnings (existing inline-script hint).
- `npm run test`: local tsx CLI IPC socket blocked by the execution sandbox. Equivalent `node --import tsx --test tests/unit/*.test.*`: 27 passed.
- `npm run build`: passed; Pagefind indexed both languages and the new content.
- `npm run validate:build`: passed; 28 HTML documents with valid local links and asset budgets.
- Reviewed generated article, missing-English state, self-canonical URL, lists, Persian RSS and sitemap. No English article route is emitted.
- Home E2E now derives the recent-writing count from RSS and checks the selected article's own artwork or the existing fallback rather than requiring artwork unconditionally.
- Existing responsive route coverage includes the new article and topic at 320px, and article reflow at 640px. Remote CI provides browser and accessibility verification.

## Release

Pending PR quality gate, merge and Pages deployment. Task remains in-progress until release is verified.
