# Inter Latin webfont derivative

`inter-latin.woff2` is a Latin webfont subset of the repository's unchanged
Inter version 4.001 variable binary. The outlines, variable axes and OpenType
layout behavior are unchanged for the retained glyphs. Copyright and SIL Open
Font License metadata remain embedded in the file. Inter declares no Reserved
Font Name in its included OFL notice.

Build environment and command:

```text
python -m pip install "fonttools[woff]==4.59.0"
python scripts/subset-fonts.py
python scripts/subset-fonts.py --check
```

The selected Unicode ranges are recorded in `scripts/subset-fonts.py`.
