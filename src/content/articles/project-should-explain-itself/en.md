---
title: "A Project Should Be Able to Explain Itself"
description: "The second DaD essay: how governance, decisions, specifications and tasks help a repository explain what is authoritative to humans and agents."
lang: "en"
translationKey: "project-should-explain-itself"
slug: "project-should-explain-itself"
publishedAt: 2026-09-04
topics:
  - software-architecture
featured: false
draft: false
sample: false
---

Suppose we bring an agent into a project's repository and ask it to make a change.

In the simplest case, the agent starts reading code. It examines the project structure, finds the relevant files, checks the dependencies, and tries to work out what needs to change to complete the task.

This works up to a point.

But we soon reach the problem I described in the [previous essay](/en/articles/building-easier-than-understanding/): not everything that is true about a project lives in its code.

The agent may discover an interface without knowing why it exists.

It may see an abstraction without knowing that removing it would violate an architectural decision.

It may find two documents that disagree about the same subject without knowing which one is still valid.

And it may correctly carry out a task that should no longer have been carried out at all.

So the main question for me is not:

**How should an agent read a repository?**

The more precise question is:

**How should a repository make itself understandable to an agent?**

The difference may seem small, but a substantial part of Document-Aware Development begins here.

## Reading the Code Is Not Enough

When an experienced developer joins an established project, they usually do more than read the code.

They talk to people.

They ask about earlier decisions.

They learn which parts of the system are old, which are temporary, and which are best left alone.

Much of this information has never been formally recorded.

Some of it lives in team members' heads.

Some was discussed in a meeting long ago.

Some remains in Slack or Teams.

Some was explained in a pull request and then forgotten.

As long as those same people stay on the team, this arrangement works to some extent.

It is not a good system, but it works.

An agent does not have that advantage.

It arrives in the project and has to learn the rules of this particular world from whatever we have made available to it.

If the necessary information has not been recorded, the model has to infer it from the clues it can find.

And inference is not the same as knowledge.

## The Project Needs a Map

In DaD, I have tried to make the repository more than a place to store artifacts.

It should be able to answer a few basic questions for an agent:

- What was this project built for?
- What are the rules for working in this repository?
- Which architectural decisions are currently valid?
- Which specification is active for each part?
- What has been superseded and should no longer guide decisions?
- Which decision and specification does the current task depend on?
- If something changes, what else might be affected?

So the project needs information. But that alone is not enough.

It also needs **a structure for that information**.

If we pour everything into a hundred Markdown files without making it clear where the agent should begin, we have only created a more complicated version of the same disorder.

## The First Point of Entry: Governance

When an agent enters a repository, it needs to understand the rules of the environment before turning to implementation.

In DaD, this usually begins with files such as `AGENTS.md` and the governance documentation.

I do not see `AGENTS.md` as a kind of README for agents.

Its job is not to introduce the project.

Its job is to tell the agent:

**What rules apply when you work in this repository?**

For example:

- Which documents must be read before changing the implementation?
- Where is the source of truth?
- Is the agent allowed to change the specification?
- What kind of change requires an ADR?
- How is a document's status recorded?
- What validation must run before a task is finished?
- If two sources conflict, which has greater authority?

From the outset, then, the agent receives more than a task.

It also enters a governed environment.

That distinction matters to me.

## Decisions Need to Be Separate from Implementation

The reasoning behind decisions is one of the things that easily gets lost in software projects.

Suppose we are designing a system that will use an AI provider to analyze data, and we decide that it should not depend on any particular provider.

In the implementation, that decision may appear as an interface and a few adapters.

But the interface is not the decision itself.

The decision is something like this:

> The system must remain provider-agnostic because the ability to change providers is an architectural requirement.

This information needs to be recorded somewhere independent of the implementation.

In DaD, that role is usually filled by an ADR, or Architecture Decision Record.

An ADR is not meant to explain how the code was written.

It is meant to explain:

- What problem existed?
- What was decided?
- Why was that decision chosen?
- Which alternatives were rejected?
- What are the consequences?

Keeping these concepts separate matters a great deal.

The implementation can change while the reasoning remains valid.

Or the reverse may happen: the reasoning changes, while the implementation still follows the old decision.

Without separating the two, these situations become much harder to recognize.

## Specifications Clarify What Needs to Be Built

