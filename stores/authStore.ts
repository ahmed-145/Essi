// Auth session state — separate from userStore (which holds profile data).
// PRD §21 Phase 1: "Protected routes — unauthenticated users see onboarding,
// not home."

import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  /** True once the initial getSession() check has resolved — until then we
   * don't know if the user is logged in, so routing guards should wait. */
  checked: boolean;
  setSession: (s: Session | null) => void;
  setChecked: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  checked: false,
  setSession: (session) => set({ session }),
  setChecked: (checked) => set({ checked }),
}));
