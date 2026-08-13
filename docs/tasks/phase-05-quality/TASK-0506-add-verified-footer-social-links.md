# TASK-0506 — Add Verified Footer Social Links

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0501` |
| Unblocks | — |
| Specs | `SPEC-003`, `SPEC-004`, `SPEC-005` |

## Objective

Add the owner-confirmed GitHub and LinkedIn profiles to the global bilingual
footer while preserving localization, accessibility, responsive layout and the
repository quality gates.

## Inputs and dependencies

- The footer behavior already approved in `SPEC-003`.
- Owner-confirmed GitHub URL:
  `https://github.com/mahdiahmadirad`.
- Owner-confirmed LinkedIn URL:
  `https://www.linkedin.com/in/mehdiahmadirad`.
- Existing typed UI dictionaries and global `SiteFooter` component.

## In scope

- Add the two verified external profile links to the shared footer.
- Add localized Persian and English labels through the typed UI dictionary.
- Apply safe external-link attributes.
- Add focused end-to-end coverage for both localized Home routes.
- Restore and verify the complete CI quality gate.

## Deliverables

Updated footer, typed localized labels, exact-URL E2E assertions and a
verification evidence report.

## Acceptance criteria

- [x] GitHub and LinkedIn links appear once in the footer of both locale Homes.
- [x] Each link uses the exact owner-confirmed URL.
- [x] Labels come from the typed Persian and English UI dictionaries.
- [x] External links use `target="_blank"` and
  `rel="me noopener noreferrer"`.
- [x] `npm run quality` passes through the pull-request CI with no skipped
  quality stage caused by an earlier failure.
- [x] The final evidence records the failing formatter diagnosis and the green
  replacement run.

## Verification/evidence

Exact href/rel E2E assertions, repository Prettier check and the GitHub Actions
quality job.

## Prohibited work

Inventing or normalizing a social profile URL, adding social SDKs or tracking,
changing approved visual baselines, changing footer composition beyond the two
links, or weakening a quality assertion.

## Stop condition

Stop if either URL is not owner-confirmed, the footer change requires an
approved visual-baseline update, or the complete quality job reveals a
regression outside this bounded change.

## Handoff

Completed with evidence in
[`../../evidence/TASK-0506-footer-social-links.md`](../../evidence/TASK-0506-footer-social-links.md).
