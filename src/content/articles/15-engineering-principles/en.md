---
title: "15 Software Engineering Principles in the Age of AI Agents"
description: "Fifteen principles for working with AI agents before, during and after implementation: from understanding the problem to evaluating the result and taking responsibility."
lang: en
publishedAt: 2026-10-24
topics:
  - ai
featured: false
translationKey: "15-engineering-principles"
slug: "15-engineering-principles"
draft: false
sample: false
cover:
  src: "/images/articles/15-engineering-principles/hero.webp"
  alt: "The number 15 drawn in fine black lines on white paper, with a small brick-red line connecting the two digits"
---

AI tools are changing how software is developed. Today, a developer can use a few sentences to produce code that once took hours or even days to write. AI agents go further: they can examine a codebase, change files, write tests, run commands and even try to fix errors they have introduced themselves.

But there is an important question:

**Does the ability to produce code faster mean the ability to engineer better software?**

Generating code is only one part of software engineering. The more important part is understanding the problem, knowing the system, choosing an appropriate solution, managing complexity, assessing risk and making sure the result is correct.

In small systems or prototypes, we may be able to set many of these considerations aside. But in an enterprise system that has been developed over years, has dozens of modules and serves thousands of users, where a change in one part can affect the behavior of others, that approach is dangerous.

The term Vibe Coding usually refers to an approach in which the developer hands most code generation over to AI and continues development without carefully examining and understanding the output.

This can be useful for experimenting with ideas, rapid prototyping and some low-risk tasks. But we cannot apply it unchanged to enterprise software development.

The main difference is not whether we use AI; it is how we use it.

An experienced developer does not use an AI agent merely to write code faster. They use it to extend their own ability to analyze, investigate, implement and evaluate, without giving up responsibility for engineering decisions.

Below, we will examine 15 behaviors and techniques that can make the boundary between hurried use of AI and an engineered approach to development with its help clearer. These 15 principles are organized into three parts: before, during and after implementation.

---

## Part One: Before Implementation

### 1. Define the Problem, Not Just the Task

One of the most common mistakes when using an AI agent is to ask it directly to change code without explaining the problem and the purpose of the change.

For example:

> Make this method async.

This instruction specifies what should change, but does not explain why.

Is the goal to avoid occupying a thread while waiting for I/O? Are we experiencing thread pool starvation? Do we want to increase the system's capacity to handle requests under heavy load? Does the change need to extend through the entire call chain?

Each of these goals can lead to different decisions.

A more precise request might instead be:

> Under heavy load, many application threads are waiting for database operations to complete. We want to make the data access path asynchronous to use the thread pool more efficiently. First, examine this method's call chain and identify the changes needed to achieve that goal and the risks involved.

In the second case, the agent is not simply being asked to change syntax; it must analyze the problem.

**Engineering principle:** Before asking an agent to change something, we should be able to explain what problem we are solving and how we will know it has been solved.

### 2. Understand the System Before Changing the Code

An agent can examine dozens of files and make extensive changes in a short time. But the truth is that the speed of examining files is not its most important contribution; a comprehensive understanding of your system is what matters.

In enterprise software, a method's behavior may depend on shared contracts, environment settings, database structure, caching mechanisms, authorization or even the behavior of older versions and multiple platforms.

Suppose we need to change how user information is cached.

After looking at a few classes, an agent might suggest a solution that seems entirely reasonable within that part of the code. Yet it may not know that the application runs on several web servers and that each server's local cache can lead to inconsistent data.

Before implementation, we can ask the agent:

> Examine the paths for reading and updating user information. Identify which layers cache the data, what invalidation mechanism exists and whether the current behavior depends on running the application across multiple servers. Do not change any code yet.

Of course, the findings of this investigation must also be validated. Some of the architecture may not be visible in the code, or its documentation may be incomplete.

