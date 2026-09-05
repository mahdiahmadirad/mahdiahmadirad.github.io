---
title: "Building a Project with Document-Aware Development"
description: "The third DaD essay: building a small API through Vision, ADR, Specification, Task, Implementation and Evidence, before a real Project Drift experiment."
lang: "en"
translationKey: "building-a-project-with-dad"
slug: "building-a-project-with-dad"
publishedAt: 2026-09-05
topics:
  - software-architecture
featured: false
draft: false
sample: false
---

In the two previous essays, I mostly discussed the problem.

First, I wrote about how [when producing code becomes easier, understanding a project and preserving the knowledge behind it may become the harder part](/en/articles/building-easier-than-understanding/). Then I looked at [how a repository can hold more than a collection of source files and keep some of the project's knowledge in a form we can follow](/en/articles/project-should-explain-itself/).

But all of this remains somewhat abstract until we see it in a real project.

So I created a small repository called [DaD-sample](https://github.com/mahdiahmadirad/DaD-sample).

The project is deliberately simple: an ASP.NET Core Web API that accepts some text and returns a summary.

If the only goal were to build such an API, we could probably write the endpoint in a few minutes, add the SDK for an AI provider and call it done.

But this repository has a different purpose.

We want to see what the relationship between **what we want to build**, the decisions we make, the work that needs to be done and the code that is eventually written looks like when we develop even this small project with Document-Aware Development.

## A Project That Does Almost Nothing

The initial problem is very simple.

We want an API with an endpoint like this:

```http
POST /api/summaries
```

It receives an input like this:

```json
{
  "text": "A long piece of text to summarize."
}
```

And returns something like this:

```json
{
  "summary": "..."
}
```

The current sample does not even use real AI.

It has a local, deterministic provider that returns short texts unchanged and keeps the first thirty words of longer ones.

This is not, of course, summarization—unless our definition of artificial intelligence has dropped to a worrying level. But summary quality is not the main issue here. We want to run and test the entire project without an API key, an external service or an additional dependency, while still having a real architectural problem to work with.

That problem is this:

**The application must not depend on a specific AI provider.**

This small decision is enough for our example.

## What Does the Repository Know Before the Code?

The current project structure looks roughly like this:

```text
.
├── AGENTS.md
├── PROJECT-VISION.md
├── docs/
│   ├── adr/
│   │   └── ADR-0001.md
│   ├── specs/
│   │   └── SPEC-0001.md
│   └── tasks/
│       ├── TASK-0001.md
│       └── TASK-0002.md
├── src/
│   └── DaDSample.Api/
├── tests/
│   └── DaDSample.Api.Tests/
└── scripts/
```

<figure class="content-diagram content-diagram--composition" aria-label="The repository's main knowledge and implementation artifacts">
  <ul class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">AGENTS.md</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">PROJECT-VISION.md</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">ADR</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">SPEC</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">TASK</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Source &amp; Tests</span></li>
  </ul>
</figure>

What matters to me in this structure is not the names or arrangement of the folders. We could rename them or organize some of them differently. What matters is that we have separated different kinds of project knowledge.

`PROJECT-VISION.md` explains why the project exists and defines its broad boundaries.

An ADR records a decision and the reasoning behind it.

A Specification makes the system's expected behavior more precise.

A Task is the executable unit of change.

And the implementation is what eventually turns those decisions into a system we can run.

So when we enter the repository, we do not have to ask only:

“Where is the code?”

We can ask:

“Why did the code end up this way?”

This is the more important question for DaD.

## The Agent's Entry Point

Suppose we tell an agent:

> Add text summarization to this project.

In a conventional workflow, the agent might go straight to `src`, inspect the project structure and begin implementing the feature.

In this repository, `AGENTS.md` defines the working rules before anything else.

The agent is instructed to read `PROJECT-VISION.md` first, find the active Task next, and then review the ADRs and Specifications on which that Task depends.

The expected path of reasoning therefore looks something like this:

<figure class="content-diagram content-diagram--long" aria-label="The agent's path from entering the repository to reconciling documentation and code">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Agent enters repository</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">AGENTS.md</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">PROJECT-VISION</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">TASK</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">ADR / SPEC</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Code</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Tests</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reconciliation</span></li>
  </ol>
</figure>

At first glance, this order may look slower.

Before writing fifty lines of code, we have to read a few Markdown files. But these documents are not meant to be ceremony. Each contains information that cannot be recovered from the implementation alone.

## The First Decision

In `ADR-0001`, we decided that the text-analysis provider must remain replaceable.

Put more simply:

The summarization feature must not know whether the system behind it is OpenAI, a local model or another provider.

This decision later appears in the code as an interface named `IAIProvider`. But `IAIProvider` is not the decision itself.

When we encounter such an interface in a codebase, we can guess that its author probably intended an abstraction, but we cannot know why.

Perhaps the system was expected to support several providers.

Perhaps the interface exists only for unit testing.

Perhaps it is an old abstraction whose reason for existing has disappeared.

Or perhaps, as in our project, **replaceability is an architectural constraint**.

The ADR removes this ambiguity.

It records that connecting feature code directly to a vendor SDK would have been shorter and simpler, but that we rejected this option because provider choice must not become part of the application's core behavior.

We also decided that the initial provider would be local, so the project could run without an external account or secret.

This is precisely the kind of knowledge an interface cannot preserve on its own.

## From Decision to Specification

The ADR, however, is still not enough for implementation.

Saying:

> The provider must be replaceable.

Gives us an architectural direction, not a precise contract for building the system.

That is why `SPEC-0001` is the next step.

The Specification says that our initial capability is summarization and that the feature code must depend on `IAIProvider`.

The provider's simple contract looks something like this:

```csharp
Task<string> SummarizeAsync(
    string text,
    CancellationToken cancellationToken);
```

It also defines the HTTP behavior more precisely:

- An empty request must return `400`.
- A valid request must return `200` and a `summary`.
- The default provider must not require a network connection or a secret.
- The local provider must behave deterministically so we can test it.

The same document also places several things explicitly **outside the scope**:

authentication, persistence, streaming, failover and even a connection to a real provider.

This may seem unimportant, but it matters to an agent.

If all we say is “build a Text Analysis API,” adding complex configuration, a retry policy, persistence or several more abstractions may not be technically bad ideas.

The problem is that we did not ask for them.

A Specification does more than say what must be built.

Part of its job is to say **what must not be built yet**.

## Now We Can Create a Task

After the Decision and Specification, we reach `TASK-0001`:

**Implement the first summarization vertical slice**

The Task is not supposed to redefine the architecture.

It is not supposed to invent a new requirement.

Its job is to define a limited change that can be completed.

In this sample, the Task says:

- Create the ASP.NET Core API.
- Define `IAIProvider`.
- Implement the local provider.
- Add the summarization endpoint.
- Add validation.
- Add tests.
- Make the build and tests repeatable.

It also identifies what remains outside the scope.

And the Task references its related ADR and SPEC.

The relationship therefore looks roughly like this:

<figure class="content-diagram content-diagram--long" aria-label="The chain from reason and expected behavior to bounded work, code and evidence">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">ADR-0001<small>Reason</small></span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">SPEC-0001<small>Expected behavior</small></span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">TASK-0001<small>Bounded work</small></span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation<small>Code</small></span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Tests<small>Evidence</small></span></li>
  </ol>
</figure>

To me, this trace matters more than the folder structure itself.

If someone finds `TASK-0001` six months later, they do not need to infer from the Task why `IAIProvider` exists.

They can go back one step.

And then one step further.

## The Implementation Finally Arrives

Now the agent or developer implements the change.

In the sample project, the Summarization feature knows only about `IAIProvider`.

The initial provider is a simple local implementation.

The dependency therefore looks roughly like this:

<figure class="content-diagram" aria-label="The summarization feature depends on the local provider through an interface">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Summarization Feature</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">IAIProvider</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">LocalTextAnalysisProvider</span></li>
  </ol>
</figure>

If we later want to add an OpenAI provider or any other vendor, the integration should sit behind this same boundary.

Ideally, the summarization endpoint should not care about the change.

This is not a complex architecture.

The point of the sample is not to demonstrate dazzling architecture.

On the contrary, I prefer the decision to be simple enough that we can see the relationship between document and code without the noise of the rest of a system.

## A Test Is Not Only a Test of the Code

The Task is not complete when the implementation has been written. The Specification defines several behaviors we can verify.

For example:

- Blank input must return `400`.
- Valid input must return a summary.
- The local provider must be deterministic.
- Feature code must not depend on a vendor SDK.

Some of these are checked by automated tests.

So a test here is not merely a way to find bugs. **It is evidence.**

The Task claimed that it would deliver a particular outcome.

The Specification defined the expected behavior.

The Test provides some of the evidence that the implementation actually aligns with those expectations.

After CI runs, the Task also records evidence from the real execution.

That is a small but meaningful difference from writing checkboxes like this:

```text
[x] Tests passed
```

If a repository claims that validation happened, I think we should, as far as possible, be able to identify the real execution to which that claim refers.

## So Which One Is the Source of Truth?

At this point, an important question may arise.

Is the ADR the truth? The Specification? The Task? Or the code?

I think this question is somewhat misleading if it expects a single answer. Each has its own authority.

The ADR governs the decision.

The Specification governs expected behavior.

The Task governs the current change.

The Implementation describes what the system actually does now.

If they agree, we have no problem.

The problem begins when two parts of this chain tell different stories about the project.

That is why `AGENTS.md` includes a rule stating that when two authoritative sources conflict, the agent must not choose whichever source makes implementation easier.

It must make the conflict visible.

This is where the workflow begins to move beyond a simple documentation convention.

## What Happens If We Give It a New Task Tomorrow?

Suppose we now ask the agent:

> Use the OpenAI SDK for summarization.

This instruction is perfectly implementable on its own.

The agent can add the package, create a client and connect the feature to the API.

But in our current repository, this change has a problem.

The ADR says feature code must not depend on a specific provider.

The Specification requires the same boundary.

So a new Task cannot be implemented directly without reviewing those two documents.

There are two possibilities.

Perhaps what we mean is:

> Add a new OpenAI adapter behind `IAIProvider`.

This is compatible with the existing architecture.

But perhaps we have genuinely decided to remove the abstraction and connect the application directly to OpenAI.

In that case, the issue is not merely a code change. **The Decision has changed.**

And if the Decision has changed, we should be able to see that change in the project's knowledge model as well.

This is exactly where DaD becomes meaningful to me.

Not when everything is tidy.

When a new change collides with part of the project's earlier truth.

## A Real Case of Drift

For the continuation of this sample, I want to create exactly that situation. In the repository's next iteration, we will deliberately introduce a change that makes the Task, Specification, Decision and Implementation inconsistent. Then we will examine the repository while it is still in that state.

We want to see what the agent notices, where the conflict becomes detectable and what Reconciliation must actually change.

That part of the example will probably be more important than the initial bootstrap, because real projects usually do not fail because they cannot create a clean structure on day one.

The problem begins on day two hundred.

By then, new decisions have arrived, old documents still exist, the implementation has changed over several stages and no one knows precisely which part of the story remains valid.

## A Note About the Structure Itself

Looking at this repository may suggest that DaD means having these folders:

```text
docs/adr
docs/specs
docs/tasks
```

I do not think that definition is precise.

These are only the framework's current conventions.

Another project may use a different structure and apply the same idea more effectively. You can change these conventions. I have changed this structure slightly in different projects for different reasons myself.

What matters to me is the relationship between the artifacts:

<figure class="content-diagram content-diagram--long" aria-label="The project-knowledge chain from Vision to Evidence">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Vision</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Decision</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Specification</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Task</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Evidence</span></li>
  </ol>
</figure>

And, of course, the relationship does not run only downward.

The Implementation may reveal that the Specification is incomplete.

A Task may require a new Decision.

A new Decision may affect several existing Specifications.

So, to be more precise, even this shape is still too simple.

In practice, a project looks more like a graph.

But as a starting point, this chain helps us know where to look for each kind of information.

## Does a Small API Need All These Documents?

If I were building this Text Analysis API only to delete the repository tomorrow, no.

I probably would not write an ADR or SPEC for it.

This sample deliberately contains somewhat more documentation than its practical needs justify, because it is meant to make the relationship between artifacts visible.

But in a real project the question takes a different form: a serious project, one that creates substantial value and is expected to have a meaningful lifecycle.

We are not supposed to write an ADR for every small decision.

We are not supposed to create a Specification for every function.

And documentation is not supposed to become a lower-quality copy of the code itself.

The criterion I currently find useful is this:

**Could the absence of this information cause the next developer or agent to make a different decision?**

If the answer is yes, I am more likely to record it.

Why must the provider remain replaceable?

Worth recording.

The name of a local variable?

Probably not.

An important feature boundary?

Perhaps.

Implementation details that are already clear from the code?

Probably no new document is needed.

DaD is not supposed to solve a shortage of context by producing a mountain of context.

That would merely give the illness a new name.

## Building This Structure with the CLI

In this essay I built the structure almost manually, because if we begin by running a few commands and watching a collection of files appear, it is easy to see the structure without understanding why it exists.

But in real use, we do not need to create all of this scaffolding by hand every time.

The main [Document-Aware Development](https://github.com/mahdiahmadirad/DaD) repository includes a CLI for precisely this purpose.

It can initialize a repository and create artifacts such as an ADR, Specification and Task.

For example, the workflow might begin with something like this:

```bash
dad init
```

And to create new artifacts:

```bash
dad new ADR
dad new SPEC
dad new TASK
```

The CLI applies DaD conventions, manages document numbering and places Tasks in the current canonical path:

```text
docs/tasks/
```

It also provides commands for viewing repository status and context and for checking consistency.

The purpose of the CLI is not to automate reasoning.

It cannot decide why the architecture should remain provider-agnostic.

It cannot determine on behalf of the team what the Specification must require.

What it does is simplify the mechanical part of the framework, so less energy goes into creating folders, filenames, numbering and structure.

## What We Have Built So Far

The current sample contains the complete initial chain:

<figure class="content-diagram content-diagram--long" aria-label="The sample project's complete chain from Vision to Tests">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Project Vision</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">ADR-0001</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">SPEC-0001</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">TASK-0001</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Tests</span></li>
  </ol>
</figure>

The project is still deliberately small and almost insignificant.

But it now has one quality that the simple version of the same API did not have.

If someone asks:

> Why does the feature not call the OpenAI SDK directly?

The answer is no longer merely:

> Because someone added an interface earlier.

The repository can show the path to the answer.

We can move from the code to the Task.

From the Task to the Specification.

And from the Specification to the Decision.

I think this is the same distinction I tried to express in the previous essay with the phrase “a project should be able to explain itself.”

Here, that phrase is no longer only an idea.

We have a small repository we can open, whose documents we can read and whose code we can run, so we can see what this act of explanation looks like in practice.

Of course, as long as everything remains consistent, the story looks a little too clean.

Real projects are not this polite.

The next step for this sample is to break it.

Not badly enough to make the build fail.

Worse.

We will keep the build and tests green while making the project inconsistent with what it says about itself.

That is where we can see what Project Drift and Reconciliation look like when they move beyond definitions and into a real repository.
