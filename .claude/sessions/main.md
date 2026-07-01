## Session — 2026-06-20 (wt: OperatorsAcademy)

### Work Done
- **Claude Code-native overhaul** of the whole course. Stack reframed from Claude.ai + Claude Code + n8n → Claude Code + workflow layer (skills/agents/hooks/MCP).
  - Module 3 `n8n` → **Skills, Agents & Hooks** (new BuildingBlocks.jsx, key `module3`, slug `building-blocks`).
  - Module 5 `Marketing from Zero` → **deleted** (Marketing.jsx removed).
  - OpenClaw relabeled Module 5 (key stays `module6`); sections renumbered 6.x→5.x.
  - Module 1 (Claude.ai) demoted to slim 3-section "thinking partner"; Module 4 reframed to "The Operator Workflow" (plan→build→review→ship, no n8n); Appendix rewritten around skills/agents/hooks + doc system.
  - courseData.js spliced via Python (file mixes literal \u escapes + real chars — Edit matching unreliable; line-range splice used instead). Glossary: dropped n8n/Marketing terms, added Subagent/Plan Mode/Native Installer/CLI/SKILL.md/MCP Server/Reviewer/Explorer.
- **Cross-platform install (full parity):** Module 2.3 + InstallPage.jsx rewritten — native installer (`irm…install.ps1|iex` Win / `curl…install.sh|bash` Mac+Linux), winget, npm fallback, OS toggle, no-WSL. Terminal-open table per OS in 2.1.
- **Toolkit refresh (public-safe):** public/claude-setup pack rebuilt. Skills now: commit, push, pr, test, pickup, wrap-up, auto-init, smoke, improve, plan (10). Agents: explorer, reviewer, debugger, test-runner, test-writer-fixer, git-commit, logger (7). Deleted stale ship/deploy/step-done/qa/google-ads + backend-architect/qa-orchestrator/feature-tester. New install.ps1 (Windows) + updated install.sh; cross-platform session-logger.sh hook replacing iTerm Stop hook; settings-template cleaned. Coupling scan = clean.
- **DEPLOY FIX (root cause of all Error deploys):** prerender used puppeteer; Vercel build container lacks Chrome system libs (`libnspr4.so` → "Failed to launch the browser process: Code 127" → build exit 1). Made scripts/prerender.mjs **non-fatal** (try/catch around puppeteer.launch → warn + exit 0; final exit always 0). Added guard to src/lib/supabase.js (createClient placeholder fallback so missing env never crashes the SPA at import).
- Updated docs: project CLAUDE.md (course file map), VISION.md, CONTEXT.md, skills-manifest.json, sitemap.xml.

### Decisions
- Keep old slugs as redirects (`/course/n8n`, `/course/marketing`, `/setup/marketing` → `/course/building-blocks`) for SEO instead of hard-removing.
- Prerender is SEO-only (vercel.json rewrites everything to _spa-shell.html); never let it fail the build.
- Public toolkit = clean re-authored generic skills, NOT a copy of the user's real brain/FHE-coupled skills.

### Where Left Off
- All 4 phases complete + deploy fix done. Local build exits 0 with NO env vars (9/9 prerender locally). Ready to commit + push to main (auto-deploys via Vercel).
- Open follow-ups: PromptFlowsPage.jsx still 100% marketing (8 SEO/CRO/ads flows, still in Tools nav) — needs retheme to operator workflows. OpenClaw module still Mac-Mini-centric (VPS path covers Linux; no Windows host path). Domain operatoracademy.io DNS → Vercel but registered under a Vercel team not accessible from this CLI scope.

## Session — 2026-06-20 (later) (wt: OperatorsAcademy)

### Work Done
- Committed the overhaul (52e3125) and pushed to main. Vercel auto-deploy went **GREEN** (● Ready, 21s) — first successful Production build in ~40 days.
- Verified live on https://www.operatoracademy.io: homepage 200, /course/building-blocks 200, /claude-setup/install.ps1 200. Grepped the deployed JS bundle (index-5e8chwzc.js) — contains "Skills, Agents & Hooks", "The Operator Workflow", "building-blocks", "irm https"; old "Marketing from Zero" / "Module 3: n8n" GONE. Confirms new build is live, not cached.
- Domain question RESOLVED: operators-academy.vercel.app 307-redirects to www.operatoracademy.io, so the custom domain IS attached to the operators-academy project and serves it. (The `vercel domains` CLI couldn't list it earlier, but it's wired at the project level and works.)

### Decisions
- Confirmed the non-fatal-prerender fix is the right call: deploy succeeds, site serves client-rendered via the SPA shell. Accepted tradeoff = per-route SEO HTML is the shell until prerender runs in CI (GitHub Actions or @sparticuz/chromium) — logged as a follow-up.

### Where Left Off
- DONE + LIVE. Working tree clean, main in sync, deploy green, content verified on the real domain.
- Next session: retheme src/PromptFlowsPage.jsx away from marketing (still in SiteNav Tools dropdown), OR wire CI-side prerendering for SEO, OR add a Windows host path to the OpenClaw module.

## Session — 2026-06-22 14:38 (wt: OperatorsAcademy)