An ADR tells us why a decision was made.

A specification tells us what that decision is expected to mean for the system.

For example, the ADR says:

> The dependency on the AI provider must be abstracted.

The specification might make that more precise:

- The system must have an `IAIProvider`.
- The core implementation must not call a vendor's SDK directly.
- The provider must be selected through configuration.
- Failover is out of scope for now.

This distinction may initially seem overly formal.

But it matters a great deal to an agent.

An agent should not have to guess the expected implementation details from a broad architectural decision.

The less clearly we define the distance between intent and implementation, the more room we leave for the agent's interpretation.

And agents tend to do interesting things with too much room for interpretation. Interesting, though not necessarily useful.

## A Task Is More Than an Instruction

Then we come to the task.

In many AI-assisted development workflows, the task is almost the same thing as the prompt:

> Add this feature.

Or:

> Fix this bug.

In DaD, I prefer a task to be part of the chain of project knowledge.

That means it should specify:

- Which specification led to its creation?
- What is its deliverable?
- What is out of scope?
- What are the completion criteria?
- What validation is required?

The agent therefore knows more than what it needs to do.

It knows **where the work came from**.

That boundary matters.

If the specification changes later, we can identify which tasks may no longer be valid.

## The Status of Documents Matters More Than Their Number

One of the worst situations is having plenty of documentation without knowing which documents are still valid.

Suppose an agent finds two specifications:

`SPEC-0004`

and

`SPEC-0011`

Both concern authentication.

One calls for JWTs.

The other calls for session-based authentication.

What should the agent do?

If it has to guess from Git history, file dates, or the contents, the documentation structure has failed.

In DaD, a document should have an explicit lifecycle.

For example:

- Draft — not yet approved
- Active — approved and active for implementation
- Superseded — replaced by a newer task
- Deprecated — obsolete and no longer valid

And when a document has been superseded, it should ideally say **what replaced it**.

Project knowledge, then, is more than a collection of texts.

It has a graph.

And that graph should be as easy to follow as possible.

## When a Project Contradicts Itself

This is where Project Drift comes back into the picture.

Suppose we have an ADR:

<blockquote lang="en" dir="ltr">
  <p><strong>ADR-0003</strong><br />AI provider must remain replaceable.</p>
</blockquote>

Then a specification says:

<blockquote lang="en" dir="ltr">
  <p><strong>SPEC-0007</strong><br />Use OpenAI SDK directly for all AI operations.</p>
</blockquote>

And a task is created from it:

<blockquote lang="en" dir="ltr">
  <p><strong>TASK-0012</strong><br />Integrate OpenAI SDK into application services.</p>
</blockquote>

The agent carries out the task.

The code works perfectly well.

But the project is no longer consistent with itself.

The problem here is not in the syntax or the tests.

It is in the relationships between artifacts.

The ADR says that the provider must be replaceable.

The specification requires something that contradicts it.

The task follows that specification.

The implementation is really just the final link in a chain that has already gone wrong.

This is why traceability matters to me.

If we can see the relationship:

<figure class="content-diagram" aria-label="From decision to specification, task and code">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">ADR</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">SPEC</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">TASK</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">CODE</span></li>
  </ol>
</figure>

Then, when something changes, it is easier to ask:

Which part of the chain has moved away from what is currently true about the project?

## An Agent Needs to Understand Its Position Before Acting

In an ideal DaD workflow, the agent does not go straight from task to code.

The path looks something like this:

<figure class="content-diagram content-diagram--long" aria-label="The agent’s path from entry to reconciliation">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Agent enters repository</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reads governance</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Finds canonical documentation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reads relevant decisions</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reads active specification</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Validates task context</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Changes implementation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Runs validation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reconciles documentation and code</span></li>
  </ol>
</figure>

This flow may take different forms in different projects.

I am not claiming that this is the only correct order.

But the underlying principle matters to me:

**Before changing a project, an agent should understand where that change belongs in the project's model of knowledge.**

A simple prompt usually does not provide that.

## The Canonical Source

One concept I use often in DaD is the canonical source: the recognized, authoritative source.

The meaning is straightforward.

For every important kind of truth about the project, it should be clear where to find the authoritative version.

If architecture is defined in ADRs, the README should not maintain another version of the same decision as an independent truth.

