# /smoke — Post-Deploy Visual Verification

Opens a deployed URL in Chrome, runs through configured routes, checks for errors, and captures screenshots.

## Triggers
- `/smoke`
- `/smoke <url>`
- `/smoke --init`
- `smoke test`
- `visual check`
- `visual verify`

## Prerequisites
- Chrome MCP (claude-in-chrome) must be connected
- `smoke.config.json` in project root (or run `/smoke --init` to generate one)

---

## Mode: `/smoke --init` — Bootstrap Config

### Step 1: Detect Framework
```bash
[ -d "app" ] && echo "NEXTJS_APP_ROUTER"
[ -d "pages" ] && echo "NEXTJS_PAGES"
[ -f "vite.config.ts" ] || [ -f "vite.config.js" ] && echo "VITE"
```

### Step 2: Discover Routes
**Next.js App Router:** Find all `app/**/page.tsx` files, convert to route paths.
**Next.js Pages Router:** Find all `pages/**/*.tsx` files, convert to route paths.
**Vite/Other:** Prompt the user for routes.

### Step 3: Generate smoke.config.json
```json
{
  "baseUrl": "https://your-app.vercel.app",
  "defaultTimeout": 10000,
  "routes": ["/", "/dashboard", "/settings"],
  "flows": {}
}
```

---

## Mode: `/smoke` or `/smoke <url>` — Run Smoke Tests

### Step 1: Load Config
Read `smoke.config.json`. If URL passed as argument, override `baseUrl`.

### Step 2: Open Browser
Use Chrome MCP to navigate to `baseUrl` and verify site is reachable.

### Step 3: Route Checks
For EACH route:
1. Navigate to `baseUrl + route`
2. Wait 3 seconds for page load
3. Take screenshot
4. Check console for errors
5. Check network for 4xx/5xx responses
6. Record: PASS if no errors, FAIL if any found

### Step 4: Flow Execution (if configured)
For EACH named flow in `flows`:
1. Execute each action step (navigate, fill, click, waitFor, screenshot)
2. Record result per step

### Step 5: Log to TEST_LOG.md
```markdown
## Smoke — YYYY-MM-DD HH:MM

### URL: <tested-url>
### Overall: PASS / FAIL / PARTIAL

| Check | Result | Details |
|-------|--------|---------|
| Route: / | PASS/FAIL | <console error count> |
| Route: /dashboard | PASS/FAIL | ... |
| Flow: login | PASS/FAIL | <failed steps if any> |
```

### Step 6: Report
```
---
Smoke: PASS
  Routes: <N>/<N> (0 console errors, 0 failed requests)
  Flows:  <N>/<N>
Logged: TEST_LOG.md
---
```

## Rules
- NEVER store credentials in smoke.config.json — use env vars ($VAR_NAME)
- ALWAYS log to TEST_LOG.md
- If Chrome MCP is not connected, tell the user to install/connect it
- Skip dynamic routes with `[param]` unless a concrete path is provided
