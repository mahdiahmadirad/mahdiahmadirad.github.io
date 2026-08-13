# TASK-0508 — Official Social Brand Icons Evidence

## Outcome

The bilingual footer now uses the official GitHub Invertocat and LinkedIn
`[in]` silhouettes instead of custom line symbols, while retaining explicit
localized labels and the blog's restrained composition.

## Brand treatment

- The marks follow the official source shapes documented by the
  [GitHub Brand Toolkit](https://brand.github.com/foundations/logo) and
  [LinkedIn `[in]` Logo guidance](https://brand.linkedin.com/in-logo).
- Both use an approved black monochrome variant through the semantic
  `--color-brand-monochrome` token.
- Each renders at 20px with no distortion, effects or recoloring.
- Theme alignment comes from the warm canvas, spacing and adjacent typography;
  the marks themselves remain brand-compliant black.

## Accessibility and behavior

- Each SVG remains decorative with `aria-hidden="true"` and
  `focusable="false"`.
- Visible localized labels remain the accessible link names.
- Verified profile URLs, link order and
  `rel="me noopener noreferrer"` remain unchanged.
- No icon package, remote runtime asset or client JavaScript was added.

## Verification

Focused Playwright assertions verify the distinct brand selectors, single filled
path, computed 20px dimensions, computed black fill, exact URLs, decorative
accessibility attributes and no document overflow at 320px for both Persian and
English Home routes.

GitHub Actions CI run 35 passed for commit
`50e7cf7321160c9005b4787e7a63b76ad8d396c0`:

- formatting
- lint
- Astro and TypeScript checks
- unit and content tests
- production build and Pagefind
- HTML, link and budget validation
- behavior and accessibility tests
- approved-baseline visual tests

Run:
<https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/actions/runs/31725818932>

No approved visual baseline was changed.

## Remaining risk

Future changes to either company's published brand guidance may require a
follow-up review. The current implementation uses the approved monochrome
treatment documented at implementation time.
