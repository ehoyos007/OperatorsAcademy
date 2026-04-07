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
│   ├── courseData.js           # Module definitions
│   ├── StartHere.jsx           # Module 0
│   ├── ClaudeAI.jsx            # Module 1
│   ├── ClaudeCode.jsx          # Module 2
│   ├── N8n.jsx                 # Module 3
│   ├── PuttingItTogether.jsx   # Module 4
│   ├── Marketing.jsx           # Module 5 (paid)
│   ├── OpenClaw.jsx            # Module 6 (paid)
│   └── ProjectSystem.jsx       # Module 7 / Appendix (paid)
└── context/
    └── AuthContext.jsx          # React Context: user, session, profile, tier
```

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
VITE_SUPABASE_URL=https://cbeurhcgvqptclggkbhb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_PRO_INSTALL_TOKEN=github_pat_...
```

---

## High-Priority TODOs

- [ ] Stripe integration for premium subscriptions
- [ ] Premium tier enforcement in code
- [ ] Discord community for paid members
- [ ] Complete Appendix: QA Agents, session management
- [ ] Email nurture sequences
