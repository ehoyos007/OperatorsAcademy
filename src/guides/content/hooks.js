// Guide: Automate with Hooks. Authored content.
export default {
  slug: "hooks",
  title: "Automate with Hooks",
  difficulty: "Advanced",
  readTime: "12 min",
  updated: '2026-07-01',
  summary: "Wire small scripts to events — session start, before a tool runs, on stop — so your setup, guardrails, and logging happen automatically instead of on memory.",
  sections: [
    {
      id: 'what-hooks-are',
      title: 'What hooks are',
      content: `Skills and agents wait for you to trigger them. **Hooks** don't — they fire automatically when something happens in a session. No command, no prompt.

A hook is just a small script wired to an **event**. When the event happens, Claude Code runs your script, hands it some JSON about what's going on, and lets it react: load context, block a risky action, format a file, log what happened.

This is the closest thing in your workflow to "runs while you're not looking," except it lives right inside Claude Code instead of a separate automation app. The trade: a hook fires every time its event fires, so a badly-scoped one is a papercut you'll feel constantly. Start small and read-only.`,
      analogy: "Hooks are motion-sensor lights. You don't flip a switch — you walk into the room and the light is already on. The event (you arriving) triggers the action. Where it leaks: a light does one harmless thing; a hook can also block you, so some hooks need more care than a light switch.",
    },
    {
      id: 'where-hooks-live',
      title: 'Where hooks are configured',
      content: `Hooks are registered in a \`settings.json\` file, under a top-level \`"hooks"\` key. Where you put it decides scope:

| File | Scope |
|------|-------|
| \`~/.claude/settings.json\` | Global — every project on your machine |
| \`.claude/settings.json\` | This project, committed and shared with the team |
| \`.claude/settings.local.json\` | This project, personal and gitignored |

The scripts themselves usually live in \`~/.claude/hooks/\` (global) or \`.claude/hooks/\` (project) — but they can be any executable command. The \`settings.json\` just points at them.`,
    },
    {
      id: 'the-events',
      title: 'The events you can hook',
      content: `Six events cover the session lifecycle. Each fires at a different moment:

| Event | Fires when | Example use |
|-------|-----------|-------------|
| **SessionStart** | A new session opens | Load project docs; check for missing files |
| **UserPromptSubmit** | You send a message | Inject the current state or a reminder into the prompt |
| **PreToolUse** | Before a tool runs | Block a dangerous command; require review before deploy |
| **PostToolUse** | After a tool runs | Auto-format an edited file; kick off a background review |
| **Stop** | The session ends | Log what happened; save a handoff note |
| **PreCompact** | Before the conversation is summarized | Persist state that shouldn't get lost in compaction |

**PreToolUse** and **PostToolUse** are the powerful pair — they wrap every action Claude takes. The other four are lifecycle bookends.`,
    },
    {
      id: 'the-json-shape',
      title: 'The JSON structure',
      content: `Every hook config follows the same nesting: **event → matcher → hooks array → command**. Here's a real one that runs a doc check when a session starts and a logger when it ends:

\`\`\`
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/auto-init-check.sh",
            "timeout": 5000
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          { "type": "command", "command": "bash ~/.claude/hooks/session-logger.sh" }
        ]
      }
    ]
  }
}
\`\`\`

The pieces:

• **matcher** — a pattern deciding which cases fire. For \`PreToolUse\`/\`PostToolUse\` it matches the tool name (e.g. \`"Edit|Write"\`). For lifecycle events like \`SessionStart\` and \`Stop\` there's no tool to match, so it's an empty string \`""\` — meaning "always."
• **hooks** — an array, so you can run several commands on one event.
• **type / command** — \`"command"\` runs a shell command. \`timeout\` (milliseconds) is optional.

Your script receives a JSON blob on **stdin** describing the event — the working directory, session id, and for tool events the tool name and its input. Read it with \`jq\`. Exit \`0\` to stay silent; exit non-zero to surface a message back to Claude (and, for \`PreToolUse\`, to block the action).`,
    },
    {
      id: 'example-session-start',
      title: 'Example: check project docs on start',
      content: `A \`SessionStart\` hook that verifies your project has its documentation files and nudges Claude to create them if not. You never think about it — it just happens every time you open the project.

\`\`\`
#!/bin/bash
# reads the event JSON from stdin
input=$(cat)
cwd=$(echo "$input" | jq -r '.cwd // empty')

# bail if we're not in a real project
[ -f "$cwd/package.json" ] || exit 0

# check for a couple of key docs
missing=""
for doc in CONTEXT.md VISION.md; do
  [ -f "$cwd/$doc" ] || missing="$missing $doc"
done

[ -z "$missing" ] && exit 0

echo "Missing docs:$missing. Offer to run /auto-init." >&2
exit 2
\`\`\`

The pattern to notice: read stdin JSON with \`jq\`, decide, and either exit \`0\` (silent) or exit \`2\` with a message on stderr that Claude reads. That exit-2-with-stderr trick is how a hook talks back.`,
    },
    {
      id: 'example-post-tool',
      title: 'Example: auto-format after every edit',
      content: `A \`PostToolUse\` hook that formats a file the moment Claude edits it — so your codebase stays clean without you ever running the formatter by hand.

\`\`\`
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "bash ~/.claude/hooks/format-edited.sh" }
        ]
      }
    ]
  }
}
\`\`\`

The \`matcher\` here is \`"Edit|Write"\` — the hook only fires after those two tools, not on reads or searches. The script pulls the edited file's path out of the stdin JSON and runs your formatter on it:

\`\`\`
#!/bin/bash
file=$(cat | jq -r '.tool_input.file_path // empty')
[ -n "$file" ] && npx prettier --write "$file"
\`\`\`

Same shape as before: read stdin, act. This is the everyday workhorse — a small quality step that runs itself.`,
    },
    {
      id: 'debugging',
      title: 'Debugging hooks',
      content: `Hooks fail quietly by design, so a few habits save a lot of confusion:

1. **Run your script by hand first.** Pipe it fake input: \`echo '{"cwd":"/tmp"}' | bash my-hook.sh\`. If it works there, the wiring is the only variable left.
2. **Watch them fire with \`claude --debug\`.** It logs each hook as it runs, so you can see whether the matcher matched and what the command returned.
3. **Check the matcher.** A \`PostToolUse\` hook that never fires usually has a matcher that doesn't match the tool name. Empty string means always; a regex must match.
4. **Mind the exit code.** Exit \`0\` = silent success. Non-zero surfaces stderr to Claude and can block a \`PreToolUse\` action — occasionally what you want, occasionally a footgun.`,
      tip: "Start with read-only lifecycle hooks — SessionStart and Stop — before you write a PreToolUse hook that blocks commands. Blocking hooks are genuinely useful ('don't deploy with failing tests') but they're also powerful enough to stop you from shipping by mistake. Earn trust with the harmless ones first.",
    },
  ],
  nextSteps: [
    { to: '/guides/subagents', label: 'Delegating to Agents' },
    { to: '/guides/build-skill', label: 'Build Your Own Skill' },
    { to: '/course/building-blocks', label: 'Course: Skills, Agents & Hooks' },
  ],
};
