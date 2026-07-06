import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sunburst } from '../../components/brand/Sunburst';
import { OilLampFlame } from '../../components/brand/OilLampFlame';
import { EssiButton } from '../../components/EssiButton';
import { colors } from '../../lib/colors';

export default function LessonComplete() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.terra, paddingTop: insets.top }}>
      <View style={{ position: 'absolute', top: 80, left: 0, right: 0, alignItems: 'center', opacity: 0.13 }}>
        <Sunburst size={500} color={colors.lime} rays={48} />
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 }}>
        <Text style={{ fontSize: 11, letterSpacing: 4, color: colors.lime, fontFamily: 'Inter-Bold', opacity: 0.85, marginBottom: 14 }}>
          LESSON COMPLETE
        </Text>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 42, color: colors.lime, textAlign: 'center', lineHeight: 44, marginBottom: 6 }}>
          The Nile{'\n'}flows on.
        </Text>
        <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.lime, opacity: 0.9, marginBottom: 30 }}>
          النيل بيكمل جريانه
        </Text>

        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 22 }}>
          {[
            { label: 'XP', value: '+50' },
            { label: 'Words', value: '5 new' },
            { label: 'Accuracy', value: '92%' },
          ].map((m, i) => (
            <View key={i} style={{
              flex: 1, padding: 14, borderRadius: 16, alignItems: 'center',
              backgroundColor: 'rgba(245,240,232,0.10)', borderWidth: 1, borderColor: 'rgba(245,240,232,0.2)',
            }}>
              <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.lime }}>{m.value}</Text>
              <Text style={{ fontSize: 10, color: colors.lime, opacity: 0.7, marginTop: 2, letterSpacing: 1.6 }}>{m.label.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <View style={{
          padding: 14, borderRadius: 18, flexDirection: 'row', alignItems: 'center', gap: 14, width: '100%',
          backgroundColor: 'rgba(245,240,232,0.10)', borderWidth: 1, borderColor: 'rgba(245,240,232,0.2)',
        }}>
          <OilLampFlame size={34} color={colors.ochre} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.lime, fontFamily: 'Inter-Bold', fontSize: 15 }}>Streak continues</Text>
            <Text style={{ color: colors.lime, opacity: 0.75, fontSize: 12, marginTop: 2 }}>The lamp is still lit.</Text>
          </View>
        </View>
      </View>

      <View style={{ padding: 24, paddingBottom: insets.bottom + 16 }}>
        <EssiButton title="Continue →" arabicTitle="كمل" variant="light" onPress={() => router.replace('/(tabs)/home' as any)} />
      </View>
    </View>
  );
}
