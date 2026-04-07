# FEATURE_MATRIX.md — Operators Academy

> Generated: 2026-03-28
> Last reconciled: 2026-03-31
> Source: TASKS.md, CONTEXT.md, VISION.md, PLAN.md, BRAIN.md, SESSION_HANDOFF.md, CONTENT_AUDIT.md, codebase scan, git history (70 commits since Feb 2026)

---

## Current State Summary

**Operators Academy** is a React 18 + Vite + Tailwind course platform teaching AI workflows to non-technical operators. The site is **live at operators-academy.vercel.app** with 15 pages, 8 course modules (~37 sections), and 7 tool pages.

| Metric | Value |
|--------|-------|
| Total source files | 41 JSX/JS files |
| Total lines of code | ~19,700 |
| Course modules | 8 (Start Here + 7 modules + Appendix) |
| Course sections | ~40 (Appendix expanded from 4 to 6 sections) |
| Tool pages | 7 (Install, Prompt Flows, Mission Control, Session Monitor, Co-Op, Premium Toolkit, Vision System) |
| Auth system | Scaffolded (Supabase client, AuthContext, AuthModal, GatedRoute, GatedAction) |
| Payment system | None |
| Test coverage | 0% (no test framework installed) |
| Analytics | Vercel Analytics + Speed Insights |
| Deployment | Vercel (personal account) |

### What Works Today
- Full course content publicly accessible (8 modules, ~40 sections)
- Route-level auth gating on tool pages (GatedRoute)
- Action-level auth gating on copy buttons/installs (GatedAction, GatedCopyButton)
- Premium tier detection via user_metadata (invite code activation in Settings)
- PPL dark-theme homepage with slide-based presentation
- Privacy page + cookie banner (GDPR)
- User menu with sign-out
- Unified toolkit installer page
- Module openers rewritten with scenario hooks (not flat definitions)
- Appendix includes QA Agents, Session Management, and Configuration Hierarchy (6 sections)
- Shared CopyButton/Expandable components extracted; standalone pages refactored
- All internal links updated to /tools/ prefix (11 stale links fixed)

### What Does Not Work
- **No payment processing** — Stripe not integrated, no subscription flow
- **Auth is scaffold-only** — Supabase env vars may not be configured in production
- **Invite code is the only premium path** — no self-serve purchase
- **No email capture** — free tier users cannot be nurtured
- **No community** — Discord not set up
- **No tests** — zero test infrastructure
- **Content gap** — Module 3 (n8n) is still thin at ~450 words / 3 sections

---

## Feature Matrix — Quadrant Map

```
                        HIGH IMPACT
                            |
              Q1            |           Q2
         Quick Wins         |      Strategic Bets
     (do these first)       |    (plan then execute)
                            |
   F5  Email Capture        |  F8  Stripe Subscription
   F6  Invite Code Fix      |  F9  Discord Community
   F10 n8n Hands-On         |  F15 Sub-Page Splitting
   F7  Content Gating Audit |  F16 Test Infrastructure
                            |  F17 CI/CD Pipeline
                            |  F18 Admin Dashboard
                            |  F19 Progress Sync (Server)
  LOW COMPLEXITY -----------+----------- HIGH COMPLEXITY
                            |
   F13 Prerequisites        |  F20 Shared PageLayout
   F14 Glossary Complete    |  F21 Auto-Completion
   F22 SEO Meta Tags        |  F25 Setup Page Dedup
   F26 PROGRESS.md Fix      |
                            |
              Q3            |           Q4
          Fill-Ins          |       Reconsider
    (nice to have)          |   (defer or simplify)
                            |
                       LOW IMPACT

  SHIPPED since last matrix: F11, F12, F24, F23 (partial)
```

---

## Shipped Features (Current State)

