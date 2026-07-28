# Package Manifest

## Source review

The initial package included 9 Markdown documents and a reference image. Product content, visual design, information architecture, bilingual model, technical architecture and design tokens were preserved in `docs/specs/` and completed with ID, status, DaD relationships and structural modifications.

Main modifications:

- Agent guide changed to root-level contract `AGENTS.md`.
- Implementation Guide phases were converted into 14 bounded TASK.
- The single-repository architecture was established in the ADRs, bootstrap guide, SPECs and TASKs.
- The content model became article-centric: `articles/{translation-key}/fa.md|en.md`.
- The reference links were aligned with the actual location of the asset.
- The cropped Persian portion of the image and the prohibition on building-architecture subject matter were made explicit.
- Added human approval gate for Home and Article.
- Added traceability between intent, ADR, SPEC and TASK.

## Reference asset integrity

`assets/design-reference.png`

SHA-256:

```text
5ac6086c5d146f480899e20f817aee695ae92fe157015a67fb48a10987f88ec3
```

This checksum is the same as the image inside the input ZIP.

## Package contents

- 5 root driver documents
- 7 ADR and index
- 6 complete SPEC
- 14 bounded TASKs and a task index
- traceability matrix
- Original reference image unchanged

## Validation performed

- All TASKs have `Acceptance criteria`, `Prohibited work` and `Stop condition`.
- Internal Markdown links are checked and there are no broken links.
- checksum of input and output image is equal.
- The final archive must have a single top-level folder.
