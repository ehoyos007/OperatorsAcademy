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
- [confirmed] Fix verified in production: pushed to main, Vercel deploy went green (first success in ~40 days), new content live on www.operatoracademy.io (custom domain is attached and serves the operators-academy project; the .vercel.app alias redirects to it).
- [decision] Made the installer toolkit fully Windows/no-iTerm2 capable across all three repos (OperatorsAcademy free installer, operators-academy-pro, operators-academy-setup). Premium had no Windows installer at all (bash-only, hard jq requirement) — added native PowerShell install.ps1 to pro + setup with a jq-free deep JSON merge.
- [decision] Status line rewritten as a single cross-platform statusline.mjs (Node, no jq, no Nerd Font), with statusline.ps1 (Windows, no Node) and a glyph-free statusline-command.sh (bash+jq) as fallbacks; installer auto-detects Node and wires the right one. Reason: Node isn't guaranteed on Windows (native CC binary ships without it), so a Node-only choice needs a PowerShell safety net.
- [blocker→fix] The iTerm hooks wrote OSC 11/12 (background/cursor color) UNGUARDED — those codes are honored by Windows Terminal/xterm too, so they'd recolor the whole non-iTerm terminal. Guarded to iTerm-only; added a cross-terminal tab-title.sh (OSC 0, best-effort) wired on Windows instead.
- [insight] Per CC docs: hook/statusLine command strings run via Git Bash or PowerShell on Windows and `~` does expand there — but `/bin/bash` (absolute) breaks; use bare `bash`/`node`/`~` with forward slashes. There's no $CLAUDE_CONFIG_DIR and no OS-conditional settings.json, so the installer must write the per-OS command itself.
