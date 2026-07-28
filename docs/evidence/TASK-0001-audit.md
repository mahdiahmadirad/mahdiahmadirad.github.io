# TASK-0001 — Repository and Decision Audit

| Field | Value |
|---|---|
| Task | `TASK-0001` |
| Date | 2026-07-29 |
| Outcome | Complete |
| Baseline commit | `d1dd9aa` |
| Branch | `main` |

## Scope and preservation

The repository was clean before TASK-0001 began. No pre-existing user changes were
present, and this task did not scaffold the application, install dependencies,
change DNS, deploy, or alter the approved product direction.

The repository root is
`/Users/mehdi/Documents/Projects/mahdiahmadirad.github.io`, with `origin`
configured as:

```text
https://github.com/mahdiahmadirad/mahdiahmadirad.github.io.git
```

The audit found 37 tracked files and no untracked files at the baseline. The
repository currently contains the DaD documentation package and one reference
asset only:

```text
.
├── AGENTS.md
├── README.md
├── PROJECT-BOOTSTRAP.md
├── IMPLEMENTATION-PROTOCOL.md
├── DOCUMENTATION-CONVENTIONS.md
├── PACKAGE-MANIFEST.md
├── assets/
│   └── design-reference.png
└── docs/
    ├── TRACEABILITY.md
    ├── adr/       7 accepted ADRs plus index
    ├── specs/     SPEC-001 through SPEC-006
    └── tasks/     14 bounded TASKs plus index
```

There is no `package.json`, lockfile, package-manager declaration, Node version
pin, Astro configuration, TypeScript configuration, application source,
`public/`, test suite, GitHub Actions workflow, or `.openai/hosting.json`.

## Guides and decisions reviewed

The following local guidance was read completely:

- `README.md`
- `PROJECT-BOOTSTRAP.md`
- `IMPLEMENTATION-PROTOCOL.md`
- `DOCUMENTATION-CONVENTIONS.md`
- `PACKAGE-MANIFEST.md`
- `docs/adr/README.md` and all seven accepted ADRs
- `docs/specs/SPEC-001` through `SPEC-006`
- `docs/TRACEABILITY.md`
- `docs/tasks/README.md`
- `TASK-0001` and the dependent handoff target, `TASK-0002`

No conflict was found between TASK-0001, the accepted ADRs, the approved SPECs,
the repository contents, or pre-existing user work.

## Local tool baseline

| Tool | Observed version or state |
|---|---|
| Git | repository available on `main`; remote configured |
| Node.js | `v25.2.1` |
| npm | `11.6.2` |
| pnpm | `10.8.0` |
| Yarn | `1.22.22` |
| Bun | not installed |
| Project package manager | not selected; no lockfile exists |

Because no lockfile exists, TASK-0002 may select a package manager. The proposed
default is npm with a committed `package-lock.json`: npm is already available
with Node and introduces no additional package-manager bootstrap requirement.
TASK-0002 must first verify the current official stable Astro release against a
supported Node.js LTS release and then pin both the project dependencies and the
runtime expectation. The installed Node version is inventory, not an approved
runtime decision.

No project command baseline exists yet because there is no package manifest.
TASK-0002 must create the non-placeholder command interface required by
`AGENTS.md`:

```text
format:check
lint
check
build
test
test:e2e
test:visual
preview
```

## Reference asset

`assets/design-reference.png` was opened and visually inspected.

| Check | Result |
|---|---|
| Format | PNG, RGB, non-interlaced |
| Dimensions | 1336 × 1177 pixels |
| Size | approximately 1.4 MiB |
| SHA-256 | `5ac6086c5d146f480899e20f817aee695ae92fe157015a67fb48a10987f88ec3` |
| Package integrity | matches the checksum recorded in `PACKAGE-MANIFEST.md` |

The asset is approved as a documentation reference for hierarchy, composition,
proportion, whitespace, fine rules, and restrained color accents. It is not a
product image license or permission to reuse its architectural subject matter.
The visible building sketches and notebook/building-style imagery must not be
copied into the site. Identity-defining graphics must instead be original,
software-native abstractions using nodes, edges, dependencies, modules, states,
boundaries, and flows. The Persian portion is cropped, so it cannot serve as a
complete Persian baseline; Persian pages require separate full-length desktop
and mobile review.

