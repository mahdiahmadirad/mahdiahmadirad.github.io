# TASK-0502 — Human Quality Review (Blocked)

| Field | Value |
|---|---|
| Task | `TASK-0502` |
| Date | 2026-08-02 |
| Outcome | Blocked by reproducible approved-visual-gate portability defect |
| Corrective input | Completed `TASK-0503` |
| New corrective task | `TASK-0504` |

## Outcome

The resumed human review found no accessibility, overflow, performance or
publishing-content blocker. The English critical-font and missing-favicon
defects that stopped the first review are closed. Persian and English Home and
Article remain usable at desktop and mobile sizes, with keyboard, screen-reader
structure, print, reduced-motion, bidirectional prose and no-JavaScript behavior
intact.

The final repeatable quality run exposed a separate high-severity gate defect:
the unchanged English Article mobile capture differs from the immutable
owner-approved lead baseline by 0.613%, above the 0.5% limit on this macOS/Chrome
environment. Three isolated repeats produced the identical result. Visual
inspection shows matching geometry and no user-facing regression; the diff is
concentrated in platform text rasterization and the later accepted third topic
label. Nevertheless, the failing gate cannot be ignored, weakened or repaired
by updating the baseline. TASK-0502 therefore stops and deployment readiness is
not registered until TASK-0504 makes the approved visual check reproducible.

## Review boundary and evidence

The production Astro preview was inspected at 1440×1100 and 390×844. The live
browser accessibility tree and computed layout were reviewed for the Persian
and English Home and bilingual sample Article. Existing approved Home/Article
captures remain unchanged. The behavior and accessibility matrix is green; 31
of 32 visual checks pass, with the single reproducible portability failure
described below.

| Surface | FA | EN | Result |
|---|:---:|:---:|---|
| Home, desktop/mobile typography and composition | ✓ | ✓ | Pass |
| Article, desktop/mobile reading and landmarks | ✓ | ✓ | Pass |
| Keyboard entry, skip link and focus indicator | ✓ | ✓ | Pass |
| Screen-reader landmark/heading smoke | ✓ | ✓ | Pass |
| 200% reflow equivalent and 320/390 px overflow | ✓ | ✓ | Pass |
| Bidirectional code, identifiers and URLs | ✓ | ✓ | Pass |
| Print media composition | ✓ | ✓ | Pass |
| Reduced-motion preference | ✓ | ✓ | Pass |
| Primary content without JavaScript | ✓ | ✓ | Pass |
| Canonical, hreflang and fixture metadata content | ✓ | ✓ | Pass |

Manual observations:

- The first keyboard stop is the localized skip link. Its specified purple
  outline/shadow is visible, and activation transfers focus to `main#main-content`.
- The accessibility trees expose localized banner, primary navigation, main,
  article, TOC, figure, table, note, related-writing, article-navigation and
  footer names in logical order.
- Persian uses `lang=fa`, `dir=rtl`, Estedad headings and Vazirmatn prose;
  English uses `lang=en`, `dir=ltr`, MAR Editorial/Source Serif-derived headings
  and Inter UI. All reviewed fonts reached `document.fonts.status=loaded`.
- Persian code, identifiers and URLs compute to `direction:ltr` with
  `unicode-bidi:isolate`. The sample table scrolls inside its localized,
  focusable region instead of overflowing the document.
- Under print media, site navigation, footer, TOC and decorative controls are
  removed. The localized author and canonical URL are present; prose, code,
  tables, figures and footnotes remain readable and contained in both editions.
- With JavaScript disabled, both Home pages and both sample Articles retain
  their H1, navigation and complete primary content at 390 px without document
  overflow. Article reading does not depend on its optional script.

Relevant approved/review captures:

- `TASK-0201-home-{fa,en}-{desktop,mobile}.png`
- `TASK-0301-article-{fa,en}-{desktop,mobile}.png`
- `TASK-0301-article-en-print.png`
- `TASK-0302-article-{fa,en}-zoom-200.png`

## Lighthouse review

