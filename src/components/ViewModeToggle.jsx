import React from 'react';
import { User, Terminal } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';

/**
 * Operator | Technical segmented toggle. Flips all Explore copy between the
 * plain "what it does for you" framing and the technical (flags/paths/deps) one.
 */
export default function ViewModeToggle({ className = '' }) {
  const { mode, setMode } = useViewMode();
  const opts = [
    { key: 'operator', label: 'Operator', icon: User },
    { key: 'technical', label: 'Technical', icon: Terminal },
  ];
  return (
    <div className={`inline-flex items-center rounded-lg border border-gray-700 bg-gray-900 p-0.5 ${className}`} role="group" aria-label="View mode">
      {opts.map(({ key, label, icon: Icon }) => {
        const active = mode === key;
        return (
          <button
            key={key}
            onClick={() => setMode(key)}
            aria-pressed={active}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              active ? 'bg-teal-500/20 text-teal-300' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
