// Screen 6 — Micro-Lesson
// PRD §7 Screen 6: teaches 3 words (essi, id, essi-we:r), interactive quiz,
// Old Nubian script visual introduction, gentle haptics, next step on completion.

import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { colors } from '../../lib/colors';
import { play } from '../../lib/audio';
import { EssiButton } from '../../components/EssiButton';

// Real lexicon MP3s — genuine MPEG audio, not placeholder chime
const AUDIO: Record<string, any> = {
  '1': require('../../assets/audio/xnz_0001.mp3'), // essi = water
  '2': require('../../assets/audio/xnz_0002.mp3'), // id   = man
  '3': require('../../assets/audio/xnz_0003.mp3'), // essi-we:r = a water
};

interface MatchItem {
  id: string;
  nubian: string;
  oldNubian: string;
  translation_en: string;
  translation_ar: string;
}

const VOCAB: MatchItem[] = [
  { id: '1', nubian: 'essi',     oldNubian: 'ⲉⲥⲥⲓ',      translation_en: 'water',   translation_ar: 'ماء'          },
  { id: '2', nubian: 'id',       oldNubian: 'ⲓⲇ',         translation_en: 'man',     translation_ar: 'رجل'          },
  { id: '3', nubian: 'essi-we:r',oldNubian: 'ⲉⲥⲥⲓ-ⲟⲩⲏⲣ', translation_en: 'a water', translation_ar: 'مية (نكرة)'   },
];

