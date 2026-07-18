// PRD §8 Feature 2 — Exercise Type 4
// Mattokki phrase shown in current script. User picks correct translation.

import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Card } from '../Card';
import { EssiButton } from '../EssiButton';
import { AnimatedPressable } from '../AnimatedPressable';
import { colors } from '../../lib/colors';
import type { McqExercise } from '../../types';
import { useScriptStore } from '../../stores/scriptStore';

interface Props {
  exercise: McqExercise;
  onAnswer: (isCorrect: boolean) => void;
  onTooltipRequest: (ruleId: string) => void;
  bottomInset?: number;
}

export function MultipleChoiceExercise({ exercise, onAnswer, onTooltipRequest, bottomInset = 0 }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const script = useScriptStore((s) => s.scriptPref);

  const promptText =
    script === 'nubian' ? exercise.prompt_old_nubian :
    script === 'arabic' ? exercise.prompt_arabic_transliteration :
    exercise.prompt_mattokki;
  const promptFont =
    script === 'nubian' ? 'SawardaNubian' :
    script === 'arabic' ? 'Cairo-Bold' : 'Fraunces-SemiBold';

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
        <Text style={{ fontSize: 12, letterSpacing: 2, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginBottom: 6 }}>
          Choose the meaning
        </Text>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.ink }}>
          What does this sentence mean?
        </Text>
      </View>

      {/* Sentence panel */}
      <View style={{ paddingHorizontal: 22, paddingTop: 20 }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 22, paddingVertical: 22, paddingHorizontal: 18, borderWidth: 1, borderColor: colors.hairline }}>
          <Text style={{ fontFamily: promptFont, fontSize: 36, color: colors.ink, textAlign: 'center' }}>
            {promptText}
          </Text>
          {exercise.morpheme_highlights.length > 0 && (
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 }}>
              {exercise.morpheme_highlights.map((h, i) => (
                <Pressable key={i} onPress={() => onTooltipRequest(h.rule_id)}>
                  <View style={{ paddingVertical: 4, paddingHorizontal: 10, backgroundColor: colors.limeDeep, borderRadius: 999 }}>
                    <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 11, color: colors.terra, fontWeight: '700' }}>
                      tap {h.surface} ↗
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Options */}
      <View style={{ padding: 20, gap: 10 }}>
        {exercise.options.map((o, i) => {
          const sel = picked === i;
          return (
            <AnimatedPressable
              key={i}
              onPress={() => { Haptics.selectionAsync(); setPicked(i); }}
            >
              <Card style={{
                padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12,
                borderWidth: sel ? 2.5 : 1.5,
                borderColor: sel ? colors.nile : colors.hairline,
              }}>
                <View style={{
                  width: 26, height: 26, borderRadius: 13,
                  backgroundColor: sel ? colors.nile : 'transparent',
                  borderWidth: sel ? 0 : 1.5, borderColor: colors.hairline,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Text style={{ color: sel ? colors.lime : colors.ink3, fontFamily: 'Inter-Bold', fontSize: 11 }}>
                    {['A','B','C','D'][i]}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 16, color: colors.ink }}>{o.ar}</Text>
                  <Text style={{ fontSize: 12, color: colors.ink3, marginTop: 2 }}>{o.en}</Text>
                </View>
              </Card>
            </AnimatedPressable>
          );
        })}
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ padding: 18, paddingBottom: Math.max(14, bottomInset + 14) }}>
        <EssiButton title="Check" onPress={submit} disabled={picked === null} />
      </View>
    </View>
  );
}
