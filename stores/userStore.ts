import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile } from '../types';

interface UserState {
  profile: UserProfile | null;
  hydrated: boolean;
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

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      hydrated: false,
      setProfile: (profile) => set({ profile, hydrated: true }),
      patch: (p) => {
        const cur = get().profile ?? DEFAULT_PROFILE;
        set({ profile: { ...cur, ...p } });
      },
      bumpXp: (n) => {
        const cur = get().profile ?? DEFAULT_PROFILE;
        set({ profile: { ...cur, xp: cur.xp + n } });
      },
      incrementStreak: () => {
        const cur = get().profile ?? DEFAULT_PROFILE;
        set({ profile: { ...cur, streak: cur.streak + 1 } });
      },
      reset: () => set({ profile: null }),
    }),
    { name: 'essi:user', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
