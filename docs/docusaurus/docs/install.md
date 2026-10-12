---
title: Install
description: Download the App, or run one command on a machine without a screen. Updates come through the App.
---

A computer with a screen gets the **QualityLayer App**. A machine without one (WSL2, a dev container, a server) gets the **QualityLayer CLI** and opens the App in a browser.

![One rule: a machine with a screen gets the App, which updates itself; WSL2, dev containers and servers get the command line and open the App in a browser](pathname:///img/diagrams/install-light.svg)
![One rule: a machine with a screen gets the App, which updates itself; WSL2, dev containers and servers get the command line and open the App in a browser](pathname:///img/diagrams/install-dark.svg)

**You need** macOS, Windows or Linux, Git and a repository. You also need a coding agent you have signed in to and started once: Claude Code, Codex, or [another agent](agents/other.md) that runs shell commands.

## On your computer

**[Download the App](https://qualitylayer.dev/download)** and open it. The first start is one checklist:

1. **Licence:** activate yours, or start the 7-day trial.
2. **Command line:** the App sets up the `qualitylayer` command, the skills and the hooks.
3. **Your agents:** Claude Code and Codex are set up for you.
4. **Your level:** Engineering (the default) or Product. [What each changes](intro.md#two-levels).

**Open QualityLayer** turns on once one agent is ready.

On Windows you can also run `irm https://qualitylayer.dev/install.ps1 | iex` in PowerShell. This installs the App and the command line.

## Without a screen

```bash
curl -fsSL https://qualitylayer.dev/install.sh | bash
```

In WSL, run it inside your Linux distribution. The installer says how to open the App in your browser; over SSH, forward the port it names.

## Updates {#updates}

The App updates itself and the CLI together: click **Update ready** in the sidebar, then **Restart and update**. Without the App, run `qualitylayer update`. What changed is in the [changelog](reference/changelog.md).

## Remove it {#uninstall}

`qualitylayer uninstall` puts back what the installer changed; your plans stay. To move your licence, run `qualitylayer licence activate <key>` on the other computer. Coming from Pilot Shell 11? See [From Pilot Shell 11](moving-from-pilot-shell.md).

### On Windows {#uninstall-windows}

This works even when the App, the CLI or the uninstaller is blocked or gone:

```powershell
& ([scriptblock]::Create((irm https://qualitylayer.dev/install.ps1))) -Uninstall
```

It takes QualityLayer's hooks and settings out of Claude Code and Codex, keeps a copy of each file it changed, and removes the skills, the launcher, the App and its shortcuts. Your licence and tasks stay; add `-Purge` to remove them too.

## Windows with Intune or Defender Exploit Guard {#managed-windows}

On a company-managed PC, setup or an update can be refused with "Microsoft Defender Exploit Guard blocked an operation that was not allowed by your IT administrator", or a QualityLayer file can disappear after the install.

<details>
<summary>Why it happens and what to do</summary>

QualityLayer's programs are not signed with a code-signing certificate yet, and the Defender rule *Block executable files from running unless they meet a prevalence, age, or trusted list criterion* stops new, unsigned programs. Only your IT administrator can change it.

| Option | How |
| --- | --- |
| **Exclusion** (ask IT) | Exclude `%LOCALAPPDATA%\QualityLayer` and `%USERPROFILE%\.qualitylayer\bin` from the rule. In Intune: Endpoint security › Attack surface reduction › *Attack Surface Reduction Only Exclusions* |
| **File indicator** (ask IT) | Allow the setup file by its SHA-256, from `SHA256SUMS` on the release page |
| **WSL** (no IT needed) | Install the command line in a Linux distribution ([Without a screen](#without-a-screen)); the App opens in your Windows browser |

**If files were removed,** your agent's hooks stay silent, so Claude Code and Codex show no errors. `qualitylayer doctor` shows what a hook found, and opening the App once repairs the install. If the App itself is blocked, use the [Windows removal command](#uninstall-windows).

</details>

Next: [your first task](first-task.md).
