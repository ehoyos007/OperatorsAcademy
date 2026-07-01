// Guide: How Claude Remembers. Authored content.
export default {
  slug: "memory",
  title: "How Claude Remembers",
  difficulty: "Practical",
  readTime: "8 min",
  updated: '2026-07-01',
  summary: "The doc system, /pickup, and wrap-up that let Claude carry your project across sessions — so you never re-explain where you left off.",
  sections: [
    {
      id: 'fresh-start',
      title: 'Every Session Starts Fresh',
      content: `Get this straight first: Claude Code does not remember your last session's conversation. Open it tomorrow and the discussion you had today is gone. What it *does* do automatically is re-read CLAUDE.md — but that's your standing brief, not the play-by-play of where you left off.

So how does an operator pick up exactly where they stopped, with no re-explaining? By writing the important stuff to disk. Memory that survives isn't in the conversation — it's in files.`,
      analogy: "Claude is a brilliant contractor with no memory of yesterday — sharp on arrival, but you'd re-brief them every morning. The doc system is the notebook they read the moment they walk in. Where it leaks: a real contractor could ask you what happened; Claude only knows what's written down. If it's not in a file, it's gone.",
    },
    {
      id: 'doc-system',
      title: 'The 8-File Doc System',
      content: `Operators Academy's answer is eight plain-markdown files at your project root. Each owns one kind of memory:

| File | What it holds | Think of it as |
|------|---------------|----------------|
| CONTEXT.md | Domain knowledge, background, glossary | The project wiki |
| TASKS.md | What's active, done, and next | A to-do board |
| PLAN.md | The strategy for a feature | The blueprint |
| PROGRESS.md | A session-by-session log | The flight log |
| TEST_LOG.md | What was tested and what broke | The lab notebook |
| BRAIN.md | Decisions and the reasons behind them | The decision journal |
| VISION.md | Why the project exists and its hard limits | The north star |
| CLAUDE.md | How to work in this repo | The standing brief |

They're just files. You can open, read, and edit any of them yourself — nothing is hidden.`,
    },
    {
      id: 'pickup-wrapup',
      title: 'The Two Skills That Move Memory',
      content: `You don't update eight files by hand. Two skills do it for you, and together they close the loop.

**wrap up** — at the end of a session. It writes what happened into the docs and leaves a handoff note for next time. No git, no shipping — just saving state.

**/pickup** — at the start of the next session. It reads the docs, the handoff note, and your git status, then briefs both you and Claude on where you left off and what's next.

\`\`\`
# ending a session
wrap up

# starting the next one
/pickup
\`\`\`

wrap-up writes; pickup reads. Run them as bookends and you never re-explain your project.`,
      analogy: "A flight crew's logbook. The pilot landing writes down what happened; the next pilot reads it before takeoff. Neither one re-derives the flight from scratch — wrap-up is the landing entry, pickup is the pre-flight read.",
    },
    {
      id: 'what-goes-where',
      title: 'What Goes in Each Doc',
      content: `When something's worth keeping, it usually has an obvious home:

• A decision **and why you made it** goes in BRAIN.md. ("Chose Supabase over Firebase because we needed row-level security.") The *why* is the part you'll forget.

• Something you'd have to re-explain next week goes in CONTEXT.md.

• The next concrete step goes in TASKS.md.

• A constraint that must never be broken goes in VISION.md.

• What you actually did this session goes in PROGRESS.md — usually written for you by wrap-up.`,
      tip: "The reason behind a decision is the highest-value thing to write down. Next week you'll remember what you chose; you won't remember why you ruled out the alternative. Capture the why.",
    },
    {
      id: 'what-not',
      title: 'What NOT to Persist',
      content: `Just as important is what you keep *out* of the docs:

• **Anything the code already says.** Claude can read your files. Don't transcribe the folder tree or restate what a function does — spend the docs on what the code can't tell you.

• **Secrets.** API keys, tokens, passwords — never in a tracked doc. Ever.

• **Play-by-play.** The docs are for what matters next week, not a keystroke log of every edit.

• **Duplicates.** One fact, one home. The same detail in three files is three things to keep in sync — and two of them will drift.`,
      tip: "Unsure whether something belongs in a doc? Ask: would future-me, or Claude, need this and be unable to work it out from the code? If no, leave it out.",
    },
    {
      id: 'context-vs-memory',
      title: 'Context Window vs. Saved Memory',
      content: `One last distinction, because it trips people up. Two different things both get called "memory":

• **The context window** is Claude's working memory *during* a session — everything in the current conversation. It's finite. \`/compact\` summarizes it to free room; \`/clear\` wipes it to start fresh.

• **The doc system** is durable memory *across* sessions. It lives in files and survives anything you do to the conversation.

That's exactly why the order matters: \`/clear\` erases the conversation but not the docs — so if you wrap up first, the important context is already saved to disk before you wipe the chat.`,
      tip: "Always wrap up before /clear. Clearing a session you haven't saved is the one reliable way to actually lose work — everything that lived only in the conversation goes with it.",
    },
  ],
  nextSteps: [
    { to: '/guides/shipping-workflow', label: 'The Shipping Workflow' },
    { to: '/guides/claude-md', label: 'Writing a CLAUDE.md That Works' },
    { to: '/course/project-system', label: 'Appendix: Project Startup System' },
  ],
};
