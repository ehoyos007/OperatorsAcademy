/**
 * items.js — the unified Explore catalog.
 *
 * Merges mechanical records (items.generated.json, produced by
 * scripts/generate-items.mjs from the toolkit repo) with the hand-authored
 * enrichment layer (content.js), and appends curated ecosystem picks.
 *
 * UI (ExploreIndex, ExploreDetail, ItemCard) imports from HERE only.
 */
import generated from './items.generated.json' with { type: 'json' };
import { overrides, ecosystem } from './content.js';

const FREE_INSTALL = 'curl -fsSL https://www.operatoracademy.io/claude-setup/install.sh | bash';

// ── Category labels resolve per view mode (Operator vs Technical) ─────────────
export const CATEGORY_LABELS = {
  session: { operator: 'Run & ship your work', technical: 'Session workflow' },
  quality: { operator: 'Check your work', technical: 'Quality & verification' },
  database: { operator: 'Your database', technical: 'Database' },
  planning: { operator: 'Plan & decide', technical: 'Planning & decisions' },
  vision: { operator: 'Stay aligned', technical: 'Vision System' },
  build: { operator: 'Build & design', technical: 'Build & design' },
  content: { operator: 'Write & document', technical: 'Content & docs' },
};

export const KIND_LABELS = { skill: 'Skill', agent: 'Agent', plugin: 'Plugin', hook: 'Hook' };
export const KINDS = ['skill', 'agent', 'plugin', 'hook'];
export const ORIGINS = ['oa', 'ecosystem'];
export const TIERS = ['free', 'premium'];

export function categoryLabel(key, mode = 'operator') {
  return CATEGORY_LABELS[key]?.[mode] || CATEGORY_LABELS[key]?.operator || key;
}

// ── Default operator setup prompt (used when content.js doesn't override) ─────
function defaultSetupPrompt(item) {
  const noun = KIND_LABELS[item.kind]?.toLowerCase() || 'tool';
  if (item.tier === 'premium') {
    return `Install the Operators Academy premium toolkit for me (I have a premium account): clone operators-academy-pro with my access token and run its install.sh, then confirm the ${item.name} ${noun} is available.`;
  }
  return `Install the Operators Academy toolkit for me: run \`${FREE_INSTALL}\`, then confirm the ${item.name} ${noun} is available.`;
}

// ── Merge generated + overrides into full items ───────────────────────────────
function merge(g) {
  const o = overrides[g.slug] || {};
  const operator = {
    tagline: o.operator?.tagline || g.technical.tagline || '',
    summary: o.operator?.summary || '',
    setupPrompt: o.operator?.setupPrompt || defaultSetupPrompt(g),
  };
  return {
    ...g,
    operator,
    technical: { deps: [], ...g.technical },
    tags: o.tags || [],
    faq: o.faq || [],
    seeAlso: o.seeAlso || [],
    source: o.source || null,
    notAffiliated: false,
  };
}

export const items = [
  ...generated.map(merge),
  ...ecosystem, // full records, origin: 'ecosystem'
];

// ── Lookups + facet helpers ───────────────────────────────────────────────────
export function getItem(slug) {
  return items.find((i) => i.slug === slug) || null;
}

/** Live counts for a facet key over a given subset (for the filter sidebar). */
export function facetCounts(subset, field) {
  const m = {};
  for (const it of subset) {
    const v = it[field];
    if (v == null) continue;
    m[v] = (m[v] || 0) + 1;
  }
  return m;
}

export function allTags() {
  const s = new Set();
  items.forEach((i) => (i.tags || []).forEach((t) => s.add(t)));
  return [...s].sort();
}
