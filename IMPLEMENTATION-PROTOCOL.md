# Implementation Protocol

## Execution principle

Implementation proceeds through vertical slices and approval gates. The Agent must not open every page, design task and deployment task at once merely to “finish quickly.”

## The cycle of each TASK

1. **Orient:** Check repository status, input ADR/SPECs and user changes.
2. **Declare:** Register the TASK as `in-progress` and the limiting assumptions.
3. **Implement:** Just change the scope of the same TASK.
4. **Verify:** Check the acceptance criteria with the corresponding test/evidence.
5. **Review:** Review prohibited work, diff and FA/EN behavior.
6. **Handoff:** Record evidence, risk and next TASK.
7. **Close:** Set status to `done` only if all criteria are passed.

## Phases and gates

| Phase | Outcome | Gate |
|---|---|---|
| 00 Discovery | inventory, assumptions and environment baseline | essential open decisions |
| 01 Foundation | Astro, content model, tokens and design system | build and bidi baseline |
| 02 Home | complete FA/EN Home | product-owner visual approval |
| 03 Article | complete FA/EN Article | readability and composition approval |
| 04 Site Completion | Topics, Projects, About, Search, feeds | feature completeness |
| 05 Quality | test, accessibility, performance and visual evidence | quality gate green |
| 06 Deployment | CI/Pages/domain | Owner access and approval |

## Visual review protocol

For Home and Article, at least this matrix should be recorded:

```text
FA × Desktop
FA × Mobile
EN × Desktop
EN × Mobile
```

- The reference should only be compared with the full viewport.
- Because the Persian reference is cropped, judge that version against the SPEC and through human review.
- The baseline should be updated only after the owner's approval.
- The software-native graphic must preserve the reference’s position and visual weight, not its architectural subject matter.

## Evidence contract

Valid evidence can include:

- Command result with exit code
- screenshot named route/locale/viewport
- visual diff report
- Accessibility scan with manual review
- link/HTML/RSS validation
- production smoke test and URL

The Agent must not delete or skip a failing test, or rewrite a baseline, merely to make a TASK pass.

## Change control

- Reversible change within the scope: record implementation and assumption.
- Change of decision or scope: A new/replacement ADR is required.
- Changing visual tokens requires updating SPEC-006 and reviewing snapshots for both languages.
- Changing a content schema or URL requires a migration or redirect and an ADR.
- Deploy request: GitHub/DNS access and approval gate are required.

## Global Definition of Done

- Scope pages are available and natural in both languages.
- The existing/nonexistent translation states are proven.
- Home and Article have visual approval.
- static build, Pagefind, RSS, sitemap, canonical and hreflang are valid.
- Playwright, accessibility and responsive checks are passed.
- GitHub Actions deployment is successful and the production domain is healthy.
- Documentation, code and evidence are simultaneous and traceable.
