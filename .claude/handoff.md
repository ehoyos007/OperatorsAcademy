# Session Handoff
Generated: 2026-04-25 01:30

## What We Were Working On
Diagnosed why Google OAuth was redirecting users to the Satori website instead of Operators Academy, then made the entire site genuinely crawlable by AI agents (ClaudeBot, GPTBot, Perplexity, etc.) via build-time prerendering.

## What We Shipped This Session
- **OAuth diagnosis** — root cause: `operatoracademy.io` (and `www.` variant) was not in the Supabase shared-Satori project's Redirect URLs allowlist, so Supabase fell back to Site URL = Satori. The OA app code was already correct (`redirectTo: window.location.origin` in `AuthContext.jsx:74`).
- **Prerender pipeline** — `scripts/prerender.mjs` spins up a static server over `dist/`, drives puppeteer 24 over all 10 public routes, snapshots fully-rendered HTML to `dist/<route>/index.html`. Wired as `postbuild` step in `npm run build`. Build time +11s. 10/10 routes succeed.
- **Hydration** — `src/main.jsx` switched to `hydrateRoot` when `data-prerendered="true"` flag exists on `<html>` (set by the prerender script), `createRoot` otherwise. No flicker, no double-render.
- **SPA fallback preservation** — original empty `index.html` is copied to `dist/_spa-shell.html` before prerender. `vercel.json` rewrite now points to `_spa-shell.html` so 404'd paths get a clean shell, not the home content.
- **Discoverability** — added `public/sitemap.xml` (10 URLs) and rewrote `public/robots.txt` with explicit `Allow` rules for ClaudeBot, Claude-Web, anthropic-ai, ChatGPT-User, GPTBot, Google-Extended, PerplexityBot, CCBot.

## Outcome (verified locally)
- Before: every URL returned **703 B** of empty `<div id="root"></div>` shell.
- After: real bodies — `course/claude-ai` 26 KB, `course/marketing` 96 KB, `course/openclaw` 81 KB. Headings, paragraphs, copy buttons, all in HTML.

## Remaining Work / Follow-ups
- [ ] **User action required:** add `https://operatoracademy.io/**` and `https://www.operatoracademy.io/**` to Supabase Auth → URL Configuration → Redirect URLs (then OAuth will land on OA, not Satori).
- [ ] Per-page `<title>` and `<meta name="description">` — all prerendered pages currently share `<title>Operators Academy</title>`. Add `react-helmet-async` for unique meta per route.
- [ ] Consider code-splitting `dist/assets/index-*.js` (728 KB) — Vite warned during build. Use `manualChunks` for course content + lucide icons.
- [ ] 11 npm vulnerabilities flagged from puppeteer transitive devDeps — all build-time, never reach the bundle. Safe to ignore unless a clean audit is needed.

## Key Decisions This Session
- **Skipped `vite-plugin-prerender`** — its bundled puppeteer was 1.20.0 (2018, vulnerable, won't run on modern Chromium). Wrote a 90-line custom script using puppeteer 24 directly. Trade-off: own the script, but it's small and transparent.
- **Did not migrate to Next.js / React Router framework mode** — too much refactor for a 10-route static-content site. Build-time prerender of an SPA gives 95% of the SEO/AI-crawl value at 5% of the cost.
- **Excluded gated tool routes from prerender** — `GatedRoute` would render the "Sign up free" CTA when not authenticated, which isn't useful content for crawlers and may confuse search engines about page intent. Course pages are public and prerender cleanly.

## Files Touched
- `scripts/prerender.mjs` (new)
- `public/sitemap.xml` (new)
- `public/robots.txt` (rewrite)
- `src/main.jsx` (hydrate vs createRoot)
- `package.json` (build script, puppeteer devDep)
- `vercel.json` (SPA fallback to `_spa-shell.html`)

## Kickstart Prompt
> Two things to verify after the deploy lands: (1) hit `https://www.operatoracademy.io/course/claude-ai` with `curl -A "ClaudeBot"` and confirm the body is ~26 KB of real HTML (not 703 B). (2) Test Google OAuth login from operatoracademy.io after I add the redirect URLs to Supabase — should land back on operatoracademy.io, not Satori. Then pick up the per-page meta tags follow-up (react-helmet-async) — all prerendered pages currently share the same generic title.
