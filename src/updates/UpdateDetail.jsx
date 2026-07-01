import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { getUpdate } from '../data/updates';
import ContentRenderer from '../components/ContentRenderer';
import { useDocumentMeta } from '../lib/seo';

const TYPE_STYLE = {
  new: 'text-green-300 border-green-500/30 bg-green-500/10',
  patch: 'text-blue-300 border-blue-500/30 bg-blue-500/10',
};
const TYPE_LABEL = { new: 'NEW', patch: 'PATCH' };

function fmt(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** UpdateDetail — /updates/:slug. One changelog entry expanded. */
export default function UpdateDetail() {
  const { slug } = useParams();
  const u = getUpdate(slug);

  useDocumentMeta(
    u ? `${u.title} — Operators Academy` : 'Updates — Operators Academy',
    u ? u.summary : '',
  );

  if (!u) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-3">No update found for “{slug}”.</p>
          <Link to="/updates" className="text-teal-300 hover:text-teal-200">← Back to Updates</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link to="/updates" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          <ArrowLeft size={13} /> Updates
        </Link>

        <div className="mt-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border ${TYPE_STYLE[u.type] || ''}`}>{TYPE_LABEL[u.type] || u.type}</span>
            <span className="flex items-center gap-1 text-[11px] text-gray-500"><Calendar size={11} /> {fmt(u.date)}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{u.title}</h1>
          <p className="text-gray-400">{u.summary}</p>
        </div>

        {u.body && (
          <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-5 mb-5">
            <ContentRenderer content={u.body} />
          </div>
        )}

        {(u.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {u.tags.map((t) => (
              <Link key={t} to={`/updates?tag=${encodeURIComponent(t)}`} className="text-xs text-gray-500 hover:text-teal-300 border border-gray-700 rounded px-2 py-0.5">#{t}</Link>
            ))}
          </div>
        )}

        {u.sourceUrl && (
          <a href={u.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-teal-300 hover:text-teal-200">
            <ExternalLink size={14} /> Official announcement
          </a>
        )}
      </div>
    </div>
  );
}
