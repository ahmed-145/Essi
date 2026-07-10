// Persists mid-lesson state so progress survives app close/reopen.
// PRD §8 Feature 2 edge case: "app closed mid-lesson → progress saved to
// AsyncStorage, synced on reopen."

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Exercise } from '../types';

interface LessonSession {
  lessonId: string;
  queue: Exercise[];       // remaining (including wrong-answer re-inserts)
  idx: number;
  correctCount: number;
  totalAnswered: number;
  startedAt: string;       // ISO — for time-in-session metrics
}

interface LessonProgressState {
  session: LessonSession | null;
  saveSession: (s: LessonSession) => void;
  clearSession: (lessonId: string) => void;
  clearAll: () => void;
}

export const useLessonProgressStore = create<LessonProgressState>()(
  persist(
    (set, get) => ({
      session: null,
      saveSession: (session) => set({ session }),
      clearSession: (lessonId) => {
        if (get().session?.lessonId === lessonId) set({ session: null });
      },
      clearAll: () => set({ session: null }),
    }),
    {
      name: 'essi:lesson-progress',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
