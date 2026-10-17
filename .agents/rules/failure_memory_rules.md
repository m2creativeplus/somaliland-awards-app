---
trigger: always_on
---

# FAILURE MEMORY & CONTINUOUS SELF-IMPROVEMENT RULES

1. **Self-Healing Automation**:
   When any subagent or tool encounters a driver, missing dependency, or configuration failure:
   - Identify the exact binary/package required.
   - Run auto-installation or repair commands immediately.
   - Re-test the tool execution to confirm fix.

2. **Persistent Rule Updating**:
   Whenever a systemic error is solved, record the resolution rule in `AGENTS.md` and `.agents/rules/` so future worker runs benefit from institutional memory.

3. **M2 Universal Governor Adherence**:
   All operations must follow `STATE`, `OUTPUT`, `EXECUTION`, `PROOF`, `RISKS / GAPS`, `NEXT ACTION` response protocol with explicit evidence tags (`[VERIFIED]`, `[OBSERVED]`, `[PROPOSED]`, `[BLOCKED]`).

4. **Never Run Unbounded Recursive Searches Across Outer Drives or Build Artifacts**:
   - NEVER execute broad `grep -r` or `find` on parent directories (e.g. `/Volumes/MAC DATA/...`), build folders (`.next/`, `node_modules/`, `dist/`), or arbitrary volumes.
   - Constrain all searches strictly to local workspace configuration files (`package.json`, `.env*`, `.git/config`, `lib/`).
   - If an asset or repository is not in the active workspace, check primary CLI interfaces (`gh repo list`) directly or ask the user immediately without scanning the filesystem.

5. **Token Productivity & Lean Execution**:
   - Optimize for verified value and minimal token consumption. Do not launch multi-task background exploratory scripts when a direct, single-step inspection answers the query.
   - Always invoke CLI commands non-interactively to prevent hanging background tasks (e.g. avoid CLI tools prompting for interactive updates or confirmations).

