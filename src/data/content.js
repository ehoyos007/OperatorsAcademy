/**
 * content.js — hand-authored enrichment layer, merged over items.generated.json.
 *
 * OWNED BY THE CONTENT STREAM. The generator only produces mechanical fields
 * (name, kind, tier, category, technical tagline, install command, updated).
 * Everything a human should write lives here and is keyed by slug:
 *   operator.tagline  — one plain line, "what it does for you", no jargon
 *   operator.summary  — 2-4 sentences, plain language
 *   operator.setupPrompt — paste-into-Claude-Code prompt (overrides the default)
 *   tags[]            — surfaced in search + tag filter
 *   faq[]             — [{q,a}]
 *   seeAlso[]         — related slugs (same category)
 *
 * `ecosystem` holds full Item records for curated external tools OA teaches but
 * does NOT ship (origin: 'ecosystem'). Each MUST carry a source link + note it's
 * independent / not affiliated.
 *
 * OA items DO NOT set operator.setupPrompt here — the toolkit-install default in
 * items.js is correct for them. Only ecosystem items carry a per-tool setupPrompt.
 */

// slug → override object. Absent slugs fall back to generated fields (see items.js).
export const overrides = {
  // ── session ──────────────────────────────────────────────────────────────
  'auto-init': {
    operator: {
      tagline: 'Sets up the starter documents a new project needs so Claude always has context to work from.',
      summary:
        'When you start a project, auto-init looks at what is already there, then creates the handful of tracking documents Claude relies on — a task list, a project overview, a progress log, and a few more. You confirm each one before it is written, so nothing appears without your say-so.',
    },
    tags: ['setup', 'docs', 'onboarding', 'project'],
    faq: [
      { q: 'Will it overwrite my existing notes?', a: 'No — it only creates the documents that are missing, and asks you to confirm each one first.' },
      { q: 'When should I run it?', a: 'Right at the start of a new project, so every later session has context to pick up from.' },
    ],
    seeAlso: ['pickup', 'wrap-up', 'my-help'],
  },
  'auto-init-check': {
    operator: {
      tagline: 'Quietly reminds you to set up your project documents when it notices they are missing.',
      summary:
        'This runs on its own in the background at the start of a session. If your project is missing the documents Claude works best with, it nudges you to create them. You never call it directly — it just watches and prompts.',
    },
    tags: ['automation', 'setup', 'docs', 'reminder'],
    faq: [
      { q: 'Do I need to run this myself?', a: 'No — it is a background helper that triggers automatically. It comes with the toolkit.' },
      { q: 'What does it actually do?', a: 'It checks whether your project has its core documents and, if not, suggests running auto-init.' },
    ],
    seeAlso: ['auto-init', 'session-logger', 'pickup'],
  },
  'git-commit': {
    operator: {
      tagline: 'Saves and ships your finished work in the background so you can keep moving without stopping.',
      summary:
        'After a chunk of work is done, this helper records it and sends it off to your project history on its own — while you keep working on the next thing. It handles the save-and-ship step so you never have to break your flow to do it by hand.',
    },
    tags: ['git', 'commit', 'automation', 'shipping'],
    faq: [
      { q: 'How is this different from the push skill?', a: 'The push skill is something you trigger; this agent can run on its own in the background after changes are made.' },
      { q: 'Will it ship something I am not ready to share?', a: 'It runs when work is completed, and you stay in control of when meaningful changes go out.' },
    ],
    seeAlso: ['push', 'commit', 'pr'],
  },
  'session-logger': {
    operator: {
      tagline: 'Keeps a running record of what happens in each work session, automatically.',
      summary:
        'This background helper writes down what you and Claude did during a session, so there is always a trail you can look back on. It runs on its own — you do not have to remember to save anything.',
    },
    tags: ['automation', 'logging', 'session', 'history'],
    faq: [
      { q: 'Do I have to turn it on each time?', a: 'No — it runs automatically once the toolkit is installed.' },
      { q: 'Where do the notes end up?', a: 'In your project, so later sessions and the pickup skill can read them.' },
    ],
    seeAlso: ['wrap-up', 'pickup', 'auto-init-check'],
  },
  commit: {
    operator: {
      tagline: 'Saves a checkpoint of your work and moves you straight on to the next task.',
      summary:
        'When you finish a piece of work, commit records it as a save point, quietly runs a quick health check in the background, and points you at what is next. It is the mid-session checkpoint — smaller than wrapping up or shipping.',
    },
    tags: ['git', 'checkpoint', 'session', 'tasks'],
    faq: [
      { q: 'Does this ship my work to everyone?', a: 'No — it saves locally. Use push when you want it to go out and deploy.' },
      { q: 'What happens after it saves?', a: 'It advances you to the next task so you keep your momentum.' },
    ],
    seeAlso: ['push', 'wrap-up', 'git-commit'],
  },
  'daily-tasks': {
    operator: {
      tagline: 'Shows you what is on your plate today for the project you are in.',
      summary:
        'Ask for your daily tasks and this pulls up what is scheduled for today in the current project. It is a quick "what should I be doing" check so you can start the session already pointed in the right direction.',
    },
    tags: ['tasks', 'planning', 'daily', 'focus'],
    faq: [
      { q: 'Is this specific to one project?', a: 'Yes — it shows the tasks tied to the project you are currently working in.' },
      { q: 'Is this included in the free toolkit?', a: 'No — daily-tasks is part of the premium toolkit.' },
    ],
    seeAlso: ['pickup', 'my-help', 'wrap-up'],
  },
  handoff: {
    operator: {
      tagline: 'Bundles up your current work so you can continue it somewhere else with full context.',
      summary:
        'When you want to move a conversation from the command line to the Claude web app — or hand it to another Claude entirely — handoff packages the topic plus the relevant files into a tidy bundle you can upload. The new session starts with everything it needs, so you do not have to re-explain.',
    },
    tags: ['handoff', 'context', 'continuity', 'packaging'],
    faq: [
      { q: 'Why would I move a session elsewhere?', a: 'Usually to keep going somewhere with a bigger window or different tools, like the Claude web app.' },
      { q: 'Does it include my actual files?', a: 'Yes — it copies the relevant source so the next session has real context, not just a summary.' },
    ],
    seeAlso: ['wrap-up', 'pickup', 'session-review'],
  },
  'my-help': {
    operator: {
      tagline: 'Shows you a quick menu of everything your setup can do.',
      summary:
        'Forget what tools you have? my-help lists all your custom commands, background helpers, and integrations in one place. It is the "what can you do" cheat sheet for your own toolkit.',
    },
    tags: ['reference', 'help', 'discovery', 'tools'],
    faq: [
      { q: 'Is this a good starting point?', a: 'Yes — run it any time you forget which commands are available.' },
      { q: 'Is it in the free toolkit?', a: 'No — my-help is part of the premium toolkit.' },
    ],
    seeAlso: ['pickup', 'daily-tasks', 'auto-init'],
  },
  pickup: {
    operator: {
      tagline: 'Catches you up on exactly where you left off and what to do next.',
      summary:
        'At the start of a new session, pickup reads your recent notes, your task list, and the state of the project, then hands you a short briefing on where things stand and the recommended next step. It is the counterpart to wrapping up — no more staring at a cold project trying to remember.',
    },
    tags: ['session', 'continuity', 'briefing', 'resume'],
    faq: [
      { q: 'What does it read to catch me up?', a: 'Your session notes, handoff, task list, and progress record from previous work.' },
      { q: 'When should I run it?', a: 'At the start of a session, especially after time away from the project.' },
    ],
    seeAlso: ['wrap-up', 'handoff', 'commit'],
  },
  pr: {
    operator: {
      tagline: 'Packages your changes up for review before they go live.',
      summary:
        'When work should be looked over before it merges in, pr sets up a separate copy of your changes and opens a review request. It is for team projects or riskier changes where you want a second look — rather than shipping straight to production.',
    },
    tags: ['git', 'review', 'pull-request', 'shipping'],
    faq: [
      { q: 'How is this different from push?', a: 'Push ships straight to your main line; pr opens a review request first, for when you want changes reviewed before merging.' },
      { q: 'When would I use it?', a: 'For team repositories, or changes risky enough to warrant a review.' },
    ],
    seeAlso: ['push', 'commit', 'git-commit'],
  },
  push: {
    operator: {
      tagline: 'Ships your finished work so it goes live.',
      summary:
        'push saves your work and sends it out — and if you forgot to wrap up first, it does that for you. On your main project line it also tidies up your session records. This is the "make it live" button; your site or app updates automatically afterward.',
    },
    tags: ['git', 'deploy', 'shipping', 'session'],
    faq: [
      { q: 'Does my site update after I push?', a: 'Yes — pushing to your main line triggers the deploy automatically.' },
      { q: 'What if I did not wrap up first?', a: 'Push handles that for you if your session notes are stale, before it ships.' },
    ],
    seeAlso: ['commit', 'pr', 'wrap-up'],
  },
  'session-review': {
    operator: {
      tagline: 'Looks back over your past work sessions and tells you what you got done.',
      summary:
        'Ask what you worked on and session-review reads through your recent session records and summarizes what was accomplished across them. It is useful for status updates, standups, or just remembering where a stretch of work went.',
    },
    tags: ['review', 'history', 'session', 'summary'],
    faq: [
      { q: 'How far back can it look?', a: 'Across your recent Claude Code sessions, as far as the records go.' },
      { q: 'Is it in the free toolkit?', a: 'No — session-review is part of the premium toolkit.' },
    ],
    seeAlso: ['wrap-up', 'handoff', 'pickup'],
  },
  'wrap-up': {
    operator: {
      tagline: 'Saves your session so next time picks up exactly where you left off.',
      summary:
        'When you stop for the day, wrap-up records what you did, updates your project docs, and writes a short handoff note. Next session, Claude reads it and you resume without re-explaining anything.',
    },
    tags: ['session', 'handoff', 'continuity', 'docs'],
    faq: [
      { q: 'Does it commit my code?', a: 'No — wrap-up only saves session notes and docs. Use push to commit and ship.' },
      { q: 'Where do the notes go?', a: 'Into your project notes and a handoff file Claude reads on the next pickup.' },
    ],
    seeAlso: ['pickup', 'handoff', 'commit'],
  },
  'iterm-tab-notify': {
    operator: {
      tagline: 'Pings your terminal tab when Claude needs you, so you do not have to babysit it.',
      summary:
        'This background helper flags your terminal tab when Claude finishes or needs your input — handy when you step away or run several sessions at once. You do not call it; it just signals you when your attention is needed.',
    },
    tags: ['automation', 'notification', 'terminal', 'session'],
    faq: [
      { q: 'Do I set this up manually?', a: 'No — it installs with the toolkit and runs on its own.' },
      { q: 'What is it for?', a: 'So you can look away and still know the moment a session wants you back.' },
    ],
    seeAlso: ['iterm-tab-reset', 'tab-title', 'session-logger'],
  },
  'iterm-tab-reset': {
    operator: {
      tagline: 'Clears the alert on your terminal tab once you are back and looking at it.',
      summary:
        'The companion to the notify helper — once you return to a tab that was flagged for attention, this quietly clears the alert so your tabs stay meaningful. It runs automatically in the background.',
    },
    tags: ['automation', 'terminal', 'notification', 'session'],
    faq: [
      { q: 'Does it work on its own?', a: 'Yes — it runs automatically alongside the notify helper.' },
      { q: 'Why does it matter?', a: 'It keeps tab alerts honest, so a flagged tab always means one that still needs you.' },
    ],
    seeAlso: ['iterm-tab-notify', 'tab-title', 'session-logger'],
  },
  'tab-title': {
    operator: {
      tagline: 'Labels each terminal tab so you can tell your running sessions apart at a glance.',
      summary:
        'When you have several sessions open, this background helper names each terminal tab after what it is working on, so you are not guessing which is which. It runs automatically — no setup on your end.',
    },
    tags: ['automation', 'terminal', 'organization', 'session'],
    faq: [
      { q: 'Do I have to name tabs myself?', a: 'No — it labels them for you automatically.' },
      { q: 'When is it most useful?', a: 'When you run multiple sessions side by side and need to keep them straight.' },
    ],
    seeAlso: ['iterm-tab-notify', 'iterm-tab-reset', 'session-logger'],
  },

  // ── quality ──────────────────────────────────────────────────────────────
  debugger: {
    operator: {
      tagline: 'Tracks down why something broke and pinpoints the actual cause.',
      summary:
        'When something is not working and you cannot see why, the debugger digs in, traces the problem back to its source, and tells you what is really going wrong — instead of guessing. Point it at a failing test or unexpected behavior and let it isolate the cause.',
    },
    tags: ['debugging', 'troubleshooting', 'root-cause', 'fixing'],
    faq: [
      { q: 'Does it fix the bug too?', a: 'It focuses on finding the true cause so the fix is targeted; you stay in control of the change.' },
      { q: 'When should I reach for it?', a: 'When a test fails or something behaves in a way you did not expect.' },
    ],
    seeAlso: ['reviewer', 'test-writer-fixer', 'improve'],
  },
  reviewer: {
    operator: {
      tagline: 'Gives your changes a careful once-over before you ship them.',
      summary:
        'Before you send work out, the reviewer sweeps your changes for bugs, missed tests, security gaps, and things that quietly break elsewhere — then gives you a clear pass-or-needs-work verdict. It only reports; it never changes your code, so nothing happens without you.',
    },
    tags: ['review', 'quality', 'pre-ship', 'safety'],
    faq: [
      { q: 'Will it change my code?', a: 'No — it only reports findings. You decide what to act on.' },
      { q: 'When should I run it?', a: 'On every set of changes right before you ship, as a safety check.' },
    ],
    seeAlso: ['code-review', 'debugger', 'test'],
  },
  'test-runner': {
    operator: {
      tagline: 'Checks that your recent work actually works by testing it for you.',
      summary:
        'This helper looks at what you have been building, writes quick checks for a few of the most important pieces, runs them, and records the results. It is a proactive health check so problems surface early rather than after you ship.',
    },
    tags: ['testing', 'verification', 'quality', 'health-check'],
    faq: [
      { q: 'Do I need to write tests myself?', a: 'No — it writes and runs them for the recent work, then logs how it went.' },
      { q: 'When does it help most?', a: 'Right after finishing a feature, or before committing.' },
    ],
    seeAlso: ['test-writer-fixer', 'test', 'reviewer'],
  },
  'test-writer-fixer': {
    operator: {
      tagline: 'Writes tests for your work, runs them, and fixes the ones that fail.',
      summary:
        'After you change something, this helper makes sure it is covered by tests — writing new ones where they are missing, running the whole set, and repairing failures without changing what the tests are meant to prove. It keeps your safety net healthy as the project grows.',
    },
    tags: ['testing', 'coverage', 'fixing', 'quality'],
    faq: [
      { q: 'What if I have no tests yet?', a: 'It can create them from scratch for the important parts of your code.' },
      { q: 'Will fixing failures weaken the tests?', a: 'No — it preserves what each test is meant to verify while repairing the failure.' },
    ],
    seeAlso: ['test-runner', 'test', 'debugger'],
  },
  improve: {
    operator: {
      tagline: 'Reviews your whole project and hands you a prioritized list of what to improve.',
      summary:
        'improve acts like a senior advisor looking over your project — spotting bugs, security issues, weak spots, and opportunities — then writes up clear, ranked plans for what to fix or build next. It never changes anything itself; it produces the plan and hands it off for someone (or another helper) to carry out.',
    },
    tags: ['audit', 'roadmap', 'review', 'planning'],
    faq: [
      { q: 'Does it make the changes?', a: 'No — it only surveys and produces plans. Nothing is edited without you.' },
      { q: 'What can it look for?', a: 'Bugs, security gaps, performance, missing tests, tech debt, and where to take the project next.' },
    ],
    seeAlso: ['reviewer', 'code-review', 'test'],
  },
  pagespeed: {
    operator: {
      tagline: 'Measures how fast your web page loads and tells you exactly what to fix to speed it up.',
      summary:
        'pagespeed runs the same kind of speed test the big performance tools use, then traces each slow spot back to the exact part of your project responsible — with fixes ranked by impact. It is for when a page feels sluggish and you want a concrete list, not vague advice.',
    },
    tags: ['performance', 'speed', 'web', 'audit'],
    faq: [
      { q: 'Can I test a live site or just a local one?', a: 'Both — you can point it at a deployed page or a local build.' },
      { q: 'Is it in the free toolkit?', a: 'No — pagespeed is part of the premium toolkit.' },
    ],
    seeAlso: ['smoke', 'performance-benchmarker', 'test'],
  },
  smoke: {
    operator: {
      tagline: 'Opens your live site in a real browser and checks that every page actually works.',
      summary:
        'After you ship, smoke drives a real browser through your site — loading each page, clicking through the flows, watching for errors, and snapping a picture of every screen. It is the "did it actually render, or did I just break production" check that tests alone cannot give you.',
    },
    tags: ['testing', 'browser', 'visual', 'post-deploy'],
    faq: [
      { q: 'How is this different from running tests?', a: 'Tests check the code; smoke opens the actual running site and verifies it by eye.' },
      { q: 'When do I use it?', a: 'Right after deploying, to confirm the live pages load and nothing throws.' },
    ],
    seeAlso: ['test', 'pagespeed', 'reviewer'],
  },
  test: {
    operator: {
      tagline: 'Runs all your project checks and tells you plainly if it is green or broken.',
      summary:
        'test runs the full battery — code checks, type checks, unit tests, browser tests, and a production build — then reports a clear pass or fail and logs it. It is the mechanical "is this healthy" gate you run after a change and before shipping.',
    },
    tags: ['testing', 'quality', 'verification', 'pre-ship'],
    faq: [
      { q: 'What does it actually run?', a: 'Your linting, type checks, unit and browser tests, and a production build.' },
      { q: 'When should I run it?', a: 'After a fix or refactor, and before you push or open a review.' },
    ],
    seeAlso: ['smoke', 'reviewer', 'test-runner'],
  },
  'api-tester': {
    operator: {
      tagline: 'Stress-tests the behind-the-scenes connections your app relies on to make sure they hold up.',
      summary:
        'This helper puts your app data connections through their paces — checking they respond correctly, stay fast under heavy traffic, and match what they promise. It is for making sure the plumbing is robust before real users hit it.',
    },
    tags: ['api', 'testing', 'load', 'performance'],
    faq: [
      { q: 'Do I need to be technical to benefit?', a: 'It surfaces plain results — whether the connections are reliable, fast, and correct.' },
      { q: 'Is it in the free toolkit?', a: 'No — api-tester is part of the premium toolkit.' },
    ],
    seeAlso: ['performance-benchmarker', 'test', 'reviewer'],
  },
  'code-review': {
    operator: {
      tagline: 'Gives your work a thorough, senior-level review with clear, actionable feedback.',
      summary:
        'code-review reads through your changes like an experienced reviewer would and hands back specific, prioritized feedback you can act on. It is a deeper look than the quick pre-ship sweep — for when you want a careful second opinion on the work.',
    },
    tags: ['review', 'quality', 'feedback', 'audit'],
    faq: [
      { q: 'How is this different from the reviewer agent?', a: 'The reviewer is a fast pre-ship safety sweep; code-review is a deeper, more thorough pass with detailed feedback.' },
      { q: 'Is it in the free toolkit?', a: 'No — code-review is part of the premium toolkit.' },
    ],
    seeAlso: ['reviewer', 'improve', 'test'],
  },
  'performance-benchmarker': {
    operator: {
      tagline: 'Measures how fast your app really is and tells you where it is dragging.',
      summary:
        'This helper profiles your app to find the slow spots, measures real speed, and hands you concrete steps to make it faster. It is for turning a vague "this feels slow" into a ranked list of what to fix.',
    },
    tags: ['performance', 'profiling', 'speed', 'optimization'],
    faq: [
      { q: 'How is this different from pagespeed?', a: 'Pagespeed focuses on web page load; this profiles broader application performance and bottlenecks.' },
      { q: 'Is it in the free toolkit?', a: 'No — performance-benchmarker is part of the premium toolkit.' },
    ],
    seeAlso: ['pagespeed', 'api-tester', 'test'],
  },
  playwright: {
    operator: {
      tagline: 'Lets Claude drive a real web browser to test and interact with your site.',
      summary:
        'This official add-on gives Claude control of a real browser so it can click through your pages, fill forms, and check that flows work — the engine behind hands-on browser testing. It switches on automatically with the premium setup.',
    },
    tags: ['browser', 'testing', 'automation', 'plugin'],
    faq: [
      { q: 'Do I install this separately?', a: 'No — it turns on automatically as part of the premium setup.' },
      { q: 'What is it used for?', a: 'Driving a real browser to test your site and automate web tasks.' },
    ],
    seeAlso: ['smoke', 'test', 'code-review'],
  },

  // ── build ────────────────────────────────────────────────────────────────
  explorer: {
    operator: {
      tagline: 'Maps out an unfamiliar part of your project so you understand it before changing anything.',
      summary:
        'Before you touch code you do not know well, the explorer reads through it and hands back a map — which pieces matter, how the data flows, and a suggested next step. It never changes anything; it just gets you oriented so the next move is informed.',
    },
    tags: ['mapping', 'discovery', 'read-only', 'orientation'],
    faq: [
      { q: 'Does it change my code?', a: 'No — it is read-only. It only maps and explains.' },
      { q: 'When should I use it?', a: 'Before editing unfamiliar code, so you are not working blind.' },
    ],
    seeAlso: ['logger', 'ui-recon', 'compound-engineering'],
  },
  logger: {
    operator: {
      tagline: 'Adds the right progress markers to a feature so you can see what it is doing.',
      summary:
        'When you are building something complex and cannot tell what is happening inside it, the logger adds well-placed status markers so the behavior becomes visible. It makes a feature observable, which makes future problems far easier to spot.',
    },
    tags: ['logging', 'observability', 'debugging', 'build'],
    faq: [
      { q: 'Why would I want this?', a: 'So when something goes wrong later, you can see what the feature was doing instead of guessing.' },
      { q: 'When is it added?', a: 'While building features that are complex enough to need visibility.' },
    ],
    seeAlso: ['explorer', 'compound-engineering', 'devops-automator'],
  },
  tournament: {
    operator: {
      tagline: 'Helps you land on a design by showing options and narrowing down to a winner.',
      summary:
        'Instead of guessing at a design in one shot, tournament shows you three versions of something, you pick your favorite, and the next round moves closer to it — until a clear winner locks in. It is design-by-elimination, steered by your taste round after round.',
    },
    tags: ['design', 'ui', 'decision', 'iteration'],
    faq: [
      { q: 'Do I need design skills?', a: 'No — you just pick the option you like best each round, and it converges for you.' },
      { q: 'Is it in the free toolkit?', a: 'No — tournament is part of the premium toolkit.' },
    ],
    seeAlso: ['ui-recon', 'frontend-design', 'ui-designer'],
  },
  'ui-recon': {
    operator: {
      tagline: 'Finds the screens you already built so new ones match instead of reinventing.',
      summary:
        'Before designing something new, ui-recon hunts through your project for similar existing screens — the pop-ups, panels, tables, and forms you already have — and pulls out real examples and real data from them. So new work builds on what you have got, with real content instead of placeholder names.',
    },
    tags: ['design', 'reuse', 'discovery', 'ui'],
    faq: [
      { q: 'Why not just design fresh each time?', a: 'Reusing what already exists keeps your product consistent and avoids reinventing solved problems.' },
      { q: 'Does it change anything?', a: 'No — it only reads and reports what you already have.' },
    ],
    seeAlso: ['tournament', 'frontend-design', 'explorer'],
  },
  'audit-hooks': {
    operator: {
      tagline: 'Sets up an automatic tidy-up that formats your code every time you save it.',
      summary:
        'audit-hooks installs a small automatic step that cleans up your code formatting right before it is saved to your project history — so you never get tripped up by formatting problems later. Set it once and it runs quietly from then on.',
    },
    tags: ['automation', 'formatting', 'git', 'setup'],
    faq: [
      { q: 'Do I have to run it every time?', a: 'No — you set it up once and it runs automatically on every save going forward.' },
      { q: 'Is it in the free toolkit?', a: 'No — audit-hooks is part of the premium toolkit.' },
    ],
    seeAlso: ['compound-engineering', 'devops-automator', 'explorer'],
  },
  'compound-engineering': {
    operator: {
      tagline: 'A repeatable build routine where each thing you finish makes the next thing easier.',
      summary:
        'compound-engineering runs your work through a steady loop — plan it, build it, review it, then capture what you learned — so your project gets easier to work on over time instead of messier. It is a way of building that compounds, turning today effort into tomorrow shortcuts.',
    },
    tags: ['workflow', 'build', 'process', 'systematic'],
    faq: [
      { q: 'What does compound mean here?', a: 'Each cycle records lessons so future work is faster and cleaner, rather than starting from scratch.' },
      { q: 'Is it in the free toolkit?', a: 'No — compound-engineering is part of the premium toolkit.' },
    ],
    seeAlso: ['explorer', 'audit-hooks', 'logger'],
  },
  'dev-browser': {
    operator: {
      tagline: 'Lets Claude use a web browser for you — navigating sites, filling forms, and grabbing data.',
      summary:
        'dev-browser hands Claude a browser it can drive on your behalf: opening pages, clicking, filling out forms, taking screenshots, and pulling data off the web. It remembers where it is between steps, so multi-step web tasks flow without starting over.',
    },
    tags: ['browser', 'automation', 'web', 'scraping'],
    faq: [
      { q: 'How is this different from smoke testing?', a: 'Smoke checks your own site after shipping; dev-browser is a general web helper for navigating and automating any site.' },
      { q: 'Is it in the free toolkit?', a: 'No — dev-browser is part of the premium toolkit.' },
    ],
    seeAlso: ['frontend-design', 'rapid-prototyper', 'ui-recon'],
  },
  'devops-automator': {
    operator: {
      tagline: 'Sets up the machinery that ships, scales, and monitors your app automatically.',
      summary:
        'This helper wires up the behind-the-scenes systems that get your app deployed automatically, keep it running when traffic spikes, and alert you when something breaks. It is for making the operations side hands-off so you can keep building.',
    },
    tags: ['deployment', 'infrastructure', 'automation', 'monitoring'],
    faq: [
      { q: 'Do I need to understand servers to use it?', a: 'It handles the setup and explains what it did; you direct, it configures.' },
      { q: 'Is it in the free toolkit?', a: 'No — devops-automator is part of the premium toolkit.' },
    ],
    seeAlso: ['audit-hooks', 'rapid-prototyper', 'frontend-developer'],
  },
  'frontend-design': {
    operator: {
      tagline: 'Builds polished, good-looking web pages and components that do not feel generic.',
      summary:
        'frontend-design creates web pages, components, and apps with real design quality — the kind that looks intentional rather than templated. Ask it to build a page or make something look good, and it produces creative, production-ready results.',
    },
    tags: ['design', 'frontend', 'ui', 'build'],
    faq: [
      { q: 'Will it look like every other AI-made site?', a: 'No — it is built specifically to avoid the generic look and produce distinctive interfaces.' },
      { q: 'Is it in the free toolkit?', a: 'No — frontend-design is part of the premium toolkit.' },
    ],
    seeAlso: ['frontend-developer', 'ui-designer', 'tournament'],
  },
  'frontend-developer': {
    operator: {
      tagline: 'Builds the interactive parts of your app so they are fast, responsive, and work on every screen.',
      summary:
        'This helper builds user interfaces — the buttons, dashboards, and screens people actually touch — making sure they respond quickly, work on phones and desktops alike, and stay accessible. It is your builder for the visible, interactive layer of the product.',
    },
    tags: ['frontend', 'ui', 'build', 'responsive'],
    faq: [
      { q: 'How is this different from frontend-design?', a: 'Design focuses on how it looks; the developer focuses on building it to work well across devices.' },
      { q: 'Is it in the free toolkit?', a: 'No — frontend-developer is part of the premium toolkit.' },
    ],
    seeAlso: ['frontend-design', 'ui-designer', 'mobile-app-builder'],
  },
  'mobile-app-builder': {
    operator: {
      tagline: 'Builds phone apps that feel smooth and native on both iPhone and Android.',
      summary:
        'This helper creates mobile apps — handling the phone-specific things like smooth scrolling, notifications, and fingerprint or face sign-in — so the result feels like a real native app, not a website in a wrapper. It can target both platforms while reusing work where it makes sense.',
    },
    tags: ['mobile', 'ios', 'android', 'build'],
    faq: [
      { q: 'Can it build for both iPhone and Android?', a: 'Yes — it can target both, reusing code where sensible while keeping each feeling native.' },
      { q: 'Is it in the free toolkit?', a: 'No — mobile-app-builder is part of the premium toolkit.' },
    ],
    seeAlso: ['frontend-developer', 'rapid-prototyper', 'ui-designer'],
  },
  'rapid-prototyper': {
    operator: {
      tagline: 'Spins up a working first version of an app idea fast, so you can try it for real.',
      summary:
        'Got an idea and want to see it working? This helper scaffolds a fresh app and builds a functional first cut quickly — enough to demo, test with people, or validate before you invest more. It is for turning a concept into something you can actually click through.',
    },
    tags: ['prototype', 'mvp', 'build', 'validation'],
    faq: [
      { q: 'Is the result production-ready?', a: 'It is a fast working prototype meant to test the idea; polish comes after it proves out.' },
      { q: 'Is it in the free toolkit?', a: 'No — rapid-prototyper is part of the premium toolkit.' },
    ],
    seeAlso: ['frontend-design', 'mobile-app-builder', 'frontend-developer'],
  },
  'ui-designer': {
    operator: {
      tagline: 'Designs good-looking, functional interfaces and the building blocks behind them.',
      summary:
        'This helper designs interfaces and reusable component sets — the visual system your product is built from — balancing looks with something that can actually be built quickly. It is for when you want the design worked out before or alongside the build.',
    },
    tags: ['design', 'ui', 'components', 'build'],
    faq: [
      { q: 'How is this different from frontend-design?', a: 'They overlap; the ui-designer leans toward design systems and component thinking, feeding what gets built.' },
      { q: 'Is it in the free toolkit?', a: 'No — ui-designer is part of the premium toolkit.' },
    ],
    seeAlso: ['frontend-design', 'frontend-developer', 'tournament'],
  },
  'claude-md-management': {
    operator: {
      tagline: 'Keeps the instructions file that guides Claude in your project tidy and up to date.',
      summary:
        'This official add-on helps maintain the guidance document Claude reads in each project — the one that tells it how to work with your code. It keeps those instructions organized so Claude stays on the same page as you. It switches on automatically with the premium setup.',
    },
    tags: ['configuration', 'plugin', 'docs', 'setup'],
    faq: [
      { q: 'Do I install this myself?', a: 'No — it turns on automatically as part of the premium setup.' },
      { q: 'What does it manage?', a: 'The project guidance file that shapes how Claude works in your codebase.' },
    ],
    seeAlso: ['context7', 'compound-engineering', 'audit-hooks'],
  },
  context7: {
    operator: {
      tagline: 'Gives Claude up-to-date documentation for the tools and libraries you are using.',
      summary:
        'This official add-on lets Claude pull current, version-accurate documentation for the software libraries in your project — so it writes code against how things actually work today, not an outdated memory. It switches on automatically with the premium setup.',
    },
    tags: ['documentation', 'plugin', 'libraries', 'reference'],
    faq: [
      { q: 'Why does this matter?', a: 'Libraries change; this keeps Claude working from current docs instead of stale knowledge.' },
      { q: 'Do I set it up?', a: 'No — it turns on automatically with the premium setup.' },
    ],
    seeAlso: ['claude-md-management', 'compound-engineering', 'frontend-design'],
  },

  // ── planning ─────────────────────────────────────────────────────────────
  plan: {
    operator: {
      tagline: 'Makes Claude think through and lay out a plan before it starts changing anything.',
      summary:
        'plan tells Claude to look at the relevant parts of your project first, then present a clear plan for your approval — before it writes a single change. It is the guardrail against jumping straight into edits on work that matters.',
    },
    tags: ['planning', 'safety', 'approval', 'strategy'],
    faq: [
      { q: 'Does it change my code?', a: 'No — it explores and proposes a plan; nothing changes until you approve.' },
      { q: 'When should I use it?', a: 'Before anything non-trivial, so you agree on the approach up front.' },
    ],
    seeAlso: ['decide', 'interview-me', 'grill-me'],
  },
  decide: {
    operator: {
      tagline: 'Helps you make a confident choice you actually understand, not just a list of options.',
      summary:
        'Stuck on a decision? decide either gives you a fast gut call — "if I were you, here is what I would do" — or walks you through it in plain language, explaining the jargon and talking it out until you land somewhere you trust. It gives a recommendation, not a shrug.',
    },
    tags: ['decision', 'planning', 'advice', 'clarity'],
    faq: [
      { q: 'Will it just list pros and cons?', a: 'No — it gives you an actual recommendation you can understand and trust.' },
      { q: 'Is it in the free toolkit?', a: 'No — decide is part of the premium toolkit.' },
    ],
    seeAlso: ['grill-me', 'interview-me', 'plan'],
  },
  'grill-me': {
    operator: {
      tagline: 'Interviews you hard about your plan to pull everything out of your head before you build.',
      summary:
        'grill-me stress-tests a plan or idea by questioning you relentlessly, saving every answer as it goes, and showing a live score of how aligned you and Claude are. When the score is high enough, you know it is safe to build — because nothing important is still stuck in your head.',
    },
    tags: ['planning', 'discovery', 'alignment', 'brainstorm'],
    faq: [
      { q: 'How is this different from interview-me?', a: 'Grill-me is the intense, one-question-at-a-time version with a shared-understanding score; interview-me is lighter and quicker.' },
      { q: 'Is it in the free toolkit?', a: 'No — grill-me is part of the premium toolkit.' },
    ],
    seeAlso: ['interview-me', 'decide', 'user-stories'],
  },
  'interview-me': {
    operator: {
      tagline: 'Asks you a few pointed questions to make sure you and Claude mean the same thing.',
      summary:
        'Before building something where a wrong assumption would cost you, interview-me asks a handful of quick multiple-choice questions to line up understanding. It is the lightweight alignment check — enough to catch mismatches without a full interrogation.',
    },
    tags: ['planning', 'alignment', 'questions', 'clarity'],
    faq: [
      { q: 'How is this different from grill-me?', a: 'Interview-me is quick and multiple-choice; grill-me is the relentless, scored, deep version.' },
      { q: 'Is it in the free toolkit?', a: 'No — interview-me is part of the premium toolkit.' },
    ],
    seeAlso: ['grill-me', 'decide', 'plan'],
  },
  'reframe-estimates': {
    operator: {
      tagline: 'Rewrites a plan that thinks in weeks and months into one that fits how fast AI actually builds.',
      summary:
        'When a plan is padded with human-scale time estimates — days, sprints, quarters — reframe-estimates strips out the clock and re-describes the work by how complete it is instead. Because building with AI runs in minutes to hours, not calendar weeks. It keeps the order and dependencies; it just kills the false timeline.',
    },
    tags: ['planning', 'estimates', 'ai-speed', 'scope'],
    faq: [
      { q: 'Does it change what the plan does?', a: 'No — it keeps the work and its order, and only removes the misleading time estimates.' },
      { q: 'Is it in the free toolkit?', a: 'No — reframe-estimates is part of the premium toolkit.' },
    ],
    seeAlso: ['user-stories', 'plan', 'sprint-prioritizer'],
  },
  'spawn-team': {
    operator: {
      tagline: 'Splits a big job into parallel streams and puts the right helper on each one.',
      summary:
        'When a task is big enough to divide, spawn-team figures out how to attack it in parallel, picks the best helper for each piece, and runs them at once — after you approve the plan. It is the difference between doing everything one at a time and running several workstreams together.',
    },
    tags: ['planning', 'parallel', 'orchestration', 'teams'],
    faq: [
      { q: 'Does it run without asking me?', a: 'No — it plans the team and pauses for your approval before anything starts.' },
      { q: 'Is it in the free toolkit?', a: 'No — spawn-team is part of the premium toolkit.' },
    ],
    seeAlso: ['sprint-prioritizer', 'workflow-optimizer', 'plan'],
  },
  'user-stories': {
    operator: {
      tagline: 'Turns a plan into a checklist of things a real person can do, so you know when it is truly done.',
      summary:
        'user-stories rewrites a feature or plan as concrete, testable statements — "as a specific person, I can do X and see Y" — so "done" means something a real person can actually do, not a date on a calendar. Every story is traceable and end-to-end checkable.',
    },
    tags: ['planning', 'acceptance', 'requirements', 'done'],
    faq: [
      { q: 'Why use stories instead of a task list?', a: 'They define done by what someone can actually do and observe, which is testable and unambiguous.' },
      { q: 'Is it in the free toolkit?', a: 'No — user-stories is part of the premium toolkit.' },
    ],
    seeAlso: ['reframe-estimates', 'grill-me', 'sprint-prioritizer'],
  },
  'feedback-synthesizer': {
    operator: {
      tagline: 'Reads through piles of user feedback and tells you the patterns worth acting on.',
      summary:
        'This helper takes raw feedback from many sources — reviews, complaints, requests — and boils it down into clear patterns and priorities. It turns a messy pile of opinions into a short list of what actually matters for your product.',
    },
    tags: ['feedback', 'research', 'product', 'synthesis'],
    faq: [
      { q: 'What kind of feedback can it handle?', a: 'Reviews, complaints, feature requests, and other user input from multiple sources.' },
      { q: 'Is it in the free toolkit?', a: 'No — feedback-synthesizer is part of the premium toolkit.' },
    ],
    seeAlso: ['ux-researcher', 'sprint-prioritizer', 'workflow-optimizer'],
  },
  'sprint-prioritizer': {
    operator: {
      tagline: 'Helps you decide what to build next when you have more ideas than time.',
      summary:
        'When you have got a long list of things you could do and limited time, this helper weighs impact against effort and lays out a focused plan for what to tackle first. It is for turning "fifty ideas" into "the handful that matter most right now".',
    },
    tags: ['planning', 'prioritization', 'roadmap', 'tradeoffs'],
    faq: [
      { q: 'How does it decide what comes first?', a: 'It weighs user impact, effort, and strategic value to focus on what delivers the most.' },
      { q: 'Is it in the free toolkit?', a: 'No — sprint-prioritizer is part of the premium toolkit.' },
    ],
    seeAlso: ['feedback-synthesizer', 'reframe-estimates', 'user-stories'],
  },
  'ux-researcher': {
    operator: {
      tagline: 'Digs into how people actually use your product so your decisions are not guesses.',
      summary:
        'This helper studies user behavior, maps out the journeys people take through your product, and validates design choices — so what you build is grounded in real needs and pain points rather than assumptions. It is for understanding your users before betting on a direction.',
    },
    tags: ['research', 'ux', 'users', 'planning'],
    faq: [
      { q: 'What does it produce?', a: 'Insights into user needs and behavior, journey maps, and validation for design decisions.' },
      { q: 'Is it in the free toolkit?', a: 'No — ux-researcher is part of the premium toolkit.' },
    ],
    seeAlso: ['feedback-synthesizer', 'sprint-prioritizer', 'workflow-optimizer'],
  },
  'workflow-optimizer': {
    operator: {
      tagline: 'Finds the slow, clunky spots in how you and Claude work together and smooths them out.',
      summary:
        'This helper looks at how work flows between you and your AI helpers, spots the bottlenecks and awkward handoffs, and streamlines them. It is for making the collaboration itself faster and smoother, not just the code.',
    },
    tags: ['workflow', 'efficiency', 'process', 'optimization'],
    faq: [
      { q: 'What does it optimize?', a: 'The handoffs and steps in how you and your AI helpers work together, removing bottlenecks.' },
      { q: 'Is it in the free toolkit?', a: 'No — workflow-optimizer is part of the premium toolkit.' },
    ],
    seeAlso: ['spawn-team', 'sprint-prioritizer', 'ux-researcher'],
  },

  // ── database ─────────────────────────────────────────────────────────────
  'schema-diff': {
    operator: {
      tagline: 'Catches when your app and your database have quietly fallen out of sync before it breaks things.',
      summary:
        'schema-diff compares what your database actually looks like against what your app expects — and flags the mismatches. It is the early warning for the sneaky bugs that happen when the two drift apart without anyone noticing.',
    },
    tags: ['database', 'drift', 'safety', 'sync'],
    faq: [
      { q: 'What problem does this prevent?', a: 'Bugs that appear when your database structure and your app code no longer match.' },
      { q: 'Is it in the free toolkit?', a: 'No — schema-diff is part of the premium toolkit.' },
    ],
    seeAlso: ['sql-migrate', 'supabase'],
  },
  'sql-migrate': {
    operator: {
      tagline: 'Safely applies changes to your database structure for you.',
      summary:
        'When your database needs a structural change — a new field, a new table — sql-migrate carries it out in a controlled, repeatable way. It is the safe path for evolving your database instead of poking at it by hand and hoping.',
    },
    tags: ['database', 'migration', 'schema', 'changes'],
    faq: [
      { q: 'Is changing a database risky?', a: 'Doing it by hand can be; this applies changes in a controlled, repeatable way to reduce that risk.' },
      { q: 'Is it in the free toolkit?', a: 'No — sql-migrate is part of the premium toolkit.' },
    ],
    seeAlso: ['schema-diff', 'supabase'],
  },
  supabase: {
    operator: {
      tagline: 'Connects Claude to your database so it can look things up and make changes for you.',
      summary:
        'This official add-on links Claude to your Supabase database — the place your app stores its data — so it can inspect the structure, run changes, and answer data questions directly. It switches on automatically with the premium setup.',
    },
    tags: ['database', 'plugin', 'supabase', 'backend'],
    faq: [
      { q: 'Do I install this myself?', a: 'No — it turns on automatically as part of the premium setup.' },
      { q: 'How does it relate to the Supabase MCP?', a: 'This is the bundled plugin version; the recommended Supabase MCP is the external server you can also connect.' },
    ],
    seeAlso: ['sql-migrate', 'schema-diff'],
  },

  // ── content ──────────────────────────────────────────────────────────────
  scribe: {
    operator: {
      tagline: 'Listens as you talk and files what matters into your notes automatically.',
      summary:
        'scribe is an ambient note-taker — you talk freely and it captures the useful bits, routing each one to the right place in your notes: a daily log, a task board, a project page. It catches the context you would otherwise lose while thinking out loud, and files it where it belongs.',
    },
    tags: ['notes', 'capture', 'obsidian', 'organization'],
    faq: [
      { q: 'Where do my notes go?', a: 'Into your local notes vault, sorted into the right daily note, board, or project page.' },
      { q: 'Is it in the free toolkit?', a: 'No — scribe is part of the premium toolkit.' },
    ],
    seeAlso: ['documentation', 'yt-digest', 'copywriting'],
  },
  'yt-digest': {
    operator: {
      tagline: 'Turns a long YouTube video into a clean, skimmable write-up you can actually use.',
      summary:
        'Paste a video transcript and yt-digest produces a tidy single-page summary — the key takeaways, a section-by-section breakdown, notable quotes, plus ready-to-use prompts that apply the video ideas to your own work. It is for getting the value out of an hour-long video in a few minutes.',
    },
    tags: ['video', 'summary', 'content', 'digest'],
    faq: [
      { q: 'What do I give it?', a: 'A YouTube transcript or subtitle file; it produces a clean, organized write-up.' },
      { q: 'Is it in the free toolkit?', a: 'No — yt-digest is part of the premium toolkit.' },
    ],
    seeAlso: ['documentation', 'scribe', 'copy-editing'],
  },
  'copy-editing': {
    operator: {
      tagline: 'Polishes marketing writing you already have through focused editing passes.',
      summary:
        'copy-editing takes copy you have already written and sharpens it — clarity, flow, persuasion — through several focused passes rather than one vague rewrite. It is for improving existing words, not starting from a blank page.',
    },
    tags: ['writing', 'editing', 'marketing', 'copy'],
    faq: [
      { q: 'How is this different from copywriting?', a: 'Copy-editing improves writing you already have; copywriting creates it from scratch.' },
      { q: 'Is it in the free toolkit?', a: 'No — copy-editing is part of the premium toolkit.' },
    ],
    seeAlso: ['copywriting', 'documentation', 'yt-digest'],
  },
  copywriting: {
    operator: {
      tagline: 'Writes marketing copy for your pages from scratch — homepage, pricing, features, and more.',
      summary:
        'copywriting creates persuasive copy for any page you need — a homepage, landing page, pricing page, or about page. Tell it the page and it drafts words built to sell, ready for you to refine. It is the blank-page starter for your marketing writing.',
    },
    tags: ['writing', 'marketing', 'copy', 'pages'],
    faq: [
      { q: 'What pages can it write?', a: 'Homepages, landing pages, pricing, features, about pages, and other product pages.' },
      { q: 'Is it in the free toolkit?', a: 'No — copywriting is part of the premium toolkit.' },
    ],
    seeAlso: ['copy-editing', 'documentation', 'scribe'],
  },
  documentation: {
    operator: {
      tagline: 'Writes clear documentation for your project so others (and future you) can understand it.',
      summary:
        'documentation produces readable guides for your code and project — the read-me files, setup instructions, and explanations that make a project approachable. It is for turning something only you understand into something anyone on your team can follow.',
    },
    tags: ['writing', 'documentation', 'docs', 'clarity'],
    faq: [
      { q: 'What does it write?', a: 'Read-me files, setup guides, and clear explanations of how your project works.' },
      { q: 'Is it in the free toolkit?', a: 'No — documentation is part of the premium toolkit.' },
    ],
    seeAlso: ['copywriting', 'copy-editing', 'docx'],
  },
  docx: {
    operator: {
      tagline: 'Creates and edits Word documents for you — reports, letters, proposals, and more.',
      summary:
        'docx builds proper Word documents from scratch or edits existing ones — reports, letters, proposals, anything you would normally open Word for. It is for producing polished, formatted documents without doing the formatting yourself.',
    },
    tags: ['documents', 'word', 'writing', 'office'],
    faq: [
      { q: 'What can it produce?', a: 'Reports, letters, proposals, and other formatted Word documents.' },
      { q: 'Is it in the free toolkit?', a: 'No — docx is part of the premium toolkit.' },
    ],
    seeAlso: ['pdf', 'documentation', 'copywriting'],
  },
  pdf: {
    operator: {
      tagline: 'Creates, edits, and pulls information out of PDF documents for you.',
      summary:
        'pdf handles PDFs end to end — making new ones, merging or splitting them, filling in forms, and extracting text from existing files. It is for all the fiddly PDF tasks you would otherwise need separate tools for.',
    },
    tags: ['documents', 'pdf', 'forms', 'office'],
    faq: [
      { q: 'What can it do with a PDF?', a: 'Create, merge, split, fill forms, and pull text out of existing files.' },
      { q: 'Is it in the free toolkit?', a: 'No — pdf is part of the premium toolkit.' },
    ],
    seeAlso: ['docx', 'documentation', 'copywriting'],
  },

  // ── vision ───────────────────────────────────────────────────────────────
  'init-vision': {
    operator: {
      tagline: 'Sets up a clear statement of what your project is for, so work stays on track.',
      summary:
        'init-vision explores your project, then interviews you to capture what success looks like and what the project must and must not do — writing it into a guiding document. From then on, Claude weighs decisions against that vision, so the work does not quietly drift from what you actually wanted.',
    },
    tags: ['vision', 'setup', 'alignment', 'goals'],
    faq: [
      { q: 'What does it create?', a: 'A guiding document capturing your project purpose, success criteria, and constraints.' },
      { q: 'Is it in the free toolkit?', a: 'No — init-vision is part of the premium toolkit.' },
    ],
    seeAlso: ['vision-check', 'vision-adoption'],
  },
  'vision-adoption': {
    operator: {
      tagline: 'Checks which of your projects have a guiding vision set up and where to add one.',
      summary:
        'vision-adoption scans across your projects to see which ones have a vision document in place and which are missing it, then recommends where adding one would help most. It is the portfolio-wide view of how aligned your projects are.',
    },
    tags: ['vision', 'audit', 'portfolio', 'alignment'],
    faq: [
      { q: 'Does it look at one project or many?', a: 'Many — it scans across your projects to report on vision adoption everywhere.' },
      { q: 'Is it in the free toolkit?', a: 'No — vision-adoption is part of the premium toolkit.' },
    ],
    seeAlso: ['init-vision', 'vision-check'],
  },
  'vision-check': {
    operator: {
      tagline: 'Checks whether your recent work is still in line with the project stated goals.',
      summary:
        'vision-check compares what you have actually been building against your project guiding vision and flags where the two are drifting apart. It is a quick "are we still on track, or did scope creep in" gut check.',
    },
    tags: ['vision', 'alignment', 'scope', 'check'],
    faq: [
      { q: 'What does it compare?', a: 'Your recent work against the project vision, to catch drift or scope creep.' },
      { q: 'Is it in the free toolkit?', a: 'No — vision-check is part of the premium toolkit.' },
    ],
    seeAlso: ['init-vision', 'vision-adoption'],
  },
};

