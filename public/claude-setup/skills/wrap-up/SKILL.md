# /wrap-up — Save Progress & Capture

Save session progress to project files and write a handoff prompt for the next session. NO git operations.

## Triggers
- `wrap up`
- `save progress`
- `done for now`
- `done for today`
- `end session`

## Workflow

Execute all steps in order.

### Step 1: Assess What Happened

Review the conversation to identify:
- What was worked on (features, fixes, refactors, decisions)
- Key decisions made and their rationale
- What's still remaining from the current plan/task
- Any blockers discovered

### Step 2: Update PROGRESS.md

If PROGRESS.md exists, append a session entry:
```markdown
## Session — YYYY-MM-DD HH:MM

### Work Done
- [bullet points of what was accomplished]

### Decisions
- [key decisions with rationale, if any]

### Where We Left Off
- [specific state — file paths, line numbers, what's partially done]
```

If PROGRESS.md doesn't exist, create it.

### Step 3: Update TASKS.md

If TASKS.md exists:
- Check off any tasks that were completed
- Update in-progress task status
- Add any new tasks that were discovered during the session

### Step 4: Update BRAIN.md

If BRAIN.md exists, append entries under `## Session Log` → `### YYYY-MM-DD`:
- Key decisions with rationale
- Insights or patterns noticed
- Blockers encountered and how they were resolved

### Step 5: Write Handoff File

Write `.claude/handoff.md` in the project root (create `.claude/` directory if it doesn't exist):

```markdown
# Session Handoff
Generated: YYYY-MM-DD HH:MM

## What We Were Working On
<1-2 sentences describing the active task/feature>

## Remaining Work
<pulled from TASKS.md — unchecked items under current phase/section>
<pulled from PLAN.md — unfinished steps, if PLAN.md exists>

## Key Decisions This Session
<1-2 liner summaries of decisions made, if any>

## Kickstart Prompt
> <A complete, ready-to-use prompt for the next session.
> Should be specific enough that a fresh Claude Code instance
> can continue without the user re-explaining anything.
> Include: what to work on, which files to look at, any
> context the next session needs to know.
> Write it as if the USER is typing it to Claude.>
```

The kickstart prompt is the most important part. Make it concrete and actionable — not "continue working on the feature" but "Implement the webhook handler in src/api/webhooks.ts — the route is scaffolded but the payload parsing and DB insert are still TODO. Run /qa when done."

### Step 6: Confirm

Print a concise summary:
```
Wrapped up: <project name>
- Progress: updated
- Tasks: updated
- Handoff: .claude/handoff.md written
- Next session: /pickup to continue
```

## Rules

- NEVER do any git operations (no commit, no push, no branch creation)
- ALWAYS write the handoff file — this is what makes /pickup work
- Keep the handoff kickstart prompt SPECIFIC — file paths, function names, line numbers
- If TASKS.md doesn't exist, skip task updates (don't create one just for this)