| ID | Feature | Status | Notes |
|----|---------|--------|-------|
| F1 | Course Content (8 modules, ~40 sections) | SHIPPED | 15 pages, ~19.7K LOC total |
| F2 | Auth Scaffold (Supabase + AuthContext) | SHIPPED | AuthProvider, AuthModal, GatedRoute, GatedAction, GatedCopyButton |
| F3 | Premium Tier Scaffold | SHIPPED | Invite code activation, PremiumUpsell, tier detection in AuthContext |
| F4 | Homepage Redesign (PPL slide style) | SHIPPED | 8-slide scroll-based presentation with nav dots |
| F4a | Privacy + Cookie Banner | SHIPPED | PrivacyPage.jsx, CookieBanner.jsx |
| F4b | Vercel Analytics + Speed Insights | SHIPPED | Session 16 |
| F4c | Unified Installer Page | SHIPPED | Single toolkit install page |
| F4d | Settings Page | SHIPPED | Profile info, invite code entry, tier display |
| F4e | Co-Op Page | SHIPPED | Co-Op Ask, Guided Merge, categorized tools, FAQ |
| F4f | Vision System Page | SHIPPED | Password-protected cheat sheet, crawler-blocked |
| F11 | QA Agents Content Restore | SHIPPED | Appendix expanded to 6 sections: Core Concept, 5 Core Files, Trigger Phrases, QA Agents, Session Management, Configuration Hierarchy |
| F12 | Module Opener Hooks | SHIPPED | 4 module openers rewritten from definitions to scenario hooks (1.1, 3.1, 4.1, Appendix) — commit 3fb26f1 |
| F24 | CTA Link Fix | SHIPPED | 11 stale internal links fixed across 6 files, all using /tools/ prefix — commit 3fb26f1 |
| F23a | Shared Component Extraction | SHIPPED | CopyButton + Expandable extracted to src/components/, inline definitions removed from standalone pages — commits 7ec0dfc + 3fb26f1 |

---

## Q1 — Quick Wins (High Impact, Low Complexity)

These deliver outsized value relative to effort. Do them first.

### F5 — Email Capture on Free Signup
| Field | Value |
|-------|-------|
| **Description** | Add email capture flow for free-tier users who sign up. Currently auth scaffold exists but no lead nurturing pipeline. Capture name + email on signup, store in Supabase profiles with `source: 'operators-academy'`, trigger welcome email. |
| **Impact** | CRITICAL |
| **Complexity** | Low |
| **Story Points** | 3 |
| **Dependencies** | F2 (auth scaffold — already shipped) |
| **Blockers** | Need to verify Supabase env vars are configured in Vercel production |
| **Acceptance** | New signups appear in Supabase profiles table with source field. Welcome email sends within 5 minutes. |

### F6 — Invite Code System Verification
| Field | Value |
|-------|-------|
| **Description** | End-to-end test of the invite code flow added in Session 18. Verify: code entry on Settings page, SHA-256 hash comparison, `tier: 'premium'` written to user_metadata, session refresh picks up new tier, GatedRoute/GatedAction respect premium tier. Currently untested. |
| **Impact** | HIGH |
| **Complexity** | Low |
| **Story Points** | 2 |
| **Dependencies** | F2, F3 (both shipped) |
| **Blockers** | Requires a real Supabase auth session to test (cannot unit test without mock) |
| **Acceptance** | User enters valid invite code, tier updates to premium, premium routes become accessible without page refresh. Invalid codes show error. |

### F7 — Content Gating Audit (Free vs Paid)
| Field | Value |
|-------|-------|
| **Description** | Audit which tools and content should be free vs paid. Currently: all tool pages are gated behind free auth, premium gates only on `/tools/premium` and `/tools/vision-system`. Per VISION.md, Modules 2.4-2.7, Module 5, Module 6, Appendix, and all tools should be premium. Reconcile actual route guards with intended tier map. |
| **Impact** | HIGH |
| **Complexity** | Low |
| **Story Points** | 3 |
| **Dependencies** | F2, F3 (both shipped) |
| **Blockers** | None — decision needed on which exact routes get `requiredTier="premium"` |
| **Acceptance** | Gating map in PLAN.md matches actual route guards in App.jsx. Free users see teaser for premium content. Premium users access everything. |

### F10 — n8n Hands-On Tutorial (Module 3 Gap)
| Field | Value |
|-------|-------|
| **Description** | Module 3 (n8n) is the thinnest module at ~450 words across 3 sections. The "What you'll learn" box promises "Build your first automated workflow" but no section delivers this. Add a step-by-step tutorial walking through creating a specific n8n workflow (e.g., form submission -> email notification). |
| **Impact** | HIGH |
| **Complexity** | Low |
| **Story Points** | 3 |
| **Dependencies** | None |
| **Blockers** | None |
| **Acceptance** | Module 3 has a new section 3.4 "Build Your First Workflow" with a concrete step-by-step tutorial. Module word count doubles from ~450 to ~900+. |