**An important technique**
Because many aspects of system understanding are shared across development scenarios and must always be taken into account, use the context-management capabilities available in today's agents: files such as AGENTS.md, as general context across implementation sessions, and skills, which organize the agent's knowledge and understanding so it can select them at runtime as needed. As implementation progresses, update the skill sets and the general system knowledge in AGENTS.md, and your agent becomes more mature and more precise.
Another important reason to use this technique is economic: once knowledge and understanding of your project and product are documented, you can get good results with less expensive AI models too. Correct execution becomes less dependent on having a giant AI model.

**Engineering principle:** A correct change in one file is not necessarily a correct change in a system.

### 3. Distinguish Facts, Hypotheses and the Agent's Recommendations

Language models can produce coherent, precise and convincing explanations even when they lack sufficient evidence to reach a conclusion.

Suppose that after examining a query, an agent announces:

> Using DISTINCT has caused a severe performance degradation.

This statement may be true, but it is still a hypothesis.

To establish it, we need to examine the execution plan, record counts, indexes, query execution statistics and actual load conditions.

A professional developer asks the agent to separate its findings into:

- Facts extracted directly from code, configuration or measured data.
- Hypotheses proposed on the basis of that evidence.
- Recommendations for investigating or resolving the problem.

For example:

> Divide your analysis into Observations, Hypotheses and Recommendations. Identify the source of each observation, and explain what experiment could confirm or refute each hypothesis.

This helps prevent the agent's guesses from turning into firm decisions.

**Engineering principle:** A convincing explanation is no substitute for evidence.

### 4. Define the Scope of the Change Deliberately

Look, agents usually try to solve the problem they have been given as fully as possible. This is useful, but sometimes it leads them to make changes beyond the intended scope. The truth is that we sometimes welcome this behavior ourselves. It gives us the tempting feeling that, with only a little information, an agent can do something more complete than we asked for! Experience shows that this does not necessarily work in our favor; the result can be greater complexity and more disorder in our code. We still need to keep the reins of this powerful horse in our own hands.

For example, while fixing a bug, an agent might decide to refactor several classes, rename public methods or add a new dependency.

Some of these changes may make sense, but they are not necessarily required to solve the problem.

In large systems, every additional change can increase risk, review cost and the likelihood of regression.

It is therefore better to define the permitted scope:

> Fix this bug without changing the public API or database schema. Changes in the DataAccess layer are allowed, but changes to shared contracts require approval. If the proposed solution needs a change outside this scope, explain it before proceeding.

Defining scope should not, of course, mean imposing an incorrect solution. If the agent finds that the constraints prevent it from solving the problem properly, it should be able to report that.

**Engineering principle:** An agent's authority should match the scope and risk of the work—neither unlimited nor restricted without reason.

### 5. Decide on the Solution Before Implementation

One of the attractions of an AI agent is how much it shortens the distance between describing a problem and seeing code.

But that same feature can lead us to overlook design.

Suppose we need to redesign how resource-intensive reports are processed.

An agent might immediately suggest a background service, a message queue or a new asynchronous processing mechanism.

But do we really need new infrastructure? Can we use an existing mechanism? How much operational complexity does the new solution add? What happens when the service restarts or processing fails?

For significant changes, it is better to ask the agent to compare options before generating code:

> Suggest at least two feasible solutions to this problem. Explain the advantages, disadvantages, implementation complexity, effect on existing infrastructure and operational risk of each. Do not begin implementation yet.

This step does not necessarily require a formal architecture document. Sometimes a short conversation is enough to reach a decision.

**Engineering principle:** The speed of code generation should not replace the quality of decision-making.

---

## Part Two: During Implementation

### 6. Break Large Tasks into Small, Evaluable Changes

Handing a large change over to an agent is tempting.

For example:

> Refactor the entire user management module and fix its architectural problems.

But this request has several problems.

First, it has no clear definition of success. Second, the agent may make numerous decisions that are difficult to review. Third, if something goes wrong, identifying the source of the problem becomes complicated.

