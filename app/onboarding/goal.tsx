// Screen 5 — Goal Setting
// PRD §7 Screen 5: 3 mins (drop), 10 mins (cup), 20 mins (river).
// Dynamically renders three traditional Nubian pottery vessels filled with water.

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useUserStore } from '../../stores/userStore';
import { colors } from '../../lib/colors';

const OPTIONS = [
  {
    minutes: 3,
    label_ar: '٣ دقائق — نقطة',
    label_en: '3 minutes — A drop',
    desc_ar: 'بداية خفيفة وسهلة للمحافظة على الاستمرارية',
    desc_en: 'A light start to build consistency.',
    size: 50,
    waterColor: '#7dd3fc', // light sky blue
  },
  {
    minutes: 10,
    label_ar: '١٠ دقائق — فنجان',
    label_en: '10 minutes — A cup',
    desc_ar: 'الخيار الموصى به لتعلم وتثبيت الكلمات يومياً',
    desc_en: 'Recommended for daily progress.',
    size: 70,
    waterColor: colors.nile, // nile blue
  },
  {
    minutes: 20,
    label_ar: '٢٠ دقيقة — نهر',
    label_en: '20 minutes — A river',
    desc_ar: 'تحدي قوي لتعلم سريع وعميق للغة النوبية',
    desc_en: 'A deep challenge for rapid fluency.',
    size: 90,
    waterColor: colors.nileDeep, // deep nile blue
  },
];

// Helper component to render a pottery vessel
function PotteryJar({ size, waterFillColor }: { size: number; waterFillColor: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id={`clayGrad-${size}`} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.terra} />
          <Stop offset="1" stopColor={colors.terraDeep || '#b45309'} />
        </LinearGradient>
        <LinearGradient id={`waterGrad-${size}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={waterFillColor} />
          <Stop offset="1" stopColor="#0284c7" />
        </LinearGradient>
      </Defs>
      {/* Water inside the pot */}
      <Path
        d="M 22 45 C 22 75 78 75 78 45 C 78 38 22 38 22 45 Z"
        fill={`url(#waterGrad-${size})`}
      />
      {/* Outer Clay Pot Line/Rim */}
      <Path
        d="M 32 15 L 68 15 Q 73 25 65 35 C 82 45 82 75 50 85 C 18 75 18 45 35 35 Q 27 25 32 15 Z"
        fill="none"
        stroke={`url(#clayGrad-${size})`}
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Decorative Nubian geometric pattern on the neck */}
      <Path
        d="M 36 28 L 64 28"
        stroke={colors.ochre}
        strokeWidth={3}
        strokeDasharray="4,4"
      />
    </Svg>
  );
}

export default function Goal() {
  const r = useRouter();
  const insets = useSafeAreaInsets();
  const patchProfile = useUserStore((s) => s.patch);

  const select = (minutes: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    patchProfile({ daily_goal_minutes: minutes as any });
    r.push('/onboarding/microlesson' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime, paddingTop: insets.top }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        {/* Header progress */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <Text style={{ fontSize: 11, letterSpacing: 4, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase' }}>
            Step 4 of 5
          </Text>
          <Pressable onPress={() => r.back()}>
            <Text style={{ fontSize: 13, color: colors.ink3, fontFamily: 'Inter-SemiBold' }}>Back</Text>
          </Pressable>
        </View>

        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, marginTop: 14, lineHeight: 30 }}>
          Every drop counts.
        </Text>
        <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.terra, marginTop: 4 }}>
          كل نقطة بتفرق. تقدر تدي كام دقيقة كل يوم؟
        </Text>
        <Text style={{ fontSize: 14, color: colors.ink3, marginTop: 8, marginBottom: 24 }}>
          Consistency keeps the roots alive. Choose your daily water goal.
        </Text>

        <View style={{ gap: 14 }}>
          {OPTIONS.map((opt) => (
            <Pressable
              key={opt.minutes}
              onPress={() => select(opt.minutes)}
              style={({ pressed }) => ({
                backgroundColor: '#fff',
                borderRadius: 22,
                padding: 20,
                borderWidth: 1.5,
                borderColor: pressed ? colors.terra : colors.hairline,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              <View style={{
                width: 90,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <PotteryJar size={opt.size} waterFillColor={opt.waterColor} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 16, color: colors.ink, textAlign: 'left' }}>
                  {opt.label_ar}
                </Text>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: colors.ink2, marginTop: 1 }}>
                  {opt.label_en}
                </Text>
                <Text style={{ fontSize: 11.5, color: colors.ink3, marginTop: 4 }}>
                  {opt.desc_en}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