---

## Q2 — Strategic Bets (High Impact, High Complexity)

These are the critical infrastructure investments. Plan carefully, then execute.

### F8 — Stripe Subscription Integration
| Field | Value |
|-------|-------|
| **Description** | Add Stripe subscription for premium tier ($29-49/mo). Implement: Stripe Checkout for new subscriptions, Stripe Customer Portal for management, webhook handler for subscription events (created, updated, cancelled), sync subscription status to Supabase user_metadata or separate subscriptions table. Replace invite-code-only premium path with self-serve purchase. |
| **Impact** | CRITICAL |
| **Complexity** | High |
| **Story Points** | 8 |
| **Dependencies** | F5 (email capture), F7 (gating audit) |
| **Blockers** | Stripe account setup, pricing decision ($29 vs $39 vs $49), need serverless function for webhooks (Vercel Edge Function or Supabase Edge Function) |
| **Acceptance** | User can purchase premium subscription via Stripe Checkout. Subscription status syncs to auth tier. Cancellation revokes premium access. Customer portal accessible from Settings page. |

### F9 — Discord Community Setup
| Field | Value |
|-------|-------|
| **Description** | Set up a Discord server for paid members. Create channel structure (general, course-help, tools-support, showcase, announcements). Add Discord invite link to premium toolkit page and post-purchase flow. Optionally gate Discord access to premium tier using Discord bot + Supabase webhook. |
| **Impact** | HIGH |
| **Complexity** | Medium |
| **Story Points** | 5 |
| **Dependencies** | F8 (Stripe — to gate access to premium members) |
| **Blockers** | Discord server creation (manual), bot development if gating access |
| **Acceptance** | Discord server exists with organized channels. Premium members receive invite link after purchase. Link visible on premium toolkit page. |

### F15 — Sub-Page Splitting (Modules 2, 5, 6)
| Field | Value |
|-------|-------|
| **Description** | Modules 2 (7 sections, ~2500 words), 5 (8 sections, ~5000+ words), and 6 (8 sections, ~4500+ words) are the densest modules. Split each into 3 sub-pages: Module 2 -> Basics (2.1-2.3), Working (2.4-2.6), Advanced (2.7). Module 5 -> Getting Started (5.1-5.2), Core Skills (5.3-5.5), Growth (5.6-5.8). Module 6 -> Intro (6.1-6.3), Setup (6.4-6.6), Operations (6.7-6.8). Update CourseLayout sidebar navigation and progress tracking. |
| **Impact** | HIGH |
| **Complexity** | High |
| **Story Points** | 8 |
| **Dependencies** | None, but should come after F12 (opener hooks) |
| **Blockers** | Requires CourseLayout.jsx sidebar updates, new nested routes in App.jsx |
| **Acceptance** | Dense modules split into digestible sub-pages. Sidebar shows sub-page navigation within modules. Progress tracking works per sub-page. |

### F16 — Test Infrastructure
| Field | Value |
|-------|-------|
| **Description** | Set up Vitest + React Testing Library for component tests and Playwright for E2E tests. Priority tests: AuthContext hooks (signUp, signIn, signOut), GatedRoute permission checks, course routes load without auth, premium route blocks free tier, email verification 7-day grace period. Mock Supabase for unit tests. |
| **Impact** | HIGH |
| **Complexity** | High |
| **Story Points** | 8 |
| **Dependencies** | None |
| **Blockers** | Need to choose between Playwright and Cypress for E2E |
| **Acceptance** | `npm test` runs Vitest suite with >60% coverage on auth and gating components. E2E tests cover critical user flows (course browse, signup, premium access). |

### F17 — CI/CD Pipeline (GitHub Actions)
| Field | Value |
|-------|-------|
| **Description** | Add GitHub Actions workflow for: lint check, build verification, test suite execution on PR, and auto-deploy to Vercel on merge to main. Currently no CI/CD — deployments are manual via Vercel git integration. |
| **Impact** | MEDIUM |
| **Complexity** | Medium |
| **Story Points** | 5 |
| **Dependencies** | F16 (test infrastructure) |
| **Blockers** | None |
| **Acceptance** | PRs run lint + build + test. Main branch auto-deploys. Failed builds block merge. |

