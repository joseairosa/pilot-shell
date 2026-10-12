---
title: Teammates' agents
description: A teammate you ask can answer with their own coding agent. The agent drafts; nothing is sent without their yes.
---

When you ask a teammate about your Plan, they can hand the question to their own agent. It reads the question and the Plan, looks at their code, asks them what it needs and drafts the answer. Nothing is sent without their yes.

![A teammate answers with their own agent: it reads the question and the Plan, drafts an answer, sends it only after their yes, and your App shows it via that agent](pathname:///img/diagrams/team-agents-light.svg)
![A teammate answers with their own agent: it reads the question and the Plan, drafts an answer, sends it only after their yes, and your App shows it via that agent](pathname:///img/diagrams/team-agents-dark.svg)

1. In their App, **Draft with my agent** copies one command: `/ql answer <ask>` (`$ql answer <ask>` in Codex).
2. Their agent drafts, then asks: **Send this as your answer?** Until then the App shows the draft as "not sent yet", with **Send the draft**, **Edit it** and **Discard the draft**.
3. The answer reaches you marked with its agent, such as "Dana via Claude Code", and your agent picks it up.

![A teammate's questions in the team space: each with Looks right, Suggest a change, Reply in your words, Draft with my agent and Hand to someone else; one agent draft waits, not sent yet, with Send the draft and Edit it](pathname:///img/app/team-light.webp)
![A teammate's questions in the team space: each with Looks right, Suggest a change, Reply in your words, Draft with my agent and Hand to someone else; one agent draft waits, not sent yet, with Send the draft and Edit it](pathname:///img/app/team-dark.webp)

*Example team in a fictional project.*

The `qualitylayer ask` commands are in the [command reference](../reference/commands.md).
