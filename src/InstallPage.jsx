import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, FolderOpen, Shield, Sparkles, Layers, BookOpen, ArrowRight } from 'lucide-react';
import CopyButton from './components/CopyButton';
import Expandable from './components/Expandable';

const INSTALL = {
  windows: {
    label: 'Windows',
    shell: 'PowerShell',
    cmd: 'irm https://operators-academy.vercel.app/claude-setup/install.ps1 | iex',
  },
  mac: {
    label: 'Mac',
    shell: 'Terminal',
    cmd: 'curl -fsSL https://operators-academy.vercel.app/claude-setup/install.sh | bash',
  },
  linux: {
    label: 'Linux',
    shell: 'Terminal',
    cmd: 'curl -fsSL https://operators-academy.vercel.app/claude-setup/install.sh | bash',
  },
};

const AGENTS = ['explorer', 'reviewer', 'debugger', 'test-runner', 'test-writer-fixer', 'git-commit', 'logger'];
const SKILLS = ['commit', 'push', 'pr', 'pickup', 'wrap-up', 'test', 'smoke', 'auto-init', 'improve', 'plan'];

export default function InstallPage() {
  const [os, setOs] = useState('windows');
  const active = INSTALL[os];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-6">
          <Terminal size={14} />
          Free workflow toolkit
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Install the Operators Academy Toolkit
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          7 agents, 10 skills, hooks, plan mode, and a complete shipping workflow —
          installed into <code className="text-purple-300">~/.claude/</code> with one command.
          Works on Windows, Mac, and Linux.
        </p>
      </div>

      {/* Prerequisite */}
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 text-sm text-gray-400">
          <strong className="text-gray-200">First time?</strong> You need Claude Code installed and logged in.
          {' '}<Link to="/course/claude-code" className="text-purple-300 hover:text-purple-200 underline">Module 2 walks you through it</Link> on any operating system — it takes about a minute.
        </div>
      </div>

      {/* Step 1: Install command with OS toggle */}
      <div className="max-w-4xl mx-auto px-4 pb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-400 text-sm font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold">Run in your terminal</h3>
              <p className="text-xs text-gray-500">Backs up your existing config, then installs into ~/.claude/</p>
            </div>
            <div className="ml-auto">
              <CopyButton text={active.cmd} />
            </div>
          </div>

          {/* OS tabs */}
          <div className="flex gap-1 mb-3">
            {Object.entries(INSTALL).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setOs(key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  os === key
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-gray-900 text-gray-500 border border-transparent hover:text-gray-300'
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>

          <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs sm:text-sm overflow-x-auto">
            <span className="text-gray-600">{active.shell} &gt; </span>
            <span className="text-cyan-300">{active.cmd}</span>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            {os === 'windows'
              ? 'Open Windows Terminal or PowerShell (Win key → type "Terminal"). If you see an error about "irm", you may be in Command Prompt — open PowerShell instead.'
              : 'Open your Terminal app. The installer backs up any existing ~/.claude config to ~/.claude/backups/ before writing.'}
          </p>
        </div>
      </div>

      {/* Step 2: Start a project */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-400 text-sm font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold">Open a project and initialize it</h3>
              <p className="text-xs text-gray-500">Creates the documentation files that give Claude a memory</p>
            </div>
            <div className="ml-auto">
              <CopyButton text='initialize project' />
            </div>
          </div>
          <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs sm:text-sm overflow-x-auto">
            <span className="text-gray-600">cd your-project &amp;&amp; claude</span>
            <br />
            <span className="text-gray-500"># then, inside Claude Code, say:</span>
            <br />
            <span className="text-cyan-300">initialize project</span>
          </div>
          <p className="text-xs text-gray-600 mt-3">
            From there: <code className="text-blue-300">/pickup</code> to resume, <code className="text-blue-300">/commit</code> at checkpoints, <code className="text-blue-300">/test</code> before shipping, <code className="text-blue-300">/push</code> to ship.
          </p>
        </div>
      </div>

      {/* What's Included */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">What you get</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Agents */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Shield className="text-cyan-400" size={20} />
              </div>
              <h3 className="font-semibold">7 Specialized Agents</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Map code before you change it, review before you ship, debug failures, and keep tests honest.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {AGENTS.map(a => (
                <span key={a} className="text-xs bg-gray-700 px-2 py-0.5 rounded">{a}</span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Sparkles className="text-purple-400" size={20} />
              </div>
              <h3 className="font-semibold">10 Skills</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              The shipping loop: pick up where you left off, checkpoint, test, review, push, and wrap up — by name.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SKILLS.map(s => (
                <span key={s} className="text-xs bg-gray-700 px-2 py-0.5 rounded">/{s}</span>
              ))}
            </div>
          </div>

          {/* Doc System */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <FolderOpen className="text-green-400" size={20} />
              </div>
              <h3 className="font-semibold">Project Doc System</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Claude reads these at the start of each session so it never loses context.
              Say <code className="text-green-300">"initialize project"</code> or <code className="text-green-300">/auto-init</code> to create them.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['CONTEXT', 'TASKS', 'PLAN', 'PROGRESS', 'TEST_LOG'].map(f => (
                <span key={f} className="text-xs bg-gray-700 px-2 py-0.5 rounded">{f}.md</span>
              ))}
            </div>
          </div>

          {/* Hooks + Settings */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Layers className="text-blue-400" size={20} />
              </div>
              <h3 className="font-semibold">Hooks + Sensible Settings</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Safe, read-only hooks: a SessionStart check that keeps your project docs current, and a Stop hook that logs each session. Plus plan mode on by default.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['SessionStart', 'Stop', 'Plan mode', 'CLAUDE.md'].map(f => (
                <span key={f} className="text-xs bg-gray-700 px-2 py-0.5 rounded">{f}</span>
              ))}
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
              <p>It only touches files inside <code className="text-gray-300">~/.claude/</code>:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><code className="text-gray-300">~/.claude/CLAUDE.md</code> — Global instructions (doc system + workflow)</li>
                <li><code className="text-gray-300">~/.claude/settings.json</code> — Merged with hooks and plan mode</li>
                <li><code className="text-gray-300">~/.claude/agents/*.md</code> — 7 agent definitions</li>
                <li><code className="text-gray-300">~/.claude/skills/*/SKILL.md</code> — 10 skill definitions</li>
                <li><code className="text-gray-300">~/.claude/hooks/*</code> — A couple of safe hook scripts</li>
              </ul>
              <p>Any existing files are backed up to <code className="text-gray-300">~/.claude/backups/</code> before being replaced.</p>
            </div>
          </Expandable>

          <Expandable title="Will it overwrite my existing settings?">
            <div className="text-sm text-gray-400 space-y-2">
              <p><strong className="text-gray-200">settings.json is merged</strong> — your existing settings are preserved and the installer adds hooks and plan mode on top.</p>
              <p><strong className="text-gray-200">CLAUDE.md is replaced</strong> — the original is backed up first, so you can merge your custom instructions back afterward.</p>
              <p><strong className="text-gray-200">Agents and skills are added</strong> — same-named files are overwritten (originals backed up); your other files are left untouched.</p>
            </div>
          </Expandable>

          <Expandable title="What are the prerequisites?">
            <div className="text-sm text-gray-400 space-y-2">
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong className="text-gray-200">Claude Code</strong> — installed and logged in. <Link to="/course/claude-code" className="text-purple-300 underline">See Module 2</Link> for the native installer on Windows, Mac, or Linux (no Node.js required).</li>
                <li><strong className="text-gray-200">git</strong> — used by the shipping skills. Pre-installed on Mac/Linux; on Windows install <a href="https://git-scm.com/downloads/win" className="text-purple-300 underline">Git for Windows</a> (optional but recommended).</li>
              </ul>
            </div>
          </Expandable>

          <Expandable title="Is it safe to pipe a script into my shell?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>Fair question — you should always be cautious with <code className="text-gray-300">curl | bash</code> and <code className="text-gray-300">irm | iex</code>.</p>
              <p>The installer is plain text and open: read it first at{' '}
                <a href="/claude-setup/install.sh" className="text-purple-300 underline">/claude-setup/install.sh</a> (Mac/Linux) or{' '}
                <a href="/claude-setup/install.ps1" className="text-purple-300 underline">/claude-setup/install.ps1</a> (Windows) before running it.</p>
              <p>It writes only inside <code className="text-gray-300">~/.claude/</code> and backs up anything it replaces.</p>
            </div>
          </Expandable>

          <Expandable title="Can I customize it after installing?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>Everything is plain-text files — customize freely:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Edit <code className="text-gray-300">~/.claude/CLAUDE.md</code> to add your own trigger phrases or conventions</li>
                <li>Edit agents in <code className="text-gray-300">~/.claude/agents/</code> to change behavior</li>
                <li>Edit skills in <code className="text-gray-300">~/.claude/skills/</code> to modify what each one does</li>
                <li>Add a project-specific CLAUDE.md in any repo for per-project overrides</li>
              </ul>
            </div>
          </Expandable>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Ready to install?</h2>
          <p className="text-sm text-gray-400 mb-5">One terminal command. Pick your OS above, copy, paste.</p>
          <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs sm:text-sm max-w-2xl mx-auto mb-4 flex items-center justify-between gap-4">
            <div className="overflow-x-auto text-left">
              <span className="text-gray-600">{active.shell} &gt; </span>
              <span className="text-cyan-300">{active.cmd}</span>
            </div>
            <CopyButton text={active.cmd} />
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