### F18 — Admin Dashboard
| Field | Value |
|-------|-------|
| **Description** | Simple admin view showing: total signups, signups by day/week, premium vs free breakdown, invite code usage, most-visited tool pages. Currently the only admin interface is the raw Supabase dashboard. Build as a gated admin route (check for admin role in user_metadata). |
| **Impact** | MEDIUM |
| **Complexity** | High |
| **Story Points** | 8 |
| **Dependencies** | F5 (email capture — need users to track), F8 (Stripe — to show revenue) |
| **Blockers** | Need admin role detection mechanism |
| **Acceptance** | `/admin` route shows user metrics, conversion funnel, and revenue. Only accessible to admin users. |

### F19 — Server-Side Progress Sync
| Field | Value |
|-------|-------|
| **Description** | Course progress currently stored in browser localStorage only (CourseLayout.jsx). If user clears browser data or switches devices, progress is lost. Sync completion state to Supabase `course_progress` table for authenticated users. Fall back to localStorage for anonymous users. |
| **Impact** | MEDIUM |
| **Complexity** | High |
| **Story Points** | 5 |
| **Dependencies** | F2 (auth — already shipped) |
| **Blockers** | Need new Supabase table + RLS policies |
| **Acceptance** | Authenticated user completes sections, logs out, logs back in on different device, sees same progress. |

---

## Q3 — Fill-Ins (Medium Impact, Low Complexity)

Nice-to-have improvements. Fill these in around major work.

### F13 — Prerequisites Callouts
| Field | Value |
|-------|-------|
| **Description** | Add "Prerequisites" boxes at the top of modules that require prior setup. Module 2 needs Node.js, Module 6 needs terminal familiarity (covered in Module 2). Module 5 benefits from having the workflow installed. Currently no prerequisite indicators exist. |
| **Impact** | MEDIUM |
| **Complexity** | Low |
| **Story Points** | 1 |
| **Dependencies** | None |
| **Blockers** | None |
| **Acceptance** | Modules 2, 5, 6 show a prerequisite box at the top linking to the required prior module. |

### F14 — Glossary Completeness Review
| Field | Value |
|-------|-------|
| **Description** | Review the 45 glossary terms in courseData.js after the restructuring. Check for: missing terms introduced in new content, orphaned terms no longer used, inconsistent definitions across modules. |
| **Impact** | MEDIUM |
| **Complexity** | Low |
| **Story Points** | 1 |
| **Dependencies** | None |
| **Blockers** | None |
| **Acceptance** | All terms used in course content appear in glossary. No orphaned terms. Definitions are consistent. |

### F22 — SEO Meta Tags
| Field | Value |
|-------|-------|
| **Description** | Add proper Open Graph and Twitter Card meta tags to all pages. Currently the SPA has minimal meta tags. Add per-page titles, descriptions, and social sharing images. Critical for the "free course as SEO moat" strategy from VISION.md. |
| **Impact** | MEDIUM |
| **Complexity** | Low |
| **Story Points** | 2 |
| **Dependencies** | None |
| **Blockers** | Need social sharing image (OG image) |
| **Acceptance** | Each page has unique title + description. Social shares show proper card with image. |

### F26 — PROGRESS.md Template Variable Fix
| Field | Value |
|-------|-------|
| **Description** | The auto-generated PROGRESS.md has a template variable issue: `$(date -u '+%Y-%m-%d %H:%M UTC')` is not rendering. The shell command is appearing literally instead of being evaluated. Fix the pre-push hook or generation script. |
| **Impact** | LOW |
| **Complexity** | Low |
| **Story Points** | 1 |
| **Dependencies** | None |
| **Blockers** | None |
| **Acceptance** | PROGRESS.md shows actual date instead of template variable string. |

---

## Q4 — Reconsider (Low Impact, High Complexity)

Defer these or find simpler alternatives.

