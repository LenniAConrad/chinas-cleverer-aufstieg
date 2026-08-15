# Fonts

Two families, vendored rather than depended on. `tools/build-cover2.py` writes
a fontconfig file naming this directory and runs Inkscape against it, so the
cover renders the same on a machine that has never seen either face, and the
final PDF embeds both. Nothing in the print path resolves a font over the
network.

| File | Family | Weight | Used for |
| :--- | :--- | ---: | :--- |
| `BarlowCondensed-600.ttf` | Barlow Condensed | 600 | CLEVERER AUFSTIEG, the ZUR connector |
| `BarlowCondensed-700.ttf` | Barlow Condensed | 700 | CHINAS, WELTMACHT, the spine, the back-cover hook |
| `SourceSans3-400.ttf` | Source Sans 3 | 400 | subtitle, blurb, topic field, biography |
| `SourceSans3-600.ttf` | Source Sans 3 | 600 | eyebrow, byline, labels, topic field |
| `SourceSans3-700.ttf` | Source Sans 3 | 700 | reserved |

`BarlowCondensed-500.ttf` and `800.ttf` are kept as the neighbouring weights of
the same family; nothing currently sets them.

## Licence

Both families are under the SIL Open Font License 1.1 (`OFL.txt`), which
permits embedding in a document without any obligation on the document.

- Barlow — Jeremy Tribby, <https://github.com/jpt/barlow>
- Source Sans 3 — Adobe, <https://github.com/adobe-fonts/source-sans>

Retrieved from the Google Fonts static API, 8 August 2026.

## The one modification

The four Barlow Condensed files ship from Google Fonts with the weight folded
into the family name — `Barlow Condensed Medium` and `Barlow Condensed
SemiBold` are separate families as far as fontconfig is concerned, so
`font-family="Barlow Condensed" font-weight="600"` would silently fall back.
Each file has had its typographic family (name ID 16) set to `Barlow
Condensed` and its typographic subfamily (name ID 17) set to the weight, which
is what the full desktop packages of the same fonts carry. Nothing else was
touched; no outline, metric or codepoint differs from upstream.

    fc-query -f '%{family}|%{style}|%{weight}\n' fonts/BarlowCondensed-600.ttf
    Barlow Condensed,Barlow Condensed SemiBold|SemiBold,Regular|180
