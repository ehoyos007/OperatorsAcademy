import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, Clock } from 'lucide-react';
import { guides, DIFFICULTIES, DIFFICULTY_STYLE } from '../data/guides';
import { useDocumentMeta } from '../lib/seo';

/**
 * GuidesIndex — /guides. Standalone how-to library, filterable by difficulty.
 * Complements the linear course (course = the path; guides = the reference).
 */
export default function GuidesIndex() {
  const [params, setParams] = useSearchParams();
  const active = params.get('level') || '';

  useDocumentMeta(
    'Guides — Operators Academy',
    'Step-by-step guides for putting Claude Code to work: install, plan mode, CLAUDE.md, hooks, skills, agents, and the shipping workflow.',
  );

  const setLevel = (lvl) => {
    const next = new URLSearchParams(params);
    if (lvl && lvl !== active) next.set('level', lvl);
    else next.delete('level');
    setParams(next);
  };

  const shown = active ? guides.filter((g) => g.difficulty === active) : guides;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="text-teal-400" size={26} />
          <h1 className="text-3xl font-bold">Guides</h1>
        </div>
        <p className="text-sm text-gray-400 mb-6">
          Short, practical how-tos for getting the most out of Claude Code. The course is the path;
          these are the reference you reach for.
        </p>

        {/* Difficulty filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setLevel('')}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              !active ? 'text-white border-gray-500 bg-gray-800' : 'text-gray-400 border-gray-700 hover:text-gray-200'
            }`}
          >
            All ({guides.length})
          </button>
          {DIFFICULTIES.map((d) => {
            const n = guides.filter((g) => g.difficulty === d).length;
            if (!n) return null;
            return (
              <button
                key={d}
                onClick={() => setLevel(d)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  active === d ? DIFFICULTY_STYLE[d] : 'text-gray-400 border-gray-700 hover:text-gray-200'
                }`}
              >
                {d} ({n})
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {shown.map((g) => (
            <Link
              key={g.slug}
              to={`/guides/${g.slug}`}
              className="group block bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-xl p-4 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border ${DIFFICULTY_STYLE[g.difficulty] || ''}`}>
                  {g.difficulty}
                </span>
                <span className="ml-auto flex items-center gap-1 text-[11px] text-gray-500">
                  <Clock size={11} /> {g.readTime}
                </span>
              </div>
              <div className="font-semibold text-gray-100 group-hover:text-white mb-1">{g.title}</div>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{g.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
