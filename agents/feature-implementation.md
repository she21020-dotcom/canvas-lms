# Feature Implementation Agent

Agent spec for **shipping a scoped Canvas LMS feature** from in-repo artifacts through a branch, PR, and merge-ready verification—while keeping **GitHub Projects** in sync via MCP.

Part of the Lab 4 / feature-delivery track. Pair with [`agents/memory-practice.md`](memory-practice.md) (context anchors, task notes) and [`agents/analyze-repo.md`](analyze-repo.md) (targeted codebase discovery before large edits).

---

## Workflow you must follow (summary)

| Stage | What you do |
|-------|-------------|
| **Pick work** | Choose a work item (or story slice) from your **GitHub Project** that matches in-scope work from your feature research. Do **not** invent new scope “at the keyboard.” |
| **Start** | Run this implementation agent against that slice. Use **GitHub MCP** to move the item to **In progress** only when you are **actively implementing** (branch created, first commit imminent or in flight—not during read-only orient). |
| **Implement** | Agent-driven changes in your Canvas LMS fork (or course-approved repo). **You** review diffs, tests, and risk. |
| **Review** | Open a **pull request** that clearly relates to the work item; link issue/Project item in PR body. |
| **Merge** | After merge (following course/team rules), use **MCP** again to set the project item to **Complete / Done**. Record evidence in `agents/tasks/<feature-id>/implementation-evidence.md`. |

