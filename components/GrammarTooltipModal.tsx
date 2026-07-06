// PRD §8 Feature 8 — Grammar Tooltips.
// AC: opens within 100ms, contains morpheme/role/plain-language rule/one
// example, closes on tap-outside or X, safe-area aware (no overlap with
// answer area on 320px min width).

import React from 'react';
import { Modal, Pressable, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ruleById } from '../data/morphology-rules';
import { colors } from '../lib/colors';

export function GrammarTooltipModal({ ruleId, onClose }: { ruleId: string | null; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const rule = ruleId ? ruleById[ruleId] : null;

  return (
    <Modal visible={!!rule} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{ flex: 1, backgroundColor: 'rgba(27,24,21,0.45)', justifyContent: 'flex-end' }}
      >
        {rule && (
          // Inner Pressable with no-op onPress absorbs taps so the modal
          // doesn't close when tapping the card itself, only the backdrop.
          <Pressable onPress={() => {}}>
            <View style={{
              backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
              padding: 22, paddingBottom: insets.bottom + 22,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 22, color: colors.terra, fontWeight: '700' }}>
                    {rule.suffix}
                  </Text>
                  <Text style={{ fontSize: 11, letterSpacing: 1.5, color: colors.ink3, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginTop: 4 }}>
                    {rule.family}
                  </Text>
                </View>
                <Pressable onPress={onClose} hitSlop={12}>
                  <Text style={{ fontSize: 22, color: colors.ink3 }}>×</Text>
                </Pressable>
              </View>

              <Text style={{ fontSize: 15, color: colors.ink, marginTop: 16, lineHeight: 22 }}>
                {rule.description_en}
              </Text>
              <Text style={{ fontSize: 15, color: colors.ink2, marginTop: 8, lineHeight: 24, textAlign: 'right' }}>
                {rule.description_ar}
              </Text>

              <View style={{ backgroundColor: colors.limeDeep, borderRadius: 14, padding: 14, marginTop: 16 }}>
                <Text style={{ fontSize: 11, letterSpacing: 1, color: colors.ink3, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginBottom: 4 }}>
                  Example
                </Text>
                <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 16, color: colors.ink }}>
                  {rule.example}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      </Pressable>
    </Modal>
  );
}