// Curated external tools (origin: 'ecosystem'). Full Item records.
// These are tools Operators Academy TEACHES but does NOT ship — each carries a
// source link + notAffiliated flag, and its own paste-into-Claude setup prompt.
export const ecosystem = [
  {
    slug: 'supabase-mcp',
    name: 'Supabase MCP',
    kind: 'plugin',
    origin: 'ecosystem',
    tier: null,
    categoryKey: 'database',
    updated: '2026-06-25',
    tags: ['database', 'postgres', 'mcp', 'backend'],
    operator: {
      tagline: 'Lets Claude Code read and manage your Supabase database directly.',
      summary:
        'The Supabase MCP connects Claude Code to your Supabase project so it can inspect your schema, run migrations, and query data on your behalf — no manual SQL.',
      setupPrompt:
        'Set up the Supabase MCP server in my Claude Code project: add it, walk me through authenticating to my Supabase project, and confirm it is connected.',
    },
    technical: {
      tagline: 'Official Supabase remote MCP for schema, migrations, and queries.',
      installCommand: 'claude mcp add --transport http supabase https://mcp.supabase.com/mcp',
      deps: ['A Supabase project + auth'],
    },
    source: { url: 'https://supabase.com/docs/guides/getting-started/mcp', repo: 'supabase/supabase' },
    notAffiliated: true,
    faq: [
      { q: 'Is this made by Operators Academy?', a: 'No — Supabase is an independent product. We recommend it and teach it; it is not shipped in our toolkit.' },
      { q: 'Do I need a Supabase account?', a: 'Yes — the connection authenticates to your own Supabase project.' },
    ],
    seeAlso: ['sql-migrate', 'schema-diff'],
  },
  {
    slug: 'vercel-mcp',
    name: 'Vercel MCP',
    kind: 'plugin',
    origin: 'ecosystem',
    tier: null,
    categoryKey: 'build',
    updated: '2026-06-24',
    tags: ['deployment', 'hosting', 'mcp', 'devops'],
    operator: {
      tagline: 'Lets Claude Code check on and manage where your site is hosted and deployed.',
      summary:
        'The Vercel MCP connects Claude Code to your Vercel account — the service that puts your site live — so it can look up deployments, read logs when something breaks, and help manage your projects without you clicking around a dashboard.',
      setupPrompt:
        'Set up the Vercel MCP server in my Claude Code project: add it, help me sign in to my Vercel account, and confirm you can see my deployments.',
    },
    technical: {
      tagline: 'Official Vercel remote MCP for deployments, logs, and project management.',
      installCommand: 'claude mcp add --transport http vercel https://mcp.vercel.com',
      deps: ['A Vercel account + auth'],
    },
    source: { url: 'https://vercel.com/docs/mcp/vercel-mcp' },
    notAffiliated: true,
    faq: [
      { q: 'Is this shipped by Operators Academy?', a: 'No — Vercel is an independent hosting company. We teach it; it is not part of our toolkit.' },
      { q: 'What can it actually do?', a: 'Inspect your deployments, pull logs to debug a failed build, and manage projects on your behalf.' },
    ],
    seeAlso: ['devops-automator', 'frontend-design'],
  },
  {
    slug: 'github-mcp',
    name: 'GitHub MCP',
    kind: 'plugin',
    origin: 'ecosystem',
    tier: null,
    categoryKey: 'session',
    updated: '2026-06-24',
    tags: ['git', 'github', 'mcp', 'shipping'],
    operator: {
      tagline: 'Lets Claude Code work with your GitHub — issues, pull requests, and code — directly.',
      summary:
        'The GitHub MCP connects Claude Code to GitHub, where your code and its history live. It can open and read issues, create and review pull requests, and search across your repositories on your behalf, so you are not switching to the website constantly.',
      setupPrompt:
        'Set up the GitHub MCP server in my Claude Code project: add it, walk me through authorizing my GitHub account, and confirm you can see my repositories.',
    },
    technical: {
      tagline: 'GitHub official remote MCP server for issues, PRs, and repo operations.',
      installCommand: 'claude mcp add --transport http github https://api.githubcopilot.com/mcp/',
      deps: ['A GitHub account + auth'],
    },
    source: { url: 'https://github.com/github/github-mcp-server', repo: 'github/github-mcp-server' },
    notAffiliated: true,
    faq: [
      { q: 'Is this an Operators Academy product?', a: 'No — GitHub is an independent, Microsoft-owned platform. We teach it; it is not shipped in our toolkit.' },
      { q: 'How does it relate to the push and pr skills?', a: 'Those skills ship your work from the command line; the GitHub MCP lets Claude read and manage the issues and pull requests around it.' },
    ],
    seeAlso: ['pr', 'push', 'git-commit'],
  },
  {
    slug: 'chrome-devtools-mcp',
    name: 'Chrome DevTools MCP',
    kind: 'plugin',
    origin: 'ecosystem',
    tier: null,
    categoryKey: 'quality',
    updated: '2026-06-23',
    tags: ['browser', 'debugging', 'mcp', 'web'],
    operator: {
      tagline: 'Lets Claude Code open your page in Chrome and see exactly what is going wrong.',
      summary:
        'The Chrome DevTools MCP gives Claude Code a real Chrome browser it can inspect — reading the console errors, network activity, and performance details that developers use to debug a page. When your site misbehaves, it can look under the hood instead of guessing.',
      setupPrompt:
        'Set up the Chrome DevTools MCP server in my Claude Code project: add it, then open my site and check the console and network activity for errors.',
    },
    technical: {
      tagline: 'Google Chrome DevTools MCP — drive Chrome, read console/network, trace performance.',
      installCommand: 'claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest',
      deps: ['Node.js', 'Google Chrome'],
    },
    source: { url: 'https://github.com/ChromeDevTools/chrome-devtools-mcp', repo: 'ChromeDevTools/chrome-devtools-mcp' },
    notAffiliated: true,
    faq: [
      { q: 'Is this made by Operators Academy?', a: 'No — it is Google Chrome tooling. We recommend and teach it; it is not part of our toolkit.' },
      { q: 'How is this different from the smoke skill?', a: 'Smoke checks that pages load and screenshots them; this opens the browser developer tools to diagnose why a page is broken or slow.' },
    ],
    seeAlso: ['smoke', 'playwright', 'pagespeed'],
  },
  {
    slug: 'perplexity-mcp',
    name: 'Perplexity MCP',
    kind: 'plugin',
    origin: 'ecosystem',
    tier: null,
    categoryKey: 'planning',
    updated: '2026-06-22',
    tags: ['research', 'search', 'mcp', 'web'],
    operator: {
      tagline: 'Lets Claude Code search the live web to answer questions with up-to-date facts.',
      summary:
        'The Perplexity MCP connects Claude Code to Perplexity search, so it can look things up on the current web — recent news, product comparisons, whatever changed since its training — and answer with sources. It is how Claude checks reality instead of relying only on memory.',
      setupPrompt:
        'Set up the Perplexity MCP server in my Claude Code project: add it, help me plug in my Perplexity API key, and confirm you can run a web search.',
    },
    technical: {
      tagline: 'Perplexity Ask MCP — web-grounded search and answers with citations.',
      installCommand: 'claude mcp add perplexity -e PERPLEXITY_API_KEY=your-key -- npx -y server-perplexity-ask',
      deps: ['Node.js', 'A Perplexity API key'],
    },
    source: { url: 'https://github.com/ppl-ai/modelcontextprotocol', repo: 'ppl-ai/modelcontextprotocol' },
    notAffiliated: true,
    faq: [
      { q: 'Is this an Operators Academy tool?', a: 'No — Perplexity is an independent search company. We teach it; it is not shipped in our toolkit.' },
      { q: 'Why would I want it?', a: 'So Claude can pull in current, cited information from the web when making a decision or checking a fact.' },
    ],
    seeAlso: ['decide', 'plan'],
  },
  {
    slug: 'firecrawl-mcp',
    name: 'Firecrawl MCP',
    kind: 'plugin',
    origin: 'ecosystem',
    tier: null,
    categoryKey: 'content',
    updated: '2026-06-21',
    tags: ['scraping', 'web', 'mcp', 'content'],
    operator: {
      tagline: 'Lets Claude Code pull clean, readable content off any website for you.',
      summary:
        'The Firecrawl MCP turns messy web pages into clean text Claude can actually use — reading a whole site, extracting the content, and handing it back tidy. It is for when you want to gather information from the web without copy-pasting page by page.',
      setupPrompt:
        'Set up the Firecrawl MCP server in my Claude Code project: add it, help me plug in my Firecrawl API key, and confirm you can pull the content from a web page.',
    },
    technical: {
      tagline: 'Firecrawl MCP — scrape, crawl, and extract clean web content for LLMs.',
      installCommand: 'claude mcp add firecrawl -e FIRECRAWL_API_KEY=your-key -- npx -y firecrawl-mcp',
      deps: ['Node.js', 'A Firecrawl API key'],
    },
    source: { url: 'https://github.com/firecrawl/firecrawl-mcp-server', repo: 'firecrawl/firecrawl-mcp-server' },
    notAffiliated: true,
    faq: [
      { q: 'Is this made by Operators Academy?', a: 'No — Firecrawl is an independent product. We recommend and teach it; it is not part of our toolkit.' },
      { q: 'What is it good for?', a: 'Gathering clean content from websites — research, competitor pages, documentation — without manual copy-paste.' },
    ],
    seeAlso: ['scribe', 'documentation'],
  },
  {
    slug: 'notion-mcp',
    name: 'Notion MCP',
    kind: 'plugin',
    origin: 'ecosystem',
    tier: null,
    categoryKey: 'content',
    updated: '2026-06-20',
    tags: ['notes', 'docs', 'mcp', 'workspace'],
    operator: {
      tagline: 'Lets Claude Code read and update your Notion workspace directly.',
      summary:
        'The Notion MCP connects Claude Code to your Notion — the docs, notes, and databases you keep there — so it can find information, draft pages, and update records for you. It bridges your written knowledge with what Claude can do.',
      setupPrompt:
        'Set up the Notion MCP server in my Claude Code project: add it, walk me through connecting my Notion workspace, and confirm you can read a page.',
    },
    technical: {
      tagline: 'Notion official remote MCP for reading and editing pages and databases.',
      installCommand: 'claude mcp add --transport http notion https://mcp.notion.com/mcp',
      deps: ['A Notion account + auth'],
    },
    source: { url: 'https://developers.notion.com/docs/mcp' },
    notAffiliated: true,
    faq: [
      { q: 'Is this an Operators Academy product?', a: 'No — Notion is an independent company. We teach it; it is not shipped in our toolkit.' },
      { q: 'What can it do?', a: 'Search your Notion, draft and update pages, and read from your databases on your behalf.' },
    ],
    seeAlso: ['scribe', 'documentation'],
  },
  {
    slug: 'sentry-mcp',
    name: 'Sentry MCP',
    kind: 'plugin',
    origin: 'ecosystem',
    tier: null,
    categoryKey: 'quality',
    updated: '2026-06-19',
    tags: ['monitoring', 'errors', 'mcp', 'debugging'],
    operator: {
      tagline: 'Lets Claude Code see the errors real users are hitting in your live app.',
      summary:
        'The Sentry MCP connects Claude Code to Sentry, the service that records crashes and errors in your deployed app. Claude can pull up what is breaking for real users, read the details, and help you fix it — so problems in production do not stay invisible.',
      setupPrompt:
        'Set up the Sentry MCP server in my Claude Code project: add it, help me connect my Sentry account, and confirm you can list my recent errors.',
    },
    technical: {
      tagline: 'Sentry official remote MCP for issues, events, and error triage.',
      installCommand: 'claude mcp add --transport http sentry https://mcp.sentry.dev/mcp',
      deps: ['A Sentry account + auth'],
    },
    source: { url: 'https://docs.sentry.io/product/sentry-mcp/' },
    notAffiliated: true,
    faq: [
      { q: 'Is this made by Operators Academy?', a: 'No — Sentry is an independent monitoring product. We recommend and teach it; it is not part of our toolkit.' },
      { q: 'Why would I connect it?', a: 'So Claude can see the actual errors your users hit in production and help you resolve them.' },
    ],
    seeAlso: ['debugger', 'smoke', 'test'],
  },
  {
    slug: 'figma-mcp',
    name: 'Figma MCP',
    kind: 'plugin',
    origin: 'ecosystem',
    tier: null,
    categoryKey: 'build',
    updated: '2026-06-18',
    tags: ['design', 'figma', 'mcp', 'ui'],
    operator: {
      tagline: 'Lets Claude Code read your Figma designs so it can build them into real screens.',
      summary:
        'The Figma MCP connects Claude Code to your Figma design files, so it can see the layouts, colors, and spacing you designed and turn them into working code. It closes the gap between the design and the build — Claude works from your actual design, not a guess.',
      setupPrompt:
        'Set up the Figma MCP server in my Claude Code project: add it, help me enable the Figma developer connection, and confirm you can read my design file.',
    },
    technical: {
      tagline: 'Figma Dev Mode MCP server — read design context (layout, tokens) into code.',
      installCommand: 'claude mcp add --transport sse figma-dev-mode http://127.0.0.1:3845/sse',
      deps: ['Figma desktop app', 'Dev Mode MCP enabled'],
    },
    source: { url: 'https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server' },
    notAffiliated: true,
    faq: [
      { q: 'Is this an Operators Academy tool?', a: 'No — Figma is an independent design company. We teach it; it is not shipped in our toolkit.' },
      { q: 'What does it need to run?', a: 'The Figma desktop app with its developer connection turned on, so Claude can read the file you have open.' },
    ],
    seeAlso: ['frontend-design', 'ui-designer'],
  },
  {
    slug: 'linear-mcp',
    name: 'Linear MCP',
    kind: 'plugin',
    origin: 'ecosystem',
    tier: null,
    categoryKey: 'planning',
    updated: '2026-06-17',
    tags: ['project-management', 'issues', 'mcp', 'planning'],
    operator: {
      tagline: 'Lets Claude Code read and update your Linear tasks and project boards directly.',
      summary:
        'The Linear MCP connects Claude Code to Linear, where many teams track their work. Claude can look up what is on the board, create and update issues, and check on projects — so planning and building stay connected without you jumping between apps.',
      setupPrompt:
        'Set up the Linear MCP server in my Claude Code project: add it, walk me through connecting my Linear workspace, and confirm you can see my issues.',
    },
    technical: {
      tagline: 'Linear official remote MCP for issues, projects, and status updates.',
      installCommand: 'claude mcp add --transport sse linear https://mcp.linear.app/sse',
      deps: ['A Linear account + auth'],
    },
    source: { url: 'https://linear.app/docs/mcp' },
    notAffiliated: true,
    faq: [
      { q: 'Is this made by Operators Academy?', a: 'No — Linear is an independent project-management product. We recommend and teach it; it is not part of our toolkit.' },
      { q: 'What can it do?', a: 'Read your board, create and update issues, and check project status on your behalf.' },
    ],
    seeAlso: ['sprint-prioritizer', 'user-stories'],
  },
];
