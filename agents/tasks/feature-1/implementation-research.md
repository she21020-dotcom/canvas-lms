# Feature 1 Implementation Research: Focus Mode / Anti-Distraction Layer

## 0) Assumptions and Intent

- Feature intent: Focus Mode is a button visible on assignment/quiz/test pages that reduces distractions by hiding notifications, other tabs, and non-essential surrounding UI so the learner can focus on the current work item.
- Primary user persona for Lab 3: student/learner experience in Canvas LMS.
- This document is planning and architecture research only; no GitHub Projects MCP integration is built in this lab.

## 1) Design Considerations and Tradeoffs

### 1.1 User Flows

- Student opens an assignment, quiz, or test page and sees a Focus Mode button.
- Student enables Focus Mode:
  - current assignment/quiz/test remains visible and usable;
  - distracting surfaces are hidden or minimized;
  - clear indicator shows Focus Mode is active.
- Student disables Focus Mode and normal Canvas navigation returns.

### 1.2 Data and Boundary Crossings

- **Browser UI state**: focus mode enabled/disabled for current view.
- **Server state (optional for v1)**: user preference for default focus behavior (if persistence is added).
- **APIs**:
  - v1 can be UI-only;
  - optional preference endpoint if persistence is required.
- **Permissions and scopes**:
  - learner-facing by default;
  - instructor/admin flows unchanged unless explicitly enabled later.

### 1.3 Interaction with Existing Canvas Concepts

- **Courses and assignments**: focus is tied to the currently viewed assignment/quiz/test context.
- **Users and roles**:
  - student workflows are primary;
  - no changes to role authorization for course actions.
- **Feature flags**:
  - feature should be behind a flag for safe rollout.
- **Preferences**:
  - if persistent defaults are added, use Canvas user preference patterns.

### 1.4 UX and Product Risks

- Aggressive hiding can make users think content is broken; include a strong active-mode banner and obvious exit control.
- Different pages (assignment vs quiz/test) may have different layout constraints; a shared UI contract is needed.
- Existing Canvas has an unrelated `FocusMode` component in AI experiences, so naming must avoid confusion.

### 1.5 Tradeoff Decisions (Current Recommendation)

1. Start with **UI-only distraction suppression** for v1.
   - Pros: low risk, fast to validate, easy rollback.
   - Cons: some non-essential data may still load in background.
2. Add **feature-flag gating** from day one.
   - Pros: safe staged rollout.
   - Cons: slightly more setup work.
3. Make persistence **optional follow-up**, not required for first delivery.
   - Pros: keeps scope tight to user-requested behavior.
   - Cons: user must re-enable each new page load if preference is not stored.

### 1.6 Planning Signals for Lab 4 MCP Sync (What to Track)

- **Milestones**
  - M1: UX/spec freeze for assignment/quiz/test focus behavior.
  - M2: Focus button and view-state wiring implemented.
  - M3: Distraction suppression behavior verified across target pages.
  - M4: Tests + acceptance checks complete.
- **Tasks**
  - Define focus state contract.
  - Add feature flag.
  - Add Focus Mode button to assignment/quiz/test pages.
  - Implement hide/minimize rules for notifications and competing tabs.
  - Add tests and manual validation checklist.
- **Dependencies**
  - Feature flag before production exposure.
  - Page-level extension points confirmed before UI wiring.
- **Definition of done**
  - Functional and non-functional requirements pass.
  - Acceptance criteria pass for student role.
  - Feature can be disabled fully via flag.

## 2) Functional Requirements (Testable)

### 2.1 In Scope

- Focus Mode button is visible on assignment/quiz/test pages.
- Learner can enable/disable Focus Mode.
- Focus Mode hides/minimizes distractions (notifications and unrelated tabs/surfaces).
- Current assignment/quiz/test remains fully usable while Focus Mode is on.
- Feature is controlled by a feature flag.

### 2.2 Out of Scope (Lab 3)

- Pomodoro timer.
- Deep work session tracking/analytics.
- GitHub Projects MCP automation implementation (Lab 4 scope).
- Instructor/admin analytics dashboards.
- Major redesign of global Canvas navigation.

### 2.3 System-Shall Statements

FR-1. The system shall display a Focus Mode button on supported assignment/quiz/test pages for authenticated learners.  
FR-2. The system shall allow learners to enable and disable Focus Mode from that button.  
FR-3. When Focus Mode is enabled, the system shall hide or minimize distracting UI elements, including notifications and non-essential navigation tabs/surfaces in the supported view.  
FR-4. The system shall preserve core assignment/quiz/test interactions while Focus Mode is enabled.  
FR-5. The system shall protect Focus Mode behavior behind feature flag controls for staged rollout and rollback.  
FR-6. The system shall leave non-learner workflows unchanged unless explicitly configured.

## 3) Non-Functional Requirements

