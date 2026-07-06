// Local mirror of the ML-SRS state. Source of truth is the server, but we
// keep a local copy for offline practice and optimistic updates.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LexicalSrs, MorphologicalSrs, Exercise } from '../types';
import { updateSrsOnAnswer } from '../lib/srs';

interface SrsState {
  lex: Record<string, LexicalSrs>;
  rule: Record<string, MorphologicalSrs>;
  contrastiveFlags: Array<{ target: string; confused_with: string }>;
  hydrate: (lex: Record<string, LexicalSrs>, rule: Record<string, MorphologicalSrs>) => void;
  record: (exercise: Exercise, isCorrect: boolean, wrongRuleId?: string | null) => void;
}

export const useSrsStore = create<SrsState>()(
  persist(
    (set, get) => ({
      lex: {},
      rule: {},
      contrastiveFlags: [],
      hydrate: (lex, rule) => set({ lex, rule }),
      record: (exercise, isCorrect, wrongRuleId = null) => {
        const out = updateSrsOnAnswer({
          exercise, isCorrect, wrongRuleId,
          prevLex: get().lex, prevRule: get().rule,
        });
        set({
          lex: out.lex,
          rule: out.rule,
          contrastiveFlags: [...get().contrastiveFlags, ...out.contrastive_flags],
        });
      },
    }),
    { name: 'essi:srs', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
