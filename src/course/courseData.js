import { Home, Cpu, Terminal, Blocks, Link2, Bot, FileText } from 'lucide-react';

export const moduleRoutes = [
  { key: 'introduction', slug: '', label: 'Start Here', navLabel: 'What is an Operator?' },
  { key: 'module1', slug: 'claude-ai', label: 'Module 1: Claude', navLabel: 'Claude (Thinking Partner)' },
  { key: 'module2', slug: 'claude-code', label: 'Module 2: Claude Code', navLabel: 'Claude Code' },
  { key: 'module3', slug: 'building-blocks', label: 'Module 3: Skills, Agents & Hooks', navLabel: 'Skills, Agents & Hooks' },
  { key: 'module4', slug: 'putting-it-together', label: 'Module 4: The Operator Workflow', navLabel: 'The Operator Workflow' },
  { key: 'module6', slug: 'openclaw', label: 'Module 5: OpenClaw', navLabel: 'OpenClaw' },
  { key: 'appendix', slug: 'project-system', label: 'Appendix: Project Startup System', navLabel: 'Project Startup System' },
];

export const courseData = {
  introduction: {
    title: "Introduction: What is an 'Operator'?",
    icon: Home,
    sections: [
      {
        title: "Welcome to Operator Academy",
        content: `Before we dive into the tools, let's establish what we're building toward.

Most people "prompt" AI \u2014 they ask it questions and get answers. An **Operator** builds AI-powered systems that work without constant manual input.`,
        analogy: "Think of the difference between someone who orders food on DoorDash versus someone who owns the restaurant. Both get food, but one has built something that generates value repeatedly."
      },
      {
        title: "The Operator Stack",
        content: `This course centers on one tool that does the heavy lifting \u2014 **Claude Code** \u2014 and the system you build around it.

\u2022 **Claude** (the chat app at claude.ai) \u2014 Your thinking partner for brainstorming and planning before you build. A quick stop, not the main event.

\u2022 **Claude Code** \u2014 The engine. An AI that runs in your terminal, reads and writes real files, runs commands, and ships actual software. This is where you'll spend 90% of your time.

\u2022 **Your workflow layer** \u2014 The part most people never set up: **Skills** (reusable commands), **Agents** (specialists Claude delegates to), **Hooks** (automation that fires on events), and **MCP** (connections to your other tools). This is what turns Claude Code from "a smarter autocomplete" into a system that runs your work.

By the end of this course, you'll go from an idea to a working, shipped AI tool \u2014 and you'll have a repeatable workflow that makes every future project faster than the last. You won't write code by hand. You'll direct.`
      }
    ]
  },
  module1: {
    title: "Module 1: Claude",
    subtitle: "Your Thinking Partner — the quick stop before Claude Code",
    icon: Cpu,
    sections: [
      {
        title: "1.1 Creating Your Account",
        content: `In the next 5 minutes, you'll have access to an AI that can draft entire marketing campaigns, analyze your competitors, and help you think through business problems — for free. Here's how to get set up:

1. Go to **claude.ai** in your web browser
2. Click "Sign up" or "Get started"
3. Enter your email address or sign up with Google
4. Verify your email by clicking the link sent to your inbox
5. Complete your profile setup`,
        tip: "You'll need a paid plan to use Claude Code (Module 2) — the free tier doesn't include it. Claude Pro ($20/month) is the cheapest way in; Max ($100–200/month) gives you far more usage if you build daily. One subscription covers both the chat app and Claude Code."
      },
      {
        title: "1.2 What to Use Claude For",
        content: `Claude isn't just a chatbot \u2014 it's a multi-purpose thinking tool.

**Research & Analysis**
\u2022 Summarize long documents, articles, or reports
\u2022 Compare different options or approaches
\u2022 Extract key insights from data

**Writing & Communication**
\u2022 Draft emails, proposals, and documentation
\u2022 Edit and improve existing content
\u2022 Translate between languages

**Problem-Solving**
\u2022 Brainstorm solutions to challenges
\u2022 Think through complex decisions
\u2022 Debug issues in your processes`,
        analogy: "Claude.ai is like having a brilliant research assistant who never sleeps, never gets annoyed by questions, and can help you think through any problem."
      },
      {
        title: "1.3 Formatting Prompts Like a Pro",
        content: `Here's the secret most people miss: *you can use Claude to help you write better prompts for Claude*.

**The Prompt Engineering Workflow:**

1. **Start with a rough idea:** "I need to write sales follow-up emails"
2. **Ask Claude to improve it:** "Help me write a detailed prompt for generating sales follow-up emails"
3. **Use the improved prompt:** Claude will give you a structured, detailed prompt
4. **Iterate:** Refine based on results

**Elements of a Great Prompt:**

\u2022 **Role:** Tell Claude who it should be ("Act as an expert copywriter")
\u2022 **Context:** Provide background information
\u2022 **Task:** Be specific about what you want
\u2022 **Format:** Describe how you want the output structured
\u2022 **Examples:** Show what good output looks like`,
        analogy: "Talking to Claude is like giving instructions to a skilled contractor. The more specific your blueprint, the better the result.",
        tip: "That's the whole chat app for now. Everything past here happens in Claude Code — same Claude, but it can actually build and ship what you plan. Module 2 gets it installed on any computer: Windows, Mac, or Linux."
      }
    ]
  },
  module2: {
    title: "Module 2: Claude Code",
    subtitle: "Building Real Applications with AI",
    icon: Terminal,
    sections: [
      {
        title: "2.1 Understanding the Terminal",
        content: `Claude Code runs in your computer's **Terminal** (also called the Command Line). Don't worry \u2014 we'll walk through everything step by step, and it works the same on every operating system.

**Opening the Terminal:**

| OS | How to open it |
|----|----------------|
| **Windows** | Press the **Win** key, type **"Terminal"**, press Enter. (Windows Terminal comes built into Windows 11; on Windows 10, "PowerShell" works the same.) |
| **Mac** | Press **Cmd + Space**, type **"Terminal"**, press Enter |
| **Linux** | Press **Ctrl + Alt + T**, or search "Terminal" in your apps |

On Windows, you'll see a prompt that starts with \`PS C:\\Users\\YourName>\` \u2014 that "PS" means you're in **PowerShell**, which is what we'll use. Remember that detail; it matters during install.

**Essential Terminal Commands:**

| Command | What It Does | Analogy |
|---------|--------------|---------|
| \`pwd\` | Shows your current location | "You are here" on a map |
| \`ls\` | Lists files and folders | Opening a drawer to see inside |
| \`cd [folder]\` | Change directory (go into folder) | Walking into a room |
| \`cd ..\` | Go up one folder level | Walking back out of a room |
| \`mkdir [name]\` | Make a new directory (folder) | Creating a new filing cabinet |
| \`clear\` | Clears the terminal screen | Wiping a whiteboard clean |`,
        analogy: "The Terminal is like texting with your computer. Instead of clicking buttons and icons, you type commands. It might feel old-school, but it's actually faster and more powerful."
      },
      {
        title: "2.2 Understanding Folder Hierarchy",
        content: `Your computer's folder structure is like a building with floors and rooms.

**Typical project folder structure:**

\`\`\`
~/                          (Your home folder)
  \u2514\u2500\u2500 Projects/             (A folder for all your work)
       \u2514\u2500\u2500 my-first-app/    (Your specific project)
            \u251c\u2500\u2500 index.html  (A file)
            \u251c\u2500\u2500 style.css   (Another file)
            \u2514\u2500\u2500 scripts/    (A subfolder)
                 \u2514\u2500\u2500 app.js (A file inside subfolder)
\`\`\`

To navigate to your project, you'd type:

\`\`\`
cd ~/Projects/my-first-app
\`\`\``,
        analogy: "The 'root' is the ground floor, your 'home' folder is your office, and inside it are different departments (folders) containing specific files. The path is like the building address plus floor and room number."
      },
      {
        title: "2.3 Installing Claude Code",
        content: `Good news: the old way (install Node.js, then \`npm install\`) is no longer the recommended path. Claude Code now ships a **native installer** — one command, no Node.js, no extra software. It works on Windows, Mac, and Linux. Pick your operating system below.

**Windows (recommended — native, no WSL needed)**

Open **Terminal** or **PowerShell** (see 2.1) and paste:

\`\`\`
irm https://claude.ai/install.ps1 | iex
\`\`\`

Prefer a click-to-install experience? If you have the Windows Package Manager, this installs the same thing and is easy to update later:

\`\`\`
winget install Anthropic.ClaudeCode
\`\`\`

> On older setups you might be in **Command Prompt** instead of PowerShell (the prompt won't say "PS"). If \`irm\` gives an error, run this instead:
> \`\`\`
> curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
> \`\`\`

Windows 10 and 11 are fully supported natively — you do **not** need WSL anymore.

**Mac**

Open **Terminal** and paste:

\`\`\`
curl -fsSL https://claude.ai/install.sh | bash
\`\`\`

(If you already use Homebrew, \`brew install --cask claude-code\` also works.)

**Linux**

Same as Mac:

\`\`\`
curl -fsSL https://claude.ai/install.sh | bash
\`\`\`

---

**Step 2: Log in**

Close and reopen your terminal (so it picks up the new \`claude\` command), then run:

\`\`\`
claude
\`\`\`

A browser window opens — log in with your Claude account (the same Pro or Max plan from Module 1). If the browser doesn't open automatically, press \`c\` to copy the login link and paste it into your browser.

**Step 3: Confirm it worked**

\`\`\`
claude --version
\`\`\`

If you see a version number, you're in. If the command "isn't found," fully close your terminal and open a new window — the installer adds \`claude\` to your PATH, and a fresh window picks it up.`,
        installBanner: { color: 'purple', link: '/tools/install', text: 'Install the Workflow', labelText: 'Quick Start' }
      },
      {
        title: "2.4 The Claude Code Interface",
        content: `Type "/" to see available commands. Here are the most important ones:

| Command | What It Does |
|---------|--------------|
| \`/init\` | Initialize a new project with basic structure |
| \`/clear\` | Clear conversation history (keeps settings) |
| \`/compact\` | Summarize conversation to save context space |
| \`/resume\` | Pick up where you left off from previous session |
| \`/restore\` | Restore files to a previous checkpoint |
| \`/doctor\` | Diagnose setup issues and check configuration |
| \`/context\` | Shows how much context (memory) is being used |
| \`/memory\` | View and edit what Claude remembers |
| \`/mcp\` | Manage Model Context Protocol servers |
| \`/fork\` | Create a branch to try something safely |`
      },
      {
        title: "2.5 Key Concepts Explained",
        content: `**Context**
Context is like Claude's working memory. The more context Claude has, the better it understands your project. But there's a limit \u2014 like a desk that can only hold so many papers.

**Tools**
Tools are actions Claude can take \u2014 reading files, writing code, running commands, searching the web. When you give Claude a task, it automatically uses the right tools.

**Agents**
Agents are specialized Claude configurations for specific tasks. You can create custom agents that have particular instructions, personality, or capabilities.

**Hooks**
Hooks are automatic triggers that run when certain events happen (like before/after Claude edits a file). Think of them as automated quality control.

**MCP (Model Context Protocol)**
MCP lets Claude connect to external services \u2014 databases, APIs, other tools. It's how Claude can interact with the broader world beyond just your project files.

**Skills**
Skills are reusable capabilities you can give Claude \u2014 like knowing how to use a specific framework or follow certain coding standards.`,
        analogy: "Imagine you're working with a consultant who has amnesia. If you only tell them about today's task, they'll help \u2014 but if you also remind them about the project history, goals, and constraints, they'll give much better advice. That's context."
      },
      {
        title: "2.6 Context and Output Quality",
        content: `**The golden rule:** More relevant context = higher quality output.

**Ways to provide context:**
\u2022 **CLAUDE.md file:** Project-specific instructions Claude reads automatically
\u2022 **Conversation history:** What you've discussed in the current session
\u2022 **File contents:** Claude can read any file in your project
\u2022 **Explicit instructions:** What you tell Claude in your messages

**Managing context:**
\u2022 Use \`/context\` to see how full your context is
\u2022 Use \`/compact\` when context is getting full but you want to continue
\u2022 Use \`/clear\` when starting a new task (keeps settings, clears conversation)`,
        tip: "Claude Code works best when it's opened inside a specific project folder. This way, it can see all your project files and make changes to them directly."
      },
      {
        title: "2.7 Agent Teams (Experimental)",
        content: `Agent Teams let you coordinate **multiple Claude Code instances** working together on the same project. One session acts as the **team lead**, while other sessions called **teammates** work independently in their own context windows.

**Why Agent Teams?**
When a task benefits from parallel exploration \u2014 like reviewing code from multiple angles, building independent modules, or investigating competing debugging hypotheses \u2014 a single Claude session can become a bottleneck. Agent Teams solve this by splitting work across multiple sessions that can communicate directly with each other.

**How It Works:**

| Component | Role |
|-----------|------|
| **Team Lead** | The main session that creates the team, spawns teammates, and coordinates work |
| **Teammates** | Separate Claude Code instances that each work on assigned tasks |
| **Task List** | Shared list of work items that teammates claim and complete |
| **Mailbox** | Messaging system for communication between agents |

**Agent Teams vs. Subagents:**

| Feature | Subagents | Agent Teams |
|---------|-----------|-------------|
| **Context** | Share the main agent's session | Fully independent context windows |
| **Communication** | Report results back to caller only | Teammates message each other directly |
| **Best For** | Focused tasks where only the result matters | Complex work requiring discussion and collaboration |
| **Token Cost** | Lower | Higher \u2014 each teammate is a separate instance |

**Enabling Agent Teams:**
Agent Teams are disabled by default. Enable them by adding this to your \`settings.json\`:

\`\`\`
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
\`\`\`

**Best Use Cases:**
\u2022 **Research and review** \u2014 Multiple teammates investigate different aspects simultaneously
\u2022 **New modules or features** \u2014 Each teammate owns a separate piece without conflicts
\u2022 **Debugging with competing hypotheses** \u2014 Test different theories in parallel
\u2022 **Cross-layer coordination** \u2014 Frontend, backend, and tests each owned by a different teammate

**Starting a Team:**
Just describe the task and team structure in natural language:

\`\`\`
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
\`\`\`

**Current Limitations:**
Agent Teams are experimental. Be aware of these constraints:

\u2022 **No session resumption** \u2014 \`/resume\` and \`/rewind\` do not restore in-process teammates
\u2022 **Task status can lag** \u2014 Teammates sometimes fail to mark tasks as completed, blocking dependent tasks
\u2022 **One team per session** \u2014 Clean up the current team before starting a new one
\u2022 **No nested teams** \u2014 Teammates cannot spawn their own teams
\u2022 **Lead is fixed** \u2014 You can't promote a teammate to lead or transfer leadership
\u2022 **Permissions set at spawn** \u2014 All teammates inherit the lead's permission mode
\u2022 **Split panes require tmux or iTerm2** \u2014 The default in-process mode works in any terminal, but split-pane mode isn't supported in VS Code terminal, Windows Terminal, or Ghostty`,
        analogy: "Think of Agent Teams like a war room with specialists. The team lead is the general assigning missions, and each teammate is a specialist working independently on their piece \u2014 the sniper scouts, the engineer builds, the medic patches things up. They can radio each other directly, but the general keeps the big picture.",
        tip: "Start with research and review tasks before trying parallel code implementation. Agent Teams add coordination overhead, so they work best when teammates can operate independently on different files or aspects of a problem."
      }
    ]
  },
  module3: {
    title: "Module 3: Skills, Agents & Hooks",
    subtitle: "The workflow layer that turns Claude Code into a system",
    icon: Blocks,
    sections: [
      {
        title: "3.1 Skills — Reusable Commands You Build Once",
        content: `Out of the box, Claude Code is powerful but generic. The operators who get 10x more out of it all do the same thing: they build a **workflow layer** on top. That layer has four pieces — Skills, Agents, Hooks, and MCP. This module is the difference between "I use AI sometimes" and "AI runs my work."

A **Skill** is a saved instruction set Claude can run on demand. Instead of re-typing the same five-paragraph request every time ("review my changes for bugs, check for security issues, don't nitpick formatting..."), you save it once as a skill and trigger it by name.

**Where skills live:**

\`\`\`
~/.claude/skills/             (skills available in every project)
  my-skill/
    SKILL.md                  (the instructions)
your-project/.claude/skills/  (skills for just this project)
\`\`\`

A \`SKILL.md\` is plain English with a short header. Example — a skill called \`commit\`:

\`\`\`
---
name: commit
description: Stage changes, write a clear commit message, and commit.
---

When the user says "commit": review the staged diff, write a
concise message describing WHAT changed and WHY, then commit.
Never commit secrets or .env files.
\`\`\`

Now typing \`/commit\` (or just saying "commit this") runs that every time, identically.

**You don't have to write skills by hand.** Ask Claude Code: *"Create a skill that runs my tests and summarizes failures."* It writes the SKILL.md for you. The toolkit in Module 4 ships a starter set: \`/commit\`, \`/push\`, \`/pickup\`, \`/wrap-up\`, \`/test\`, and more.`,
        analogy: "A skill is a saved recipe. You figured out the perfect way to make the dish once — now you don't re-derive it every time, you just say the name and it comes out the same.",
        tip: "Start by noticing what you ask Claude to do repeatedly. The third time you type roughly the same request, turn it into a skill. That's the whole trick — skills are just your own repetition, captured.",
        installBanner: { color: 'purple', link: '/tools/install', text: 'Install the starter skills', labelText: 'Toolkit' }
      },
      {
        title: "3.2 Agents — Specialists Claude Delegates To",
        content: `When you give Claude Code a big task, it doesn't have to do everything in one conversation. It can spin up **agents** (also called subagents) — separate Claude instances, each with its own focus and its own clean context window — and hand them pieces of the work.

Why this matters: each agent starts fresh, so a long, messy search doesn't clog up your main conversation. The agent does its job, reports back a tight answer, and disappears.

**Agents you'll actually use:**

| Agent | What it does | When it runs |
|-------|--------------|--------------|
| **Explorer** | Maps the codebase, finds where things live — read-only | Before changing code you don't know |
| **Reviewer** | Sweeps a change for bugs, security gaps, regressions | Before you ship |
| **Debugger** | Isolates the root cause of a failing test or bug | When something breaks |
| **Test-runner** | Writes and runs tests, reports what failed | After building a feature |

Like skills, agents are just markdown files in \`~/.claude/agents/\` — a name, a description, and instructions. The toolkit ships the ones above.

**Agent Teams (the bigger version):** for work that splits cleanly across people — one teammate on the frontend, one on the backend, one on tests — Claude Code can run multiple sessions that talk to each other. You saw this in Module 2.7. Subagents are the everyday tool; Agent Teams are for genuinely parallel projects.`,
        analogy: "You're the general contractor. You don't lay every brick — you bring in an electrician, a plumber, a framer. Each is an expert at one thing, works on their piece, and reports back. Agents are your subcontractors.",
        tip: "The single highest-leverage habit: run the Explorer agent before editing unfamiliar code, and the Reviewer agent before shipping. Map first, review last. Those two bookends prevent most mistakes."
      },
      {
        title: "3.3 Hooks — Automation That Fires on Events",
        content: `Skills and agents wait for you to trigger them. **Hooks** fire automatically when something happens — no command needed. This is the closest thing to "runs while you sleep" automation, except it lives right inside your workflow instead of a separate app.

A hook is a small script wired to an **event** in your \`~/.claude/settings.json\`:

| Event | Fires when... | Example use |
|-------|---------------|-------------|
| **SessionStart** | A new Claude Code session opens | Load project docs so Claude has context immediately |
| **UserPromptSubmit** | You send a message | Inject reminders or current state into the prompt |
| **PreToolUse** | Before Claude runs a tool (e.g. a command) | Block dangerous commands; require review before deploy |
| **PostToolUse** | After a tool runs | Auto-format files, fire a background review after a push |
| **Stop** | The session ends | Log what happened, save a handoff note |

**A real example:** a \`SessionStart\` hook that checks whether your project has its documentation files and, if not, reminds Claude to create them. You never think about it — it just happens every time you open the project.

\`\`\`
"hooks": {
  "SessionStart": [
    { "hooks": [{ "type": "command", "command": "~/.claude/hooks/auto-init-check.sh" }] }
  ]
}
\`\`\`

Hooks are the difference between a workflow you have to remember and a workflow that remembers for you. The toolkit ships a few safe defaults; you add your own as you find repetitive friction.`,
        analogy: "Hooks are like motion-sensor lights. You don't flip a switch — you walk in, and the light is already on. The event (you arriving) triggers the action automatically.",
        tip: "Be careful with PreToolUse hooks that block commands — they're powerful enough to stop you from shipping by mistake, which is exactly the point for things like 'don't deploy with failing tests.' Start with read-only hooks (SessionStart, Stop) before writing ones that block."
      },
      {
        title: "3.4 MCP — Connecting Claude to Your Other Tools",
        content: `So far everything has lived on your computer — files, commands, git. **MCP (Model Context Protocol)** is how Claude Code reaches *out* to the rest of your stack: databases, your GitHub, your hosting, your project tracker, your docs.

An **MCP server** is a connector. Once you add one, Claude can use that tool directly — read your database schema, open a pull request, check your deployments — without you copy-pasting between windows.

**How you add one:** ask Claude Code, or run a command like:

\`\`\`
claude mcp add <name> -- <command to start the server>
\`\`\`

**Common connectors operators add:**

| MCP server | What Claude can then do |
|------------|------------------------|
| **GitHub** | Read issues, open and review pull requests |
| **A database (Postgres / Supabase)** | Inspect schema, run safe read queries |
| **Your hosting (e.g. Vercel)** | Check deployments and logs |
| **Web search / docs** | Pull current information mid-task |

> **Tools vs. MCP:** for many services (GitHub, your host, your database) an official command-line tool already exists, and Claude Code can just *use* the terminal to run it — no MCP needed. Reach for MCP when there's no good CLI, or when you want Claude to use the tool structurally rather than by typing commands. Either way the goal is the same: Claude operating your real stack, not just your files.

**Security matters here.** An MCP server can give Claude real access to real systems. Only add servers you trust, give them the least access they need, and never wire in production credentials you wouldn't hand to a new contractor on day one.`,
        analogy: "If Claude Code is a brilliant new hire, MCP is giving them logins to your tools. Suddenly they're not just working on their own laptop — they can check the shared database, file tickets, and read the dashboards. Useful and powerful, which is exactly why you're careful about which keys you hand over.",
        tip: "You don't need MCP to start. Get comfortable with skills and agents first. Add your first MCP connector (GitHub is a great one) only once you feel the friction of switching between Claude and another tool by hand."
      }
    ]
  },
  module4: {
    title: "Module 4: The Operator Workflow",
    subtitle: "From idea to shipped tool — the loop you'll repeat forever",
    icon: Link2,
    sections: [
      {
        title: "The Operator Loop",
        content: `You now have the pieces: Claude (to think), Claude Code (to build), and the workflow layer — skills, agents, hooks (to move fast and not break things). This module ties them into one repeatable loop you'll run on every project.

Forget juggling three or four separate apps. The modern operator workflow happens almost entirely inside Claude Code:

| Phase | What happens | How you do it |
|-------|--------------|---------------|
| **Plan** | Decide what to build and how | Talk it through in Claude (or Claude Code's plan mode) before any code |
| **Build** | Make the thing | Direct Claude Code — it writes the files and runs the commands |
| **Review** | Catch problems before they ship | Run the Reviewer agent; fix what it finds |
| **Ship** | Get it live | A skill like \`/push\` commits and deploys |

That's the whole job. You're not typing code — you're running the loop and making the calls.`,
        analogy: "Think of yourself as a director, not an actor. You don't deliver the lines — you decide the scene, watch the take, call for a reshoot if it's off, and print it when it's right. Plan, build, review, ship."
      },
      {
        title: "The Workflow, Step by Step",
        content: `Here's how a real project flows from nothing to shipped.

**1. Plan (think before you build)**
• Describe the goal in plain language — to Claude in the chat app, or to Claude Code directly.
• Ask for a plan, not code: *"Before writing anything, lay out how you'd build this and what files you'll touch."*
• Claude Code has a **plan mode** for exactly this — it researches and proposes an approach, and waits for your OK before changing anything.

**2. Build (direct, don't type)**
• Open Claude Code inside your project folder so it can see your files.
• Give it the task. It writes the files, installs what it needs, and runs commands.
• Iterate in plain English: *"the button's in the wrong spot,"* *"add error handling here."*

**3. Review (trust, but verify)**
• Before shipping, run the **Reviewer agent**: *"Review this change for bugs and security issues before I push."*
• It reads the diff with fresh eyes and flags problems your main session glossed over.
• Fix what's real; ignore the nitpicks.

**4. Ship (one command)**
• Run your \`/push\` skill (or just say "ship it"). It commits with a clear message and pushes — and if your project auto-deploys, it's live.
• A \`/wrap-up\` skill saves where you left off so your next session picks up instantly.

The first time, this feels like a lot of steps. By the third project it's muscle memory — and each loop is faster than the last because your skills and agents carry over.`,
        tip: "The biggest beginner mistake is skipping Plan and jumping straight to Build. Five minutes planning saves an hour of Claude confidently building the wrong thing. Make 'ask for the plan first' a habit."
      },
      {
        title: "Worked Example: A Tool in One Sitting",
        content: `Let's build something real — a small web app that turns messy meeting notes into a clean action-item list. No prior code, one sitting.

**Step 1 — Plan (in Claude)**
*"I want a simple web page where I paste meeting notes and get back a clean list of action items with owners and due dates. What's the simplest way to build this with Claude Code?"*

Claude suggests a single-page app that calls the Claude API. Good enough — you don't need more.

**Step 2 — Build (in Claude Code)**
\`\`\`
cd ~/Projects
claude
\`\`\`
Then: *"Create a new project called action-items. A single web page with a text box and a button. When I click it, send the text to the Claude API and show the action items it returns. Keep it simple."*

Claude Code creates the folder, writes the files, and tells you how to run it. You test it in your browser, then: *"the output should be a checklist, not a paragraph"* — and it fixes it.

**Step 3 — Review**
*"Review this before I ship it — make sure my API key isn't exposed in the frontend."*

The Reviewer catches that the key needs to live server-side. You ask Claude Code to fix it. (This is exactly the kind of mistake that's painful to find later and trivial to catch now.)

**Step 4 — Ship**
*"Ship it."* Your \`/push\` skill commits and pushes; your host deploys it. You send the link to a coworker.

**What just happened:** you went from an idea to a deployed tool without writing code — by running the loop. Every tool you build from here uses the same four steps. That's the operator skill. Everything else is practice.`,
        analogy: "Your first build is like cooking a new recipe — slow, lots of checking the instructions. The tenth time, you barely glance at them. The loop doesn't change; you just get fast at running it.",
        installBanner: { color: 'purple', link: '/tools/install', text: 'Get the workflow toolkit', labelText: 'Toolkit' }
      }
    ]
  },
  module6: {
    title: "Module 5: OpenClaw",
    subtitle: "Your Personal AI Agent, Running 24/7",
    icon: Bot,
    sections: [
      {
        title: "5.1 Your AI Agent That Never Sleeps",
        content: `Imagine texting an assistant at 2 AM that checks your email, schedules your meetings, scrapes competitor pricing, and pushes code to GitHub \u2014 all before you wake up.

That's **OpenClaw**.

OpenClaw is an open-source personal AI agent that lives on your own hardware, connects to your messaging apps, and actually *does things* on your behalf. Not "here's a summary" \u2014 actual execution. File management. Browser automation. Shell commands. API calls. All triggered from a WhatsApp message or a Telegram chat.

**What makes it different from ChatGPT or Claude.ai:**

| Feature | ChatGPT / Claude.ai | OpenClaw |
|---------|---------------------|----------|
| **Runs where?** | Their servers | Your machine |
| **Can access your files?** | No | Yes |
| **Can run terminal commands?** | No | Yes |
| **Can control a browser?** | No | Yes |
| **Works via text/WhatsApp?** | No | Yes |
| **Persistent memory?** | Limited | Full \u2014 learns your preferences over time |
| **Works while you sleep?** | No | Yes \u2014 24/7 autonomous operation |
| **Your data stays private?** | No | Yes \u2014 nothing leaves your machine |

**50+ integrations out of the box:** Gmail, GitHub, Spotify, Obsidian, Twitter, Google Calendar, Slack, and more. The community builds new skills daily on **ClawHub** \u2014 and OpenClaw can even create and modify its own skills through conversation.

People are calling it "what Apple Intelligence should have been." The community exploded so fast that Mac Mini stock sold out across major retailers. Tom's Hardware reported delivery delays of up to 6 weeks for high-memory configurations.

This module walks you through setting it up \u2014 affordably, securely, and without the trial-and-error that burns most people out.`,
        analogy: "ChatGPT is like calling a knowledgeable friend for advice. OpenClaw is like hiring a full-time assistant who sits at your desk, has your passwords, knows your preferences, and works while you're asleep.",
        tip: "OpenClaw is open-source and free. The software costs nothing. You only pay for hardware (or a cheap VPS) and API calls if you use cloud models like Claude or GPT-4. With the right setup, that's under $10/month."
      },
      {
        title: "5.2 Why Everyone's Buying Mac Minis (And Why You Don't Have To)",
        content: `You've seen the tweets. You've seen the Reddit threads. Developers are panic-buying Mac Minis like they're limited-edition sneakers. But here's what nobody tells you: **most people don't need a Mac Mini to run OpenClaw.**

**Why the Mac Mini became the default:**

The Mac Mini emerged as the go-to OpenClaw host for one reason above all others: **iMessage**. In the US, iMessage is how most people text. If you want OpenClaw responding to your iMessages, you need macOS. And the cheapest way to get macOS is a Mac Mini.

**Other reasons people buy dedicated hardware:**
\u2022 **Isolation** \u2014 A dedicated machine keeps your AI agent separate from your personal data
\u2022 **Always-on** \u2014 Mac Minis idle at under 5 watts. Quieter than a nightlight
\u2022 **Apple Silicon** \u2014 Unified memory architecture makes local AI models run faster than equivalent x86 hardware
\u2022 **Reliability** \u2014 macOS doesn't randomly restart for updates at 3 AM

**The real cost breakdown:**

| Option | Upfront Cost | Monthly Cost | iMessage? |
|--------|-------------|-------------|-----------|
| New Mac Mini M4 (16GB) | $599 | $1-8 (API calls) | Yes |
| New Mac Mini M4 (32GB) | $799 | $1-8 (API calls) | Yes |
| Used Mac Mini M1 (16GB) | $350-500 | $1-8 (API calls) | Yes |
| Hetzner VPS (2 vCPU, 2GB) | $0 | $4/month + API | No |
| Oracle Cloud Free Tier | $0 | $0-8 (API only) | No |
| Hostinger VPS | $0 | $5-13/month + API | No |

**The hidden cost nobody talks about: API bills.**

Early adopters report spending **$300-750/month** on cloud LLM API calls when using models like Claude or GPT-4. OpenClaw's agent makes many reasoning calls per task \u2014 those tokens add up fast.

The solution? Use local models with **Ollama** for routine tasks and only route complex requests to cloud APIs. We'll cover this in the cost management section.

**The bottom line:** If you need iMessage integration, a used M1 Mac Mini for $350-400 is the sweet spot. If you don't need iMessage, a $4/month VPS does everything else \u2014 and you can start in 20 minutes instead of waiting for shipping.`,
        analogy: "Buying a new Mac Mini for OpenClaw is like buying a brand-new truck to drive to the grocery store. It works \u2014 but a reliable used car gets you there just fine. Pick the vehicle that matches the trip.",
        tip: "Check Facebook Marketplace and local listings for M1 Mac Minis. Since the M4 launched, M1 prices dropped significantly. A used M1 with 16GB runs OpenClaw perfectly for cloud API usage."
      },
      {
        title: "5.3 Choose Your Setup Path",
        content: `Before you install anything, pick the path that fits your needs and budget. There's no wrong answer \u2014 each has trade-offs.

**Path A: Remote VPS (Best for most people)**

\u2022 **Cost:** $0-13/month for the server + $1-8/month for API calls
\u2022 **Setup time:** 20-30 minutes
\u2022 **Best for:** WhatsApp, Telegram, Discord, Slack, Signal users
\u2022 **Not for:** iMessage users (requires macOS)
\u2022 **Skill level:** Beginner-friendly with our walkthrough

This is the path we recommend for most Operators Academy students. It's the fastest, cheapest way to get a working OpenClaw agent. You get a cloud server that runs 24/7, no hardware to buy, and you can manage it from anywhere.

**Recommended VPS providers:**

| Provider | Price | RAM | Standout Feature |
|----------|-------|-----|-----------------|
| **Oracle Cloud** | Free | 1-4GB | Free tier is generous, but can be unreliable |
| **Hetzner** | $4/mo | 2GB | Best value for stability |
| **Hostinger** | $5-13/mo | 2-8GB | One-click Docker deployment |

**Path B: Local Mac Mini (For iMessage + power users)**

\u2022 **Cost:** $350-800 upfront + $1-8/month for API calls
\u2022 **Setup time:** 45-60 minutes
\u2022 **Best for:** iMessage users, privacy maximalists, local model enthusiasts
\u2022 **Skill level:** Intermediate

Choose this if iMessage is a must-have or you want to run AI models locally with zero cloud dependency. A used M1 Mac Mini is the budget sweet spot.

**Path C: Hybrid (Maximum flexibility)**

\u2022 **Cost:** $350-800 upfront + $4/mo VPS + API calls
\u2022 **Setup time:** 60-90 minutes
\u2022 **Best for:** Power users who want the best of both worlds
\u2022 **Skill level:** Intermediate to advanced

Run OpenClaw on a Mac Mini for iMessage, plus a VPS instance for always-on redundancy. If your Mac Mini goes offline, the VPS takes over for non-iMessage channels.

**Decision tree:**

Do you need iMessage?
\u2022 **Yes** \u2192 Path B (Mac Mini) or Path C (Hybrid)
\u2022 **No** \u2192 Path A (VPS) \u2014 save $350+ and start today

Are you comfortable with terminal commands?
\u2022 **Yes** \u2192 Any path works
\u2022 **Not yet** \u2192 Path A with Hostinger's one-click Docker setup

Is privacy your top concern?
\u2022 **Yes** \u2192 Path B with local Ollama models (zero cloud dependency)
\u2022 **Not critical** \u2192 Path A is simpler and cheaper`,
        analogy: "Choosing your setup path is like choosing where to live. A VPS is renting an apartment \u2014 cheap, fast move-in, someone else handles maintenance. A Mac Mini is buying a house \u2014 more upfront cost, but it's yours, and you can do whatever you want with it.",
        tip: "Start with Path A (VPS) even if you plan to go local later. It takes 20 minutes, costs $4/month, and teaches you how OpenClaw works before you invest in hardware. Think of it as a test drive.",
        installBanner: { color: 'orange', link: '/setup/openclaw', text: 'OpenClaw Setup Guide', labelText: 'Setup' }
      },
      {
        title: "5.4 Remote Setup: Your AI Agent for $4/Month",
        content: `This walkthrough gets OpenClaw running on a Hetzner VPS. By the end, you'll have a 24/7 AI agent you can message from your phone.

**Step 1: Create Your VPS**

1. Sign up at **hetzner.com** (or your preferred VPS provider)
2. Create a new server:
   \u2022 **OS:** Ubuntu 22.04
   \u2022 **Type:** CX22 (2 vCPU, 4GB RAM) \u2014 $4.59/month
   \u2022 **Location:** Pick the closest data center to you
   \u2022 **SSH Key:** Add your public key (or use password auth to start)
3. Note your server's IP address

**Step 2: Connect to Your Server**

Open your terminal and SSH in:

\`\`\`
ssh root@YOUR_SERVER_IP
\`\`\`

**Step 3: Install Docker**

Docker keeps OpenClaw isolated and makes updates painless:

\`\`\`
curl -fsSL https://get.docker.com | sh
\`\`\`

**Step 4: Install OpenClaw**

Run the one-liner installer:

\`\`\`
curl -fsSL https://openclaw.ai/install.sh | bash
\`\`\`

The installer handles Node.js, dependencies, and initial configuration. Follow the prompts to:
\u2022 Choose your AI model provider (Claude, OpenAI, or local via Ollama)
\u2022 Enter your API key
\u2022 Set your admin password

**Step 5: Configure Your Model**

For the most cost-effective setup, use Claude Haiku for routine tasks:

\`\`\`
openclaw config set model claude-haiku-4-5-20251001
\`\`\`

For complex tasks that need more reasoning power:

\`\`\`
openclaw config set fallback-model claude-sonnet-4-5-20250929
\`\`\`

**Step 6: Start OpenClaw as a Background Service**

\`\`\`
openclaw start --daemon
\`\`\`

This runs OpenClaw in the background. It survives server reboots and restarts automatically if it crashes.

**Step 7: Verify It's Running**

\`\`\`
openclaw status
\`\`\`

You should see: \`Status: Running | Uptime: Xs | Model: claude-haiku\`

**What you've built so far:**
Your AI agent is live on a server, running 24/7, waiting for instructions. Next, we'll connect it to your messaging apps so you can talk to it from your phone.`,
        analogy: "Setting up a VPS for OpenClaw is like renting a tiny office for your new employee. You don't need a corner office with a view \u2014 you need a desk, a chair, and a power outlet. A $4/month server is that desk.",
        tip: "Set a billing alert on your VPS provider for $10/month. This catches any unexpected charges early. Hetzner and most providers let you set this up in the billing dashboard.",
        installBanner: { color: 'orange', link: '/setup/openclaw', text: 'Open the Quick-Start Guide', labelText: 'Quick Start' }
      },
      {
        title: "5.5 Local Setup: Mac Mini Configuration",
        content: `If you chose Path B (local Mac Mini), this section walks you through turning it into a dedicated OpenClaw server.

**Before You Start:**
\u2022 A Mac Mini (M1 or newer, 16GB RAM minimum)
\u2022 macOS 14 Sonoma or later
\u2022 An Ethernet cable (more reliable than Wi-Fi for always-on operation)
\u2022 Your AI model API key (Anthropic or OpenAI)

**Step 1: Prepare Your Mac Mini for Server Duty**

These settings prevent your Mac from going to sleep or interrupting OpenClaw:

1. **System Settings > Energy** \u2192 Turn off "Put hard disks to sleep"
2. **System Settings > Energy** \u2192 Set "Prevent automatic sleeping" to ON
3. **System Settings > Lock Screen** \u2192 Set "Start Screen Saver" to Never
4. **System Settings > Software Update** \u2192 Turn off automatic updates (update manually on your schedule)

**Step 2: Enable Remote Access**

So you can manage your Mac Mini from any other device:

1. **System Settings > General > Sharing** \u2192 Turn on **Remote Login (SSH)**
2. Note the SSH command shown (e.g., \`ssh username@192.168.1.x\`)
3. Optionally enable **Screen Sharing** for GUI access

**Step 3: Install Homebrew and Node.js**

Open Terminal and run:

\`\`\`
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
\`\`\`

**Step 4: Install OpenClaw**

\`\`\`
curl -fsSL https://openclaw.ai/install.sh | bash
\`\`\`

Follow the installer prompts to configure your model provider and API key.

**Step 5: Install the Menubar App (Optional)**

OpenClaw offers a macOS menubar companion app (beta) for quick status checks:

\`\`\`
brew install --cask openclaw
\`\`\`

This shows a small icon in your menu bar with agent status, recent activity, and quick controls.

**Step 6: Set Up Auto-Start on Boot**

Create a launch agent so OpenClaw starts automatically when your Mac boots:

\`\`\`
openclaw service install
\`\`\`

This registers OpenClaw as a macOS LaunchAgent that starts on login and restarts if it crashes.

**Step 7: Set Up Local Models with Ollama (Optional)**

For zero API costs on routine tasks:

\`\`\`
brew install ollama
ollama pull llama3.2
openclaw config set model ollama/llama3.2
openclaw config set fallback-model claude-sonnet-4-5-20250929
\`\`\`

This runs a local model for simple requests and only calls Claude for complex tasks \u2014 cutting your API bill by 70-90%.

**Step 8: Configure iMessage Integration**

This is the feature that justifies the Mac Mini. In the OpenClaw config:

\`\`\`
openclaw integrations enable imessage
\`\`\`

OpenClaw will request permission to access Messages. Grant it, and you can now text your agent like any contact.

**You're live.** Your Mac Mini is now a personal AI server running 24/7 with iMessage access, local model support, and cloud fallback for complex reasoning.`,
        analogy: "Configuring a Mac Mini for OpenClaw is like converting a spare bedroom into a home office. You disable the things that interrupt work (sleep settings, auto-updates), set up remote access (so you can check in from anywhere), and make sure it starts fresh every morning (auto-launch on boot).",
        tip: "Connect your Mac Mini via Ethernet, not Wi-Fi. A dropped Wi-Fi connection at 3 AM means your agent goes offline until you notice. Ethernet is one cable that eliminates this failure mode entirely."
      },
      {
        title: "5.6 Connecting Your Messaging Apps",
        content: `Your agent is running. Now let's make it reachable from your phone. OpenClaw supports 8 messaging platforms \u2014 pick the ones you actually use.

**WhatsApp (Most Popular)**

WhatsApp is the most-used integration worldwide. Setup takes 5 minutes:

\`\`\`
openclaw integrations enable whatsapp
\`\`\`

1. OpenClaw generates a QR code in your terminal
2. Open WhatsApp on your phone \u2192 Settings \u2192 Linked Devices \u2192 Link a Device
3. Scan the QR code
4. Send a test message: "Hey, are you there?"

Your agent now lives in your WhatsApp as a linked device. Message it like a contact, and it responds.

**Telegram**

Telegram requires creating a bot through BotFather:

1. Message **@BotFather** on Telegram
2. Send \`/newbot\` and follow the prompts to name your bot
3. Copy the bot token BotFather gives you
4. Run:

\`\`\`
openclaw integrations enable telegram --token YOUR_BOT_TOKEN
\`\`\`

5. Message your bot on Telegram to test

**Discord**

For Discord, you create a bot application:

1. Go to the Discord Developer Portal \u2192 Applications \u2192 New Application
2. Go to Bot \u2192 Add Bot \u2192 Copy the token
3. Under OAuth2 \u2192 URL Generator, select \`bot\` scope with \`Send Messages\` + \`Read Message History\`
4. Use the generated URL to invite the bot to your server
5. Run:

\`\`\`
openclaw integrations enable discord --token YOUR_BOT_TOKEN
\`\`\`

**Slack**

\`\`\`
openclaw integrations enable slack
\`\`\`

Follow the OAuth flow that opens in your browser. Select your workspace and grant permissions.

**Signal**

\`\`\`
openclaw integrations enable signal
\`\`\`

Signal uses a linked device approach similar to WhatsApp \u2014 scan a QR code with your Signal app.

**iMessage (Mac Mini Only)**

If you're running on macOS:

\`\`\`
openclaw integrations enable imessage
\`\`\`

Grant Messages access when prompted. Your agent becomes reachable via iMessage to anyone who has your Apple ID.

**Managing Multiple Channels:**

You can enable as many integrations as you want. OpenClaw handles them all simultaneously:

\`\`\`
openclaw integrations list
\`\`\`

This shows all active integrations, their status, and message counts.

| Integration | Setup Difficulty | Works on VPS? | Works on Mac? |
|-------------|-----------------|---------------|---------------|
| WhatsApp | Easy (QR scan) | Yes | Yes |
| Telegram | Easy (bot token) | Yes | Yes |
| Discord | Medium (developer portal) | Yes | Yes |
| Slack | Easy (OAuth flow) | Yes | Yes |
| Signal | Easy (QR scan) | Yes | Yes |
| iMessage | Easy (one command) | No | Yes |
| Google Chat | Medium (service account) | Yes | Yes |
| MS Teams | Medium (Azure app) | Yes | Yes |`,
        analogy: "Connecting messaging apps to OpenClaw is like giving your assistant phone numbers for different offices. WhatsApp is the main line, Telegram is the back channel, Discord is the team chat, and iMessage is the personal line. Same assistant, different ways to reach them.",
        tip: "Start with one messaging app \u2014 whichever you use most. Get comfortable with that workflow before adding more channels. Each integration is independent, so you can add them anytime."
      },
      {
        title: "5.7 Keeping Costs Under $10/Month",
        content: `The number one reason people abandon OpenClaw isn't setup difficulty \u2014 it's the surprise API bill at the end of the month. OpenClaw agents are verbose. Every task involves multiple reasoning steps, each burning tokens. Without guardrails, costs spiral fast.

Here's how to keep your total bill under $10/month.

**Understanding Where the Money Goes:**

| Cost Component | Typical Range | Can You Reduce It? |
|----------------|--------------|-------------------|
| VPS hosting | $0-13/month | Yes \u2014 use free tiers or Hetzner |
| Cloud LLM API calls | $1-750/month | Yes \u2014 this is where optimization matters |
| Local model (Ollama) | $0 | Free, but needs capable hardware |

**Strategy 1: Model Routing \u2014 Use Cheap Models by Default**

The biggest cost saver. Route simple tasks to cheap models and only use expensive models when needed:

\`\`\`
openclaw config set model claude-haiku-4-5-20251001
openclaw config set fallback-model claude-sonnet-4-5-20250929
openclaw config set fallback-threshold complex
\`\`\`

**Cost comparison per task:**

| Model | Cost per 1M Input Tokens | Cost per 1M Output Tokens | Typical Task Cost |
|-------|-------------------------|--------------------------|-------------------|
| Claude Haiku 4.5 | $0.80 | $4.00 | $0.002-0.01 |
| Claude Sonnet 4.5 | $3.00 | $15.00 | $0.01-0.05 |
| Claude Opus 4.6 | $15.00 | $75.00 | $0.05-0.25 |
| Local (Ollama) | Free | Free | $0.00 |

Using Haiku for 90% of tasks and Sonnet for the rest keeps most users at **$5-15/month** in API costs.

**Strategy 2: Set Hard Spending Limits**

Both Anthropic and OpenAI let you set monthly spending caps:

\u2022 **Anthropic Console** \u2192 Settings \u2192 Spending Limits \u2192 Set to $20/month
\u2022 **OpenAI Dashboard** \u2192 Billing \u2192 Usage Limits \u2192 Set hard cap

If you hit the cap, OpenClaw falls back to local models or pauses until next month.

**Strategy 3: Use Local Models for Routine Work**

If you're on a Mac Mini, install Ollama and run a local model for free:

\`\`\`
ollama pull llama3.2
openclaw config set model ollama/llama3.2
\`\`\`

Local models handle simple tasks well: reminders, basic lookups, file organization, quick answers. Route only tasks that need deep reasoning to cloud APIs.

**Strategy 4: Reduce Agent Verbosity**

OpenClaw agents can be chatty in their reasoning. Trim the fat:

\`\`\`
openclaw config set max-reasoning-tokens 2048
openclaw config set summarize-context true
\`\`\`

This caps how much the agent "thinks" per step and compresses conversation history \u2014 fewer tokens sent, lower costs.

**Strategy 5: Monitor and Alert**

Set up a daily cost check:

\`\`\`
openclaw config set daily-cost-alert 0.50
\`\`\`

If spending exceeds $0.50 in a day, OpenClaw notifies you through your connected messaging app.

**Realistic Monthly Budget:**

| Setup | Hosting | API Costs | Total |
|-------|---------|-----------|-------|
| VPS + Haiku only | $4 | $2-5 | **$6-9/month** |
| VPS + Haiku + Sonnet fallback | $4 | $5-15 | **$9-19/month** |
| Mac Mini + Ollama local | $0 (owned) | $0-5 | **$0-5/month** |
| Mac Mini + Haiku cloud | $0 (owned) | $2-8 | **$2-8/month** |`,
        analogy: "Managing OpenClaw costs is like managing a phone plan. You wouldn't use international roaming for every call when Wi-Fi calling is free. Use local models (Wi-Fi) for everyday tasks and cloud APIs (roaming) only when you need the premium connection.",
        tip: "Check your Anthropic or OpenAI usage dashboard weekly for the first month. Most people find a stable usage pattern within 2-3 weeks. Once you know your pattern, set your spending cap 20% above your average."
      },
      {
        title: "5.8 Security: Locking Down Your Agent",
        content: `OpenClaw has full access to your machine. It can read files, run commands, and control a browser. That's what makes it powerful \u2014 and what makes security non-negotiable.

**The Real Risks:**

\u2022 **Prompt injection** \u2014 Someone sends your agent a message containing hidden instructions (via email, chat, or a webpage). The agent follows the hidden instructions instead of your intent
\u2022 **Data exposure** \u2014 Your agent reads a file containing API keys or passwords and includes them in a response
\u2022 **Unintended actions** \u2014 A poorly-worded request causes the agent to delete files, send messages, or modify data you didn't intend

**These aren't hypothetical.** Security researchers have demonstrated prompt injection attacks that extract .env files and SSH keys from OpenClaw instances running without guardrails.

**Layer 1: Run in Docker (Required for VPS, Recommended for Mac)**

Docker containers isolate OpenClaw from your host system:

\`\`\`
openclaw config set runtime docker
openclaw config set docker-volumes /safe/data:/data
\`\`\`

This means OpenClaw can only access files you explicitly mount into the container \u2014 not your entire filesystem.

**Layer 2: Restrict File Access**

Even within Docker, limit what directories OpenClaw can reach:

\`\`\`
openclaw config set allowed-paths /data,/projects
openclaw config set blocked-paths /secrets,/.ssh,/.env
\`\`\`

**Layer 3: Require Confirmation for Risky Actions**

Configure OpenClaw to ask before executing destructive commands:

\`\`\`
openclaw config set confirm-actions delete,send,push,deploy
\`\`\`

When the agent tries to delete a file, send a message on your behalf, push code, or deploy something, it pauses and asks you first.

**Layer 4: Separate API Keys**

Create a dedicated API key for OpenClaw with limited permissions \u2014 don't reuse your personal key:

\u2022 **Anthropic** \u2192 Console \u2192 API Keys \u2192 Create new key with usage limits
\u2022 **OpenAI** \u2192 Dashboard \u2192 API Keys \u2192 Create new project key

If the key is ever compromised, your personal account stays safe.

**Layer 5: Network Restrictions (Advanced)**

On a VPS, use firewall rules to limit what your agent can connect to:

\`\`\`
ufw allow ssh
ufw allow out to any port 443
ufw default deny incoming
ufw enable
\`\`\`

This allows HTTPS traffic (for API calls) and SSH (for your management) while blocking everything else.

**Security Checklist:**

| Action | Priority | Done? |
|--------|----------|-------|
| Run in Docker container | Critical | |
| Set allowed/blocked file paths | Critical | |
| Use a dedicated API key with spending limits | High | |
| Enable confirmation for destructive actions | High | |
| Keep OpenClaw updated (\`openclaw update\`) | High | |
| Set up firewall rules (VPS) | Medium | |
| Review agent activity logs weekly | Medium | |
| Disable integrations you don't use | Low | |

**One more thing:** Update OpenClaw regularly. The project moves fast, and security patches ship frequently:

\`\`\`
openclaw update
\`\`\``,
        analogy: "Giving OpenClaw unrestricted access to your machine is like handing a new employee the master key to every office on day one. Instead, give them a badge that opens the rooms they need, require approval for sensitive areas, and review the access logs. Trust, but verify.",
        tip: "The single most important security step is running in Docker. It takes one config change and prevents the worst-case scenarios. If you do nothing else from this list, do that."
      }
    ]
  },
  appendix: {
    title: "Appendix: Project Startup System",
    subtitle: "The documentation + skill setup that gives Claude a memory",
    icon: FileText,
    sections: [
      {
        title: "The Core Concept",
        content: `You come back to a project after a week away. Instead of spending 30 minutes re-explaining where you left off, you type "let's continue" — and Claude picks up exactly where you stopped, knows every decision you've made, and recommends what to tackle next.

That's the **Project Startup System**: a small set of documentation files plus the skills, agents, and hooks that read and write them automatically. Claude doesn't remember between sessions on its own — these files are its memory, and the workflow layer from Module 3 is what keeps them current without you thinking about it.`,
        analogy: "Think of it like a hospital shift-change log. When nurses change shifts they don't just say 'good luck' — they hand over detailed notes on each patient. Your project docs are that handover, and your skills are the nurse who writes them every time."
      },
      {
        title: "The Project Doc System",
        content: `Five plain-markdown files live in each project. Claude reads them at the start of a session and updates them as you work.

| File | Purpose | Analogy |
|------|---------|---------|
| **CONTEXT.md** | Domain knowledge, terminology, integrations, business rules | Internal wiki page |
| **TASKS.md** | Active task tracking (TODO, IN PROGRESS, DONE) | Trello board in markdown |
| **PROGRESS.md** | Session-by-session work log | Pilot's flight log |
| **PLAN.md** | Strategic planning for complex features | Architectural blueprint |
| **TEST_LOG.md** | QA activities, bug investigations, and fixes | Lab notebook |

You don't create these by hand. Say **"initialize project"** (the \`auto-init\` skill) and Claude analyzes your project and writes them for you. From then on, the skills below keep them up to date.`,
        tip: "Keep these files in the project's git repo. They travel with the code, and any teammate (or any fresh Claude session) gets the full picture instantly."
      },
      {
        title: "Your Skill-Driven Workflow",
        content: `This is where the Project Startup System stops being "documentation" and becomes a **workflow**. Each phrase below maps to a skill that reads or updates your docs and moves the work forward — the exact loop from Module 4, automated.

| Say this... | Skill | What it does |
|-------------|-------|--------------|
| "let's continue" / "/pickup" | **pickup** | Reads your docs + last session, tells you where you left off and what's next |
| "initialize project" | **auto-init** | Creates the doc files for a new project |
| "commit this" / "/commit" | **commit** | Checkpoints your work with a clear message, advances the task |
| "ship it" / "/push" | **push** | Commits and pushes (and deploys, if your project auto-deploys) |
| "run the tests" / "/test" | **test** | Runs lint, types, and tests; logs results to TEST_LOG.md |
| "wrap up" / "/wrap-up" | **wrap-up** | Saves PROGRESS.md and a handoff note so next session starts cold-fast |

The rhythm of a session: **/pickup** to start → build → **/commit** at checkpoints → **/test** before shipping → **/push** to ship → **/wrap-up** to close. You'll internalize it in a week.`,
        analogy: "These skills are the dashboard controls of your project. You don't reach into the engine — you press 'resume,' 'save,' 'ship,' and the machinery underneath does the right thing every time."
      },
      {
        title: "Agents in Your Workflow",
        content: `Skills run your routine. **Agents** (Module 3.2) handle the specialist work — and a few of them earn their place in almost every project:

| Agent | Role | When you reach for it |
|-------|------|----------------------|
| **Explorer** | Maps unfamiliar code, finds where things live (read-only) | Before changing code you didn't write |
| **Reviewer** | Regression + security sweep on your changes | Right before /push |
| **Debugger** | Root-cause analysis on a failing test or bug | When something breaks and you don't know why |
| **Test-runner** | Writes and runs tests, reports failures | After finishing a feature |

The toolkit ships all four. The habit that matters most: **Explorer before you change, Reviewer before you ship.** Those two bookends catch the majority of mistakes before they cost you anything.`,
        analogy: "Your skills are the daily staff who keep the place running. Your agents are the specialists you call in — the inspector before you open, the detective when something's wrong. You don't need them every minute, but you're glad they exist."
      },
      {
        title: "Hooks That Run Themselves",
        content: `The final layer needs no command at all. **Hooks** (Module 3.3) fire on events, so parts of this system maintain themselves:

• **SessionStart** — checks your project has its doc files and nudges Claude to create them if not. You never forget to initialize a project again.
• **Stop** — logs what happened this session, so PROGRESS.md and your handoff note stay current even if you forget to wrap up.

The toolkit ships a couple of safe, read-only hooks like these to start. As you notice yourself repeating the same setup or cleanup, wire up a hook and never think about it again.`,
        tip: "Resist the urge to automate everything on day one. Add hooks for the friction you actually feel, one at a time. A workflow you understand beats a clever one you don't."
      },
      {
        title: "Session Management",
        content: `Claude's context window is its short-term memory — it can only hold so much before things get fuzzy. Two commands keep it sharp across long work:

| Command | What it does | When to use |
|---------|-------------|-------------|
| \`/compact\` | Summarizes the conversation and frees up context | Context getting long but you're still on related tasks |
| \`/clear\` | Completely resets the context | Switching to unrelated work, or after a major milestone |

**When to /clear:** switching to an unrelated task; after a big milestone; when Claude seems confused by a long history.

**When NOT to /clear:** in the middle of multi-step work; before you've wrapped up; when the next task builds on what you just did.

This is why the doc system matters: because \`/clear\` wipes the conversation, your CONTEXT.md, TASKS.md, and PROGRESS.md are what survive. Wrap up before you clear, and a fresh session loses nothing.`,
        analogy: "Context is short-term memory; your project docs are the notebook. /compact is jotting key points on a sticky note to keep going; /clear is sleeping and starting a new day — fine, as long as you wrote it down first."
      },
      {
        title: "Install It All — One Command",
        content: `You can set up this entire system — the doc workflow, the starter skills, the agents, and a few safe hooks — with one command. Pick your OS:

**Mac / Linux**
\`\`\`
curl -fsSL https://operators-academy.vercel.app/claude-setup/install.sh | bash
\`\`\`

**Windows (PowerShell)**
\`\`\`
irm https://operators-academy.vercel.app/claude-setup/install.ps1 | iex
\`\`\`

The installer backs up your existing config first, then installs into \`~/.claude/\`. After it finishes, start any project:

\`\`\`
cd your-project
claude
\`\`\`
Then say **"initialize project"** and you're running the full workflow.

**Configuration layers** (more specific wins, like CSS):

| Level | Location | Scope |
|-------|----------|-------|
| **Global** | \`~/.claude/CLAUDE.md\` | Every project on your machine |
| **Project** | \`./CLAUDE.md\` | Just that project |
| **Local** | \`./CLAUDE.local.md\` | Personal overrides (not shared in git) |`,
        installBanner: { color: 'purple', link: '/tools/install', text: 'Full install guide + what’s included', labelText: 'Install' }
      }
    ]
  }
};

