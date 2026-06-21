import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight } from 'lucide-react'

const SLIDES = [
  'title',
  'concept',
  'stack',
  'process',
  'modules',
  'tools',
  'premium',
  'cta',
]

function NavDots({ activeIndex, onDotClick }) {
  return (
    <div className="ppl-nav-dots" aria-label="Slide navigation">
      {SLIDES.map((id, i) => (
        <button
          key={id}
          className={`ppl-nav-dot${i === activeIndex ? ' active' : ''}`}
          onClick={() => onDotClick(i)}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slidesRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slidesRef.current.indexOf(entry.target)
            if (index !== -1) setActiveSlide(index)
          }
        })
      },
      { threshold: 0.3 }
    )

    slidesRef.current.forEach((slide) => {
      if (slide) observer.observe(slide)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSlide = (index) => {
    slidesRef.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }

  const setSlideRef = (index) => (el) => {
    slidesRef.current[index] = el
  }

  return (
    <div className="ppl">
      <NavDots activeIndex={activeSlide} onDotClick={scrollToSlide} />

      {/* ================================================================
          SLIDE 1 — TITLE
          ================================================================ */}
      <section
        ref={setSlideRef(0)}
        className="ppl-slide slide-gradient"
      >
        <div className="ppl-slide-inner">
          <div className="ppl-brand">Operators Academy</div>
          <h1>
            Go from idea to<br />
            working AI <span className="hl">tool</span>
          </h1>
          <p className="subtitle">
            Build and ship AI tools with Claude Code — skills, agents, and
            hooks — without writing code yourself. Works on Windows, Mac, and Linux.
          </p>

          <div className="ppl-tags">
            {[
              { label: 'Claude Code', to: '/course/claude-code' },
              { label: 'Skills, Agents & Hooks', to: '/course/building-blocks' },
              { label: 'The Operator Workflow', to: '/course/putting-it-together' },
              { label: 'OpenClaw', to: '/course/openclaw' },
              { label: 'Project System', to: '/course/project-system' },
            ].map(({ label, to }) => (
              <Link key={to} to={to} className="ppl-tag">{label}</Link>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <Link to="/course" className="ppl-cta">
              Start the Course — Free
              <ChevronRight size={22} />
            </Link>
          </div>
        </div>
        <div className="ppl-slide-number">01 / 08</div>
      </section>

      {/* ================================================================
          SLIDE 2 — WHAT IS AN OPERATOR
          ================================================================ */}
      <section
        ref={setSlideRef(1)}
        className="ppl-slide slide-dark"
      >
        <div className="ppl-section-label">The Concept</div>
        <div className="ppl-slide-number">02 / 08</div>
        <div className="ppl-slide-inner">
          <h2>
            What is an <span className="hl-green">Operator</span>?
          </h2>
          <p className="subtitle">
            Operators don't just prompt AI — they build systems that work without constant manual input.
          </p>

          <div className="ppl-grid">
            <div className="ppl-card">
              <div className="ppl-card-label">Mindset</div>
              <div className="ppl-card-title">Systems Over Sessions</div>
              <div className="ppl-card-desc">
                Instead of one-off prompts, operators build repeatable workflows that run on their own. You design the system once, then it works for you.
              </div>
              <div className="ppl-tip ppl-tip-green">
                Think: "How do I make this run without me?"
              </div>
            </div>

            <div className="ppl-card">
              <div className="ppl-card-label">Result</div>
              <div className="ppl-card-title">AI-Powered Products</div>
              <div className="ppl-card-desc">
                The output isn't a clever reply — it's a working tool, a live website, an automated pipeline, or a product you can sell.
              </div>
              <div className="ppl-tip">
                Operators ship products, not prompts.
              </div>
            </div>

            <div className="ppl-card">
              <div className="ppl-card-label">Advantage</div>
              <div className="ppl-card-title">No Code Required</div>
              <div className="ppl-card-desc">
                You don't write code — you direct AI to write it for you. Claude Code turns natural language into real applications.
              </div>
              <div className="ppl-tip ppl-tip-amber">
                Your skill is knowing what to build and how to describe it.
              </div>
            </div>
          </div>

          <div className="ppl-callout ppl-callout-green">
            <strong>Key Insight:</strong> An operator is to AI what a director is to a film crew. You don't need to operate every camera — you need to know what the final product should look like.
          </div>
        </div>
      </section>

      {/* ================================================================
          SLIDE 3 — THE OPERATOR STACK
          ================================================================ */}
      <section
        ref={setSlideRef(2)}
        className="ppl-slide slide-blue"
      >
        <div className="ppl-section-label">The Stack</div>
        <div className="ppl-slide-number">03 / 08</div>
        <div className="ppl-slide-inner">
          <h2>
            Three Tools. One <span className="hl">System</span>.
          </h2>
          <p className="subtitle">
            One engine, plus the workflow layer around it. That's the modern Operator Stack.
          </p>

          <div className="ppl-steps">
            <div className="ppl-step">
              <div className="ppl-step-num ppl-step-num-blue">1</div>
              <div className="ppl-step-content">
                <h3>Claude — Think</h3>
                <p>Your thinking partner for the quick planning stop before you build. Brainstorm the idea and the approach, then take it into Claude Code.</p>
                <div className="ppl-step-time">Planning</div>
              </div>
            </div>

            <div className="ppl-step">
              <div className="ppl-step-num ppl-step-num-green">2</div>
              <div className="ppl-step-content">
                <h3 style={{ color: 'var(--green)' }}>Claude Code — Build</h3>
                <p>The engine. Describe what you want in plain English; Claude Code writes the files, runs the commands, and ships the app. Where you spend 90% of your time.</p>
                <div className="ppl-step-time">Development & Shipping</div>
              </div>
            </div>

            <div className="ppl-step">
              <div className="ppl-step-num ppl-step-num-amber">3</div>
              <div className="ppl-step-content">
                <h3 style={{ color: 'var(--amber)' }}>Skills · Agents · Hooks — Multiply</h3>
                <p>The workflow layer. Reusable skills, specialist agents, and event-driven hooks turn Claude Code from a smart assistant into a system that runs your work.</p>
                <div className="ppl-step-time">Your workflow layer</div>
              </div>
            </div>
          </div>

          <div className="ppl-callout">
            <strong>Together:</strong> Plan with Claude → Build with Claude Code → Review and Ship with your skills and agents. That's how operators turn ideas into shipped tools.
          </div>
        </div>
      </section>

      {/* ================================================================
          SLIDE 4 — HOW IT WORKS
          ================================================================ */}
      <section
        ref={setSlideRef(3)}
        className="ppl-slide slide-navy"
      >
        <div className="ppl-section-label">The Process</div>
        <div className="ppl-slide-number">04 / 08</div>
        <div className="ppl-slide-inner">
          <h2>
            How It <span className="hl-green">Works</span>
          </h2>
          <p className="subtitle">
            A free, self-paced course that takes you from zero to shipping AI-powered tools.
          </p>

          <div className="ppl-grid">
            <div className="ppl-card">
              <div className="ppl-card-label">Phase 1</div>
              <div className="ppl-card-title" style={{ color: 'var(--blue)' }}>Set Up Claude Code</div>
              <div className="ppl-card-desc">
                Install Claude Code on any computer — Windows, Mac, or Linux — and learn the interface, context, and commands. Real examples, not theory.
              </div>
            </div>

            <div className="ppl-card">
              <div className="ppl-card-label">Phase 2</div>
              <div className="ppl-card-title" style={{ color: 'var(--green)' }}>Build Your Workflow</div>
              <div className="ppl-card-desc">
                Skills, agents, and hooks — the layer that makes you fast. Then run the operator loop to build a real tool end to end in one sitting.
              </div>
            </div>

            <div className="ppl-card">
              <div className="ppl-card-label">Phase 3</div>
              <div className="ppl-card-title" style={{ color: 'var(--amber)' }}>Scale & Automate</div>
              <div className="ppl-card-desc">
                A personal AI agent that runs 24/7, plus a project system that gives Claude a memory across sessions. Turn tools into a system that runs itself.
              </div>
            </div>
          </div>

          <div className="ppl-callout ppl-callout-green">
            <strong>No signup required.</strong> The entire course is free and open. Create an account only when you want access to the tools and templates.
          </div>
        </div>
      </section>

      {/* ================================================================
          SLIDE 5 — COURSE MODULES
          ================================================================ */}
      <section
        ref={setSlideRef(4)}
        className="ppl-slide slide-dark-blue"
      >
        <div className="ppl-section-label">The Course</div>
        <div className="ppl-slide-number">05 / 08</div>
        <div className="ppl-slide-inner">
          <h2>
            Course <span className="hl">Modules</span>
          </h2>
          <p className="subtitle">
            Six focused modules, from your first install to a workflow that runs itself.
          </p>

          <div className="ppl-grid">
            {[
              { emoji: '🧠', name: 'What is an Operator?', desc: 'The mindset, the stack, and how to think about AI-powered building.', to: '/course', accent: 'blue' },
              { emoji: '💬', name: 'Claude', desc: 'Your thinking partner. Account setup and prompt basics — the quick stop before Claude Code.', to: '/course/claude-ai', accent: 'blue' },
              { emoji: '⌨️', name: 'Claude Code', desc: 'Install on Windows, Mac, or Linux. Build real apps from plain English in your terminal.', to: '/course/claude-code', accent: 'purple' },
              { emoji: '🧩', name: 'Skills, Agents & Hooks', desc: 'The workflow layer: reusable commands, specialist agents, event automation, and MCP.', to: '/course/building-blocks', accent: 'cyan' },
              { emoji: '🔧', name: 'The Operator Workflow', desc: 'Plan, build, review, ship — the loop. Build a real tool end to end in one sitting.', to: '/course/putting-it-together', accent: 'green' },
              { emoji: '🤖', name: 'OpenClaw', desc: 'Run a personal AI agent 24/7 for under $10/month.', to: '/course/openclaw', accent: 'orange' },
              { emoji: '📁', name: 'Project Startup System', desc: 'The docs + skills setup that gives Claude a memory across sessions.', to: '/course/project-system', accent: 'purple' },
            ].map(({ emoji, name, desc, to, accent }) => (
              <Link key={to} to={to} className="ppl-niche-card" data-accent={accent}>
                <div className="ppl-niche-emoji">{emoji}</div>
                <div className="ppl-niche-name">{name}</div>
                <div className="ppl-niche-desc">{desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SLIDE 6 — TOOLS
          ================================================================ */}
      <section
        ref={setSlideRef(5)}
        className="ppl-slide slide-dark"
      >
        <div className="ppl-section-label">The Toolkit</div>
        <div className="ppl-slide-number">06 / 08</div>
        <div className="ppl-slide-inner">
          <h2>
            Operator <span className="hl-green">Tools</span>
          </h2>
          <p className="subtitle">
            Ready-to-use tools, templates, and systems. Free account required.
          </p>

          <div className="ppl-grid-2">
            <Link to="/tools/install" className="ppl-card" data-accent="purple">
              <div className="ppl-card-label">Setup</div>
              <div className="ppl-card-title">Install the Workflow</div>
              <div className="ppl-card-desc">
                One command to set up CLAUDE.md, agents, status bar, and the full operator toolkit.
              </div>
              <div className="ppl-tip" style={{
                background: 'rgba(168, 85, 247, 0.1)',
                borderColor: 'rgba(168, 85, 247, 0.2)',
                color: '#a855f7'
              }}>
                Single install command — takes 30 seconds
              </div>
            </Link>

            <Link to="/tools/claude-code-guide" className="ppl-card" data-accent="blue">
              <div className="ppl-card-label">Reference</div>
              <div className="ppl-card-title">Quick Reference</div>
              <div className="ppl-card-desc">
                Copy-paste templates, trigger phrases, commands, and file templates for daily use.
              </div>
            </Link>

            <Link to="/tools/prompt-flows" className="ppl-card" data-accent="cyan">
              <div className="ppl-card-label">Templates</div>
              <div className="ppl-card-title">Prompt Flows</div>
              <div className="ppl-card-desc">
                Step-by-step prompt sequences for launching products, SEO campaigns, and more.
              </div>
            </Link>

            <Link to="/tools/mission-control" className="ppl-card" data-accent="cyan">
              <div className="ppl-card-label">Dashboard</div>
              <div className="ppl-card-title">Clu Mission Control</div>
              <div className="ppl-card-desc">
                Web-based Claude Code client. Browse logs, manage sessions, track progress.
              </div>
            </Link>

            <Link to="/tools/session-monitor" className="ppl-card" data-accent="cyan">
              <div className="ppl-card-label">Monitoring</div>
              <div className="ppl-card-title">Session Monitor</div>
              <div className="ppl-card-desc">
                Terminal dashboard for monitoring Claude Code sessions and deployments in real-time.
              </div>
            </Link>

            <Link to="/tools/coop" className="ppl-card" data-accent="green">
              <div className="ppl-card-label">Collaboration</div>
              <div className="ppl-card-title">Co-Op Mode</div>
              <div className="ppl-card-desc">
                Multiplayer plugin for 2–3 developers using Claude Code on the same project.
              </div>
              <div className="ppl-tip ppl-tip-green">
                Team-first AI development
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          SLIDE 7 — PREMIUM
          ================================================================ */}
      <section
        ref={setSlideRef(6)}
        className="ppl-slide slide-gradient"
      >
        <div className="ppl-section-label">Premium</div>
        <div className="ppl-slide-number">07 / 08</div>
        <div className="ppl-slide-inner">
          <h2>
            Premium <span className="hl-amber">Toolkit</span>
          </h2>
          <p className="subtitle">
            18 skills, 11 agents, hooks, the Vision System, and more — distributed via a private GitHub repo.
          </p>

          <div className="ppl-grid">
            <div className="ppl-card">
              <div className="ppl-card-label">Engineering</div>
              <div className="ppl-card-title" style={{ color: 'var(--blue)' }}>Compound Engineering</div>
              <div className="ppl-card-desc">
                Systematic Plan → Work → Review → Compound loop where each unit of engineering makes subsequent work easier.
              </div>
            </div>

            <div className="ppl-card">
              <div className="ppl-card-label">Design</div>
              <div className="ppl-card-title" style={{ color: 'var(--green)' }}>Frontend Design</div>
              <div className="ppl-card-desc">
                Production-grade UI generation. Distinctive interfaces that avoid generic AI aesthetics.
              </div>
            </div>

            <div className="ppl-card">
              <div className="ppl-card-label">Strategy</div>
              <div className="ppl-card-title" style={{ color: 'var(--amber)' }}>Vision System</div>
              <div className="ppl-card-desc">
                Intent engineering — close the gap between what you mean and what AI builds.
              </div>
              <div className="ppl-tip ppl-tip-amber">
                The most requested premium feature
              </div>
            </div>

            <div className="ppl-card">
              <div className="ppl-card-label">Automation</div>
              <div className="ppl-card-title" style={{ color: 'var(--blue)' }}>Dev Browser</div>
              <div className="ppl-card-desc">
                Browser automation with persistent state. Navigate, fill forms, screenshot, and scrape — all from Claude Code.
              </div>
            </div>

            <div className="ppl-card">
              <div className="ppl-card-label">Quality</div>
              <div className="ppl-card-title" style={{ color: 'var(--green)' }}>QA Orchestrator</div>
              <div className="ppl-card-desc">
                Full QA workflow: logging, testing, debugging. Runs automatically after features are built.
              </div>
            </div>

            <div className="ppl-card">
              <div className="ppl-card-label">Workflow</div>
              <div className="ppl-card-title" style={{ color: 'var(--red)' }}>Sprint System</div>
              <div className="ppl-card-desc">
                6-day sprint prioritizer, rapid prototyper, and feedback synthesizer for fast iteration.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <Link to="/tools/premium" className="ppl-cta ppl-cta-amber">
              Explore Premium
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          SLIDE 8 — CTA
          ================================================================ */}
      <section
        ref={setSlideRef(7)}
        className="ppl-slide slide-navy"
      >
        <div className="ppl-section-label">Get Started</div>
        <div className="ppl-slide-number">08 / 08</div>
        <div className="ppl-slide-inner" style={{ textAlign: 'center' }}>
          <h2>
            Ready to <span className="hl-green">Start</span>?
          </h2>
          <p className="subtitle" style={{ maxWidth: 600, margin: '0 auto 40px' }}>
            The full course is free. No signup required. Learn at your own pace, build real tools, and join the next generation of AI operators.
          </p>

          <Link to="/course" className="ppl-cta ppl-cta-green">
            Start the Course
            <ChevronRight size={22} />
          </Link>

          <div className="ppl-callout" style={{ marginTop: 48, textAlign: 'left', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            <strong>Already started?</strong> Jump back into the{' '}
            <Link to="/course" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>course modules</Link>,
            check out the{' '}
            <Link to="/tools/install" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>toolkit installer</Link>,
            or explore the{' '}
            <Link to="/tools/prompt-flows" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>prompt flows</Link>.
          </div>
        </div>
      </section>

      <div className="ppl-footer">
        Built for operators learning AI-powered development
      </div>
    </div>
  )
}
