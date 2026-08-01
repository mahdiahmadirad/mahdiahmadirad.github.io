---
title: "Sample: Document-Aware Development"
description: "A sample fixture for testing how decisions, specifications, tasks, and code relate in the English content model."
lang: "en"
translationKey: "document-aware-development"
slug: "document-aware-development"
publishedAt: 2026-07-02
updatedAt: 2026-07-04
topics:
  - software-architecture
  - systems-engineering
  - evidence-based-development
featured: true
draft: false
sample: true
---

> This is a sample fixture. It makes no claim about the author’s experience or personal views.

## Begin with the decision

A code change is easier to review when the reason for it is visible. In this sample workflow, an accepted decision becomes a testable specification before it becomes an implementation task. The chain is deliberately short: `ADR → SPEC → TASK → CODE`.

The point is not to produce more documents. It is to keep the constraint that shaped a change close enough to the change that a reviewer can test whether the two still agree.

<aside class="callout" aria-labelledby="sample-note-en">
  <p><strong id="sample-note-en">Sample note.</strong> A document earns its place only when it changes how the work is implemented, reviewed, or verified.</p>
</aside>

### Keep the contract executable

A specification should name an observable outcome. The task can then select the smallest change that proves that outcome, while evidence records what actually happened.

```ts
type Stage = 'adr' | 'spec' | 'task' | 'code';

const trace = (stages: Stage[]) =>
  stages.every((stage, index) => index === 0 || stage !== stages[index - 1]);
```

#### Isolate technical identifiers

Commands such as `npm run check`, identifiers such as `translationKey`, and a URL such as <span data-bidi="ltr" dir="ltr">https://example.com/system-boundary</span> retain their left-to-right direction even when the surrounding edition uses another writing direction.

## Move through explicit states

The workflow is useful when each transition has a clear owner and a visible test. A draft task cannot silently override an accepted decision, and a completed task cannot rely on evidence that was never captured.

<section class="table-scroll" aria-label="Sample workflow state table" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Stage</th><th scope="col">Question</th><th scope="col">Evidence</th></tr>
    </thead>
    <tbody>
      <tr><td>ADR</td><td>Why this direction?</td><td>Accepted decision</td></tr>
      <tr><td>SPEC</td><td>What must be observable?</td><td>Testable criteria</td></tr>
      <tr><td>TASK</td><td>What is the smallest change?</td><td>Commands and captures</td></tr>
    </tbody>
  </table>
</section>

<figure class="article-figure">
  <svg viewBox="0 0 720 220" role="img" aria-labelledby="sample-flow-en-title sample-flow-en-desc">
    <title id="sample-flow-en-title">A bounded feedback path</title>
    <desc id="sample-flow-en-desc">Four modules connected in sequence, with a feedback edge returning from code to the decision boundary.</desc>
    <g fill="none" stroke="currentColor" stroke-width="2">
      <rect x="28" y="70" width="112" height="80"/><rect x="210" y="70" width="112" height="80"/>
      <rect x="392" y="70" width="112" height="80"/><rect x="574" y="70" width="112" height="80"/>
      <path d="M140 110H210M322 110H392M504 110H574"/>
      <path d="M630 70V30H84V70" stroke="var(--color-accent)"/>
    </g>
    <g fill="var(--color-lapis)"><circle cx="140" cy="110" r="5"/><circle cx="322" cy="110" r="5"/><circle cx="504" cy="110" r="5"/></g>
  </svg>
  <figcaption>Sample figure: implementation feedback returns to the decision boundary instead of disappearing in the codebase.</figcaption>
</figure>

## Review the distance

The practical risk is distance: a decision in one place, a task in another, and a test with no visible relationship to either. A small traceability record reduces that distance without pretending that documentation can replace judgment.<sup id="note-ref-en"><a href="#note-en" aria-label="Read sample note 1">1</a></sup>

The review question stays simple: can another person follow the reason, the contract, the change, and the evidence without reconstructing the entire project history?

<section class="footnotes" aria-label="Sample notes">
  <ol>
    <li id="note-en">This note is fixture content used to verify footnote rhythm and keyboard navigation. <a href="#note-ref-en" aria-label="Back to sample note reference">↩</a></li>
  </ol>
</section>
