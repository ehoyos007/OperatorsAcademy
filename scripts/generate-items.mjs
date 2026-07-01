#!/usr/bin/env node
/**
 * generate-items.mjs — Explore catalog seed generator.
 *
 * Parses the operators-academy-pro toolkit repo (skills, free-agents,
 * agents dirs) into mechanical Item records -> src/data/items.generated.json.
 *
 * The repo is the single source of truth for the MECHANICAL fields (name, kind,
 * tier, category, technical tagline, install command, updated date). Hand-authored
 * OPERATOR copy, setup prompts, FAQs, tags, and the ecosystem picks live in
 * src/data/content.js and are merged at load time by src/data/items.js.
 *
 * Re-run whenever the toolkit changes:  node scripts/generate-items.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = process.env.PRO_REPO || join(process.env.HOME, 'Projects', 'operators-academy-pro');
const OUT = join(__dirname, '..', 'src', 'data', 'items.generated.json');

// ── Taxonomy ────────────────────────────────────────────────────────────────
// Free tier = what the public/claude-setup installer ships.
const FREE_SKILLS = new Set(['auto-init', 'commit', 'improve', 'pickup', 'plan', 'pr', 'push', 'smoke', 'test', 'wrap-up']);
const FREE_AGENTS = new Set(['explorer', 'reviewer', 'debugger', 'git-commit', 'logger', 'test-runner', 'test-writer-fixer']);

// slug → canonical category key (label resolves per Operator/Technical toggle in the UI)
const CATEGORY = {
  // session
  'auto-init': 'session', pickup: 'session', 'wrap-up': 'session', handoff: 'session',
  commit: 'session', push: 'session', pr: 'session', 'session-review': 'session',
  'daily-tasks': 'session', 'my-help': 'session', 'git-commit': 'session',
  // quality
  test: 'quality', smoke: 'quality', pagespeed: 'quality', 'code-review': 'quality',
  improve: 'quality', reviewer: 'quality', debugger: 'quality', 'test-runner': 'quality',
  'test-writer-fixer': 'quality', 'api-tester': 'quality', 'performance-benchmarker': 'quality',
  playwright: 'quality',
  // database
  'sql-migrate': 'database', 'schema-diff': 'database', supabase: 'database',
  // planning
  plan: 'planning', 'grill-me': 'planning', 'interview-me': 'planning', decide: 'planning',
  'user-stories': 'planning', 'reframe-estimates': 'planning', 'spawn-team': 'planning',
  'ux-researcher': 'planning', 'sprint-prioritizer': 'planning', 'feedback-synthesizer': 'planning',
  'workflow-optimizer': 'planning',
  // vision
  'init-vision': 'vision', 'vision-check': 'vision', 'vision-adoption': 'vision',
  // build
  'frontend-design': 'build', 'dev-browser': 'build', 'compound-engineering': 'build',
  'ui-recon': 'build', tournament: 'build', 'audit-hooks': 'build', explorer: 'build',
  logger: 'build', 'frontend-developer': 'build', 'ui-designer': 'build', 'rapid-prototyper': 'build',
  'mobile-app-builder': 'build', 'devops-automator': 'build', 'claude-md-management': 'build', context7: 'build',
  // content
  copywriting: 'content', 'copy-editing': 'content', documentation: 'content',
  'yt-digest': 'content', scribe: 'content', pdf: 'content', docx: 'content',
};

// The 5 official-marketplace plugins the premium settings patch auto-enables.
const PLUGINS = ['claude-md-management', 'playwright', 'frontend-design', 'context7', 'supabase'];
// Hooks shipped by the toolkit (free tier).
const HOOKS = ['auto-init-check', 'session-logger', 'iterm-tab-notify', 'iterm-tab-reset', 'tab-title'];

const FREE_INSTALL = 'curl -fsSL https://www.operatoracademy.io/claude-setup/install.sh | bash';
const PREMIUM_INSTALL = '~/.local/share/operators-academy-pro/install.sh';

// ── Helpers ──────────────────────────────────────────────────────────────────
function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  // handle simple `key: value` and folded `key: >-` blocks
  const lines = m[1].split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2].trim();
    if (val === '>-' || val === '>' || val === '|' || val === '') {
      // folded/next-indented block
      const buf = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) { buf.push(lines[++i].trim()); }
      val = buf.join(' ').trim();
    }
    fm[key] = val.replace(/^["']|["']$/g, '');
  }
  return fm;
}

function lastUpdated(absPath) {
  try {
    const d = execSync(`git -C "${REPO}" log -1 --format=%cs -- "${absPath.replace(REPO + '/', '')}"`, {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (d) return d;
  } catch { /* fall through */ }
  try { return statSync(absPath).mtime.toISOString().slice(0, 10); } catch { return null; }
}

function record({ slug, name, kind, tier, technicalTagline, installCommand, path }) {
  return {
    slug, name, kind, origin: 'oa', tier,
    categoryKey: CATEGORY[slug] || 'session',
    updated: path ? lastUpdated(path) : null,
    technical: { tagline: technicalTagline || '', installCommand: installCommand || '' },
  };
}

