# ADR-007 — GitHub Pages Delivery

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-07-29 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-005` |

## Context

The site is static and must be published inexpensively, reproducibly and directly from the public repository.

## Decision

GitHub Actions build, validate, and generate Pages artifact; GitHub Pages hosts it on `mehdiahmadirad.me`. `site` equals the production URL and `public/CNAME` only includes the domain.

## Consequences

DNS is set only in the deployment phase and with current GitHub documentation. HTTPS, routes, assets, Pagefind, feeds and rollback will be smoke-tested after release.

## Rejected alternatives

Runtime hosting and platform-specific server features are not product requirements and reduce portability.
