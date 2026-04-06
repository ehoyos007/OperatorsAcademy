# /ship — Commit & Push via Proper Git Workflow

Commits current work and pushes to remote using proper branch-based workflow. Creates PRs to main — never pushes directly.

## Triggers
- `/ship`
- `push it`
- `ship it`
- `commit and push`
- `commit this`
- `push the changes`

## Workflow

### Step 1: Assess State
```bash
BRANCH=$(git branch --show-current)
REPO=$(basename $(git rev-parse --show-toplevel))
CHANGES=$(git status --porcelain | wc -l | tr -d ' ')
DIFF_STAT=$(git diff --stat HEAD 2>/dev/null || git diff --stat --cached 2>/dev/null || echo "no changes")
```

If there are NO changes (nothing to commit, working tree clean), tell the user and exit.

### Step 2: Ensure Feature Branch
**NEVER push directly to main or master.** If on main/master:

1. Generate a branch name from the work done:
   - Read TASKS.md for current task name, OR
   - Use the most descriptive recent commit message, OR
   - Derive from the files changed
2. Format: `feat/<short-description>` or `fix/<short-description>` (kebab-case, max 50 chars)
3. Create and switch:
```bash
git checkout -b feat/<branch-name>
```
4. Tell the user: "Created branch `feat/<branch-name>` — main is protected."

If already on a feature branch, continue.

### Step 3: Stage & Commit
1. Stage all relevant changes (review what's being staged — skip .env, credentials, large binaries):
```bash
git add -A
```
2. Generate a concise commit message using Conventional Commits:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `refactor:` for refactors
   - `chore:` for config/tooling
   - `docs:` for documentation
   - Include Co-Authored-By trailer
3. Commit:
```bash
git commit -m "$(cat <<'EOF'
<type>: <description>

<optional body — what and why, not how>

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Step 4: Push & Create PR
1. Push the branch:
```bash
git push -u origin HEAD
```

2. Create a PR to main using GitHub CLI:
```bash
gh pr create --title "<commit type>: <description>" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points of what changed>

## Test plan
- [ ] <verification steps>

Generated with Claude Code
EOF
)"
```

If `gh` is not available or PR creation fails, just report the push and tell the user to create the PR manually.

### Step 5: Report
```
Shipped: <branch-name>
Commit: <short hash> — <message>
PR: <PR URL if created>
To deploy to production: merge the PR on GitHub
```

## Rules
- NEVER push to main or master directly — always branch + PR
- ALWAYS use Conventional Commits format
- If git push fails (no remote, auth error), tell the user the specific fix
- This skill does NOT do brain captures or file updates — use "wrap up" first if you need those
- If the user says "ship" and there are no changes, suggest "wrap up" instead
