# Session Handoff — main
Generated: 2026-06-22 16:37
Worktree: /Users/enzohoyos/Projects/OperatorsAcademy

## Status: [client] v2 Windows kit — SHIPPED, FIXED post-feedback, kit pushed (private)

## What We Were Working On
Shipping the de-personalized v2 premium toolkit to a non-technical Windows user ([client]) and the bilingual install page that delivers it — then fixing the issues his first install surfaced.

## Where Everything Landed
- **Kit repo:** `~/Projects/operators-academy-pro` (PRIVATE) — commits `ec6abd5` (v2 build) + `3a2905b` (plugin-format fix), pushed to origin/main.
- **Zip:** `~/Downloads/operators-academy-pro-windows-v2.zip` (sha256 `cb910a3b`).
- **Install page (vault, not git):** `~/Documents/main-notes/10 Projects/[client]/Operators Academy — Windows Install v2 (for [client]).html` — bilingual EN/ES, verified zip embedded, now with an "Optional power-ups" step.
- **Live public link:** https://operators-academy-install.vercel.app (Vercel `enzo-hoyos-projects`, project `operators-academy-install`) — redeployed twice this session (record-format fix, then the power-ups step).

## Issues Found + Fixed ([client]'s install)
- **`enabledPlugins` array → record** (the real bug): current Claude Code requires a record; our kit shipped an array, which `/doctor` flagged. Fixed in premium-patch.json.
- **caveman/impeccable dropped**: they're community-marketplace plugins; the installer never registered those marketplaces, so they vanished on record-conversion. Now a documented optional add.
- **Status line on `.ps1` despite Node**: he installed Node after running the install. Fix = re-point statusLine to `node ~/.claude/statusline.mjs` (sent to him).
- **`bypassPermissions` ON**: his own setting (not our kit). Left ON per his request.

## Remaining Work / Follow-ups
- **Public-repo decision (this turn):** `OperatorsAcademy` is PUBLIC; the session shard + BRAIN.md name a client. Decide push-public / redact / keep-local before committing them here.
- `statusline.ps1` fallback still never runtime-tested on real Windows (only matters if a user skips Node).
- Course-site follow-ups (unchanged): retheme `src/PromptFlowsPage.jsx` off marketing; CI-side prerender for SEO; OpenClaw Windows host path.

## Key Decisions This Session
- Auto-enable only official-marketplace plugins; community ones are an optional documented add.
- Repackage + redeploy on the same Vercel alias so the live link always serves the latest kit.

## Kickstart Prompt
> The [client] v2 Windows kit is shipped + fixed. operators-academy-pro (PRIVATE) is at commit 3a2905b (enabledPlugins record-format fix) on top of ec6abd5 (the v2 build), pushed to origin/main. The bilingual install page is LIVE at https://operators-academy-install.vercel.app with the fixed zip (sha256 cb910a3b) embedded + an "Optional power-ups" step. To redeploy the page after edits: copy `~/Documents/main-notes/10 Projects/[client]/Operators Academy — Windows Install v2 (for [client]).html` to `/tmp/operators-academy-install/index.html`, then `cd /tmp/operators-academy-install && vercel deploy --prod --yes --scope enzo-hoyos-projects`. If re-embedding a new zip: base64 it and replace the `const ZIP_B64 = "…"` string, then verify the embedded sha matches the source zip. The kit's de-personalization gate (must stay zero-hit): `cd ~/Projects/operators-academy-pro && grep -riE 'capture_thought|open-brain|mcp__[a-z_]*brain|semantic_search|search_all_brains|unified_search|brain_search|BRAIN_USER|coderabbit|pureprofit|smart-capture' skills/ statusline.mjs statusline.ps1`. One untested surface remains: operators-academy-pro/statusline.ps1 (no-Node Windows fallback).
