# TASK-0002 — Astro Repository Bootstrap

| Field | Value |
|---|---|
| Task | `TASK-0002` |
| Date | 2026-07-29 |
| Outcome | Complete |
| Baseline commit | `5b1575b` |
| Package manager | npm `11.16.0` |
| Runtime | Node.js `24.18.0` LTS |
| Astro | `7.1.5` |

## Outcome

The documentation-only repository is now a repeatable Astro static project
without overwriting the existing DaD package or reference asset. It contains a
strict TypeScript configuration, exact dependencies and lockfile, static/i18n
configuration, the required command interface, a minimal root redirect, and
baseline automated checks.

No Home, Article, design-system, content collection, Pagefind integration,
workflow, deployment, DNS change, font, or personal content was added.

## Version selection

Current versions were checked on 2026-07-29 against official sources:

- Astro announced the current 7.1 release line on 2026-07-16:
  <https://astro.build/blog/astro-710/>.
- The official npm registry reported `astro@7.1.5` with Node.js
  `>=22.12.0`.
- Astro's current configuration reference confirms `site`, static output,
  `i18n.locales`, `i18n.defaultLocale`, and
  `i18n.routing.prefixDefaultLocale`:
  <https://docs.astro.build/en/reference/configuration-reference/>.
- The Node.js release index identifies `24.18.0` as the latest LTS and the
  installed Node 25 line as end-of-life:
  <https://nodejs.org/en/about/previous-releases>.

The repository pins Node `24.18.0` in `.nvmrc`, restricts the supported engine
to the Node 24 LTS line, and pins the npm version bundled with that release.
The final clean verification used the official Node 24.18.0 macOS ARM64
archive in an isolated temporary directory; it did not change the machine's
system Node installation.

The user's global npm registry pointed to a stale mirror that returned Astro 6
metadata and did not contain `@astrojs/check`. Project-local `.npmrc` therefore
uses the official npm registry without modifying global npm configuration.

Direct dependencies are exact:

| Package | Version |
|---|---:|
| `astro` | `7.1.5` |
| `@astrojs/check` | `0.9.10` |
| `@eslint/js` | `10.0.1` |
| `@playwright/test` | `1.62.0` |
| `@types/node` | `24.13.3` |
| `eslint` | `10.8.0` |
| `prettier` | `3.9.6` |
| `prettier-plugin-astro` | `0.14.1` |
| `typescript` | `6.0.3` |
| `typescript-eslint` | `8.65.0` |

The lockfile uses lockfile version 3. npm's install-script policy explicitly
allows only the reviewed, pinned `esbuild` and optional `fsevents` versions
needed by the selected dependency graph. `npm audit` reports zero known
vulnerabilities.

## Repository baseline

Added configuration:

```text
.gitignore
.npmrc
.nvmrc
.prettierignore
astro.config.mjs
eslint.config.js
package.json
package-lock.json
playwright.config.js
prettier.config.mjs
tsconfig.json
```

Added implementation structure:

```text
public/
  CNAME
src/
  assets/.gitkeep
  content/articles/.gitkeep
  env.d.ts
  pages/index.astro
tests/
  e2e/bootstrap.spec.js
  unit/config.test.mjs
  visual/bootstrap.spec.js
```

`astro.config.mjs` explicitly sets:

```text
site: https://mehdiahmadirad.me
output: static
trailingSlash: always
locales: fa, en
defaultLocale: fa
prefixDefaultLocale: true
```

`src/pages/index.astro` is only the static GitHub Pages-compatible redirect
document for `/` to `/fa/`. It has correct Persian `lang`/`dir`, viewport,
canonical, `noindex`, a zero-delay refresh, and an ordinary fallback link.
Localized Home routes remain intentionally absent until TASK-0101/TASK-0201.

`public/CNAME` contains exactly:

```text
mehdiahmadirad.me
```

This prepares the static artifact only; no DNS record or GitHub Pages setting
was changed.

## Command interface

All required commands are real commands with no pass-through or success-only
placeholder:

| Command | Implementation |
|---|---|
| `format:check` | Prettier check for project code/configuration |
| `lint` | ESLint 10 for JavaScript and TypeScript |
| `check` | Astro diagnostics with strict TypeScript |
| `build` | Astro static build |
| `test` | Node unit test for the production/i18n configuration |
| `test:e2e` | Build, preview, and verify the root locale redirect |
| `test:visual` | Build and render desktop/mobile smoke checks without a baseline update |
| `preview` | Astro preview server |

Markdown documentation is excluded from automatic Prettier rewriting to
preserve the supplied DaD documents. `.astro` files are validated by
`astro check`; ESLint validates the JavaScript/TypeScript configuration and
tests.

## Verification evidence

The final sequence ran with Node `v24.18.0` and npm `11.16.0`:

| Command | Result |
|---|---|
| `npm install --package-lock-only` | exit 0; lockfile current |
| `npm ci` | exit 0; 364 packages installed from lockfile |
| `npm run format:check` | exit 0; all matched files formatted |
| `npm run lint` | exit 0 |
| `npm run check` | exit 0; 0 errors, 0 warnings, 0 hints |
| `npm run build` | exit 0; static output, 1 root redirect page |
| `npm test` | exit 0; 1 unit test passed |
| `npm run test:e2e` | exit 0; desktop and mobile projects passed |
| `npm run test:visual` | exit 0; desktop and mobile rendering smoke checks passed |
| `npm audit` | exit 0; 0 vulnerabilities |
| `git diff --check` | exit 0 |

Playwright's browser CDN returned a location-based HTTP 403 during an attempted
Chromium download. The local tests use the installed stable Google Chrome
channel instead. No screenshot or visual baseline was committed or approved;
the visual test only verifies that the generated bootstrap document renders
and has no horizontal overflow.

## Decisions and assumptions

- npm is the selected package manager because TASK-0001 found no lockfile and
  npm is bundled with the pinned Node LTS runtime.
- Persian remains the provisional default locale documented by the approved
  SPECs. Both locale URL prefixes are mandatory and configured.
- ESLint 10 is used without `eslint-plugin-astro`: the current plugin excludes
  the original local Node 25 runtime, while its older compatible line required
  ESLint 9, whose official audit reported a high-severity transitive advisory.
  `astro check` provides Astro-file diagnostics without retaining that
  vulnerable dependency line.
- The checked-in project rejects Node 25 because it is EOL. Contributors should
  use `.nvmrc` or another version manager to activate Node 24.18.0.
- System fallback fonts are sufficient for this technical baseline. No font
  license decision was needed.

## Remaining risks and handoff

- `/fa/` and `/en/` do not exist yet by design. TASK-0101 must create the
  symmetric locale foundation and verify both routes.
- Playwright currently depends on an installed Chrome channel in this local
  environment. TASK-0501 must define the reproducible browser installation for
  GitHub Actions, where the CDN restriction may not apply.
- Pagefind, sitemap, feeds, CI workflows, and deployment remain in their
  assigned later tasks.
- Genuine personal content and font files remain blocked on owner-provided
  content and licensing decisions; TASK-0101 may use only clearly labeled
  sample fixtures.

TASK-0101 and TASK-0102 now have the strict static baseline they require and
can proceed independently. Only one should be moved to `in-progress` at a
time.
