// Screen 3 — Motivation Selection
// PRD §7: Connecting with family/ancestors, Speaking with elders, History/cultures, Just curious.
// Updates local store motivation tags.

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useUserStore } from '../../stores/userStore';
import { colors } from '../../lib/colors';
import { EssiButton } from '../../components/EssiButton';

const OPTIONS = [
  {
    id: 'heritage_primary',
    emoji: '🏡',
    title_ar: 'أتواصل مع عيلتي وأهلي',
    title_en: 'Connecting with family & ancestors',
    description_ar: 'التعرف على الجذور والهوية النوبية',
    description_en: 'Explore family roots and Nubian heritage.',
  },
  {
    id: 'heritage_urgent',
    emoji: '🗣️',
    title_ar: 'أتكلم مع كبار السن قبل ما يروحوا',
    title_en: 'Speaking with elders before it\'s too late',
    description_ar: 'حفظ الحكايات والتاريخ الشفوي',
    description_en: 'Preserve oral history and connect with older generations.',
  },
  {
    id: 'cultural_explorer',
    emoji: '🏺',
    title_ar: 'بحب التاريخ والثقافات النوبية',
    title_en: 'I love history & indigenous cultures',
    description_ar: 'دراسة تاريخ حضارة النيل العريقة',
    description_en: 'Learn about the ancient Nile valley civilizations.',
  },
  {
    id: 'casual',
    emoji: '✨',
    title_ar: 'عندي فضول وحب استطلاع بس',
    title_en: 'Just curious',
    description_ar: 'تسلية وتحدي عقلي خفيف',
    description_en: 'Fun language exploration and brain exercise.',
  },
];

export default function Motivation() {
  const r = useRouter();
  const insets = useSafeAreaInsets();
  const patchProfile = useUserStore((s) => s.patch);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const select = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedId(id);
  };

  const handleContinue = () => {
    if (!selectedId) return;
    patchProfile({ motivation: selectedId as any });
    r.push('/onboarding/heritage' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime, paddingTop: insets.top }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingBottom: insets.bottom + 32 }}>
        {/* Header progress */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <Text style={{ fontSize: 11, letterSpacing: 4, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase' }}>
            Step 2 of 5
          </Text>
          <Pressable onPress={() => r.back()}>
            <Text style={{ fontSize: 13, color: colors.ink3, fontFamily: 'Inter-SemiBold' }}>Back</Text>
          </Pressable>
        </View>

        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, marginTop: 14, lineHeight: 30 }}>
          Why are you learning Mattokki?
        </Text>
        <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.terra, marginTop: 4, marginBottom: 20 }}>
          ليه عايز تتعلم لغة المطوكي النوبية؟
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
                  <Text style={{ fontSize: 22, color: isSelected ? '#fff' : undefined }}>{opt.emoji}</Text>
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
