# TASK-0614 — Publish the Persian essay on AI and self-worth

- **Status:** in-progress
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-10-13
- **Governing ADRs:** ADR-003, ADR-006, ADR-007, ADR-010
- **Specs:** SPEC-003, SPEC-004, SPEC-005
- **Dependencies:** TASK-0606 (done), existing article/publishing foundations

## Objective

Publish the owner's final edited writing block 71386, “اگر AI جای شما را بگیرد، بی‌ارزش می‌شوید؟”, in Persian.

## Inputs and scope

The explicit publication request authorizes branch, PR, verification, merge and Pages deployment. Preserve the final prose, including its provocative passages and unusual orthography. Correct only explicit typographical errors: خودتا → خودتان, خاهید → خواهید, در حال که → در حالی که; use ordinary Markdown numbering for the three questions. Publish on 2026-10-13 (Asia/Tehran). Add a Persian learning-and-life topic because the existing architecture and complex-systems topics do not accurately classify this essay. The selected flood photograph is a LinkedIn cover and is not added to the blog in this task. English article publication and LinkedIn publication are out of scope.

## Deliverables and acceptance criteria

- Stable Persian URL `/fa/articles/ai-and-self-worth/`, published content and metadata.
- Full final edited text; no unrequested rewriting or English edition.
- Correct missing-translation state and inclusion in lists, topic, RSS, sitemap and Pagefind.
- Existing Home regression permits the documented optional-cover fallback and validates article counts against the RSS feed rather than a fixed editorial inventory.
- Required quality gate passes; no baseline, style, dependency or schema changes.
- Verify the new article at desktop/mobile sizes and production after deployment.

## Verification and evidence

Record checks, screenshots and deployment in `docs/evidence/TASK-0614-ai-and-self-worth.md`.

## Prohibited work

Changing the author's reasoning, imagery, stance, or existing articles; adding the LinkedIn photo to the site; translating the article; changing style tokens or visual baselines.

## Stop condition

Stop if the final source cannot be preserved, remote publication is unavailable, or a gate requires an unrelated architectural change.

## Handoff

Report the live URL and verification results after deployment.
