# Memory practice (Lab 3.1)

Part A deliverable: one operational memory technique applied to **Canvas LMS** work in this fork (large Rails + JS monorepo, Docker-based dev, upstream churn).

### Minimum requirements (submission checklist)

| Requirement | Where satisfied |
|-------------|-----------------|
| **Technique / library** + procedure + evidence | [§1 Name and rationale](#1-name-and-rationale), [§2 Procedure](#2-procedure), [§4 Evidence](#4-evidence) |
| **Agent reference** (link to another agent artifact you maintain) | [Agent reference](#agent-reference) → [`agents/analyze-repo.md`](analyze-repo.md) |
| **Mitigation** for staleness or over-trust | [§3 Failure analysis](#3-failure-analysis) (stale LTM + over-retention / wrong trust) |

---

## Agent reference

This memory practice is **explicitly tied** to the **Repository Analyzer** spec in **[`agents/analyze-repo.md`](analyze-repo.md)** (same directory as this file). That agent defines **index artifacts** (e.g. under `.agent/`), **retrieval before broad reads**, **context budget**, and **refresh/purge** rules—this document treats those behaviors as the **long-term memory** complement to chat.

**When `analyze-repo` runs (human or automation):** attach or `@`-reference **`agents/memory-practice.md`** together with **`agents/analyze-repo.md`** so the session follows the same trust boundaries (anchors first, re-ground after merges, purge stale indexes). If the analyzer scripts are not present yet, the **procedure** in [§2](#2-procedure) still applies using `AGENTS.md` and `doc/docker/` as manual LTM.

---

## 1. Name and rationale

**Name:** **Artifact-backed long-term memory + retrieval-first workflow** (Week 3: STM vs LTM, explicit refresh, “semantic” notes in-repo vs “episodic” chat).

**Rationale for Canvas work:** Canvas is too large to re-derive from chat history each session. Treating **committed files** (`AGENTS.md`, `agents/**`) and, when used, **local index artifacts** described in [`agents/analyze-repo.md`](analyze-repo.md) as **long-term memory** keeps procedures and structure **grounded in the repo**. The chat stays **short-term memory**: good for reasoning and one-off commands, bad as the sole record of “how we run Docker” or “which paths matter.” This matches the analyzer agent’s idea: **rank from indexes / high-signal paths first**, bounded context, refresh when the tree changes—without needing a separate vector product for the lab.

---

## 2. Procedure

How this changes **prompts** and **file rituals** (repeat each session or after merges):

- **Start prompts with anchors, not vibes.** Open or `@`-reference `AGENTS.md`, `doc/docker/README.md`, and (for architecture work) [`agents/analyze-repo.md`](analyze-repo.md); ask for a plan **only after** those are in context.
- **Prefer file rituals over long re-explanations.** Before a deep task, skim `agents/tasks/**` for your feature; append short dated notes there instead of relying on the model to “remember” last week.
- **Re-ground after upstream or branch changes.** After `git pull` / merge / rebase, explicitly prompt: “Assume prior chat context may be stale; re-read `AGENTS.md` and the Docker doc paths that apply to my OS; list what changed we must respect.”
- **If using `.agent/` indexes (per `analyze-repo.md`):** warm or rebuild indexes when hashes drift; **query index output** to pick files before asking for full-file reads of unknown areas.
- **Purge policy before long sessions.** If context is huge, prompt for a **summary of decisions** into `agents/tasks/...` or this file’s evidence section, then **start a fresh thread** with `@AGENTS.md` + task note attached—not a transcript dump of the whole repo.
- **Last verified line.** When something critical was confirmed (stack boots, doc path still valid), add **one dated line** under [Evidence](#4-evidence) or the relevant task note (`Verified YYYY-MM-DD: …`).

---

## 3. Failure analysis

| Failure mode | What goes wrong | Mitigation |
|--------------|-----------------|------------|
| **Stale LTM (wrong trust boundary)** | `AGENTS.md`, Docker notes, or `.agent/*.json` reflect an **old** tree; the agent confidently gives outdated commands or wrong paths after a fast-forward merge. | After every significant `git pull`, run the **re-ground** prompt above; rebuild or delete stale `.agent/` if indexes exist; verify one command against current files before batch operations. |
| **Over-retention of junk in artifacts** | Task notes or pasted logs accumulate secrets, one-off experiments, or obsolete commands; future you (or the model) **trusts** them. | **Purge:** redact secrets; delete obsolete bullets; prefer linking to upstream paths over copying large blocks; treat task notes as **append-only with pruning**, not archives of everything. |

At least one of the above is expected in real Canvas work because upstream and local Docker setups diverge often.

---

## 4. Evidence

**Last verified metadata:** *Not yet run against live EC2 in this doc—replace when you complete your stack.* Example: `Verified 2026-05-13: docker compose ps healthy after doc/docker setup on [REDACTED].`

**Session log excerpt (synthetic but representative; hostnames and tokens removed):**

```text
--- User prompt ---
I'm on my Canvas fork for Lab 3.1. Don't list the whole repo. @AGENTS.md @doc/docker/README.md
What's the minimum to get docker compose up on Ubuntu EC2?

--- Assistant (abridged) ---
From AGENTS.md: docker compose up; docker compose run --rm web bash; yarn build:watch for UI dev.
From doc/docker/README.md: ensure Docker installed; consider ./script/docker_dev_setup.sh and
group/permission notes for docker-instructure before compose.

--- User follow-up ---
We just git pull'd from upstream—anything stale?

--- Assistant ---
Re-ground: re-read AGENTS.md and doc/docker for changes; if you use .agent indexes from
agents/analyze-repo.md, plan an incremental reindex; don't trust last week's chat for new env vars.
```

Redact before submitting: real IPs, instance IDs if your course forbids them, SSH hosts, AWS keys, and `.env` contents.

### Course submission note

Turn in **`agents/memory-practice.md`** and **`agents/aws-canvas-runbook.md`**, plus a **screenshot** of Canvas running in **AWS Academy** (capture yourself; do not commit secrets in the image). See also [What you turn in](aws-canvas-runbook.md#what-you-turn-in-course) in the runbook.

---

## Lab handoff (scope reminder)

- **This lab:** Operational memory pattern + documentation; infra runbook in [`aws-canvas-runbook.md`](aws-canvas-runbook.md).  
- **Next lab:** Feature implementation — see [`agents/feature-implementation.md`](feature-implementation.md) (not required in Lab 3.1).
