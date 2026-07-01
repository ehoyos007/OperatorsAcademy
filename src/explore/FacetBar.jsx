import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

/**
 * FacetBar — the Explore filter sidebar. Purely presentational: the parent
 * (ExploreIndex) computes live counts over the currently-filtered subset and
 * passes ready-made groups. Single-select per facet; clicking the active value
 * clears it. Zero-count values are shown dimmed + disabled so the shape of the
 * catalog stays legible.
 *
 * groups: [{ key, title, options: [{ value, label, count }], active }]
 * onToggle(key, value): toggle a facet value (parent clears if already active).
 */
export default function FacetBar({ groups, onToggle }) {
  return (
    <aside className="lg:w-56 lg:flex-shrink-0">
      <div className="flex items-center gap-2 mb-4 text-gray-400">
        <SlidersHorizontal size={15} />
        <span className="text-xs font-semibold uppercase tracking-wider">Filters</span>
      </div>

      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.options.map((opt) => {
                const active = group.active === opt.value;
                const empty = opt.count === 0 && !active;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={empty}
                    aria-pressed={active}
                    onClick={() => onToggle(group.key, opt.value)}
                    className={`flex items-center gap-1.5 text-xs rounded-lg border px-2.5 py-1 transition-colors ${
                      active
                        ? 'border-teal-500/40 bg-teal-500/20 text-teal-200'
                        : empty
                        ? 'border-gray-800 bg-gray-900/40 text-gray-600 cursor-not-allowed'
                        : 'border-gray-700 bg-gray-800/60 text-gray-300 hover:border-gray-600 hover:text-white'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={`text-[10px] tabular-nums ${
                        active ? 'text-teal-300/80' : 'text-gray-500'
                      }`}
                    >
                      {opt.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