A better approach is to divide the work into stages we can evaluate.

For example:

1. Identify existing dependencies and problems.
2. Propose and approve the target structure.
3. Refactor a limited part without changing behavior.
4. Run tests and check for regressions.
5. Continue the migration in subsequent parts.

Each stage should have a specific output and acceptance criteria.

Besides reducing risk, this makes it possible to adjust course. If the initial assumptions are wrong, we do not have to wait until an extensive change is complete.

**Engineering principle:** The right unit of work for an agent is not the largest task it can perform; it is the largest task we can confidently evaluate.

### 7. Engineer the Context Rather Than Simply Making It Larger

The quality of an agent's output depends heavily on the information available to it while it works.

But the answer is not to put every document and file in the project into its context.

Large, irrelevant context can increase processing costs, bury important information in unnecessary detail and even lead to the use of outdated or contradictory documentation.

For example, when changing authentication, security contracts, authentication architecture and related tests matter. Documentation about reporting or user interface design probably does not help.

A better approach is to organize information at several levels:

- General, stable project rules.
- Architectural documentation and contracts relevant to the problem.
- Files and dependencies necessary for the change.
- Information the agent discovers during analysis.

It should also be clear which source is more authoritative. If documentation differs from the existing implementation, the agent should not arbitrarily assume either one is unquestionably correct.

**Engineering principle:** Good context is not large context; it is relevant, authoritative and traceable context.

### 8. Define Acceptance Criteria for the Agent

The request “implement this feature” is usually not enough to evaluate the result.

Suppose we need to add support for receiving large files.

If we simply ask the agent to implement uploads, it may succeed in the normal scenario but overlook interrupted connections, incomplete files, size limits, concurrent requests or temporary-file cleanup.

Instead, we can define acceptance criteria:

> Uploads must support files up to the specified size limit, enforce file-type security restrictions, release temporary resources if the connection is interrupted and report predictable errors with appropriate responses. Concurrent-request behavior must also be examined.

Acceptance criteria should, as far as possible, be testable!

The important point is that the criteria should describe the expected behavior of the system, rather than merely the way it is implemented.

**Engineering principle:** If we cannot define the success of a change, we cannot confidently judge the agent's success.

### 9. Do Not Give the Agent Unlimited Decision-Making Authority

Not all technical decisions have the same significance.

Renaming a local variable is not equivalent to changing a database schema, an API contract or an authorization mechanism.

Yet if we do not define the agent's authority, it may make both kinds of decision with the same degree of independence.

It is better to classify decisions by risk.

For example:

**Low-risk decisions:** Correcting internal variable names, extracting small methods or adding tests within a defined scope.

**Medium-risk decisions:** Changing class structure, modifying queries or changing cache behavior.

**High-risk decisions:** Changing public contracts, database migrations, security changes, deleting data or changing the architecture.

For the last category, we can require explicit human approval.

These restrictions should not exist only in the prompt. As far as possible, they should also be enforced through tool permissions, access restrictions, branch protection and review processes.

**Engineering principle:** Automate the execution of many decisions, but do not automate decision-making.

### 10. Use the Agent to Critique Its Own Solution

An agent should not only produce code. It can also contribute to a critical analysis of that code.

After implementation, rather than simply asking “is the code correct?”, it is better to ask more specific questions.

For example:

> Review this change for race conditions, resource management, cancellation, behavior under heavy load, incompatibility with existing contracts and possible regressions. For each risk, suggest a scenario in which it could occur and a way to validate it.

We can make the agent examine its own solution from different perspectives—for example, security, performance or maintainability.

But there is an important limitation.

**The agent that generated the code may repeat its earlier mistaken assumptions when reviewing that same code.**

Self-review is therefore useful, but it is no substitute for independent review. For sensitive changes, independent tests, static analysis tools, a human reviewer or a separate evaluation process are more valuable.
Another, more advanced technique that can help is to use a different model to analyze and examine the assumptions we have implemented. For example, we might use a standard model that balances quality and cost for development, but use a stronger, different model suited to analysis to examine the work it has done. Today's agents can delegate different tasks to different models, although you do not need a particular agent feature to divide the work this way.

