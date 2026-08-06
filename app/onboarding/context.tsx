// Screen 2 — Language context (Step 1 of 5)
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EssiButton } from '../../components/EssiButton';
import { colors } from '../../lib/colors';

export default function Context() {
  const r = useRouter();
  const insets = useSafeAreaInsets();

  return (
    // Outer shell: full screen, column direction
    <View style={{
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.lime,
      paddingTop: insets.top,
    }}>

      {/* ── Scrollable content — grows to fill space ── */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={{
          fontSize: 11, letterSpacing: 4, color: colors.terra,
          fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginTop: 16,
        }}>
          Step 1 of 5
        </Text>

        <Text style={{
          fontFamily: 'Fraunces-SemiBold', fontSize: 26,
          color: colors.ink, marginTop: 14, lineHeight: 32,
        }}>
          The language of the Nile,{`\n`}between Aswan and Dongola.
        </Text>

        <Text style={{
          fontFamily: 'Cairo-Bold', fontSize: 18,
          color: colors.terra, marginTop: 8,
        }}>
          لغة النيل، بين أسوان ودنقلة.
        </Text>

        <Text style={{
          fontSize: 14.5, color: colors.ink2,
          lineHeight: 22, marginTop: 14,
        }}>
          You are about to learn{' '}
          <Text style={{ color: colors.terra, fontFamily: 'Inter-Bold' }}>Mattokki</Text>
          {' '}— the indigenous tongue of the Egyptian Nubian people. Spoken for
          millennia along the river, it is one of the most endangered languages
          on earth. Every word you learn is an act of preservation.
        </Text>

        <Text style={{
          fontFamily: 'Cairo-Bold', fontSize: 14.5,
          color: colors.ink2, lineHeight: 22, marginTop: 10,
        }}>
          أنت على وشك تتعلم المطوكي — اللغة الأصيلة للنوبيين المصريين. كل كلمة بتتعلمها هي فعل حفاظ على هوية.
        </Text>
      </ScrollView>

      {/* ── CTA Button — FIXED at bottom, NEVER inside ScrollView ── */}
      <View style={{
        backgroundColor: colors.lime,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: Math.max(insets.bottom, 20) + 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.06)',
      }}>
        <EssiButton
          title="Let's begin →"
          arabicTitle="هنبدأ"
          variant="primary"
          onPress={() => r.push('/onboarding/motivation' as any)}
        />
      </View>

    </View>
  );
}
