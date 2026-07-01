/**
 * guides.js — the Guides library registry.
 *
 * Auto-collects every guide module in src/guides/content/ via Vite's
 * import.meta.glob (eager), so adding a guide file registers it automatically —
 * no hand-maintained import list. UI imports `guides` / `getGuide` from here.
 */
const modules = import.meta.glob('../guides/content/*.js', { eager: true });

const DIFF_ORDER = { Beginner: 0, Concept: 1, Practical: 2, Advanced: 3 };

export const DIFFICULTIES = ['Beginner', 'Practical', 'Advanced', 'Concept'];

export const DIFFICULTY_STYLE = {
  Beginner: 'text-green-300 border-green-500/30 bg-green-500/10',
  Practical: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  Advanced: 'text-purple-300 border-purple-500/30 bg-purple-500/10',
  Concept: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
};

export const guides = Object.values(modules)
  .map((m) => m.default)
  .filter(Boolean)
  .sort(
    (a, b) =>
      (DIFF_ORDER[a.difficulty] ?? 9) - (DIFF_ORDER[b.difficulty] ?? 9) ||
      a.title.localeCompare(b.title),
  );

export function getGuide(slug) {
  return guides.find((g) => g.slug === slug) || null;
}
