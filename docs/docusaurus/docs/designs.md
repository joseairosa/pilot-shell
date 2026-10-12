---
title: Designs
description: Ask your agent to draw a page, open it full size in the App, and point at what should change. Designs stay on your computer.
---

A design is one page your agent draws for you: a screen, a flow, a diagram of how something fits together. Open it full size in the App, comment on a spot, and your agent changes the same page. It works at any step, inside a task or outside one.

![Ask your agent for a design, open its compact entry in Files, comment on a spot and see the same page update; the interactive page stays local](pathname:///img/diagrams/designs-light.svg)
![Ask your agent for a design, open its compact entry in Files, comment on a spot and see the same page update; the interactive page stays local](pathname:///img/diagrams/designs-dark.svg)

## Ask for one

Say it in your own words: "mock up the settings page", or "draw how checkout talks to billing". Your agent writes one self-contained page and the App lists it in **Files**. A dot marks one you have not opened.

| Asked | Saved in | Listed |
| --- | --- | --- |
| In a task | The task's `design/` folder | **Files** of that task, with its open comments |
| Outside a task | `docs/designs/` | **Files** on Home |

At the **Product** level, Discuss also draws a grey wireframe of each screen that changes, and two side by side when you have a layout to choose. The Plan's finished design is a separate page, approved with the Plan.

## Open it full size {#full-size}

![A design open full size: Back to the Plan, the design's name and update time, Comment, zoom, Light and Dark, Desktop and Phone, Jump to and full screen; the Comments tab lists numbered spots with the agent's answers](pathname:///img/app/design-light.webp)
![A design open full size: Back to the Plan, the design's name and update time, Comment, zoom, Light and Dark, Desktop and Phone, Jump to and full screen; the Comments tab lists numbered spots with the agent's answers](pathname:///img/app/design-dark.webp)

*Example design in a fictional project.*

A design takes the whole content area. Its bar holds the controls:

| Control | What it does |
| --- | --- |
| **Comment** (C) | Click a spot and say what should change |
| Zoom, **Fit** | Size the page |
| **Light**, **Dark**, **Desktop**, **Phone** | Switch how the page shows |
| **Jump to** | Find a section of the design |
| **Full screen** (F), **Open in browser** | Give it more room |

A comment appears in the **Comments** tab with **Jump to the spot** and reaches your agent like any other. Your agent changes the same page and says in one line what changed; the App shows "Settings page was updated · Open". You always see the latest.

## Kept on your computer {#never-shared}

The interactive design and its comments stay on your computer, and the design folders stay out of Git. A share link shows at most a still picture of the Plan's design. Your agent can check its own work with `qualitylayer design shot` ([commands](reference/commands.md#designs)).
