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

const CHIME = require('../../assets/audio/placeholder-chime.wav');

interface MatchItem {
  id: string;
  nubian: string;
  oldNubian: string;
  translation: string;
}

const VOCAB: MatchItem[] = [
  { id: '1', nubian: 'essi', oldNubian: 'ⲉⲥⲥⲓ', translation: 'water' },
  { id: '2', nubian: 'id', oldNubian: 'ⲓⲇ', translation: 'man' },
  { id: '3', nubian: 'essi-we:r', oldNubian: 'ⲉⲥⲥⲓ-ⲟⲩⲏⲣ', translation: 'a water' },
];

export default function MicroLesson() {
  const r = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<'intro' | 'grammar' | 'quiz'>('intro');

  // Vocab card audio play states
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Quiz state variables
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [quizError, setQuizError] = useState<boolean>(false);

  const playSound = async (id: string) => {
    setPlayingId(id);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await play(CHIME);
    } catch (e) {
      console.log('Audio error:', e);
    }
    setTimeout(() => setPlayingId(null), 800);
  };

  // Match items logic
  const handleLeftSelect = (id: string) => {
    if (matchedPairs.includes(id)) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedLeft(id);
    setQuizError(false);

    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleRightSelect = (id: string) => {
    const item = VOCAB.find(v => v.id === id);
    if (!item || matchedPairs.includes(id)) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedRight(id);
    setQuizError(false);

    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Correct!
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setMatchedPairs([...matchedPairs, leftId]);
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      // Wrong match
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setQuizError(true);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setQuizError(false);
      }, 1000);
    }
  };

  const allMatched = matchedPairs.length === VOCAB.length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime, paddingTop: insets.top }}>
      {/* Header progress */}
      <View style={{ paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <Text style={{ fontSize: 11, letterSpacing: 4, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase' }}>
          Step 5 of 5
        </Text>
        <Pressable onPress={() => r.back()}>
          <Text style={{ fontSize: 13, color: colors.ink3, fontFamily: 'Inter-SemiBold' }}>Back</Text>
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 14, paddingBottom: insets.bottom + 32 }}>
        {step === 'intro' && (
          <View style={{ width: '100%' }}>
            <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, lineHeight: 30 }}>
              Let's learn your first words.
            </Text>
            <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.terra, marginTop: 4, marginBottom: 12 }}>
              نتعلم أول كلماتنا النوبية معاً.
            </Text>
            <Text style={{ fontSize: 14, color: colors.ink3, marginBottom: 20 }}>
              Tap the speaker to hear the word, then notice the ancient Old Nubian script form.
            </Text>

            <View style={{ gap: 14, flex: 1 }}>
              {VOCAB.slice(0, 2).map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => playSound(item.id)}
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
                  <View>
                    <Text style={{ fontFamily: 'NotoSansCoptic', fontSize: 28, color: colors.nile }}>
                      {item.oldNubian}
                    </Text>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 18, color: colors.ink, marginTop: 2 }}>
                      {item.nubian}
                    </Text>
                    <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 14, color: colors.ink3, marginTop: 4 }}>
                      {item.translation === 'water' ? 'ماء' : 'رجل'} · {item.translation}
                    </Text>
                  </View>

                  <View style={{
                    width: 50, height: 50, borderRadius: 25,
                    backgroundColor: playingId === item.id ? colors.nile : colors.limeDeep,
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Text style={{ fontSize: 20, color: playingId === item.id ? '#fff' : colors.nile }}>🔊</Text>
                  </View>
                </Pressable>
              ))}
            </View>

            <View style={{ paddingBottom: insets.bottom + 16 }}>
              <EssiButton title="Next →" arabicTitle="التالي" variant="primary" onPress={() => setStep('grammar')} />
            </View>
          </View>
        )}

        {step === 'grammar' && (
          <View style={{ width: '100%' }}>
            <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, lineHeight: 30 }}>
              How suffixes work.
            </Text>
            <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.terra, marginTop: 4, marginBottom: 12 }}>
              كيف تعمل اللواحق النوبية؟
            </Text>
            <Text style={{ fontSize: 14, color: colors.ink3, marginBottom: 20 }}>
              Mattokki builds meanings by adding suffixes to the end of noun roots.
            </Text>

            <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 22, borderWidth: 1.5, borderColor: colors.hairline, marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 24, color: colors.ink }}>essi</Text>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 24, color: colors.terra }}>-we:r</Text>
              </View>
              <Text style={{ fontFamily: 'NotoSansCoptic', fontSize: 20, color: colors.nile, marginTop: 4 }}>
                ⲉⲥⲥⲓ-ⲟⲩⲏⲣ
              </Text>

              <Text style={{ fontSize: 15, color: colors.ink, lineHeight: 22, marginTop: 16 }}>
                The suffix <Text style={{ color: colors.terra, fontFamily: 'Inter-Bold' }}>-we:r</Text> translates directly to "a" in English (indefinite article).
              </Text>

              <View style={{
                marginTop: 18, padding: 14, borderRadius: 16,
                backgroundColor: colors.limeDeep, flexDirection: 'row', alignItems: 'center', gap: 12,
              }}>
                <Text style={{ fontSize: 22 }}>💡</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 13, color: colors.nileDeep }}>
                    اللاحقة -وير تعني النكرة (زي "أداة النكرة" في الإنجليزي).
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => playSound('3')}
                style={{
                  marginTop: 22, backgroundColor: colors.limeDeep, borderRadius: 16,
                  padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                  borderWidth: 1.5, borderColor: playingId === '3' ? colors.nile : 'transparent',
                }}
              >
                <View>
                  <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: colors.ink }}>Hear the difference:</Text>
                  <Text style={{ fontSize: 13, color: colors.ink3, marginTop: 2 }}>essi-we:r = "a water"</Text>
                </View>
                <Text style={{ fontSize: 18 }}>🔊</Text>
              </Pressable>
            </View>

            <View style={{ paddingBottom: insets.bottom + 16 }}>
              <EssiButton title="Start Quiz →" arabicTitle="ابدأ الاختبار" variant="primary" onPress={() => setStep('quiz')} />
            </View>
          </View>
        )}

        {step === 'quiz' && (
          <View style={{ width: '100%' }}>
            <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, lineHeight: 30 }}>
              Prove your memory.
            </Text>
            <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.terra, marginTop: 4, marginBottom: 12 }}>
              وصل الكلمات ببعضها!
            </Text>
            <Text style={{ fontSize: 14, color: colors.ink3, marginBottom: 20 }}>
              Match each Mattokki word on the left with its translation on the right.
            </Text>

            <View style={{ flexDirection: 'row', gap: 20 }}>
              {/* Left Column (Nubian) */}
              <View style={{ flex: 1, gap: 10 }}>
                {VOCAB.map((item) => {
                  const isMatched = matchedPairs.includes(item.id);
                  const isSelected = selectedLeft === item.id;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => handleLeftSelect(item.id)}
                      disabled={isMatched}
                      style={[
                        styles.quizCard,
                        isMatched && styles.matchedCard,
                        isSelected && styles.selectedCard,
                        isSelected && quizError && styles.errorCard,
                      ]}
                    >
                      <Text style={[styles.cardText, isMatched && styles.matchedText]}>
                        {item.nubian}
                      </Text>
                      <Text style={{ fontSize: 11, color: colors.ink4, fontFamily: 'NotoSansCoptic', marginTop: 2 }}>
                        {item.oldNubian}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Right Column (Translations) */}
              <View style={{ flex: 1, gap: 10 }}>
                {/* Random order for translations to make it a real quiz */}
                {[
                  { id: '2', label: 'man / رجل' },
                  { id: '3', label: 'a water / مية نكرة' },
                  { id: '1', label: 'water / ماء' },
                ].map((item) => {
                  const isMatched = matchedPairs.includes(item.id);
                  const isSelected = selectedRight === item.id;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => handleRightSelect(item.id)}
                      disabled={isMatched}
                      style={[
                        styles.quizCard,
                        isMatched && styles.matchedCard,
                        isSelected && styles.selectedCard,
                        isSelected && quizError && styles.errorCard,
                      ]}
                    >
                      <Text style={[styles.cardText, isMatched && styles.matchedText]}>
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={{ paddingBottom: insets.bottom + 16 }}>
              {allMatched ? (
                <EssiButton title="Continue →" arabicTitle="استمر" variant="primary" onPress={() => r.push('/onboarding/success' as any)} />
              ) : (
                <View style={{ height: 60, opacity: 0.5, backgroundColor: colors.hairline, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontFamily: 'Inter-Bold', color: colors.ink3 }}>Complete the matches</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
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
    opacity: 0.6,
  },
  errorCard: {
    borderColor: colors.terra,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  cardText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14.5,
    color: colors.ink,
    textAlign: 'center',
  },
  matchedText: {
    textDecorationLine: 'line-through',
    color: colors.ink4,
  },
});
