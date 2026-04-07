# VISION.md — Operators Academy

## Core Identity

**Operators Academy** is a free-to-read, paid-to-do AI course platform that teaches operators how to build and ship AI workflows using Claude Code and modern AI tools (Claude, n8n, Supabase, Vercel).

- **Target user:** Non-technical business operators and solo founders who want to automate workflows without hiring developers
- **Experience goal:** Empower users to go from "I don't code" to "I shipped my first AI tool" in 8 modules
- **Business model:** Free course content (lead gen) → paid tier for advanced modules, tools, and setup guides

---

## Decision Framework

1. **Course stays free.** All 8 modules, all explanations render publicly — no paywall. This is our SEO moat and lead generation engine.
2. **Actions require signup.** Copy buttons, install commands, tool pages trigger auth gates. Signup is free but captures email.
3. **Premium tier unlocks utility.** Paid tier ($29–49/mo) gates Modules 2.4–2.7, Module 5 (marketing), Module 6 (OpenClaw), Appendix, premium tools, and setup guides.
4. **No vendor lock-in.** Teach open-source + vendor-neutral tools.
5. **Vercel + Supabase stack.** Both have free tiers suitable for this scale.

---

## Constraint Architecture

### Musts
- Course content publicly readable (no paywall on modules)
- Auth gates trigger for copy buttons, install commands, tool pages
- Email capture on signup for lead nurturing
- Privacy policy + cookie banner for GDPR compliance
- Supabase shared project with source tracking (satori vs operators-academy)

### Must Not
- No ads or popups blocking course reading
- No dark patterns (fake scarcity, aggressive upsells mid-course)
- No login required for course — only for tools
- No vendor-specific lock-in narratives
- No data collection beyond name, email, analytics

### Preferences
- Mobile-first responsive design (Tailwind CSS)
- Dark theme matching PPL brand aesthetic
- Instant gratification: no onboarding flows after signup
- Lean copy: casual, not pushy

### Escalation Triggers
- Feature requires >1 week → get user feedback first
- Bounce rate on premium upsell >80% → revisit messaging
- Signup volume drops after gate change → rollback

---

## Acceptance Criteria

### "Done" Means
1. Course fully public, indexable, readable (no auth on course routes)
2. Auth gates working (copy buttons, tool pages, tier enforcement)
3. Premium tier structure in place (Supabase profiles, invite codes)
4. Infrastructure stable (Supabase + Vercel operational)
5. UX smooth (login modal, post-signup resume, nav updates)

### "Right" Means
- Users read entire free course without logging in
- Users sign up in <30 seconds (Google OAuth or email)
- Premium content feels exclusive but not gatekeepy
