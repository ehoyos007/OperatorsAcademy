import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Sparkles, Bot, Package, Webhook, Terminal, ExternalLink,
  HelpCircle, Calendar, Layers, Tag, Crown, Boxes, ShieldAlert,
} from 'lucide-react';
import { getItem, categoryLabel, KIND_LABELS } from '../data/items';
import { useViewMode } from '../context/ViewModeContext';
import { useDocumentMeta } from '../lib/seo';
import GatedCopyButton from '../components/GatedCopyButton';
import ViewModeToggle from '../components/ViewModeToggle';
import ItemCard from './ItemCard';

const KIND_COLOR = {
  skill: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  agent: 'text-purple-300 border-purple-500/30 bg-purple-500/10',
  plugin: 'text-green-300 border-green-500/30 bg-green-500/10',
  hook: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
};

const KIND_ICON = { skill: Sparkles, agent: Bot, plugin: Package, hook: Webhook };

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(`${iso}T00:00:00`);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/** One label/value row in the front-matter sidebar. */
function MetaRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-2.5 py-2 border-b border-gray-800 last:border-0">
      <Icon size={14} className="text-gray-600 mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-gray-600">{label}</div>
        <div className="text-sm text-gray-300 break-words">{children}</div>
      </div>
    </div>
  );
}

