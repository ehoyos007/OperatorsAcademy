# Context: Operators Academy

## Repository & Deployment
- **Git Owner:** ehoyos007 (personal)
- **Deployment:** Vercel (operators-academy.vercel.app)
- **Related:** operators-academy-pro/ (toolkit distribution), operators-academy-setup/ (installer)

## What It Is
AI course platform teaching Claude Code and AI workflows to operators. React 18 + Vite + Tailwind. 15 navigable pages, ~37 sections across 8 modules.

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
