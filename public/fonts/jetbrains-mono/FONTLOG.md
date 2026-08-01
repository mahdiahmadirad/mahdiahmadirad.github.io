# JetBrains Mono Latin webfont derivative

`jetbrains-mono-latin.woff2` is a Latin webfont subset of the repository's
unchanged JetBrains Mono version 2.304 regular binary. The outlines and
OpenType layout behavior are unchanged for retained glyphs. Copyright and SIL
Open Font License metadata remain embedded in the file. JetBrains Mono declares
no Reserved Font Name in its included OFL notice.

Build environment and command:

```text
python -m pip install "fonttools[woff]==4.59.0"
python scripts/subset-fonts.py
python scripts/subset-fonts.py --check
```

The selected Unicode inputs are recorded in `scripts/subset-fonts.py`.
