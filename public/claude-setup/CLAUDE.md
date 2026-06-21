# Global Claude Code Instructions

> This file configures Claude Code behavior across all projects.
> Installed from: https://operators-academy.vercel.app/install

---

## Project Documentation System

Maintain these documentation files to ensure continuity between sessions:

| File | Purpose | Analogy |
|------|---------|---------|
| **CONTEXT.md** | Domain knowledge & background | Internal wiki page |
| **TASKS.md** | Active task tracking | Trello board in markdown |
| **PLAN.md** | Strategic planning (per feature) | Architectural blueprint |
| **PROGRESS.md** | Session-by-session log | Pilot's flight log |
| **TEST_LOG.md** | QA activities & bug tracking | Lab notebook |
| **BRAIN.md** | Cross-session knowledge capture log | Memory journal |
| **VISION.md** | Project intent & decision framework | North star document |
| **CLAUDE.md** | Per-project Claude Code instructions | Project playbook |

### File Creation Priority

1. **CONTEXT.md** — Establish domain knowledge first
2. **TASKS.md** — Active task tracking
3. **TEST_LOG.md** — Initialize QA tracking
4. **PLAN.md** — Think through complex work (as needed)
5. **PROGRESS.md** — Start logging sessions and completed work
6. **BRAIN.md** — Capture decisions and insights across sessions
7. **VISION.md** — Define what success looks like (after a few sessions)
8. **CLAUDE.md** — Project-specific instructions (when patterns emerge)

---

## Trigger Phrases

### Shipping & Git Triggers (HIGHEST PRIORITY)
| Phrase | Action |
|--------|--------|
| "wrap up" / "end session" / "done for today" / "save progress" | Run **/wrap-up** skill (update project files + write handoff prompt). NO git. |
| "ship" / "push it" / "ship it" / "push to main" / "commit and push" | Run **/push** skill (commit + push the current branch; deploys if the project auto-deploys). |
| "commit" / "commit this" / "save and continue" / "mark this done" | Run **/commit** skill (checkpoint commit, then keep working). |
| "create a pr" / "open a pull request" | Run **/pr** skill (feature branch + pull request for review). |
| "smoke test" / "visual check" / "visual verify" | Run **/smoke** skill (open deployed URL, test routes/flows) |

### Git Workflow Rule
**ALWAYS use feature branches. NEVER push directly to main/master.**
- If on main when shipping, auto-create a branch first (feat/ or fix/ prefix)
- For solo work, /push commits and pushes the current branch directly
- For team/review work, use /pr to open a pull request first
- This keeps main clean and preview deployments working

### Documentation Triggers
| Phrase | Action |
|--------|--------|
| "update tasks" / "what's next" | Update TASKS.md |
| "let's plan" / "think through" | Create/update PLAN.md |
| "update context" / "add to glossary" | Update CONTEXT.md |
| "initialize project" / "set up docs" / "init docs" | Run /auto-init skill |
| "let's continue" / "pick up where we left off" / "/pickup" | Run /pickup skill (reads handoff + project docs, presents briefing) |

### QA Triggers
| Phrase | Action |
|--------|--------|
| "run tests" / "run QA" / "quality check" / "test this" | Run **/test** skill (lint + types + unit + E2E + build) |
| "smoke test this" / "/smoke" / "/smoke <url>" | Run **/smoke** skill (post-deploy visual verification) |
| "verify this works" / "make sure it builds" | Run **/test** skill |

### Debug Triggers
| Phrase | Action |
|--------|--------|
| "debug this" / "why is this failing" | Investigate bug |
| "add logging" / "make observable" | Add strategic logging |

---

## Plan Mode — Default Behavior

Before implementing anything non-trivial, declare context and present a plan. Don't just start building.

### Context Declaration
State briefly:
- What docs you read (CONTEXT.md, TASKS.md, etc.)
- What judgment calls you're making and why

Format:
```
Context loaded:
- TASKS.md: current task is [X]
- CONTEXT.md: key constraint — [constraint]
- Judgment call: [what you're deciding and why]
```

### Plan Before Implement
For any feature, refactor, or architectural change:
1. State what you're building and why
2. Cite the source (TASKS.md item, PLAN.md section, user instruction)
3. Note any tradeoffs or alternatives considered
4. Wait for confirmation if the scope is ambiguous

Exception: small, unambiguous tasks (fix this bug, update this copy, add this field) can proceed directly.

---

## Session Management

### Starting a Session
```
Read CLAUDE.md, TASKS.md, PROGRESS.md, and CONTEXT.md.
If a SessionStart hook reports missing docs, run /auto-init before proceeding.
Tell me current progress and recommended next action.
Then help me continue.
```

### Ending a Session
```
Before we pause:
1. Run /wrap-up (updates PROGRESS.md, TASKS.md, writes handoff file)
2. Then /push to commit and push (or /pr for review)
3. Next session: /pickup to continue
```

### Context Commands
- `/compact` — Summarize and continue
- `/clear` — Full reset (wrap up first!)

---

## BRAIN.md — Cross-Session Knowledge

If a `BRAIN.md` exists in the current project root, read it at session start. It tracks decisions and insights that accumulate across sessions.

After updating PROGRESS.md at session end, also append a brief entry to `BRAIN.md` under `## Session Log` if meaningful decisions were made:
- Format: `- [decision] — [rationale]` or `- [insight]`

If `BRAIN.md` doesn't exist in the project, create it when the user runs /auto-init.

---

## VISION.md — Semantic Intent Document

If a `VISION.md` exists in the current project root, read it at session start. It defines the *why* behind the project — success criteria, tradeoff rules, hard constraints.

**VISION.md sits alongside CLAUDE.md in priority:**
- `CLAUDE.md` = operational rules (how to work)
- `VISION.md` = semantic intent (why we're building, what success looks like)
- Both override general instincts when they conflict

---

## QA — Automatic After Every Feature

After completing any feature implementation, run /test automatically. Don't wait to be asked.

1. Run the project's test suite (check `package.json` scripts: `test`, `test:e2e`, `playwright test`)
2. If no tests exist for the new feature, write them
3. Log results to `TEST_LOG.md` under a new session entry

### TEST_LOG.md format:
```markdown
## Session [N] — YYYY-MM-DD

### Feature Under Test: [feature name]
### Result: PASS / FAIL / PARTIAL

| Test | Result | Notes |
|------|--------|-------|
| [test name] | PASS/FAIL | [note] |

### Blockers / Follow-ups:
- [ ] item
```

Create `TEST_LOG.md` if it doesn't exist. Every project that ships code should have one.

---

## Per-Project CLAUDE.md

Each project should have its own CLAUDE.md with:
- Repository & deployment info (git remote, hosting, production URL)
- Tech stack summary
- Key commands (dev, build, test, deploy)
- Project-specific conventions

The global CLAUDE.md (this file) provides the workflow system. Per-project CLAUDE.md provides project-specific context. Both are read at session start.
