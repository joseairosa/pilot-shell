---
title: Other agents
description: Any coding agent that can run shell commands can follow QualityLayer's steps.
---

Claude Code and Codex are set up for you. Any other coding agent works too, as long as it can run shell commands in your repository.

![Connecting another coding agent: it needs the qualitylayer command on its path and the skill text from Copy, For another agent; then it follows the same steps and you decide in the App](pathname:///img/diagrams/agents-other-light.svg)
![Connecting another coding agent: it needs the qualitylayer command on its path and the skill text from Copy, For another agent; then it follows the same steps and you decide in the App](pathname:///img/diagrams/agents-other-dark.svg)

| | Do this |
| --- | --- |
| 1 | In the agent's terminal, run `qualitylayer help`. No list of commands? Run `qualitylayer doctor` |
| 2 | In the App, **+ New › Another agent** gives one prompt with your request. Paste it into a session in your repository |
| 3 | Answer in the App as usual. For Implement, pick **Another agent** under **Build with** and paste its prompt into a fresh session |

Every step works the same, on the agent's own models. The one exception is the [second opinion](../reference/settings.md#second-opinion), which needs Claude Code and Codex both.

<details>
<summary>For the agent's author</summary>

**Waiting for you.** An agent that can run a background command and resume when it ends uses `qualitylayer wait --until-event`; it returns on an event or after 30 minutes. A foreground `qualitylayer wait` returns sooner; handle its event, or call it again after `pending`.

**Tools Git does not track.** Before a slice is committed, its checks run on a clean copy of exactly what is committed, so a pass proves the commit and not your working folder. A Python `.venv` or `node_modules` is not in that copy. When a check fails only because such a tool is missing, QualityLayer runs it again in your folder and records why. A command can also reach your folder through `$QL_REPO_ROOT`, for example `"$QL_REPO_ROOT/.venv/bin/python" -m pytest`.

</details>
