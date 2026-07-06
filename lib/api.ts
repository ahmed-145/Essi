// Supabase-shaped API client. Currently returns mocked data so the
// frontend runs end-to-end without a backend. Wire to real Supabase
// by setting EXPO_PUBLIC_SUPABASE_URL + EXPO_PUBLIC_SUPABASE_ANON_KEY.

import 'react-native-url-polyfill/auto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Lesson, UserProfile, LexicalSrs, MorphologicalSrs } from '../types';
import { lessons } from '../data/lessons';

const URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  URL && KEY ? createClient(URL, KEY) : null;

/** Fetch one lesson — mocked from local data if no Supabase. */
export async function getLesson(id: string): Promise<Lesson | null> {
  if (!supabase) return lessons.find((l) => l.id === id) ?? null;
  const { data } = await supabase.from('lessons').select('*').eq('id', id).single();
  return data as Lesson;
}

/** POST /api/progress — call after every answer. Server should run the
 * ML-SRS update on its side too for source-of-truth. */
export async function recordAnswer(input: {
  exercise_id: string;
  is_correct: boolean;
  wrong_rule_id?: string | null;
  ms_to_answer: number;
}) {
  if (!supabase) return { ok: true };
  return supabase.from('progress_events').insert(input);
}

export async function getUser(): Promise<UserProfile | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', data.user.id) // PRD §6.3 schema: user_profiles.user_id (not .id)
    .single();
  return profile as UserProfile;
}

// ─────────────────────────────────────────────────────────────────────────
// Auth — PRD §21 Phase 1. Email/password works out of the box (Supabase
// enables it by default). Google needs a Google Cloud OAuth client + the
// provider enabled in the Supabase dashboard first — signInWithGoogle()
// below is real code, but will error until that external setup is done.
// Apple Sign In is deliberately not implemented yet (needs the paid Apple
// Developer Program — see PRD §15.3/§6.6).
// ─────────────────────────────────────────────────────────────────────────

export async function signUpWithEmail(email: string, password: string) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/** Real code, but inert until Google Cloud OAuth + Supabase provider setup
 * exists (see comment above). Throws a clear error until then rather than
 * failing silently. */
export async function signInWithGoogle(idToken: string) {
  if (!supabase) throw new Error('Supabase not configured');
  const { data, error } = await supabase.auth.signInWithIdToken({ provider: 'google', token: idToken });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** On first login: create the user_profiles row if it doesn't exist yet.
 * PRD §21 Phase 1: streak=0, xp=0, script_preference='latin',
 * language_preference='ar'. (display_name/motivation/notification prefs are
 * Phase 5 concerns — tracked locally in userStore for now, not server-synced
 * until that phase.) */
export async function ensureUserProfile(userId: string, authProvider: string) {
  if (!supabase) return;
  const { data: existing } = await supabase
    .from('user_profiles')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle();
  if (existing) return;
  const { error } = await supabase.from('user_profiles').insert({
    user_id: userId,
    auth_provider: authProvider,
    streak: 0,
    xp: 0,
    script_preference: 'latin',
    language_preference: 'ar',
    daily_goal: 10,
  });
  if (error) throw error;
}

export async function getSrs(): Promise<{
  lex: Record<string, LexicalSrs>;
  rule: Record<string, MorphologicalSrs>;
}> {
  if (!supabase) return { lex: {}, rule: {} };
  const [{ data: lex }, { data: rule }] = await Promise.all([
    supabase.from('srs_lexical').select('*'),
    supabase.from('srs_morphology').select('*'),
  ]);
  return {
    lex: Object.fromEntries((lex ?? []).map((r: any) => [r.lexeme_id, r])),
    rule: Object.fromEntries((rule ?? []).map((r: any) => [r.rule_id, r])),
  };
}
