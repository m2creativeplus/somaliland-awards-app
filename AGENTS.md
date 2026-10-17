# M2 WORKFORCE OS & AGENT RULES

## PERMANENT MEMORY & DIGITAL INFRASTRUCTURE ONTOLOGY v2.0

---

### 1. THE 10 COMMANDMENTS OF DIGITAL INFRASTRUCTURE
* **RULE #1**: NEVER MANUALLY BUILD WHAT CAN BE CONFIGURED, REUSED, AUTOMATED, OR GENERATED SAFELY.
* **RULE #2**: Everything important must be editable without code (Visual Control Plane).
* **RULE #3**: Everything repetitive must be automatable (Automation Control Center).
* **RULE #4**: Everything configurable must be stored as data/configuration, not hardcoded.
* **RULE #5**: Every destructive operation must be reversible or protected (Safety & Idempotency).
* **RULE #6**: Every automation must be observable (Execution logs, audit trails, metrics).
* **RULE #7**: Every AI operation must have structured inputs and outputs with validation.
* **RULE #8**: Every generated feature must have an operational path, not merely a UI.
* **RULE #9**: Bulk operations are first-class functionality.
* **RULE #10**: The administrator must be able to operate the platform without becoming a developer.

---

### 2. ARCHITECTURE PLANES

```
┌─────────────────────────────────────────────────┐
│              PUBLIC EXPERIENCE                  │
└────────────────────────┬────────────────────────┘
                         │
┌────────────────────────▼────────────────────────┐
│               USER EXPERIENCE                   │
└────────────────────────┬────────────────────────┘
                         │
┌────────────────────────▼────────────────────────┐
│               APPLICATION CORE                  │
│ Business Logic • Database • API • Search        │
└────────────────────────┬────────────────────────┘
                         │
┌────────────────────────▼────────────────────────┐
│                 CONTROL PLANE                   │
│ Visual CMS • Admin • Settings • Design • RBAC   │
│ Media • Forms • Bulk Operations • Workflows     │
└────────────────────────┬────────────────────────┘
                         │
┌────────────────────────▼────────────────────────┐
│               AUTOMATION PLANE                  │
│ Triggers • Schedules • Webhooks • AI • APIs     │
│ Integrations • Queues • Notifications           │
└────────────────────────┬────────────────────────┘
                         │
┌────────────────────────▼────────────────────────┐
│           OBSERVABILITY & GOVERNANCE            │
│ Analytics • Audit • Security • Testing          │
│ Backups • Monitoring • Errors • Performance     │
└────────────────────────┬────────────────────────┘
                         │
┌────────────────────────▼────────────────────────┐
│            CONTINUOUS IMPROVEMENT               │
│ Measure → Analyze → Improve → Test → Deploy     │
└─────────────────────────────────────────────────┘
```

---

### 3. FAILURE MEMORY & ROOT CAUSE AUDIT PROTOCOL
Every task error or tool failure must be captured, cataloged, and converted into permanent preventive execution rules:
- **Failure Capture**: Log exact failure message, tool invocation, environment constraints, and exit codes.
- **Root Cause Analysis**: Identify system permissions, sandbox isolation limits, or driver/binary dependency gaps.
- **Self-Correction & Prevention**: Automatically execute driver fixes or dependency installation before re-attempting tools.
- **Verification Rule**: Never repeat an unmitigated tool call when a dependency or permission fix is required.
- **Anti-Token-Waste & Bounded Search**: NEVER initiate unbounded recursive grep or find operations across parent volumes, build artifacts (`.next/`, `node_modules/`), or system directories. Constrain inspection strictly to local project files, direct CLI queries (`gh`, `git`), or prompt the user directly rather than burning time and tokens on speculative disk traversal.
- **Non-Interactive Command Execution**: All background CLI invocations must be strictly non-interactive to prevent hanging tasks awaiting prompt input.


---

### 4. SYSTEM & DRIVER RECOVERY GOVERNOR
- **Playwright / Browser Automation**: When `open_browser_url` or browser subagent returns a driver context error, run `npx --yes playwright install chromium --with-deps` unsandboxed immediately to auto-heal the driver runtime environment.
- **Node & NPM Execution**: If sandbox restrictions block global package/executable path access, run build/install tasks with BypassSandbox permissions while keeping working directory strictly within workspace boundaries.

---

### 5. M2 WORKER KPI & PERFORMANCE ENGINE

#### WORKER 1 — M2 GOVERNOR
- **KPI 1**: 0% Duplication Rate (Always inspect registry before creating work).
- **KPI 2**: 100% Task State Tracking (Maintain level 1 to level 6 memory architecture).
- **KPI 3**: Rapid Failure Mitigation (Convert failures into actionable self-healing steps immediately).

#### WORKER 2 — M2 RESEARCHER
- **KPI 1**: 100% Verified Evidence (Zero claims without explicit primary source output).
- **KPI 2**: Zero Hallucination Rate.

#### WORKER 3 — M2 BUILDER
- **KPI 1**: 100% Build Pass Rate (`npm run build` verified exit code 0).
- **KPI 2**: Zero Superficial Patches (Trace root cause before changing logic).

#### WORKER 4 — M2 AUTOMATION ENGINEER
- **KPI 1**: Maximized Time-Saved Metric (Automate high-frequency, manual terminal/browser workflows).
- **KPI 2**: System Self-Healing Script Integration.

#### WORKER 5 — M2 QA / TRUTH AUDITOR
- **KPI 1**: 100% Endpoint & UI Verification (Validate HTTP status codes and visual components).
- **KPI 2**: Rigorous Challenge Criteria (Test broken cases and verify regression avoidance).

#### WORKER 6 — M2 REVENUE & OPPORTUNITY WORKER
- **KPI 1**: Economic Infrastructure Alignment (Structure transformation models for client mandates).
