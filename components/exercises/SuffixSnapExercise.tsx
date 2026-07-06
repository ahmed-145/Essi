// PRD §8 Feature 2 — Exercise Type 3
// User picks the correct allomorph for the root.
// Simplified to tap-to-pick (full drag-and-drop is a future polish).

import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { EssiButton } from '../EssiButton';
import { colors } from '../../lib/colors';
import type { SuffixSnapExercise as Ex } from '../../types';
import { lexById } from '../../data/lexicon';
import { ruleById } from '../../data/morphology-rules';

interface Props { exercise: Ex; onAnswer: (isCorrect: boolean, wrongRuleId?: string) => void; }

export function SuffixSnapExercise({ exercise, onAnswer }: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const root = lexById[exercise.root_lexeme_id];
  const suffixRules = [exercise.correct_suffix_rule_id, ...exercise.distractor_suffix_rule_ids].map((id) => ruleById[id]);

  const submit = () => {
    if (!picked) return;
    const correct = picked === exercise.correct_suffix_rule_id;
    Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
    );
    onAnswer(correct, correct ? undefined : picked);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 22, paddingBottom: 4 }}>
        <Text style={{ fontSize: 12, letterSpacing: 2, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginBottom: 6 }}>
          Suffix snap · Accusative
        </Text>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.ink }}>
          Make &ldquo;{root?.translation_en}&rdquo; the direct object.
        </Text>
      </View>

      {/* Root + slot */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingTop: 24 }}>
        <View style={{ backgroundColor: colors.nile, borderRadius: 16, paddingVertical: 18, paddingHorizontal: 26, alignItems: 'center', minWidth: 100 }}>
          <Text style={{ fontFamily: 'SawardaNubian', fontSize: 38, color: colors.lime, lineHeight: 38 }}>{root?.old_nubian}</Text>
          <Text style={{ fontSize: 11, color: colors.lime, opacity: 0.85, letterSpacing: 1.8, marginTop: 4, fontFamily: 'Inter-Medium' }}>
            {root?.latin}
          </Text>
        </View>
        <Text style={{ fontSize: 26, color: colors.ink3 }}>+</Text>
        <View style={{
          borderWidth: 2.5, borderStyle: 'dashed', borderColor: colors.terra,
          borderRadius: 16, paddingVertical: 18, paddingHorizontal: 22, minWidth: 84,
          alignItems: 'center', backgroundColor: 'rgba(194,82,45,0.05)',
        }}>
          <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 26, color: colors.terra, fontWeight: '700' }}>
            {picked ? ruleById[picked]?.suffix : '?'}
          </Text>
        </View>
      </View>

      {/* Drawer */}
      <Text style={{ textAlign: 'center', marginTop: 18, fontSize: 11, color: colors.ink3, letterSpacing: 1.8, fontFamily: 'Inter-Bold' }}>
        SUFFIX DRAWER
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, gap: 10 }}
      >
        {suffixRules.map((r) => {
          const sel = picked === r?.id;
          return (
            <Pressable
              key={r?.id}
              onPress={() => { Haptics.selectionAsync(); setPicked(r?.id ?? null); }}
            >
              <View style={{
                backgroundColor: sel ? colors.terra : '#fff',
                paddingVertical: 12, paddingHorizontal: 14, borderRadius: 14, minWidth: 78,
                alignItems: 'center', borderWidth: sel ? 0 : 1.5, borderColor: colors.hairline,
              }}>
                <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 18, color: sel ? colors.lime : colors.ink, fontWeight: '700' }}>
                  {r?.suffix}
                </Text>
                <Text style={{ fontSize: 9.5, color: sel ? colors.lime : colors.ink3, marginTop: 3, opacity: 0.85 }}>
                  {r?.phonological_condition.split(' ').slice(0, 2).join(' ')}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={{ flex: 1 }} />
      <View style={{ padding: 18, paddingBottom: 14 }}>
        <EssiButton title="Apply suffix" onPress={submit} disabled={!picked} />
      </View>
    </View>
  );
}
