import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNav } from '../../components/BottomNav';
import { colors } from '../../lib/colors';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/api';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const session = useAuthStore((s) => s.session);
  const checked = useAuthStore((s) => s.checked);

  // PRD §21 Phase 1: "Protected routes — unauthenticated users see
  // onboarding, not home." Only enforced when Supabase is actually
  // configured — with no client, session is permanently null, and this
  // must NOT block the existing no-backend/mock-data dev mode the rest of
  // the app is built around (lib/api.ts falls back to local data when
  // `supabase` is null). Waits for the initial session check (`checked`)
  // before redirecting, so a real logged-in user isn't bounced during the
  // brief moment getSession() is still resolving.
  useEffect(() => {
    if (supabase && checked && !session) router.replace('/');
  }, [checked, session]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime }}>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <Slot />
      </View>
      <BottomNav />
      <View style={{ height: insets.bottom, backgroundColor: colors.lime }} />
    </View>
  );
}