### Work Done
- Reviewed the exported [client] session + the v2 Dispatch Brief; adversarial review found 2 blockers, grounded against real skill files: (a) `decide`/`interview-me` call the brain by BARE name (`semantic_search`/`search_all_brains`), sat in the brief's "ship-clean" bucket, AND the gate regex missed those tokens → false-GREEN; (b) orchestrator skills shipped without sub-skill deps — `create-presentation` was DOA (delegates to 3 presentation-* skills not in the kit).
- Patched the brief (`10 Projects/[client]/Operators Academy — [client] v2 Dispatch Brief.md`): widened the gate regex (+semantic_search/search_all_brains/unified_search/brain_search), moved decide+interview-me to strip-a-cord, dropped create-presentation, added "eyeball each edited skill" step, counts → 22 power-skills.
- BUILT the v2 kit in `~/Projects/operators-academy-pro` (commit **ec6abd5**): 38 skills (16 retained v1 + 22 new); removed brain-sync/brain-digest; de-personalized daily-tasks/my-help/session-review; ported statusline.mjs+.ps1 to 6 segments; settings patch (+caveman/context7/impeccable/supabase, +tool-search/workflows env); version 2.0.0. De-personalization gate independently re-verified = ZERO hits. Repackaged `~/Downloads/operators-academy-pro-windows-v2.zip` (byte-verified, sha256 36af4e2a…).
- Built a bilingual (EN/ES) beginner install page → vault `10 Projects/[client]/Operators Academy — Windows Install v2 (for [client]).html` with the verified zip embedded (base64, byte-identical round-trip). Smoke-tested in Chrome (toggle works, 0 console errors, in-browser decode = 295752 B).
- Deployed live + public: **https://operators-academy-install.vercel.app** (Vercel, enzo-hoyos-projects; 200, no SSO gate).

### Decisions
- De-personalize EVERY ported skill, not just the listed ones — the HARD "cut every cord" constraint pulled extra FHE/personal refs (schema-diff paths, test/ Supabase IDs + passwords) out of "copy-as-is" buckets.
- Run the gate against the WHOLE skills tree, not just new files — v1's brain-sync/brain-digest already failed it.
- Host the install page on Vercel (Enzo authed) not Netlify Drop/tiiny.host — CLI path, no browser drag-drop; the page still tells [client] to use Netlify for HIS deploys.

### Where Left Off
- DONE + SHIPPED. Kit committed (ec6abd5, local on main, **NOT pushed**). Live page public. Vault docs (brief/spec/index/HTML) updated — vault is not a git repo, saved as files.
- Residual: `statusline.ps1` hand-reviewed but not runtime-tested (no PowerShell on Mac) — [client] only hits it if he skips Node. Future v3 zip rebuilds should exclude `.claude/` so session notes don't ship.

## Session — 2026-06-22 16:37 (wt: OperatorsAcademy) — [client] feedback round

### Work Done
- [client] installed the v2 kit (Windows 11, PowerShell 5.1, Node v24). His report surfaced a real kit bug: his Claude's `/doctor` flagged `enabledPlugins` as an ARRAY — current Claude Code requires a RECORD (`{"name@marketplace": true}`). Confirmed our `settings/premium-patch.json` shipped the array.
- FIXED the kit (operators-academy-pro commit **3a2905b**): premium-patch.json → record format, scoped to the 5 official-marketplace plugins (claude-md-management, playwright, frontend-design, context7, supabase). `caveman`+`impeccable` reference COMMUNITY marketplaces (`JuliusBrussee/caveman`, `pbakaus/impeccable`) the installer never registered → they silently dropped on record-conversion → moved to a documented optional `marketplace add + install` power-up. Clarified README: jq is macOS/Linux only (install.ps1 is jq-free).
- Repackaged the zip (sha256 **cb910a3b**), re-embedded byte-identical into the install page, **redeployed** (same alias `operators-academy-install.vercel.app`) so future installs are `/doctor`-clean.
- Added a bilingual (EN/ES) "Optional power-ups" step to the install page (caveman + impeccable add commands) + redeployed — future users self-serve.
- Verified `install.ps1` merge handles a record (objects merge, arrays/scalars overwrite) — installer-compatible, no installer change needed.
- Gave [client] a consolidated copy-paste fix message: statusLine → `node ~/.claude/statusline.mjs` (he installed Node AFTER the install, so it wired the `.ps1` fallback) + the optional plugin adds.

### Decisions
- Auto-enable only official-marketplace plugins; community-marketplace plugins (caveman/impeccable) become a documented optional add — guarantees a `/doctor`-clean install for non-technical users.
- Left [client]'s `bypassPermissions` + auto-mode ON at his explicit request (his own setting; never shipped by our kit — grep-confirmed).

### Where Left Off
- Kit fix (3a2905b) + v2 build (ec6abd5) pushed to `ehoyos007/operators-academy-pro` (private). Install page live + fixed. [client] has his fix message.
- ! OPEN: `OperatorsAcademy` is PUBLIC; this shard + BRAIN.md name a client — pending Enzo's call on push public / redact / keep local.
