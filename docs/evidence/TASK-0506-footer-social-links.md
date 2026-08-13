# TASK-0506 — Verified Footer Social Links Evidence

## Outcome

The bilingual global footer now exposes the owner-confirmed GitHub and LinkedIn
profiles with localized labels, safe external-link attributes and exact-URL
end-to-end coverage.

## Changed behavior

- GitHub: `https://github.com/mahdiahmadirad`
- LinkedIn: `https://www.linkedin.com/in/mehdiahmadirad`
- Both links appear once on the Persian and English Home footers.
- Both links use `target="_blank"` and
  `rel="me noopener noreferrer"`.

## Root cause and correction

The first pull-request quality run failed at `Check formatting`. The Astro
footer did not match the repository-pinned Prettier output. The failure stopped
all later quality stages.

The formatting issue was reproduced with Prettier 3.9.6 and
`prettier-plugin-astro` 0.14.1, then corrected without changing behavior or
approved visual baselines.

## Verification

GitHub Actions CI run 12 for commit
`347dbfbd59e8e00ffbbf87ad1e89ffff619c1e70` passed:

- Check formatting
- Lint source
- Check Astro and TypeScript
- Run unit and content tests
- Build production output and Pagefind
- Validate HTML, links and budgets
- Run behavior and accessibility tests
- Run approved-baseline visual tests

Run:
<https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/actions/runs/31723608364>

No visual baseline was changed.

## Remaining risk

The links are owner-confirmed and covered by exact href assertions. Availability
of the external LinkedIn and GitHub services is outside the static-site test
boundary.
