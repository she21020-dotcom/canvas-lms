# Feature 1 implementation progress

## Milestone status

| Milestone | Status | Notes |
|-----------|--------|-------|
| M1 UX/spec freeze | Done | UI-only v1; label **Study Focus** (distinct from AI `FocusMode`) |
| M2 Flag + button wiring | Done | `student_anti_distraction_focus` flag; control on assignment/quiz pages |
| M3 Distraction suppression | Done | Body class hides nav, sidebars, grades, module footer |
| M4 Tests | Done | Unit tests in `ui/shared/student-anti-distraction-focus/__tests__` |

## Enable locally

1. Site admin or course: turn on feature **Study Focus Mode** (`student_anti_distraction_focus`).
2. Open an assignment (A2 student or legacy) or quiz show/take as a **student** (not teacher/admin view).
3. Click **Study Focus**; use **Exit Study Focus** to restore chrome.

## Verified

- Not yet run in Docker/browser in this session.
