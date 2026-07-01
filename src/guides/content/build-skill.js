// Guide: Build Your Own Skill. Authored content.
export default {
  slug: "build-skill",
  title: "Build Your Own Skill",
  difficulty: "Advanced",
  readTime: "12 min",
  updated: '2026-07-01',
  summary: "Turn a task you keep re-explaining into a SKILL.md — a saved instruction set Claude Code triggers by name, or on its own when it recognizes the moment.",
  sections: [
    {
      id: 'what-is-a-skill',
      title: 'What a skill actually is',
      content: `A **skill** is one Markdown file, \`SKILL.md\`, that teaches Claude Code how to do a single repeatable task the way you want it done. Nothing more exotic than that — it's plain English with a short header.

The problem it solves: you find yourself typing the same five-paragraph request every week — *"review my changes for bugs, check for exposed secrets, don't nitpick formatting, end with a verdict."* A skill captures that once. After that you trigger it by name and it runs identically every time.

Two ways it fires:

• **You call it** — type \`/review\` or say "review this."
• **Claude calls it** — Claude reads the skill's \`description\`, recognizes that the current moment matches, and runs it without being asked.

That second mode is the whole point. A good skill isn't just a shortcut you invoke; it's a capability Claude reaches for on its own at the right time.`,
      analogy: "A skill is a saved recipe card. You worked out the perfect method once — now you don't re-derive it every time, you say the name and it comes out the same. The difference from a recipe: a good cook here also knows *when* to make the dish without being told.",
    },
    {
      id: 'where-skills-live',
      title: 'Where skills live',
      content: `A skill is a folder named after the skill, containing a \`SKILL.md\`. Where you put that folder decides who can use it.

| Location | Scope | Use for |
|----------|-------|---------|
| \`~/.claude/skills/<name>/SKILL.md\` | Every project on your machine | Personal workflow — commit, wrap-up, your review checklist |
| \`.claude/skills/<name>/SKILL.md\` | Only this project (committed to the repo) | Team conventions, project-specific build/deploy steps |

The folder name is the skill's identity. A folder called \`release-notes\` becomes the \`/release-notes\` command.

\`\`\`
~/.claude/skills/
  release-notes/
    SKILL.md          the instructions
your-project/.claude/skills/
  deploy-checklist/
    SKILL.md          shared with everyone who clones the repo
\`\`\`

Project skills win when both exist with the same name — the local repo can override your personal default.`,
    },
    {
      id: 'the-frontmatter',
      title: 'The frontmatter: name + description',
      content: `Every \`SKILL.md\` opens with a small YAML header between \`---\` fences. Two fields carry the weight:

\`\`\`
---
name: release-notes
description: Summarize commits since the last tag into a clean changelog. Use when the user says "release notes", "changelog", or "what changed since the last release".
---
\`\`\`

**\`name\`** — must match the folder. This is what you type after the slash.

**\`description\`** — this is the single most important line in the file. It is the **trigger signal**: Claude reads it to decide whether the current situation calls for this skill. Write it for a matcher, not for a brochure.

A strong description does two things: says *what the skill does* in one clause, then names *when to reach for it* — the literal phrases and situations. Vague descriptions never fire on their own; specific ones do.

| Weak | Strong |
|------|--------|
| \`description: Helps with releases.\` | \`description: Summarize commits since the last tag into a changelog. Use when the user says "release notes" or "what changed".\` |

You can add an optional \`allowed-tools:\` line to restrict what the skill may touch (e.g. \`allowed-tools: Bash, Read, Edit\`) — useful for a read-only skill that should never write files.`,
      tip: "Test your description by asking: if I never typed the slash command, would Claude know to run this from the description alone? If not, add the trigger phrases and the situation. Description quality is the difference between a skill you have to remember and one that remembers for you.",
    },
    {
      id: 'the-body',
      title: 'Writing the body',
      content: `Below the frontmatter is the instruction set — plain English, written the way you'd brief a sharp new hire. Four principles make a body reliable:

1. **Number the procedure.** Ordered steps run more consistently than a paragraph. "First find the tag, then list the commits, then group them."
2. **Bold the don'ts.** Guardrails you write as **Never** stand out and get followed. "**Never** include commits that touch \`.env\`."
3. **End with verification.** Tell Claude how to prove it worked — show a diff, run the tests, wait for your OK before writing.
4. **Keep it to one task.** If a skill is doing three unrelated jobs, it's three skills. One responsibility each; they compose.

Keep it short. A skill body is usually 15-40 lines. If it sprawls past a screen, you're probably describing a workflow that wants to be split.`,
    },
    {
      id: 'worked-example',
      title: 'A full worked example',
      content: `Here's a complete, safe skill end to end — turning git history into a changelog.

\`\`\`
---
name: release-notes
description: Summarize commits since the last tag into a clean changelog. Use when the user says "release notes", "changelog", or "what changed since the last release".
allowed-tools: Bash, Read, Edit
---

# Release Notes

Turn the commits since the last git tag into a human-readable changelog.

## Steps
1. Find the last tag: run git describe --tags --abbrev=0.
2. List commits since it: git log <tag>..HEAD --oneline.
3. Group each commit under Features, Fixes, or Chores by reading its message.
4. Draft a new dated section for CHANGELOG.md.

## Never
- Never invent a change that isn't in the log.
- Never include commits that only touch .env or secrets.

## Verify
Show me the diff of CHANGELOG.md and wait for my OK before saving.
\`\`\`

Now \`/release-notes\` — or "draft the changelog" — runs those exact steps every time. Notice the shape: trigger-rich description, numbered procedure, bolded guardrails, an explicit verify-then-stop. That skeleton transfers to almost any skill you'll write.`,
    },
    {
      id: 'let-claude-write-it',
      title: "Let Claude write the first draft",
      content: `You rarely start from a blank file. The fastest way to make a skill is to ask Claude Code for one:

*"Create a skill that summarizes my commits since the last tag into a changelog. It should never include secret files, and it should show me the diff before saving."*

Claude writes the folder, the frontmatter, and the body. You read it, tighten the description, and ship. Then you refine it in place the next few times you run it — that's where skills actually get good.

The trigger for building a new skill is simple: **the third time you type roughly the same request, turn it into a skill.** Skills are just your own repetition, captured and named.`,
      tip: "The starter toolkit ships a proven set to learn from and copy — /commit, /push, /pickup, /wrap-up, /test and more. Open any of their SKILL.md files to see real descriptions and bodies before you write your own.",
    },
    {
      id: 'common-mistakes',
      title: 'Common mistakes',
      content: `The failure modes are predictable — avoid these four and most of your skills will work first try.

| Mistake | Why it hurts | Fix |
|---------|--------------|-----|
| Brochure description | Skill never auto-fires; you have to remember it | Write the trigger phrases and the situation into \`description\` |
| Mega-skill | One file trying to do five jobs runs inconsistently | Split into one skill per task; let them compose |
| No verification step | Claude "finishes" without proving it worked | End the body with a diff, a test, or a wait-for-OK |
| Silent destructive actions | A skill that deletes or force-pushes with no guardrail | **Bold the Never** rules; require confirmation for irreversible steps |

The through-line: a skill is a small, single-purpose instruction that a fresh reader could follow exactly. Write it for that reader.`,
    },
  ],
  nextSteps: [
    { to: '/guides/subagents', label: 'Delegating to Agents' },
    { to: '/guides/hooks', label: 'Automate with Hooks' },
    { to: '/explore', label: 'Browse the starter skills' },
  ],
};
