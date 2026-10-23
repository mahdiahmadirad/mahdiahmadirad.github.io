# TASK-0619 — 15 engineering principles publication evidence

- Date: 2026-10-24 (Asia/Tehran)
- Scope: final Persian article, complete reviewed English translation, shared numeral-15 artwork, private registration and public publication.
- Release status: published; CI, Pages and production verification all successful.

## Source, authorship and editorial registration

The owner explicitly designated `15 Engineering Principals(1).md` as final and authorized translation and publication. The original attachment was recovered from the referenced ChatGPT conversation and archived in the private editorial repository. Its 39,947 bytes have SHA-256 `8e4bfd85a4e08a00f6cd0078dc4fbaa0180b3231868ba2c3bed3dfa102f15602`.

Private editorial PR 1 merged successfully at `aa68611919163417f0e03f926276869fe601a82b`. Fetching `origin/main` and hashing its Persian file matched the local editorial file exactly. Both language editions are explicitly `finalized: true`; editorial frontmatter contains neither slug nor translationKey. The complete Persian body equals the author's attachment byte-for-byte, preserving title, spelling, whitespace and all examples.

English was prepared and reviewed against that final Persian source under the owner's explicit translation instruction. It preserves the context-management/economics addition, reins analogy, separate-model review technique, personal system-change observation, risk distinctions, qualifications and final question. No separate human English review is claimed.

## Public transfer and invariants

Only the two finalized editions and their referenced WebP are transferred. Slug and translationKey derive from directory `15-engineering-principles`; public `draft` and `sample` are false; private finalized state is removed. Both editions use 2026-10-24, existing localized AI topics and `featured: false`.

The only body-format adaptations are removal of the leading H1, already supplied by title metadata, and the existing keyboard-focusable `.table-scroll` section around the original Markdown table. Reversing those two adaptations reconstructs the editorial body exactly in each language. Table contents, punctuation and Persian prose are unchanged. No private source or production note is in the public transfer.

Both source and rendered checks confirm 15 numbered principles, six H2 sections, ten blockquotes, fifteen engineering-principle statements and a three-row risk table.

The original generated cover remains private. The public 1254 × 1254 WebP is 93,914 bytes, SHA-256 `397a9b463b18cb8eae5322100f4fb92f9ccb714e9f67e6261aa2c321ac4facf2`. It was encoded at quality 88 without cropping or compositional edits; provenance is in `public/images/articles/README.md`. Both article pages render it with meaningful localized alt text. Home retains the existing featured essay; the new cover is absent from Home, article/topic lists, search markup and RSS.

## Local verification

- `npm ci --include=dev`: exit 0, locked dependencies installed; lockfile unchanged.
- `npm run format:check`, `lint`, `check`, `test`, `build`, `validate:build`: passed. Astro diagnostics: 0 errors, 0 warnings, one existing analytics-script hint. Unit/content suite: 27 passed. Pagefind indexed both locales; Persian stemming remains unsupported as already documented by the tool.
- HTML/link validation: 32 HTML documents passed; total CSS 17,905 bytes gzip, largest initial custom JS 991 bytes gzip, at most two critical font preloads.
- Behavior/accessibility: 88 passed, including the new FA/EN routes in existing responsive and axe coverage.
- Visual suite: 24 passed; historical baselines were not changed. Complete `npm run quality` exited 0.
- Separate no-JavaScript smoke: FA/EN × 1440×1100 desktop / 390×844 mobile, then 320px reflow, all passed. Checked HTTP 200, one H1, exact title, lang/dir, all principles and table rows, TOC targets, reciprocal language links/hreflang, canonical, indexability, Article JSON-LD date/language and decoded artwork dimensions.
- Feed/sitemap/discovery smoke: both editions present in localized RSS, sitemap, Home, archive and AI topic; local served asset equals the checked-in bytes.
- Actual Pagefind queries `هوشواره` (FA) and `principles` (EN) each return the corresponding new article.
- `git diff --check`: passed. Existing article content, CSS, templates, schema, dependencies and visual baselines are unchanged.

## Failures found and resolved

The initial suite exposed an obsolete content assumption: the heading-free AI/self-worth essay no longer has zero related articles after this new AI essay is added. Its test now retains the missing-TOC assertion and validates the new related link; empty-related coverage remains on the standalone loop essay.

The first new-route smoke exposed mobile table overflow, because existing article tables have a 34rem minimum width. The existing `.table-scroll` wrapper contains it without changing prose or global styling. HTML validation required a native named section instead of a div with region role; the final wrapper passes validation. An intermediate suite also encountered navigation timeouts on unchanged routes; these are not counted as successful runs. The final behavior/accessibility rerun passed all 88 tests.

## Visual inspection

Header/cover/type hierarchy, RTL/LTR flow and contained table scrolling reviewed from these unmodified screenshots:

- [Persian desktop](TASK-0619-fa-desktop.png) · [table](TASK-0619-fa-desktop-table.png)
- [Persian mobile](TASK-0619-fa-mobile.png) · [table](TASK-0619-fa-mobile-table.png)
- [English desktop](TASK-0619-en-desktop.png) · [table](TASK-0619-en-desktop-table.png)
- [English mobile](TASK-0619-en-mobile.png) · [table](TASK-0619-en-mobile-table.png)

## Release verification

- Public PR [22](https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/pull/22) merged at `24c46ab2d3f991f8915c9c7e4d8db092ada5f97c`.
- [CI run 40026985293](https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/actions/runs/40026985293), attempt 2: completed successfully, including 27 unit/content tests, 88 behavior/accessibility tests and 24 visual checks. Attempt 1 was cancelled after slow Ubuntu mirror downloads during browser dependency installation; its logs show no article/test failure. The same commit and complete suite succeeded on a fresh runner, without changing workflow or tests to bypass the setup.
- [Pages run 40028356794](https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/actions/runs/40028356794): build and deploy jobs both completed successfully for the merged commit, including the complete quality gate, custom-domain validation and artifact upload.
- Public main's Persian file hash matched the tested local public file after fetching the merge.
- Live [Persian article](https://mehdiahmadirad.me/fa/articles/15-engineering-principles/) and [English article](https://mehdiahmadirad.me/en/articles/15-engineering-principles/): HTTP 200, complete FA/EN desktop/mobile no-JavaScript smoke passed, including 320px reflow, all sections, TOC, language links, metadata and cover.
- Both served HTML files are byte-identical to the tested local production output. SHA-256: Persian `8ec05740426edf00e27a36e316264f51bc0e1ae85693e99e05e095f4da8d0073`; English `cbe7574deb51e496e405fe96461ea86cc1231b5f6a4bebbdbf61b31ca9f860b0`.
- Live RSS, sitemap, Home/archive/AI discovery and article-only cover placement passed; live WebP matches all 93,914 checked-in bytes. Actual live Pagefind queries in both languages return the corresponding new article.
- Structured production results: [TASK-0619-production-results.json](TASK-0619-production-results.json).

This final documentation-only record closes the task after observing the release. It changes no deployable source, asset, workflow or test; `[skip ci]` avoids repeating the already successful publication solely to store its result. The deployed and verified content commit remains `24c46ab2d3f991f8915c9c7e4d8db092ada5f97c`.

No new feature task is selected; no unresolved publication issue remains.
