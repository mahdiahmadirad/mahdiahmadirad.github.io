# TASK-0602 — Connect Domain and Verify Production

| Field | Value |
|---|---|
| Status | `blocked` |
| Depends on | `TASK-0601`, GitHub/DNS access, owner approval |
| Specs | `SPEC-005` |

## Objective

Publish the site to GitHub Pages, connect the `mehdiahmadirad.me` domain and verify production end-to-end.

## In scope

Pages source, custom-domain verification, DNS according to current GitHub documentation, HTTPS and smoke test production.

## Deliverables

Production URL, deployment ID, DNS record evidence, smoke report and rollback instructions.

## Acceptance criteria

- [ ] `https://mehdiahmadirad.me` responds with HTTPS.
- [ ] `/fa/` and `/en/`, assets and 404 are healthy.
- [ ] canonical/hreflang production are correct.
- [ ] Pagefind, RSS and sitemap can be downloaded.
- [ ] Rollback to previous deployment is documented/possible.

## Verification/evidence

HTTP/browser smoke, Pages status, DNS verification and production screenshot.

## Prohibited work

Guess DNS from memory, remove irrelevant record, disable HTTPS, deploy without approval or domain change.

## Stop condition

If permission or ownership is missing, existing DNS conflicts, or another service is at risk, stop immediately and report the exact blocker.

## Handoff

Final delivery includes architecture summary, test status, screenshots, content TBDs, article/translation addition and rollback.
