# /test — Full Quality Sweep

Run the project's automated checks — lint, type-check, unit tests, build, and E2E if configured — then log the results to TEST_LOG.md as PASS / FAIL / PARTIAL.

## Triggers
- `/test`
- `run tests`
- `run QA`
- `quality check`
- `test this`
- `verify this works`
- `make sure it builds`

## Workflow

### Step 1: Detect the Project's Checks
Figure out what this project can actually run. For a Node/JS project, read `package.json` scripts:
```bash
cat package.json
```
Look for scripts named like: `lint`, `typecheck` / `type-check` / `tsc`, `test` / `test:unit`, `test:e2e` / `e2e`, and `build`.

For other ecosystems, detect the toolchain instead:
- Python: `pytest`, `ruff`/`flake8`, `mypy`, often via `pyproject.toml` or `tox.ini`
- Rust: `cargo test`, `cargo clippy`, `cargo build`
- Go: `go test ./...`, `go vet ./...`, `go build ./...`
- Make-based: a `Makefile` with `test` / `lint` / `build` targets

Only run checks that actually exist. Skip (don't fail) the ones that don't.

### Step 2: Run Each Check — Fast First, Slow Last
Run in this order so quick feedback comes first. Capture output for any failures.

1. **Lint** — e.g. `npm run lint`, `ruff check .`, `cargo clippy`
2. **Type check** — e.g. `npm run typecheck` (or `npx tsc --noEmit`), `mypy .`
3. **Unit tests** — e.g. `npm test`, `pytest`, `cargo test`, `go test ./...`
4. **Build** — e.g. `npm run build`, `cargo build`, `go build ./...`
5. **E2E** (only if configured) — e.g. `npm run test:e2e`. If E2E needs a running dev server, start it first, then stop it after.

### Step 3: Log to TEST_LOG.md
Append (create the file if missing):
```markdown
## Test Run — YYYY-MM-DD HH:MM

### Overall: PASS / FAIL / PARTIAL

| Check | Result | Details |
|-------|--------|---------|
| Lint        | PASS/FAIL/SKIP | <error count or "clean"> |
| Types       | PASS/FAIL/SKIP | <error count or "clean"> |
| Unit Tests  | PASS/FAIL/SKIP | <X/Y passing> |
| Build       | PASS/FAIL/SKIP | <clean or error summary> |
| E2E         | PASS/FAIL/SKIP | <X/Y passing or "not configured"> |
```
**Overall:** PASS = everything that ran passed; FAIL = anything failed; PARTIAL = some passed, some skipped, none failed.

### Step 4: Report
Print a compact summary. If anything failed, include the actual failing output so the user can act on it:
```
Test: FAIL
  Lint:  PASS (clean)
  Types: FAIL (3 errors)
  Unit:  PASS (42/42)
  Build: not run (blocked by types)

First failure:
  src/app.ts:88 — Type 'string' is not assignable to type 'number'
Logged: TEST_LOG.md
```

## Rules
- Never skip the build check if a build script exists — if it doesn't build, it isn't done.
- If NO checks exist at all, say so and offer to set up a minimal test setup.
- Log EVERY run to TEST_LOG.md — it's the audit trail.
- Report FAIL with the real error text, not just "tests failed".
- If E2E is skipped for missing config or credentials, report it as SKIP, not PASS.
