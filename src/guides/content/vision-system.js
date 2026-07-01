// Guide: The Vision System. Authored content.
export default {
  slug: "vision-system",
  title: "The Vision System",
  difficulty: "Concept",
  readTime: "8 min",
  updated: '2026-07-01',
  summary: "VISION.md encodes your judgment — the trade-offs, constraints, and escalation triggers — so Claude stops guessing what \"good\" means. EVAL.md checks it's still holding.",
  sections: [
    {
      id: 'the-intent-gap',
      title: 'The intent resolution gap',
      content: `You hold a rich mental picture of what you're building — how it should feel, what you'd never ship, where "good enough" actually is. Claude Code sees only the flat text you typed. The distance between those two is the **intent resolution gap**, and it's where most bad AI output comes from: Claude confidently builds the wrong thing because it filled the gap with a guess.

**VISION.md** is a document that closes that gap. It's not a spec of features — it's a written copy of your *judgment*: how you make trade-offs, what must never happen, and which decisions Claude should never make without asking. When Claude hits an ambiguous call, it reads VISION.md instead of guessing.

The move here has a name — **intent engineering**: investing a little up front to make your standards legible, so every downstream decision inherits them.`,
      analogy: "Working without a VISION.md is like briefing a contractor with 'build me a nice kitchen' and leaving for a month. They'll build *a* kitchen — just not yours. VISION.md is the design brief that says 'we cook every day, so counter space beats an island; never block the window.' Now their hundred small decisions match yours. Where it leaks: a brief is static; VISION.md is meant to be revised as your taste sharpens.",
    },
    {
      id: 'vision-vs-claude',
      title: 'VISION.md vs CLAUDE.md',
      content: `You already met CLAUDE.md — the file of operational rules Claude reads automatically. VISION.md sits right beside it, and the split is clean:

| | CLAUDE.md | VISION.md |
|---|-----------|-----------|
| Answers | **How** to work | **Why** you're building, what success is |
| Contains | Commands, conventions, file paths, process | Trade-offs, constraints, quality bar, escalation triggers |
| Nature | Mechanical, factual | Judgment, intent |
| Changes when | Your tooling changes | Your taste or priorities sharpen |

Both override Claude's default instincts when they conflict. Think of CLAUDE.md as the operating manual and VISION.md as the design intent — you want both, and they rarely disagree because they answer different questions.`,
    },
    {
      id: 'whats-in-vision',
      title: "What's inside VISION.md",
      content: `A VISION.md is short — under 150 lines, on purpose. If it's longer, some of it is really reference material that belongs in CONTEXT.md. Five sections carry it:

| Section | Captures |
|---------|----------|
| **Core Identity** | Purpose, the specific target user, how it should feel to use |
| **Decision Framework** | Your trade-off rules, written as "X over Y" |
| **Constraint Architecture** | Musts, Must-Nots, Preferences, Escalation Triggers |
| **Acceptance Criteria** | What "done" means, and the gap between "works" and "right" |
| **Decomposition Patterns** | How you like work broken up and sequenced |

The two that pay off most are **Decision Framework** and **Constraint Architecture** — those are what Claude actually consults on an ambiguous call. Spend your care there.`,
    },
    {
      id: 'framework-and-constraints',
      title: 'The framework and the constraints',
      content: `The **Decision Framework** is a set of tiebreakers written as "X over Y" — so when two valid approaches conflict, Claude knows which way you lean and why:

\`\`\`
## Decision Framework
Simplicity over flexibility — until a second real use case appears.
Speed over polish for internal tools; polish over speed for anything a customer sees.
When in doubt: ship the smallest thing that could work, then iterate.
\`\`\`

The **Constraint Architecture** is four lists that turn fuzzy standards into checkable rules:

\`\`\`
## Constraint Architecture
### Musts
- Every form field validates before submit.

### Must-Nots
- Never expose an API key in client-side code.

### Preferences
- Default to server components unless interactivity requires otherwise.

### Escalation Triggers
- Never change the database schema without asking.
- Never delete user data as part of a "cleanup".
\`\`\`

**Escalation Triggers are the safety rail** — the decisions Claude must always bring to you rather than make alone. Write these first; they're what stop an autonomous session from doing something irreversible.`,
    },
    {
      id: 'confidence-tiers',
      title: 'How Claude uses it: confidence tiers',
      content: `VISION.md only helps if Claude consults it at the right moment. The mechanism is a simple confidence check on every ambiguous decision:

| Confidence | When | Claude does |
|------------|------|-------------|
| **High** | VISION.md clearly covers this | Proceeds, notes the decision briefly |
| **Medium** | Partially covered, needs inference | Proceeds but flags it for you |
| **Low** | Not covered, or an Escalation Trigger applies | **Stops and asks** |

This is the payoff of writing the doc well: the clearer your VISION.md, the more decisions land in "High" and just get made correctly — and the ones that genuinely need you surface as "Low" instead of becoming a silent wrong guess. The gap shrinks over time as you fill in what the "Low" moments revealed.`,
    },
    {
      id: 'eval-md',
      title: 'EVAL.md — keeping the vision honest',
      content: `A vision doc drifts. You make decisions that contradict it, or your taste moves and the doc doesn't. **EVAL.md** is the periodic alignment check that catches that drift.

It's a checklist you run every ~10 sessions (or biweekly) in a dedicated session — not mid-build. You trigger it by saying "run eval," and it walks you through:

1. Read the last ~10 progress entries and the decisions made.
2. Were the **Musts** all satisfied? Any **Must-Nots** violated? Any **Escalation Triggers** bypassed?
3. Did recent decisions actually match the Decision Framework?
4. Is the intent resolution gap shrinking, stable, or growing?
5. Update VISION.md with anything you've learned; cut any rule that never once fired.

The loop is the point: VISION.md guides the work, EVAL.md checks the guidance, and the doc gets sharper each cycle. A rule that never fires in ten sessions is noise — delete it.`,
    },
    {
      id: 'init-vision',
      title: 'Scaffolding it with /init-vision',
      content: `You don't hand-write these from scratch. The \`/init-vision\` skill builds them for you:

1. It **silently explores** your codebase and existing docs first, so its questions are informed.
2. It runs a **brain dump** — "tell me everything about this project" — then a short **gap-filling interview** for the trade-offs and constraints you didn't cover.
3. It generates three files: **VISION.md** (intent), **EVAL.md** (the check), and a project **CLAUDE.md** snippet that wires the confidence-tier behavior into every session.

Run it at project kickoff, or drop it into an existing project when you notice Claude keeps guessing wrong about what "good" means here. The whole system is just this: make your judgment legible once, then let every decision inherit it.`,
      tip: "Keep VISION.md under 150 lines and make every line earn its place — if removing a line wouldn't lead to a worse decision, cut it. A tight vision doc gets read and used; a bloated one gets skimmed and ignored, which is worse than not having one.",
    },
  ],
  nextSteps: [
    { to: '/guides/claude-md', label: 'Writing a CLAUDE.md' },
    { to: '/guides/subagents', label: 'Delegating to Agents' },
    { to: '/course/putting-it-together', label: 'Course: The Operator Workflow' },
  ],
};
