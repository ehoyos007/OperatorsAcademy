# PRD — Explore + ClaudeKit-Style Reference Layer for Operators Academy

**Status:** draft · **Created:** 2026-07-01 · **Owner:** Enzo
**Origin:** port the useful parts of claudekit.io onto OA's *own* toolkit (never become a 3rd-party directory).
**Interview decisions:** see the table at the end of this file — every phase inherits them.

---

## 0. North star & guardrails

**North star:** maximize a visitor's usefulness — *find the right tool → understand it → paste a setup prompt and go.* Not narrowly SEO or conversion (those are downstream benefits).

**Guardrails (from VISION.md, unchanged):**
- Course + Explore browsing stay **public** (SEO moat, lead gen). No paywall on reading.
- **Actions gate:** copying a setup prompt requires signup; premium items require premium tier.
- No dark patterns, no vendor lock-in narrative.
- Dark PPL-brand aesthetic stays — borrow ClaudeKit's *reference-work trust cues*, not its magazine identity.
- Ecosystem items carry a "not shipped by OA / independent" label + source link (integrity caveat).

**Audience:** non-technical operators are the wedge; power-users served via a global **Operator ⇄ Technical** toggle (default Operator, persisted).

---

## PHASE 1 — Explore over our toolkit  *(build first)*

### 1.1 Goal
Turn the static `PremiumToolkitPage` brochure into a public, faceted, searchable **catalog** of everything OA ships (40 skills · 18 agents · 5 plugins · hooks) plus ~10 curated ecosystem tools — each item paste-and-go installable.

### 1.2 Content model

One `Item` record per tool. v1 seed **auto-generated** from `~/Projects/operators-academy-pro` (`skills/*/SKILL.md`, `free-agents/*.md`, `agents/*.md`, `README.md`), then hand-polished. Single source of truth = the toolkit repo; a build script parses it into `src/data/items.generated.json` (mechanical fields), which `src/data/items.js` merges with the hand-authored `src/data/content.js` into the final catalog.

```ts
Item {
  slug: string              // "wrap-up"
  name: string              // "Wrap Up"
  kind: "skill"|"agent"|"plugin"|"hook"
  origin: "oa" | "ecosystem"        // shipped by us vs curated external
  tier: "free" | "premium" | null   // null for ecosystem
  categoryKey: string               // canonical key; label resolves per toggle (see 1.3)
  tags: string[]
  updated: string                   // ISO date (from repo / last-touched)

  operator: {                       // shown when toggle = Operator (default)
    tagline: string                 // one plain line: "what it does for you"
    summary: string                 // 2-4 sentences, zero jargon
    setupPrompt: string             // COPY-PASTE prompt → paste into Claude Code
  }
  technical: {                      // shown when toggle = Technical
    tagline: string
    body: string                    // markdown from SKILL.md body: triggers, flags, paths
    installCommand: string          // raw: "/wrap-up" | "curl … | bash" | "claude mcp add …"
    deps: string[]                  // ["gh CLI"] | ["Node + Playwright"] | []
  }

  source?: { repo?: string; marketplace?: string; url?: string }  // ecosystem → external + label
  seeAlso: string[]                 // slugs, same category
  faq: { q: string; a: string }[]
}
```

**Setup-prompt generation rules:**
- **OA items (bundled):** setup prompt installs the *toolkit*, not the single skill —
  e.g. `Install the Operators Academy toolkit for me by running: curl -fsSL https://www.operatoracademy.io/claude-setup/install.sh | bash — then confirm /wrap-up is available.`
  Premium items point at the premium installer + note the tier requirement.
- **Ecosystem items (individual):** per-tool natural-language setup —
  e.g. `Set up the Supabase MCP server in my Claude Code project: add it with the official remote MCP, walk me through auth, and confirm it's connected.`
- The prompt is what makes this operator-friendly: they paste, Claude executes. Technical view shows the raw `installCommand` underneath for power-users.

