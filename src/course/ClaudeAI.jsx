import React from 'react';
import { courseData, moduleRoutes } from './courseData';
import ContentRenderer from '../components/ContentRenderer';
import InstallBanner from '../components/InstallBanner';
import { useCourseProgress } from '../components/CourseLayout';

export default function ClaudeAI() {
  const moduleKey = 'module1';
  const module = courseData[moduleKey];
  const { completedSections, toggleComplete } = useCourseProgress();

  return (
    <div>
      {/* Module header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 text-teal-400 mb-2">
          {React.createElement(module.icon, { size: 24 })}
          <span className="text-sm uppercase tracking-wider">Module 1</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold">{module.title}</h2>
        {module.subtitle && (
          <p className="text-lg text-teal-400 mt-1">{module.subtitle}</p>
        )}

        {/* What you'll learn box */}
        <div className="mt-6 bg-teal-900/20 border border-teal-500/30 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-teal-400 mb-2">What you'll learn</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>- How to set up your Claude account</li>
            <li>- What to use Claude for (and when to switch to Claude Code)</li>
            <li>- How to write prompts that get better results</li>
          </ul>
        </div>
      </div>

      {/* Sections */}
      {module.sections.map((section, idx) => {
        const isComplete = completedSections[`${moduleKey}-${idx}`];
        return (
          <div key={idx} id={`section-${idx}`} className="mb-12 scroll-mt-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <button
                onClick={() => toggleComplete(moduleKey, idx)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors ${
                  isComplete
                    ? 'bg-teal-500/20 text-teal-400'
                    : 'bg-gray-800 text-gray-500 hover:text-gray-300'
                }`}
              >
                {isComplete ? '\u2713 Complete' : 'Mark complete'}
              </button>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-5 lg:p-8">
              <ContentRenderer
                content={section.content}
                analogy={section.analogy}
                tip={section.tip}
              />
              <InstallBanner banner={section.installBanner} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
