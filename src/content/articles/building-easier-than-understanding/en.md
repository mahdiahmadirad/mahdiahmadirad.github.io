---
title: "When Building Becomes Easier Than Understanding"
description: "As agents write code faster, can our shared understanding keep up? Reflections on project memory, decisions, and Document-Aware Development."
lang: "en"
translationKey: "building-easier-than-understanding"
slug: "building-easier-than-understanding"
publishedAt: 2026-09-04
topics:
  - software-architecture
featured: false
draft: false
sample: false
---

For years, a substantial part of my time on software projects went into the building itself. We had to understand the problem, design a solution, write code, test it, and return to whatever had not worked. Development had its own natural speed limit.

AI-based tools, followed by agents that can enter a repository, read several files, make changes, write tests, and even work through parts of a problem on their own, have shifted that limit to some extent.

Today, a few hours can be enough for work that used to take several difficult days.

At first glance, that really is good news.

But gradually, I began to notice another problem emerging: when building becomes this fast, does our understanding of what we have built keep pace?

## What the Code Does Not Tell Us

Suppose we ask an agent to make a relatively simple change to a project.

We give it access to the repository. It examines the structure, finds the relevant code, and implements the feature. It may run the tests too, and the result may be perfectly acceptable.

A few weeks later, we need another change in the same area.

A new agent can see the existing code, the interfaces, and the tests. It may also be able to read the Git history.

But some things are not necessarily visible in any of them:

Why was this abstraction introduced?

Was the current implementation meant to be temporary?

Was another option considered and rejected for a specific reason?

Is this limitation part of the system's architecture, or simply the result of a practical decision made at the time?

If we change this part, which assumption elsewhere in the system will no longer hold?

Some of the answers might be inferred from the code. But inference is not the same as knowledge.

Code usually tells us **what the system does now**. It tells us much less about **why it took this form**.

And knowing **why it took this form** still matters. I think it will continue to matter to us.

This is not a new problem, of course. Programmers have been dealing with it for years. We only need to revisit code we wrote six months ago to discover that human memory is not quite as reliable as advertised.

Working with agents made this problem more noticeable to me.

## Context Is Not the Same as Project Memory

One common response to this problem is to point to the growing context windows of models.

If a model can see the entire repository, it will probably understand the project better.

There is some truth in that, but I think it mixes two different questions.

An agent's ability to **see** a great deal of information does not mean that the information **exists** in the project in the first place.

Suppose we decide in a meeting to remove a direct dependency on an external service and put it behind an abstraction, because we want to be able to switch providers in the future.

The current implementation may reflect that decision. There is an interface, with an adapter behind it.

But can an agent tell from that structure alone that the ability to change providers is an architectural constraint?

Perhaps.

Or perhaps it will decide that the abstraction is unnecessary and remove it to simplify the code.

A larger context window does not solve this problem. The issue is not that the model failed to see the information. The reasoning behind the decision was never recorded somewhere it could see.

This is where I distinguish three concepts:

**Context** is what the agent has available at this moment.

**Memory** is what remains from earlier interactions and work.

But **Project Knowledge** is something else: the decisions, constraints, assumptions, and definitions that establish what this project is supposed to be.

That knowledge cannot remain only in people's heads, chat histories, or scattered prompts.

## Projects Gradually Drift Away from Themselves

Suppose we make an architectural decision at the start of a project.

A specification is then written around it.

Several tasks are derived from the specification, and an implementation takes shape.

Ideally, the relationship looks something like this:

<figure class="content-diagram content-diagram--long" aria-label="From intent to test">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Intent</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Decision</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Specification</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Task</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Test</span></li>
  </ol>
</figure>

But real projects are not this tidy.

Partway through the work, the implementation reveals that an assumption in the specification was wrong. The architectural decision changes. A new task is added. Part of a document becomes outdated, yet remains where it was.

After a while, we may have something like this:

- Code written according to the new decision
- A specification that still describes the old decision
- A task that is no longer relevant in part
- A conversation explaining why the change was made
- A README that has not been updated in a long time

None of these is necessarily wrong in isolation.

Together, though, they no longer give us a coherent picture of the project.

I see this as a form of **Project Drift**: the distance that gradually develops between what the project was meant to be, what we have written about it, and what we have actually built.

Again, AI did not create this problem.

It has only accelerated it.

When a human team makes a few significant changes in a week, we have opportunities to close some of that gap through code reviews, technical meetings, or even everyday conversations.

But when agents can make several times as many changes in the same period, the pace of implementation may overtake the team's ability to understand those changes and absorb them into a shared mental model.

In other words, the emerging bottleneck in software development may no longer be just **producing code**.

It may be **keeping the project coherent**.

## Is a Repository Just a Place to Keep Code?

This question led me somewhere else.

We usually treat a repository as almost synonymous with a codebase.

It contains code, tests, configuration, and some accompanying documents.

But if an agent is to become a real part of the development process, perhaps the repository needs to take on a different role.

An agent needs more than source code to do its work.

It needs to be able to establish:

- Which decisions are currently valid?
- Which decisions were made earlier and later set aside?
- Which specification is active?
- Which constraints must not be violated?
- Which requirement or decision does a task depend on?
- Which other documents might the current change invalidate?

