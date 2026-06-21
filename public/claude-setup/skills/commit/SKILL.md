# /commit — Checkpoint, Commit & Continue

Review the staged changes, write a clear commit message (what + why), commit locally, then KEEP WORKING. This is a mid-session checkpoint, not a stopping point.

## Triggers
- `/commit`
- `commit this`
- `commit and continue`
- `save and continue`
- `mark this done`

## Workflow

### Step 1: Review What's Changed
```bash
git status --short
git diff --stat
```
If the working tree is clean (nothing to commit), tell the user and continue working — don't create an empty commit.

### Step 2: Inspect the Diff Before Staging
Look at the actual changes so the commit message is accurate:
```bash
git diff           # unstaged changes
git diff --cached  # already-staged changes
```

**Never commit secrets.** Before staging, scan for `.env`, `.env.local`, credential files, API keys/tokens, or large binaries. If `git status` shows any of these, do NOT stage them — add them to `.gitignore` instead and tell the user.

### Step 3: Stage & Commit
Stage the relevant changes (review what you're adding):
```bash
git add -A
```
Write a concise message using Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`). The subject says *what*; the body says *why* (one or two lines, not *how*):
```bash
git commit -m "feat: <what changed>

<why it changed — the reason or problem it solves>"
```
Do NOT push. This is a local checkpoint — pushing is `/push`'s job.

### Step 4: Update Task Tracking (if present)
If `TASKS.md` exists and the work matches a task, mark it done:
```markdown
- [x] Task description (done YYYY-MM-DD)
```
If `TASKS.md` doesn't exist, skip this — don't create one just for a commit.

### Step 5: Report & Keep Going
Print a short checkpoint, then immediately resume work:
```
Committed: <short hash> — <message subject>
Next: <next task or remaining work>
---
Continuing...
```

## Rules
- This is a checkpoint — never stop after committing; return to the work.
- Keep the report to 2-3 lines. It's a speed bump, not a wall.
- NEVER stage or commit secrets, `.env*` files, or credentials.
- Commit locally only — `/push` handles the remote.
- One logical change per commit when practical; don't bundle unrelated edits.