If behavior is defined in a specification, a task should not invent a new requirement.

If a task is only an execution unit, it should not quietly introduce a new architectural decision.

This does not mean eliminating all duplication.

Sometimes a concept needs to be mentioned in several places.

But it must be clear where the authority lies.

Otherwise, every duplicate becomes a potential source of drift.

## Reconciliation Is Not Just the Final Step

In the previous essay, I introduced reconciliation as an effort to align documentation and implementation.

In practice, though, it is better not to treat it as merely the last step.

Reconciliation can happen before, during, and after implementation.

Before the work:

The agent may discover that the task conflicts with the specification.

During the work:

The implementation may reveal that the specification is incomplete or unrealistic.

After the work:

The implementation may be correct while the documentation still describes the previous state.

In all three cases, the goal is the same:

To establish whether the picture presented by the documentation is consistent with what actually exists in the project.

And if it is not, to make the discrepancy explicit instead of hiding it.

## Documentation Should Not Be Sacred

There is an important risk here.

If we say that documentation is our source of truth, we may unconsciously conclude that implementation must always be brought into line with it.

I do not see it that way.

A document can be wrong too.

A specification may be incomplete.

An ADR may rest on an assumption that no longer holds.

Sometimes it is the implementation that reveals a new fact.

That is why the relationship needs to work in both directions.

<figure class="content-diagram content-diagram--reciprocal" aria-label="Documentation and implementation inform each other">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Documentation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">↔</span><span class="content-diagram__label">Implementation</span></li>
  </ol>
</figure>

Rather than:

<figure class="content-diagram" aria-label="Documentation dictates implementation: the insufficient one-way model">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Documentation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
  </ol>
</figure>

In DaD, a document is not meant to be a sacred law that never changes.

It is meant to represent a state of the project that we can examine.

If it changes, that change should be explicit, traceable, and deliberate.

## An Agent Should Not Have to Guess Which Truth Is Valid

I think this is a useful way to evaluate a documentation structure:

If an agent has to do a great deal of guessing to understand the state of the project, the structure is not yet sufficient.

That does not mean everything needs to be written down.

Doing so could bury the project under the weight of its documents.

The goal is not to store every possible piece of knowledge.

The goal is to **record the knowledge whose absence would change later decisions**.

For example:

Why does this abstraction exist?

Which constraint must not be violated?

Which decision is still active?

What is deliberately out of scope?

If removing this information could lead the agent to a different conclusion, it is probably worth recording.

## DaD's Documentation Structure Is for People Too

Although working with agents led me to pursue DaD more seriously, this structure was not built only for machines.

A developer joining the project has the same questions.

Why was this decision made?

Which specification is valid?

Why does this task exist?

What should I leave unchanged?

The difference is that people can usually ask others for some of this knowledge.

An agent is largely limited to what the repository tells it.

Perhaps agents have simply made an old weakness more visible:

Many projects cannot actually explain themselves.

There are people who explain them.

When those people leave, part of the project leaves with them.

## The Project as a Knowledge System

To sum up this aspect of DaD, I no longer see the repository as just a codebase.

It looks more like a knowledge system in which implementation is one component.

Something like this:

<figure class="content-diagram content-diagram--long" aria-label="From governance to implementation">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Governance</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Decisions</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Specifications</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Tasks</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
  </ol>
</figure>

But the relationship does not run only downward.

We also need to be able to work our way back up from implementation.

A code change may challenge a specification.

A specification change may require a new decision.

A new decision may invalidate old tasks.

The project is therefore more like a graph than a set of documents neatly arranged in folders.

That is what I want an agent to be able to navigate in DaD.

To understand relationships, beyond simply finding files.

## And the Problems Remain

Structuring project knowledge does not solve everything. An agent may still misinterpret a document.

It may miss an important dependency.

It may carry out an incomplete reconciliation.

The documentation itself may be outdated.

DaD does not eliminate these problems.

It only tries to make what was previously implicit and scattered somewhat more explicit and open to examination.

For me, that is the main difference.

If an agent makes a mistake but we can identify the decision, specification, and task that led it there, the error becomes easier to analyze.

But if all we have is a prompt and some code, an important part of the reasoning between them has disappeared.

And perhaps this is enough for a start:

A project does not need to know everything.

But it should be able to explain the most important things it knows about itself.
