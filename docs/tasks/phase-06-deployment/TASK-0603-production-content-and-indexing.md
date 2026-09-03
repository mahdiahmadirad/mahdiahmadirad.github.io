# TASK-0603 — Production content and indexing cleanup

- **Status:** review
- **Owner:** product owner / implementation agent
- **Last updated:** 2026-09-03
- **Inputs:** explicit product-owner request on 2026-09-03
- **Related:** SPEC-003, SPEC-004, SPEC-005; TASK-0402, TASK-0601, TASK-0602

## Objective

Move the public blog from fixture/demo presentation to real production content and make its public pages eligible for search-engine indexing.

## In scope

- remove sample/test content and public test-only routes;
- remove the Projects navigation and public Projects page while no real project content exists;
- remove emitted `noindex` metadata from production output while keeping `robots.txt` crawlable;
- remove fixture/sample notices from public UI;
- add a footer link to the bilingual blog-mark story;
- keep an edition homepage valid when that locale has no published article yet.

## Deliverables

- production routes contain only owner-approved real content;
- `/fa/` and `/en/` remain buildable without fixture articles;
- footer exposes the blog-mark story in both locales;
- no generated page emits `<meta name="robots" content="noindex">`;
- Projects and design-system test routes are absent from production output.

## Acceptance criteria

1. `robots.txt` permits crawling and references the sitemap.
2. Generated public pages do not emit `noindex`.
3. Sample articles, sample About data, sample projects, and unused sample topics are removed.
4. The main navigation contains Articles, Topics, and About, but not Projects.
5. The footer links to `/fa/about/historical-creature/` or `/en/about/historical-creature/` according to locale.
6. The English homepage does not fail when no English article is published.
7. Repository CI passes.

## Verification / evidence

- GitHub Actions CI run attached to PR #3.
- PR diff reviewed for removed fixture routes/content and production metadata changes.

## Prohibited work

- do not invent replacement English articles or project entries;
- do not publish private editorial drafts;
- do not change the approved About or historical-creature article content;
- do not change DNS/domain configuration.

## Stop condition

Stop if production content cannot be distinguished from private/unapproved content, or if the quality pipeline exposes a regression that cannot be corrected without changing approved design/content decisions.

## Handoff

After CI succeeds, merge PR #3 to `main`, confirm deployment, then verify the live HTML and crawl directives on `mehdiahmadirad.me`.
