# Documentation Conventions

## 1. Purpose

These DaD contract rules are for maintaining intent, decision, specification, task and evidence alongside the code.

## 2. Types of documents

| Type | Path | Role |
|---|---|---|
| ADR | `docs/adr/` | Record stable decision and rejected options |
| SPEC | `docs/specs/` | Defining testable behavior and quality |
| TASK | `docs/tasks/phase-*/` | Bounded work unit with clear finish |
| Evidence | Real repository: `docs/evidence/` | screenshot, test report or verification note |

## 3. ID and file name

- ADR: `ADR-NNN-short-kebab-title.md`
- SPEC: `SPEC-NNN-SHORT-TITLE.md`
- TASK: `TASK-NNNN-short-kebab-title.md`
- ID should never be reused or renumbered.
- Renaming a file merely for aesthetics is prohibited after it has been referenced.

## 4. Statuses

ADR:

```text
proposed → accepted → superseded
                    ↘ rejected
```

SPEC:

```text
draft → approved → implemented → verified
```

TASK:

```text
blocked | ready → in-progress → review → done
```

Each document should have its ID, status, owner, last-updated and relations at the beginning of the text.

## 5. Language

- Guidance text may be Persian; identifiers, filenames, code and schemas remain English/ASCII.
- Requirements are written with “must,” prohibitions with “must not” or “prohibited,” and recommendations with “preferably.”
- Vague words like "beautiful", "fit" or "responsive" are not enough without visible criteria.

## 6. Relationships

- Each SPEC must list governing ADRs and implementing TASKs.
- Each TASK must name input SPEC/ADRs and output evidence.
- Each superseded ADR must link the replacement ADR.
- Links should be relative and resolvable.

## 7. Change of decision

1. Create a new ADR or supersede an existing ADR.
2. Correct the affected SPECs and update the version/date.
3. Create a bounded corrective TASK.
4. Change code and test.
5. Sync evidence and traceability index.

Changing code directly and then justifying it later in the docs is not acceptable DaD flow.

## 8. TASK contract

Each TASK must include these parts:

- Objective
- Inputs and dependencies
- In scope
- Deliverables
- Acceptance criteria
- Verification/evidence
- Prohibited work
- Stop condition
- Handoff

TASK must be able to be executed in one cycle of Agent focus. If it has multiple independent outputs or more than one approval gate, it must be broken.

## 9. Link and asset rules

- The package reference image should always be referenced by path `../../assets/design-reference.png` from SPECs or `assets/design-reference.png` from root.
- An asset must not be deleted or renamed unless every reference and checksum is reviewed.
- Generated files and temporary screenshots must not be included in this build pack; real evidence belongs in the implementation repository.

## 10. Definition of documentation done

- There are no broken internal links.
- There are no duplicate IDs.
- Each TASK has acceptance criteria, prohibited work and stop condition.
- Non-negotiable decisions are traceable to at least one ADR and one SPEC.
- docs do not conflict with the actual behavior of the code.
