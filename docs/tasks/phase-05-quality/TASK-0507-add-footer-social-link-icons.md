# TASK-0507 — Add Footer Social Link Icons

| Field | Value |
|---|---|
| Status | `in-progress` |
| Depends on | `TASK-0506` |
| Unblocks | — |
| Specs | `SPEC-002`, `SPEC-003`, `SPEC-005`, `SPEC-006` |

## Objective

Add restrained, software-native line icons beside the existing GitHub and
LinkedIn footer labels while preserving explicit text, accessibility,
bidirectional layout and approved visual behavior.

## Inputs and dependencies

- The verified URLs and localized labels delivered by `TASK-0506`.
- The 16px icon size and 1.5px default stroke specified by `SPEC-006`.
- The inline, hand-coded SVG policy in `SPEC-002` and `SPEC-005`.
- The owner's explicit request to add icons while retaining the text labels.

## In scope

- Add a small typed `SocialIcon` Astro component.
- Provide distinct GitHub/repository and LinkedIn/professional-network line
  symbols without copying third-party logo assets.
- Place each decorative icon beside its existing visible label.
- Verify both icons and labels on Persian and English Home footers.
- Run the complete pull-request quality gate.

## Deliverables

Reusable inline SVG component, footer integration, focused E2E assertions and
a verification evidence report.

## Acceptance criteria

- [ ] Each social link contains one distinct inline SVG and its existing visible
  localized label.
- [ ] SVGs render at 16px with a 1.5px stroke, use `currentColor`, and require
  no client JavaScript or external asset.
- [ ] SVGs are decorative with `aria-hidden="true"` and
  `focusable="false"`.
- [ ] Footer link order and exact URLs remain unchanged in both locales.
- [ ] The 320px footer has no document-level horizontal overflow.
- [ ] The complete pull-request quality workflow passes without changing an
  approved visual baseline.

## Verification/evidence

Focused DOM assertions, responsive overflow checks, accessibility scan and the
full GitHub Actions quality job.

## Prohibited work

Replacing text labels with icon-only controls, adding an icon package or remote
asset, copying a third-party trademark path with unclear licensing, changing
the verified profile URLs, updating approved visual baselines, or altering the
footer beyond the two social links.

## Stop condition

Stop if recognizable icons require a third-party asset with unclear licensing,
the 320px layout overflows, accessibility regresses, or the approved visual gate
requires a baseline update.

## Handoff

Keep this TASK in progress until CI is green and the evidence report is
committed.
