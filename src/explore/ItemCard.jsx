import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ExternalLink } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';
import { categoryLabel, KIND_LABELS } from '../data/items';

const KIND_COLOR = {
  skill: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  agent: 'text-purple-300 border-purple-500/30 bg-purple-500/10',
  plugin: 'text-green-300 border-green-500/30 bg-green-500/10',
  hook: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
};

/**
 * Shared catalog card. Used in the Explore grid and in "See also".
 * Reads the global view mode to pick operator vs technical tagline + category label.
 */
export default function ItemCard({ item }) {
  const { mode } = useViewMode();
  const tagline = mode === 'technical' ? item.technical?.tagline : item.operator?.tagline;
  const kindCls = KIND_COLOR[item.kind] || KIND_COLOR.skill;
  const isPremium = item.tier === 'premium';
  const isEco = item.origin === 'ecosystem';
  const displayName = item.kind === 'skill' ? `/${item.name}` : item.name;

  return (
    <Link
      to={`/explore/${item.slug}`}
      className="group block bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-xl p-4 transition-colors"
    >
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className={`text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border ${kindCls}`}>
          {KIND_LABELS[item.kind] || item.kind}
        </span>
        {isPremium && (
          <span className="flex items-center gap-1 text-[10px] text-amber-400/80 border border-amber-500/30 rounded px-1.5 py-0.5">
            <Lock size={9} /> Premium
          </span>
        )}
        {isEco && (
          <span className="flex items-center gap-1 text-[10px] text-gray-400 border border-gray-600 rounded px-1.5 py-0.5" title="Independent tool — not shipped by Operators Academy">
            <ExternalLink size={9} /> External
          </span>
        )}
        <span className="ml-auto text-[10px] text-gray-600">{categoryLabel(item.categoryKey, mode)}</span>
      </div>
      <div className="font-mono text-sm font-semibold text-gray-100 group-hover:text-white mb-1">{displayName}</div>
      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{tagline}</p>
    </Link>
  );
}
