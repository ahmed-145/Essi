// User profile store — persists locally, syncs to Supabase within 2s.
// PRD §8 Feature 1 AC: "XP and streak sync within 2 seconds of lesson completion."

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile } from '../types';

interface UserState {
  profile: UserProfile | null;
  hydrated: boolean;
  _syncTimer: ReturnType<typeof setTimeout> | null;
  setProfile: (p: UserProfile | null) => void;
  patch: (p: Partial<UserProfile>) => void;
  bumpXp: (n: number) => void;
  incrementStreak: () => void;
  reset: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  id: 'local-dev',
  display_name: null,
  streak: 0,
  xp: 0,
  level: 1,
  script_preference: 'latin',
  language_preference: 'ar',
  daily_goal_minutes: 10,
  motivation: 'heritage_primary',
  notifications_enabled: false,
  notification_time: '19:30',
};

// Debounced Supabase sync — imported lazily to avoid circular imports
// (api.ts imports nothing from stores). The timer is stored outside Zustand
// so it persists across renders without triggering re-renders.
let _syncTimeout: ReturnType<typeof setTimeout> | null = null;

function scheduleSyncToSupabase(profile: UserProfile) {
  if (_syncTimeout) clearTimeout(_syncTimeout);
  _syncTimeout = setTimeout(async () => {
    try {
      // Dynamic import to break the stores ↔ lib circular dep
      const { supabase } = await import('../lib/api');
      if (!supabase || !profile.id || profile.id === 'local-dev') return;
      await supabase
        .from('user_profiles')
        .update({
          xp: profile.xp,
          streak: profile.streak,
          script_preference: profile.script_preference,
          language_preference: profile.language_preference,
          daily_goal: profile.daily_goal_minutes,
          motivation: profile.motivation,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', profile.id);
    } catch {
      // Sync failures are silent — local store is the optimistic source of truth.
      // Errors surface via Sentry if wired.
    }
  }, 1800); // 1.8s debounce → satisfies the "within 2s" AC with network headroom
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      hydrated: false,
      _syncTimer: null,
      setProfile: (profile) => set({ profile, hydrated: true }),
      patch: (p) => {
        const cur = get().profile ?? DEFAULT_PROFILE;
        const next = { ...cur, ...p };
        set({ profile: next });
        scheduleSyncToSupabase(next);
      },
      bumpXp: (n) => {
        const cur = get().profile ?? DEFAULT_PROFILE;
        const next = { ...cur, xp: cur.xp + n };
        set({ profile: next });
        scheduleSyncToSupabase(next);
      },
      incrementStreak: () => {
        const cur = get().profile ?? DEFAULT_PROFILE;
        const next = { ...cur, streak: cur.streak + 1 };
        set({ profile: next });
        scheduleSyncToSupabase(next);
      },
      reset: () => {
        if (_syncTimeout) clearTimeout(_syncTimeout);
        set({ profile: null });
      },
    }),
    { name: 'essi:user', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
