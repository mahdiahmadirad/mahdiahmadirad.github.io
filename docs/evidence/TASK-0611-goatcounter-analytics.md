# Evidence — TASK-0611 GoatCounter analytics

| Field | Value |
|---|---|
| TASK | `TASK-0611` |
| Date | 2026-09-08 |
| Status | verified |
| Pull request | `#15` |
| CI run | `34239301270` |
| Verified head | `61e00d04e30f16dcbda4df180a76237998e37dbe` |

## Implemented scope

- Added the owner-supplied GoatCounter endpoint and counting script once in `src/layouts/BaseLayout.astro`.
- Preserved asynchronous loading and static-first operation.
- Added `tests/unit/goatcounter-source.test.mjs` to verify endpoint, source, async loading and single integration.
- Added ADR-011, SPEC-007 and traceability records.
- Updated the build validator to distinguish approved external scripts from local JavaScript while continuing to reject unapproved third-party scripts.

## Verification

GitHub Actions CI run `34239301270` passed on head `61e00d04e30f16dcbda4df180a76237998e37dbe`.

Successful gates:

- Prettier format check
- ESLint
- Astro and TypeScript check
- Unit and content tests: 27 passed, 0 failed
- Production Astro build and Pagefind indexing
- HTML, local-link and performance-budget validation
- Playwright behavior and accessibility tests
- Approved-baseline visual tests

## Visual evidence

No visual baseline update was required or performed. The analytics integration renders no visible UI, and the existing approved visual baselines passed unchanged.

## Notes

Astro reports an informational hint that a script carrying attributes is treated as inline. This is expected for the external GoatCounter script and does not produce a warning or error in `astro check`.
