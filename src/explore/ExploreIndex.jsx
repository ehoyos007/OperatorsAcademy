import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import {
  items,
  facetCounts,
  categoryLabel,
  CATEGORY_LABELS,
  KIND_LABELS,
  KINDS,
  ORIGINS,
  TIERS,
} from '../data/items';
import ItemCard from './ItemCard';
import FacetBar from './FacetBar';
import ViewModeToggle from '../components/ViewModeToggle';
import { useViewMode } from '../context/ViewModeContext';
import { useDocumentMeta } from '../lib/seo';

/**
 * ExploreIndex — the faceted, searchable catalog of everything OA ships plus the
 * curated ecosystem picks. All state (facets, search, sort) lives in the URL via
 * useSearchParams, so every view is deep-linkable: /explore?tier=premium lands
 * pre-filtered, and each facet click updates the query string.
 *
 * Facet counts are LIVE: for each facet, counts are computed over the subset
 * filtered by every OTHER active facet (+ search) — so switching a value always
 * shows a meaningful, non-zero-collapsing count.
 */

const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS);
const originLabel = (v) => (v === 'oa' ? 'Ours' : 'Recommended');
const tierLabel = (v) => v.charAt(0).toUpperCase() + v.slice(1);

const SORTS = { updated: 'Recently updated', name: 'A–Z' };

// name + operator/technical taglines + summary + body + tags → the search corpus.
function haystack(it) {
  return [
    it.name,
    it.operator?.tagline,
    it.operator?.summary,
    it.technical?.tagline,
    it.technical?.body,
    ...(it.tags || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

// `skip` = a facet field to ignore, used when counting that facet's own options.
function matches(it, f, skip) {
  if (skip !== 'kind' && f.kind && it.kind !== f.kind) return false;
  if (skip !== 'origin' && f.origin && it.origin !== f.origin) return false;
  if (skip !== 'category' && f.category && it.categoryKey !== f.category) return false;
  if (skip !== 'tier' && f.tier && it.tier !== f.tier) return false;
  if (f.q && !haystack(it).includes(f.q)) return false;
  return true;
}

export default function ExploreIndex() {
  const { mode } = useViewMode();
  const [params, setParams] = useSearchParams();

  useDocumentMeta(
    'Explore the toolkit — Operators Academy',
    'Browse every skill, agent, plugin, and hook in the Operators Academy toolkit — plus curated ecosystem picks. Find the right tool, understand it, and paste a setup prompt into Claude Code.',
  );

  const qRaw = params.get('q') || '';
  // Ignore unknown facet values from stale/mistyped deep links (fall back to no filter)
  const readEnumParam = (key, allowed) => {
    const value = params.get(key) || '';
    return allowed.includes(value) ? value : '';
  };
  const f = {
    kind: readEnumParam('kind', KINDS),
    origin: readEnumParam('origin', ORIGINS),
    category: readEnumParam('category', CATEGORY_KEYS),
    tier: readEnumParam('tier', TIERS),
    q: qRaw.trim().toLowerCase(),
  };
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'updated';

  const setParam = (key, value, replace = false) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace });
  };

  const toggleFacet = (key, value) => setParam(key, f[key] === value ? '' : value);

  const clearAll = () => {
    const next = new URLSearchParams();
    if (params.get('sort')) next.set('sort', params.get('sort'));
    setParams(next);
  };

  // Filtered + sorted results (all active facets + search applied).
  const results = useMemo(() => {
    const list = items.filter((it) => matches(it, f));
    if (sort === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort(
        (a, b) =>
          (b.updated || '').localeCompare(a.updated || '') || a.name.localeCompare(b.name),
      );
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f.kind, f.origin, f.category, f.tier, f.q, sort]);

  // Facet groups with live counts. `mode` is a dep so Category labels re-render
  // when the Operator ⇄ Technical toggle flips.
  const groups = useMemo(() => {
    const build = (key, field, title, values, labelFn) => {
      const counts = facetCounts(items.filter((it) => matches(it, f, key)), field);
      return {
        key,
        title,
        active: f[key],
        options: values.map((v) => ({ value: v, label: labelFn(v), count: counts[v] || 0 })),
      };
    };
    return [
      build('kind', 'kind', 'Kind', KINDS, (v) => KIND_LABELS[v] || v),
      build('origin', 'origin', 'Origin', ORIGINS, originLabel),
      build('category', 'categoryKey', 'Category', CATEGORY_KEYS, (v) => categoryLabel(v, mode)),
      build('tier', 'tier', 'Tier', TIERS, tierLabel),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f.kind, f.origin, f.category, f.tier, f.q, mode]);

  const chips = [
    f.kind && { key: 'kind', text: `Kind · ${KIND_LABELS[f.kind] || f.kind}` },
    f.origin && { key: 'origin', text: `Origin · ${originLabel(f.origin)}` },
    f.category && { key: 'category', text: `Category · ${categoryLabel(f.category, mode)}` },
    f.tier && { key: 'tier', text: `Tier · ${tierLabel(f.tier)}` },
    qRaw.trim() && { key: 'q', text: `Search · “${qRaw.trim()}”` },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Explore the toolkit</h1>
          <p className="text-sm text-gray-400">
            {items.length} skills, agents, plugins &amp; hooks — plus curated ecosystem picks. Find
            the right tool, understand it, paste a setup prompt and go.
          </p>
        </div>

        {/* Toolbar: search + sort + view mode */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
            <input
              type="text"
              value={qRaw}
              aria-label="Search tools by name, description, or tag"
              onChange={(e) => setParam('q', e.target.value, true)}
              placeholder="Search by name, what it does, or tag…"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-8 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-teal-500/50"
            />
            {qRaw && (
              <button
                type="button"
                onClick={() => setParam('q', '')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-400">
            <span className="hidden sm:inline">Sort</span>
            <select
              value={sort}
              aria-label="Sort results"
              onChange={(e) => setParam('sort', e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-2.5 py-2 text-sm text-gray-200 focus:outline-none focus:border-teal-500/50"
            >
              {Object.entries(SORTS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <ViewModeToggle />
        </div>

        {/* Body: facets + results */}
        <div className="flex flex-col lg:flex-row gap-8">
          <FacetBar groups={groups} onToggle={toggleFacet} />

          <div className="flex-1 min-w-0">
            {/* Count + active-filter chips */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-sm text-gray-400">
                <span className="text-gray-100 font-semibold tabular-nums">{results.length}</span>{' '}
                {results.length === 1 ? 'result' : 'results'}
                {chips.length > 0 && <span className="text-gray-600"> of {items.length}</span>}
              </span>
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => setParam(chip.key, '')}
                  className="flex items-center gap-1 text-xs bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-full pl-2.5 pr-1.5 py-1 text-gray-300 transition-colors"
                >
                  {chip.text}
                  <X size={12} className="text-gray-500" />
                </button>
              ))}
              {chips.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-teal-300 hover:text-teal-200 underline underline-offset-2"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Results grid */}
            {results.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {results.map((it) => (
                  <ItemCard key={it.slug} item={it} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border border-dashed border-gray-700 rounded-xl">
                <p className="text-gray-400 mb-3">No tools match these filters.</p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-sm text-teal-300 hover:text-teal-200 underline underline-offset-2"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
