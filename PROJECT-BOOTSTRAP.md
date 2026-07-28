# Project Bootstrap

## Purpose

This document turns the DaD package into the actual blog repository. If the repository already exists, the agent must adapt the structure and preserve the user files; Re-scaffolding or blind overwriting is prohibited.

## Product Owner Prerequisites

- a public repository; Suggested name for user site: `mehdiahmadirad.github.io`
- GitHub access to set up Pages and Actions
- Ownership of the domain `mehdiahmadirad.me`
- Node.js LTS compatible with Astro pinned version
- License decision and fonts file before self-hosting
- Real About content, social links and articles at the right time

It is useful to build the repository before executing foundation TASKs, but DNS and production release are not necessary until phase 06.

## Target single-repo architecture

```text
.
├── .github/workflows/
├── docs/
│   ├── adr/
│   ├── specs/
│   ├── tasks/
│   └── evidence/
├── public/
│   ├── CNAME
│   ├── fonts/
│   └── images/
├── src/
│   ├── components/
│   ├── content/
│   │   ├── articles/{translation-key}/fa.md|en.md
│   │   ├── topics/{translation-key}/fa.md|en.md
│   │   ├── projects/{translation-key}/fa.md|en.md
│   │   └── pages/{translation-key}/fa.md|en.md
│   ├── i18n/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── tests/
├── AGENTS.md
├── astro.config.mjs
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

The article, translations and related assets should be as close as possible. This structure shows that the language versions are two independent publications of the same conceptual work.

## Bootstrap procedure

1. Check the existing repository and driver files (`AGENTS.md` and similar).
2. Record and preserve the user’s uncommitted changes.
3. Determine the package manager from the existing lockfile; In the new project, choose one and commit the lockfile.
4. Check the official stable version of Astro and integrations and register the exact version.
5. Merge the DaD package into the root/docs repository.
6. Scaffold Astro with TypeScript strict, `output: static` and `site: https://mehdiahmadirad.me`.
7. Create the required AGENTS command interface.
8. First prove the empty build and local CI; do not build a feature page.

## Configuration baseline

- Both locale with prefix: `/fa/` and `/en/`
- `trailingSlash: "always"`
- `/` root only persistent redirect to default locale
- `public/CNAME` only `mehdiahmadirad.me`
- no runtime server, database, session or private API
- dependencies and GitHub Actions with exact version

## Public and private files

Allowed in the public repository:

- source, CSS, templates, components, SVG
- Published articles and clearly identified sample fixtures
- DaD, test and workflow documentation

Must not be committed:

- secrets and credentials
- Private draft or unpublished content that the owner has not confirmed is public
- Unlicensed font/image file
- Temporary prototype, large PSD/Figma export and cache/build output

## Bootstrap completion

Bootstrap is complete when the single-repository structure is accepted, the lockfile and versions are defined, the baseline static build succeeds, the docs are accessible, and the next TASK can begin without a hidden architectural decision.
