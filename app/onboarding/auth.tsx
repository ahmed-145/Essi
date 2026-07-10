// Screen 8 — Account Creation.
// PRD §8 Feature 1 edge cases:
//   ✓ Duplicate registration → friendly "log in instead" prompt
//   ✓ Connection lost → retry prompt, no data loss
//   ✓ Email works without any external OAuth setup

import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { EssiButton } from '../../components/EssiButton';
import { colors } from '../../lib/colors';
import { signUpWithEmail, signInWithEmail, ensureUserProfile } from '../../lib/api';
import { useUserStore } from '../../stores/userStore';

type AuthError = 'duplicate' | 'network' | 'invalid_credentials' | 'generic' | null;

function parseError(msg: string): AuthError {
  const m = msg.toLowerCase();
  if (m.includes('already registered') || m.includes('user already exists')) return 'duplicate';
  if (m.includes('network') || m.includes('fetch') || m.includes('timeout') || m.includes('unable to connect')) return 'network';
  if (m.includes('invalid login') || m.includes('invalid credentials') || m.includes('wrong password')) return 'invalid_credentials';
  return 'generic';
}

export default function Auth() {
  const r = useRouter();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [errorKind, setErrorKind] = useState<AuthError>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const localProfile = useUserStore((s) => s.profile);
  const patchLocalProfile = useUserStore((s) => s.patch);

  const attemptAuth = async () => {
    if (!email.trim() || !password) {
      setErrorKind('generic');
      setErrorMsg('Enter your email and a password.');
      return;
    }
    setBusy(true);
    setErrorKind(null);
    setErrorMsg(null);
    try {
      const { user } = mode === 'signup'
        ? await signUpWithEmail(email.trim(), password)
        : await signInWithEmail(email.trim(), password);
      
      if (user) {
        // Hydrate local store with user details
        patchLocalProfile({ id: user.id });
        await ensureUserProfile(
          user.id,
          'email',
          localProfile?.motivation || 'casual',
          localProfile?.daily_goal_minutes || 10
        );
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      r.replace('/(tabs)/home');
    } catch (e: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      const kind = parseError(e?.message ?? '');
      setErrorKind(kind);
      setErrorMsg(e?.message ?? 'Something went wrong — try again.');
    } finally {
      setBusy(false);
    }
  };

  const switchToLogin = () => {
    setMode('signin');
    setErrorKind(null);
    setErrorMsg(null);
  };

  const retry = () => {
    setErrorKind(null);
    setErrorMsg(null);
    attemptAuth();
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

        {/* Email input */}
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="rgba(245,240,232,0.4)"
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          style={{
            backgroundColor: 'rgba(245,240,232,0.08)', borderRadius: 14,
            paddingHorizontal: 16, paddingVertical: 14, color: colors.lime,
            fontFamily: 'Inter-Medium', fontSize: 15, marginBottom: 10,
            borderWidth: 1, borderColor: 'rgba(245,240,232,0.15)',
          }}
        />

        {/* Password input */}
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

        {/* Contextual error messages */}
        {errorKind === 'duplicate' && (
          <View style={{ backgroundColor: 'rgba(245,240,232,0.06)', borderRadius: 12, padding: 14, marginTop: 8 }}>
            <Text style={{ color: colors.ochre, fontSize: 14, fontFamily: 'Inter-Bold', marginBottom: 4 }}>
              This email is already registered.
            </Text>
            <Text style={{ color: colors.lime, fontSize: 13, opacity: 0.8, marginBottom: 10 }}>
              Looks like you already have an Essi account. Log in to continue watering your roots.
            </Text>
            <Pressable onPress={switchToLogin}>
              <Text style={{ color: colors.nile, fontFamily: 'Inter-Bold', fontSize: 13 }}>
                → Log in instead
              </Text>
            </Pressable>
          </View>
        )}

        {errorKind === 'network' && (
          <View style={{ backgroundColor: 'rgba(245,240,232,0.06)', borderRadius: 12, padding: 14, marginTop: 8 }}>
            <Text style={{ color: colors.ochre, fontSize: 14, fontFamily: 'Inter-Bold', marginBottom: 4 }}>
              Connection lost
            </Text>
            <Text style={{ color: colors.lime, fontSize: 13, opacity: 0.8, marginBottom: 10 }}>
              Check your network and try again. Your details are saved here.
            </Text>
            <Pressable onPress={retry}>
              <Text style={{ color: colors.nile, fontFamily: 'Inter-Bold', fontSize: 13 }}>
                ↺ Retry
              </Text>
            </Pressable>
          </View>
        )}

        {errorKind === 'invalid_credentials' && (
          <View style={{ backgroundColor: 'rgba(245,240,232,0.06)', borderRadius: 12, padding: 14, marginTop: 8 }}>
            <Text style={{ color: colors.terra, fontSize: 14, fontFamily: 'Inter-Bold', marginBottom: 4 }}>
              Incorrect email or password.
            </Text>
            <Text style={{ color: colors.lime, fontSize: 13, opacity: 0.8 }}>
              Double-check and try again.
            </Text>
          </View>
        )}

        {errorKind === 'generic' && errorMsg && (
          <Text style={{ color: colors.terra, fontSize: 13, marginTop: 8 }}>
            {errorMsg}
          </Text>
        )}

        {/* Submit */}
        <View style={{ marginTop: 18 }}>
          {busy ? (
            <ActivityIndicator color={colors.lime} />
          ) : (
            <EssiButton
              title={mode === 'signup' ? 'Create account' : 'Log in'}
              variant="ink"
              style={{ borderColor: 'rgba(245,240,232,0.2)', borderWidth: 1.5 }}
              onPress={attemptAuth}
            />
          )}
        </View>

        <EssiButton
          title={mode === 'signup' ? 'Already have an account? Log in' : 'New here? Create an account'}
          variant="ghostLime"
          size="sm"
          style={{ marginTop: 12 }}
          onPress={switchToLogin}
        />

        {/* Google / Apple placeholders */}
        <View style={{ marginTop: 28, opacity: 0.38 }}>
          <Text style={{ color: colors.lime, fontSize: 11, textAlign: 'center' }}>
            Google and Apple sign-in are coming soon —{'\n'}email works today.
          </Text>
        </View>
      </View>
    </View>
  );
}
