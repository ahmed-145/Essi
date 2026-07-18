// PRD §8 Feature 2 — Exercise Type 3 · Suffix Snapping
//
// Full drag-to-snap implementation:
//   ✓ Noun root displayed large
//   ✓ Horizontal scrollable suffix drawer (-ti, -gi, -ji, -ki, -we:r, -be:r, distractors)
//   ✓ User drags suffix onto root
//   ✓ Correct: snap animation — suffix visually concatenates to root
//     with morpheme-boundary join highlight
//   ✓ Complete inflected form shown post-snap with suffix highlighted
//   ✓ Haptics on correct/incorrect

import React, { useCallback, useRef, useState } from 'react';
import { View, Text, ScrollView, LayoutRectangle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSpring, withTiming, withSequence, withDelay,
  runOnJS, Easing,
} from 'react-native-reanimated';
import { EssiButton } from '../EssiButton';
import { colors } from '../../lib/colors';
import type { SuffixSnapExercise as Ex } from '../../types';
import { lexById } from '../../data/lexicon';
import { ruleById } from '../../data/morphology-rules';

interface Props { exercise: Ex; onAnswer: (isCorrect: boolean, wrongRuleId?: string) => void; bottomInset?: number; }

// ── Snap-target slot measurement ──────────────────────────────────────────────
function zoneHit(zone: LayoutRectangle | null, px: number, py: number): boolean {
  if (!zone) return false;
  return px >= zone.x && px <= zone.x + zone.width && py >= zone.y && py <= zone.y + zone.height;
}

// ── Draggable suffix chip ─────────────────────────────────────────────────────
function SuffixChip({
  ruleId, selected, onDrop, onPickUp,
}: {
  ruleId: string;
  selected: boolean;
  onDrop: (ruleId: string, ax: number, ay: number) => void;
  onPickUp: () => void;
}) {
  const rule = ruleById[ruleId];
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const scale = useSharedValue(1);
  const originX = useRef(0);
  const originY = useRef(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      scale.value = withSpring(1.12, { damping: 12, stiffness: 280 });
      runOnJS(onPickUp)();
    })
    .onChange((e) => {
      'worklet';
      tx.value = e.translationX;
      ty.value = e.translationY;
    })
    .onEnd((e) => {
      'worklet';
      const dropX = originX.current + e.translationX + 30;
      const dropY = originY.current + e.translationY + 18;
      scale.value = withSpring(1, { damping: 14, stiffness: 280 });
      tx.value = withSpring(0, { damping: 14 });
      ty.value = withSpring(0, { damping: 14 });
      runOnJS(onDrop)(ruleId, dropX, dropY);
    });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: scale.value }],
    zIndex: scale.value > 1.05 ? 999 : 1,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[style, { marginHorizontal: 5 }]}
        onLayout={(e) => {
          e.target.measure((_x, _y, _w, _h, px, py) => {
            originX.current = px;
            originY.current = py;
          });
        }}
      >
        <View style={{
          backgroundColor: selected ? colors.terra : '#fff',
          paddingVertical: 14, paddingHorizontal: 16, borderRadius: 16, minWidth: 80,
          alignItems: 'center',
          borderWidth: selected ? 0 : 1.5,
          borderColor: colors.hairline,
          elevation: 2,
          shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3,
        }}>
          <Text style={{
            fontFamily: 'JetBrainsMono', fontSize: 20,
            color: selected ? colors.lime : colors.ink, fontWeight: '700',
          }}>
            {rule?.suffix ?? ruleId}
          </Text>
          <Text style={{
            fontSize: 9, color: selected ? colors.lime : colors.ink3,
            marginTop: 3, opacity: 0.85,
            textAlign: 'center', maxWidth: 80,
          }}>
            {rule?.phonological_condition.split(' ').slice(0, 3).join(' ')}
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

// ── Snap result display ───────────────────────────────────────────────────────
function SnapResult({ root, suffix, correct }: { root: string; suffix: string; correct: boolean }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  React.useEffect(() => {
    opacity.value = withDelay(80, withTiming(1, { duration: 260, easing: Easing.out(Easing.ease) }));
    translateY.value = withDelay(80, withSpring(0, { damping: 14 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }, style]}>
      <View style={{
        backgroundColor: colors.nile, borderRadius: 14,
        paddingVertical: 16, paddingHorizontal: 22, alignItems: 'center',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'NotoSansCoptic', fontSize: 28, color: colors.lime }}>{root}</Text>
          {/* Morpheme boundary highlight */}
          <View style={{ width: 2, height: 28, backgroundColor: colors.ochre, marginHorizontal: 4, borderRadius: 1 }} />
          <View style={{
            backgroundColor: correct ? colors.ochre : 'rgba(255,100,100,0.8)',
            borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4,
          }}>
            <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 22, color: colors.nileDeep, fontWeight: '700' }}>
              {suffix}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 11, color: colors.lime, opacity: 0.75, marginTop: 6, letterSpacing: 1 }}>
          {correct ? '✓ morpheme boundary' : '✗ try another'}
        </Text>
      </View>
    </Animated.View>
  );
}

