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
