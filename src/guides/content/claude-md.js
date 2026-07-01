// Guide: Writing a CLAUDE.md That Works. Authored content.
export default {
  slug: "claude-md",
  title: "Writing a CLAUDE.md That Works",
  difficulty: "Practical",
  readTime: "10 min",
  updated: '2026-07-01',
  summary: "The one file Claude reads at the start of every session — how to write it so it actually helps instead of getting skimmed.",
  sections: [
    {
      id: 'what-it-is',
      title: 'What CLAUDE.md Actually Is',
      content: `Claude Code reads one file automatically at the start of every session: **CLAUDE.md**. You never have to point at it — it's just there, loaded into Claude's context before you type a word.

That makes it the single highest-leverage file in your project. Everything you'd otherwise re-explain each session — your stack, your commands, your conventions, your hard rules — goes here once and gets read every time.`,
      analogy: "CLAUDE.md is the onboarding brief you hand a new contractor on day one. Where it leaks: a human reads onboarding once and remembers; Claude re-reads CLAUDE.md every single session, so a stale line misleads every session, not just the first. Keep it current.",
    },
    {
      id: 'two-levels',
      title: 'Two Levels: Global and Project',
      content: `CLAUDE.md exists at two levels, and both load together.

| Location | Scope | What belongs here |
|----------|-------|-------------------|
| \`~/.claude/CLAUDE.md\` | Every project on your machine | How you personally like Claude to work — everywhere |
| \`project/CLAUDE.md\` | Just this repo | Stack, commands, structure, and rules for this project |

Your global file carries habits that never change between projects. The project file carries facts that are true only here. When they conflict, the project file wins — the specific beats the general.`,
      tip: "Keep machine-wide preferences in the global file and repo facts in the project file. Mixing them means copy-pasting the same lines into every project you ever open.",
    },
    {
      id: 'bootstrap',
      title: 'Bootstrap It With /init',
      content: `Don't write it from a blank page. Open Claude Code inside your project and run:

\`\`\`
/init
\`\`\`

Claude reads your codebase — package files, folder structure, existing scripts — and drafts a CLAUDE.md for you: detected stack, key commands, project layout. Then you edit it down and add the things it couldn't infer, like your conventions and your don'ts.`,
      tip: "Treat /init's output as a first draft, not the final file. It's good at describing what exists; you still add the judgment calls — the rules and workflows Claude can't read off the code.",
    },
    {
      id: 'principles',
      title: 'What Makes One Actually Work',
      content: `A CLAUDE.md that helps follows a few rules. Every one traces back to the same fact: Claude reads this file every session, so every wasted line is wasted attention.

• **Short and structured beats long and prose.** Headings, tables, short bullets — not walls of text.

• **Write how-to-handle, not what-exists.** "Run \`npm test\` before every commit" beats "we have tests." Claude can see the tests; it can't see your rule about them.

• **State the don'ts explicitly.** "Never edit files in \`dist/\` — they're generated" prevents a whole class of mistakes in one line.

• **Put commands in code blocks** so they copy exactly, with the right flags.

• **Document recurring workflows** — the exact sequence you run every time, written down once so Claude runs it the same way you would.`,
      analogy: "A good CLAUDE.md reads like a recipe card, not an essay about cooking. Steps and quantities you can act on — not background you have to interpret.",
    },
    {
      id: 'skeleton',
      title: 'A Skeleton to Start From',
      content: `A starting shape you can fill in:

\`\`\`
# CLAUDE.md — Project Name

One line on what this project is and who it's for.

## Tech Stack
- Framework, language, database, host

## Key Commands
npm run dev     # start local dev server
npm test        # run the test suite
npm run build   # production build

## Project Structure
- src/ — where the app lives
- Note where the important pieces are

## Conventions
- How this repo does things (naming, patterns, style)

## Don'ts
- Never commit secrets or .env files
- Never edit generated files in dist/
\`\`\`

Keep it to the sections you'll actually maintain. An accurate short file beats a thorough one that's half stale.`,
    },
    {
      id: 'mistakes',
      title: 'Common Mistakes',
      content: `The failures are predictable:

• **Too long.** A 500-line CLAUDE.md burns context every session and gets skimmed, not read. Cut ruthlessly.

• **Documenting what the code shows.** Claude can read your files. Spend the lines on the judgment it can't infer, not a re-description of the folder tree.

• **Facts that rot.** Version numbers, a file that moved, a command that changed — if you won't keep it current, don't put it in.

• **Vague rules.** "Write clean code" changes no decision. "Prefer small functions; no file over 300 lines" does.

• **Forgetting the don'ts.** The guardrails are the highest-value lines. A file with no "never do X" is missing its best content.`,
      tip: "Grow it from real friction. After any session where you had to correct Claude, ask: should that be a line in CLAUDE.md? The best files are written one correction at a time, not all at once up front.",
    },
  ],
  nextSteps: [
    { to: '/guides/memory', label: 'How Claude Remembers' },
    { to: '/guides/plan-mode', label: 'Using Plan Mode Well' },
    { to: '/course', label: 'Take the full course' },
  ],
};
