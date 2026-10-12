# TASK-0615 — Classify the AI/self-worth essay under AI

- **Status:** in-progress
- **Owner:** Mehdi Ahmadirad / implementation agent
- **Last updated:** 2026-10-13
- **Governing ADRs:** ADR-003, ADR-006, ADR-007
- **Specs:** SPEC-003, SPEC-004, SPEC-005
- **Dependencies:** TASK-0614 article publication, deployed in PR 17

## Objective and inputs

The owner's explicit request is to classify the published essay under “AI” and publish the change. Existing prose and URL must remain exact. The task starts from deployed origin/main; the previous unapproved documentation-only closure commit is not included.

## Scope and deliverables

- Add the Persian AI topic and replace the article's learning-and-life reference with ai.
- Point existing responsive topic coverage at the newly published AI topic.
- Preserve the dormant learning-and-life source; empty topics are already omitted by the content graph.

## Acceptance and verification

Build, content tests and HTML/link validation pass. Verify AI classification on article, discovery and `/fa/topics/ai/`. Article body is byte-identical to its deployed source. CI/browser checks pass before merge; verify Pages and the live category after publication.

## Prohibited work and stop condition

No prose, URL, publication date, translation, artwork, style or schema change. Stop if classification requires an unrelated architectural change or publication access fails.

## Evidence and handoff

Local build and PR checks provide pre-release evidence. Record release status in this task and report the live article/topic URLs. Publication remains pending until Pages completes.
