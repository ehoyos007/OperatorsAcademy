import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, GitBranch, ArrowRight, Download, Globe, MessageSquare, Search, Upload, Calendar, Eye, Server, ListTodo, Activity } from 'lucide-react';
import CopyButton from './components/CopyButton';
import Expandable from './components/Expandable';

const INSTALL_CMD = 'curl -fsSL https://operators-academy.vercel.app/claude-setup/install-mission-control.sh | bash';

const features = [
  {
    name: 'Chat Log Viewer',
    icon: MessageSquare,
    color: 'cyan',
    desc: 'Browse and review past Claude Code conversations. Search across sessions, filter by project, and revisit any exchange.',
  },
  {
    name: 'Session Management',
    icon: Activity,
    color: 'purple',
    desc: 'Start new Claude Code sessions or resume previous ones directly from the browser. No terminal switching required.',
  },
  {
    name: 'Conversation Search',
    icon: Search,
    color: 'blue',
    desc: 'Full-text search across all your Claude Code conversations. Find that one prompt or solution from last week instantly.',
  },
  {
    name: 'File Upload',
    icon: Upload,
    color: 'emerald',
    desc: 'Upload files directly through the web interface to share context with Claude Code sessions.',
  },
  {
    name: 'Browser Preview',
    icon: Eye,
    color: 'orange',
    desc: 'Preview web apps and rendered output right inside the dashboard without switching windows.',
  },
  {
    name: 'Git Integration',
    icon: GitBranch,
    color: 'pink',
    desc: 'See branch status, recent commits, and diffs associated with each session at a glance.',
  },
  {
    name: 'MCP Viewer',
    icon: Server,
    color: 'yellow',
    desc: 'Inspect active MCP server connections and available tools for each session.',
  },
  {
    name: 'Message Scheduler',
    icon: Calendar,
    color: 'indigo',
    desc: 'Queue up prompts to send to Claude Code sessions on a schedule or when conditions are met.',
  },
];

const roadmapItems = [
  { label: 'Task queue', desc: 'Queue and prioritize tasks across multiple sessions' },
  { label: 'Clu session management', desc: 'Manage persistent Clu agent sessions from the dashboard' },
  { label: 'Activity & PR tracking', desc: 'Track code changes, pull requests, and deployment status per session' },
];

