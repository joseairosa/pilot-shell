---
title: Change reviews
description: After the build, your team sees why and how a change was made, with its proof; the code is reviewed in your pull request.
---

Once Verify has passed, your team reads the same walkthrough you do, **The change, top to bottom**, without the code: why the change was made, each point with its proof, and the slices with their decisions and file names. The code itself is reviewed in the pull request, as always.

![Change review: the team reviews the finished change; open threads go back to your agent, which settles each one and checks again what the fix touched before the re-review](pathname:///img/diagrams/team-change-light.svg)
![Change review: the team reviews the finished change; open threads go back to your agent, which settles each one and checks again what the fix touched before the re-review](pathname:///img/diagrams/team-change-dark.svg)

1. Teammates comment on any slice or point, and approve or ask for changes. Their comments open in your **Comments** tab.
2. You run `/ql review <task>` (`$ql` in Codex). Your agent goes through each thread with you, including the pull request's code comments.
3. Only what a fix touched is checked again, and your team looks once more.
4. You approve when the threads are settled.

After the pull request opens, its threads and failing checks come back the same way ([Pull request](../steps/pull-request.md)). People outside the team can comment through a link but cannot approve. Sharing never sends your code, the diff or your logs.
