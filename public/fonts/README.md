# Self-hosted fonts

Every font in this directory comes from the named project's official GitHub
release and is distributed under the SIL Open Font License 1.1. The matching
upstream license is stored beside each family.

The WOFF2 files are upstream release artifacts. They have not been subset,
renamed, converted, or otherwise modified. Keeping the font programs unchanged
also preserves the Reserved Font Name requirements applicable to Source Serif.

| Family | Version | Upstream release | Included artifact | SHA-256 |
|---|---|---|---|---|
| Vazirmatn | `v33.003` | <https://github.com/rastikerdar/vazirmatn/releases/tag/v33.003> | `vazirmatn/vazirmatn-variable.woff2` | `4e3fa217d38fdafc1fea4414ceb58ca5e662cf0ab5fa735a8c8c20e8b42cad92` |
| Estedad | `8.5` | <https://github.com/aminabedi68/Estedad/releases/tag/8.5> | `estedad/estedad-variable.woff2` | `b40ce2504e442a79e8adddf1d7b27bc4bd171bb94c9e7c93e0732d095bc051b0` |
| Inter | `v4.1` | <https://github.com/rsms/inter/releases/tag/v4.1> | `inter/inter-variable.woff2` | `693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3` |
| Source Serif 4 Roman | `4.005R` | <https://github.com/adobe-fonts/source-serif/releases/tag/4.005R> | `source-serif-4/source-serif-4-variable.woff2` | `f146ee102dddcc5bc7a2cf4af5bcf129832195941b92bd0a512626f390688c1e` |
| Source Serif 4 Italic | `4.005R` | <https://github.com/adobe-fonts/source-serif/releases/tag/4.005R> | `source-serif-4/source-serif-4-variable-italic.woff2` | `da0aa4649d3a48d10809ee4c55099abe797653abfceda94abd31b2f42a3e0f0f` |
| JetBrains Mono | `v2.304` | <https://github.com/JetBrains/JetBrainsMono/releases/tag/v2.304> | `jetbrains-mono/jetbrains-mono-regular.woff2` | `a9cb1cd82332b23a47e3a1239d25d13c86d16c4220695e34b243effa999f45f2` |

Downloaded and verified on 2026-07-30.

Only two locale-critical files are preloaded on a page:

- Persian: Vazirmatn and Estedad
- English: Inter and Source Serif 4 Roman

Source Serif Italic and JetBrains Mono load only when used. Future subsetting
must be treated as a modified font build: retain OFL notices, record the build
process and hashes, and rename any family protected by a Reserved Font Name
unless the copyright holder grants permission.
