# TASK-0507 — Footer Social Link Icons Evidence

## Outcome

The verified GitHub and LinkedIn footer links now pair their explicit localized
labels with distinct, restrained line icons.

## Implementation

- Added the typed server-rendered `SocialIcon.astro` component.
- Added a repository/branch symbol for GitHub and a professional-network symbol
  for LinkedIn.
- Both SVGs are hand-coded, use `currentColor`, render at 16px with a 1.5px
  stroke and load no client JavaScript or external asset.
- Each SVG is decorative with `aria-hidden="true"` and
  `focusable="false"`; the visible localized link labels remain the accessible
  names.
- The verified URLs and footer link order remain unchanged.

## Verification

Focused Playwright assertions verify one icon inside each social link, exact
URLs, decorative accessibility attributes and no document overflow at 320px
for both Persian and English Home routes.

GitHub Actions CI run 23 passed for commit
`a1c041f13c9c8cff97e0341a0e5d103c597bea73`:

- formatting
- lint
- Astro and TypeScript checks
- unit and content tests
- production build and Pagefind
- HTML, link and budget validation
- behavior and accessibility tests
- approved-baseline visual tests

Run:
<https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/actions/runs/31724499832>

No approved visual baseline was changed.

## Remaining risk

The symbols deliberately follow the site's line-icon grammar rather than
embedding third-party trademark artwork. The adjacent text labels carry the
unambiguous network identity.