### F20 — Shared PageLayout Component
| Field | Value |
|-------|-------|
| **Description** | Standalone tool pages (Install, Mission Control, Session Monitor, Prompt Flows, Co-Op) each have their own hero/FAQ/CTA/footer patterns implemented inline. A shared `PageLayout.jsx` wrapper would enforce visual consistency. However, each page has unique enough structure that a generic wrapper may over-abstract. |
| **Impact** | LOW |
| **Complexity** | Medium |
| **Story Points** | 5 |
| **Dependencies** | None |
| **Blockers** | Risk of over-abstraction — each page has unique layout needs |
| **Acceptance** | Tool pages share a common layout wrapper. Visual consistency improves. No page loses unique functionality. |

### F21 — Auto-Completion on Scroll (Intersection Observer)
| Field | Value |
|-------|-------|
| **Description** | Currently course sections are manually toggled as complete. Add Intersection Observer to auto-mark sections as read when the user scrolls past them. Risk: may mark sections as "complete" when user is skimming, inflating progress metrics. |
| **Impact** | LOW |
| **Complexity** | Medium |
| **Story Points** | 3 |
| **Dependencies** | None |
| **Blockers** | UX decision — auto vs manual completion affects perceived progress accuracy |
| **Acceptance** | Sections auto-mark as read after 5+ seconds in viewport. Manual toggle still available. |

### F23 — Standalone Page Refactor (Shared Components) — PARTIALLY SHIPPED
| Field | Value |
|-------|-------|
| **Description** | InstallPage, PromptFlowsPage, MissionControlPage, SessionMonitorPage still use inline components (CopyButton, Expandable). Refactor to use shared components from `src/components/`. Low user impact but improves DX. |
| **Impact** | LOW |
| **Complexity** | Medium |
| **Story Points** | 5 → 2 remaining |
| **Dependencies** | None |
| **Blockers** | None |
| **Status** | CopyButton + Expandable extracted and shared (commits 7ec0dfc, 3fb26f1). Inline definitions removed from standalone pages. Remaining: other page-specific inline components (e.g., CodeBlock in ClaudeCodeGuide.jsx, custom Expandable variant in ClaudeCodeGuide.jsx). |
| **Acceptance** | All standalone pages import from shared components. No inline component definitions. |

### F25 — Setup Page Deduplication
| Field | Value |
|-------|-------|
| **Description** | MarketingSetupPage overlaps heavily with Module 5, OpenClawSetupPage overlaps with Module 6. Both duplicate install commands and prompt libraries. Reduce to lightweight quick-start guides that link to course modules for details. |
| **Impact** | LOW |
| **Complexity** | Medium |
| **Story Points** | 5 |
| **Dependencies** | F15 (sub-page splitting — may resolve overlap naturally) |
| **Blockers** | None |
| **Acceptance** | Setup pages are lean quick-start guides (<200 lines each). Deep content lives in course modules. No duplicated install commands. |

---

## Sprint Sequencing

### Sprint 1 — "Revenue Foundation" (~18 SP)

The monetization infrastructure sprint. Get users signed up and paying.

| ID | Feature | SP | Notes |
|----|---------|-----|-------|
| F5 | Email Capture on Free Signup | 3 | Verify Supabase production config |
| F6 | Invite Code System Verification | 2 | End-to-end test existing code |
| F7 | Content Gating Audit | 3 | Reconcile actual vs intended gates |
| F10 | n8n Hands-On Tutorial | 3 | Fill critical content gap |
| ~~F11~~ | ~~QA Agents Content Restore~~ | ~~3~~ | **SHIPPED** — Appendix expanded to 6 sections |
| ~~F24~~ | ~~CTA Link Fix~~ | ~~1~~ | **SHIPPED** — 11 stale links fixed |
| F26 | PROGRESS.md Fix | 1 | Fix template variable |
| **Remaining** | | **12** | (4 SP shipped) |

**Sprint Goal:** Free signup works end-to-end, content gaps filled, broken links fixed. Users can sign up and all gating is correctly applied.

---

### Sprint 2 — "Premium Pipeline" (~17 SP)

Stripe integration and content polish. Users can purchase premium.

