# Feature 1 — Implementation evidence

Short evidence pack for **Focus Mode / Anti-Distraction Layer** (delivered as **Study Focus Mode**). Aligns with [`agents/feature-implementation.md`](../../feature-implementation.md) turn-in expectations.

**Replace every `TODO` below before submission.** Do not commit secrets, tokens, or unredacted AWS/SSH details in screenshots.

---

## Pull request(s)

| PR | Branch | State | Link |
|----|--------|-------|------|
| Primary | `feature/feature-1-study-focus` (or your branch name) | TODO: Open / Merged / Closed | `https://github.com/she21020-dotcom/canvas-lms/pull/TODO` |

- **Repo:** [she21020-dotcom/canvas-lms](https://github.com/she21020-dotcom/canvas-lms)
- **Related artifacts:** [`feature-1.md`](feature-1.md) · [`implementation-research.md`](implementation-research.md) · [`implementation-progress.md`](implementation-progress.md)

---

## GitHub Project — status movement

Record the **Project item** (issue or draft) title and how **Status** changed. Use the same labels as [Project status column mapping](../../feature-implementation.md#project-status-column-mapping) in `agents/feature-implementation.md`.

| Project item | Start status | End status | When (UTC or local) | Notes |
|--------------|--------------|------------|---------------------|-------|
| `[feature-1] Study Focus Mode` (or your issue title) | TODO: backlog column | TODO: **In progress** | TODO | **Start** stage—only when actively implementing (branch/commits), not during orient |
| Same item | *In progress* | TODO: **In review** | TODO | **Review** stage—PR opened |
| Same item | *In review* | TODO: **Complete / Done** | TODO | **Merge** stage—after PR merged |

**Project URL (optional):** `https://github.com/users/she21020-dotcom/projects/TODO`

**MCP / milestone comments (optional):** Paste one-line pointers to M2–M4 comments on the issue if your board does not use a Milestone field.

---

## Merge confirmation

Provide **one** of the following per instructor rubric:

- [ ] **Merged PR link:** `https://github.com/she21020-dotcom/canvas-lms/pull/TODO` — merge commit SHA: `TODO`
- [ ] **Screenshot:** attach or paste in submission portal (not in repo if it contains tokens); filename note: `feature-1-merge-YYYY-MM-DD.png`

**Local state note (for your records):** As of last doc update, Study Focus implementation files under `ui/shared/student-anti-distraction-focus/` were **not yet on a merged PR** on `origin/master`; complete this section after you push, open PR, and merge.

---

## Outcome vs feature and project plans

The shipped work implements the **Feature 1** brief ([`feature-1.md`](feature-1.md)): a learner-visible control on assignment and quiz pages that reduces clutter so the student can focus on the current item. The **in-repo project plan** ([`implementation-research.md`](implementation-research.md) §1.6 milestones M1–M4) called for spec freeze, flag plus button wiring, distraction suppression, and tests; **progress** ([`implementation-progress.md`](implementation-progress.md)) records M1–M4 as done via UI-only v1 **Study Focus** (name chosen to avoid collision with AI `FocusMode`), feature flag `student_anti_distraction_focus`, React control and body-class suppression on assignment/quiz surfaces, and unit tests under `ui/shared/student-anti-distraction-focus/__tests__`. That maps to functional requirements FR-1–FR-5 (button on supported pages, toggle, hide distracting chrome while keeping the activity usable, flag-gated rollout) and defers out-of-scope items (Pomodoro, analytics, global nav redesign). **GitHub Project** tracking (Lab 4) should mirror the same arc: item moves from *In progress* while implementing M2–M4, to *In review* when the PR is open, to *Done* when merge is confirmed—closing the loop between the brief, research acceptance criteria (§5.4), and the board your instructor can audit.

---

## Verification pointer

- **Manual / Docker:** See [`implementation-progress.md`](implementation-progress.md) — add or update the **Verified** line after you run the enable steps in a real environment.
- **Tests (local):** `yarn test ui/shared/student-anti-distraction-focus/__tests__` (from web container per `AGENTS.md`).
