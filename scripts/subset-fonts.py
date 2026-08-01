"""Build and verify the English webfont subsets used by the site.

Requires Python 3.13 and fonttools[woff]==4.59.0. The selected ranges cover
Basic Latin, Latin-1, common punctuation, currency, arrows and mathematical
symbols. OpenType layout features and license metadata are retained.
"""

from __future__ import annotations

import argparse
import hashlib
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
RANGES = ((0x0020, 0x007E),)
UNICODES = {codepoint for start, end in RANGES for codepoint in range(start, end + 1)}
UNICODES.update(
    {
        0x00A0,  # non-breaking space
        0x00A9,  # copyright used by the footer
        0x00B7,  # middle dot used by metadata
        0x2010,
        0x2011,
        0x2012,
        0x2013,
        0x2014,
        0x2018,
        0x2019,
        0x201C,
        0x201D,
        0x2022,
        0x2026,
        0x2044,  # fraction slash
        0x20AC,  # euro
        0x2122,  # trademark
        0x2190,
        0x2191,
        0x2192,
        0x2193,
        0x21A9,  # return arrow used by article navigation
        0x2212,  # mathematical minus
        0x221E,  # infinity
        0x2260,
        0x2264,
        0x2265,
        0xFFFD,  # replacement character
    }
)
EDITORIAL_UNICODES = {
    ord(character)
    for character in (
        " !\"%&'()+,-./0123456789:;?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    )
}
EDITORIAL_UNICODES.update(
    {
        0x00A0,
        0x2010,
        0x2011,
        0x2012,
        0x2013,
        0x2014,
        0x2018,
        0x2019,
        0x201C,
        0x201D,
        0x2022,
        0x2026,
        0x2190,
        0x2192,
        0x21A9,
        0xFFFD,
    }
)
UI_UNICODES = EDITORIAL_UNICODES | {0x00A9, 0x00B7}
LCP_UNICODES = {
    ord(character)
    for character in (
        "Mehdi Ahmadirad"
        "Sample: Document-Aware Development"
        "Sample: Boundaries and Feedback Loops"
        "Software architecture, engineering, and the reasoning behind systems."
        "A sample fixture for testing how decisions, specifications, tasks, "
        "and code relate in the English content model."
        "A sample fixture for testing independent publication of a systems "
        "boundary and feedback-loop essay."
        "Sample fixture. This article is sample content for reviewing the "
        "bilingual reading experience. It makes no claim about the author’s "
        "work or views."
        "/012?CFIKLRSTUjq↩"
    )
} | {0x2013, 0x2014, 0x2019, 0xFFFD}

FONTS = (
    (
        ROOT / "public/fonts/inter/inter-variable.woff2",
        ROOT / "public/fonts/inter/inter-latin.woff2",
        False,
    ),
    (
        ROOT / "public/fonts/source-serif-4/source-serif-4-variable.woff2",
        ROOT / "public/fonts/source-serif-4/mar-editorial-variable.woff2",
        True,
    ),
    (
        ROOT / "public/fonts/source-serif-4/source-serif-4-variable.woff2",
        ROOT / "public/fonts/source-serif-4/mar-editorial-lcp.woff2",
        True,
    ),
    (
        ROOT / "public/fonts/source-serif-4/source-serif-4-variable-italic.woff2",
        ROOT / "public/fonts/source-serif-4/mar-editorial-variable-italic.woff2",
        True,
    ),
    (
        ROOT / "public/fonts/jetbrains-mono/jetbrains-mono-regular.woff2",
        ROOT / "public/fonts/jetbrains-mono/jetbrains-mono-latin.woff2",
        False,
    ),
)


def rename_editorial_derivative(font: TTFont) -> None:
    """Remove Adobe's Reserved Font Name from derivative font-name fields."""

    replacements = (
        ("Source Serif 4 Variable", "MAR Editorial Variable"),
        ("SourceSerif4Variable", "MAREditorialVariable"),
        ("SourceSerif4Roman", "MAREditorialRoman"),
        ("SourceSerif4Italic", "MAREditorialItalic"),
    )
    attribution_ids = {0, 7, 13, 14}

    for record in font["name"].names:
        if record.nameID in attribution_ids:
            continue
        value = record.toUnicode()
        for original, replacement in replacements:
            value = value.replace(original, replacement)
        record.string = value.encode(record.getEncoding())


def requested_unicodes(source: Path, destination: Path, renamed: bool) -> set[int]:
    if destination.name == "mar-editorial-lcp.woff2":
        return LCP_UNICODES
    if renamed:
        return EDITORIAL_UNICODES
    if source.name == "inter-variable.woff2":
        return UI_UNICODES
    return UNICODES


def build(source: Path, destination: Path, rename: bool) -> None:
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    options.name_legacy = True
    options.notdef_glyph = True
    options.notdef_outline = True
    options.recommended_glyphs = True

    font = subset.load_font(str(source), options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=requested_unicodes(source, destination, rename))
    subsetter.subset(font)
    if rename:
        rename_editorial_derivative(font)
    destination.parent.mkdir(parents=True, exist_ok=True)
    subset.save_font(font, str(destination), options)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def verify(source: Path, destination: Path, renamed: bool) -> None:
    if not destination.is_file():
        raise SystemExit(f"Missing subset: {destination.relative_to(ROOT)}")

    original = TTFont(source)
    derived = TTFont(destination)
    requested = requested_unicodes(source, destination, renamed)
    expected = requested.intersection(original.getBestCmap())
    actual = set(derived.getBestCmap())
    missing = expected - actual
    if missing:
        formatted = ", ".join(f"U+{value:04X}" for value in sorted(missing))
        raise SystemExit(f"Missing glyphs in {destination.name}: {formatted}")

    names = "\n".join(record.toUnicode() for record in derived["name"].names)
    if "SIL Open Font License, Version 1.1" not in names:
        raise SystemExit(f"Missing OFL metadata in {destination.name}")
    if renamed and "MAR Editorial" not in names:
        raise SystemExit(f"Missing derivative family name in {destination.name}")

    print(
        f"{destination.relative_to(ROOT)}: {destination.stat().st_size} bytes "
        f"sha256={sha256(destination)}"
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check",
        action="store_true",
        help="verify existing outputs without rebuilding them",
    )
    args = parser.parse_args()

    for source, destination, renamed in FONTS:
        if not args.check:
            build(source, destination, renamed)
        verify(source, destination, renamed)


if __name__ == "__main__":
    main()
