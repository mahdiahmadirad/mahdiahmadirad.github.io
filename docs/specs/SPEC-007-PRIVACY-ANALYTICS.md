# SPEC-007 — Privacy Analytics

| Field | Value |
|---|---|
| ID | `SPEC-007` |
| Status | `approved` |
| Owner | Mehdi Ahmadirad |
| Governing ADRs | `ADR-002`, `ADR-007`, `ADR-011` |
| Implemented by | `TASK-0611` |
| Last updated | 2026-09-08 |

## 1. Scope

The production blog uses GoatCounter for basic page-view analytics while preserving the site's static-first architecture and avoiding user-level tracking features.

## 2. Integration contract

The global site layout must include exactly one analytics script with:

```html
<script
  data-goatcounter="https://mehdiahmadirad.goatcounter.com/count"
  async
  src="//gc.zgo.at/count.js"
></script>
```

Requirements:

- The script must be loaded from the global Astro layout rather than article or locale templates.
- The script must be asynchronous.
- The site must remain fully usable if the script fails, is blocked, or is unavailable.
- No secret or dashboard credential may be committed.
- No custom event may contain personal data, email addresses, account identifiers, form values, or private draft content.
- No additional analytics, advertising, fingerprinting, session-replay, or cross-site profiling script may be added under this SPEC.

## 3. Coverage

The integration applies equally to Persian and English routes rendered through the global layout, including Home, article, topic, project, About, brand-story and search pages. Static non-layout artifacts such as RSS and sitemap output do not require the browser script.

## 4. Performance and resilience

- Analytics must not become a prerequisite for rendering, navigation, search, or article reading.
- The external script must not be synchronously loaded.
- No client framework or new npm dependency is introduced for analytics.

## 5. Verification

Automated source-level coverage must verify that:

- the GoatCounter endpoint is correct;
- the official counting script source is correct;
- the script is asynchronous;
- the integration occurs exactly once in `BaseLayout.astro`.

The normal format, lint, type, unit and production-build quality gates must remain green.
