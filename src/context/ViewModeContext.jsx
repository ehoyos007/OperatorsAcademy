import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * ViewMode — global Operator | Technical framing toggle for the Explore catalog.
 * Persists per-visitor in localStorage. Defaults to 'operator' (the wedge audience).
 */
const ViewModeContext = createContext({ mode: 'operator', setMode: () => {}, toggle: () => {} });

const KEY = 'oa:viewmode';

export function ViewModeProvider({ children }) {
  const [mode, setModeState] = useState('operator');

  // hydrate from localStorage after mount (SSR/prerender-safe)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'operator' || saved === 'technical') setModeState(saved);
    } catch { /* ignore */ }
  }, []);

  const setMode = useCallback((m) => {
    setModeState(m);
    try { localStorage.setItem(KEY, m); } catch { /* ignore */ }
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => {
      const next = prev === 'operator' ? 'technical' : 'operator';
      try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  return (
    <ViewModeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