export default function MissionControlPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm mb-6">
          <Globe size={14} />
          Web Dashboard
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Clu Mission Control
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A web-based Claude Code client. Browse chat logs, start and resume sessions,
          search conversations, upload files, and manage everything from your browser.
        </p>
      </div>

      {/* Dashboard Preview */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-gray-950 border border-gray-700 rounded-xl p-4 font-mono text-xs overflow-x-auto">
          <div className="text-gray-500 mb-2">
            {'  '}CLU MISSION CONTROL{' '}
            <span className="text-gray-700">{'─'.repeat(36)}</span>
            <span className="text-gray-600 float-right">localhost:5173</span>
          </div>
          <div className="mb-3">
            <div className="text-cyan-400 mb-1">{'  '}SESSIONS</div>
            <div className="text-gray-300">
              {'  '}<span className="text-green-400">ACTIVE</span>{'    '}sales-coaching-ai{'   '}<span className="text-gray-500">main</span>{'        '}12 messages{'  '}<span className="text-green-400">connected</span>
            </div>
            <div className="text-gray-300">
              {'  '}<span className="text-yellow-400">PAUSED</span>{'    '}lead-crm{'            '}<span className="text-gray-500">feat/auth</span>{'   '}8 messages{'   '}<span className="text-yellow-400">resumable</span>
            </div>
            <div className="text-gray-300">
              {'  '}<span className="text-gray-500">SAVED</span>{'     '}operators-academy{'   '}<span className="text-gray-500">main</span>{'        '}42 messages{'  '}<span className="text-gray-500">archived</span>
            </div>
          </div>
          <div className="mb-3">
            <div className="text-purple-400 mb-1">{'  '}SEARCH</div>
            <div className="text-gray-300">
              {'  '}<span className="text-gray-500">&gt;</span> "how to implement OAuth"{'   '}<span className="text-cyan-400">3 results across 2 sessions</span>
            </div>
          </div>
          <div>
            <div className="text-emerald-400 mb-1">{'  '}MCP TOOLS</div>
            <div className="text-gray-300">
              {'  '}filesystem{'  '}github{'  '}supabase{'  '}<span className="text-gray-500">3 servers connected</span>
            </div>
          </div>
          <div className="mt-3 text-gray-600 border-t border-gray-800 pt-2">
            {'  '}3 sessions{'  '}|{'  '}63 conversations{'  '}|{'  '}3 MCP servers{'  '}|{'  '}git synced
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          Simulated output — actual dashboard runs at localhost:5173
        </p>
      </div>

      {/* Install Command */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400 font-medium">Install with one command:</span>
            <CopyButton text={INSTALL_CMD} />
          </div>
          <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <span className="text-gray-500">$ </span>
            <span className="text-green-400">curl</span>
            <span className="text-gray-300"> -fsSL https://operators-academy.vercel.app/claude-setup/install-mission-control.sh </span>
            <span className="text-gray-500">| </span>
            <span className="text-green-400">bash</span>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Requires Node.js 18+, pnpm, and git. Installs to ~/.local/share/clu-mission-control.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {features.map((f) => (
            <div key={f.name} className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex items-start gap-4">
              <div className={`p-2.5 bg-${f.color}-500/20 rounded-lg flex-shrink-0`}>
                <f.icon className={`text-${f.color}-400`} size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{f.name}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">How it works</h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyan-400 text-sm font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Clone and install</h3>
              <p className="text-sm text-gray-400">
                The installer clones the repo and runs <code className="text-cyan-300">pnpm install</code> to set up all dependencies.
                No build step required — it's a Vite dev server.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyan-400 text-sm font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Start the dev server</h3>
              <p className="text-sm text-gray-400">
                Run <code className="text-cyan-300">pnpm dev</code> to launch the dashboard at <code className="text-cyan-300">localhost:5173</code>.
                The web client connects to your local Claude Code instance automatically.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyan-400 text-sm font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Browse and manage sessions</h3>
              <p className="text-sm text-gray-400">
                View all your Claude Code chat logs, search across conversations, start new sessions, or resume
                existing ones — all from your browser. Upload files, preview output, and inspect MCP connections.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyan-400 text-sm font-bold">4</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Keep it running</h3>
              <p className="text-sm text-gray-400">
                Leave the dashboard open in a browser tab while you work. It stays synced with your sessions
                in real-time. Update anytime with <code className="text-cyan-300">git pull && pnpm install</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Roadmap</h2>
        <div className="space-y-3">
          {roadmapItems.map((item) => (
            <div key={item.label} className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex items-start gap-4">
              <div className="p-2.5 bg-gray-700/50 rounded-lg flex-shrink-0">
                <ListTodo className="text-gray-400" size={20} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Details</h2>

        <div className="space-y-3">
          <Expandable title="What does the installer do?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>The installer clones the repository and installs dependencies:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><code className="text-gray-300">~/.local/share/clu-mission-control/</code> — Source code</li>
                <li>Runs <code className="text-gray-300">pnpm install</code> to set up dependencies</li>
                <li>Creates an alias for quick launching</li>
              </ul>
            </div>
          </Expandable>

          <Expandable title="What are the prerequisites?">
            <div className="text-sm text-gray-400 space-y-2">
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li><strong className="text-gray-200">Node.js 18+</strong> — runtime (<code className="text-gray-300">winget install OpenJS.NodeJS</code> on Windows, <code className="text-gray-300">brew install node</code> on macOS, or nodejs.org)</li>
                <li><strong className="text-gray-200">pnpm</strong> — package manager (<code className="text-gray-300">npm install -g pnpm</code>)</li>
                <li><strong className="text-gray-200">git</strong> — for cloning the repository</li>
                <li><strong className="text-gray-200">Claude Code</strong> — the CLI tool this dashboard manages</li>
              </ul>
            </div>
          </Expandable>

          <Expandable title="How do I update?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>Run the install command again — it detects the existing installation and pulls the latest version:</p>
              <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs">
                <div>curl -fsSL https://operators-academy.vercel.app/claude-setup/install-mission-control.sh | bash</div>
              </div>
              <p>Or update manually:</p>
              <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs">
                <div>cd ~/.local/share/clu-mission-control</div>
                <div>git pull && pnpm install</div>
              </div>
            </div>
          </Expandable>

          <Expandable title="How do I uninstall?">
            <div className="text-sm text-gray-400 space-y-2">
              <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs">
                <div>rm -rf ~/.local/share/clu-mission-control</div>
              </div>
            </div>
          </Expandable>

          <Expandable title="Is this the same as the TUI terminal dashboard?">
            <div className="text-sm text-gray-400 space-y-2">
              <p>No. Clu Mission Control is a <strong className="text-gray-200">web-based</strong> dashboard that runs in your browser.
                 We're separately developing a <Link to="/tools/session-monitor" className="text-cyan-400 hover:text-cyan-300">TUI Session Monitor</Link> for
                 terminal-based monitoring — check that page for details.</p>
            </div>
          </Expandable>
        </div>
      </div>

      {/* Next Steps */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">Next steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/tools/session-monitor"
            className="group bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Monitor className="text-cyan-400" size={20} />
              </div>
              <h3 className="font-semibold">Session Monitor (TUI)</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Terminal-based dashboard for monitoring sessions, git, deployments, and alerts. Coming soon.
            </p>
            <div className="text-cyan-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Learn more <ArrowRight size={14} />
            </div>
          </Link>
          <Link
            to="/tools/install"
            className="group bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Download className="text-purple-400" size={20} />
              </div>
              <h3 className="font-semibold">Install the Workflow</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              Set up the full Claude Code workflow — docs, agents, status bar, and trigger phrases.
            </p>
            <div className="text-purple-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Install <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Ready to install?</h2>
          <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm max-w-2xl mx-auto mb-4 flex items-center justify-between gap-4">
            <div className="overflow-x-auto">
              <span className="text-gray-500">$ </span>
              <span className="text-green-400">curl</span>
              <span className="text-gray-300"> -fsSL https://operators-academy.vercel.app/claude-setup/install-mission-control.sh </span>
              <span className="text-gray-500">| </span>
              <span className="text-green-400">bash</span>
            </div>
            <CopyButton text={INSTALL_CMD} />
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <a href="https://github.com/ehoyos007/clu-mission-control" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
              <GitBranch size={14} />
              View source on GitHub
            </a>
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