**Engineering principle:** Do not use AI only to confirm your ideas; ask it to try to disprove them too.

---

## Part Three: After Code Generation

### 11. Review the Agent's Output as You Would Another Developer's Code

One of the most dangerous habits in AI-assisted development is confusing successful code execution with code quality.

An agent may produce code that compiles, passes existing tests and works correctly in the main scenario, yet still has design problems.

For example, it might add several new abstractions to fix a simple problem, duplicate logic or introduce an inappropriate dependency between layers.

In code review, we should ask the same questions we ask about a colleague's code:

- Is the solution proportionate to the problem?
- Has it introduced unnecessary complexity?
- Have contracts and architectural principles been respected?
- Are the side effects of the change understood?
- Can someone else understand and maintain this code?

The developer who approves the agent's changes should be able to explain their core logic.

This does not mean manually checking every line in every situation. Review depth should match the risk, and automated tools should also be used.

**Engineering principle:** Code whose correctness and design we cannot judge is not trustworthy simply because it works.

### 12. Treat Tests as Evidence of Correctness, Not Just a Green Checkmark

Agents can generate tests alongside an implementation. This is valuable, but it comes with a subtle problem.

If the agent has misunderstood the problem, it may write tests that confirm that same misunderstanding.

Suppose that in a financial system, the final amount must be calculated according to specific rounding rules.

The agent might produce an implementation and tests that both use the same incorrect rounding method.

All tests turn green, but the system's behavior is still wrong.

To reduce this risk, test scenarios should be derived from requirements, existing contracts and valid business examples, rather than merely from the code the agent generated.

For important changes, we can define behavioral tests first and then hand implementation over to the agent.

We also need to distinguish between types of tests. Unit tests alone cannot reveal integration, concurrency, performance or deployment problems.

**Engineering principle:** A good test should be able to discover the agent's mistake, rather than simply agree with its implementation.

### 13. Evaluate Changes Across the Whole System

In enterprise software, a change may behave correctly in isolation while having an undesirable effect on the system as a whole. I could give you as many examples as you like of local changes that affected an entire system. Agents can create the same situation: once all of a product's modules and services operate together in the runtime environment, the problem may look different.

Suppose an agent has optimized a query, reducing its execution time from 500 milliseconds to 100 milliseconds.

At first glance, the result is excellent.

But if the new solution increases memory consumption, puts more pressure on TempDB, changes locking patterns or increases the number of concurrent database requests, overall system performance may get worse.

The same applies to asynchronous changes, caching, parallel processing and service architecture.

Evaluation should therefore cover several levels, depending on the kind of change:

- Correct behavior at the method or component level.
- Compatibility with the rest of the system.
- Effects on shared resources such as CPU, memory, the thread pool and the database.
- Behavior under failure and heavy load.
- Compatibility with the deployment environment and existing versions.

These checks should be selected according to risk; not every small change needs a full load test.

**Engineering principle:** Optimizing one component is valuable when we have also considered the behavior of the whole system.

### 14. Preserve the Decisions and Knowledge Produced

While working with an agent, we may discover valuable information about the system.

For example, we might find that an old constraint exists for backward compatibility, that an architectural decision was made to prevent a particular problem or that changing a contract requires coordination across several other modules.

If this information remains only in the conversation history, it will probably be lost in the future.

The agent's next session may have different context. Another developer may also be unaware of the reasons behind the decisions.

Lasting knowledge should therefore be moved to appropriate sources:

- Architectural decisions into ADRs.
- Contracts and constraints into technical documentation.
- Expected behaviors into specifications and tests.
- Information about the change into the pull request and work item.

Of course, we should not turn every conversation or small decision into a formal document. Aimless documentation is another kind of complexity.

