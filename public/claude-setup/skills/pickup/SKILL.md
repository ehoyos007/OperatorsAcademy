# /pickup — Pick Up Where You Left Off

Load all relevant context for the current project and present a briefing that lets the user pick up exactly where the last session left off.

## Triggers
- `/pickup`
- `let's continue`
- `pick up where I left off`
- `where were we`
- `what's next`
- `what was I working on`

## Instructions

### Step 0: Determine Project Identity

```bash
PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
PROJECT_NAME=$(basename "$PROJECT_ROOT")
```

If we're in a root/home directory (not a project), tell the user and ask which project to resume.

---

### Step 1: Read Handoff File FIRST

Check for `.claude/handoff.md` in the project root. If it exists, this is the primary context source — it was written by the last "wrap up" and contains the kickstart prompt.

If the handoff file exists, read it in full. The `## Kickstart Prompt` section contains the ready-to-use continuation prompt.

### Step 1b: Read Project Docs (parallel, budget-conscious)

Read ALL of these in parallel. Each has a token budget:

| File | How to Read | Budget | Purpose |
|------|-------------|--------|---------|
| `PROGRESS.md` | Last 60 lines (newest entries) | ~2k tokens | Where we left off |
| `TASKS.md` | Full file | ~3k tokens | What's active, what's done |
| `BRAIN.md` | Full file (if exists) | ~1k tokens | Session log |
| `VISION.md` | First 40 lines | ~1k tokens | Core intent + constraints |
| `CONTEXT.md` | First 50 lines | ~1.5k tokens | Domain knowledge |
| `CLAUDE.md` (project) | Check if exists, first 40 lines | ~1k tokens | Project-specific rules |

**Skip gracefully** if any file doesn't exist.

**DO NOT read** during resume: Full source code files, large architecture docs, test files, migration files. These get loaded on-demand when you start working.

---

### Step 2: Check Git State (parallel with Step 1)

```bash
cd "$PROJECT_ROOT" && git status --short 2>/dev/null | head -20
cd "$PROJECT_ROOT" && git log --oneline -5 2>/dev/null
```

This tells you:
- Are there uncommitted changes (mid-feature work)?
- What was the last commit (and when)?
- Is there a WIP commit from a previous wrap-up?

---

### Step 3: Present the Briefing

Format as a concise, scannable brief. Every line should help the user start working immediately.

```markdown
## Resume: {PROJECT_NAME}

### Where We Left Off
{Extract from PROGRESS.md — last session's "Where We Left Off" section}

### Active Tasks
{From TASKS.md — list only in-progress or next-up tasks, not the full backlog}

### Git State
{Uncommitted changes: list modified files if any}
{Last commit: hash + message + relative time}
{Branch: current branch name}

### Kickstart Prompt
{If .claude/handoff.md exists, show the kickstart prompt verbatim in a blockquote}
{If no handoff file, generate one from PROGRESS.md + TASKS.md context}

> <the kickstart prompt — specific, actionable, file paths included>

### Recommended Next Action
{ONE specific, actionable recommendation based on everything above}
```

### Briefing Rules

- **Be specific, not vague.** File paths, line numbers, function names.
- **Don't ask the user to re-explain decisions** — they're in the docs.
- **Don't summarize what the project IS** — say what's IN PROGRESS.
- **If there's a WIP commit**, highlight it — that's the strongest signal of mid-work state.
- **Keep the whole briefing under 30 lines.** This is a 15-second scan.

---

## Context Budget

Total resume cost should be **under 10k tokens**. This leaves 90%+ of context for actual work.

---

## After the Briefing

- Wait for the user to confirm direction or ask questions
- Do NOT start working until the user says go
- If the user says "looks good" or "let's go" — proceed with the recommended action
- If the user redirects — follow their lead

---

## Error Handling

### No Project Docs Exist
```
No session history found for {PROJECT_NAME}. This looks like a fresh start.
Run /auto-init to set up project documentation, or tell me what you'd like to work on.
```

### Git Not Initialized
Skip git state. Note:
```
> Not a git repository — skipping git state
```
