# TASK-0508 — Use Official Social Brand Icons

| Field | Value |
|---|---|
| Status | `done` |
| Depends on | `TASK-0507` |
| Unblocks | — |
| Specs | `SPEC-002`, `SPEC-003`, `SPEC-005`, `SPEC-006` |

## Objective

Replace the custom footer social symbols with the official GitHub Invertocat and
LinkedIn `[in]` marks while preserving the blog's restrained visual language,
accessibility, responsive layout and approved quality gates.

## Inputs and dependencies

- The verified URLs and localized labels delivered by `TASK-0506`.
- The footer icon integration delivered by `TASK-0507`.
- GitHub's official logo usage guidance:
  <https://brand.github.com/foundations/logo>.
- LinkedIn's official `[in]` Logo guidance:
  <https://brand.linkedin.com/in-logo>.
- The existing warm canvas, spacing scale and bilingual footer composition.

## In scope

- Replace both hand-drawn line symbols with the official brand silhouettes.
- Use the approved black monochrome variants without modifying their shapes.
- Render each mark at 20px and retain the existing text labels.
- Keep both marks decorative and server-rendered with no remote dependency.
- Verify brand identity, computed presentation and 320px overflow in both locales.
- Run the complete pull-request quality gate.

## Deliverables

Updated inline SVG component, semantic brand-color token, aligned approved SPECs,
focused E2E assertions and a verification evidence report.

## Acceptance criteria

- [x] GitHub uses the official Invertocat silhouette and LinkedIn uses the
  official `[in]` silhouette.
- [x] Both marks use the approved black monochrome variant at 20px without
  distortion, effects or recoloring.
- [x] Each SVG remains decorative with `aria-hidden="true"` and
  `focusable="false"`; visible localized labels remain the accessible names.
- [x] Verified URLs, footer order and safe external-link attributes are unchanged.
- [x] The 320px footer has no document-level horizontal overflow.
- [x] The complete pull-request quality workflow passes without changing an
  approved visual baseline.

## Verification/evidence

Focused DOM and computed-style assertions, responsive overflow checks,
accessibility scan and the full GitHub Actions quality job.

## Prohibited work

Changing either official mark's proportions or color, adding effects, recoloring
a mark to the blog's navy or brick palette, replacing visible labels with
icon-only links, adding a package or remote runtime asset, changing the verified
profile URLs, or updating approved visual baselines.

## Stop condition

Stop if an official mark cannot be used under its published brand guidance, the
320px layout overflows, accessibility regresses, or the approved visual gate
requires a baseline update.

## Handoff

Completed with evidence in
[`../../evidence/TASK-0508-official-social-brand-icons.md`](../../evidence/TASK-0508-official-social-brand-icons.md).
