# TASK-0617 — English AI/self-worth edition

## Editorial review

Source: deployed Persian article from the owner's final writing block 71386. English preserves all 19 prose paragraphs, the three course questions, the challenging invitation not to keep up/know, criticism of news and investors, the distinction between professional value and personal worth, the muddy flood and rooftop cigarette, robot eviction in Tehran, ordinary personal activities, history/time-lapse and the Babak Karimi/cane ending. No hedging or explanatory passages were added to soften these scenes. The English title is “If AI Replaces You, Does That Make You Worthless?”

Persian article bytes are unchanged. English has independent metadata dated 2026-10-13, the shared translationKey/slug and AI category. An English AI topic is added; no English learning-and-life placeholder is created. No artwork or LinkedIn publication is included.

## Verification

- Format, lint and Astro check passed (0 errors, 0 warnings; existing inline-script hint).
- `node --import tsx --test tests/unit/*.test.*`: 27 passed.
- Production build and Pagefind passed: 30 HTML documents, 26 indexed pages across both languages.
- HTML/local-link/budget validation passed.
- Verified LTR/RTL, self-canonical links, reciprocal hreflang and language controls, lists, English RSS, sitemap and the English AI topic in generated output.
- Existing responsive checks cover the new English article/topic and 200%-equivalent article reflow. CI supplies browser, accessibility and visual verification without baseline changes.

## Release targets

- https://mehdiahmadirad.me/en/articles/ai-and-self-worth/
- https://mehdiahmadirad.me/en/topics/ai/

PR verification, merge and Pages production checks remain required before publication is reported complete.
