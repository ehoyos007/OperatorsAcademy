# Tasks: Operators Academy

## Status: Live but ungated — monetization infrastructure needed

## High Priority
- [ ] Add Supabase auth (email/password or magic link)
- [ ] Add Stripe subscription ($29-49/mo tier)
- [ ] Add route guards — gate Modules 2.4-2.7, 5, 6, Appendix, Prompt Flows, Tools, Setup Guides
- [ ] Add email capture on free tier (lead gen before paywall)
- [ ] Set up Discord community for paid members
- [ ] Fix invite code system (added in Session 18, verify it works end-to-end)
- [ ] Add `https://operatoracademy.io/**` and `https://www.operatoracademy.io/**` to Supabase Redirect URLs allowlist (fixes Google OAuth landing on Satori)
- [ ] Add per-page `<title>` and `<meta name="description">` via react-helmet-async (all prerendered pages currently share the generic "Operators Academy" title)

## Content
- [ ] Complete Appendix: QA Agents, session mgmt, TEST_LOG sections (missing from strategy)
- [ ] Review Module 2 split (2.1-2.3 free vs 2.4-2.7 paid) — currently all ungated

## Maintenance
- [ ] Fix auto-generated PROGRESS.md (date -u not rendering — template variable issue)
- [ ] Audit which tools are free vs should be paid (Mission Control, Session Monitor, installer)

## Completed
- [x] 15 pages, 37 sections, 8 modules
- [x] Vercel Analytics + Speed Insights (Session 16)
- [x] User auth scaffold added (Session 18)
- [x] Premium tier + settings page + invite codes (Session 18)
- [x] Privacy page + cookie banner
- [x] PPL dark presentation homepage style
- [x] Unified full toolkit installer page
- [x] Toolkit v2 upgrade: 8-file doc system, shipping workflow, plan mode, hooks (2026-04-06)
- [x] Premium toolkit standalone: base/ superset, 4 new skills, v2.0.0 installer (2026-04-06)
- [x] PremiumToolkitPage redesign: 15 sections, workflow viz, FAQ (2026-04-06)
- [x] Production deploy + smoke test: 7/7 routes PASS (2026-04-06)
- [x] Set up Dylan's machine: SSH, Homebrew, Node, Claude Code, premium toolkit (2026-04-06)
- [x] Fix settings.json schema bug in both free + premium templates (2026-04-06)
- [x] Create getting-started.html beginner guide (2026-04-06)
- [x] Create operators-handbook knowledge base (31 files) for new users (2026-04-06)
- [x] Diagnose Google OAuth landing on Satori — root cause: `operatoracademy.io` not in Supabase Redirect URLs allowlist, falls back to Site URL (2026-04-25)
- [x] Make site AI-crawlable: prerender all 10 public routes (home, /privacy, /course + 8 modules) via puppeteer post-build script. Bodies went from 703 B empty shell → 6-96 KB real HTML. Hydration via `hydrateRoot`, SPA fallback preserved as `_spa-shell.html` (2026-04-25)
- [x] Add sitemap.xml and explicit robots.txt allow rules for ClaudeBot, Claude-Web, anthropic-ai, ChatGPT-User, GPTBot, Google-Extended, PerplexityBot, CCBot (2026-04-25)
