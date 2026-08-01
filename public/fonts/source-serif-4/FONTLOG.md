# MAR Editorial webfont derivative

`mar-editorial-variable.woff2`, `mar-editorial-lcp.woff2` and
`mar-editorial-variable-italic.woff2` are Latin webfont subsets of the
repository's unchanged Source Serif 4 version 4.005 binaries. Both original
variable axes are retained so browser interpolation and rasterization remain
pixel-compatible with the approved typography.

The LCP face contains the exact published English Home and Article-title glyphs
and is preloaded for those headings. The general Roman face supplies the wider
published prose and UI safety set without blocking the title paint.

The outlines, variable axes and OpenType layout behavior are unchanged for the
retained glyphs. Adobe's Reserved Font Name `Source` is not used as the
derivative family name. Copyright, trademark, attribution, Reserved Font Name
and SIL Open Font License metadata remain embedded in the files.

Build environment and command:

```text
python -m pip install "fonttools[woff]==4.59.0"
python scripts/subset-fonts.py
python scripts/subset-fonts.py --check
```

The selected Unicode ranges are recorded in `scripts/subset-fonts.py`.