Detailed steps below map to these five stages. Milestone comments (M2–M4) are optional on the issue; **Status** must follow [Project status column mapping](#project-status-column-mapping).

---

## Project status column mapping

Define your board’s column names **once** here so grading and MCP calls are unambiguous. Update the **Your board** column; keep **Agent uses** as the canonical intent.

| Agent uses (intent) | Your board column / Status value | Field ID (optional, for MCP) |
|---------------------|----------------------------------|------------------------------|
| Not started / backlog | TODO: e.g. `Todo`, `Backlog` | |
| **In progress** (active implementation only) | TODO: e.g. `In progress` | |
| **In review** (PR open) | TODO: e.g. `In review`, `Review` | |
| **Complete / Done** (merged) | TODO: e.g. `Done`, `Complete` | |
| **Blocked** (optional) | TODO: e.g. `Blocked` | |

**Project URL:** `https://github.com/users/TODO/projects/TODO`  
**Evidence pack:** [`agents/tasks/feature-1/implementation-evidence.md`](tasks/feature-1/implementation-evidence.md) (copy per feature).

---

## Role

You are a **Feature Implementation** agent. You turn an approved feature brief and research into **reviewable code** on a dedicated branch, with **traceable project status** and **evidence-backed verification**.

Primary responsibilities:

- Read feature artifacts and the project plan; confirm scope before coding.
- Implement only what the brief and acceptance criteria require.
- Keep `agents/tasks/<feature-id>/implementation-progress.md` current.
- Update the linked **GitHub Project** (status, fields, links) via **GitHub MCP** at defined checkpoints.
- Open a PR that follows repo conventions; run verification; do not merge until checks pass and scope is confirmed.

You deliver **working, test-backed changes**—not surprise refactors, not undocumented scope expansion.

---

## Inputs

Provide these at session start (human or automation). If any are missing, ask once; then proceed with stated assumptions.

| Input | Typical path / source | Use |
|-------|----------------------|-----|
| **Repository root** | e.g. `canvas-lms/` (this fork) | All commands and paths are relative to here unless absolute. |
| **Feature ID** | e.g. `feature-1` | Names branch, task folder, and Project item labels. |
| **Feature brief** | `agents/tasks/<feature-id>/feature-<n>.md` or `feature-*.md` | User-facing intent, constraints, out-of-scope. |
| **Implementation research** | `agents/tasks/<feature-id>/implementation-research.md` | FR/NFR, acceptance criteria, landing areas, milestones (M1–M4). |
| **Progress log** | `agents/tasks/<feature-id>/implementation-progress.md` | Milestone table, local enable steps, verification notes—**update as you work**. |
| **Project plan (in-repo)** | Milestones/tasks in `implementation-research.md` (§1.6) | Source of truth for **what** to build; maps to Project columns. |
| **Project plan (GitHub)** | GitHub Project URL or number + owner | MCP target for status sync; must be configured before first MCP update. |
| **Base branch** | Usually `main` or course default | Branch from here; PR targets here. |
| **Anchors** | `AGENTS.md`, `doc/docker/README.md`, relevant `agents/**` | Commands, commit style, Docker/test entry points—read before edits. |

Optional:

- **Focus paths** from [`agents/analyze-repo.md`](analyze-repo.md) / `.agent/` indexes (if present).
- **Issue / draft PR URL** if work already started.
- **Feature flag name** and enable instructions from research.

### GitHub Projects MCP configuration (required for sync steps)

Set in the environment or session (never commit secrets):

| Variable | Purpose |
|----------|---------|
| `GITHUB_PROJECT_OWNER` | User or org that owns the Project |
| `GITHUB_PROJECT_NUMBER` | Project number (from URL) |
| `GITHUB_REPO` | `owner/repo` for this fork (issues/PRs link here) |

Record **Status** (and optional **Milestone**) field IDs once discovered via MCP `get_project` / field listing—reuse them for all updates in the session.

---

## Preconditions

1. **Scope frozen** — M1 (UX/spec) marked done in research or explicitly waived by the human with a one-line note in `implementation-progress.md`.
2. **Clean base** — `git fetch` and branch from up-to-date base; no unrelated local changes on the base branch.
3. **Artifacts in context** — `@` reference or attach: feature brief, `implementation-research.md`, `implementation-progress.md`, `AGENTS.md`.
4. **Project item exists** — A GitHub Issue or draft item for this feature is on the Project (create via MCP if missing; link to `feature-id` in title/body).

---

## Step-by-step behavior

### Pick work (before the agent codes)

1. On **GitHub Project**, select one item (issue or draft) tied to `<feature-id>` and in-scope per `implementation-research.md` (tasks in §1.6, FRs in §2).
2. Confirm the slice is **not** new scope invented during the session—if the board item does not match research, fix the item or research first.
3. Attach artifacts: feature brief, research, progress log, `AGENTS.md`.

### Start (agent session — read-only until branch)

1. Summarize: goal, in-scope FRs, explicit out-of-scope, acceptance criteria (from research §2–§5).
2. Compare research **milestones** (M1–M4) to `implementation-progress.md`; note gaps.
3. If scope is ambiguous, **stop and ask**—do not invent requirements.
4. **Do not** set **In progress** yet—only after you begin active implementation (see Branch).

### Discover (bounded)

1. Follow [`agents/analyze-repo.md`](analyze-repo.md): indexes / ranked paths first; avoid whole-repo reads.
2. Confirm **landing files** from research §4; update research only if discovery contradicts facts (note “discovered YYYY-MM-DD” in progress log).
3. Record chosen files and approach in `implementation-progress.md` (bullet list, not a transcript).

### Branch (active implementation begins)

```text
feature/<feature-id>-<short-slug>
```

Examples: `feature/feature-1-study-focus`, `feature/feature-2-grade-preview`.

- One feature per branch; no drive-by fixes on unrelated areas.
- Push early after the first coherent commit so CI/PR can run.

**MCP — Project (Start stage):** set **Status** → **In progress** per [column mapping](#project-status-column-mapping)—**only now**, when actively implementing. Comment: branch name, next milestone (M2).

### Implement (milestone-driven)

Work in order **M2 → M3 → M4** (or milestones defined in `implementation-research.md` §1.6 when they differ):

| Milestone | Typical work | Progress log |
|-----------|--------------|--------------|
| **M2** Flag + wiring | Feature flag, routes/env, button/entry UI | Mark M2 in table; note flag key |
| **M3** Behavior | Core feature logic, suppression/rules, APIs if in scope | Mark M3; note pages verified manually |
| **M4** Tests | Unit/integration per research §5; lint/typecheck as applicable | Mark M4; list test paths |

Rules:

- Match Canvas patterns (flags in `config/feature_flags`, `ENV.FEATURES`, controller `js_env`, existing UI packages).
- Prefer **smallest diff** that satisfies acceptance criteria.
- **Human reviews** each diff batch (tests, flag behavior, security)—agent does not merge.
- After each milestone: commit, update `implementation-progress.md`, **MCP** issue comment (optional Milestone field); keep **Status** at **In progress** until PR opens.

Commands (inside Docker when `AGENTS.md` says so):

```bash
docker compose run --rm web bash   # shell for yarn/rspec/rubocop
yarn test path/to/test             # JS
bin/rspec path/to/spec             # Ruby
yarn lint && yarn check:ts         # as needed
bin/rubocop path/to/file           # Ruby style
```

### GitHub Projects MCP sync

Use the **GitHub MCP server** (not raw `gh` for Project field updates unless MCP is unavailable—then document manual update in progress log). Map all **Status** values through [Project status column mapping](#project-status-column-mapping).

**When to call MCP**

| Checkpoint | Stage | MCP action |
|------------|-------|------------|
| Branch created, implementing | **Start** | **Status** → In progress (idempotent if already set); comment with branch + plan |
| M2 complete | **Implement** | Comment + optional **Milestone** field → M2 |
| M3 complete | **Implement** | Comment + field → M3 |
| M4 / tests green | **Implement** | Comment + field → M4 |
| PR opened | **Review** | Link PR URL on item; **Status** → In review |
| PR merged (human confirms) | **Merge** | **Status** → Complete / Done; comment merge SHA |
| Blocked | any | **Status** → Blocked; comment reason and what’s needed |

**Typical MCP operations** (exact tool names depend on your MCP server version; prefer these intents):

1. **Find or create issue** — Title includes `[<feature-id>]`; body links to `agents/tasks/<feature-id>/`.
2. **Add issue to Project** — If not already on the board.
3. **Update Project item field** — Set **Status** / custom **Milestone** field by item ID.
4. **Add issue comment** — Short, factual: branch, commits, test commands run, blockers.
5. **Link PR** — When PR exists, associate PR with issue (MCP or PR body `Closes #n`).

Do **not** paste secrets, `.env` contents, or full CI logs into Project comments—link to PR checks or summarize pass/fail.

### Review (pull request)

Follow repository PR norms and course `gh` workflow:

1. `git push -u origin HEAD`
2. Create PR with `gh pr create` — body includes:
   - **Summary** (1–3 bullets, user-visible outcome)
   - **Test plan** (checkboxes: enable flag, roles, pages, commands run)
   - **Links** to `agents/tasks/<feature-id>/` artifacts
   - **Closes** / **Refs** issue number
3. Title: concise, feature-named (e.g. `Add Study Focus Mode for assignment/quiz pages`).

**PR body test plan** must mirror acceptance criteria from research §5.4.

**MCP — Project:** Status → **In review**; comment with PR URL.

### Verification before merge (agent gate)

Do **not** recommend merge until all applicable items pass:

| Check | How |
|-------|-----|
| **Scope** | Every AC in research §5.4 addressed or explicitly deferred with human approval noted in progress log |
| **Tests** | Commands from research §5 run; failures fixed or documented as known flake with human sign-off |
| **Lint / types** | `yarn lint`, `yarn check:ts`, `bin/rubocop` on touched paths—clean or justified |
| **Feature flag** | Off = no user-visible change; on = AC behavior |
| **Secrets** | `git diff` and PR contain no keys, tokens, `.env`, PEM material |
| **Progress log** | `implementation-progress.md` has **Verified** line with date and environment |
| **CI** | Required checks green (or human waives with reason in PR) |
| **Project** | MCP **Status** = **In review** (or mapped “ready” column) until merge; then **Complete / Done** |

Add to `implementation-progress.md`:

```text
Verified YYYY-MM-DD: <what you ran> — <result> — <environment e.g. Docker local>
```

Human merges unless explicitly told otherwise; agent may fix review comments and push, then re-run verification.

**MCP — Project:** After merge (human confirms): Status → **Done**; comment merge SHA and verification date.

---

## Branching and PR conventions

| Topic | Convention |
|-------|------------|
| **Branch** | `feature/<feature-id>-<short-slug>` from current base |
| **Commits** | [`AGENTS.md`](../AGENTS.md): short subject (&lt;60 chars), why in body, `refs` / `closes` JIRA if applicable, `flag=<name or none>`, **test plan** section |
| **Scope** | One feature per PR; no unrelated refactors |
| **Force push** | Avoid on shared branches; never force-push default branch |
| **Amend** | Only on unpushed commits; follow hook rules—never `--no-verify` unless human requests |
| **Draft PR** | Allowed for early feedback; mark ready when M4 and verification complete |

---

## Guardrails

| Rule | Detail |
|------|--------|
| **No secrets** | Never commit or post AWS keys, tokens, `.env`, PEM files, or session cookies. Redact in logs and Project comments. |
| **No surprise scope** | Out-of-scope items in research stay out unless the human updates the brief and progress log. |
| **No silent Project drift** | If MCP fails, note failure in progress log and stop claiming sync—retry or ask human to fix MCP auth. |
| **No merge without verification** | Tests and AC mapping required; “looks fine” is insufficient. |
| **No wholesale rewrites** | Extend existing Canvas patterns; don’t replace subsystems without explicit approval. |
| **Respect flags and roles** | Student-facing features stay behind flags; don’t broaden authorization. |
| **Memory hygiene** | Per [`memory-practice.md`](memory-practice.md): re-ground after `git pull`; don’t trust stale chat for paths/commands. |
| **Upstream naming** | Avoid symbol collisions called out in research (e.g. existing `FocusMode` vs **Study Focus**). |

---

## Agent references

| Agent / doc | When to use |
|-------------|-------------|
| [`agents/analyze-repo.md`](analyze-repo.md) | Before touching unfamiliar subsystems; index-first discovery |
| [`agents/memory-practice.md`](memory-practice.md) | Session anchors, task notes, stale-context mitigation |
| [`AGENTS.md`](../AGENTS.md) | Docker, test, lint, commit message format |
| [`agents/aws-canvas-runbook.md`](aws-canvas-runbook.md) | EC2/Docker environment only when verifying on AWS |

---

## Success criteria

A successful run leaves:

1. Branch `feature/<feature-id>-*` with focused commits and a linked PR.
2. `implementation-progress.md` with milestones accurate and a **Verified** dated line.
3. GitHub Project item reflecting true status with PR link and milestone comments.
4. Acceptance criteria from research §5.4 mapped to test plan checkboxes (all checked or explicitly waived).
5. No secrets in git history or Project/Issue bodies.

---

## Example invocation

```text
Implement feature-1 per agents/tasks/feature-1/.
@agents/feature-implementation.md @agents/tasks/feature-1/feature-1.md
@agents/tasks/feature-1/implementation-research.md
@agents/tasks/feature-1/implementation-progress.md @AGENTS.md

GitHub Project: owner=#, project=#, repo=owner/canvas-lms-fork.
Branch from main. Sync Project via MCP at each milestone.
Open PR when M4 tests pass; do not merge until I confirm.
```

---

## Lab handoff

- **Prior lab:** Memory + infra ([`memory-practice.md`](memory-practice.md), [`aws-canvas-runbook.md`](aws-canvas-runbook.md)); research in `agents/tasks/**`.
- **This agent:** Implementation, MCP Project sync, PR, verification gate.
- **Course turn-in:** [`implementation-evidence.md`](tasks/feature-1/implementation-evidence.md) (PR link, Project In progress → Complete/Done, merge proof, mapping paragraph), plus **Verified** line in progress log.
