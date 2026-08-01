# TASK-0502 — Human Quality Review (Blocked)

| Field | Value |
|---|---|
| Task | `TASK-0502` |
| Date | 2026-08-01 |
| Outcome | Blocked by high-severity English LCP defect |
| Corrective task | `TASK-0503` |

## Review boundary

The review used the production Astro preview in the user's connected Chrome
profile. Home and Article were inspected at 1440×1100 and 390×844 for Persian
and English. Articles index, Topics index/detail, Projects, About, Search and the
bilingual 404 received a mobile landmark/heading/overflow smoke test in both
locales. Lighthouse 13.4.1 ran with its mobile simulated-throttling profile.

The review stopped when the English performance defect crossed TASK-0502's
blocker/high stop condition. Print preview, manual reduced-motion emulation and
deployment-readiness approval remain unreviewed.

## Passed manual checks

- English uses `lang=en`, `dir=ltr`, Source Serif 4 reading text and Inter UI;
  Persian uses `lang=fa`, `dir=rtl`, Vazirmatn reading text and Estedad headings.
- Fonts reached `document.fonts.status=loaded`; reading columns, line height,
  headings, rules, software-native graphics and color hierarchy were coherent
  across the four Home/Article views.
- The skip link becomes visible on keyboard focus and transfers focus to
  `main#main-content`. Subsequent focus indicators use the specified purple
  outline and shadow. Primary navigation order is logical.
- Persian code, `ADR → SPEC → TASK → CODE`, `npm run check`,
  `translationKey` and the sample URL retain LTR isolation within RTL prose.
- Mobile tables and code blocks scroll inside their own regions. The table
  region has a localized accessible name and `tabindex=0`; neither locale has
  document-level horizontal overflow.
- The Persian Article accessibility tree exposes localized landmark, TOC,
  figure, table, note, related-writing and article-navigation names in logical
  reading order.
- All secondary routes expose one localized H1, correct document direction,
  loaded fonts, distinct primary/secondary navigation names and no horizontal
  overflow. No site-authored runtime error was observed in normal navigation.
- Canonical, description and translated `hreflang` content are truthful for
  the reviewed Home and Article fixtures.

## Lighthouse results

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/en/` | **80** | 100 | 96 | 66 | **5,258 ms** | 0 | 0 ms |
| `/en/articles/document-aware-development/` | **79** | 100 | 96 | 66 | **5,708 ms** | 0 | 0 ms |
| `/fa/` | 97 | 100 | 96 | 66 | 2,559 ms | 0 | 0 ms |
| `/fa/articles/document-aware-development/` | 95 | 100 | 96 | 66 | 2,864 ms | 0 | 0 ms |

The scores are preserved in
[`TASK-0502-lighthouse-summary.json`](TASK-0502-lighthouse-summary.json). Chrome's
official Lighthouse guidance treats failing audits as indicators to investigate
and notes that performance scores can vary with environment; this review uses
the raw repeated defect and transfer evidence rather than the score alone:
<https://developer.chrome.com/docs/lighthouse/>.

On this Windows host, some Lighthouse invocations emitted `EPERM` while deleting
their temporary Chrome profile after the audit had completed. Each expected JSON
report was already complete and parseable with matching Lighthouse version,
requested URL, categories and metrics; the cleanup warning did not alter the
recorded audit results.

## Defects and deviations

### Q-0502-01 — English critical font delivery (high, open)

English preloads the complete 352,240-byte Inter variable font and the complete
426,716-byte Source Serif 4 variable font. Under Lighthouse mobile throttling,
the Home subtitle/Article heading receives a late font-swap paint and LCP becomes
5.3–5.7 seconds. This misses both the ≥95 target and green LCP. Persian's two
critical fonts total 232,076 bytes and its performance remains 95–97.

Disposition: blocking; correct in TASK-0503. Do not approve deployment first.

### Q-0502-02 — Missing favicon (low, open)

Every Lighthouse page requests `/favicon.ico`, receives 404 and records a
console error. Best Practices remains 96, above target, but the avoidable error
belongs in TASK-0503 with the font fix.

### Intentional SEO deviation (accepted for review build)

Fixture routes intentionally emit `noindex` until genuine content is supplied,
so Lighthouse SEO is 66. The metadata is truthful and the route behavior was
approved earlier; turning indexing on for fictional content would violate the
content-safety contract. Re-run SEO after genuine publication content exists.

### Deferred content

The About pages explicitly say that genuine biography content is pending. No
code/source TODO or FIXME remains. This is a product-owner content dependency,
not permission to fabricate a biography.

## Remaining review work

- Execute TASK-0503 and obtain green English mobile LCP evidence.
- Re-run the stopped Lighthouse matrix.
- Review print preview and reduced-motion behavior manually.
- Ask the product owner/reviewer to register deployment readiness.

TASK-0502 remains blocked and TASK-0601 must not start.
