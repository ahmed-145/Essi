// PRD §8 Feature 2 — Exercise Type 2 · Word Arrangement (SOV builder)
//
// Full Gesture Handler drag-and-drop using react-native-gesture-handler v2
// + Reanimated v3. Each word block is independently draggable; drop zones
// measure themselves on layout and detect overlap by bounding-box comparison.
//
// PRD spec: "Blue (subject) / green (object) / orange (verb)"
// "If verb placed first, verb slot pulses gently — visual hint."
// "Touch drag confirmed working on both iOS and Android."
// "Validates on drop, not on submit."

import React, { useRef, useState, useCallback } from 'react';
import { View, Text, LayoutRectangle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSpring, withRepeat, withTiming, withSequence,
  runOnJS, cancelAnimation,
} from 'react-native-reanimated';
import { EssiButton } from '../EssiButton';
import { colors } from '../../lib/colors';
import type { WordArrangeExercise } from '../../types';

type Role = 'S' | 'O' | 'V';
type Solution = { role: Role; lexeme_id: string; surface: string };

const ROLE_COLOR: Record<Role, string> = {
  S: colors.nile,
  O: colors.palm,
  V: colors.terra,
};
const ROLE_LABEL: Record<Role, string> = {
  S: 'subject',
  O: 'object',
  V: 'verb',
};

interface Props { exercise: WordArrangeExercise; onAnswer: (isCorrect: boolean) => void; bottomInset?: number; }

type Slot = Solution | null;

interface BankItem {
  word: Solution;
  id: string;
}

// ── Drop-zone measurement ─────────────────────────────────────────────────────
function zoneHit(zone: LayoutRectangle | null, px: number, py: number): boolean {
  if (!zone) return false;
  return px >= zone.x && px <= zone.x + zone.width && py >= zone.y && py <= zone.y + zone.height;
}

// ── Draggable word block ──────────────────────────────────────────────────────
function DraggableBlock({
  word, color, onDropped, onPickUp,
}: {
  word: Solution;
  color: string;
  onDropped: (word: Solution, ax: number, ay: number) => void;
  onPickUp: () => void;
}) {
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(1);

  const originX = useRef(0);
  const originY = useRef(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      scale.value = withSpring(1.08, { damping: 14, stiffness: 300 });
      zIndex.value = 999;
      runOnJS(onPickUp)();
    })
    .onChange((e) => {
      'worklet';
      tx.value = e.translationX;
      ty.value = e.translationY;
    })
    .onEnd((e) => {
      'worklet';
      const dropX = originX.current + e.translationX + 40;
      const dropY = originY.current + e.translationY + 24;
      scale.value = withSpring(1, { damping: 14, stiffness: 300 });
      tx.value = withSpring(0);
      ty.value = withSpring(0);
      zIndex.value = 1;
      runOnJS(onDropped)(word, dropX, dropY);
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: scale.value },
    ],
    zIndex: zIndex.value,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[style, { marginHorizontal: 5, marginVertical: 4 }]}
        onLayout={(e) => {
          const { x, y } = e.nativeEvent.layout;
          originX.current = x;
          originY.current = y;
        }}
      >
        <View style={{
          backgroundColor: color,
          paddingVertical: 12, paddingHorizontal: 16, borderRadius: 14,
          minWidth: 80, alignItems: 'center', elevation: 3,
          shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4,
        }}>
          <Text style={{ fontFamily: 'NotoSansCoptic', fontSize: 20, color: colors.lime }}>{word.surface}</Text>
          <Text style={{ fontSize: 9, color: colors.lime, opacity: 0.85, letterSpacing: 1.4, marginTop: 2, fontFamily: 'Inter-Bold' }}>
            {ROLE_LABEL[word.role].toUpperCase()}
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

// ── Pulsing drop-zone ─────────────────────────────────────────────────────────
function DropZone({
  role, occupied, onLayout, onRemove, pulse,
}: {
  role: Role;
  occupied: Slot;
  onLayout: (e: any) => void;
  onRemove: () => void;
  pulse: boolean;
}) {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (pulse) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.06, { duration: 350 }),
          withTiming(1.0, { duration: 350 }),
        ),
        -1,
        false,
      );
    } else {
      cancelAnimation(scale);
      scale.value = withSpring(1, { damping: 14 });
    }
  }, [pulse]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const color = ROLE_COLOR[role];

  return (
    <Animated.View style={[{ flex: 1 }, containerStyle]} onLayout={onLayout}>
      {occupied ? (
        <Animated.View
          style={{
            minHeight: 88, borderRadius: 14, backgroundColor: color,
            alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6,
          }}
        >
          <Text
            onPress={() => { Haptics.selectionAsync(); onRemove(); }}
            style={{ fontFamily: 'NotoSansCoptic', fontSize: 22, color: colors.lime }}
          >
            {occupied.surface}
          </Text>
          <Text style={{ fontSize: 9, color: colors.lime, opacity: 0.85, letterSpacing: 1.2, marginTop: 2, fontFamily: 'Inter-Bold' }}>
            {ROLE_LABEL[occupied.role].toUpperCase()}
          </Text>
        </Animated.View>
      ) : (
        <View style={{
          minHeight: 88, borderRadius: 14, borderWidth: 2, borderStyle: 'dashed',
          borderColor: pulse ? colors.terra : colors.hairline,
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: pulse ? 'rgba(194,82,45,0.05)' : 'transparent',
        }}>
          <Text style={{ fontSize: 11, color: pulse ? colors.terra : colors.ink4, letterSpacing: 1.8, fontFamily: 'Inter-Bold' }}>
            {ROLE_LABEL[role].toUpperCase()}
          </Text>
          {role === 'V' && (
            <Text style={{ fontSize: 9, color: colors.ink4, marginTop: 2, opacity: 0.7 }}>← goes last</Text>
          )}
        </View>
      )}
    </Animated.View>
  );
}

