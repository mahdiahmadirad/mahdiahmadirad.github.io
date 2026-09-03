# TASK-0604 — Publish the English loop essay

- **Status:** done
- **Owner:** product owner / implementation agent
- **Last updated:** 2026-09-03
- **Inputs:** product-owner-approved English edition
- **Related:** SPEC-003, SPEC-004, SPEC-005; TASK-0405, TASK-0603

## Objective

Publish the approved English edition of “Returning to the Same Place, but Not
as the Same Person” as the genuine translation pair of the existing Persian
article.

## In scope

- add the approved English article copy;
- link the first `Canon per Tonos` reference to the selected performance;
- preserve the requested alternating Persian/English presentation of Bidel's
  couplet;
- add the genuine English `complex-systems` topic edition;
- verify translation links, metadata, RSS, sitemap and production rendering.

## Acceptance criteria

- [x] The English article renders at `/en/articles/same-place-different-self/`.
- [x] Both article editions expose truthful reciprocal language alternates.
- [x] The first English `Canon per Tonos` reference links to the selected video.
- [x] Bidel's couplet alternates Persian and English lines in the approved order.
- [x] The English article appears in the English RSS feed and sitemap.
- [x] Repository CI passes without changing approved visual baselines.

## Prohibited work

- do not change the approved Persian or English article wording;
- do not restore removed fixture content or routes;
- do not change DNS/domain configuration or approved visual baselines.

## Stop condition

Stop if the approved copy conflicts with the content schema or if publication
requires an unrelated product or design decision.

## Handoff

Verified in pull-request CI and ready for production publication. The English
and Persian editions are paired through reciprocal language alternates.
