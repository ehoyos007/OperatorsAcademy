# /push — Commit & Push the Current Branch

Commit any pending work and push the CURRENT branch to its remote. Pushes whatever branch you're on — it does not create a PR (use `/pr` for that).

## Triggers
- `/push`
- `push it`
- `ship it`
- `ship`
- `push to main`
- `commit and push`

## Workflow

### Step 1: Assess Git State
```bash
git branch --show-current
git status --short
git log --oneline -3
```
If there is nothing to commit AND the local branch is already up to date with its remote, tell the user there's nothing to push and exit.

### Step 2: Run Tests First (recommended)
Before pushing, suggest running `/test` so you don't push broken code. If the user has already tested this session, or explicitly says skip, continue.

### Step 3: Commit Pending Work
If there are uncommitted changes, commit them first. **Never stage secrets** — scan for `.env*`, credential files, API keys/tokens, or large binaries and exclude them.
```bash
git add -A
git commit -m "<type>: <what changed>

<why it changed>"
```
Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`).

### Step 4: Push the Current Branch
```bash
git push -u origin HEAD
```
`HEAD` pushes the branch you're currently on, whatever it's named, and `-u` sets up tracking on first push. If the push is rejected because the remote moved ahead, pull/rebase first:
```bash
git pull --rebase
git push
```

### Step 5: Report
```
Pushed: <branch> -> origin/<branch>
Commit: <short hash> — <message subject>
```
If the project auto-deploys from this branch (e.g. a host like Vercel or Netlify connected to the repo), note that a deploy will be triggered. Check for a `vercel.json`, `netlify.toml`, or similar config to confirm before claiming a deploy will happen.

## Rules
- Push the CURRENT branch — don't switch branches.
- NEVER commit or push secrets, `.env*` files, or credentials.
- Use Conventional Commits format for any commit this skill makes.
- If `git push` fails (no remote, auth error, rejected), report the exact error and the fix.
- This skill does not open a pull request — that's `/pr`.
