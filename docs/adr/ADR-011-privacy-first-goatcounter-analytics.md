# ADR-011 — Privacy-first GoatCounter Analytics

| Field | Value |
|---|---|
| Status | `accepted` |
| Date | 2026-09-08 |
| Owner | Mehdi Ahmadirad |
| Affects | `SPEC-001`, `SPEC-005`, `SPEC-007` |
| Refines | `ADR-002`, `ADR-007` |

## Context

The production blog needs basic page-view analytics so the owner can understand
which pages are read and which external sources bring readers. The existing
architecture intentionally defaults to no analytics and no third-party scripts,
and requires an explicit decision plus privacy review before introducing either.

The owner selected the hosted GoatCounter service and supplied the site-specific
counting endpoint `https://mehdiahmadirad.goatcounter.com/count` together with
the standard client script hosted at `//gc.zgo.at/count.js`.

## Decision

- Use GoatCounter as the only production analytics provider.
- Load the owner-supplied GoatCounter script once from the global Astro layout so
  all normal site pages are measured consistently.
- Keep the integration limited to page-view analytics. Do not add advertising,
  cross-site profiling, session replay, fingerprinting, custom user identifiers,
  or custom events containing personal data without a new privacy review and ADR.
- Do not commit an API key, token, password, dashboard credential, or other
  secret. The public counting endpoint is configuration, not a secret.
- The analytics script must remain asynchronous and must not block primary
  reading or navigation.
- If GoatCounter's privacy behavior, data collection model, or hosting terms
  materially change, review this ADR before retaining the integration.

## Privacy review

This integration deliberately chooses coarse site analytics over user-level
tracking. The blog must not enrich GoatCounter events with email addresses,
account identifiers, form values, article-draft data, or other personal data.
The site remains usable when the analytics script is blocked or unavailable.

## Consequences

- `SPEC-007` defines the testable telemetry contract.
- `SPEC-001`'s previous default of no analytics is superseded by this explicit
  production decision.
- `SPEC-005`'s zero-third-party-script default now has this single bounded
  exception.
- The global layout gains one external asynchronous script and therefore a small
  new availability/privacy dependency on GoatCounter.

## Rejected alternatives

- Google Analytics: more collection and product complexity than needed for this
  personal blog.
- Self-hosted analytics: adds infrastructure and operational work solely to
  count page views.
- Per-page integration: duplicates configuration and risks inconsistent coverage.
