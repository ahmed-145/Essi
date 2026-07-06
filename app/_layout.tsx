// Root layout — fonts, audio init, splash, Reanimated, Stack navigator.

import 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import { PostHogProvider } from 'posthog-react-native';
import { fontMap } from '../lib/fonts';
import { initAudio } from '../lib/audio';
import { configureChannelsAndroid } from '../lib/notifications';
import { supabase } from '../lib/api';
import { useAuthStore } from '../stores/authStore';

SplashScreen.preventAutoHideAsync().catch(() => {});

// PRD §21 Phase 0 — error monitoring. No-ops harmlessly if the DSN isn't
// set (e.g. a contributor's local .env without it), so this never blocks
// running the app without Sentry configured.
const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN;
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    sendDefaultPii: false, // no PII by default — §14/§13.3 consent framework governs what we log
  });
}

function RootLayout() {
  const [loaded] = useFonts(fontMap);
  const setSession = useAuthStore((s) => s.setSession);
  const setChecked = useAuthStore((s) => s.setChecked);

  useEffect(() => {
    if (loaded) {
      initAudio();
      configureChannelsAndroid();
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // PRD §21 Phase 1 — auth session bootstrap. Runs once regardless of
  // whether Supabase is configured; with no client, `checked` still flips
  // to true (session stays null) so route guards don't hang forever.
  useEffect(() => {
    if (!supabase) {
      setChecked(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!loaded) return null;

  const content = (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="lesson/[id]" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="lesson/complete" options={{ animation: 'fade' }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );

  // PRD §21 Phase 0 — analytics. No-ops if the key isn't set, same pattern
  // as Sentry above, so the app runs fine without it configured.
  const POSTHOG_KEY = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
  if (!POSTHOG_KEY) return content;

  return (
    <PostHogProvider
      apiKey={POSTHOG_KEY}
      options={{ host: process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com' }}
      autocapture
    >
      {content}
    </PostHogProvider>
  );
}

export default Sentry.wrap(RootLayout);
