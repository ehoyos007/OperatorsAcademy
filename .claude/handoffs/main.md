# Session Handoff — main
Generated: 2026-07-01 13:14
Worktree: /Users/enzohoyos/Projects/OperatorsAcademy

## What We Were Working On
Shipped a ClaudeKit-inspired reference layer to production: a public faceted **Explore** catalog of the whole toolkit, a **Guides** library, **Stacks** (role bundles), and an **Updates** changelog — plus made the premium toolkit v2.1 truly standalone. All merged to main (a0eb1a2) and LIVE on operatoracademy.io.

## Remaining Work
- `feat/explore` branch is merged but not deleted — delete it (`git branch -d feat/explore && git push origin --delete feat/explore`) if you want cleanup.
- Deferred polish: "before/after example" blocks on Explore detail pages (P2 stretch, not built).
- Bigger follow-ups: true static SEO (Vercel-side prerender, since Vercel skips the local puppeteer prerender), and a real Explore→premium upgrade path (Stripe still not built).

## Key Decisions This Session
- Catalog OUR toolkit only (not a 3rd-party directory). Public shop-window: browse/read free, copy-setup-prompt gated on signup, premium clone tier-gated.
- Global Operator⇄Technical framing toggle (default Operator). Install affordance = paste-into-Claude setup prompt.
- 2 CodeRabbit findings deliberately rejected as product decisions: public `/tools/premium` pitch; `curl|bash` (OA's own installer).

## Architecture Notes (for the next session)
- Explore data pipeline: `scripts/generate-items.mjs` parses `~/Projects/operators-academy-pro` → `src/data/items.generated.json` (mechanical); `src/data/content.js` = hand-authored operator copy + ecosystem picks; `src/data/items.js` merges them. Re-run `npm run gen:items` when the toolkit changes; `npm run check:items` validates. Generator needs the toolkit repo present → NOT in the Vercel build (generated JSON is committed).
- Guides: `src/data/guides.js` uses `import.meta.glob('../guides/content/*.js', {eager:true})` — drop a file in `src/guides/content/` and it auto-registers. Reuses `src/components/ContentRenderer.jsx` (markdown subset: **bold**, *italic*, `code`, • bullets, numbered, | tables |, ```fences```).
- SEO: `src/lib/seo.js` `useDocumentMeta(title, desc)` sets per-page title/meta client-side (Vercel doesn't run the prerender).

## Kickstart Prompt
> Operators Academy Explore/Guides/Stacks/Updates initiative is DONE and live in production (main @ a0eb1a2, operatoracademy.io). If picking up: possible next tasks are (1) delete the merged `feat/explore` branch, (2) add "before/after example" blocks to `src/explore/ExploreDetail.jsx` Technical view, or (3) investigate a Vercel-side prerender so `/explore/:slug`, `/guides/:slug` serve true static HTML for SEO (currently Vercel skips the puppeteer prerender in `scripts/prerender.mjs` and client-renders). To add a guide: drop a file in `src/guides/content/<slug>.js` (auto-registers via glob). To refresh the catalog after a toolkit change: `npm run gen:items` then `npm run check:items`.