No font files are present. Font family names in the SPECs do not establish
permission to redistribute binaries. Self-hosted font files must not be added
until their exact files, subsets, and licenses are confirmed.

## Open decisions, blockers, and risks

### Not blockers for TASK-0002

- Default locale is not finally approved. Use the documented `fa` default for
  the reversible bootstrap configuration while preserving symmetric `/fa/` and
  `/en/` paths.
- The package manager is not selected. Use the npm proposal above unless a
  lockfile or owner direction appears before TASK-0002 begins.
- Persian calendar and timezone display policy is unresolved. Store ISO dates
  and defer display policy to the content/i18n task.
- Font selection and licensing are unresolved. TASK-0002 needs no bundled fonts
  and can use system fallbacks.
- Real About text, Home introduction, topics, projects, essays, social links,
  and feed links are not supplied. TASK-0002 is an empty technical baseline and
  must not fabricate them.
- GitHub Pages access, domain ownership, and DNS values are not locally
  verified. They are phase-06 concerns and no DNS value should be guessed.
- No repository `LICENSE` file exists. Public visibility does not itself grant
  reuse rights; licensing can be decided separately without blocking the
  technical baseline.

### Future hard blockers

- Do not add or self-host any font or third-party asset whose license is not
  confirmed.
- Do not publish personal biography, claims, projects, quotes, social URLs, or
  articles without genuine owner-supplied content; fixtures must be explicitly
  labeled as samples.
- Production publishing must wait for GitHub/Pages access and domain/DNS
  ownership.
- Home and Article visual baselines require product-owner approval and must not
  be self-approved or silently updated.

### Current risks

- TASK-0002 must verify official Astro and integration versions at execution
  time rather than relying on versions from memory.
- The existing local Node version is unpinned. A supported LTS version must be
  selected and documented before treating local success as a reproducible
  baseline.
- The reference image contains prohibited subject matter, so later visual work
  must distinguish composition fidelity from imagery reuse.

No TASK-0001 stop condition occurred: the target repository is available, there
were no conflicting user changes, and no unlicensed asset or font is required
to complete the audit or the next technical bootstrap.

## Command evidence

| Command | Result |
|---|---|
| `git status --short` before task changes | exit 0; no output |
| `git branch --show-current` | exit 0; `main` |
| `git rev-parse --show-toplevel` | exit 0; expected repository root |
| `git remote -v` | exit 0; configured GitHub origin |
| `rg --files` / filesystem inventory | exit 0; 37 baseline files |
| `node --version` | exit 0; `v25.2.1` |
| `npm --version` | exit 0; `11.6.2` |
| `pnpm --version` | exit 0; `10.8.0` |
| `yarn --version` | exit 0; `1.22.22` |
| `bun --version` | unavailable |
| `shasum -a 256 assets/design-reference.png` | exit 0; checksum matches manifest |
| `file assets/design-reference.png` | exit 0; PNG, 1336 × 1177, RGB |
| `sips -g pixelWidth -g pixelHeight assets/design-reference.png` | exit 0; 1336 × 1177 |
| `git diff --check` | exit 0 |

## TASK-0002 handoff

TASK-0002 has sufficient input and may proceed with these boundaries:

1. Preserve all existing documentation and the approved reference asset.
2. Verify and pin an official stable Astro toolchain compatible with a chosen
   supported Node.js LTS version.
3. Prefer npm and commit its lockfile because no prior lockfile constrains the
   choice.
4. Create only the strict TypeScript/static Astro baseline and required command
   interface.
5. Keep `site` as `https://mehdiahmadirad.me`, use trailing slashes, keep both
   locale prefixes, and make no DNS or deployment change.
6. Use no bundled font, real personal content, feature page, Pagefind
   integration, ready-made theme, Tailwind, or UI kit in this task.
