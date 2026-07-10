// PRD §8 Feature 2 — Exercise Type 1 · Audio Matching
// Feature 4 — Native Audio Playback
//
// AC checklist (Phase 2):
//   ✓ Audio plays within 500ms of mount
//   ✓ Tap-to-replay via speaker icon
//   ✓ Haptics on correct/incorrect
//   ✓ Wrong answer loops to end of queue (handled in [id].tsx)
//   ✓ Waveform animation shows playback even in noisy environments
//   ✓ CDN failure: error icon + log to Sentry + text-only fallback
//   ✓ Missing audio: graceful degradation, not a crash

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics'
import * as Sentry from '@sentry/react-native';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withRepeat, withTiming, withSequence, withDelay,
  cancelAnimation, Easing,
} from 'react-native-reanimated';
import { play } from '../../lib/audio';
import { Card } from '../Card';
import { EssiButton } from '../EssiButton';
import { colors } from '../../lib/colors';
import type { AudioMatchExercise } from '../../types';
import Svg, { Path } from 'react-native-svg';

interface Props {
  exercise: AudioMatchExercise;
  onAnswer: (isCorrect: boolean) => void;
}

// ── Speaker icon ──────────────────────────────────────────────────────────────
const SpeakerIcon = ({ color = colors.lime }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path d="M4 9 L4 15 L8 15 L13 19 L13 5 L8 9 Z" fill={color} />
    <Path d="M16 9 C 17.5 10 17.5 14 16 15" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
);

// ── Single animated waveform bar ──────────────────────────────────────────────
const BAR_HEIGHTS = [18, 28, 36, 24, 40, 20, 34, 28, 16];

function WaveformBar({ targetH, delay, playing }: { targetH: number; delay: number; playing: boolean }) {
  const h = useSharedValue(6);

  useEffect(() => {
    if (playing) {
      h.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(targetH,    { duration: 300 + delay, easing: Easing.inOut(Easing.ease) }),
            withTiming(targetH / 3, { duration: 300 + delay, easing: Easing.inOut(Easing.ease) }),
          ),
          -1,
          true,
        ),
      );
    } else {
      cancelAnimation(h);
      h.value = withTiming(6, { duration: 200 });
    }
    return () => cancelAnimation(h);
  }, [playing]);

  const style = useAnimatedStyle(() => ({ height: h.value }));

  return (
    <Animated.View
      style={[{ width: 4, borderRadius: 2, backgroundColor: colors.lime, opacity: 0.9 }, style]}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function AudioMatchingExercise({ exercise, onAnswer }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const playingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerPlay = async () => {
    if (!exercise.audio_url) {
      setAudioError(true);
      return;
    }
    try {
      setAudioError(false);
      setPlaying(true);
      await play(exercise.audio_url);
      // Approximate playback duration: clear playing state after ~3s max
      if (playingTimer.current) clearTimeout(playingTimer.current);
      playingTimer.current = setTimeout(() => setPlaying(false), 3200);
    } catch (err) {
      setPlaying(false);
      setAudioError(true);
      Sentry.captureException(err, {
        tags: { component: 'AudioMatchingExercise', exercise_id: exercise.id },
      });
    }
  };

  // Auto-play on mount (PRD AC: within 500ms)
  useEffect(() => {
    const t = setTimeout(() => { triggerPlay(); }, 120);
    return () => {
      clearTimeout(t);
      if (playingTimer.current) clearTimeout(playingTimer.current);
    };
  }, [exercise.audio_url]);

  const submit = () => {
    if (picked === null) return;
    const correct = exercise.options[picked].correct;
    Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
    );
    onAnswer(correct);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Section header */}
      <View style={{ padding: 22, paddingBottom: 4 }}>
        <Text style={{
          fontSize: 12, letterSpacing: 2, color: colors.terra, fontFamily: 'Inter-Bold',
          textTransform: 'uppercase', marginBottom: 6,
        }}>Listen</Text>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.ink, lineHeight: 26 }}>
          Tap the meaning you hear.
        </Text>
      </View>

      {/* Audio chip / error fallback */}
      <View style={{ paddingHorizontal: 22, paddingTop: 20, alignItems: 'center' }}>
        {audioError ? (
          // CDN failure fallback — text-only prompt (PRD §8 Feature 4 edge case)
          <View style={{
            backgroundColor: 'rgba(194,82,45,0.08)', borderRadius: 20,
            paddingHorizontal: 22, paddingVertical: 16, borderWidth: 1.5, borderColor: colors.terra,
            flexDirection: 'row', alignItems: 'center', gap: 12,
          }}>
            <Text style={{ fontSize: 22 }}>⚠️</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: 'Inter-Bold', fontSize: 13, color: colors.terra }}>
                Audio unavailable
              </Text>
              <Text style={{ fontSize: 12, color: colors.ink3, marginTop: 2 }}>
                Listening to the word. Tap the correct meaning below.
              </Text>
              <Pressable onPress={triggerPlay} style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 12, color: colors.nile, fontFamily: 'Inter-Bold' }}>Retry ↺</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable onPress={triggerPlay}>
            <View style={{
              backgroundColor: colors.nileDeep, borderRadius: 28,
              paddingHorizontal: 28, paddingVertical: 20,
              flexDirection: 'row', alignItems: 'center', gap: 18,
            }}>
              {/* Speaker button */}
              <View style={{
                width: 50, height: 50, borderRadius: 25,
                backgroundColor: colors.ochre, alignItems: 'center', justifyContent: 'center',
              }}>
                <SpeakerIcon color={colors.nileDeep} />
              </View>
              {/* Animated waveform */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 44 }}>
                {BAR_HEIGHTS.map((h, i) => (
                  <WaveformBar key={i} targetH={h} delay={i * 40} playing={playing} />
                ))}
              </View>
            </View>
          </Pressable>
        )}
      </View>

      {/* Options grid */}
      <View style={{ padding: 22, paddingTop: 22, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {exercise.options.map((o, i) => {
          const sel = picked === i;
          return (
            <Pressable
              key={i}
              onPress={() => { Haptics.selectionAsync(); setPicked(i); }}
              style={{ width: '48.5%' }}
            >
              <Card style={{
                paddingVertical: 20, paddingHorizontal: 14, alignItems: 'center',
                borderWidth: sel ? 2.5 : 1.5,
                borderColor: sel ? colors.nile : colors.hairline,
              }}>
                <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 22, color: colors.ink }}>{o.ar}</Text>
                <Text style={{ fontSize: 12.5, color: colors.ink3, marginTop: 4, fontFamily: 'Inter' }}>{o.en}</Text>
              </Card>
            </Pressable>
          );
        })}
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ padding: 18, paddingBottom: 14 }}>
        <EssiButton title="Check" onPress={submit} disabled={picked === null} />
      </View>
    </View>
  );
}