NFR-1 (Performance): Enabling/disabling Focus Mode should update UI quickly without noticeable page lag.  
NFR-2 (Security/Privacy): Focus Mode should not broaden access to any student or course data beyond existing authorization boundaries.  
NFR-3 (FERPA-adjacent): Any optional preference persistence should only store minimal user configuration data, not sensitive educational content.  
NFR-4 (Accessibility): Focus Mode button and state indicator must be keyboard-accessible and screen-reader understandable.  
NFR-5 (Observability): Add lightweight logs/telemetry for mode toggle success/failure and feature-flag state.  
NFR-6 (Reliability): If focus UI logic fails, page should gracefully fall back to normal view without breaking assignment/quiz/test completion.  
NFR-7 (Compatibility): Implementation should align with Canvas patterns for feature flags, role checks, and React/Rails page composition.

## 4) Codebase Analysis (Using Lab 2 Repository Analyzer Approach)

### 4.1 Hypotheses for Change Landing Areas

- **Backend/Rails**
  - Feature flag and optional preference wiring.
  - Assignment/quiz/test controller context passed to frontend (`js_env`).
- **Frontend/React**
  - Assignment/quiz/test page bundles to render button and apply distraction suppression.
  - Shared notification/nav components potentially needing focus-aware behavior.
- **Permissions**
  - Role-aware exposure checks so student-facing behavior is default.

### 4.2 Concrete Findings from Agent-Assisted Exploration

- `app/controllers/assignments_controller.rb`: assignment rendering and feature-gated `js_env` behavior.
- `app/controllers/application_controller.rb`: central `js_env` values passed to frontend.
- `app/controllers/users_controller.rb`: existing user preference-influenced page behavior patterns.
- `app/models/user.rb`: user preference getters/setters used for personalization.
- `app/models/user_preference_value.rb`: canonical preference extension points.
- `config/feature_flags/00_standard.yml`: primary feature-flag declaration mechanism.
- `config/initializers/permissions_registry.rb`: canonical rights and authorization model.
- `config/routes.rb`: endpoint organization if preference API endpoints are needed.
- `ui/shared/global/env/EnvCommon.d.ts`: frontend typings for feature flags/settings in `ENV`.
- `ui/features/widget_dashboard/react/components/WidgetGrid.tsx`: representative navigation-heavy UI patterns for suppression behavior.
- `ui/shared/notifications/redux/actions.js`: notification state flow likely impacted by focus mode visibility rules.
- `spec/controllers/assignments_controller_spec.rb`: controller behavior test patterns.
- `spec/apis/v1/courses_api_spec.rb`: API auth/behavior integration patterns.
- `ui/shared/ai-experiences/react/components/FocusMode.tsx`: existing symbol name collision risk; avoid ambiguous naming.

### 4.3 Patterns to Follow

- Use feature flags configured in `config/feature_flags` and consumed through backend checks + frontend `ENV.FEATURES`.
- Keep authorization decisions server-grounded; client only reflects allowed behavior.
- Follow assignment controller and UI composition patterns for adding page-level controls.
- Reuse user preference APIs only if persistence is included in scope.

### 4.4 Open Questions (Need Spike or Stakeholder Input)

OQ-1. Should Focus Mode state reset on page reload (session-only) or persist as user preference?  
OQ-2. Exactly which "other tabs" should be hidden for assignment vs quiz/test contexts?  
OQ-3. Should distraction suppression be strictly visual, or should related data requests also be reduced?  
OQ-4. What final user-facing label avoids conflict with existing AI `FocusMode` naming?  
OQ-5. Should institutions/accounts be able to enable/disable this mode by policy?

## 5) Testing and Verification Plan

### 5.1 Unit-Level Expectations

- Focus state reducer/hook: enable/disable transitions.
- Visibility rule logic: which UI regions are shown/hidden while focused.
- Feature flag + role gating helper logic.
- Optional preference serialization logic (if persistence is added).

### 5.2 Integration Points

- Assignment/quiz/test pages render Focus Mode button when feature flag and role conditions pass.
- Toggle action updates page composition without breaking core student actions.
- Optional persistence path (if added) reads/writes preference correctly.

### 5.3 Manual / Exploratory Checks

- Student on assignment page:
  - button is visible;
  - enabling Focus Mode hides notifications and unrelated tabs/surfaces;
  - assignment actions still work.
- Student on quiz/test page:
  - same behavior as assignment page.
- Disable Focus Mode:
  - original UI returns.
- Feature flag off:
  - Focus Mode button and behavior are absent.
- Non-learner roles:
  - behavior is unchanged unless explicitly enabled.

### 5.4 Acceptance Criteria Mapped to Functional Requirements

- AC-1 (FR-1): Focus Mode button appears on supported pages for learners.
- AC-2 (FR-2): Learner can toggle Focus Mode on and off successfully.
- AC-3 (FR-3): Notifications and defined distracting surfaces are hidden/minimized in Focus Mode.
- AC-4 (FR-4): Assignment/quiz/test core interactions remain functional in Focus Mode.
- AC-5 (FR-5): Feature flag fully controls exposure and rollback.
- AC-6 (FR-6): Instructor/admin default workflows are not changed.

### 5.5 If Automation Is Impractical

- Use a role-based manual checklist for visual suppression behavior where UI assertions are brittle.
- Validate in a staged environment with feature flag rollout before broad enablement.
- Use simple telemetry/log review for toggle failures and UI regressions after rollout.
