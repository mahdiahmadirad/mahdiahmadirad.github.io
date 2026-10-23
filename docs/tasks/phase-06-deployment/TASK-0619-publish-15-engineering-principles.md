# TASK-0619 — Publish 15 engineering principles in Persian and English

- **Status:** done
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-10-24
- **Governing ADRs:** ADR-003, ADR-006, ADR-007, ADR-010
- **Specs:** SPEC-002, SPEC-003, SPEC-004, SPEC-005
- **Dependencies:** TASK-0609 artwork foundations (done), TASK-0616 article navigation (done), existing AI topic in both locales

## Objective

Publish the author's final attached `15 Engineering Principals(1).md` without discretionary Persian rewriting, together with a complete faithful English translation and a minimal shared numeral-15 cover.

## Inputs and authorization

The owner's explicit request authorizes registration in the private editorial repository, translation, asset generation, public transfer, PRs, verification, merge and GitHub Pages publication. The supplied final text is the authorship source; no exploratory drafting interview is needed. The explicit translation/publication instruction governs this edition over the default prohibition on automatic translations: translate and review against the final source rather than publish an unchecked translation. The attachment was recovered through the referenced chat's attachment path because `/mnt/data` is not present on this host.

## In scope and deliverables

- Private `articles/15-engineering-principles/` with `fa.md`, `en.md`, local assets, private source and production notes, each completed edition explicitly finalized.
- Public `src/content/articles/15-engineering-principles/{fa,en}.md`; slug/translationKey derived from directory; date 2026-10-24, AI topic, `featured: false`.
- Exact Persian source in private storage; public Markdown adapts only the leading H1 into title metadata to retain one rendered H1. All remaining source text remains unchanged; the existing accessible table-scroll wrapper is added around the unmodified risk table during public transfer to contain its minimum width on mobile.
- Complete English translation, preserving examples, reasoning, qualifications, all 15 principles, table and ending.
- Shared optimized square cover, localized alt text and documented provenance; black line on white with one brick accent. Existing featured article stays selected, so the new cover appears on its own article pages only.
- Reciprocal language controls, canonical/hreflang, feeds, sitemap, Pagefind and published asset.

## Acceptance criteria

Verify exact Persian source preservation after reversing only the documented H1 extraction and table wrapper, editorial/public body equivalence and asset checksums. All repository quality gates must pass without changing historical visual baselines. Inspect FA/EN at desktop/mobile including long headings, TOC, table and overflow. Private sources/notes must never transfer to the public repository. Confirm CI, Pages deployment and both live article URLs before reporting publication.

## Verification and evidence

Record command results, content checks, screenshots and release evidence in `docs/evidence/TASK-0619-15-engineering-principles.md`.

## Mobile table formatting

The first new-route smoke check found horizontal document overflow at 320px. Existing article CSS gives tables a 34rem minimum width and already supplies `.table-scroll` for containment. During public transfer, wrap the unchanged Markdown risk table in that existing class with a localized region label and keyboard focus. No prose, table cells, global style or template changes are required.

## Verification adjustment

The pre-existing heading-free AI/self-worth test assumed it had no related AI articles. Adding this article legitimately makes that assumption false. Keep the missing-TOC assertion, assert the newly available related article, and retain empty-related-section coverage on the standalone loop essay. Extend existing responsive and accessibility route inventories to the new editions; no template or selection-policy change.

## Prohibited work

No changes to existing prose, templates, styles, schemas, dependencies, baselines, DNS or analytics. No unrelated task closure. No publishing private notes or the original attachment to the public repository.

## Stop condition

Stop if source preservation, publishing access or an existing gate requires unrelated architectural changes. Report actual failures and do not claim an unverified deployment.

## Handoff

Report both final URLs, private registration, cover and CI/Pages results. No additional feature task is selected.

## Verified completion

Private registration merged at `aa68611919163417f0e03f926276869fe601a82b`. Public PR 22 merged at `24c46ab2d3f991f8915c9c7e4d8db092ada5f97c`; CI run `40026985293` attempt 2 and Pages run `40028356794` both succeeded. Both live articles returned HTTP 200 and byte-identical HTML to the tested local build. Production bilingual desktop/mobile, metadata, language links, table, artwork, discovery, feeds, sitemap and actual Pagefind queries passed. Evidence and screenshots are in `docs/evidence/TASK-0619-15-engineering-principles.md`. No further feature task is selected.
