// Guide: Skills vs Agents vs Hooks vs MCP. Authored content — replace the placeholder section.
export default {
  slug: "types-explained",
  title: "Skills vs Agents vs Hooks vs MCP",
  difficulty: "Concept",
  readTime: "6 min",
  updated: '2026-07-01',
  summary: "The four building blocks of your workflow layer — what each one is for, and how they nest together.",
  sections: [
    {
      id: 'the-workflow-layer',
      title: 'The Four Building Blocks',
      content: `Out of the box, Claude Code is a smart generalist. The operators who get far more out of it all add the same thing: a **workflow layer** made of four parts — Skills, Agents, Hooks, and MCP.

Here's the one-line version of each before we go deeper:

| Piece | In one line | You trigger it by |
|-------|-------------|-------------------|
| Skill | A saved instruction you run on demand | Calling it by name |
| Agent | A specialist Claude hands a sub-task to | Claude delegates it |
| Hook | Automation that fires on an event | It fires itself |
| MCP | A connection to your other tools | Claude uses it like a tool |

The rest of this guide takes them one at a time, with a concrete example each.`,
      analogy: "Think of Claude Code as a new hire: Skills are the checklists you hand them, Agents are the specialists they can call, Hooks are the office rules that run without asking, and MCP is the set of logins you give them.",
    },
    {
      id: 'skills',
      title: 'Skill — A Saved Instruction You Run On Demand',
      content: `A **Skill** is a saved instruction set Claude runs when you ask — so you stop re-typing the same request.

Instead of typing *"review my changes for bugs, check for security issues, don't nitpick formatting"* every time, you save it once and trigger it by name.

**Concrete example:** a skill called \`commit\`. Typing \`/commit\` (or saying "commit this") tells Claude to review your changes, write a clear message describing what changed and why, and save it — the same way every time.

Skills are just plain-English text files with a short header, living in \`~/.claude/skills/\`. You don't have to write them by hand — ask Claude Code *"make a skill that runs my tests and summarizes what failed"* and it writes it for you.`,
      analogy: "A skill is a saved recipe. You perfected the dish once — now you say the name and it comes out identical, instead of re-deriving it each time.",
    },
    {
      id: 'agents',
      title: 'Agent — A Specialist Claude Delegates To',
      content: `An **Agent** (also called a subagent) is a *separate* Claude instance, with its own clean memory, that the main Claude hands a piece of work to.

Why that matters: a long, messy search would clog up your main conversation. An agent goes off, does its one job in its own context, reports back a tight answer, and disappears — your main thread stays focused.

**Concrete example:** the \`explorer\` agent. Before changing code you don't know, Claude sends Explorer to map where everything lives and report back — read-only, no risk. Other everyday agents: \`reviewer\` (sweeps a change for bugs before you ship) and \`debugger\` (isolates why something broke).

Like skills, agents are just markdown files — a name, a description, and instructions — living in \`~/.claude/agents/\`.`,
      analogy: "You're the general contractor: you don't lay every brick, you call in an electrician, a plumber, a framer — each expert at one thing, each reporting back. Where it leaks: your subs don't share one memory, and neither do agents — every agent starts fresh.",
    },
    {
      id: 'hooks',
      title: 'Hook — Automation That Fires On Its Own',
      content: `Skills and agents wait for you to trigger them. A **Hook** fires *automatically* when something happens — no command needed. It's the closest thing to "runs while you're not looking," except it lives right inside your workflow.

A hook wires a small script to an **event**:

| Event | Fires when | Example use |
|-------|------------|-------------|
| \`SessionStart\` | You open a session | Load your project docs so Claude has context immediately |
| \`PreToolUse\` | Before Claude runs a command | Block anything dangerous before it happens |
| \`PostToolUse\` | After a command runs | Auto-format the file that just changed |
| \`Stop\` | The session ends | Save a note of where you left off |

**Concrete example:** a \`SessionStart\` hook that checks whether your project has its documentation files and reminds Claude to create them if not. You never think about it — it just happens every time.`,
      analogy: "Hooks are motion-sensor lights. You don't flip a switch — you walk in and the light is already on. The event (you arriving) triggers the action.",
    },
    {
      id: 'mcp',
      title: 'MCP — A Connection To Your Other Tools',
      content: `Everything so far lives on your computer — files, commands, git. **MCP (Model Context Protocol)** is how Claude Code reaches *out* to the rest of your stack: your database, your GitHub, your hosting, your docs.

An **MCP server** is a connector. Add one, and Claude can use that tool directly — read your database schema, open a pull request, check a deployment — without you copy-pasting between windows.

**Concrete example:** add the GitHub connector, and Claude can read your issues and open pull requests for you, in the same conversation where it wrote the code.

**One caution:** an MCP server gives Claude real access to real systems. Only add ones you trust, and give them the least access they need — the same care you'd take handing out a login on someone's first day.`,
      analogy: "If Claude Code is a brilliant new hire, MCP is giving them logins to your tools — suddenly they can check the shared database and file tickets, not just work on their own laptop. Which is exactly why you're careful which keys you hand over.",
    },
    {
      id: 'how-they-nest',
      title: 'How They Nest',
      content: `These four aren't rivals — they stack. A single job often uses several: a \`SessionStart\` hook loads your docs, you run the \`/push\` skill, which fires the \`reviewer\` agent, which checks the code before an MCP connector deploys it.

They can also be bundled. A **plugin** is a package that ships skills, agents, hooks, and MCP connectors together — install one plugin and you get a whole coordinated set at once. The Operators Academy toolkit is exactly this: a bundle of shipping skills, review agents, and safe default hooks, added in one command.

You don't need all four on day one. Start with a skill or two. Add an agent when a task gets big. Add a hook when you notice yourself doing the same setup every session. Add MCP last, once you feel the friction of switching tools by hand.`,
      tip: "The fastest way to learn the difference is to use one of each: run a skill (/commit), let an agent run (Explorer before an edit), and install the toolkit so a hook greets you at session start.",
    },
  ],
  nextSteps: [
    { to: '/guides/install-toolkit', label: 'Get all four in one command' },
    { to: '/guides/status-line', label: 'Read your status line' },
    { to: '/explore', label: 'Browse every skill and agent' },
  ],
};
