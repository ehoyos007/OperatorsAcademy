import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, FolderOpen, Shield, Eye, Zap, BookOpen, ArrowRight, Layers, Sparkles, Palette, MessageSquare, Wrench, Brain, Copy, Check } from 'lucide-react';
import CopyButton from './components/CopyButton';
import Expandable from './components/Expandable';

const TOKEN = import.meta.env.VITE_INSTALL_TOKEN || '';
const INSTALL_CMD = `git clone https://${TOKEN}@github.com/ehoyos007/operators-academy-setup.git ~/.local/share/operators-academy && ~/.local/share/operators-academy/install.sh`;

const STEP2_CMD = 'Read ~/.local/share/operators-academy/SETUP_PROMPT.md and help me set up my remaining integrations.';

const UPDATE_CMD = 'cd ~/.local/share/operators-academy && git pull && ./install.sh';

export default function InstallPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-6">
          <Terminal size={14} />
          Full toolkit install
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Install the Operators Academy Toolkit
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          8 agents, 9 skills, 4 hooks, plan mode, and a complete shipping workflow.
          Two steps, under 5 minutes.
        </p>
      </div>

      {/* Step 1: Install Command */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 text-sm font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold">Run in your terminal</h3>
              <p className="text-xs text-gray-500">Clones the toolkit and installs everything into ~/.claude/</p>
            </div>
            <div className="ml-auto">
              <CopyButton text={INSTALL_CMD} />
            </div>
          </div>
          <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs sm:text-sm overflow-x-auto">
            <span className="text-gray-500">$ </span>
            <span className="text-green-400">git clone</span>
            <span className="text-gray-300"> https://</span>
            <span className="text-yellow-300/70">{'<token>'}</span>
            <span className="text-gray-300">@github.com/ehoyos007/operators-academy-setup.git</span>
            <span className="text-gray-300"> ~/.local/share/operators-academy</span>
            <br />
            <span className="text-gray-500">  && </span>
            <span className="text-gray-300">~/.local/share/operators-academy/</span>
            <span className="text-green-400">install.sh</span>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Access token is embedded in the URL. Backs up existing config before installing. Requires git and jq.
          </p>
        </div>
      </div>

      {/* Step 2: Claude Code Prompt */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 text-sm font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold">Paste into Claude Code</h3>
              <p className="text-xs text-gray-500">Claude walks you through Open Brain, marketing skills, and MCP integrations</p>
            </div>
            <div className="ml-auto">
              <CopyButton text={STEP2_CMD} />
            </div>
          </div>
          <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs sm:text-sm overflow-x-auto">
            <span className="text-cyan-300">Read ~/.local/share/operators-academy/SETUP_PROMPT.md and help me set up my remaining integrations.</span>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Optional. Sets up Open Brain, GitHub, Google Calendar, Gmail, Slack, Sentry, n8n, and 25 marketing skills.
          </p>
        </div>
      </div>

      {/* What's Included */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">What you get</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* 19 Agents */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Shield className="text-cyan-400" size={20} />
              </div>
              <h3 className="font-semibold">8 Specialized Agents</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              QA orchestration, testing, git workflow, backend architecture, debugging, logging, and more.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['backend-architect', 'git-commit', 'qa-orchestrator', 'debugger', 'test-runner', 'test-writer-fixer', 'logger', 'feature-tester'].map(a => (
                <span key={a} className="text-xs bg-gray-700 px-2 py-0.5 rounded">{a}</span>
              ))}
            </div>
          </div>

          {/* 19 Skills */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Sparkles className="text-purple-400" size={20} />
              </div>
              <h3 className="font-semibold">9 Skills</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Complete shipping workflow: ship, deploy, wrap-up, pickup, step-done, auto-init, QA sweep, smoke testing, and Google Ads research.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['ship', 'deploy', 'wrap-up', 'pickup', 'qa', 'smoke', 'auto-init', 'step-done', 'google-ads-research'].map(s => (
                <span key={s} className="text-xs bg-gray-700 px-2 py-0.5 rounded">/{s}</span>
              ))}
            </div>
          </div>

          {/* Vision System */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Eye className="text-amber-400" size={20} />
              </div>
              <h3 className="font-semibold">Vision System</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              VISION.md captures your project intent and decision defaults. EVAL.md keeps development aligned.
              Run <code className="text-amber-300">/init-vision</code> to bootstrap with a brain dump interview.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['VISION.md', 'EVAL.md', '/init-vision', '/vision-check', '/vision-adoption'].map(f => (
                <span key={f} className="text-xs bg-gray-700 px-2 py-0.5 rounded">{f}</span>
              ))}
            </div>
          </div>

          {/* Doc System */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <FolderOpen className="text-green-400" size={20} />
              </div>
              <h3 className="font-semibold">8-File Documentation System</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Claude reads these at the start of each session so it never loses context.
              Say <code className="text-green-300">"initialize project"</code> or <code className="text-green-300">/auto-init</code> to create them.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['CONTEXT', 'TASKS', 'PLAN', 'PROGRESS', 'TEST_LOG', 'BRAIN', 'VISION', 'CLAUDE'].map(f => (
                <span key={f} className="text-xs bg-gray-700 px-2 py-0.5 rounded">{f}.md</span>
              ))}
            </div>
          </div>

          {/* Status Bar + Hooks */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Layers className="text-blue-400" size={20} />
              </div>
              <h3 className="font-semibold">Status Bar + Hooks</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Live status bar shows model, context usage, git branch, and project name.
              iTerm2 hooks turn your tab gold when Claude is waiting for input.
            </p>
            <div className="bg-gray-950 rounded-lg px-3 py-2 font-mono text-xs">
              <span className="text-purple-400">Opus 4.6</span>
              <span className="text-green-400"> [████░░░░░░] 38%</span>
              <span className="text-gray-600"> | </span>
              <span className="text-green-400">main</span>
              <span className="text-gray-600"> | </span>
              <span className="text-cyan-400">my-project</span>
            </div>
          </div>

          {/* Settings + Triggers */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Wrench className="text-orange-400" size={20} />
              </div>
              <h3 className="font-semibold">Settings + Triggers</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              High effort mode, context7 plugin, Plan Mode default.
              20+ natural language triggers like <code className="text-orange-300">"ship"</code>, <code className="text-orange-300">"deploy"</code>, and <code className="text-orange-300">"run QA"</code>.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['High effort', 'Plan mode', 'Context7 plugin', '20+ triggers'].map(f => (
                <span key={f} className="text-xs bg-gray-700 px-2 py-0.5 rounded">{f}</span>
              ))}
            </div>
          </div>
        </div>

        {/* MCP Integrations via Step 2 */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-3">
            <Brain className="text-purple-400" size={20} />
            MCP Integrations (Step 2)
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            After the base install, Claude Code walks you through connecting these services:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Open Brain', desc: 'Semantic knowledge system', color: 'purple' },
              { name: 'Marketing Skills', desc: '25 AI marketing tools', color: 'teal' },
              { name: 'GitHub', desc: 'Issues, PRs, code search', color: 'gray' },
              { name: 'Google Calendar', desc: 'Events, free time', color: 'blue' },
              { name: 'Gmail', desc: 'Search, read, draft', color: 'red' },
              { name: 'Slack', desc: 'Channels, messages', color: 'green' },
              { name: 'Sentry', desc: 'Error investigation', color: 'orange' },
              { name: 'n8n', desc: 'Automation workflows', color: 'pink' },
            ].map(i => (
              <div key={i.name} className="bg-gray-900 rounded-lg p-3">
                <div className={`w-2 h-2 rounded-full bg-${i.color}-400 mb-2`}></div>
                <div className="text-sm font-medium">{i.name}</div>
                <div className="text-xs text-gray-500">{i.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">How it works</h2>

        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-400 text-sm font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Start any project</h3>
              <p className="text-sm text-gray-400">
                Open Claude Code in a project directory. Say <code className="text-blue-300">"initialize project"</code> or <code className="text-blue-300">/auto-init</code> to
                create all 8 documentation files automatically.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-400 text-sm font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Work with context continuity</h3>
              <p className="text-sm text-gray-400">
                Claude maintains project knowledge across 8 docs. Say <code className="text-blue-300">/pickup</code> or
                <code className="text-blue-300">"let's continue"</code> and it picks up exactly where you left off.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-400 text-sm font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Use skills and agents</h3>
              <p className="text-sm text-gray-400">
                Say <code className="text-blue-300">"step done"</code> to checkpoint and keep going.
                Say <code className="text-blue-300">"run QA"</code> to trigger lint + types + tests + build.
                Use <code className="text-blue-300">/smoke</code> for post-deploy visual verification.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-400 text-sm font-bold">4</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">End sessions cleanly</h3>
              <p className="text-sm text-gray-400">
                Say <code className="text-blue-300">"wrap up"</code> to save progress and write a handoff file.
                Then <code className="text-blue-300">"ship"</code> to commit + push (auto-creates feature branch + PR).
                Then <code className="text-blue-300">"deploy"</code> to merge and push to production.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Details</h2>

        <div className="space-y-3">
          <Expandable title="What does the installer change on my system?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>The installer only touches files inside <code className="text-gray-300">~/.claude/</code>:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><code className="text-gray-300">~/.claude/CLAUDE.md</code> — Global instructions file</li>
                <li><code className="text-gray-300">~/.claude/statusline-command.sh</code> — Status bar script</li>
                <li><code className="text-gray-300">~/.claude/settings.json</code> — Merged with hooks, plugins, and settings</li>
                <li><code className="text-gray-300">~/.claude/agents/*.md</code> — 8 agent definitions</li>
                <li><code className="text-gray-300">~/.claude/skills/*/SKILL.md</code> — 9 skill definitions</li>
                <li><code className="text-gray-300">~/.claude/hooks/*.sh</code> — 4 hook scripts</li>
              </ul>
              <p>The toolkit source stays at <code className="text-gray-300">~/.local/share/operators-academy/</code> for updates.</p>
              <p>Any existing files are backed up to <code className="text-gray-300">~/.claude/backups/</code> before being replaced.</p>
            </div>
          </Expandable>

          <Expandable title="Will it overwrite my existing settings?">
            <div className="text-sm text-gray-400 space-y-2">
              <p><strong className="text-gray-200">settings.json is merged</strong> — your existing settings are preserved and the installer adds hooks, plugins, and effort level on top (requires jq).</p>
              <p><strong className="text-gray-200">CLAUDE.md is replaced</strong> — but the original is backed up first. You can merge your custom instructions back afterward.</p>
              <p><strong className="text-gray-200">Agents and skills are added</strong> — existing files with the same names are overwritten (originals backed up). Files with different names are left untouched.</p>
            </div>
          </Expandable>

          <Expandable title="How do I update?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>Run this to pull the latest version and reinstall:</p>
              <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs flex items-center justify-between gap-2">
                <span>{UPDATE_CMD}</span>
                <CopyButton text={UPDATE_CMD} />
              </div>
            </div>
          </Expandable>

          <Expandable title="How do I uninstall?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>Restore from the backup:</p>
              <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs">
                <div className="text-gray-500"># Find your backup</div>
                <div>ls ~/.claude/backups/</div>
                <div className="text-gray-500 mt-2"># Restore (replace TIMESTAMP with your backup folder)</div>
                <div>cp -r ~/.claude/backups/TIMESTAMP/* ~/.claude/</div>
              </div>
              <p>Or remove the toolkit source:</p>
              <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs">
                <div>rm -rf ~/.local/share/operators-academy</div>
              </div>
            </div>
          </Expandable>

          <Expandable title="What are the prerequisites?">
            <div className="text-sm text-gray-400 space-y-2">
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong className="text-gray-200">Claude Code</strong> — installed and authenticated (<code className="text-gray-300">npm install -g @anthropic-ai/claude-code</code>)</li>
                <li><strong className="text-gray-200">git</strong> — for cloning the toolkit (pre-installed on macOS)</li>
                <li><strong className="text-gray-200">jq</strong> — for settings merge and status line (<code className="text-gray-300">brew install jq</code> on macOS)</li>
              </ul>
            </div>
          </Expandable>

          <Expandable title="Can I customize it after installing?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>Everything is plain text files — customize freely:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Edit <code className="text-gray-300">~/.claude/CLAUDE.md</code> to add your own trigger phrases or conventions</li>
                <li>Edit agents in <code className="text-gray-300">~/.claude/agents/</code> to change behavior</li>
                <li>Edit skills in <code className="text-gray-300">~/.claude/skills/</code> to modify skill prompts</li>
                <li>Add project-specific CLAUDE.md files in any repo for per-project overrides</li>
              </ul>
            </div>
          </Expandable>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Ready to install?</h2>
          <p className="text-sm text-gray-400 mb-5">One terminal command, then one Claude Code prompt.</p>
          <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs sm:text-sm max-w-2xl mx-auto mb-4 flex items-center justify-between gap-4">
            <div className="overflow-x-auto text-left">
              <span className="text-gray-500">$ </span>
              <span className="text-green-400">git clone</span>
              <span className="text-gray-300"> https://</span>
              <span className="text-yellow-300/70">{'<token>'}</span>
              <span className="text-gray-300">@github.com/...operators-academy-setup.git ~/.local/share/operators-academy</span>
              <span className="text-gray-500"> && </span>
              <span className="text-gray-300">~/.local/share/operators-academy/</span>
              <span className="text-green-400">install.sh</span>
            </div>
            <CopyButton text={INSTALL_CMD} />
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <Link to="/course/project-system" className="flex items-center gap-1 hover:text-purple-300 transition-colors">
              <BookOpen size={14} />
              Read the full guide
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/course" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
              <ArrowRight size={14} />
              Take the course
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600 pb-8">
        Operators Academy
      </div>
    </div>
  );
}