// ── Root component ────────────────────────────────────────────────────────────
export function SuffixSnapExercise({ exercise, onAnswer, bottomInset = 0 }: Props) {
  const root = lexById[exercise.root_lexeme_id];

  // All rule IDs shown in the drawer (correct + distractors), shuffled
  const [drawerRules] = useState(() =>
    [exercise.correct_suffix_rule_id, ...exercise.distractor_suffix_rule_ids]
      .sort(() => Math.random() - 0.5),
  );

  const [snapped, setSnapped] = useState<string | null>(null);         // rule ID snapped into slot
  const [showResult, setShowResult] = useState(false);

  // Snap-target zone (the dashed suffix slot next to the root block)
  const snapZone = useRef<LayoutRectangle | null>(null);

  const handleDrop = useCallback((ruleId: string, ax: number, ay: number) => {
    if (snapped) return; // already snapped — ignore subsequent drags
    if (zoneHit(snapZone.current, ax, ay)) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setSnapped(ruleId);
      setShowResult(true);
    }
    // If missed the zone, the chip springs back via its own Reanimated state
  }, [snapped]);

  const handlePickUp = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const clearSnap = () => {
    setSnapped(null);
    setShowResult(false);
  };

  const submit = () => {
    if (!snapped) return;
    const correct = snapped === exercise.correct_suffix_rule_id;
    Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
    );
    onAnswer(correct, correct ? undefined : snapped);
  };

  const snappedRule = snapped ? ruleById[snapped] : null;

  return (
    <View style={{ flex: 1 }}>
      {/* Section header */}
      <View style={{ padding: 22, paddingBottom: 4 }}>
        <Text style={{ fontSize: 12, letterSpacing: 2, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginBottom: 6 }}>
          Suffix snap
        </Text>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.ink }}>
          Make &ldquo;{root?.translation_en}&rdquo; the direct object. Drag the right suffix onto the root.
        </Text>
      </View>

      {/* Root block + snap-target zone */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, paddingTop: 22, paddingHorizontal: 22 }}>
        {/* Noun root */}
        <View style={{
          backgroundColor: colors.nile, borderRadius: 18,
          paddingVertical: 20, paddingHorizontal: 28, alignItems: 'center', minWidth: 100,
        }}>
          <Text style={{ fontFamily: 'NotoSansCoptic', fontSize: 36, color: colors.lime, lineHeight: 38 }}>
            {root?.old_nubian ?? root?.latin ?? '?'}
          </Text>
          <Text style={{ fontSize: 11, color: colors.lime, opacity: 0.8, letterSpacing: 1.8, marginTop: 4, fontFamily: 'Inter-Medium' }}>
            {root?.latin}
          </Text>
        </View>

        <Text style={{ fontSize: 26, color: colors.ink3 }}>+</Text>

        {/* Snap-target zone */}
        <View
          onLayout={(e) => {
            e.target.measure((_x, _y, w, h, px, py) => {
              snapZone.current = { x: px, y: py, width: w, height: h };
            });
          }}
          style={{
            borderWidth: 2.5,
            borderStyle: snapped ? 'solid' : 'dashed',
            borderColor: snapped ? (snapped === exercise.correct_suffix_rule_id ? colors.nile : colors.terra) : colors.terra,
            borderRadius: 16, paddingVertical: 18, paddingHorizontal: 22, minWidth: 84, minHeight: 70,
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: snapped ? 'rgba(27,75,118,0.08)' : 'rgba(194,82,45,0.05)',
          }}
        >
          {snapped ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 24, color: colors.terra, fontWeight: '700' }}>
                {snappedRule?.suffix}
              </Text>
              {/* Tap to remove */}
              <Text
                onPress={clearSnap}
                style={{ fontSize: 10, color: colors.ink4, marginTop: 4 }}
              >
                tap to remove ×
              </Text>
            </View>
          ) : (
            <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 26, color: colors.terra, fontWeight: '700' }}>?</Text>
          )}
        </View>
      </View>

      {/* Snap result: concatenated form with morpheme boundary highlight */}
      {showResult && snappedRule && root && (
        <SnapResult
          root={root.latin}
          suffix={snappedRule.suffix}
          correct={snapped === exercise.correct_suffix_rule_id}
        />
      )}

      {/* Suffix drawer */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 11, color: colors.ink3, letterSpacing: 1.8, fontFamily: 'Inter-Bold', marginBottom: 8 }}>
          SUFFIX DRAWER — drag onto the slot
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: 8 }}
        >
          {drawerRules.map((rId) => (
            <SuffixChip
              key={rId}
              ruleId={rId}
              selected={snapped === rId}
              onDrop={handleDrop}
              onPickUp={handlePickUp}
            />
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ padding: 18, paddingBottom: Math.max(14, bottomInset + 14) }}>
        <EssiButton title="Apply suffix" onPress={submit} disabled={!snapped} />
      </View>
    </View>
  );
}