// ── Root component ────────────────────────────────────────────────────────────
export function WordArrangementExercise({ exercise, onAnswer, bottomInset = 0 }: Props) {
  const [bank, setBank] = useState<BankItem[]>(() =>
    [...exercise.solution]
      .sort(() => Math.random() - 0.5)
      .map((w, i) => ({ word: w, id: `${w.lexeme_id}_${i}` })),
  );

  const [placed, setPlaced] = useState<Slot[]>([null, null, null]);

  const zoneLayouts = useRef<Array<LayoutRectangle | null>>([null, null, null]);

  const verbSlotNeedsHint =
    !placed[2] &&
    (placed[0]?.role === 'V' || placed[1]?.role === 'V');

  const handleDrop = useCallback((word: Solution, ax: number, ay: number) => {
    const roles: Role[] = ['S', 'O', 'V'];

    for (let i = 0; i < 3; i++) {
      const zone = zoneLayouts.current[i];
      if (zone && zoneHit(zone, ax, ay) && !placed[i]) {
        const newPlaced = [...placed];
        newPlaced[i] = word;
        setPlaced(newPlaced);
        setBank((b) => b.filter((bk) => bk.word.lexeme_id !== word.lexeme_id));

        if (word.role === 'V' && i !== 2) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        } else {
          Haptics.selectionAsync();
        }
        return;
      }
    }
  }, [placed]);

  const handlePickUp = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const removeFromSlot = useCallback((i: number) => {
    const word = placed[i];
    if (!word) return;
    const newPlaced = [...placed];
    newPlaced[i] = null;
    setPlaced(newPlaced);
    setBank((b) => [...b, { word, id: `${word.lexeme_id}_ret` }]);
  }, [placed]);

  const allFilled = placed.every((p) => p !== null);

  const submit = () => {
    if (!allFilled) return;
    const correct = placed.every((p, i) => p && p.role === exercise.solution[i].role);
    Haptics.notificationAsync(
      correct ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
    );
    onAnswer(correct);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Prompt */}
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

      <Text style={{ textAlign: 'center', marginTop: 8, fontSize: 11, color: colors.terra, fontStyle: 'italic' }}>
        Subject → Object → Verb (Mattokki SOV order)
      </Text>

      {/* Drop zones */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingTop: 16, gap: 10 }}>
        {(['S', 'O', 'V'] as Role[]).map((role, i) => (
          <DropZone
            key={role}
            role={role}
            occupied={placed[i]}
            pulse={role === 'V' && verbSlotNeedsHint}
            onLayout={(e) => {
              e.target.measure(
                (_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
                  zoneLayouts.current[i] = { x: pageX, y: pageY, width, height };
                },
              );
            }}
            onRemove={() => removeFromSlot(i)}
          />
        ))}
      </View>

      {/* Word bank */}
      <View style={{ padding: 18, paddingTop: 20 }}>
        <Text style={{ fontSize: 10, letterSpacing: 1.8, color: colors.ink3, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginBottom: 10 }}>
          Drag words to build the sentence
        </Text>
        <View style={{
          padding: 14, borderRadius: 18, backgroundColor: '#fff',
          borderWidth: 1, borderColor: colors.hairline,
          flexDirection: 'row', flexWrap: 'wrap', minHeight: 80,
        }}>
          {bank.map((item) => (
            <DraggableBlock
              key={item.id}
              word={item.word}
              color={ROLE_COLOR[item.word.role]}
              onDropped={handleDrop}
              onPickUp={handlePickUp}
            />
          ))}
          {bank.length === 0 && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 52 }}>
              <Text style={{ color: colors.ink4, fontSize: 12 }}>All words placed ✓</Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ flex: 1 }} />
      <View style={{ padding: 18, paddingBottom: Math.max(14, bottomInset + 14) }}>
        <EssiButton
          title="Check the sentence"
          onPress={submit}
          disabled={!allFilled}
        />
      </View>
    </View>
  );
}
