# TASK-0405 — Persian Loop Essay Evidence

## Scope verified

- Persian article route: `/fa/articles/same-place-different-self/`.
- Persian topic route: `/fa/topics/complex-systems/`.
- First `Canon per Tonos` reference links to
  `https://www.youtube.com/watch?v=eXXO2dN3P_w`.
- No English article or English topic placeholder was created.
- Article and topic metadata expose only the published Persian alternate.
- The article is present in the Persian RSS feed and sitemap.
- Genuine content does not receive the sample-fixture notice or the unrelated
  sample article cover.

## Local verification

| Check | Result |
|---|---|
| `npm run format:check` | Passed |
| `npm run lint` | Passed |
| `npm run check` | Passed with 0 errors, warnings or hints |
| `node --import tsx --test tests/unit/*.test.*` | Passed, 19/19 |
| `ASTRO_TELEMETRY_DISABLED=1 npm run build` | Passed, 31 pages built and 25 indexed |
| `npm run validate:build` | Passed, 31 HTML documents and local references validated |
| `npx playwright test tests/e2e/publishing.spec.js` | Deferred to CI because the local runtime does not include the configured Chrome distribution |

The repository's `npm run test` wrapper could not create the `tsx` IPC socket
in this managed runtime. Running the same Node test files through the `tsx`
loader completed successfully.

## CI and production

Pending pull-request checks, merge and production smoke verification.
