/**
 * updates.js — changelog of the toolkit + site.
 *
 * Each Update:
 *   { slug, title, type: 'new'|'patch', date: 'YYYY-MM-DD', summary,
 *     body: `markdown` (ContentRenderer subset), tags: string[], sourceUrl?: string }
 * Our own changelog — keep entries honest.
 */
export const UPDATE_TYPES = ['new', 'patch'];

export const updates = [
  {
    slug: 'explore-launch',
    title: 'Explore: browse the whole toolkit',
    type: 'new',
    date: '2026-07-01',
    summary: 'A public, searchable catalog of every skill, agent, plugin, and hook — plus curated ecosystem picks.',
    body: `**Explore** is a new public catalog of everything the toolkit ships — 40 skills, 18 agents, 5 plugins, and 5 hooks — plus curated ecosystem tools we recommend.

• Filter by kind, category, and tier, with a live count on every option.
• Flip the **Operator / Technical** toggle to switch every page between plain "what it does for you" language and the technical details.
• Each tool has its own page with a copy-paste **setup prompt** — paste it into Claude Code and it does the install for you.`,
    tags: ['explore', 'toolkit'],
  },
  {
    slug: 'guides-launch',
    title: 'Guides: a how-to library',
    type: 'new',
    date: '2026-07-01',
    summary: 'Twelve standalone, difficulty-tagged guides on getting the most out of Claude Code.',
    body: `The new **Guides** section is a reference library that complements the course — the course is the path, the guides are what you reach for.

• Twelve guides across Beginner, Concept, Practical, and Advanced.
• Topics span getting started, CLAUDE.md, plan mode, the shipping workflow, building your own skill, hooks, subagents, and the Vision System.
• Each guide has an auto "On this page" table of contents and cross-links to the tools it mentions.`,
    tags: ['guides', 'learning'],
  },
  {
    slug: 'tool-detail-pages',
    title: 'Every tool now has its own page',
    type: 'new',
    date: '2026-07-01',
    summary: 'Skill, agent, plugin, and hook pages are now individually indexable for search.',
    body: `Every catalog item is now a standalone page — pre-rendered for search engines, with its own title and description, so people can find the exact tool they need from a web search and land straight on it.`,
    tags: ['explore', 'seo'],
  },
  {
    slug: 'premium-toolkit-v21',
    title: 'Premium toolkit v2.1 — now fully standalone',
    type: 'patch',
    date: '2026-07-01',
    summary: 'The premium installer now ships its own CLAUDE.md, base agents, and hooks — no free install required.',
    body: `The premium toolkit is now a true superset of the free tier and installs cleanly on a fresh machine.

• Bundles its own CLAUDE.md, the 7 base agents (explorer, reviewer, debugger, and more), the base workflow skills, and the base hooks.
• 40 skills, 18 agents (7 base + 11 premium), 5 hooks, and a 6-segment status line.
• If you already ran the free installer, premium upgrades in place — your config is backed up first.`,
    tags: ['toolkit', 'premium'],
  },
  {
    slug: 'course-claude-native',
    title: 'Course overhauled to Claude Code-native',
    type: 'new',
    date: '2026-06-21',
    summary: 'The course now centers on Claude Code and its workflow layer — skills, agents, hooks, and MCP.',
    body: `The course was re-centered around Claude Code and the workflow layer that turns it into a real shipping system.

• The Operator Stack is now Claude Code + Skills, Agents, Hooks, and MCP.
• Module 4 is "The Operator Workflow" — plan, build, review, ship.
• Older module URLs redirect so existing links keep working.`,
    tags: ['course'],
  },
  {
    slug: 'windows-install',
    title: 'One-line Windows install',
    type: 'new',
    date: '2026-06-22',
    summary: 'The free toolkit now installs on Windows with a single PowerShell command — no jq, no Nerd Font.',
    body: `Windows is now first-class. The free installer runs from a single PowerShell line and the status line has a PowerShell fallback, so you get the full setup with or without Node.`,
    tags: ['toolkit', 'windows'],
  },
  {
    slug: 'free-toolkit-refresh',
    title: 'Free toolkit refreshed',
    type: 'patch',
    date: '2026-06-20',
    summary: 'The free tier now ships the current shipping workflow: commit, push, pr, test, pickup, wrap-up, and more.',
    body: `The downloadable free toolkit was refreshed to match the workflow we actually use day to day: 10 public-safe skills (commit, push, pr, test, pickup, wrap-up, auto-init, smoke, improve, plan) and 7 agents (explorer, reviewer, debugger, test-runner, test-writer-fixer, git-commit, logger), with cross-platform installers.`,
    tags: ['toolkit'],
  },
];

export function getUpdate(slug) {
  return updates.find((u) => u.slug === slug) || null;
}
