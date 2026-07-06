// PRD §8 Feature 2 — Exercise Type 1
// Audio plays automatically on mount. User taps the correct translation card.

import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
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

const Speaker = ({ color = colors.lime as string }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24">
    <Path d="M4 9 L4 15 L8 15 L13 19 L13 5 L8 9 Z" fill={color} />
    <Path d="M16 9 C 17.5 10 17.5 14 16 15" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
);

export function AudioMatchingExercise({ exercise, onAnswer }: Props) {
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    if (exercise.audio_url) play(exercise.audio_url).catch(() => {});
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
      <View style={{ padding: 22, paddingBottom: 4 }}>
        <Text style={{
          fontSize: 12, letterSpacing: 2, color: colors.terra, fontFamily: 'Inter-Bold',
          textTransform: 'uppercase', marginBottom: 6,
        }}>Listen</Text>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.ink, lineHeight: 26 }}>
          Tap the meaning you hear.
        </Text>
      </View>

      {/* Audio chip */}
      <View style={{ paddingHorizontal: 22, paddingTop: 20, alignItems: 'center' }}>
        <Pressable onPress={() => exercise.audio_url && play(exercise.audio_url)}>
          <View style={{
            backgroundColor: colors.nileDeep, borderRadius: 28,
            paddingHorizontal: 28, paddingVertical: 20,
            flexDirection: 'row', alignItems: 'center', gap: 18,
          }}>
            <View style={{
              width: 50, height: 50, borderRadius: 25,
              backgroundColor: colors.ochre, alignItems: 'center', justifyContent: 'center',
            }}>
              <Speaker color={colors.nileDeep} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 44 }}>
              {[18, 28, 36, 24, 40, 20, 34, 28, 16].map((h, i) => (
                <View key={i} style={{ width: 4, height: h, borderRadius: 2, backgroundColor: colors.lime, opacity: 0.85 }} />
              ))}
            </View>
          </View>
        </Pressable>
      </View>

      {/* Options */}
      <View style={{
        padding: 22, paddingTop: 22, flexDirection: 'row', flexWrap: 'wrap', gap: 10,
      }}>
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
