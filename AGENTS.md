# AGENTS.md

## Mission

Build the personal blog of **Mehdi Ahmadirad / مهدی احمدی‌راد** as a static, minimal, content-driven, genuinely bilingual site. The result must be publishable on GitHub Pages at `mehdiahmadirad.me`.

## Mandatory reading order

Before changing the code, read this sequence completely:

1. `README.md`
2. `PROJECT-BOOTSTRAP.md`
3. `IMPLEMENTATION-PROTOCOL.md`
4. `DOCUMENTATION-CONVENTIONS.md`
5. All ADRs with status `accepted`
6. `docs/specs/SPEC-001` to `SPEC-006`
7. `docs/tasks/README.md`
8. The selected TASK and all its dependencies

## Non-negotiable constraints

- A repository including Astro source, articles, docs and assets.
- Persian and English both first-class; Symmetric paths `/fa/` and `/en/`.
- `<html lang dir>` correct and CSS logical properties.
- **Engineering Editorial** with a warm off-white background, navy ink, a brick accent and restrained lapis.
- Iranian identity through typography, geometry, rhythm and locale details—not ready-made symbols.
- Identity-defining hero graphics and illustrations must be software-native and abstract.
- No photos of buildings, sketches of building architecture, domes, tiles, Persepolis or similar stereotypes to show software architecture.
- Astro + strict TypeScript + Markdown/MDX + custom CSS + SVG.
- Pagefind, Playwright, GitHub Actions and GitHub Pages.
- static-first, minimal JavaScript and no backend in v1.
- No ready-made theme, Tailwind, UI kit, CSS-in-JS, CMS, analytics or dark mode except with new ADR.

## Execution rules

1. Maintain repository status and user changes.
2. Move only one TASK with status `ready` to `in-progress`.
3. Before coding, read the dependencies, acceptance criteria, prohibited work and stop condition of the same TASK.
4. Make the smallest change necessary to close the TASK.
5. Produce specified tests and evidence.
6. If a stop condition occurs, stop the execution of the same TASK and report the issue.
7. Change the documentation status to `done` only after evidence exists.
8. Do not update a visual baseline without product-owner approval.

## Visual source of truth

![Approved visual reference](assets/design-reference.png)

The reference defines hierarchy and composition; it is not permission to copy the architectural imagery in the mockup. Its Persian view is incomplete and cropped. The actual Persian version must be built and tested separately at full length on desktop and mobile.

## Content safety

- Do not invent Mehdi's background, projects, quotes, social links or personal details.
- Mark the fixtures explicitly as samples.
- Do not include machine translation as published content.
- Do not commit private draft, token, credential, analytics key or confidential data.
- Do not add a font or asset to the repository without clear licensing permission.

## Required verification

The final commands of the repository must have at least this interface:

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

The build must generate the Pagefind index. Every relevant visual change must be checked at least across `FA/EN × Desktop/Mobile`.

## Stop and ask

Stop only in these situations:

- GitHub/DNS access or ownership is required for publishing.
- The required font or asset license is unclear.
- Genuine personal content is required and fabrication is not permitted.
- A new request fundamentally conflicts with an accepted ADR or the reference image/specifications.
- A phase reaches a visual approval gate.
- Changing the scope includes CMS, analytics, dark mode, comments or backend.

Handle reversible internal details using the best documented, consistent assumptions.

## Definition of a valid handoff

The completion report for every TASK must include the outcome, changed files, evidence, commands and results, required screenshots, new decisions or assumptions, remaining risks and the next TASK. “Done” without evidence is not a valid handoff.
