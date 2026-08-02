# TASK-0601 — GitHub Pages Workflow Evidence

| Field | Value |
|---|---|
| Date | 2026-08-03 |
| Task | `TASK-0601` |
| Result | pass; workflow prepared, not deployed |
| Runtime | Node.js `24.18.0`, npm `11.16.0` |

## Outcome

- Pull requests run the existing complete CI matrix through `.github/workflows/ci.yml`.
- Pushes to `main` run the complete quality gate, build Astro and Pagefind, verify
  the exact custom-domain file, upload only `dist`, and deploy through the
  official GitHub Pages action.
- A manual dispatch is accepted only when the selected ref is `main`.
- The build job has read-only repository access. Only the deploy job receives
  `pages: write` and `id-token: write`.
- No DNS record, Pages source setting, environment protection rule, secret, or
  production deployment was changed in this task.

## Changed files

- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- `docs/deployment/github-pages-rollback.md`
- `docs/tasks/phase-06-deployment/TASK-0601-configure-github-pages-workflow.md`
- `docs/evidence/TASK-0601-github-pages-workflow.md`

## Verified action pins

The release metadata came from each official GitHub repository. Each tag was
then resolved independently with `git ls-remote` on 2026-08-03.

| Action | Release | Immutable commit SHA |
|---|---|---|
| `actions/checkout` | `v7.0.1` | `3d3c42e5aac5ba805825da76410c181273ba90b1` |
| `actions/setup-node` | `v7.0.0` | `820762786026740c76f36085b0efc47a31fe5020` |
| `actions/upload-pages-artifact` | `v5.0.0` | `fc324d3547104276b827a68afc52ff2a11cc49c9` |
| `actions/deploy-pages` | `v5.0.0` | `cd2ce8fcbc39b97be8ca5fce6e763baed58fa128` |

No floating major tag is used by the repository workflows.

## Commands and results

### Workflow syntax

```text
actionlint v1.7.12 .github/workflows/ci.yml .github/workflows/deploy.yml
result: pass
verified archive SHA-256:
aba9ced2dee8d27fecca3dc7feb1a7f9a52caefa1eb46f3271ea66b6e0e6953f
```

### Clean production-quality run

The local shell did not provide the repository-pinned Node version. The
official Node.js `24.18.0` Darwin arm64 archive was downloaded to an isolated
temporary directory and verified before use:

```text
node: v24.18.0
npm: 11.16.0
Node archive SHA-256:
e1a97e14c99c803e96c7339403282ea05a499c32f8d83defe9ef5ec66f979ed1

npm ci
result: pass; 393 packages installed, 0 vulnerabilities

npm run quality
format:check: pass
lint: pass
check: pass; 0 errors, 0 warnings, 0 hints
unit/content tests: 19 passed
build: pass; 27 pages generated
Pagefind: pass; 21 pages indexed in fa and en
build validation: pass; 27 HTML documents and local links validated
behavior/accessibility: 88 passed
visual: 29 passed
```

The user-level npm configuration referenced a mirror that did not contain npm
`11.16.0`. The successful isolated run explicitly used the official npm
registry for bootstrapping that pinned npm executable. The repository `.npmrc`,
lockfile, and user configuration were not changed.

### Artifact dry validation

```text
exact dist/CNAME: pass (mehdiahmadirad.me plus newline only)
dist/pagefind/pagefind.js: present
dist/fa/index.html: present
dist/en/index.html: present
symbolic links in dist: none
artifact files: 95
artifact size: 3,555,328 bytes
```

The Pages upload action receives `path: dist`, after all checks above and after
the workflow enforces the exact CNAME contents.

## Rollback

[`../deployment/github-pages-rollback.md`](../deployment/github-pages-rollback.md)
documents the preferred historical-run rebuild and the revert-through-PR
fallback. Both routes preserve the quality gate and avoid DNS changes or force
pushes.

## Screenshots

None required. This task changes automation and documentation only; no visual
baseline or rendered product UI was changed.

## Decisions and assumptions

- CI is the pull-request gate; the deployment workflow repeats the same complete
  gate on `main` before artifact upload, avoiding two concurrent full suites for
  every main-branch push.
- Deployment uses the repository-owned build rather than a convenience build
  action so the exact pinned npm runtime, Pagefind command, build validator,
  accessibility checks, and immutable visual gate remain explicit.
- GitHub Pages must use **GitHub Actions** as its source before the first real
  deployment. That owner-controlled setting is intentionally deferred.

## Remaining risks and next task

- The workflow has not been executed on GitHub because enabling Pages, selecting
  the Actions source, configuring environment protection, and deploying require
  owner access.
- DNS, custom-domain verification, HTTPS enforcement, and production smoke tests
  remain untouched.
- Next: `TASK-0602`, only with owner access and approval.
