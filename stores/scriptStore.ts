// Global script preference + interface language.
// PRD §6.2: persisted via AsyncStorage.

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ScriptPref, LangPref } from '../types';

interface ScriptState {
  scriptPref: ScriptPref;
  langPref: LangPref;
  setScript: (s: ScriptPref) => void;
  setLang: (l: LangPref) => void;
}

export const useScriptStore = create<ScriptState>()(
  persist(
    (set) => ({
      scriptPref: 'latin',
      langPref: 'ar',
      setScript: (scriptPref) => set({ scriptPref }),
      setLang: (langPref) => set({ langPref }),
    }),
    { name: 'essi:script', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
