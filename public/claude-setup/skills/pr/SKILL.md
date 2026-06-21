# /pr — Open a Pull Request for Review

Create a feature branch (if you're on the main branch), commit, push, and open a pull request so the change can be reviewed before it merges.

## Triggers
- `/pr`
- `create a pr`
- `open a pull request`
- `open a PR`

## Workflow

### Step 1: Check the Current Branch
```bash
git branch --show-current
git status --short
```
If there are no changes and the branch is already pushed, ask the user whether they still want a PR for existing commits.

### Step 2: Ensure a Feature Branch
If you're on `main` or `master`, create a dedicated branch so the PR has something to compare against:
```bash
git checkout -b feat/<short-description>
```
Use `feat/` for new features, `fix/` for bug fixes — kebab-case, derived from the work done (e.g. `feat/export-csv`, `fix/null-user-crash`). If you're already on a feature branch, stay on it.

### Step 3: Commit & Push
Commit any pending work (skip secrets and `.env*` files), then push:
```bash
git add -A
git commit -m "<type>: <what changed>

<why it changed>"
git push -u origin HEAD
```

### Step 4: Open the PR with the GitHub CLI
```bash
gh pr create --title "<type>: <description>" --body "$(cat <<'EOF'
## Summary
- <1-3 bullets: what changed and why>

## Test plan
- [ ] <how to verify — commands run, behavior checked>
EOF
)"
```
Report the PR URL that `gh` prints.

### Step 5: Fallback if `gh` Isn't Installed
If `gh` is not available (the command isn't found or you're not authenticated), the branch is already pushed — give the user the manual route:
1. Confirm the push succeeded.
2. Tell them to open the repo on GitHub; it will show a "Compare & pull request" banner for the just-pushed branch.
3. Or share the direct URL pattern: `https://github.com/<owner>/<repo>/compare/<base>...<branch>?expand=1`.
   - Find `<owner>/<repo>` from `git remote get-url origin`.

## Rules
- Don't open a PR from `main`/`master` against itself — always branch first.
- Keep the PR summary to what changed and why; keep the test plan concrete.
- NEVER commit secrets, `.env*` files, or credentials into the branch.
- Use `/push` instead when you just want to push the current branch without a review step.