Lighthouse 13.4.1 ran against a fresh production build with its simulated
mobile profile. All four pages now meet the Performance, Accessibility and Best
Practices targets, have zero CLS/TBT and have green LCP.

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/en/` | 99 | 100 | 100 | 66 | 1,954 ms | 0 | 0 ms |
| `/en/articles/document-aware-development/` | 99 | 100 | 100 | 66 | 2,103 ms | 0 | 0 ms |
| `/fa/` | 99 | 100 | 100 | 66 | 2,252 ms | 0 | 0 ms |
| `/fa/articles/document-aware-development/` | 98 | 100 | 100 | 66 | 2,403 ms | 0 | 0 ms |

The current values are recorded in
[`TASK-0502-lighthouse-summary.json`](TASK-0502-lighthouse-summary.json).
TASK-0503 additionally recorded three repeated English runs with median
Performance 99/98 and LCP 2.108/2.257 seconds.

The SEO score is the accepted review-build deviation: sample routes truthfully
emit `noindex` until genuine publishable content is approved. Canonical URLs,
localized descriptions, published-edition hreflang and Article metadata remain
present. SEO must be rerun with genuine publication content.

## Defects and deferrals

| ID | Severity | Disposition | Evidence |
|---|---|---|---|
| `Q-0502-01` English critical font delivery | High | Closed by TASK-0503 | Fresh EN LCP 1.954/2.103 s; repeated corrective medians green |
| `Q-0502-02` missing favicon | Low | Closed by TASK-0503 | `/favicon.svg` returns 200 `image/svg+xml`; Best Practices 100 |
| `Q-0502-03` approved visual gate is not portable | High | Open; TASK-0504 | EN Article mobile ratio 0.00613285 in four identical runs; limit 0.005 |

`Q-0502-03` is a quality-gate defect rather than an approved-design rejection.
The current and approved images have the same 390 px geometry, wrapping and
overall composition. The changed pixels are predominantly glyph-edge
rasterization; the metadata also contains the third topic added by the accepted
site-completion work. CI is pinned to Ubuntu 24.04 while the current review host
is macOS, so a platform-dependent pixel oracle is not sufficient deployment
evidence.

No source TODO, FIXME, XXX or HACK marker remains in the main track. Genuine
biography, projects and publication copy remain an explicit product-owner
content dependency. Those fixtures are visibly labeled and `noindex`; this is
an authorized content deferral, not permission to fabricate personal details.

## Commands and results

```text
npm ci --engine-strict=false
PASS — 401 locked packages installed; 0 vulnerabilities

npm run build
PASS — 27 routes; 2 Pagefind languages; 21 indexed pages; 909 words

Lighthouse 13.4.1 simulated-mobile matrix
PASS — Performance 98–99; Accessibility 100; Best Practices 100;
       LCP 1.954–2.403 s; CLS 0; TBT 0

JavaScript-disabled FA/EN Home + Article smoke at 390×844
PASS — localized H1/navigation/content present; no document overflow

print + reduced-motion FA/EN Article capture
PASS — localized print header/canonical; controls hidden; no overflow;
       reduced-motion media query active

curl -I http://127.0.0.1:4321/favicon.svg
PASS — 200 image/svg+xml, 386 bytes

npm run quality
FAIL — format, lint, check, 19 unit tests, build/validation and 88
       behavior/accessibility tests passed; approved visual matrix finished
       31/32 with EN Article mobile ratio 0.00613285 > 0.005

isolated EN Article mobile visual check --repeat-each=3
FAIL — three identical 0.00613285 ratios; reproducible, no baseline update

git diff --check
PASS
```

The local shell provides Node 25.2.1, outside the pinned Node 24.18/npm 11
policy. Installation used the documented local engine override. TASK-0504 must
reproduce the visual check in the exact pinned CI runtime rather than treating
this environment difference as a nominal pass.

## Changed files, decisions and remaining risks

- Updated this report and Lighthouse summary with resumed-review evidence.
- Kept TASK-0502 blocked and created TASK-0504 after the reproducible quality
  gate crossed the task's high-severity stop condition.
- No application code, visual token, approved baseline or publication content
  changed during this review.
- TASK-0504 must prove the approved visual gate in the pinned CI environment and
  make the check portable without increasing the threshold or changing the
  baseline. TASK-0601 remains blocked.

Next task: `TASK-0504`.
