# Evidence — TASK-0612 Article rail overlap

| Field | Value |
|---|---|
| TASK | `TASK-0612` |
| Date | 2026-09-18 |
| Status | verified |
| Pull request | `#16` |
| CI run | `35372135231` |
| Verified head | `32b5a50ac3ef5d287f20d71754ddd18e7d9bb818` |

## Implemented scope

- Grouped the article prose and table of contents in a shared `article-body`
  region so the sticky TOC is bounded by the body instead of the whole page.
- Kept permalink and related-writing support content after that region, which
  prevents the TOC from covering either section.
- Preserved the existing mobile disclosure order and non-sticky behavior.
- Added desktop geometry regressions for the Persian and English editions of a
  long DaD article.

## Verification

GitHub Actions CI run `35372135231` passed on head
`32b5a50ac3ef5d287f20d71754ddd18e7d9bb818`.

Successful gates:

- Prettier format check
- ESLint
- Astro and TypeScript check
- Unit and content tests: 27 passed, 0 failed
- Production Astro build and Pagefind indexing
- HTML, local-link and performance-budget validation
- Playwright behavior and accessibility tests, including FA/EN rail overlap checks
- Approved-baseline visual tests

## Visual evidence

The approved article visual baselines passed unchanged across their existing
desktop/mobile and Persian/English matrix. No visual baseline was updated. The
new behavioral check additionally scrolls both long DaD editions to the support
region and verifies that the TOC bottom does not cross the support top.

## Notes

The local environment could not download the configured Chrome distribution
because its CDN is outside the network allowlist. The same browser checks ran
successfully in GitHub Actions. Previous/next ordering and related-article
selection were intentionally left unchanged.
