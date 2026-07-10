// Screen 4 — Heritage Assessment
// PRD §7 Screen 4: Nothing at all, A few words from home, Can hold basic conversation.
// Helps tailor pacing or routing during initial setup.

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { colors } from '../../lib/colors';
import { EssiButton } from '../../components/EssiButton';

const OPTIONS = [
  {
    id: 'beginner_absolute',
    emoji: '🌱',
    title_ar: 'ولا أي حاجة',
    title_en: 'Nothing at all',
    description_ar: 'هبدأ من الصفر تماماً خطوة بخطوة',
    description_en: 'Start entirely from scratch step-by-step.',
  },
  {
    id: 'beginner_standard',
    emoji: '🌿',
    title_ar: 'أعرف كلمات بسيطة من البيت',
    title_en: 'A few words from home',
    description_ar: 'عندي فكرة عن بعض الكلمات والتحيات الشائعة',
    description_en: 'Familiar with some common words and greetings.',
  },
  {
    id: 'intermediate',
    emoji: '🌳',
    title_ar: 'أقدر أتكلم محادثة بسيطة',
    title_en: 'I can hold a basic conversation',
    description_ar: 'حابب أراجع وأطور مهاراتي اللغوية والقواعد',
    description_en: 'Want to review and advance grammar skills.',
  },
];

export default function Heritage() {
  const r = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const select = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedId(id);
  };

  const handleContinue = () => {
    if (!selectedId) return;
    r.push('/onboarding/goal' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime, paddingTop: insets.top }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 32 }}>
        {/* Header progress */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <Text style={{ fontSize: 11, letterSpacing: 4, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase' }}>
            Step 3 of 5
          </Text>
          <Pressable onPress={() => r.back()}>
            <Text style={{ fontSize: 13, color: colors.ink3, fontFamily: 'Inter-SemiBold' }}>Back</Text>
          </Pressable>
        </View>

        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, marginTop: 14, lineHeight: 30 }}>
          Do you already know any Mattokki?
        </Text>
        <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.terra, marginTop: 4, marginBottom: 20 }}>
          هل تعرف أي شيء عن لغة المطوكي بالفعل؟
        </Text>

        <View style={{ gap: 12 }}>
          {OPTIONS.map((opt) => {
            const isSelected = selectedId === opt.id;
            return (
              <Pressable
                key={opt.id}
                onPress={() => select(opt.id)}
                style={({ pressed }) => ({
                  backgroundColor: isSelected ? colors.limeDeep : '#fff',
                  borderRadius: 20,
                  padding: 18,
                  borderWidth: 1.5,
                  borderColor: isSelected ? colors.terra : colors.hairline,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <View style={{
                  width: 46, height: 46, borderRadius: 23,
                  backgroundColor: isSelected ? colors.terra : colors.limeDeep,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Text style={{ fontSize: 22 }}>{opt.emoji}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 15, color: colors.ink, textAlign: 'left' }}>
                    {opt.title_ar}
                  </Text>
                  <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 13, color: colors.ink2, marginTop: 2 }}>
                    {opt.title_en}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={{ marginTop: 24, marginBottom: 16 }}>
          <EssiButton 
            title="Continue →" 
            arabicTitle="استمر" 
            variant="primary" 
            disabled={!selectedId} 
            onPress={handleContinue} 
          />
        </View>
      </ScrollView>
    </View>
  );
}
