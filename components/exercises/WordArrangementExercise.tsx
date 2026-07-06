// PRD §8 Feature 2 — Exercise Type 2 (SOV builder)
// Tap-to-place version. Real drag-and-drop is a later polish using
// react-native-gesture-handler + Reanimated.

import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { EssiButton } from '../EssiButton';
import { colors } from '../../lib/colors';
import type { WordArrangeExercise as Ex } from '../../types';

const ROLE_COLOR: Record<'S' | 'O' | 'V', string> = {
  S: colors.nile, O: colors.palm, V: colors.terra,
};
const ROLE_LABEL: Record<'S' | 'O' | 'V', string> = {
  S: 'subject', O: 'object', V: 'verb',
};

interface Props { exercise: Ex; onAnswer: (isCorrect: boolean) => void; }

export function WordArrangementExercise({ exercise, onAnswer }: Props) {
  const [placed, setPlaced] = useState<Array<typeof exercise.solution[number] | null>>([null, null, null]);
  const [bank, setBank] = useState([...exercise.solution].sort(() => Math.random() - 0.5));

  const placeNext = (b: typeof exercise.solution[number]) => {
    const idx = placed.findIndex((x) => x === null);
    if (idx === -1) return;
    Haptics.selectionAsync();
    setPlaced(placed.map((p, i) => (i === idx ? b : p)));
    setBank(bank.filter((x) => x !== b));
  };

  const reset = (i: number) => {
    const b = placed[i];
    if (!b) return;
    setPlaced(placed.map((p, j) => (j === i ? null : p)));
    setBank([...bank, b]);
  };

  const submit = () => {
    if (placed.some((p) => p === null)) return;
    const correct = placed.every((p, i) => p && p.role === exercise.solution[i].role);
    Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
    );
    onAnswer(correct);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 22, paddingBottom: 4 }}>
        <Text style={{ fontSize: 12, letterSpacing: 2, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginBottom: 6 }}>
          Arrange · SOV
        </Text>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.ink }}>
          {exercise.prompt_en}
        </Text>
        <Text style={{ fontFamily: 'Cairo', fontSize: 14, color: colors.ink3, marginTop: 4 }}>
          {exercise.prompt_ar}
        </Text>
      </View>

      {/* Drop slots */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 18, paddingTop: 22, gap: 10 }}>
        {placed.map((p, i) => {
          const role = exercise.solution[i].role; // expected role
          if (p) {
            return (
              <Pressable
                key={i}
                onPress={() => reset(i)}
                style={{
                  flex: 1, minHeight: 84, borderRadius: 14, backgroundColor: ROLE_COLOR[p.role],
                  alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6,
                }}
              >
                <Text style={{ fontFamily: 'SawardaNubian', fontSize: 24, color: colors.lime }}>{p.surface}</Text>
                <Text style={{ fontSize: 10, color: colors.lime, opacity: 0.85, letterSpacing: 1.2, marginTop: 2 }}>
                  {ROLE_LABEL[p.role].toUpperCase()}
                </Text>
              </Pressable>
            );
          }
          return (
            <View
              key={i}
              style={{
                flex: 1, minHeight: 84, borderRadius: 14, borderWidth: 2, borderStyle: 'dashed', borderColor: colors.hairline,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 11, color: colors.ink4, letterSpacing: 1.8, fontFamily: 'Inter-Bold' }}>
                {ROLE_LABEL[role].toUpperCase()}
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 11, color: colors.terra, fontStyle: 'italic' }}>
        ↑ Verb belongs at the end in Mattokki (SOV)
      </Text>

      {/* Bank */}
      <View style={{ padding: 18, paddingTop: 16 }}>
        <View style={{
          padding: 14, borderRadius: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.hairline,
          flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', minHeight: 80,
        }}>
          {bank.map((b, i) => (
            <Pressable
              key={i}
              onPress={() => placeNext(b)}
              style={{
                backgroundColor: ROLE_COLOR[b.role],
                paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, minWidth: 86, alignItems: 'center',
              }}
            >
              <Text style={{ fontFamily: 'SawardaNubian', fontSize: 22, color: colors.lime }}>{b.surface}</Text>
              <Text style={{ fontSize: 10, color: colors.lime, opacity: 0.85, letterSpacing: 1.2, marginTop: 2 }}>
                {ROLE_LABEL[b.role].toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ padding: 18, paddingBottom: 14 }}>
        <EssiButton title="Check the sentence" onPress={submit} disabled={placed.some((p) => p === null)} />
      </View>
    </View>
  );
}
