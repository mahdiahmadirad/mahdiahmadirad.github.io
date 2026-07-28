# SPEC-005 — Technical Architecture

| Field | Value |
|---|---|
| ID | `SPEC-005` |
| Status | `approved` |
| Owner | Mehdi Ahmadirad |
| Governing ADRs | `ADR-001`, `ADR-002`, `ADR-003`, `ADR-006`, `ADR-007` |
| Implemented by | `TASK-0002`, `TASK-0101`, `TASK-0402`, `TASK-0501`, `TASK-0601`, `TASK-0602` |
| Last updated | 2026-07-29 |

## 1. Macro architecture

```text
Markdown / MDX + typed frontmatter
             ↓
Astro Content Collections
             ↓
Astro pages, layouts, components
             ↓
Static HTML + CSS + SVG + minimal JS
             ↓
Pagefind indexing + validation
             ↓
GitHub Actions artifact
             ↓
GitHub Pages
             ↓
mehdiahmadirad.me
```

The production output is static. There is no runtime server, database, session and dedicated API in the first version.

## 2. Technologies

| Need | Choice |
|---|---|
| SSG | Astro |
| language | TypeScript with strict mode |
| content | Markdown, MDX only if needed |
| schema | Astro Content Collections + Official Zod/API version |
| styling | Custom CSS + custom properties |
| graphic | Hand-coded SVG |
| syntax highlighting | Shiki through Astro |
| search | Pagefind after build |
| tests | Playwright + axe for baseline checks |
| deployment | GitHub Actions |
| host | GitHub Pages |
| domain | `mehdiahmadirad.me` |

The versions should be selected from the official latest stable when starting the project and pinned with the exact version and lockfile. It is forbidden to use `latest` or major-only in automation.

## 3. Repository structure

