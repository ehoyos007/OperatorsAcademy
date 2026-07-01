import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Terminal, Eye, Zap, FileText, Shield, Bell, Settings, Package, ArrowRight, GitBranch, Layers, CheckCircle, Clock, Cpu, BarChart3, BookOpen, Loader2, RefreshCw } from 'lucide-react';
import GatedCopyButton from './components/GatedCopyButton';
import Expandable from './components/Expandable';
import { useCloneUrl } from './hooks/useCloneUrl';

const INSTALL_CMD = '~/.local/share/operators-academy-pro/install.sh';
const INSTALL_CMD_WIN = '& ~/.local/share/operators-academy-pro/install.ps1';
const UPDATE_CMD = 'cd ~/.local/share/operators-academy-pro && git pull && ./install.sh';

/* ─── Component ─────────────────────────────────────────────────── */

export default function PremiumToolkitPage() {
  const { cloneCommand, loading: cloneLoading, error: cloneError, refetch } = useCloneUrl('premium');

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm mb-6">
            <Crown size={14} />
            Premium Toolkit v2.1
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            The Complete Operator Setup
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Everything you need to ship software with Claude Code — from first commit to production deploy.
            One install, fully standalone.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              { n: '40', label: 'Skills', color: 'text-cyan-400' },
              { n: '18', label: 'Agents', color: 'text-purple-400' },
              { n: '5', label: 'Hooks', color: 'text-amber-400' },
              { n: '5', label: 'Plugins', color: 'text-green-400' },
              { n: '8', label: 'Doc Files', color: 'text-blue-400' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5">
                <span className={`font-bold ${s.color}`}>{s.n}</span>
                <span className="text-gray-400">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Install ──────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-gray-800/50 border border-amber-500/20 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Terminal size={20} className="text-amber-400" />
            Install in 2 steps
          </h2>
          <p className="text-sm text-gray-500 mb-5">Standalone — no need to run the free installer first.</p>

          <div className="space-y-3">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300 font-medium">1. Clone the repo</span>
                {cloneLoading ? (
                  <span className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-500"><Loader2 size={12} className="animate-spin" /> Loading</span>
                ) : cloneError === 'Network error — try again' ? (
                  <button onClick={refetch} className="flex items-center gap-1.5 px-2 py-1 text-xs text-red-400 hover:text-red-300 border border-red-500/30 rounded transition-all">
                    <RefreshCw size={12} /> Retry
                  </button>
                ) : (
                  <GatedCopyButton text={cloneCommand} requiredTier="premium" />
                )}
              </div>
              <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                <span className="text-gray-500">$ </span>
                <span className="text-green-400">git clone</span>
                <span className="text-gray-400"> https://</span>
                <span className="text-yellow-300/70">{'<token>'}</span>
                <span className="text-gray-400">@github.com/ehoyos007/operators-academy-pro.git ~/.local/share/operators-academy-pro</span>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300 font-medium">2. Run the installer</span>
                <GatedCopyButton text={INSTALL_CMD} requiredTier="premium" />
              </div>
              <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs sm:text-sm overflow-x-auto space-y-1">
                <div>
                  <span className="text-gray-500"># macOS / Linux $ </span>
                  <span className="text-green-400">{INSTALL_CMD}</span>
                </div>
                <div>
                  <span className="text-gray-500"># Windows (PowerShell) &gt; </span>
                  <span className="text-green-400">{INSTALL_CMD_WIN}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 mt-4">
            Backs up existing config before installing. Needs <strong className="text-gray-500">git</strong> and either{' '}
            <strong className="text-gray-500">Node</strong> (recommended, for the status line) or{' '}
            <strong className="text-gray-500">jq</strong> on macOS/Linux. The Windows installer (<code className="text-gray-500">install.ps1</code>)
            needs neither jq nor iTerm2. Token is embedded in the clone URL.
          </p>
        </div>
      </div>

      {/* ── Shipping Workflow (the key differentiator) ────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">The Shipping Workflow</h2>
          <p className="text-gray-400 text-sm">
            Six natural-language commands that take you from code to production. This is the backbone of the toolkit.
          </p>
        </div>

        {/* Flow visualization */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0">
            {[
              { cmd: '/auto-init', label: 'Set up docs', icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
              { cmd: '/pickup', label: 'Resume work', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
              { cmd: '/commit', label: 'Checkpoint', icon: CheckCircle, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
              { cmd: '/test', label: 'Run QA', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
              { cmd: '/push', label: 'Ship branch', icon: GitBranch, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
              { cmd: '/wrap-up', label: 'Save + handoff', icon: Layers, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
            ].map((step, i) => (
              <React.Fragment key={step.cmd}>
                <div className={`flex-1 ${step.bg} border ${step.border} rounded-xl p-3 text-center`}>
                  <step.icon size={18} className={`mx-auto mb-1.5 ${step.color}`} />
                  <div className={`font-mono text-xs font-bold ${step.color}`}>{step.cmd}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{step.label}</div>
                </div>
                {i < 5 && (
                  <div className="hidden md:flex items-center px-1">
                    <ArrowRight size={14} className="text-gray-600" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Workflow details in expandables */}
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                <GitBranch size={13} className="text-amber-400" />
              </div>
              <h3 className="font-semibold text-sm">/push — Never clobber main by accident</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Commits and pushes the current branch. If you're on main it creates a feature branch first,
              generates a conventional commit message, and pushes. Run /pr when you want a pull request.
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Layers size={13} className="text-purple-400" />
              </div>
              <h3 className="font-semibold text-sm">/wrap-up — Session continuity</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Updates PROGRESS.md and TASKS.md, then writes a handoff file with a ready-to-use kickstart
              prompt for the next session. No context is ever lost between sessions.
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Clock size={13} className="text-blue-400" />
              </div>
              <h3 className="font-semibold text-sm">/pickup — Zero cold starts</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Reads all project docs, git state, and the handoff file. Presents a 15-second briefing with
              exactly where you left off and a recommended next action. Start working in seconds.
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <BarChart3 size={13} className="text-green-400" />
              </div>
              <h3 className="font-semibold text-sm">/test + /smoke — Built-in quality gates</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              /test runs lint, types, unit tests, E2E, and build in sequence. /smoke opens your deployed app
              in Chrome, checks every route for errors, and logs results to TEST_LOG.md.
            </p>
          </div>
        </div>
      </div>

      {/* ── 8-File Doc System + Plan Mode ────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-14">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FileText className="text-blue-400" size={20} />
              </div>
              <h3 className="text-lg font-bold">8-File Documentation System</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Claude reads these at every session start — it never forgets context. Say <code className="text-blue-300">/auto-init</code> to create them all.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { f: 'CONTEXT.md', d: 'Domain knowledge' },
                { f: 'TASKS.md', d: 'Active tasks' },
                { f: 'PLAN.md', d: 'Architecture' },
                { f: 'PROGRESS.md', d: 'Session log' },
                { f: 'TEST_LOG.md', d: 'QA tracking' },
                { f: 'BRAIN.md', d: 'Decision journal' },
                { f: 'VISION.md', d: 'Project intent' },
                { f: 'CLAUDE.md', d: 'Project rules' },
              ].map(({ f, d }) => (
                <div key={f} className="bg-gray-900 rounded-lg px-3 py-2">
                  <div className="text-xs font-mono text-blue-300">{f}</div>
                  <div className="text-[11px] text-gray-500">{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Zap className="text-amber-400" size={20} />
              </div>
              <h3 className="text-lg font-bold">Plan Mode + 20+ Triggers</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Claude declares context and presents a plan before implementing anything non-trivial. Natural language triggers for every part of the workflow.
            </p>
            <div className="space-y-1.5">
              {[
                { phrase: '"push it"', action: 'Branch + commit + push current branch' },
                { phrase: '"create a pr"', action: 'Feature branch + pull request' },
                { phrase: '"wrap up"', action: 'Save progress + handoff file' },
                { phrase: '"run tests"', action: 'Lint + types + tests + build' },
                { phrase: '"initialize project"', action: 'Create all 8 doc files' },
                { phrase: '"let\'s continue"', action: 'Full context briefing' },
                { phrase: '"commit this"', action: 'Checkpoint + continue' },
                { phrase: '"debug this"', action: 'Root cause analysis' },
              ].map(({ phrase, action }) => (
                <div key={phrase} className="flex items-center gap-3 text-xs">
                  <code className="text-amber-300 bg-gray-900 px-2 py-0.5 rounded font-mono w-40 flex-shrink-0">{phrase}</code>
                  <span className="text-gray-500">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Browse the full toolkit (funnel into Explore) ─────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-14">
        <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-2xl p-6 md:p-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm mb-4">
            <Layers size={14} />
            The full catalog
          </div>
          <h2 className="text-2xl font-bold mb-2">40 skills, 18 agents — browse every one</h2>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-6">
            Every skill and agent in the toolkit, searchable and filterable, each with a plain-English
            detail page. Explore what's inside before you install — no exhaustive lists to scroll here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/explore?tier=premium&origin=oa"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 rounded-xl font-medium transition-colors"
            >
              Browse all 40 skills &amp; 18 agents
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/explore?tier=free"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 rounded-xl font-medium transition-colors"
            >
              See the free tier
            </Link>
          </div>
        </div>
      </div>

      {/* ── Hooks, Settings, Plugins ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-14">
        <h2 className="text-2xl font-bold mb-6">Hooks, Settings, and Plugins</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Hooks */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-yellow-500/20 rounded-lg">
                <Bell className="text-yellow-400" size={16} />
              </div>
              <h3 className="font-semibold text-sm">5 Hooks</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-gray-900 rounded-lg px-3 py-2">
                <div className="text-yellow-300 font-medium">auto-init-check</div>
                <div className="text-gray-500">Flags missing docs on session start</div>
              </div>
              <div className="bg-gray-900 rounded-lg px-3 py-2">
                <div className="text-yellow-300 font-medium">session-logger</div>
                <div className="text-gray-500">Logs a one-line record of each session</div>
              </div>
              <div className="bg-gray-900 rounded-lg px-3 py-2">
                <div className="text-yellow-300 font-medium">iterm-tab-notify</div>
                <div className="text-gray-500">Tab turns gold when Claude waits</div>
              </div>
              <div className="bg-gray-900 rounded-lg px-3 py-2">
                <div className="text-yellow-300 font-medium">iterm-tab-reset</div>
                <div className="text-gray-500">Resets tab color when you type</div>
              </div>
              <div className="bg-gray-900 rounded-lg px-3 py-2">
                <div className="text-yellow-300 font-medium">tab-title</div>
                <div className="text-gray-500">Cross-terminal tab title from your task</div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-purple-500/20 rounded-lg">
                <Settings className="text-purple-400" size={16} />
              </div>
              <h3 className="font-semibold text-sm">Settings Upgrades</h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-gray-900 rounded-lg px-3 py-2">
                <span className="text-gray-300">Effort Level</span>
                <span className="text-purple-300 font-medium">High</span>
              </div>
              <div className="flex items-center justify-between bg-gray-900 rounded-lg px-3 py-2">
                <span className="text-gray-300">Agent Teams</span>
                <span className="text-green-300 font-medium">Enabled</span>
              </div>
              <div className="flex items-center justify-between bg-gray-900 rounded-lg px-3 py-2">
                <span className="text-gray-300">Status Line</span>
                <span className="text-green-300 font-medium">6 segments</span>
              </div>
              <div className="flex items-center justify-between bg-gray-900 rounded-lg px-3 py-2">
                <span className="text-gray-300">Settings Merge</span>
                <span className="text-gray-400">Preserves yours</span>
              </div>
            </div>
          </div>

          {/* Plugins */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-green-500/20 rounded-lg">
                <Cpu className="text-green-400" size={16} />
              </div>
              <h3 className="font-semibold text-sm">5 Plugins</h3>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { name: 'context7', desc: 'Live library documentation' },
                { name: 'claude-md-management', desc: 'CLAUDE.md auditing + updates' },
                { name: 'playwright', desc: 'Browser testing automation' },
                { name: 'frontend-design', desc: 'Enhanced UI generation' },
                { name: 'supabase', desc: 'Project, schema + migration tooling' },
              ].map(p => (
                <div key={p.name} className="bg-gray-900 rounded-lg px-3 py-2">
                  <div className="text-green-300 font-medium">{p.name}</div>
                  <div className="text-gray-500">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Vision System ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-14">
        <div className="bg-gradient-to-r from-teal-900/20 to-blue-900/20 border border-teal-500/30 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <Eye className="text-teal-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Vision System</h3>
              <p className="text-xs text-gray-500">Intent engineering for AI development</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-5">
            VISION.md encodes your judgment calls, tradeoffs, and success criteria so Claude doesn't have to guess.
            The eval system measures whether your intent is being captured correctly over time.
          </p>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="bg-gray-800/60 rounded-xl p-4">
              <div className="text-teal-400 font-medium mb-1">VISION.md</div>
              <div className="text-xs text-gray-500 mb-2">Decision framework, constraint architecture, escalation triggers</div>
              <div className="text-[11px] text-gray-600">Sits alongside CLAUDE.md — defines the "why"</div>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-4">
              <div className="text-teal-400 font-medium mb-1">EVAL.md</div>
              <div className="text-xs text-gray-500 mb-2">6-step evaluation checklist for periodic alignment review</div>
              <div className="text-[11px] text-gray-600">Score your project against its own vision</div>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-4">
              <div className="text-teal-400 font-medium mb-1">/init-vision</div>
              <div className="text-xs text-gray-500 mb-2">Brain dump interview that bootstraps both files</div>
              <div className="text-[11px] text-gray-600">Claude interviews you, writes the docs</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Status Bar Preview ─────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-14">
        <h2 className="text-2xl font-bold mb-4">Live Status Bar</h2>
        <p className="text-sm text-gray-400 mb-4">Always visible in your terminal — six segments: model, context window usage, git branch, project name, prompts this session, and your /grill-me shared-understanding score.</p>
        <div className="bg-gray-950 border border-gray-700 rounded-xl px-5 py-3 font-mono text-sm inline-flex items-center gap-0 overflow-x-auto w-full">
          <span className="text-purple-400">Opus 4.8</span>
          <span className="text-gray-600 mx-2">│</span>
          <span className="text-green-400">[████░░░░░░] 38%</span>
          <span className="text-gray-600 mx-2">│</span>
          <span className="text-green-400"> main*</span>
          <span className="text-gray-600 mx-2">│</span>
          <span className="text-cyan-400">my-project</span>
          <span className="text-gray-600 mx-2">│</span>
          <span className="text-cyan-400">✎ 12</span>
          <span className="text-gray-600 mx-2">│</span>
          <span className="text-cyan-400">🎯 85%</span>
        </div>
        <p className="text-xs text-gray-600 mt-2">Color-coded: green &lt;50%, yellow 50-80%, red &gt;80% context usage. Asterisk (*) on the branch when you have uncommitted changes.</p>
      </div>

      {/* ── Bonus: TLE-Marketing ──────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-14">
        <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Package className="text-orange-400" size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Bonus: UGC Ad Maker</h3>
              <span className="text-xs text-orange-300/70">TLE-Marketing</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Full Next.js application for AI-generated UGC ads. Dual-pipeline video generation,
            ABCD scoring framework, Meta Ads integration, and a creative pipeline dashboard.
          </p>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 font-medium">Clone</span>
              <GatedCopyButton text="git clone https://github.com/ehoyos007/tle-marketing.git" requiredTier="premium" />
            </div>
            <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs overflow-x-auto">
              <span className="text-gray-500">$ </span>
              <span className="text-green-400">git clone</span>
              <span className="text-gray-300"> https://github.com/ehoyos007/tle-marketing.git</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-14">
        <h2 className="text-2xl font-bold mb-6">Details</h2>
        <div className="space-y-3">
          <Expandable title="What does the premium installer change?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>The installer only touches files inside <code className="text-gray-300">~/.claude/</code>:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><code className="text-gray-300">CLAUDE.md</code> — Global instructions (8-file doc system, plan mode, 20+ triggers)</li>
                <li><code className="text-gray-300">statusline.mjs / .ps1 / -command.sh</code> — 6-segment terminal status bar (Node, PowerShell, bash)</li>
                <li><code className="text-gray-300">settings.json</code> — Merged with hooks, plugins, effort level, agent teams</li>
                <li><code className="text-gray-300">agents/*.md</code> — 18 agent definitions (7 base + 11 premium)</li>
                <li><code className="text-gray-300">skills/*/SKILL.md</code> — 40 skill definitions (10 base + 30 premium)</li>
                <li><code className="text-gray-300">hooks/*.sh</code> — 5 automation hook scripts</li>
                <li><code className="text-gray-300">vision-templates/</code> — VISION.md + EVAL.md templates</li>
                <li><code className="text-gray-300">commands/</code> — /init-vision command</li>
              </ul>
              <p>Any existing files are backed up to <code className="text-gray-300">~/.claude/backups/</code> before being replaced.</p>
            </div>
          </Expandable>

          <Expandable title="Will it overwrite my existing settings?">
            <div className="text-sm text-gray-400 space-y-2">
              <p><strong className="text-gray-200">settings.json is merged</strong> — your existing settings are preserved and the installer adds hooks, plugins, and effort level on top (requires jq).</p>
              <p><strong className="text-gray-200">CLAUDE.md is replaced</strong> — but the original is backed up. Merge your custom instructions back afterward.</p>
              <p><strong className="text-gray-200">Agents and skills are added</strong> — existing files with the same names are overwritten (originals backed up). Files with different names are untouched.</p>
            </div>
          </Expandable>

          <Expandable title="Do I still need the free installer?">
            <div className="text-sm text-gray-400 space-y-2">
              <p><strong className="text-gray-200">No.</strong> The premium installer is fully standalone as of v2.1 — it ships its own CLAUDE.md, the 7 base agents, the base workflow skills, and the base hooks, so it installs cleanly on a fresh machine.</p>
              <p>If you already ran the free installer, premium upgrades in place — your existing config is backed up first.</p>
            </div>
          </Expandable>

          <Expandable title="How do I update?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>Pull the latest version and re-run:</p>
              <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs flex items-center justify-between gap-2">
                <span>{UPDATE_CMD}</span>
                <GatedCopyButton text={UPDATE_CMD} requiredTier="premium" />
              </div>
            </div>
          </Expandable>

          <Expandable title="What are the prerequisites?">
            <div className="text-sm text-gray-400 space-y-2">
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong className="text-gray-200">Claude Code</strong> — installed and authenticated</li>
                <li><strong className="text-gray-200">git</strong> — for cloning the toolkit. On Windows, install <a href="https://git-scm.com/downloads/win" className="text-purple-300 underline">Git for Windows</a> (also gives you the bash the hooks use)</li>
                <li><strong className="text-gray-200">Node</strong> — recommended on every OS; powers the cross-platform status line (no jq, no Nerd Font needed)</li>
                <li><strong className="text-gray-200">jq</strong> — macOS/Linux only, and only if you don't have Node (<code className="text-gray-300">brew install jq</code>). The Windows <code className="text-gray-300">install.ps1</code> never needs it</li>
                <li><strong className="text-gray-200">iTerm2</strong> — optional, macOS only. The gold "waiting" tab color is iTerm-only; everywhere else you still get the cross-terminal tab title (Windows Terminal included)</li>
              </ul>
            </div>
          </Expandable>

          <Expandable title="Can I customize it?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>Everything is plain text. Customize freely:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Edit <code className="text-gray-300">~/.claude/CLAUDE.md</code> to add your own triggers or conventions</li>
                <li>Edit skills in <code className="text-gray-300">~/.claude/skills/</code> to modify behavior</li>
                <li>Add a new skill as a folder with a <code className="text-gray-300">SKILL.md</code> — Claude Code picks it up automatically</li>
                <li>Run <code className="text-gray-300">/my-help</code> to print a reference of everything installed</li>
                <li>Add project-specific CLAUDE.md files for per-project overrides</li>
              </ul>
            </div>
          </Expandable>
        </div>
      </div>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-2xl p-8 text-center">
          <Crown size={28} className="text-amber-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Ready to install?</h2>
          <p className="text-sm text-gray-400 mb-5">Two terminal commands. Under 2 minutes. Full operator setup.</p>
          <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs sm:text-sm max-w-2xl mx-auto mb-4 flex items-center justify-between gap-4">
            <div className="overflow-x-auto text-left">
              <span className="text-gray-500">$ </span>
              <span className="text-green-400">git clone</span>
              <span className="text-gray-400"> https://</span>
              <span className="text-yellow-300/70">{'<token>'}</span>
              <span className="text-gray-400">@github.com/...operators-academy-pro.git</span>
            </div>
            {cloneLoading ? (
              <span className="flex items-center gap-1.5 text-xs text-gray-500"><Loader2 size={12} className="animate-spin" /></span>
            ) : cloneError === 'Network error — try again' ? (
              <button onClick={refetch} className="text-xs text-red-400 hover:text-red-300"><RefreshCw size={12} /></button>
            ) : (
              <GatedCopyButton text={cloneCommand} requiredTier="premium" />
            )}
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <Link to="/tools/install" className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
              <ArrowRight size={14} />
              Free tier
            </Link>
            <span className="text-gray-600">|</span>
            <Link to="/course" className="flex items-center gap-1 hover:text-purple-300 transition-colors">
              <BookOpen size={14} />
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