// ── Parse ────────────────────────────────────────────────────────────────────
if (!existsSync(REPO)) {
  console.error(`[generate-items] toolkit repo not found at ${REPO}. Set PRO_REPO env or clone it.`);
  process.exit(1);
}
const items = [];

// Skills
const skillsDir = join(REPO, 'skills');
for (const slug of readdirSync(skillsDir)) {
  const p = join(skillsDir, slug, 'SKILL.md');
  if (!existsSync(p)) continue;
  const fm = parseFrontmatter(readFileSync(p, 'utf8'));
  const tier = FREE_SKILLS.has(slug) ? 'free' : 'premium';
  items.push(record({
    slug, name: slug, kind: 'skill', tier,
    technicalTagline: fm.description || '',
    installCommand: tier === 'free' ? FREE_INSTALL : PREMIUM_INSTALL, path: p,
  }));
}

// Agents (free-agents + agents)
for (const [dir, tier] of [['free-agents', 'free'], ['agents', 'premium']]) {
  const adir = join(REPO, dir);
  if (!existsSync(adir)) continue;
  for (const file of readdirSync(adir).filter((f) => f.endsWith('.md'))) {
    const p = join(adir, file);
    const fm = parseFrontmatter(readFileSync(p, 'utf8'));
    const slug = file.replace(/\.md$/, '');
    items.push(record({
      slug, name: slug, kind: 'agent', tier: FREE_AGENTS.has(slug) ? 'free' : tier,
      technicalTagline: fm.description || '',
      installCommand: FREE_AGENTS.has(slug) ? FREE_INSTALL : PREMIUM_INSTALL, path: p,
    }));
  }
}

// Plugins (auto-enabled by premium settings patch)
for (const slug of PLUGINS) {
  items.push(record({
    slug, name: slug, kind: 'plugin', tier: 'premium',
    technicalTagline: `Official Claude Code plugin auto-enabled by the premium settings patch.`,
    installCommand: `/plugin install ${slug}@claude-plugins-official`, path: null,
  }));
}

// Hooks (free tier)
for (const slug of HOOKS) {
  const p = join(REPO, 'hooks', `${slug}.sh`);
  items.push(record({
    slug, name: slug, kind: 'hook', tier: 'free',
    technicalTagline: `Automation hook installed into ~/.claude/hooks by the toolkit installer.`,
    installCommand: FREE_INSTALL, path: existsSync(p) ? p : null,
  }));
}

// De-duplicate slugs — e.g. frontend-design ships as BOTH a skill and a plugin.
// First occurrence (skill, built first) keeps the bare slug so its content override
// still applies; later collisions get a -<kind> suffix for a unique route/key.
const seenSlugs = new Set();
for (const it of items) {
  if (seenSlugs.has(it.slug)) it.slug = `${it.slug}-${it.kind}`;
  seenSlugs.add(it.slug);
}

items.sort((a, b) => (b.updated || '').localeCompare(a.updated || '') || a.slug.localeCompare(b.slug));
writeFileSync(OUT, JSON.stringify(items, null, 2) + '\n');
console.log(`[generate-items] wrote ${items.length} items → ${OUT}`);
const byKind = items.reduce((m, i) => ((m[i.kind] = (m[i.kind] || 0) + 1), m), {});
console.log('[generate-items] by kind:', byKind);

// ── Regenerate sitemap.xml (static routes + every Explore detail page) ────────
const BASE = 'https://www.operatoracademy.io';
const STATIC = [
  ['/', 'weekly', '1.0'], ['/course', 'weekly', '0.9'],
  ['/course/claude-ai', 'weekly', '0.9'], ['/course/claude-code', 'weekly', '0.9'],
  ['/course/building-blocks', 'weekly', '0.9'], ['/course/putting-it-together', 'weekly', '0.8'],
  ['/course/openclaw', 'weekly', '0.8'], ['/course/project-system', 'weekly', '0.8'],
  ['/tools/install', 'weekly', '0.7'], ['/tools/premium', 'weekly', '0.7'],
  ['/explore', 'weekly', '0.8'], ['/privacy', 'monthly', '0.3'],
];
let exploreSlugs = items.map((i) => i.slug);
try {
  const content = await import('../src/data/content.js');
  for (const e of content.ecosystem || []) if (e?.slug) exploreSlugs.push(e.slug);
} catch { /* ecosystem optional */ }
exploreSlugs = [...new Set(exploreSlugs)];
const urls = [
  ...STATIC.map(([loc, cf, pr]) => `  <url><loc>${BASE}${loc}</loc><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`),
  ...exploreSlugs.map((s) => `  <url><loc>${BASE}/explore/${s}</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
const SITEMAP = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(SITEMAP, sitemap);
console.log(`[generate-items] wrote sitemap with ${urls.length} urls → ${SITEMAP}`);