export const glossaryTerms = [
  { term: "Agent", definition: "A specialized Claude configuration for specific tasks with particular instructions, personality, or capabilities.", category: "Claude Code" },
  { term: "Agent Teams", definition: "An experimental feature that coordinates multiple Claude Code instances working together \u2014 one lead session spawns teammates that work independently, communicate directly, and share a task list.", category: "Claude Code" },
  { term: "cd", definition: "Change Directory - Terminal command to navigate into a folder. Use 'cd ..' to go up one level.", category: "Terminal" },
  { term: "Claude Code", definition: "An AI-powered development tool that runs in your terminal and can create actual applications and files.", category: "Tools" },
  { term: "Claude", definition: "Anthropic’s AI assistant. The chat app (claude.ai) is your thinking partner; Claude Code is the terminal tool that builds and ships.", category: "Tools" },
  { term: "CLAUDE.md", definition: "A markdown file containing project-specific instructions that Claude reads automatically.", category: "Project System" },
  { term: "Compact", definition: "The /compact command summarizes your conversation to save context space while preserving key information.", category: "Claude Code" },
  { term: "Context", definition: "Claude's working memory - the information it has about your project and conversation. More relevant context = better output.", category: "Claude Code" },
  { term: "CONTEXT.md", definition: "Documentation file for domain knowledge, terminology, integrations, and business rules.", category: "Project System" },
  { term: "Fork", definition: "The /fork command creates a branch to try something without affecting your main work.", category: "Claude Code" },
  { term: "Hooks", definition: "Automatic triggers that run when certain events happen (like before/after Claude edits a file).", category: "Claude Code" },
  { term: "ls", definition: "List - Terminal command to show files and folders in your current directory.", category: "Terminal" },
  { term: "MCP", definition: "Model Context Protocol - Lets Claude connect to external services like databases, APIs, and other tools.", category: "Claude Code" },
  { term: "mkdir", definition: "Make Directory - Terminal command to create a new folder.", category: "Terminal" },
  { term: "Operator", definition: "Someone who builds AI-powered systems that work automatically, rather than just prompting AI for answers.", category: "General" },
  { term: "PLAN.md", definition: "Documentation file for strategic planning of complex features - like an architectural blueprint.", category: "Project System" },
  { term: "QA Agents", definition: "Four specialized Claude Code agents (Logger, Feature Tester, Debugger, QA Orchestrator) that handle different aspects of quality assurance.", category: "Project System" },
  { term: "PROGRESS.md", definition: "Documentation file for session-by-session work logs - like a pilot's flight log.", category: "Project System" },
  { term: "Prompt", definition: "The instructions or questions you give to an AI. Better prompts = better outputs.", category: "General" },
  { term: "pwd", definition: "Print Working Directory - Terminal command to show your current location in the folder structure.", category: "Terminal" },
  { term: "Skills", definition: "Reusable capabilities you can give Claude, like knowing how to use a specific framework.", category: "Claude Code" },
  { term: "TASKS.md", definition: "Documentation file for active task tracking (TODO, IN PROGRESS, DONE) - like a Trello board in markdown.", category: "Project System" },
  { term: "TEST_LOG.md", definition: "Documentation file for QA activities, bug investigations, and prevention rules - like a lab notebook.", category: "Project System" },
  { term: "Terminal", definition: "A text-based interface for interacting with your computer by typing commands.", category: "General" },
  { term: "Tools", definition: "Actions Claude can take - reading files, writing code, running commands, searching the web.", category: "Claude Code" },
  { term: "OpenClaw", definition: "An open-source personal AI agent that runs on your own hardware, connects to messaging apps (WhatsApp, Telegram, iMessage, etc.), and autonomously executes real-world tasks 24/7.", category: "OpenClaw" },
  { term: "ClawHub", definition: "Community marketplace for OpenClaw skills \u2014 pre-built integrations and capabilities that extend what your agent can do.", category: "OpenClaw" },
  { term: "Ollama", definition: "Open-source tool for running AI language models locally on your machine. Used with OpenClaw to reduce or eliminate cloud API costs.", category: "OpenClaw" },
  { term: "VPS", definition: "Virtual Private Server \u2014 a cloud-hosted computer you rent by the month. A cost-effective alternative to buying hardware for running OpenClaw 24/7.", category: "OpenClaw" },
  { term: "Docker", definition: "Containerization tool that isolates applications from the host system. Critical for running OpenClaw securely by restricting file and network access.", category: "OpenClaw" },
  { term: "Prompt Injection", definition: "A security attack where hidden instructions in emails, messages, or web pages trick an AI agent into performing unintended actions.", category: "OpenClaw" },
  { term: "Model Routing", definition: "Strategy of sending simple tasks to cheap/free AI models and only using expensive models for complex reasoning \u2014 the key to keeping OpenClaw costs under $10/month.", category: "OpenClaw" },
  { term: "Subagent", definition: "A separate Claude instance the main session spawns to handle one focused task in its own clean context window, then report back. Same idea as an Agent.", category: "Claude Code" },
  { term: "Plan Mode", definition: "A Claude Code mode where it researches and proposes an approach, then waits for your approval before changing any files.", category: "Claude Code" },
  { term: "Native Installer", definition: "The recommended way to install Claude Code (curl ... | bash on Mac/Linux, irm ... | iex on Windows). No Node.js or npm required.", category: "Claude Code" },
  { term: "CLI", definition: "Command-Line Interface — a tool you run by typing commands in the terminal. Claude Code is itself a CLI, and can use other CLIs (like git or gh) on your behalf.", category: "Claude Code" },
  { term: "SKILL.md", definition: "The plain-markdown file that defines a Skill — a short header plus instructions Claude follows when you trigger the skill by name.", category: "Claude Code" },
  { term: "MCP Server", definition: "A connector that lets Claude Code use an external tool (GitHub, a database, your host) directly, without copy-pasting between apps.", category: "Claude Code" },
  { term: "Reviewer Agent", definition: "A subagent that sweeps your changes for bugs, security gaps, and regressions before you ship. Run it right before /push.", category: "Project System" },
  { term: "Explorer Agent", definition: "A read-only subagent that maps unfamiliar code and finds where things live. Run it before changing code you did not write.", category: "Project System" },
];
