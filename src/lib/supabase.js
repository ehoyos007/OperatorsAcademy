import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Guard: createClient throws on undefined args, which would crash the whole app
// (blank screen) at import time. If env is missing (local build without .env, or
// a misconfigured deploy), fall back to a harmless placeholder so the SPA still
// renders — auth/Supabase calls simply fail until real env values are set.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — auth features disabled until these are set.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'public-anon-key-placeholder'
);