```text
.
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── docs/
│   ├── adr/
│   ├── specs/
│   ├── tasks/
│   └── evidence/
├── public/
│   ├── CNAME
│   ├── favicon.svg
│   ├── fonts/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── global/
│   │   ├── home/
│   │   ├── article/
│   │   └── content/
│   ├── content/
│   │   ├── articles/{translation-key}/fa.md|en.md
│   │   ├── topics/{translation-key}/fa.md|en.md
│   │   ├── projects/{translation-key}/fa.md|en.md
│   │   └── pages/{translation-key}/fa.md|en.md
│   ├── i18n/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   └── [lang]/
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── reset.css
│   │   ├── global.css
│   │   ├── typography.css
│   │   └── print.css
│   └── content.config.ts
├── tests/
│   ├── e2e/
│   ├── accessibility/
│   └── visual/
├── astro.config.mjs
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

It is a public and integrated repository: source, articles, docs and assets are versioned together. Secrets, private drafts, and unlicensed assets stay out of Git.

## 4. Astro Configuration

Logical values:

```js
export default defineConfig({
  site: 'https://mehdiahmadirad.me',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    locales: ['fa', 'en'],
    defaultLocale: 'fa',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
```

The agent must match the syntax to the pinned version. Do not set `base` for custom domain. File `public/CNAME` only includes:

```text
mehdiahmadirad.me
```

## 5. Components

Recommended components:

- `SiteHeader`, `SiteFooter`, `LanguageSwitch`, `SkipLink`
- `SystemGraphic`
- `FeaturedEssay`, `WritingList`, `WritingListItem`
- `ArticleHeader`, `ArticleMeta`, `TableOfContents`
- `TranslationStatus`, `RelatedArticles`, `ArticlePager`
- `CodeBlock`, `Callout`, `Figure`, `Footnotes`
- `SearchDialog` or `SearchPage`

Principles:

- Components are server-rendered by default.
- Client hydration is limited to necessary interactions: Search, compact menu and code copying.
- A large framework island for the header or article is prohibited.
- Props are typed and UI strings come from the dictionary.

## 6. CSS Architecture

- Suggested cascade layers: `reset, tokens, base, components, utilities`.
- Component styles are scoped or colocated, but tokens are global.
- Logical properties are mandatory.
- Do not add a utility framework or CSS-in-JS.
- nesting and the latest CSS only according to the target browser.
- selector based on `lang` and `dir` in cases of allowed typography/layout.

## 7. Markdown and MDX

Markdown is the default. MDX only for:

- Interactive chart
- comparison component
- timeline
- Runnable demo

Allowlist MDX components. Free import of arbitrary components in articles without review is prohibited. Raw HTML in Markdown is preferably disabled or restricted.

## 8. SVG

- `SystemGraphic.astro` with SVG inline and CSS variables.
- Secure IDs with prefix/utility so that multiple instances do not interfere.
- Article assets may be standalone SVG files.
- Sanitize anonymous/external SVG.
- Do not reproduce the reference’s building-architecture graphic; only its position, visual weight and proportions are authoritative.

## 9. Pagefind

Pagefind runs on `dist` after `astro build`. Because `lang` is set on the root element, the language indexes remain separate.

```json
{
  "scripts": {
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview",
    "check": "astro check",
    "test:e2e": "playwright test"
  }
}
```

The exact command must match the project’s package manager. Persian stemming may not be supported in Pagefind; Persian search must be tested with a real corpus and its limitations documented.

## 10. SEO and Feed

- Official sitemap integration
- Separate RSS for `/fa/rss.xml` and `/en/rss.xml`
- canonical and hreflang from content relationship
- A single metadata component
- JSON-LD with secure serialization
- `robots.txt`
- A default brand preview image and an optional article-specific image

## 11. Performance

- No global JS framework
- critical typography and layout without dependence on JS
- font subset and preload only for really critical files
- Responsive image and clear dimensions to avoid CLS
- SVG/asset budget
- Pagefind and Search as lazy load
- Zero third-party scripts by default

Guideline budget for the initial Home:

```text
Initial custom JS: < 30 KB gzip
Total CSS: < 50 KB gzip
Critical fonts: at most 2 preloaded files
CLS: < 0.1
```

## 12. Accessibility

- semantic landmarks
- skip link
- clear keyboard focus
- navigation with `aria-current`
- The correct language of documents and passages
- heading hierarchy
- TOC and disclosure can be used with keyboard
- text label for icon controls
- target at least 44px
- Zoom up to 200% without losing content
- Automated axe testing only complements manual review

## 13. Testing Matrix

Minimum visual snapshots:

```text
Home     × FA/EN × Desktop/Mobile
Article  × FA/EN × Desktop/Mobile
Topics   × FA/EN × Desktop/Mobile
Projects × FA/EN × Desktop/Mobile
About    × FA/EN × Desktop/Mobile
```

Functional:

- language switch with available/unavailable translation
- draft filtering
- date/number localization
- unknown topic build failure
- TOC headings
- Pagefind FA/EN
- internal links
- RSS validation
- 404
- no-JS reading

Visual baselines can be updated only after the approval of the product owner.

## 14. CI

On the pull request:

1. clean install from lockfile
2. format/lint
3. `astro check`
4. content schema validation
5. build + Pagefind
6. unit/functional tests
7. Playwright
8. link/HTML checks

On push to `main`:

- The same repeatable build
- upload Pages artifact
- deploy with official Pages actions
- environment protection if needed

Actions should be pinned with SHA or the exact verified version. The official Astro manual explains the use of the official Astro Action and deploy-pages: <https://docs.astro.build/en/guides/deploy/github/>.

## 15. DNS and Domain

- `site` is equal to `https://mehdiahmadirad.me`
- apex records according to the current GitHub Pages documentation at startup
- Enforce HTTPS
- First, verify the custom domain in GitHub Pages
- Do not write DNS values from memory; verify them against current official GitHub documentation during implementation.

## 16. Security and Privacy

- No secrets in the client bundle
- Dependabot or equivalent tool
- Third-party minimization
- external link with `rel` suitable when opened in a new tab
- analytics only with explicit decision and privacy review
- CSP as much as possible for a static site, given the limitations of GitHub Pages headers

## 17. Official sources

- <https://docs.astro.build/en/guides/deploy/github/>
- <https://docs.astro.build/en/guides/internationalization/>
- <https://docs.astro.build/en/guides/content-collections/>
- <https://pagefind.app/docs/>
- <https://pagefind.app/docs/multilingual/>
- <https://playwright.dev/docs/test-snapshots>
