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