export default function ExploreDetail() {
  const { slug } = useParams();
  const { mode } = useViewMode();
  const item = getItem(slug);

  useDocumentMeta(
    item ? `${item.kind === 'skill' ? '/' : ''}${item.name} — Operators Academy` : 'Explore — Operators Academy',
    item ? (item.operator?.tagline || item.technical?.tagline || '') : '',
  );

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-3">No tool found for “{slug}”.</p>
          <Link to="/explore" className="text-teal-300 hover:text-teal-200">← Back to Explore</Link>
        </div>
      </div>
    );
  }

  const {
    kind, tier, categoryKey, origin, updated, faq = [], seeAlso = [],
    operator = {}, technical = {}, source, notAffiliated,
  } = item;

  const KindIcon = KIND_ICON[kind] || Sparkles;
  const kindCls = KIND_COLOR[kind] || KIND_COLOR.skill;
  const displayName = kind === 'skill' ? `/${item.name}` : item.name;
  const isPremium = tier === 'premium';
  const isEco = origin === 'ecosystem';
  const deps = technical.deps || [];
  const related = seeAlso.map(getItem).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ── Back ─────────────────────────────────────────────────── */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft size={13} /> Explore
        </Link>

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="mt-4 mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border ${kindCls}`}>
                  <KindIcon size={10} /> {KIND_LABELS[kind] || kind}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 border border-gray-700 rounded px-1.5 py-0.5">
                  {categoryLabel(categoryKey, mode)}
                </span>
                {isPremium && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-amber-400/90 border border-amber-500/30 bg-amber-500/10 rounded px-1.5 py-0.5">
                    <Crown size={10} /> Premium
                  </span>
                )}
                {isEco && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] text-gray-400 border border-gray-600 rounded px-1.5 py-0.5"
                    title="Independent tool — not shipped by Operators Academy"
                  >
                    <ExternalLink size={10} /> External
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-mono text-white break-words">
                {displayName}
              </h1>
              <p className="text-xs text-gray-600 mt-2 flex items-center gap-1.5">
                <Calendar size={11} /> Updated {formatDate(updated)}
              </p>
            </div>
            <ViewModeToggle className="flex-shrink-0" />
          </div>
        </div>

        {/* ── Body + sidebar ───────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">

            {mode === 'operator' ? (
              /* ── Operator view ──────────────────────────────────── */
              <section className="space-y-4">
                {operator.tagline && (
                  <p className="text-lg text-gray-200 leading-relaxed">{operator.tagline}</p>
                )}
                {operator.summary && (
                  <p className="text-sm text-gray-400 leading-relaxed">{operator.summary}</p>
                )}

                {/* Setup — paste into Claude Code */}
                <div className="bg-gray-800/60 border border-teal-500/30 rounded-2xl p-5">
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-teal-300">
                      <Sparkles size={16} /> Setup — paste into Claude Code
                    </h2>
                    <GatedCopyButton
                      text={operator.setupPrompt}
                      label="Copy setup prompt"
                      requiredTier={isPremium ? 'premium' : 'free'}
                    />
                  </div>
                  <pre className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-sm text-gray-200 whitespace-pre-wrap break-words font-mono leading-relaxed">
                    {operator.setupPrompt}
                  </pre>
                  <p className="text-xs text-gray-500 mt-3">
                    Paste this into your Claude Code session — Claude does the rest.
                  </p>
                </div>
              </section>
            ) : (
              /* ── Technical view ─────────────────────────────────── */
              <section className="space-y-4">
                {technical.tagline && (
                  <p className="text-lg text-gray-200 leading-relaxed">{technical.tagline}</p>
                )}
                {technical.body && (
                  <pre className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 text-sm text-gray-300 whitespace-pre-wrap break-words leading-relaxed overflow-x-auto">
                    {technical.body}
                  </pre>
                )}

                {/* Raw install command */}
                {technical.installCommand && (
                  <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
                    <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                      <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                        <Terminal size={16} /> Install command
                      </h2>
                      <GatedCopyButton
                        text={technical.installCommand}
                        label="Copy install command"
                        requiredTier={isPremium ? 'premium' : 'free'}
                      />
                    </div>
                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                      <span className="text-gray-600 select-none">$ </span>
                      {technical.installCommand}
                    </div>
                  </div>
                )}

                {/* Dependencies */}
                {deps.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gray-500 mb-2">
                      <Boxes size={13} /> Requires
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {deps.map((d) => (
                        <span key={d} className="text-xs text-gray-300 bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-1">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* ── FAQ ──────────────────────────────────────────────── */}
            {faq.length > 0 && (
              <section>
                <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                  <HelpCircle size={18} className="text-gray-500" /> FAQ
                </h2>
                <div className="space-y-3">
                  {faq.map((f) => (
                    <div key={f.q} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                      <div className="text-sm font-semibold text-gray-100 mb-1.5">{f.q}</div>
                      <div className="text-sm text-gray-400 leading-relaxed">{f.a}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Front-matter sidebar ───────────────────────────────── */}
          <aside className="lg:col-span-1">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5 lg:sticky lg:top-6">
              <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Details</h2>
              <MetaRow icon={KindIcon} label="Kind">{KIND_LABELS[kind] || kind}</MetaRow>
              <MetaRow icon={Tag} label="Category">{categoryLabel(categoryKey, mode)}</MetaRow>
              <MetaRow icon={Crown} label="Tier">
                {tier ? (tier === 'premium' ? 'Premium' : 'Free') : '—'}
              </MetaRow>
              <MetaRow icon={Layers} label="Origin">
                {origin === 'oa' ? 'Operators Academy' : 'Recommended (external)'}
              </MetaRow>
              {deps.length > 0 && (
                <MetaRow icon={Boxes} label="Requires">{deps.join(', ')}</MetaRow>
              )}
              <MetaRow icon={Calendar} label="Updated">{formatDate(updated)}</MetaRow>
              {isEco && source?.url && (
                <MetaRow icon={ExternalLink} label="Source">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-300 hover:text-teal-200 inline-flex items-center gap-1 break-all"
                  >
                    {source.repo || source.url} <ExternalLink size={11} className="flex-shrink-0" />
                  </a>
                </MetaRow>
              )}

              {isEco && (
                <div className="mt-4 flex items-start gap-2 text-[11px] text-gray-500 bg-gray-900/60 border border-gray-800 rounded-lg p-3">
                  <ShieldAlert size={14} className="text-amber-500/70 flex-shrink-0 mt-0.5" />
                  <span>Independent tool — not affiliated with Operators Academy. We recommend and teach it; we don’t ship it.</span>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* ── See also ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-bold mb-4">See also</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {related.map((r) => (
                <ItemCard key={r.slug} item={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
