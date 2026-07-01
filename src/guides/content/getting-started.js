// Guide: Getting Started with Claude Code. Authored content — replace the placeholder section.
export default {
  slug: "getting-started",
  title: "Getting Started with Claude Code",
  difficulty: "Beginner",
  readTime: "12 min",
  updated: '2026-07-01',
  summary: "Install Claude Code, log in, and make your first real change — the ground floor for everything else.",
  sections: [
    {
      id: 'what-is-claude-code',
      title: 'What Claude Code Actually Is',
      content: `**Claude Code is an AI that works in your terminal.** It reads and writes the real files on your computer, runs commands, and ships working software. You direct; it types.

Where the chat app at claude.ai *talks about* your work, Claude Code *does* it — creates folders, edits files, installs what it needs, runs your project.

This guide takes you from nothing installed to your first real change, in one sitting. No coding experience required.`,
      analogy: "The chat app is a consultant on a phone call — great advice, but you still do the work. Claude Code is a contractor with keys to the building — it actually builds the thing.",
    },
    {
      id: 'prerequisites',
      title: 'What You Need First',
      content: `Two things, and that's it:

• **A paid Claude plan.** Claude Code is not on the free tier. *Claude Pro* ($20/month) is the cheapest way in; *Max* ($100–200/month) gives far more usage if you build daily. One subscription covers both the chat app and Claude Code.

• **A terminal.** Every computer already has one — nothing to install. On Mac, press Cmd + Space and type "Terminal". On Windows, press the Win key and type "Terminal". On Linux, press Ctrl + Alt + T.

No other software, no Node.js, no setup.`,
      tip: "No paid plan yet? Start free at claude.ai to get comfortable with Claude, then upgrade to Pro when you're ready to build. The same login works for both.",
    },
    {
      id: 'install',
      title: 'Install It (Pick Your OS)',
      content: `Claude Code ships a **native installer** — one command, no extra tooling. Paste the line for your operating system into your terminal.

**Mac and Linux**
\`\`\`
curl -fsSL https://claude.ai/install.sh | bash
\`\`\`

**Windows (PowerShell)**
\`\`\`
irm https://claude.ai/install.ps1 | iex
\`\`\`

The installer downloads Claude Code and adds a \`claude\` command to your system. When it finishes, **fully close your terminal and open a new window** so it picks up the new command.`,
      tip: "On Windows, PowerShell is the terminal whose prompt starts with \"PS\". If irm gives an error, you may be in the older Command Prompt — open Windows Terminal or PowerShell and try again.",
    },
    {
      id: 'first-login',
      title: 'Log In',
      content: `With a fresh terminal window open, start Claude Code by typing its name:
\`\`\`
claude
\`\`\`

A browser window opens. Log in with the same Claude account as your Pro or Max plan. If the browser doesn't open on its own, press \`c\` to copy the login link and paste it into your browser.

To confirm it installed correctly:
\`\`\`
claude --version
\`\`\`

A version number means you're in. If the command "isn't found," close the terminal completely and open a new window — the installer adds \`claude\` to your PATH, and a fresh window picks it up.`,
    },
    {
      id: 'first-session',
      title: 'Your First Change',
      content: `Claude Code works best when you start it *inside* a project folder — that way it can see and edit your files. Point your terminal at a folder, then launch:
\`\`\`
cd ~/Projects/my-first-app
claude
\`\`\`

If the folder doesn't exist yet, make it first with \`mkdir ~/Projects/my-first-app\`.

Now just talk to it in plain English. Your first change can be tiny:

1. Type: *"Create a simple index.html with a headline that says Hello, Operator."*
2. Claude Code writes the file and tells you what it did.
3. Type: *"Open it in my browser so I can see it."*
4. Ask for a tweak: *"Make the headline blue and centered."*

You just changed real files without writing a line of code. That's the whole loop — everything else is a bigger version of this.`,
      analogy: "Starting Claude Code inside a folder is like walking a new assistant into the right room. Do it in the wrong folder and they can't see the files you mean.",
    },
    {
      id: 'essential-commands',
      title: 'Essential Commands',
      content: `Type \`/\` in Claude Code to see every command. These are the ones you'll reach for first:

| Command | What it does |
|---------|--------------|
| \`/init\` | Scans your project and sets up a CLAUDE.md so Claude remembers how it works |
| \`/clear\` | Clears the conversation to start a fresh task (keeps your settings) |
| \`/compact\` | Summarizes a long conversation to free up memory and keep going |
| \`/context\` | Shows how much of Claude's working memory is in use |
| \`/resume\` | Reopens a previous session where you left off |
| \`/doctor\` | Diagnoses setup problems |
| \`/help\` | Lists commands and shortcuts |

You don't have to memorize these — typing \`/\` always shows the menu.`,
      tip: "Press Escape to interrupt Claude mid-task if it heads down the wrong path — then just retype what you actually meant. You won't break anything.",
    },
    {
      id: 'beginner-tips',
      title: 'Habits for Week One',
      content: `A few habits that make the first week smoother:

• **Plan before you build.** Ask for the approach first — *"before writing anything, tell me how you'd build this."* Five minutes of planning saves an hour of confidently-wrong code.

• **One folder per project.** Keep each app in its own folder under \`~/Projects\`, and start Claude Code from inside it.

• **Talk in plain English.** *"The button's in the wrong spot"* is a perfectly good instruction. You don't need technical words.

• **Small steps beat big leaps.** Ask for one change, look at it, then ask for the next. Easier to steer than one giant request.

• **You can't really break anything.** Your files are saved as you go, and Claude Code shows you what it changed. When in doubt, ask it to undo.`,
      analogy: "Your first session is like learning to drive an automatic — a few controls, lots of caution, and it clicks fast. By the third project it's muscle memory.",
    },
  ],
  nextSteps: [
    { to: '/guides/types-explained', label: 'Skills vs Agents vs Hooks vs MCP' },
    { to: '/guides/install-toolkit', label: 'Install the workflow toolkit' },
    { to: '/course', label: 'Take the full course' },
  ],
};
