// Guide: The Shipping Workflow. Authored content.
export default {
  slug: "shipping-workflow",
  title: "The Shipping Workflow",
  difficulty: "Practical",
  readTime: "10 min",
  updated: '2026-07-01',
  summary: "auto-init → pickup → commit → test → push → wrap-up: the loop of small skills that takes work from idea to shipped without losing your place.",
  sections: [
    {
      id: 'the-loop',
      title: 'The Loop',
      content: `Shipping with Claude Code isn't one big move — it's a short loop of small skills, each doing one job and handing off to the next. Run them in order, session after session, and work goes from idea to live without anything falling through the cracks.

The loop, in order:

1. **/auto-init** — set up the project's memory (once per project)
2. **/pickup** — catch up on where you left off (start of each session)
3. **Build** — direct Claude in plain English
4. **/commit** — checkpoint a working piece
5. **/test** — run the full check suite
6. **/push** — ship it live
7. **wrap up** — save state for next time (end of each session)`,
      analogy: "An assembly line — each station does one thing and passes the work along. Where it leaks: a real line runs itself; here you're the one moving the work between stations and deciding when each runs. The order is fixed; the pace is yours.",
    },
    {
      id: 'what-each-does',
      title: 'What Each Skill Does',
      content: `Each skill has a precise job. Knowing the boundaries keeps you from reaching for the wrong one.

| Skill | What it does | When |
|-------|--------------|------|
| \`/auto-init\` | Creates the project's doc files if they're missing | Once, on a new project |
| \`/pickup\` | Reads the docs and git status, briefs you on where you stopped | Start of every session |
| \`/commit\` | Local commit plus a background test, then moves you to the next task | After a working chunk |
| \`/test\` | Runs lint, types, unit tests, E2E, and a build; logs to TEST_LOG.md | Before you ship |
| \`/push\` | Commits and pushes the current branch (saves first if state is stale) | When it's ready to go live |
| \`/wrap-up\` | Saves the session into the docs and writes a handoff note — no git | End of every session |

The key line: /commit stays local, /push goes to the remote, wrap up touches no git at all.`,
    },
    {
      id: 'a-day',
      title: 'A Day, Start to Finish',
      content: `Here's a full day running the loop.

**New project, first thing:** run /auto-init once. It creates CONTEXT.md, TASKS.md, and the rest, so the project has a memory from its very first session.

**Every session after, you start with /pickup.** It reads the docs and tells you where you left off and what's next — no scrolling back, no re-explaining.

**Then you build.** Direct Claude in plain English. When a piece works, run /commit — it checkpoints your work locally, kicks off a test in the background, and advances you to the next task.

**When the feature's done and you want it live:** run /test for the full suite — lint, types, tests, build. Green? Run /push. It commits and pushes; if your host auto-deploys, it's live in seconds.

**Done for the day:** wrap up. It writes what happened into the docs and leaves a handoff note — and only then is it safe to /clear.

\`\`\`
/pickup          # catch up on where you stopped
# ...build with Claude...
/commit          # checkpoint a working piece
/test            # run the full check suite
/push            # ship it
wrap up          # save state for next time
\`\`\``,
    },
    {
      id: 'commit-vs-push',
      title: 'Commit vs. Push vs. Wrap-Up',
      content: `Three of these skills feel like "saving," and mixing them up is the most common confusion. They save different things:

• **/commit** saves your code *locally*. A checkpoint you can roll back to. Nothing leaves your machine.

• **/push** saves locally *and* sends it to the remote (GitHub), which usually triggers a deploy. This is the one that means "ship."

• **wrap up** saves your *context* — what you did and what's next — into the docs. It never touches git.`,
      analogy: "/commit is saving a document. /push is emailing it to the whole team. wrap up is writing tomorrow's to-do list before you walk out. Three different saves, three different purposes.",
    },
    {
      id: 'how-it-saves-you',
      title: 'How It Prevents Lost Work',
      content: `Every step in the loop exists to prevent a specific way work gets lost:

• **/commit early and often** means a bad change is one checkpoint back, not a lost afternoon.

• **/test before /push** means you catch the break on your machine, not in production after users hit it.

• **wrap up before /clear** means tomorrow's /pickup knows exactly where you stopped — nothing important lives only in a conversation that's about to be wiped.

The failure mode this kills: closing a session mid-thought, coming back the next day, and burning thirty minutes reconstructing what you were doing and why. The loop writes it down so you don't have to remember.`,
      tip: "Two non-negotiables: /test before /push, and wrap up before /clear. Skip a /commit now and then and you lose a checkpoint. Skip those two and you either ship a break or lose the work.",
    },
    {
      id: 'minimum',
      title: 'If You Only Remember Three',
      content: `If the full loop feels like a lot on day one, start with three skills:

• **/pickup** to start a session
• **/push** to ship
• **wrap up** to save before you stop

That alone gives you a workflow that never loses your place. Add /commit and /test as the habit forms — they make the loop safer and faster, but the three above are the backbone. Run them for a week and the rest becomes muscle memory.`,
    },
  ],
  nextSteps: [
    { to: '/guides/memory', label: 'How Claude Remembers' },
    { to: '/guides/plan-mode', label: 'Using Plan Mode Well' },
    { to: '/course/putting-it-together', label: 'Module 4: The Operator Workflow' },
  ],
};
