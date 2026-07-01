#!/usr/bin/env node
/**
 * seed-guides.mjs — one-time seeder for the Guides library.
 *
 * Writes a stub file per guide into src/guides/content/ so the glob registry and
 * the build work before the content streams fill them. IDEMPOTENT: it never
 * overwrites an existing file, so re-running it won't clobber authored content.
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, '..', 'src', 'guides', 'content');
mkdirSync(DIR, { recursive: true });

// slug, title, difficulty, readTime, summary
const GUIDES = [
  ['getting-started', 'Getting Started with Claude Code', 'Beginner', '12 min', 'Install Claude Code, log in, and make your first change — the ground floor for everything else.'],
  ['types-explained', 'Skills vs Agents vs Hooks vs MCP', 'Concept', '6 min', 'The four building blocks of the workflow layer, what each is for, and how they nest.'],
  ['install-toolkit', 'Installing the Operators Academy Toolkit', 'Beginner', '8 min', 'One command to add the whole shipping workflow — skills, agents, hooks — to Claude Code.'],
  ['claude-md', 'Writing a CLAUDE.md That Works', 'Practical', '10 min', 'The one file Claude reads every session — how to write it so it actually helps.'],
  ['plan-mode', 'Using Plan Mode Well', 'Practical', '8 min', 'Make Claude show its plan before it touches your code, and what to look for when you review it.'],
  ['status-line', 'Reading Your Status Line', 'Practical', '6 min', 'The six segments in your terminal status bar and what each one is telling you.'],
  ['memory', 'How Claude Remembers', 'Practical', '8 min', 'The doc system and memory that let Claude pick up where you left off — no re-explaining.'],
  ['shipping-workflow', 'The Shipping Workflow', 'Practical', '10 min', 'pickup → commit → test → push → wrap-up: the loop that takes you from idea to shipped.'],
  ['build-skill', 'Build Your Own Skill', 'Advanced', '12 min', 'Turn a repeatable task into a reusable slash command Claude triggers on its own.'],
  ['hooks', 'Automate with Hooks', 'Advanced', '12 min', 'Fire scripts on events — session start, before a tool runs, on stop — to automate your setup.'],
  ['subagents', 'Delegating to Agents', 'Advanced', '10 min', 'Split work across specialist subagents to protect context and get independent review.'],
  ['vision-system', 'The Vision System', 'Concept', '8 min', 'VISION.md + EVAL.md: encode your judgment so Claude stops guessing what "good" means.'],
];

const stub = (g) => {
  const [slug, title, difficulty, readTime, summary] = g;
  return `// Guide: ${title}. Authored content — replace the placeholder section.
export default {
  slug: ${JSON.stringify(slug)},
  title: ${JSON.stringify(title)},
  difficulty: ${JSON.stringify(difficulty)},
  readTime: ${JSON.stringify(readTime)},
  updated: '2026-07-01',
  summary: ${JSON.stringify(summary)},
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      content: \`${summary}

_This guide is being written._\`,
    },
  ],
  nextSteps: [
    { to: '/explore', label: 'Browse the toolkit' },
    { to: '/course', label: 'Take the full course' },
  ],
};
`;
};

let wrote = 0;
for (const g of GUIDES) {
  const p = join(DIR, `${g[0]}.js`);
  if (existsSync(p)) { console.log(`[seed-guides] skip (exists) ${g[0]}`); continue; }
  writeFileSync(p, stub(g));
  wrote++;
}
console.log(`[seed-guides] wrote ${wrote} new stub(s) into src/guides/content/ (${GUIDES.length} guides total)`);
