// Lesson player — dispatches to the correct exercise component per item.
// PRD §8 Feature 2 — all four exercise types, mid-lesson persistence,
// XP award on completion, and recordAnswer to Supabase.

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { useLessonProgressStore } from '../../stores/lessonProgressStore';
import { recordAnswer } from '../../lib/api';
import { colors } from '../../lib/colors';
import type { Exercise } from '../../types';

const EASE_OUT = Easing.bezier(0.23, 1, 0.32, 1);
const XP_PER_EXERCISE = 10;
const XP_PER_LESSON = 50;

export default function LessonPlayer() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessonById[id!];

  // ── Restore mid-lesson session if one exists ──────────────────────────────
  const savedSession = useLessonProgressStore((s) => s.session);
  const saveSession = useLessonProgressStore((s) => s.saveSession);
  const clearSession = useLessonProgressStore((s) => s.clearSession);

  const hasSavedSession = savedSession?.lessonId === id;

  const [queue, setQueue] = useState<Exercise[]>(() => {
    if (hasSavedSession) return savedSession!.queue;
    return [...(lesson?.exercises ?? [])];
  });
  const [idx, setIdx] = useState(() => (hasSavedSession ? savedSession!.idx : 0));
  const [correctCount, setCorrectCount] = useState(() => (hasSavedSession ? savedSession!.correctCount : 0));
  const [totalAnswered, setTotalAnswered] = useState(() => (hasSavedSession ? savedSession!.totalAnswered : 0));
  const [tooltipRuleId, setTooltipRuleId] = useState<string | null>(null);

  const record = useSrsStore((s) => s.record);
  const bumpXp = useUserStore((s) => s.bumpXp);

  // PRD §8 Feature 2 edge case: multi-tap guard (ref, not state — synchronous).
  const answering = useRef(false);
  // Track when the current exercise started rendering for ms_to_answer metric.
  const exerciseStartTime = useRef<number>(Date.now());

  // ── Animated progress bar ─────────────────────────────────────────────────
  const progress = queue.length > 0 ? (idx + 1) / queue.length : 0;
  const progressWidth = useSharedValue(progress);
  useEffect(() => {
    progressWidth.value = withTiming(progress, { duration: 220, easing: EASE_OUT });
  }, [progress]);
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  // ── Persist mid-lesson state to AsyncStorage on every transition ──────────
  useEffect(() => {
    if (!lesson || queue.length === 0) return;
    saveSession({
      lessonId: id!,
      queue,
      idx,
      correctCount,
      totalAnswered,
      startedAt: savedSession?.startedAt ?? new Date().toISOString(),
    });
  }, [idx, queue]);

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
  const originalLen = lesson.exercises.length; // for question counter display

  const next = useCallback(() => {
    if (idx + 1 >= queue.length) {
      // Lesson complete — award lesson XP, clear session, navigate to complete screen
      bumpXp(XP_PER_LESSON);
      clearSession(id!);
      const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
      router.replace({
        pathname: '/lesson/complete',
        params: {
          xp: String(XP_PER_LESSON + correctCount * XP_PER_EXERCISE),
          accuracy: String(accuracy),
          words: String(lesson.exercises.filter((e) => e.kind === 'audio_match' || e.kind === 'mcq').length),
        },
      } as any);
    } else {
      setIdx(idx + 1);
      answering.current = false;
      exerciseStartTime.current = Date.now(); // reset timer for next exercise
    }
  }, [idx, queue.length, totalAnswered, correctCount]);

  const onAnswer = useCallback((correct: boolean, wrongRuleId?: string) => {
    if (answering.current) return;
    answering.current = true;

    // Measure time-to-answer for fluency metric (PRD §6.4 avg_recall_time_ms)
    const ms = Math.min(Date.now() - exerciseStartTime.current, 60_000); // cap at 60s

    // Update local SRS immediately (optimistic)
    record(ex, correct, wrongRuleId);

    // Fire-and-forget server sync (PRD §8 Feature 5 / POST /api/progress)
    recordAnswer({
      exercise_id: ex.id,
      is_correct: correct,
      wrong_rule_id: wrongRuleId ?? null,
      ms_to_answer: ms,
    }).catch(() => {});

    const newTotal = totalAnswered + 1;
    const newCorrect = correct ? correctCount + 1 : correctCount;
    setTotalAnswered(newTotal);
    setCorrectCount(newCorrect);

    if (correct) {
      bumpXp(XP_PER_EXERCISE);
      next();
    } else {
      // PRD: wrong answers append to end of queue so user must answer correctly
      setQueue((q) => [...q, ex]);
      next();
    }
  }, [ex, totalAnswered, correctCount, next]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime, paddingTop: insets.top }}>
      {/* Header: back, progress bar, script toggle */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <AnimatedPressable onPress={() => router.back()} hitSlop={12}>
          <Text style={{ fontSize: 22, color: colors.ink3 }}>×</Text>
        </AnimatedPressable>
        <View style={{ flex: 1, height: 9, borderRadius: 6, backgroundColor: colors.hairline2, overflow: 'hidden' }}>
          <Animated.View style={[{ height: '100%', backgroundColor: colors.ochre }, progressStyle]} />
        </View>
        <ScriptToggle small />
      </View>

      {/* Sub-header: lesson ID + question counter */}
      <View style={{ paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 11, color: colors.ink3, fontFamily: 'Inter-Bold' }}>
          {lesson.id} · {lesson.title}
        </Text>
        <Text style={{ fontSize: 11, color: colors.ink3, fontFamily: 'Inter-Bold' }}>
          {Math.min(idx + 1, originalLen)} / {originalLen}
        </Text>
      </View>

      {/* Resume banner — shown if picking up a saved session */}
      {hasSavedSession && idx > 0 && (
        <View style={{
          marginHorizontal: 16, marginTop: 8, paddingVertical: 7, paddingHorizontal: 14,
          backgroundColor: colors.limeDeep, borderRadius: 10, flexDirection: 'row', alignItems: 'center',
        }}>
          <Text style={{ fontSize: 12, color: colors.nile, fontFamily: 'Inter-Medium' }}>
            ↩ Resuming from where you left off
          </Text>
        </View>
      )}

      {/* Exercise area — bottomInset passed so each component pads its own Check button
           correctly. Do NOT add a sibling <View height={insets.bottom}> here — it would
           fight with the exercise's internal flex:1 and clip the button off-screen. */}
      {ex.kind === 'audio_match'  && <AudioMatchingExercise   exercise={ex} onAnswer={onAnswer} bottomInset={insets.bottom} />}
      {ex.kind === 'mcq'          && <MultipleChoiceExercise  exercise={ex} onAnswer={onAnswer} onTooltipRequest={setTooltipRuleId} bottomInset={insets.bottom} />}
      {ex.kind === 'suffix_snap'  && <SuffixSnapExercise      exercise={ex} onAnswer={onAnswer} bottomInset={insets.bottom} />}
      {ex.kind === 'word_arrange' && <WordArrangementExercise exercise={ex} onAnswer={onAnswer} bottomInset={insets.bottom} />}

      <GrammarTooltipModal ruleId={tooltipRuleId} onClose={() => setTooltipRuleId(null)} />
    </View>
  );
}