### 1.3 Facets (Explore index)

| Facet | Values (with live counts) | Notes |
|---|---|---|
| **Kind** | Skill · Agent · Plugin · Hook | our type enum (not ClaudeKit's) |
| **Origin** | Ours (installable) · Recommended (external) | ecosystem clearly separated |
| **Category** | dual-labeled per toggle (see map) | drives Home "Contents" too |
| **Tier** | Free · Premium | premium items badged + 🔒 |
| **Search** | free-text over name + tagline + tags | — |
| **Sort** | Recently updated · A–Z · Curated | — |

**Category label map** (canonical key → Operator label / Technical label):
- `session` → "Run & ship your session" / "Session workflow"
- `quality` → "Check your work" / "Quality & verification"
- `database` → "Your database" / "Database"
- `planning` → "Plan & decide" / "Planning & decisions"
- `vision` → "Stay aligned" / "Vision System"
- `build` → "Build & design" / "Build & design"
- `content` → "Write & document" / "Content & docs"

State is **URL-persisted + deep-linkable:** `/explore?kind=skill&category=session&tier=free&q=push`. Category links from the Home page and the premium pitch land pre-filtered.

### 1.4 Routes

| Route | Access | Purpose |
|---|---|---|
| `/explore` | public | faceted catalog index |
| `/explore/:slug` | public read | item detail; Operator/Technical toggle; FAQ; see-also; source |
| `/tools/premium` | public | **reshaped** → pitch/landing, CTA into `/explore?tier=premium&origin=oa` |
| `/tools/install` | public/gated (unchanged) | the free install flow |

**Gate points (shop-window):** browsing + reading detail = public. The **"Copy setup prompt"** button = `GatedCopyButton` (signup for free items; premium tier for premium items). Premium clone URL stays premium-gated (existing `useCloneUrl`).

**Toggle:** global `Operator | Technical` control in the site header (or Explore toolbar), persisted to `localStorage`, default **Operator**. Flips card taglines, detail body, category labels, and the install affordance (setup prompt ⇄ raw command).

### 1.5 How `PremiumToolkitPage` reshapes

- Its data arrays (`baseSkills`, `premiumSkillCategories`, `baseAgents`, `premiumAgents`, plugins — already synced to repo v2.1) **migrate into the catalog** (`items.generated.json` + `content.js`, surfaced via `items.js`) as the seed. No more hand-maintained arrays in the page.
- The page **slims to a pitch**: hero + the 5 stat chips + "The Shipping Workflow" flow + FAQ + install steps, then a prominent **"Browse the full toolkit →"** into `/explore?tier=premium&origin=oa`. The exhaustive skill/agent grids move to Explore.
- Free `InstallPage`'s 10-skill / 7-agent chips become links into `/explore?tier=free`.
- Net: one catalog is the source of truth; the two landing pages become funnels into it.

### 1.6 Phase-1 acceptance criteria
1. `/explore` lists every OA item + ecosystem picks, faceted, searchable, counts live, URL-persisted.
2. Toggle flips all copy Operator⇄Technical, persists across reloads, defaults Operator.
3. Each item has a detail page: summary, setup prompt (copy = gated), raw command (technical), source (ecosystem = external + "not affiliated"), see-also, ≥3 FAQ.
4. Premium items visibly badged + locked for free/anon; copy gated by tier.
5. `items.generated.json` is generated by a script from `operators-academy-pro` (re-runnable when the toolkit changes) and merged via `items.js`.
6. `PremiumToolkitPage` no longer hand-maintains item arrays; it's a pitch that links into Explore. No build regressions (prerender stays green).

---

## PHASE 2 — Item detail depth + SEO surfaces

**Goal:** make each `/explore/:slug` a strong standalone page (the SEO + evaluation surface).

- **Prerender** every detail page (the repo already prerenders course routes via `scripts/prerender.mjs`) → per-item `<title>`/meta/OG, sitemap entries, internal cross-links (see-also).
- **Front-matter sidebar** (ClaudeKit pattern): kind, category, tier, deps, updated, source.
- **FAQ** per item (auto-seed 4 Qs: what it is / where it runs / how to install / what's included; polish by hand).
- **See-also** = same-category items, capped, curated.
- **Before/after or example** block where it helps understanding (the "understanding first" job).
- Accept: detail pages prerendered + indexable; Lighthouse holds; each page answers "what is this, do I need it, how do I get it" without leaving.

---

## PHASE 3 — Guides library

**Goal:** a reference library of standalone how-tos, complementing the *linear* course (course = the path; guides = lookup).

- Content model: `Guide { slug, title, difficulty(Beginner|Practical|Advanced|Concept), readTime, summary, body(anchored h2s), updated, nextSteps[] }`.
- Route: `/guides` (index, filter by difficulty) + `/guides/:slug` (article + auto "On this page" TOC).
- **Seed from what exists** — repackage course modules + the `operators-handbook` (31-file KB) into standalone articles; don't write net-new until the repackage is exhausted. Topic map ≈ ClaudeKit's 14 (CLAUDE.md, Plan Mode, Hooks, Build a Skill, Subagents, Agent Teams, …), reframed operator-first with the toggle.
- Public (SEO). Accept: ≥8 guides live, difficulty-filterable, TOC'd, cross-linked to relevant Explore items.

---

## PHASE 4 — Stacks + Updates

**Stacks** — role/goal bundles of toolkit items.
- `Stack { title, emoji, forWho, description, itemSlugs[] }`. Route `/stacks` (grid; chips deep-link into `/explore/:slug`). Examples: "Solo founder shipping loop", "Frontend operator", "Content operator", "Data operator".
- Opinionated bundling = OA voice; cheap (references existing items). Public.

**Updates** — changelog of the toolkit + ecosystem.
- `Update { slug, title, type(new|patch), date, summary, body, tags[], sourceUrl }`. Route `/updates` (reverse-chron, filter by type/tag) + `/updates/:slug`.
- Seeds from toolkit version history (v2.1 just shipped) + notable Claude Code releases. **Only build if it'll be kept fed** — a stale changelog is worse than none.
- Trust cues (dates, source links, "summary of official docs") borrowed from ClaudeKit.

---

## Sequencing & effort

1. **Phase 1** — the leverage. Content model + generator + Explore index + toggle + detail v1 + reshape premium page. Data already exists (arrays synced) → fastest high-impact slice.
2. **Phase 2** — enrich + prerender detail (SEO). Depends on P1's model.
3. **Phase 3** — Guides (repackage course/handbook).
4. **Phase 4** — Stacks (cheap) + Updates (only if maintained).

Each phase ships independently and leaves the site better. Stop between phases for review.

---

## Interview decisions (source of truth for this PRD)

| # | Decision | Choice |
|---|---|---|
| 1 | Audience | Broaden to power-users too — dual framing via global Operator⇄Technical toggle (default Operator) |
| 2 | Visibility | Public shop-window — browse/read free; copy setup prompt gated (signup); premium clone tier-gated |
| 3 | Catalog scope | Our shipped toolkit + ~10 curated ecosystem picks (external = badged + source-linked) |
| 4 | Install UX | Copy-paste **setup prompt** (operator) / raw command (technical); Claude Code executes |
| 5 | North star | Maximize visitor usefulness (find → understand → paste-and-go) |
| 6 | Framing mechanism | Global toggle, persisted, flips cards + detail + categories + install affordance |
| 7 | IA | `/explore` unified catalog; `/tools/premium` → pitch linking in; `/tools/install` kept; nav gains "Explore" |
| 8 | Content authoring | Auto-generate v1 from operators-academy-pro SKILL.md/agent files, then polish |
| 9 | Setup-prompt granularity (assumption) | OA items → toolkit-install prompt; ecosystem items → per-tool prompt |
