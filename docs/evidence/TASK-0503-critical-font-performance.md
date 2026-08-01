# TASK-0503 — Critical Font Performance Correction

| Field | Result |
|---|---|
| Date | 2026-08-01 |
| Outcome | Pass |
| Corrected routes | `/en/`, `/en/articles/document-aware-development/` |
| Next task | Resume `TASK-0502` |

## Outcome

The English Home and Article now produce repeatable green mobile LCP and
median Lighthouse Performance above 95. Accessibility remains 100, Best
Practices improves from 96 to 100, and the approved visual baselines pass
without updates.

The visual typeface choices did not change. The Source Serif 4 outlines are
served under the compliance-only derivative family name `MAR Editorial` because
Adobe reserves the word `Source` and a glyph subset is a Modified Version under
the OFL. The derivative keeps both original variable axes and their approved
behavior.

## Transfer comparison

| Asset group | Before | After | Change |
|---|---:|---:|---:|
| English font preloads | 778,956 B | 154,952 B | −80.1% |
| Inter | 352,240 B | 67,616 B | −80.8% |
| Source Serif/MAR Editorial LCP lead face | 426,716 B | 87,336 B | −79.5% |
| JetBrains Mono on the Article | 92,164 B | 30,328 B | −67.1% |

The original upstream binaries remain unchanged beside the derivatives. Exact
hashes, provenance and build commands are in `public/fonts/README.md` and each
family's `FONTLOG.md`.

## Lighthouse evidence

Three Lighthouse 12.8.2 simulated-mobile runs were captured for each route.
The active shell has Node 22.17.0, below Lighthouse 13.4.1's Node 22.19 minimum,
so the newest compatible version was used consistently for the corrective set.

| Route | Performance runs | Median Performance | LCP runs | Median LCP |
|---|---|---:|---|---:|
| `/en/` | 99 / 99 / 99 | 99 | 2.108 / 2.107 / 2.108 s | 2.108 s |
| English Article | 98 / 98 / 98 | 98 | 2.258 / 2.257 / 2.256 s | 2.257 s |

Every final run also records Accessibility 100, Best Practices 100, TBT 0 and
green CLS. SEO remains 66 solely because the sample review routes truthfully
emit `noindex`; this is the previously documented deliberate deviation. Raw
summary values are in `TASK-0503-lighthouse-summary.json`.

## License and glyph verification

- `python scripts/subset-fonts.py --check` passed for all five derivatives,
  validating selected glyph coverage, embedded OFL metadata, derivative naming
  and SHA-256 output.
- Inter and JetBrains Mono declare no Reserved Font Name in their included OFL
  notices. The Source Serif derivative excludes Adobe's Reserved Font Name from
  all font-name fields while preserving copyright, trademark, RFN and license
  attribution fields.
- The published English corpus, punctuation, locale controls and code samples
  passed the complete desktop/mobile end-to-end and visual suite. No missing
  glyph or layout fallback appeared.
- The governing license interpretation is the official OFL guidance on
  [webfonts and Reserved Font Names](https://openfontlicense.org/webfonts-and-reserved-font-names/);
  the unchanged source is Adobe's official
  [Source Serif release](https://github.com/adobe-fonts/source-serif/releases/tag/4.005R).

## Commands and results

```text
python scripts/subset-fonts.py --check
PASS — five derivatives, glyph coverage, metadata and hashes verified

npm run quality
PASS — format, lint, Astro check, 19 unit, 88 E2E/accessibility,
       and 32 approved visual tests; no baseline updates

Invoke-WebRequest http://127.0.0.1:4321/favicon.svg
PASS — 200 image/svg+xml, 386 bytes

npx --yes lighthouse@12.8.2 <route> ... (three times per route)
PASS — both median Performance >=95 and every LCP <=2.5 seconds
```

## Changed behavior and assumptions

- An explicit repository-authored SVG favicon removes the prior `/favicon.ico`
  console error; no third-party asset or license was introduced.
- MAR Editorial LCP and Inter Latin preserve the accepted two-critical-font
  preload contract while cutting its transfer by 80.1%.
- The footnote return control uses the UI font because Source Serif has no
  return-arrow glyph; this prevents a futile full-serif fallback download.
- Subsets intentionally cover the current published fixture corpus and the
  documented safety glyphs. `scripts/subset-fonts.py` must be rerun when genuine
  English content introduces new characters.

## Screenshots and remaining risk

All 32 owner-approved desktop/mobile visual snapshots passed unchanged. No new
screenshots or baseline changes were required. The only remaining operational
risk is keeping the subset input synchronized with future genuine content; the
reproducible script and hash test make that maintenance explicit.
