// Guide: Using Plan Mode Well. Authored content.
export default {
  slug: "plan-mode",
  title: "Using Plan Mode Well",
  difficulty: "Practical",
  readTime: "8 min",
  updated: '2026-07-01',
  summary: "Make Claude show its plan before it touches your code — how to turn it on, what a good plan contains, and what to check before you approve.",
  sections: [
    {
      id: 'why',
      title: 'Why Plan Before Build',
      content: `Plan mode makes Claude Code stop and think out loud before it touches a single file. It reads your code, researches the approach, and hands you a plan — then waits for your go-ahead before making any change.

The reason is simple math. Five minutes reading a plan is cheaper than an hour watching Claude confidently build the wrong thing and then unwinding it. Planning front-loads the thinking you'd otherwise pay for in rework.`,
      analogy: "Measure twice, cut once — plan mode is the measuring. Where it leaks: a carpenter's cut is one action, but Claude's plan spans many files and assumptions, so you review the whole plan, not just the first step.",
    },
    {
      id: 'toggle',
      title: 'How to Turn It On',
      content: `There are two ways in.

**Press Shift+Tab** to cycle Claude Code's input modes. One of them is plan mode — cycle until you see it. In plan mode Claude reads and researches freely but makes no edits until you approve.

**Or just ask.** "Don't write anything yet — give me a plan first" puts Claude in the same posture without touching a key combo.

When Claude presents the plan, you either approve it (and it switches to building) or send it back with corrections. Nothing changes on disk until you say go.`,
      tip: "Shift+Tab cycles through the modes — normal, auto-accept edits, and plan. If you overshoot the one you want, keep pressing; it loops back around.",
    },
    {
      id: 'good-plan',
      title: 'What a Good Plan Contains',
      content: `A plan worth trusting spells out five things. If any are missing or wrong, that's your signal to push back before code gets written.

| Part of the plan | What you're checking |
|------------------|----------------------|
| Context | It restated your goal correctly. If it misread you, stop here — nothing downstream will be right. |
| Files to modify | The actual paths it'll touch, with nothing surprising in the list. |
| Per-file changes | Concretely what changes in each file — not just "update the component." |
| Assumptions | The guesses it's making. This is the riskiest part and the most valuable to read. |
| Verification | How it'll prove the change works — tests, a build, a manual check. |

A plan that skips assumptions and verification isn't a plan — it's a to-do list. Ask for both.`,
    },
    {
      id: 'when',
      title: 'When to Use It, When to Skip',
      content: `Plan mode is a dial, not a default for everything. Match it to the blast radius.

| Use plan mode when | Skip it when |
|--------------------|--------------|
| The change spans several files | It's a one-line fix |
| You don't know the codebase yet | You fully understand the task |
| The change is hard to undo | It's reversible and low-stakes |
| You're unsure of the approach | It's a copy tweak, rename, or new field |

The rule of thumb: the more a mistake would cost, the more you want the plan first.`,
    },
    {
      id: 'review',
      title: 'Reviewing the Plan',
      content: `Reviewing a plan is four quick questions:

1. **Does it match what I asked?** Read the context back. If Claude understood the goal differently than you meant it, fix that now.

2. **Are the files right?** An unexpected path in the list often means Claude is about to touch something it shouldn't.

3. **Is any assumption wrong?** This is where you earn the whole exercise — catching an "I'll assume X" where you know X is false.

4. **Is the verification real?** "I'll check it builds" is a plan. "It should work" is not.

Any "no" means send it back. Correcting a plan costs a sentence; correcting shipped code costs a session.`,
      tip: "The single highest-value moment in plan mode is catching a bad assumption. Reading 'I'll assume the API returns a list' and knowing it returns a single object saves the entire build that would've been wrong.",
    },
    {
      id: 'misconceptions',
      title: 'Misconceptions',
      content: `A few things plan mode is not:

• **It doesn't write a plan file.** The plan is a proposal in the conversation; approving it lets Claude proceed. If you want a durable, saved plan document, that's PLAN.md — a different thing entirely (see the memory guide).

• **A plan doesn't mean no more decisions.** You still steer during the build. The plan just front-loads the big calls so the small ones go faster.

• **Planning doesn't slow you down.** It moves the thinking earlier, where it's cheap, instead of later, where it's rework.`,
    },
  ],
  nextSteps: [
    { to: '/guides/shipping-workflow', label: 'The Shipping Workflow' },
    { to: '/guides/claude-md', label: 'Writing a CLAUDE.md That Works' },
    { to: '/course/putting-it-together', label: 'Module 4: The Operator Workflow' },
  ],
};
