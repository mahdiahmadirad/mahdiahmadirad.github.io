# TASK-0610 — Artwork frontmatter test evidence

Date: 2026-09-06

## Outcome

The source regression now reads the `cover` mapping and compares its values
instead of requiring double-quoted YAML scalars. It still requires every pilot
edition to use its article-specific `hero.webp` path and provide non-empty
localized alt text. A focused regression proves that equivalent quoted and
unquoted scalar styles produce the same result.

Production templates, article content and visual baselines were not changed.

## Automated verification

- `npm run format:check`: passed.
- `npm run lint`: passed.
- `npm run check`: passed with 0 errors, warnings or hints.
- `node --import tsx --test tests/unit/*.test.*`: 26 tests passed.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build`: passed; 26 static pages built and
  22 Persian/English pages indexed by Pagefind.
- `npm run validate:build`: passed; 26 HTML documents and local links validated.

## Environment note

The repository's `tsx` CLI wrapper could not create its IPC socket in this
execution environment (`listen EPERM`). As in TASK-0609, the equivalent direct
Node runner with the `tsx` import hook was used. Astro telemetry was disabled
for the build because the execution environment rejected its optional network
attempt before the command started.