What should be preserved is information that has value for future decisions, system maintenance or preventing repeated mistakes.

**Engineering principle:** Engineering knowledge should not remain trapped in an agent's temporary memory.

### 15. Do Not Hand Responsibility for the Result Over to the Agent

This may be the most important difference between professional and unprofessional use of an AI agent.

Always keep this in mind: when an agent generates code, responsibility for its quality does not automatically disappear from the developer's shoulders.

If a change disrupts the system, “the agent wrote this code” is an explanation of how the error arose, not a justification for a lack of oversight.

A professional developer can delegate much of the execution, but should still have command of important decisions, acceptance criteria and the evidence that the result is correct.

This responsibility is not only individual, of course. The organization must also provide appropriate tools, time, test environments, access policies and review processes.

We cannot expect developers to take responsibility for quality while evaluating them solely on how quickly they produce code or how many tasks they close.

**Engineering principle:** We can delegate execution to an agent, but accountability for the result remains a human and organizational responsibility.

---

## Are All These Principles Necessary for Every Change?

No.

One important skill in using an AI agent professionally is recognizing how much oversight the risk calls for.

Correcting a simple piece of interface text does not require architectural analysis, an ADR and several approval stages.

But changes to authentication, financial transaction processing or database structure require much more oversight and validation.

We can consider three broad levels of work with an agent:

<section class="table-scroll" aria-label="Activity risk levels and oversight" tabindex="0">

| Level | Example activities | Approach to oversight |
| --- | --- | --- |
| Low-risk | Text corrections, limited visual changes, simple refactoring | Direct execution within a defined scope, diff review and relevant tests |
| Medium-risk | Business logic changes, query modifications, internal restructuring | Initial analysis, a change plan, testing and review |
| High-risk | Public contract changes, security, migrations, architecture or financial processing | Prior design and approval, staged execution, independent validation and release controls |

</section>

This classification is not absolute. A seemingly simple change in a sensitive area can be high-risk.

An agent's independence should therefore depend on the system's sensitivity, the scope of the change, reversibility and our ability to evaluate the result.

## The Real Difference Between Vibe Coding and an Engineered Approach to Development

The difference between these two approaches should not be reduced to prompt length, the number of tools used or the amount of direct developer involvement.

A developer might use a very short prompt, yet have a thoroughly engineered process supported by authoritative documentation, precise tests and appropriate constraints.

Conversely, someone else might use long, complex prompts while still generating code without understanding the problem or evaluating the result sufficiently.

The real boundary lies in these questions:

**Do we know what problem we are solving? Do we understand what the agent has changed? Do we have enough evidence that the result is correct? And can we take responsibility for that change?**

If the answers are unclear, even the most sophisticated agents cannot fill the absence of engineering.

## The Senior Developer's Role in the Age of AI Agents

We might imagine that as agents become more capable, developers' experience becomes less important.

But at least in complex systems development, an argument can be made in the opposite direction.

As producing code becomes cheaper and faster, the ability to identify the right problem, choose an appropriate architecture, recognize risks and evaluate output becomes more important.

These are skills that make up a substantial part of engineering experience.

This does not, of course, mean that less experienced developers cannot use agents well, or that senior developers always make better decisions. Experience alone does not guarantee quality.

The point is that an AI agent increases our ability to execute, but greater execution capability without the ability to judge can be dangerous.

In the past, the limits of implementation speed forced some time for thinking and review upon us. Now that those limits are diminishing, we need to deliberately make room for analysis, design and validation.

**A senior developer is not someone who can get the most code out of an agent; it is someone who knows what to delegate to the agent, what to decide themselves and how to evaluate whether the result is correct.**

The purpose of professional AI use is not to remove people from engineering; it is to increase their engineering capability.

And perhaps this is the most important change we need to make in our outlook:

**Instead of asking AI, “How much faster can you write code for me?”, ask, “How can we engineer better software with your help?”**
