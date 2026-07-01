/**
 * stacks.js — curated role/goal bundles of catalog items.
 *
 * A Stack points at real item slugs (from src/data/items.js); the chips on the
 * Stacks page deep-link to /explore/<slug>. No detail route — chips are the nav.
 * Shape: { slug, emoji, title, forWho, description, itemSlugs: string[] }
 */
export const stacks = [
  {
    slug: 'solo-founder',
    emoji: '🚀',
    title: 'Solo-founder shipping loop',
    forWho: 'One person, shipping fast',
    description: 'The core loop that takes you from idea to shipped without losing context between sessions.',
    itemSlugs: ['auto-init', 'pickup', 'commit', 'test', 'push', 'wrap-up'],
  },
  {
    slug: 'frontend',
    emoji: '🎨',
    title: 'Frontend operator',
    forWho: 'Building UI and web apps',
    description: 'Design production-grade interfaces, drive the browser, and keep pages fast.',
    itemSlugs: ['frontend-design', 'dev-browser', 'ui-recon', 'tournament', 'pagespeed', 'playwright'],
  },
  {
    slug: 'content',
    emoji: '✍️',
    title: 'Content operator',
    forWho: 'Writing copy, docs, and video',
    description: 'Draft marketing copy, polish it, generate docs, and turn transcripts into clean write-ups.',
    itemSlugs: ['copywriting', 'copy-editing', 'documentation', 'yt-digest', 'scribe'],
  },
  {
    slug: 'data',
    emoji: '🗄️',
    title: 'Data & database operator',
    forWho: 'Working with a database',
    description: 'Run migrations, catch schema drift, and let Claude talk to your Supabase project directly.',
    itemSlugs: ['sql-migrate', 'schema-diff', 'supabase', 'supabase-mcp'],
  },
  {
    slug: 'planning',
    emoji: '🧭',
    title: 'Planning & alignment',
    forWho: 'Getting the plan right before building',
    description: 'Pressure-test a plan, reach shared understanding, decide with confidence, and encode your intent.',
    itemSlugs: ['grill-me', 'interview-me', 'decide', 'user-stories', 'init-vision', 'vision-check'],
  },
  {
    slug: 'quality',
    emoji: '✅',
    title: 'Quality & review',
    forWho: 'Shipping with confidence',
    description: 'Review the diff, run the full check suite, verify the deploy, and self-improve the change.',
    itemSlugs: ['code-review', 'reviewer', 'test', 'smoke', 'improve'],
  },
  {
    slug: 'team',
    emoji: '🤝',
    title: 'Team & knowledge',
    forWho: 'Working across sessions and people',
    description: 'Hand work off cleanly, review sessions, track daily tasks, and fan work out across agents.',
    itemSlugs: ['handoff', 'session-review', 'daily-tasks', 'spawn-team', 'my-help'],
  },
];
