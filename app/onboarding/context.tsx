// Screen 2 — Language context (stub; flesh out from canvas)
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
    <View style={{ flex: 1, backgroundColor: colors.lime, paddingTop: insets.top }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
        <Text style={{ fontSize: 11, letterSpacing: 4, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginTop: 16 }}>
          Step 1 of 5
        </Text>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, marginTop: 14, lineHeight: 30 }}>
          The language of the Nile, between Aswan and Dongola.
        </Text>
        <Text style={{ fontSize: 14.5, color: colors.ink2, lineHeight: 22, marginTop: 14 }}>
          You are about to learn <Text style={{ color: colors.terra, fontFamily: 'Inter-Bold' }}>Mattokki</Text> — the indigenous tongue of the Egyptian Nubian people. Spoken for millennia along the river, it is one of the most endangered languages on earth. Every word you learn is an act of preservation.
        </Text>
      </ScrollView>
      <View style={{ padding: 24, paddingBottom: insets.bottom + 16 }}>
        <EssiButton title="Let's begin →" arabicTitle="هنبدأ" variant="primary" onPress={() => r.push('/onboarding/motivation' as any)} />
      </View>
    </View>
  );
}