export default function MicroLesson() {
  const r = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<'intro' | 'grammar' | 'quiz'>('intro');

  const [playingId, setPlayingId] = useState<string | null>(null);

  // Quiz state
  const [selectedLeft,  setSelectedLeft]  = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs,  setMatchedPairs]  = useState<string[]>([]);
  const [quizError,     setQuizError]     = useState<boolean>(false);

  const playWord = async (id: string) => {
    if (playingId === id) return; // already playing
    setPlayingId(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await play(AUDIO[id]);
    } catch (e) {
      console.warn('MicroLesson audio error:', e);
    }
    setTimeout(() => setPlayingId(null), 2500);
  };

  const handleLeftSelect = (id: string) => {
    if (matchedPairs.includes(id)) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedLeft(id);
    setQuizError(false);
    if (selectedRight) checkMatch(id, selectedRight);
  };

  const handleRightSelect = (id: string) => {
    if (matchedPairs.includes(id)) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedRight(id);
    setQuizError(false);
    if (selectedLeft) checkMatch(selectedLeft, id);
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setMatchedPairs(prev => [...prev, leftId]);
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setQuizError(true);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setQuizError(false);
      }, 900);
    }
  };

  const allMatched = matchedPairs.length === VOCAB.length;

  // ── Shared: step header (outside scroll so it never moves) ──
  const StepHeader = () => (
    <View style={{ paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
      <Text style={{ fontSize: 11, letterSpacing: 4, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase' }}>
        Step 5 of 5
      </Text>
      <Pressable onPress={() => r.back()}>
        <Text style={{ fontSize: 13, color: colors.ink3, fontFamily: 'Inter-SemiBold' }}>Back</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime, paddingTop: insets.top }}>
      <StepHeader />

      {/* ── INTRO step ─────────────────────────────────────────────── */}
      {step === 'intro' && (
        <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 14, paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, lineHeight: 30 }}>
              Let's learn your first words.
            </Text>
            <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.terra, marginTop: 4, marginBottom: 12 }}>
              نتعلم أول كلماتنا النوبية معاً.
            </Text>
            <Text style={{ fontSize: 14, color: colors.ink3, marginBottom: 20 }}>
              Tap the speaker icon to hear the word pronounced. Notice the ancient Old Nubian script above.
            </Text>

            <View style={{ gap: 14 }}>
              {VOCAB.slice(0, 2).map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => playWord(item.id)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 22,
                    padding: 20,
                    borderWidth: 1.5,
                    borderColor: playingId === item.id ? colors.nile : colors.hairline,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: 'NotoSansCoptic', fontSize: 26, color: colors.nile }}>
                      {item.oldNubian}
                    </Text>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 22, color: colors.ink, marginTop: 4 }}>
                      {item.nubian}
                    </Text>
                    <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 14, color: colors.ink3, marginTop: 4 }}>
                      {item.translation_ar} · {item.translation_en}
                    </Text>
                  </View>

                  <View style={{
                    width: 52, height: 52, borderRadius: 26,
                    backgroundColor: playingId === item.id ? colors.nile : colors.limeDeep,
                    alignItems: 'center', justifyContent: 'center', marginLeft: 14,
                  }}>
                    <Text style={{ fontSize: 22 }}>{playingId === item.id ? '🔊' : '▶'}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {/* Button pinned outside ScrollView */}
          <View style={{ paddingHorizontal: 24, paddingBottom: Math.max(insets.bottom, 16) + 8, paddingTop: 12, backgroundColor: colors.lime }}>
            <EssiButton title="Next →" arabicTitle="التالي" variant="primary" onPress={() => setStep('grammar')} />
          </View>
        </>
      )}

      {/* ── GRAMMAR step ───────────────────────────────────────────── */}
      {step === 'grammar' && (
        <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 14, paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, lineHeight: 30 }}>
              How suffixes work.
            </Text>
            <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.terra, marginTop: 4, marginBottom: 12 }}>
              كيف تعمل اللواحق النوبية؟
            </Text>
            <Text style={{ fontSize: 14, color: colors.ink3, marginBottom: 20 }}>
              Mattokki builds meanings by adding suffixes to noun roots. The suffix <Text style={{ color: colors.terra, fontFamily: 'Inter-Bold' }}>-we:r</Text> means "a" (indefinite).
            </Text>

            <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 22, borderWidth: 1.5, borderColor: colors.hairline, marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, flexWrap: 'wrap' }}>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 28, color: colors.ink }}>essi</Text>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 28, color: colors.terra }}>-we:r</Text>
              </View>
              <Text style={{ fontFamily: 'NotoSansCoptic', fontSize: 20, color: colors.nile, marginTop: 4 }}>
                ⲉⲥⲥⲓ-ⲟⲩⲏⲣ
              </Text>
              <Text style={{ fontSize: 15, color: colors.ink, lineHeight: 22, marginTop: 16 }}>
                <Text style={{ fontFamily: 'Inter-Bold', color: colors.ink }}>essi</Text> = water{'\n'}
                <Text style={{ fontFamily: 'Inter-Bold', color: colors.terra }}>-we:r</Text> = a (indefinite suffix){'\n'}
                <Text style={{ fontFamily: 'Inter-Bold', color: colors.nileDeep }}>essi-we:r</Text> = "a water"
              </Text>

              <View style={{ marginTop: 16, padding: 14, borderRadius: 16, backgroundColor: colors.limeDeep, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Text style={{ fontSize: 20 }}>💡</Text>
                <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 13, color: colors.nileDeep, flex: 1 }}>
                  اللاحقة -وير تعني "النكرة" — زي الـ "a" في الإنجليزي بالظبط.
                </Text>
              </View>
            </View>

            {/* Tap to hear essi-we:r — real MP3 */}
            <Pressable
              onPress={() => playWord('3')}
              style={{
                backgroundColor: colors.limeDeep, borderRadius: 16,
                padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                borderWidth: 1.5, borderColor: playingId === '3' ? colors.nile : 'transparent',
              }}
            >
              <View>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: colors.ink }}>Hear it:</Text>
                <Text style={{ fontSize: 13, color: colors.ink3, marginTop: 2 }}>essi-we:r = "a water"</Text>
              </View>
              <Text style={{ fontSize: 22 }}>{playingId === '3' ? '🔊' : '▶'}</Text>
            </Pressable>
          </ScrollView>

          <View style={{ paddingHorizontal: 24, paddingBottom: Math.max(insets.bottom, 16) + 8, paddingTop: 12, backgroundColor: colors.lime }}>
            <EssiButton title="Start Quiz →" arabicTitle="ابدأ الاختبار" variant="primary" onPress={() => setStep('quiz')} />
          </View>
        </>
      )}

      {/* ── QUIZ step ──────────────────────────────────────────────── */}
      {step === 'quiz' && (
        <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 14, paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, lineHeight: 30 }}>
              Prove your memory.
            </Text>
            <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.terra, marginTop: 4, marginBottom: 12 }}>
              وصل الكلمات ببعضها!
            </Text>
            <Text style={{ fontSize: 14, color: colors.ink3, marginBottom: 20 }}>
              Match each Mattokki word on the left with its translation on the right.
            </Text>

            <View style={{ flexDirection: 'row', gap: 16 }}>
              {/* Left column — Mattokki words */}
              <View style={{ flex: 1, gap: 10 }}>
                {VOCAB.map((item) => {
                  const isMatched  = matchedPairs.includes(item.id);
                  const isSelected = selectedLeft === item.id;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => handleLeftSelect(item.id)}
                      disabled={isMatched}
                      style={[
                        styles.quizCard,
                        isMatched  && styles.matchedCard,
                        isSelected && styles.selectedCard,
                        isSelected && quizError && styles.errorCard,
                      ]}
                    >
                      <Text style={{ fontFamily: 'NotoSansCoptic', fontSize: 13, color: colors.nile, marginBottom: 2 }}>
                        {item.oldNubian}
                      </Text>
                      <Text style={[styles.cardText, isMatched && styles.matchedText]}>
                        {item.nubian}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Right column — translations (shuffled) */}
              <View style={{ flex: 1, gap: 10 }}>
                {[
                  { id: '2', label_en: 'man',     label_ar: 'رجل'       },
                  { id: '3', label_en: 'a water', label_ar: 'مية (نكرة)' },
                  { id: '1', label_en: 'water',   label_ar: 'ماء'        },
                ].map((item) => {
                  const isMatched  = matchedPairs.includes(item.id);
                  const isSelected = selectedRight === item.id;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => handleRightSelect(item.id)}
                      disabled={isMatched}
                      style={[
                        styles.quizCard,
                        isMatched  && styles.matchedCard,
                        isSelected && styles.selectedCard,
                        isSelected && quizError && styles.errorCard,
                      ]}
                    >
                      <Text style={[styles.cardText, isMatched && styles.matchedText]}>
                        {item.label_ar}
                      </Text>
                      <Text style={{ fontSize: 11, color: colors.ink3, marginTop: 2 }}>
                        {item.label_en}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {quizError && (
              <Text style={{ textAlign: 'center', color: colors.terra, fontFamily: 'Inter-Bold', marginTop: 16, fontSize: 13 }}>
                ✕ Not a match — try again
              </Text>
            )}
            {allMatched && (
              <Text style={{ textAlign: 'center', color: colors.nileDeep, fontFamily: 'Inter-Bold', marginTop: 16, fontSize: 14 }}>
                🎉 Perfect match! You've got it.
              </Text>
            )}
          </ScrollView>

          <View style={{ paddingHorizontal: 24, paddingBottom: Math.max(insets.bottom, 16) + 8, paddingTop: 12, backgroundColor: colors.lime }}>
            {allMatched ? (
              <EssiButton
                title="Continue →"
                arabicTitle="استمر"
                variant="primary"
                onPress={() => r.push('/onboarding/success' as any)}
              />
            ) : (
              <View style={{ height: 56, backgroundColor: colors.hairline, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: 'Inter-Bold', color: colors.ink3 }}>Match all 3 pairs to continue</Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.hairline,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: colors.nile,
    backgroundColor: colors.limeDeep,
  },
  matchedCard: {
    borderColor: colors.limeDeep,
    backgroundColor: colors.limeDeep,
    opacity: 0.55,
  },
  errorCard: {
    borderColor: colors.terra,
    backgroundColor: 'rgba(194,82,45,0.10)',
  },
  cardText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: colors.ink,
    textAlign: 'center',
  },
  matchedText: {
    textDecorationLine: 'line-through',
    color: colors.ink4,
  },
});