| ID | Feature | SP | Notes |
|----|---------|-----|-------|
| F8 | Stripe Subscription Integration | 8 | The big one — self-serve premium purchase |
| ~~F12~~ | ~~Module Opener Hooks~~ | ~~2~~ | **SHIPPED** — 4 openers rewritten with scenario hooks |
| F13 | Prerequisites Callouts | 1 | Quick content add |
| F14 | Glossary Completeness | 1 | Quick content audit |
| F9 | Discord Community Setup | 5 | Stand up community for premium members |
| **Remaining** | | **15** | (2 SP shipped) |

**Sprint Goal:** Users can purchase premium via Stripe. Discord community ready for members. Course content polished with hooks and prerequisites.

---

### Sprint 3 — "Quality and Scale" (~18 SP)

Test infrastructure, CI/CD, and content restructuring.

| ID | Feature | SP | Notes |
|----|---------|-----|-------|
| F16 | Test Infrastructure | 8 | Vitest + Playwright setup |
| F15 | Sub-Page Splitting | 8 | Break dense modules into digestible pages |
| F22 | SEO Meta Tags | 2 | Support the SEO moat strategy |
| **Total** | | **18** | |

**Sprint Goal:** Test suite running with >60% coverage on critical paths. Dense modules split into sub-pages. SEO foundation in place.

---

### Sprint 4 — "Platform Maturity" (~18 SP)

Admin tools, persistence, and pipeline automation.

| ID | Feature | SP | Notes |
|----|---------|-----|-------|
| F17 | CI/CD Pipeline | 5 | GitHub Actions for lint/build/test/deploy |
| F18 | Admin Dashboard | 8 | User metrics and conversion funnel |
| F19 | Server-Side Progress Sync | 5 | Cross-device course progress |
| **Total** | | **18** | |

**Sprint Goal:** CI/CD pipeline prevents broken deployments. Admin dashboard provides business visibility. Users keep progress across devices.

---

### Backlog (Unsequenced)

| ID | Feature | SP | Quadrant | Notes |
|----|---------|-----|----------|-------|
| F20 | Shared PageLayout | 5 | Q4 | Defer — risk of over-abstraction |
| F21 | Auto-Completion | 3 | Q4 | Defer — UX decision needed |
| F23 | Standalone Refactor | 2 | Q4 | Partially shipped — CopyButton/Expandable done, remaining inline components in ClaudeCodeGuide |
| F25 | Setup Page Dedup | 5 | Q4 | May resolve naturally with F15 |

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Auth provider | Supabase (shared with Satori) | Already configured, shared user pool is intentional |
| Payment provider | Stripe Checkout + Customer Portal | Industry standard, handles subscriptions, tax, invoicing |
| Webhook handler | Supabase Edge Function or Vercel Serverless | Client-side SPA cannot receive webhooks — need server-side handler |
| Test framework | Vitest + React Testing Library | Vite-native, fast, React-first |
| E2E framework | Playwright | Better DX than Cypress, cross-browser by default |
| Premium gating | User metadata in Supabase Auth | Simpler than separate subscription table for current scale |
| Content gating strategy | Free course, gated tools, premium advanced content | Per VISION.md — SEO moat + lead gen + paid utility |
| Module splitting | 3 sub-pages each for Modules 2, 5, 6 | Content audit identified density problem |
| Community platform | Discord | Low setup cost, familiar to target audience, free tier available |

---

## Story Point Totals

| Category | Points | Shipped | Remaining |
|----------|--------|---------|-----------|
| Sprint 1 (Revenue Foundation) | 16 | 4 (F11, F24) | 12 |
| Sprint 2 (Premium Pipeline) | 17 | 2 (F12) | 15 |
| Sprint 3 (Quality and Scale) | 18 | 0 | 18 |
| Sprint 4 (Platform Maturity) | 18 | 0 | 18 |
| Backlog | 15 | 3 (F23 partial) | 15 |
| **Grand Total** | **84** | **9** | **78** |

| Quadrant | Features | Points |
|----------|----------|--------|
| Q1 — Quick Wins | F5, F6, F7, F10 | 11 |
| Q2 — Strategic Bets | F8, F9, F15, F16, F17, F18, F19 | 47 |
| Q3 — Fill-Ins | F13, F14, F22, F26 | 5 |
| Q4 — Reconsider | F20, F21, F23, F25 | 15 |
| **Shipped** | F11, F12, F24, F23a | 9 |
