import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Megaphone } from 'lucide-react';
import { updates, UPDATE_TYPES } from '../data/updates';
import { useDocumentMeta } from '../lib/seo';

const TYPE_STYLE = {
  new: 'text-green-300 border-green-500/30 bg-green-500/10',
  patch: 'text-blue-300 border-blue-500/30 bg-blue-500/10',
};
const TYPE_LABEL = { new: 'NEW', patch: 'PATCH' };

function fmt(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * UpdatesIndex — /updates. Reverse-chronological changelog of the toolkit + site,
 * filterable by type (new/patch) and topic tag.
 */
export default function UpdatesIndex() {
  const [params, setParams] = useSearchParams();
  const type = params.get('type') || '';
  const tag = params.get('tag') || '';

  useDocumentMeta(
    'Updates — Operators Academy',
    'What changed and when — a running log of new features and toolkit releases across Operators Academy.',
  );

  const setParam = (k, v) => {
    const next = new URLSearchParams(params);
    if (v && v !== params.get(k)) next.set(k, v);
    else next.delete(k);
    setParams(next);
  };

  const allTags = [...new Set(updates.flatMap((u) => u.tags || []))].sort();
  const shown = [...updates]
    .filter((u) => (!type || u.type === type) && (!tag || (u.tags || []).includes(tag)))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <Megaphone className="text-teal-400" size={24} />
          <h1 className="text-3xl font-bold">Updates</h1>
        </div>
        <p className="text-sm text-gray-400 mb-6">What changed and when — new features and toolkit releases.</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setParam('type', '')} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${!type ? 'text-white border-gray-500 bg-gray-800' : 'text-gray-400 border-gray-700 hover:text-gray-200'}`}>All</button>
          {UPDATE_TYPES.map((t) => (
            <button key={t} onClick={() => setParam('type', t)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${type === t ? TYPE_STYLE[t] : 'text-gray-400 border-gray-700 hover:text-gray-200'}`}>
              {TYPE_LABEL[t]}
            </button>
          ))}
          {allTags.length > 0 && <span className="w-px bg-gray-700 mx-1" />}
          {allTags.map((t) => (
            <button key={t} onClick={() => setParam('tag', t)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${tag === t ? 'text-teal-300 border-teal-500/40 bg-teal-500/10' : 'text-gray-500 border-gray-700 hover:text-gray-300'}`}>
              #{t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {shown.map((u) => (
            <Link key={u.slug} to={`/updates/${u.slug}`} className="group block bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-xl p-4 transition-colors">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border ${TYPE_STYLE[u.type] || ''}`}>{TYPE_LABEL[u.type] || u.type}</span>
                <span className="ml-auto text-[11px] text-gray-500">{fmt(u.date)}</span>
              </div>
              <div className="font-semibold text-gray-100 group-hover:text-white mb-1">{u.title}</div>
              <p className="text-xs text-gray-400 leading-relaxed">{u.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
