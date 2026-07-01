import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { stacks } from '../data/stacks';
import { getItem } from '../data/items';
import { useDocumentMeta } from '../lib/seo';

/**
 * StacksPage — /stacks. Curated role/goal bundles. Each card's chips deep-link to
 * the tool detail pages (no stack detail route — the chips are the navigation).
 */
export default function StacksPage() {
  useDocumentMeta(
    'Stacks — Operators Academy',
    'Curated tool combinations for your role and goals — proven bundles of skills and agents you can adopt instead of assembling one from scratch.',
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <Layers className="text-teal-400" size={26} />
          <h1 className="text-3xl font-bold">Stacks</h1>
        </div>
        <p className="text-sm text-gray-400 mb-8">
          Curated combinations for your role and goals. Adopt a proven bundle instead of assembling
          one from scratch — each chip opens the tool.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {stacks.map((s) => (
            <div key={s.slug} className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl" aria-hidden>{s.emoji}</span>
                <h2 className="text-lg font-bold">{s.title}</h2>
              </div>
              {s.forWho && <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">{s.forWho}</div>}
              <p className="text-sm text-gray-400 mb-4">{s.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.itemSlugs.map((slug) => {
                  const it = getItem(slug);
                  const label = it ? (it.kind === 'skill' ? `/${it.name}` : it.name) : slug;
                  return (
                    <Link
                      key={slug}
                      to={`/explore/${slug}`}
                      className="text-xs font-mono bg-gray-900 border border-gray-700 hover:border-teal-500/50 hover:text-teal-300 text-gray-300 rounded px-2 py-1 transition-colors"
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
