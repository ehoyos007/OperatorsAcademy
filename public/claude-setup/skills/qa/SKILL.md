# /qa — Full QA Sweep

Runs a comprehensive quality check: lint, types, unit tests, E2E tests, and build verification. Logs results to TEST_LOG.md.

## Triggers
- `/qa`
- `run QA`
- `quality check`
- `run tests`
- `test this`
- `verify this works`

## Flow: /ship -> /qa -> /deploy

```
/ship  -> commits + pushes to branch (fast, no tests)
/qa   -> THIS SKILL — full sweep, logs results
/deploy -> checks TEST_LOG.md for passing QA, then PR + merge
```

## Workflow

### Step 1: Detect Available Test Infrastructure
```bash
REPO=$(basename $(git rev-parse --show-toplevel 2>/dev/null || pwd))
BRANCH=$(git branch --show-current)

if [ -f package.json ]; then
  node -e "
    const pkg = require('./package.json');
    const s = pkg.scripts || {};
    if (s.lint || s['lint:check']) console.log('LINT');
    if (s['type-check'] || s['typecheck']) console.log('TYPES');
    if (s.test || s['test:unit'] || s.vitest) console.log('UNIT');
    if (s['test:e2e'] || s['test:playwright'] || s.e2e) console.log('E2E');
    if (s.build) console.log('BUILD');
  " 2>/dev/null
fi

[ -f playwright.config.ts ] || [ -f playwright.config.js ] && echo "PLAYWRIGHT_CONFIG"
[ -f vitest.config.ts ] || [ -f vitest.config.js ] && echo "VITEST_CONFIG"
[ -f tsconfig.json ] && echo "TSCONFIG"
[ -f .eslintrc* ] || [ -f eslint.config.* ] && echo "ESLINT_CONFIG"
```

### Step 2: Run Each Check (fast first, slow last)

#### 2a. Lint (if available)
```bash
npm run lint 2>&1
```

#### 2b. Type Check (if TypeScript)
```bash
npx tsc --noEmit 2>&1
```

#### 2c. Unit Tests (if available)
```bash
npm run test 2>&1
```

#### 2d. E2E Tests (if Playwright available)
```bash
npx playwright test 2>&1
```

#### 2e. Build Verification
```bash
npm run build 2>&1
```

### Step 3: Log Results to TEST_LOG.md

```markdown
## QA — YYYY-MM-DD HH:MM

### Branch: `<branch-name>`
### Overall: PASS / FAIL / PARTIAL

| Check | Result | Details |
|-------|--------|---------|
| Lint | PASS/FAIL/SKIP | <error count or "clean"> |
| Types | PASS/FAIL/SKIP | <error count or "clean"> |
| Unit Tests | PASS/FAIL/SKIP | <X/Y passing> |
| E2E Tests | PASS/FAIL/SKIP | <X/Y passing> |
| Build | PASS/FAIL/SKIP | <clean or error summary> |
```

**Overall status:** PASS (all passed), FAIL (any failed), PARTIAL (some passed, some skipped, none failed)

### Step 4: Report Summary

```
---
QA: PASS (or FAIL or PARTIAL)
  Lint:    PASS (0 warnings)
  Types:   PASS (clean)
  Unit:    PASS (42/42)
  E2E:     PASS (18/18)
  Build:   PASS (clean)

Branch: feat/<name>
Logged: TEST_LOG.md
Next: /deploy (QA passed — safe to merge)
---
```

### Step 5: Write Missing Tests (if requested)

If `/qa --write` or "write tests for this":
1. Identify files changed on current branch vs main
2. Write unit/E2E tests for changed files
3. Run the full sweep again

## Rules
- NEVER skip the build check — if it doesn't build, it doesn't ship
- If no test infrastructure exists at all, say so and offer to set it up
- Log EVERY run to TEST_LOG.md — the log is the audit trail
- If E2E tests require a dev server, start it first
- After a PASS, the /deploy skill will allow merge
