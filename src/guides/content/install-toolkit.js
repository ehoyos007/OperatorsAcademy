// Guide: Installing the Operators Academy Toolkit. Authored content — replace the placeholder section.
export default {
  slug: "install-toolkit",
  title: "Installing the Operators Academy Toolkit",
  difficulty: "Beginner",
  readTime: "8 min",
  updated: '2026-07-01',
  summary: "One command adds the whole shipping workflow — skills, agents, hooks, and a doc system — to Claude Code.",
  sections: [
    {
      id: 'what-it-is',
      title: 'What the Toolkit Is',
      content: `The **Operators Academy toolkit** is a bundle of skills, agents, and hooks that turns a fresh Claude Code install into a real shipping setup — one command, no configuration.

You *could* build all of this yourself, piece by piece. The toolkit just hands you a proven starter set on day one, so you're running the operator workflow before you've learned to write your own pieces.`,
      analogy: "A stock Claude Code is a new kitchen with bare counters. The toolkit is the starter set of knives, pans, and recipes — enough to cook tonight, not in six months.",
    },
    {
      id: 'install',
      title: 'The One Command',
      content: `Open your terminal (Claude Code should already be installed — if not, do that first) and paste this one line:

\`\`\`
curl -fsSL https://www.operatoracademy.io/claude-setup/install.sh | bash
\`\`\`

The installer copies the skills, agents, and hooks into your \`~/.claude\` folder, where every project can use them. It backs up anything you already have before replacing it, so it's safe to run on an existing setup.

When it finishes, restart Claude Code (close it and run \`claude\` again) so it picks up the new pieces.`,
      tip: "This installs into ~/.claude, which is shared across all your projects. Install once and every project gets the toolkit — you don't re-run it per project.",
    },
    {
      id: 'what-you-get',
      title: 'What You Get',
      content: `The free toolkit ships a full session workflow — the loop of pick up, plan, build, check, ship, and save.

**Shipping skills** (call them by name):

| Skill | What it does |
|-------|--------------|
| \`/pickup\` | Reads where you left off and briefs you at session start |
| \`/plan\` | Thinks through an approach before any code is written |
| \`/commit\` | Writes a clear message and saves your changes locally |
| \`/push\` | Commits and ships — deploys if your project auto-deploys |
| \`/test\` | Runs your checks and reports what passed or failed |
| \`/wrap-up\` | Saves where you left off so the next session picks up |

**Agents** Claude delegates to: \`explorer\` (maps unfamiliar code), \`reviewer\` (sweeps a change before you ship), plus \`debugger\`, \`test-runner\`, and more.

**Hooks** that run automatically: one greets each session and flags missing project docs; another logs what each session did.

**A documentation system:** a handful of markdown files (context, tasks, progress) that keep Claude oriented across sessions, so it never forgets what the project is or where you stopped.`,
      tip: "After installing, type / inside Claude Code — every skill the toolkit added shows up in the menu, each ready to run by name.",
    },
    {
      id: 'paste-and-go',
      title: 'Paste-and-Go Setups',
      content: `Here's the part that makes this fast: you rarely configure anything by hand. Many pages on this site — especially the **Explore** library — have a setup prompt you can copy.

The idea:

1. Find a skill, agent, or setup on the Explore page.
2. Copy its prompt (or its install command).
3. Paste it straight into Claude Code.
4. Claude reads it and installs or sets up the thing for you.

Instead of following a ten-step manual, you hand Claude the instructions and it does the setup itself. Paste, and go.`,
      analogy: "It's the difference between assembling furniture from a paper manual and handing the box to someone who's built it a hundred times. You supply the instructions; Claude does the assembly.",
    },
    {
      id: 'verify-and-first-use',
      title: 'Confirm It Works',
      content: `To confirm the toolkit is live, open Claude Code in any project and run the loop:

1. Type \`/\` — you should see \`/commit\`, \`/push\`, \`/pickup\`, \`/wrap-up\`, and the rest in the menu.
2. Make a small change to a file.
3. Say *"commit this"* — the \`/commit\` skill writes a clean message and saves it.
4. At the end, say *"wrap up"* — the \`/wrap-up\` skill records where you stopped.

Next session, \`/pickup\` reads that note and briefs you in seconds. That's the loop the toolkit is built around — and it carries across every project you open.`,
      tip: "Everything the free toolkit installs is plain text you can read and edit in ~/.claude/skills and ~/.claude/agents. Nothing is hidden — tweak any skill to fit how you work.",
    },
  ],
  nextSteps: [
    { to: '/explore', label: 'Browse the toolkit library' },
    { to: '/guides/status-line', label: 'Read your new status line' },
    { to: '/guides/getting-started', label: 'New to Claude Code? Start here' },
  ],
};
