# TASK-0604 — English loop essay evidence

## Scope verified locally

- English article route: `/en/articles/same-place-different-self/`.
- English topic route: `/en/topics/complex-systems/`.
- The article editions expose reciprocal Persian and English alternates.
- The first English `Canon per Tonos` reference links to
  `https://www.youtube.com/watch?v=eXXO2dN3P_w`.
- Bidel's couplet renders in the approved Persian/English/Persian/English order.
- The English article is present in the English RSS feed and sitemap.

## Local verification

| Check | Result |
|---|---|
| `npm run format:check` | Passed |
| `npm run lint` | Passed |
| `npm run check` | Passed with 0 errors, warnings or hints |
| `node --import tsx --test tests/unit/*.test.*` | Passed, 19/19 |
| `npm run build` | Passed, 18 pages built and 14 indexed |
| `npm run validate:build` | Passed, 18 HTML documents and local references validated |
| Static article/RSS/sitemap assertions | Passed |

## Pull-request CI and production

Pending pull-request checks, merge and production smoke verification.
