// Guide: Reading Your Status Line. Authored content — replace the placeholder section.
export default {
  slug: "status-line",
  title: "Reading Your Status Line",
  difficulty: "Practical",
  readTime: "6 min",
  updated: '2026-07-01',
  summary: "The six segments in your terminal status bar — what each one tells you, and how to read them at a glance.",
  sections: [
    {
      id: 'what-is-it',
      title: 'What the Status Line Is',
      content: `The **status line** is the small strip of info at the bottom of your Claude Code window. It's a dashboard — a glance tells you which model you're on, how full Claude's memory is, and where you are, without stopping to ask.

The Operators Academy toolkit installs a status line with **six segments**, always in the same order. Once you know what each one means, you read the whole thing in a second.`,
      analogy: "It's your car's dashboard. You don't stare at it — you glance, confirm speed and fuel are fine, and keep driving. The status line is the same for a Claude session.",
    },
    {
      id: 'the-six-segments',
      title: 'The Six Segments',
      content: `Left to right, the six segments are:

| # | Segment | Looks like | Tells you |
|---|---------|------------|-----------|
| 1 | Model | \`Opus\` | Which Claude model is answering |
| 2 | Context bar | a colored bar + % | How full Claude's working memory is |
| 3 | Git branch | \`main*\` | Which branch you're on; asterisk means unsaved changes |
| 4 | Project | \`my-app\` | Which project folder you're in |
| 5 | Prompt counter | \`✎ 12\` | How many messages you've sent this session |
| 6 | Grill gauge | \`🎯 80%\` | Your shared-understanding score from /grill-me |

The next two sections zoom in on the ones you'll watch most: the context bar and everything else.`,
    },
    {
      id: 'context-color',
      title: 'The Context Bar and Its Colors',
      content: `Segment 2 is the one to watch. Claude has a fixed amount of **context** — its working memory for the current conversation. The bar fills as you talk, and it changes color as a warning:

| Color | Roughly | What it means |
|-------|---------|---------------|
| Green | under 50% | Plenty of room — keep going |
| Yellow | mid-range | Getting full — wrap up the current task soon |
| Red | near the top | Nearly out — compact or clear before continuing |

When it goes yellow, finish the thought you're on. When it goes red, run \`/compact\` (summarizes the conversation and keeps going) or \`/wrap-up\` then \`/clear\` (saves your place and starts fresh). Ignore red and Claude starts forgetting the earliest parts of your conversation.`,
      tip: "Hitting red often on one task usually means the task is too big for one session. Break it into smaller pieces and /wrap-up between them — each fresh session starts with a full, green context bar.",
    },
    {
      id: 'reading-day-to-day',
      title: 'Reading the Other Segments',
      content: `The remaining segments tell you *where* and *how much*:

• **Model** — confirms which brain you're using. Heavier models are stronger but fill context faster; a glance here explains why the bar is climbing quickly.

• **Git branch** — \`main\` alone means everything's saved; \`main*\` (with the asterisk) means you have changes that aren't committed yet. The asterisk is your reminder to \`/commit\` or \`/push\`.

• **Project** — which folder Claude is operating in. If this shows the wrong project, you started Claude Code in the wrong place — quit, \`cd\` to the right folder, and relaunch.

• **Prompt counter** — the \`✎ N\` shows how many messages you've sent this session. A rough sense of how long you've been going.

• **Grill gauge** — the \`🎯 N%\` appears if you've used the \`/grill-me\` planning skill. It shows how aligned you and Claude are on the plan. Higher means you're closer to ready to build.`,
      analogy: "Reading the status line is like a pilot's instrument scan — a quick left-to-right sweep, not a stare. Fuel (context), heading (branch), position (project). All green, carry on.",
    },
  ],
  nextSteps: [
    { to: '/guides/install-toolkit', label: 'Install the toolkit (adds the status line)' },
    { to: '/guides/getting-started', label: 'Getting started with Claude Code' },
    { to: '/course', label: 'Take the full course' },
  ],
};
