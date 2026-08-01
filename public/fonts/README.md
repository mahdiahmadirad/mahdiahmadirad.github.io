# Self-hosted fonts

Every font in this directory comes from the named project's official GitHub
release and is distributed under the SIL Open Font License 1.1. The matching
upstream license is stored beside each family.

The artifacts in the upstream table are unchanged release binaries. Compact
English webfont derivatives are listed separately below; their reproducible
build and license details are in the corresponding `FONTLOG.md` files.

| Family | Version | Upstream release | Included artifact | SHA-256 |
|---|---|---|---|---|
| Vazirmatn | `v33.003` | <https://github.com/rastikerdar/vazirmatn/releases/tag/v33.003> | `vazirmatn/vazirmatn-variable.woff2` | `4e3fa217d38fdafc1fea4414ceb58ca5e662cf0ab5fa735a8c8c20e8b42cad92` |
| Estedad | `8.5` | <https://github.com/aminabedi68/Estedad/releases/tag/8.5> | `estedad/estedad-variable.woff2` | `b40ce2504e442a79e8adddf1d7b27bc4bd171bb94c9e7c93e0732d095bc051b0` |
| Inter | `v4.1` | <https://github.com/rsms/inter/releases/tag/v4.1> | `inter/inter-variable.woff2` | `693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3` |
| Source Serif 4 Roman | `4.005R` | <https://github.com/adobe-fonts/source-serif/releases/tag/4.005R> | `source-serif-4/source-serif-4-variable.woff2` | `f146ee102dddcc5bc7a2cf4af5bcf129832195941b92bd0a512626f390688c1e` |
| Source Serif 4 Italic | `4.005R` | <https://github.com/adobe-fonts/source-serif/releases/tag/4.005R> | `source-serif-4/source-serif-4-variable-italic.woff2` | `da0aa4649d3a48d10809ee4c55099abe797653abfceda94abd31b2f42a3e0f0f` |
| JetBrains Mono | `v2.304` | <https://github.com/JetBrains/JetBrainsMono/releases/tag/v2.304> | `jetbrains-mono/jetbrains-mono-regular.woff2` | `a9cb1cd82332b23a47e3a1239d25d13c86d16c4220695e34b243effa999f45f2` |

Downloaded and verified on 2026-07-30.

| Webfont derivative | Source | Included artifact | SHA-256 |
|---|---|---|---|
| Inter Latin | Inter `v4.1` | `inter/inter-latin.woff2` | `04ec0fe4202bb20fe7dd86359f4087237f6f934e25579f1841953d8e9788e20f` |
| MAR Editorial Roman | Source Serif 4 `4.005R` | `source-serif-4/mar-editorial-variable.woff2` | `e1ec0d8a6ec7f5304609f52b587fc95211b1fd61fdb6a6281e4436598d3a61d1` |
| MAR Editorial LCP | Source Serif 4 `4.005R` | `source-serif-4/mar-editorial-lcp.woff2` | `1c12e448fb829311257f0bb6fc2a85950b93bc50852c16d0ebe613df86fc1adb` |
| MAR Editorial Italic | Source Serif 4 `4.005R` | `source-serif-4/mar-editorial-variable-italic.woff2` | `9f8ec6f894c2832ebefa39548d5a6dfb7b5bba7aecb6f8205527d829b4b3ecc5` |
| JetBrains Mono Latin | JetBrains Mono `v2.304` | `jetbrains-mono/jetbrains-mono-latin.woff2` | `f8fe2ef0df2b60c31cb98937d67adf60f96b92a6788dedfcb8a3cd3403656ac4` |

No more than two locale-critical files are preloaded on a page:

- Persian: Vazirmatn and Estedad
- English: the Source Serif 4-derived MAR Editorial LCP face and Inter Latin

MAR Editorial Italic and JetBrains Mono load only when used. Font subsetting is
treated as a modified build: the OFL notices and metadata are retained, the
build and hashes are recorded, and Adobe's Reserved Font Name `Source` is not
used for the derivative family.
