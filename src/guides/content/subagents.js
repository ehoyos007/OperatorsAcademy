// Guide: Delegating to Agents. Authored content.
export default {
  slug: "subagents",
  title: "Delegating to Agents",
  difficulty: "Advanced",
  readTime: "10 min",
  updated: '2026-07-01',
  summary: "Hand pieces of a job to specialist subagents — each with its own clean context and its own restricted toolset — to protect your main conversation and get review from fresh eyes.",
  sections: [
    {
      id: 'why-subagents',
      title: 'Three problems subagents solve',
      content: `A **subagent** is a separate Claude instance your main session spins up to handle one piece of work. It gets its own instructions, its own tools, and — crucially — its own clean context window. It does the job, reports back a tight answer, and disappears.

They earn their place by fixing three specific problems:

1. **Context bloat.** A long, messy codebase search fills your main conversation with noise. Delegate it, and only the conclusion comes back — your working memory stays clear for the actual task.
2. **Self-review bias.** The session that wrote the code is the worst judge of it — it already believes the code is right. A reviewer subagent reads the diff cold, with no memory of *why* you wrote it that way, and catches what you glossed over.
3. **Parallelism.** Independent pieces — search the frontend, search the backend, check the tests — can run at the same time instead of one after another.`,
      analogy: "You're the general contractor. You don't lay every brick — you bring in an electrician, a plumber, a framer. Each is expert at one thing, works in their own space, and reports back. Where it leaks: your subcontractors can't see each other's work unless you relay it — a subagent reports only to you, not to its peers.",
    },
    {
      id: 'how-to-define-one',
      title: 'Defining a subagent',
      content: `Like skills, subagents are just Markdown files — but they live in an \`agents/\` directory:

| Location | Scope |
|----------|-------|
| \`~/.claude/agents/<name>.md\` | Every project on your machine |
| \`.claude/agents/<name>.md\` | This project, shared with the team |

The file is a YAML header plus the agent's instructions. Here's a complete read-only security reviewer:

\`\`\`
---
name: security-scanner
description: Read-only security sweep of a diff — flags exposed secrets, unvalidated input, and missing auth checks. Use before shipping anything that touches auth, payments, or user input.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a security reviewer. You read the change and report risks —
you never edit code.

## What to flag
1. Secrets or API keys in tracked files.
2. User input reaching a query or shell without validation.
3. New endpoints missing an authorization check.

## Output
One line per finding: file:line — SEVERITY — problem.
End with a verdict: PASS or NEEDS-CHANGES.
\`\`\`

The body is the agent's whole personality and job. Keep it focused on one role.`,
    },
    {
      id: 'the-frontmatter-fields',
      title: 'The frontmatter fields',
      content: `Four fields shape how and when a subagent runs:

| Field | What it does |
|-------|--------------|
| \`name\` | The agent's handle — how you invoke it explicitly |
| \`description\` | The trigger signal. Claude reads this to decide when to delegate to this agent on its own |
| \`tools\` | The exact tools the agent may use. Omit to inherit everything; **list a subset to restrict it** |
| \`model\` | Which model runs it (e.g. \`sonnet\`, \`opus\`, \`haiku\`) — match power to the job |

As with skills, **\`description\` is the field that decides autonomous behavior.** Write it with the situation and trigger built in — "Use before shipping anything that touches auth" — and Claude will reach for the agent at the right moment without being told.

An optional \`color\` field just tints how the agent shows up in the UI.`,
      tip: "Match the model to the work. A cheap, fast model (haiku) is plenty for mechanical searches and file-mapping; save a stronger model (opus/sonnet) for review and reasoning where a missed subtlety is expensive.",
    },
    {
      id: 'how-invoked',
      title: 'Three ways they get invoked',
      content: `You don't always summon a subagent by hand — often Claude does it for you.

| Mode | How it happens | Example |
|------|---------------|---------|
| **Automatic** | Claude matches the situation to an agent's \`description\` and delegates on its own | It hits unfamiliar code and quietly runs the explorer to map it first |
| **Explicit** | You name the agent | "Use the security-scanner agent on this diff before I push" |
| **Parallel** | Several agents run at once on independent pieces | One maps the API, one maps the UI, one checks the tests — simultaneously |

Automatic invocation is what makes agents feel like infrastructure rather than a tool you operate. It only works if the \`description\` is specific — a vague one never gets matched.`,
    },
    {
      id: 'read-only-agents',
      title: 'Restricting tools: read-only agents',
      content: `The \`tools\` field is your safety and focus lever. An agent whose job is to *look* — map the code, review a diff, scan for risks — should not be able to *write*.

Give it only the reading tools and leave out \`Edit\` and \`Write\`:

\`\`\`
tools: Read, Grep, Glob, Bash
\`\`\`

That single line means the agent physically cannot modify your files — it can only read, search, and report. This is the pattern behind the toolkit's **explorer** (maps where things live before you change them) and **reviewer** (sweeps a diff before you ship). Both are read-only by design, so you can run them freely without worrying they'll touch anything.

The rule of thumb: **an agent that reports should not be able to edit.** Separate the finding from the fixing, and you decide what actually changes.`,
    },
    {
      id: 'when-to-use',
      title: 'When to delegate — and when to skip',
      content: `Subagents aren't free. Each one spins up fresh, with none of your current conversation's context, and you pay for that isolation in coordination and tokens. Delegate when the isolation is worth it; skip when it isn't.

**Reach for a subagent when:**
• The task is a big, noisy search whose *result* is all you need (mapping a codebase, finding every caller).
• You want an independent judgment — a reviewer who wasn't in the room when the code was written.
• Independent pieces can run in parallel and merge cleanly at the end.

**Skip it and stay in the main session when:**
• The task is small — the setup overhead costs more than doing it inline.
• The work depends heavily on the current conversation's context, which a fresh agent won't have.
• You need to iterate tightly and watch each step, not receive one summarized answer.

The two highest-leverage habits: run the **explorer** before editing code you don't know, and the **reviewer** before you ship. Map first, review last — those bookends prevent most mistakes.`,
      tip: "Subagents share your session's context only through their instructions and their final report — they can't see each other. For truly parallel work where teammates need to talk to each other (frontend + backend + tests at once), that's Agent Teams, a heavier tool covered in the course. Subagents are the everyday workhorse.",
    },
  ],
  nextSteps: [
    { to: '/guides/build-skill', label: 'Build Your Own Skill' },
    { to: '/guides/hooks', label: 'Automate with Hooks' },
    { to: '/explore', label: 'Browse the starter agents' },
  ],
};
