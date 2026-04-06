# /deploy — PR + Production Deployment

Creates a PR from the current feature branch, merges to main, and triggers production deployment.

## Triggers
- `/deploy`
- `deploy to vercel`
- `deploy`
- `merge and deploy`
- `push to production`
- `go live`

## Prerequisites
- Must be on a feature branch (NOT main/master). If on main, tell the user: "You're on main. Use `/ship` first to create a feature branch, then `/deploy` to merge it."
- Branch must be pushed to origin (if not, push it first)
- Working tree should be clean (if dirty, suggest `/ship` first)

## Workflow

### Step 1: Verify State
```bash
BRANCH=$(git branch --show-current)
REPO_FULL=$(git remote get-url origin | sed 's|.*github.com[:/]||' | sed 's|\.git$||')
OWNER=$(echo "$REPO_FULL" | cut -d/ -f1)
REPO=$(echo "$REPO_FULL" | cut -d/ -f2)
```

If on main/master — error, suggest `/ship` first.
If working tree dirty — warn, offer to commit first.

### Step 2: Ensure Remote is Up-to-Date
```bash
git push -u origin HEAD
```

### Step 3: Create Pull Request
Use `gh pr create` (GitHub CLI):
```bash
gh pr create --title "<conventional commit title>" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points of what changed>

## Test Plan
- [ ] Verified on preview deployment
- [ ] No console errors
- [ ] Core functionality intact

Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

If `gh` is not available, tell the user to create the PR manually on GitHub.

### Step 4: Merge the PR
After PR is created:
```bash
gh pr merge --squash --delete-branch
```

Squash merge keeps main history clean — one commit per feature.

### Step 5: Report Deployment
After merge:
1. Note that the hosting platform will auto-deploy main to production
2. If the project has a known production URL, report it
3. Tell the user: "Merged to main. Deploying to production."

### Step 6: Cleanup
The `--delete-branch` flag handles remote cleanup. For local:
```bash
git checkout main
git pull origin main
```

### Output Format
```
---
Deployed: feat/<branch> -> main (squash merged)
PR: <PR-URL>
Production: <production-url>
Commit: <merge-commit-hash>
---
```

## Rules
- ALWAYS squash merge to keep main clean
- ALWAYS delete the feature branch after merge
- If PR creation fails (e.g., no changes vs main), tell the user why
- If merge conflicts exist, tell the user and offer to help resolve them
- NEVER force-push to main
