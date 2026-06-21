# BRAIN.md — Open Brain Integration

## On Session Start

Run these semantic_search queries to surface past decisions:

1. `query: "auth gates gated content free vs paid tier", project: "OperatorsAcademy"`
   - Surfaces decisions on what content is free vs premium-gated

2. `query: "premium tier invite codes stripe payment", project: "OperatorsAcademy"`
   - Surfaces payment infrastructure decisions and blockers

3. `query: "supabase profiles shared satori source tracking", project: "OperatorsAcademy"`
   - Surfaces user data architecture and multi-project user management

---

## Capture Guidelines

Beyond global CLAUDE.md guidelines, capture the following for Operators Academy:

- **Tier/Gating decisions:** What content is free vs premium, how gates work. These compound.
- **User research:** Feedback about course difficulty, pain points with tools.
- **Conversion insights:** Signup rate changes, bounce rate on upsells, premium conversion.
- **Infrastructure blockers:** Supabase issues, Vercel gotchas, Stripe integration.
- **Content gaps:** Modules or sections users request.

**Skip:** Routine bug fixes, style tweaks, copy edits unless they solved a major problem.

---

## Session Log

### 2026-03-20
- Initialized BRAIN.md, VISION.md, CLAUDE.md, TEST_LOG.md
- Decision: Free course (all 8 modules public) + paid tier for tools/advanced content
- Architecture: Supabase profiles tracks source + tier in shared project

### 2026-06-20 / main
- [decision] Re-centered the course on a Claude Code-native stack (Claude Code + skills/agents/hooks/MCP); cut the n8n and Marketing modules because they no longer reflect the actual workflow. Old routes redirect to /course/building-blocks to preserve SEO.
- [decision] Made prerendering non-fatal — it's SEO-only (vercel.json rewrites every route to the SPA shell), so it must never fail the build.
- [blocker→fix] Every Vercel deploy had been in Error for ~40 days: scripts/prerender.mjs launches puppeteer, but Vercel's build container lacks Chrome's system libs (libnspr4.so → "Failed to launch the browser process: Code 127"), failing `npm run build`. Fixed by try/catch around puppeteer.launch (warn + exit 0) and guarding src/lib/supabase.js so missing env can't crash the SPA at import.
- [insight] The downloadable public toolkit must be re-authored as generic skills, not copied from personal skills — the real ones are coupled to private brain MCPs, FHE infra, and absolute paths that would leak publicly.
