# CLAUDE.md — Operators Academy

## Repository & Deployment

| Field | Value |
|-------|-------|
| **Git Owner** | ehoyos007 (personal) |
| **Git Remote** | https://github.com/ehoyos007/OperatorsAcademy.git |
| **Vercel Team** | enzo-hoyos-projects |
| **Vercel Project** | operators-academy |
| **Production URL** | https://operators-academy.vercel.app |
| **Related Repos** | operators-academy-pro (toolkit), operators-academy-setup (installer) |

---

## Tech Stack
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Auth:** Supabase Auth (email/password + Google OAuth)
- **Database:** Supabase PostgreSQL (profiles table with tier + source)
- **Hosting:** Vercel
- **Analytics:** Vercel Analytics + Speed Insights

---

## Key Commands

```bash
npm run dev           # Vite dev server (localhost:5173)
npm run build         # Build dist/ for production
npm run preview       # Preview production build
git push origin main  # Deploy to Vercel (auto-triggers)
```

---

## Project Structure

```
src/
├── App.jsx                    # Routes: course (public), tools (gated), settings
├── HomePage.jsx               # Landing page
├── components/
│   ├── SiteNav.jsx            # Header with login/user menu
│   ├── AuthModal.jsx          # Login/signup modal
│   ├── AuthContext.jsx        # Auth state + methods
│   ├── GatedRoute.jsx         # Route wrapper: checks auth + tier
│   ├── GatedAction.jsx        # Component wrapper: teaser CTA when logged out
│   ├── GatedCopyButton.jsx    # CopyButton wrapped with auth gate
│   ├── CookieBanner.jsx       # GDPR consent
│   └── CourseLayout.jsx       # Course sidebar nav + progress
├── course/
│   ├── courseData.js           # Module definitions + glossary (content lives here)
│   ├── StartHere.jsx           # Intro: What is an Operator?
│   ├── ClaudeAI.jsx            # Module 1: Claude (thinking partner, slim)
│   ├── ClaudeCode.jsx          # Module 2: Claude Code (cross-platform install)
│   ├── BuildingBlocks.jsx      # Module 3: Skills, Agents & Hooks (key='module3')
│   ├── PuttingItTogether.jsx   # Module 4: The Operator Workflow (key='module4')
│   ├── OpenClaw.jsx            # Module 5: OpenClaw (key='module6')
│   └── ProjectSystem.jsx       # Appendix: Project Startup System (key='appendix')
# NOTE: n8n + Marketing modules removed 2026-06-20. /course/n8n + /course/marketing redirect to /course/building-blocks.
├── explore/                    # Explore catalog (Phase 1, public shop-window)
│   ├── ExploreIndex.jsx        # /explore — faceted, searchable, URL-persisted index
│   ├── ExploreDetail.jsx       # /explore/:slug — Operator/Technical detail + setup prompt
│   ├── FacetBar.jsx            # Filter sidebar (kind/origin/category/tier, live counts)
│   └── ItemCard.jsx            # Shared toggle-aware catalog card
├── data/                       # Explore content model
│   ├── items.generated.json    # Mechanical records (from scripts/generate-items.mjs)
│   ├── content.js              # Hand-authored operator copy + FAQ + ecosystem picks
│   └── items.js                # Merge layer + facet helpers (UI imports from here)
├── components/
│   └── ViewModeToggle.jsx      # Operator | Technical segmented toggle
└── context/
    ├── AuthContext.jsx          # React Context: user, session, profile, tier
    └── ViewModeContext.jsx      # Operator/Technical view mode (persisted)
```

> Explore data pipeline: `npm run gen:items` regenerates `items.generated.json` from the `operators-academy-pro` toolkit repo; `npm run check:items` validates the merged catalog. `scripts/generate-items.mjs` needs the toolkit repo present, so it is NOT part of the Vercel build — the generated JSON is committed.

---

## Key Patterns

### Course Routes (Public)
```jsx
<Route path="/course" element={<CourseLayout />}>
  <Route path="claude-ai" element={<ClaudeAI />} />
</Route>
```
No auth gates. Course modules are free and public.

### Tool Routes (Gated)
```jsx
<Route path="/tools/install" element={<GatedRoute><InstallPage /></GatedRoute>} />
<Route path="/tools/vision-system" element={<GatedRoute requiredTier="premium"><VisionSystemGuide /></GatedRoute>} />
```

### Inline Gating
```jsx
<GatedCopyButton text="npm install @supabase/supabase-js" />
```

### Signup Flow
1. User clicks gated element → AuthModal opens
2. Email/password or Google OAuth
3. Supabase creates user + profile with `source = 'operators-academy'`
4. Modal closes, original action completes

### Premium Tier
- Free tier: default. All free course + free tools.
- Premium tier: set via Supabase profile `tier` column.
- Invite codes: currently manual; future: Stripe integration.

---

## Environment Variables

```
# Client-side (bundled by Vite)
VITE_SUPABASE_URL=https://cbeurhcgvqptclggkbhb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# Server-side only (used by /api/clone-url, never in client bundle)
SUPABASE_URL=https://cbeurhcgvqptclggkbhb.supabase.co
SUPABASE_ANON_KEY=eyJ...
INSTALL_TOKEN=github_pat_...        # Free toolkit repo access
PRO_INSTALL_TOKEN=github_pat_...    # Premium toolkit repo access
```

### API Endpoints

- `GET /api/clone-url?repo=free|premium` — Returns token-embedded git clone command. Requires `Authorization: Bearer <supabase_jwt>`. Premium repo requires `tier=premium` in user metadata.

---

## High-Priority TODOs

- [ ] Stripe integration for premium subscriptions
- [ ] Premium tier enforcement in code
- [ ] Discord community for paid members
- [ ] Complete Appendix: QA Agents, session management
- [ ] Email nurture sequences
