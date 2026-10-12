---
title: Plan
description: "The one document you approve before any code: what it rests on, the design and its decisions, and how you will know it works."
---

![The eight steps, with Plan highlighted](pathname:///img/diagrams/track-plan-light.svg)
![The eight steps, with Plan highlighted](pathname:///img/diagrams/track-plan-dark.svg)

The Plan is the one document you approve before any code is written. Agents build from it, so this is where your judgement pays most.

![The Plan in the App: a diagram of how usage flows through the system, a table of what changes, and Approve Plan and Give feedback at the top right](pathname:///img/app/plan-light.webp)
![The Plan in the App: a diagram of how usage flows through the system, a table of what changes, and Approve Plan and Give feedback at the top right](pathname:///img/app/plan-dark.webp)

*Example task in a fictional project.*

## What you read {#items}

| Part | What it tells you |
| --- | --- |
| **What the Plan rests on** | The research findings behind it, one sentence each |
| **The design** | For a change people see; comment on any spot ([Designs](../designs.md)) |
| **Engineering decisions** | Each with its diagram and reasoning; the **contracts** between parts fold to one headline each |
| **Done means** | The results from [Discuss](discuss.md); your approval covers them |
| **Decided by you**, **Decisions made for you** | Your answers, then the smaller choices your agent took, each with its reason |
| **Not doing**, **Before the build** | What stays untouched, and what must be ready first, such as a login only you can give |
| **How we will know it works** | The one check for the whole change, its size, and whether it is risky and why |

At the **Engineering** level every section is open. At the **Product** level each decision says what changes for the user and why, and the diagrams and contracts fold under **More in this document** ([two levels](../intro.md#two-levels)).

## Approve or give feedback {#answering}

The Plan asks no batch of questions. A choice that appears only once a design is drawn sits inside it as a **Your call**, with two options and a recommendation; there are at most two. **Your turn** shows them one at a time, with the part of the Plan each concerns, and each answer reaches your agent immediately. Findings from the technical review return to the planning agent, which fixes or answers them; only a new hard choice reaches you.

Once the choices are settled, the complete Plan appears in the main pane. Only your click approves it; answering a question does not approve the Plan:

- **Approve Plan** at the top right approves the Plan, its **Done means** and its design together, once.
- **Give feedback** sends the changes you want. Your agent answers each note and revises the Plan; the diff shows what changed. A change to **Done means** withdraws an earlier approval.

## Comment on a diagram {#diagrams}

![An engineering decision as a diagram: a pinned comment opens a thread, the agent answers in it and changes the Plan](pathname:///img/diagrams/decision-light.svg)
![An engineering decision as a diagram: a pinned comment opens a thread, the agent answers in it and changes the Plan](pathname:///img/diagrams/decision-dark.svg)

Click any part of a diagram or any passage to pin a comment. Your agent answers in the thread and changes the Plan. Teammates can do the same; ask them to read along in [Plan reviews](../team/plans.md).

## Before it reaches you {#before-it-reaches-you}

Another agent reads the first full draft: Codex reads Claude Code's Plan and the other way round, or a separate reviewer when you have only one. It looks for decisions that do not follow from what you agreed, a simpler shape, missed risks and contradictions with the code. Your agent folds the findings in; **Reviewed by** shows what each became. [Settings](../reference/settings.md#second-opinion) chooses when this runs.

While you read, your agent writes the [Outline](outline.md). After you approve, the App opens [Implement](implement.md).
