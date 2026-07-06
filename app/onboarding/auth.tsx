// Screen 8 — Account Creation. PRD §7: "Save your progress. Protect your
// streak." Platform-aware ordering (Apple first iOS / Google first Android)
// is deferred — Apple needs the paid Developer Program (not set up yet),
// and Google needs its own external OAuth setup (flagged below). Email
// works with zero extra setup, so it's the only fully-live path right now.

import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { EssiButton } from '../../components/EssiButton';
import { colors } from '../../lib/colors';
import { signUpWithEmail, signInWithEmail, ensureUserProfile } from '../../lib/api';

export default function Auth() {
  const r = useRouter();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!email || !password) {
      setError('Enter an email and password.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { user } = mode === 'signup'
        ? await signUpWithEmail(email, password)
        : await signInWithEmail(email, password);
      if (user) await ensureUserProfile(user.id, 'email');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      r.replace('/(tabs)/home');
    } catch (e: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setError(e?.message ?? 'Something went wrong — try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.ink, paddingTop: insets.top }}>
      <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 24, color: colors.lime, marginBottom: 6 }}>
          احفظ تقدمك. حمي ستريكك.
        </Text>
        <Text style={{ fontSize: 15, color: colors.lime, opacity: 0.85, marginBottom: 4 }}>
          Save your progress. Protect your streak.
        </Text>
        <Text style={{ fontSize: 13, color: colors.lime, opacity: 0.6, marginBottom: 28 }}>
          We won't punish you for missing a day — but we'll help you keep watering your roots.
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="rgba(245,240,232,0.4)"
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            backgroundColor: 'rgba(245,240,232,0.08)', borderRadius: 14,
            paddingHorizontal: 16, paddingVertical: 14, color: colors.lime,
            fontFamily: 'Inter-Medium', fontSize: 15, marginBottom: 10,
            borderWidth: 1, borderColor: 'rgba(245,240,232,0.15)',
          }}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="rgba(245,240,232,0.4)"
          secureTextEntry
          style={{
            backgroundColor: 'rgba(245,240,232,0.08)', borderRadius: 14,
            paddingHorizontal: 16, paddingVertical: 14, color: colors.lime,
            fontFamily: 'Inter-Medium', fontSize: 15, marginBottom: 6,
            borderWidth: 1, borderColor: 'rgba(245,240,232,0.15)',
          }}
        />

        {error && (
          <Text style={{ color: colors.terra, fontSize: 13, marginTop: 6, marginBottom: 6 }}>{error}</Text>
        )}

        <View style={{ marginTop: 16 }}>
          {busy ? (
            <ActivityIndicator color={colors.lime} />
          ) : (
            <EssiButton
              title={mode === 'signup' ? 'Create account' : 'Log in'}
              variant="ink"
              onPress={submit}
            />
          )}
        </View>

        <EssiButton
          title={mode === 'signup' ? 'Already have an account? Log in' : "New here? Create an account"}
          variant="ghostLime"
          size="sm"
          style={{ marginTop: 12 }}
          onPress={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
        />

        {/* Google/Apple deliberately not wired yet — see file header comment. */}
        <View style={{ marginTop: 28, opacity: 0.4 }}>
          <Text style={{ color: colors.lime, fontSize: 11, textAlign: 'center' }}>
            Google and Apple sign-in are coming soon — email works today.
          </Text>
        </View>
      </View>
    </View>
  );
}
