# TASK-0606 — Second bilingual DaD essay evidence

- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-04
- **Status:** published and verified in production
- **Task:** [TASK-0606](../tasks/phase-06-deployment/TASK-0606-publish-dad-project-knowledge.md)
- **Contract:** [SPEC-005](../specs/SPEC-005-TECHNICAL-ARCHITECTURE.md), section 7

## Source integrity and translation

The complete edited writing block 74218 was retrieved from conversation
6a96d243-00e8-83eb-8ce5-028169fcf43a. After excluding its h1 and eight text
presentation blocks, the published Persian prose matches byte for byte, except
that the existing words «مقاله‌ی قبل» form a link to the first Persian essay.
No wording, spelling, punctuation or whitespace was normalized. SHA-256 of the
compared prose is
`4204ff517e55f815d240c8cd508dd1689b65e21b34ecc26fbd8ad7965d36b2a6`.
The three quoted ADR/SPEC/TASK excerpts are asserted separately and match too.

The English edition is a natural full translation for the owner's explicit
publication request. It preserves every section, the provider abstraction and
authentication examples, qualifications about canonical sources and document
fallibility, and the open limits of DaD. It adds no factual or personal claims.

## Implementation

- Both editions use `project-should-explain-itself` as translation key and slug.
- The existing static HTML/CSS `content-diagram` pattern is reused for five
  semantic figures with real labels and localized accessible names.
- The relationship `Documentation ↔ Implementation` adds the bounded
  `content-diagram--reciprocal` variant. The adjacent one-way figure preserves
  the intended comparison. The long agent flow and knowledge hierarchy stay
  vertical; shorter flows become horizontal when the container has room.
- All technical labels are English/LTR in both page directions. Diagrams are
  meaningful without JavaScript and in print. Artifact samples are semantic
  quotations rather than code blocks.
- The content schema, dependencies, global tokens and approved baselines did
  not change.

## Local verification

Runtime: Node 24.19.0 and npm 11.6.2.

| Check | Result |
|---|---|
| `npm run quality` | Passed, exit 0 |
| Format, lint, Astro/TypeScript | Passed; 0 errors and 0 warnings |
| Unit/content tests | 21 passed, including exact Persian source integrity |
| Build and Pagefind | 24 HTML documents; 20 pages indexed in FA/EN |
| HTML/link/budget validation | Passed; CSS 17,726 bytes gzip; largest initial JS 991 bytes gzip |
| Browser and accessibility tests | 70 passed |
| Approved visual suite | 24 passed; no baseline updates |
| Target diagram checks | Five label sequences, reciprocal/one-way distinction, no-JS, print and accessibility passed |
| Responsive checks | Both locales at 320, 390, 768 and 1440px; no overflow |
| Publishing metadata | Canonical, reciprocal hreflang, RSS, sitemap and Pagefind passed |

Pagefind's existing message about unavailable Persian stemming and Astro's
existing empty-projects-collection message remain unchanged behavior.

## Visual evidence

Full pages and header viewports were inspected for FA/EN on desktop and mobile.
Each view also records close-ups of all five diagrams under filenames beginning
`TASK-0606-{locale}-{viewport}-diagram-`.

| Locale | Desktop | Mobile |
|---|---|---|
| FA | [Full page](TASK-0606-fa-desktop.png) | [Full page](TASK-0606-fa-mobile.png) |
| EN | [Full page](TASK-0606-en-desktop.png) | [Full page](TASK-0606-en-mobile.png) |

Reproduce with `node scripts/capture-dad-project-knowledge.mjs` after a build.

## Publication

Branch: `publish/dad-project-explains-itself`. The standard pull-request and Pages flow completed successfully.

Target routes:

- `https://mehdiahmadirad.me/fa/articles/project-should-explain-itself/`
- `https://mehdiahmadirad.me/en/articles/project-should-explain-itself/`


## Verified release

- [PR #6](https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/pull/6), merged into main.
- Article commit: `753d07f85233ab936dd1d80e14d131018b9837ea`.
- Merge/release commit: `25185cd34369a99ac3008b9c58315b1c582f0517`.
- [PR CI](https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/actions/runs/33886154199): success.
- [Pages build and deployment](https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/actions/runs/33886437280): success, including the complete quality gate.
- Production smoke: HTTP 200 for both published URLs; exact titles and diagram
  labels; correct lang/dir; five named figures and zero code blocks per edition;
  self-canonical, reciprocal language links and hreflang; link to the first DaD
  article in the same locale; both RSS feeds and the sitemap contain the release.

All acceptance criteria are satisfied. No new architectural decision or
remaining publication blocker. The source text remains unchanged except for
approved presentation/link markup. No next implementation TASK is required.
