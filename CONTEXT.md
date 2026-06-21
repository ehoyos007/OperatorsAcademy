# Context: Operators Academy

## Repository & Deployment
- **Git Owner:** ehoyos007 (personal)
- **Deployment:** Vercel (operators-academy.vercel.app)
- **Related:** operators-academy-pro/ (toolkit distribution), operators-academy-setup/ (installer)

## What It Is
AI course platform teaching the Claude Code-native operator workflow. React 18 + Vite + Tailwind. Course = Intro + 5 modules + Appendix: (1) Claude thinking partner, (2) Claude Code cross-platform install/use, (3) Skills/Agents/Hooks/MCP, (4) The Operator Workflow, (5) OpenClaw, Appendix: Project Startup System.

## 2026-06-20 Overhaul (Claude Code-native)
- Removed n8n (was Module 3) + Marketing from Zero (was Module 5). Old routes redirect to /course/building-blocks.
- Module 2 install rewritten cross-platform: native installer (curl|bash / irm|iex), winget, npm fallback — Windows/Mac/Linux.
- Downloadable toolkit (public/claude-setup) refreshed: 10 public-safe skills (commit, push, pr, test, pickup, wrap-up, auto-init, smoke, improve, plan), 7 agents (explorer, reviewer, debugger, test-runner, test-writer-fixer, git-commit, logger), cross-platform installers (install.sh + install.ps1).
- Content is data-driven in src/course/courseData.js; module .jsx files are templates keyed by moduleKey.

## Current State (as of Strategy Audit, Mar 2, 2026)
- **Auth:** None. No user accounts, no login.
- **Payment:** None. No Stripe, no subscription gating.
- **Content gating:** Zero — all content renders unconditionally.
- **Analytics:** Vercel Analytics + Speed Insights (Session 16).
- **Progress tracking:** Browser localStorage only (in CourseLayout.jsx).

## Content Plan (from strategy doc)
**FREE tier:**
- Start Here, Module 1 (Claude.ai, all 4 sections), Module 2 (sections 2.1-2.3), Module 4 (conceptual), Install Page

**PAID tier ($29-49/mo — not yet built):**
- Module 2 Advanced (2.4-2.7), Module 5 (Marketing), Module 6 (OpenClaw), Appendix (Project System), Prompt Flows, All Tools, Setup Guides, Community (Discord)

## Infrastructure Gap (high priority)
- Auth provider needed (Supabase recommended)
- Stripe subscription integration
- Route guards for paid content
- Email capture on free tier
- Community platform (Discord)

## Tech Stack
- React 18 + Vite + Tailwind CSS
- Vercel Analytics

## Key Decisions
- Vercel deployment (personal account)
- Supabase for auth (not yet implemented)
- Strategy: free tier as lead gen → paid tier for advanced content
