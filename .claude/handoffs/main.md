# Session Handoff — main
Generated: 2026-06-20
Worktree: /Users/enzohoyos/Projects/OperatorsAcademy

## What We Were Working On
Full Claude Code-native overhaul of the Operators Academy course + downloadable toolkit + cross-platform install, plus fixing the broken Vercel deploy (all prior deploys were in Error).

## Remaining Work
- **PromptFlowsPage.jsx** is still 100% marketing (8 SEO/CRO/ads flows) and still linked in the Tools nav dropdown. Retheme to operator/Claude-Code workflows (or remove) for consistency now that the Marketing module is gone.
- **OpenClaw module** is Mac-Mini-centric. VPS path covers Linux; there's no native-Windows host path. Add Windows guidance or note it's not supported as a host.
- From TASKS.md (pre-existing): Supabase auth wiring, Stripe, route guards (module numbers shifted — old "gate 2.4-2.7, 5, 6" now maps to advanced Module 2 + Module 5 OpenClaw + Appendix), per-page `<title>`/meta via react-helmet.
- **Domain:** operatoracademy.io DNS points at Vercel but the domain is registered under a Vercel team not visible from the `enzo-hoyos-projects` CLI scope. Confirm/attach it to the operators-academy project so the new build serves on the custom domain.

## Key Decisions This Session
- Prerender made non-fatal (it's SEO-only; vercel.json rewrites all routes to the SPA shell). Root cause of every Error deploy was puppeteer Chrome failing to launch in Vercel's build container (missing libnspr4.so).
- Cut n8n + Marketing; old routes redirect to /course/building-blocks (SEO-preserving).
- Public toolkit re-authored as clean generic skills (no brain/FHE/path coupling).

## Kickstart Prompt
> Operators Academy (~/Projects/OperatorsAcademy, branch main) just had its Claude Code-native overhaul committed + pushed; Vercel should be deploying. First confirm the latest Production deploy on enzo-hoyos-projects/operators-academy is READY (vercel ls operators-academy) — the fix was making scripts/prerender.mjs non-fatal so the puppeteer Chrome-launch failure no longer fails the build. Then tackle the top open item: retheme src/PromptFlowsPage.jsx away from marketing (its 8 flows in the `flows` array are all SEO/CRO/ads — see the marketing-heavy steps) toward operator/Claude-Code workflows (e.g. "ship a feature end-to-end", "set up your project doc system", "add an MCP connector"), and update its hero copy. The Marketing course module was already removed; this page is the last marketing-heavy surface and is still in the SiteNav Tools dropdown (src/components/SiteNav.jsx toolsLinks). Build check: `VITE_SUPABASE_URL=https://demo.supabase.co VITE_SUPABASE_ANON_KEY=demo npm run build` (expect 9/9 prerender, exit 0).
