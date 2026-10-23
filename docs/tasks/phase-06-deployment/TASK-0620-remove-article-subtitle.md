# TASK-0620 — Remove the introductory subtitle from both editions

- **Status:** done
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-10-24
- **Governing ADRs:** ADR-003, ADR-006, ADR-007
- **Specs:** SPEC-003, SPEC-004, SPEC-005
- **Dependencies:** TASK-0619 (done)

## Objective and inputs

The owner explicitly requests removal of the first body line “یا یک برنامه‌نویس سنیور چطور با AI Agent کار می‌کند؟” and its English equivalent from the published article.

## Scope and deliverables

Remove only that subtitle paragraph from both finalized editorial editions and both public editions. Preserve the archived original attachment. Record the author-directed revision privately. Keep title metadata, date, slug, topics, cover and all following prose unchanged.

## Acceptance and verification

Diff must show only the requested paragraph removal in article files. Run production build and HTML/link validation, then verify the complete Pages quality/deployment gate and both live first paragraphs. Evidence belongs in this task's completion record.

## Prohibited work and stop condition

No discretionary prose edits, metadata changes, new tests, source-archive edits, styles or dependency changes. Stop if access fails or unrelated changes are required.

## Handoff

Report removal after both live editions are verified. No further task is selected.

## Pre-release evidence

Editorial commit `fa1756c` pushed successfully. Exact byte comparisons confirm that each public article differs only by removal of the requested paragraph and its blank separator; every following byte and all metadata remain unchanged. `npm run build` and `npm run validate:build` exited 0; all 32 HTML documents and local links passed. Generated FA/EN article HTML omits the subtitle. 

## Verified completion

Public content commit `f697171a1999c6685b4b8a36a35b7d8d7d5d9577` deployed successfully in [Pages run 40029800758](https://github.com/mahdiahmadirad/mahdiahmadirad.github.io/actions/runs/40029800758); both the complete quality/build gate and deploy job succeeded. Both live article URLs returned HTTP 200, omitted the removed subtitle, and were byte-identical to the verified local build. This final documentation-only closure changes no deployable source and skips a redundant CI/deploy run.
