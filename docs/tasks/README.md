# Bounded Task Plan

## Execution order

```text
0001 → 0002 → 0101 → 0102 → 0201 → 0202
                                      ↓ approval
                                    0301 → 0302
                                             ↓ approval
                                           0401 → 0402 → 0501 → 0502 → 0601 → 0602
                                                                  ↑
                                                           0503 → 0504
```

| ID | Outcome | Initial status |
|---|---|---|
| [TASK-0001](phase-00-discovery/TASK-0001-audit-repository-and-decisions.md) | inventory and assumptions | ready |
| [TASK-0002](phase-00-discovery/TASK-0002-bootstrap-astro-repository.md) | Astro static baseline | blocked by 0001 |
| [TASK-0101](phase-01-foundation/TASK-0101-implement-content-and-i18n-foundation.md) | schema, routes and i18n | blocked by 0002 |
| [TASK-0102](phase-01-foundation/TASK-0102-implement-design-system-foundation.md) | tokens and design system | blocked by 0002 |
| [TASK-0201](phase-02-home/TASK-0201-build-bilingual-home-slice.md) | Home FA/EN | blocked by 0101/0102 |
| [TASK-0202](phase-02-home/TASK-0202-review-home-visual-baseline.md) | Home visual approval | blocked by 0201 |
| [TASK-0301](phase-03-article/TASK-0301-build-bilingual-article-slice.md) | Article FA/EN | blocked by 0202 |
| [TASK-0302](phase-03-article/TASK-0302-review-article-reading-baseline.md) | Article readability approval | blocked by 0301 |
| [TASK-0401](phase-04-site-completion/TASK-0401-build-secondary-pages.md) | Topics/Projects/About/404 | blocked by 0302 |
| [TASK-0402](phase-04-site-completion/TASK-0402-add-search-and-publishing-metadata.md) | Search/RSS/SEO | blocked by 0401 |
| [TASK-0501](phase-05-quality/TASK-0501-automate-quality-gates.md) | test suite and CI checks | blocked by 0402 |
| [TASK-0502](phase-05-quality/TASK-0502-run-human-quality-review.md) | final quality evidence | done |
| [TASK-0503](phase-05-quality/TASK-0503-correct-critical-font-performance.md) | corrective critical-font performance | done |
| [TASK-0504](phase-05-quality/TASK-0504-stabilize-approved-visual-gate.md) | corrective approved-visual portability | done |
| [TASK-0601](phase-06-deployment/TASK-0601-configure-github-pages-workflow.md) | Pages-ready workflow | blocked by 0502 |
| [TASK-0602](phase-06-deployment/TASK-0602-connect-domain-and-verify-production.md) | production on the domain | blocked by 0601 + access |

The Agent must not self-approve approval TASKs (`0202`, `0302`) or production access (`0602`).