In this model, documentation is no longer something we write after the work is finished for people who will come later.

It is itself part of the project's state.

This was the point at which I began thinking about what I later called **Document-Aware Development**, or **DaD**.

## Document-Aware Development

I do not want to define DaD as a new way to “write more documentation.”

If using it merely produces more Markdown files, I would consider it a failure.

For me, the idea starts elsewhere:

Decisions, specifications, tasks, and implementation should not be independent artifacts. They are different parts of one system, and we should be able to trace the relationships between them.

For example, when an architectural decision changes, asking which code needs to change is not enough.

We also need to ask:

Which specification is affected?

Which tasks were created on the basis of the previous decision?

Does another document still present the old decision as the truth about the project?

The same issue exists in the other direction.

If implementation forces us to depart from the specification, that departure should not remain only in the code. We need to establish whether the implementation is wrong or the specification is no longer valid.

I call this process **Reconciliation**: an effort to bring what we know about the project back into alignment with what actually exists in it.

In its simplest form:

<figure class="content-diagram" aria-label="From change to reconciliation">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Change</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Impact Analysis</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Reconciliation</span></li>
  </ol>
</figure>

This cycle matters more to me than the documents themselves.

## The Project Should Have a Say Too

In a typical interaction with a coding agent, the relationship looks roughly like this:

<figure class="content-diagram" aria-label="The usual human–agent relationship">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Human</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Prompt</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Agent</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Code</span></li>
  </ol>
</figure>

A human tells the agent what to do, and the agent attempts to carry it out with whatever context is available.

But this model has a problem.

The latest user's prompt may unintentionally conflict with earlier project decisions.

Even I might ask for something six months later that violates a constraint I previously established and have since forgotten.

The model I have in mind for DaD is therefore a little different:

<figure class="content-diagram" aria-label="Working through project knowledge">
  <ol class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Human</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Project Knowledge</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Agent</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">→</span><span class="content-diagram__label">Implementation</span></li>
  </ol>
</figure>

The agent does not take its instructions only from the prompt.

The project itself must also be able to impose its rules and constraints on the agent.

In this model, files such as `AGENTS.md`, ADRs, specifications, and tasks are more than documentation. Each is part of the mechanism through which an agent can establish what it needs to consider before making a change.

That is why writing documents alone is not enough.

It must be clear which document is authoritative.

If two specifications say different things about the same subject, the agent should not have to guess.

An old decision needs to be able to carry the status `Superseded`.

A specification needs to be able to replace an earlier specification.

And ideally, the repository should make it possible to identify the current source of truth.

## How New Is This Problem?

Not very.

Architecture Decision Records have been around for a long time.

Specification-driven development is not new.

Traceability has a long history too.

For years, different software engineering approaches have tried to keep intent, requirements, and implementation connected.

So I am not claiming that DaD is a collection of entirely new ideas.

My reading is that agentic development has changed the weight of the problem.

In the past, documentation mattered primarily as a way for people to communicate and preserve project knowledge.

Now it has another consumer: a machine.

And this consumer has an unusual characteristic.

It is very fast.

It can read and change large amounts of code.

But each time, it has to work out again what kind of world it has entered.

Perhaps this is why something that was once a tolerable weakness in the development process can become a serious limitation in agent-driven projects.

## What Does DaD Not Solve?

I still do not know whether DaD is the eventual answer to this problem.

Probably not.

It is an evolving framework that has grown out of my experience with agents and projects in which AI has helped with a substantial part of development.

DaD does not prevent model hallucinations.

It does not guarantee that an agent will make the right decision.

It does not replace good architecture or code review.

Most importantly, if the project's documents are wrong, treating them as the source of truth merely makes us repeat the mistake more systematically.

That is why reconciliation is an important part of the idea.

Documentation should not only govern implementation.

Implementation must also be able to challenge documentation.

The relationship has to work in both directions.

## Perhaps Writing Code Is No Longer the Main Problem

For a long time, much of the tooling in software engineering has been built around one question:

**How can we write better code, faster?**

Better compilers, better IDEs, better frameworks, better libraries, and now better AI.

But if the current trend continues, we may reach a point where writing code is the easy part.

One agent can produce an implementation.

Another can write tests.

A third can refactor.

And then the more important question may be:

**Who makes sure that all these changes still belong to the same project?**

Perhaps the repository of the future will contain more than this:

<figure class="content-diagram content-diagram--composition" aria-label="Typical repository contents">
  <ul class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Source Code</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Tests</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Configuration</span></li>
  </ul>
</figure>

It may look more like this:

<figure class="content-diagram content-diagram--composition" aria-label="Project code and knowledge">
  <ul class="content-diagram__items" lang="en" dir="ltr">
    <li><span class="content-diagram__label">Code</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Intent</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Decisions</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Specifications</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">Constraints</span></li>
    <li><span class="content-diagram__connector" aria-hidden="true">+</span><span class="content-diagram__label">History</span></li>
  </ul>
</figure>

In other words, it would hold not only what makes the software executable by a machine, but also what keeps the project understandable to humans and agents.

Document-Aware Development is an effort I have begun as a way to think about this problem.

Not because I believe documentation is the answer to everything.

But because, as building becomes easier, I think **understanding what we have built is becoming the harder part**.

