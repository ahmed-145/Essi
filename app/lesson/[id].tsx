// Lesson player — dispatches to the right exercise component per item.

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { lessonById } from '../../data/lessons';
import { AudioMatchingExercise } from '../../components/exercises/AudioMatchingExercise';
import { MultipleChoiceExercise } from '../../components/exercises/MultipleChoiceExercise';
import { SuffixSnapExercise } from '../../components/exercises/SuffixSnapExercise';
import { WordArrangementExercise } from '../../components/exercises/WordArrangementExercise';
import { ScriptToggle } from '../../components/ScriptToggle';
import { AnimatedPressable } from '../../components/AnimatedPressable';
import { GrammarTooltipModal } from '../../components/GrammarTooltipModal';
import { useSrsStore } from '../../stores/srsStore';
import { useUserStore } from '../../stores/userStore';
import { colors } from '../../lib/colors';

// Strong ease-out — state-indication transition, not a UI entrance/exit.
const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);

export default function LessonPlayer() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessonById[id!];
  const [idx, setIdx] = useState(0);
  const [queue, setQueue] = useState(() => [...(lesson?.exercises ?? [])]);
  const [tooltipRuleId, setTooltipRuleId] = useState<string | null>(null);
  const record = useSrsStore((s) => s.record);
  const bumpXp = useUserStore((s) => s.bumpXp);

  // Feature 2 edge case (PRD §8): "User taps multiple cards simultaneously —
  // only first tap registered." A ref (not state) so the guard is
  // synchronous — state updates are too slow to block a second tap that
  // lands in the same event-loop tick.
  const answering = useRef(false);

  // Hooks must run unconditionally (before the early return below), even
  // though progress is meaningless in the empty-lesson case.
  const progress = queue.length > 0 ? (idx + 1) / queue.length : 0;
  const progressWidth = useSharedValue(progress);
  useEffect(() => {
    progressWidth.value = withTiming(progress, { duration: 220, easing: EASE_OUT });
  }, [progress]);
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  if (!lesson || queue.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.ink, textAlign: 'center' }}>
          {lesson?.title ?? 'Lesson'}
        </Text>
        <Text style={{ color: colors.ink3, marginTop: 8, textAlign: 'center' }}>
          No exercises wired yet — see data/lessons.ts to populate from the Mattokki database.
        </Text>
        <Pressable onPress={() => router.back()} style={{ marginTop: 24 }}>
          <Text style={{ color: colors.nile, fontFamily: 'Inter-Bold' }}>Back to map</Text>
        </Pressable>
      </View>
    );
  }

  const ex = queue[idx];

  const next = () => {
    if (idx + 1 >= queue.length) {
      bumpXp(50);
      router.replace('/lesson/complete' as any);
    } else {
      setIdx(idx + 1);
      answering.current = false; // new exercise is now current — allow its first answer
    }
  };

  const onAnswer = (correct: boolean, wrongRuleId?: string) => {
    if (answering.current) return; // ignore a second tap that beat the state update
    answering.current = true;
    record(ex, correct, wrongRuleId);
    if (correct) {
      bumpXp(10);
      next();
    } else {
      // Per PRD: wrong answers append to end of queue.
      setQueue([...queue, ex]);
      next();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime, paddingTop: insets.top }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <AnimatedPressable onPress={() => router.back()} hitSlop={12}>
          <Text style={{ fontSize: 22, color: colors.ink3 }}>×</Text>
        </AnimatedPressable>
        <View style={{ flex: 1, height: 9, borderRadius: 6, backgroundColor: colors.hairline2, overflow: 'hidden' }}>
          <Animated.View style={[{ height: '100%', backgroundColor: colors.ochre }, progressStyle]} />
        </View>
        <ScriptToggle small />
      </View>
      <View style={{ paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 11, color: colors.ink3, fontFamily: 'Inter-Bold' }}>
          {lesson.id} · {lesson.title}
        </Text>
        <Text style={{ fontSize: 11, color: colors.ink3, fontFamily: 'Inter-Bold' }}>
          {idx + 1} / {queue.length}
        </Text>
      </View>

      {ex.kind === 'audio_match' && <AudioMatchingExercise exercise={ex} onAnswer={onAnswer} />}
      {ex.kind === 'mcq' &&         <MultipleChoiceExercise exercise={ex} onAnswer={onAnswer} onTooltipRequest={setTooltipRuleId} />}
      {ex.kind === 'suffix_snap' && <SuffixSnapExercise exercise={ex} onAnswer={onAnswer} />}
      {ex.kind === 'word_arrange'&& <WordArrangementExercise exercise={ex} onAnswer={onAnswer} />}
      <View style={{ height: insets.bottom }} />
      <GrammarTooltipModal ruleId={tooltipRuleId} onClose={() => setTooltipRuleId(null)} />
    </View>
  );
}
