import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { getGuide, DIFFICULTY_STYLE } from '../data/guides';
import ContentRenderer from '../components/ContentRenderer';
import { useDocumentMeta } from '../lib/seo';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * GuideDetail — /guides/:slug. Long-form article with an auto "On this page" TOC
 * (from section headings) and a Next-steps block. Renders section bodies with the
 * course's ContentRenderer so guides share the course's markdown format.
 */
export default function GuideDetail() {
  const { slug } = useParams();
  const guide = getGuide(slug);

  useDocumentMeta(
    guide ? `${guide.title} — Operators Academy` : 'Guides — Operators Academy',
    guide ? guide.summary : '',
  );

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-3">No guide found for “{slug}”.</p>
          <Link to="/guides" className="text-teal-300 hover:text-teal-200">← Back to Guides</Link>
        </div>
      </div>
    );
  }

  const { title, difficulty, readTime, updated, summary, sections = [], nextSteps = [] } = guide;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Link to="/guides" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
          <ArrowLeft size={13} /> Guides
        </Link>

        {/* Header */}
        <div className="mt-4 mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border ${DIFFICULTY_STYLE[difficulty] || ''}`}>
              {difficulty}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-gray-500"><Clock size={11} /> {readTime}</span>
            {updated && <span className="flex items-center gap-1 text-[11px] text-gray-600"><Calendar size={11} /> Updated {formatDate(updated)}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
          <p className="text-gray-400">{summary}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* On this page */}
          {sections.length > 1 && (
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-20">
                <div className="text-[10px] uppercase tracking-wider text-gray-600 mb-2">On this page</div>
                <nav className="space-y-1.5 border-l border-gray-800 pl-3">
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="block text-xs text-gray-500 hover:text-teal-300 transition-colors">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Body */}
          <div className={sections.length > 1 ? 'lg:col-span-3 order-1 lg:order-2' : 'lg:col-span-4'}>
            <article className="space-y-10">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-20">
                  <h2 className="text-xl font-semibold mb-3">{s.title}</h2>
                  <ContentRenderer content={s.content} analogy={s.analogy} tip={s.tip} />
                </section>
              ))}
            </article>

            {/* Next steps */}
            {nextSteps.length > 0 && (
              <div className="mt-12 pt-6 border-t border-gray-800">
                <div className="text-sm font-semibold text-gray-300 mb-3">Next steps</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {nextSteps.map((n) => (
                    <Link key={n.to} to={n.to} className="flex items-center gap-2 text-sm text-teal-300 hover:text-teal-200 bg-gray-800/60 border border-gray-700 hover:border-teal-500/40 rounded-lg px-3 py-2 transition-colors">
                      <ArrowRight size={14} /> {n.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
