# TASK-0611 — Add GoatCounter analytics

- **Status:** done
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-09-08
- **Governing ADRs:** ADR-002, ADR-007, ADR-011
- **Specs:** SPEC-005, SPEC-007
- **Dependencies:** TASK-0601 (done)

## Objective

Add the owner-selected GoatCounter page-view analytics integration globally without changing the static-first architecture or introducing user-level tracking.

## In scope and deliverables

- Add the supplied GoatCounter script once to `BaseLayout.astro`.
- Keep the script asynchronous and independent from primary rendering/navigation.
- Add a source-level regression test for endpoint, script source, async loading and single global integration.
- Add ADR/SPEC/TASK traceability and verification evidence.

## Acceptance criteria

- Persian and English pages rendered through `BaseLayout.astro` include the GoatCounter script.
- `data-goatcounter` equals `https://mehdiahmadirad.goatcounter.com/count`.
- `src` equals `//gc.zgo.at/count.js` and the script has `async`.
- The integration occurs exactly once in the global layout.
- No secret, custom personal-data event, extra analytics provider or new npm dependency is introduced.
- Format, lint, type, unit and production-build checks pass.

## Verification/evidence

Verified by `docs/evidence/TASK-0611-goatcounter-analytics.md` and GitHub Actions CI run `34239301270`, which passed format, lint, Astro/TypeScript, unit/content tests, production build and Pagefind, build validation, Playwright behavior/accessibility, and approved visual baselines.

## Prohibited work

Adding advertising, fingerprinting, session replay, custom user identifiers, unrelated tracking, a second analytics provider, visual changes, or approved baseline updates.

## Stop condition

Stop if the provider requires credentials in client code, materially broader tracking than the approved privacy contract, or a change that makes analytics necessary for normal site operation.

## Handoff

Implementation and verification are complete on pull request #15. The GoatCounter script is global, asynchronous and covered by source-level regression tests. No visible UI, visual baseline update, new npm dependency or client-side secret was introduced.
