// Screen 1 — Welcome
// PRD §7 Screen 1. Massive ⲉⲥⲥⲓ, single tagline, single CTA.

import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sunburst } from '../components/brand/Sunburst';
import { TreeGrassFrieze } from '../components/brand/TreeGrassFrieze';
import { colors } from '../lib/colors';
import { sawardaLoaded, notoCopticLoaded } from '../lib/fonts';
import { useAuthStore } from '../stores/authStore';

export default function Welcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const session = useAuthStore((s) => s.session);
  const checked = useAuthStore((s) => s.checked);

  // Returning-user detection (lightweight version of PRD §21 Phase 5's full
  // onboarding state machine) — already-authenticated users skip straight
  // to Home instead of seeing Welcome again.
  useEffect(() => {
    if (checked && session) router.replace('/(tabs)/home');
  }, [checked, session]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime, paddingTop: insets.top }}>
      <View style={{ opacity: 0.16, paddingTop: 6 }}>
        <TreeGrassFrieze width={390} height={26} color={colors.terra} />
      </View>

      <View style={{ paddingHorizontal: 22, paddingTop: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 11, letterSpacing: 4, color: colors.terra, fontFamily: 'Inter-Bold' }}>
          ESSI · V1.0
        </Text>
        <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderRadius: 999, padding: 3, borderWidth: 1, borderColor: colors.hairline }}>
          <View style={{ paddingVertical: 4, paddingHorizontal: 12, borderRadius: 999, backgroundColor: colors.nileDeep }}>
            <Text style={{ color: colors.lime, fontFamily: 'Inter-Bold', fontSize: 12 }}>AR</Text>
          </View>
          <View style={{ paddingVertical: 4, paddingHorizontal: 12 }}>
            <Text style={{ color: colors.ink3, fontFamily: 'Inter-SemiBold', fontSize: 12 }}>EN</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 28 }}>
        <View style={{ position: 'absolute', opacity: 0.08 }}>
          <Sunburst size={580} color={colors.terra} rays={40} innerR={0.04} outerR={0.5} />
        </View>

        {sawardaLoaded ? (
          <Text style={{ fontFamily: 'SawardaNubian', fontSize: 200, color: colors.ink, lineHeight: 170 }}>
            ⲉⲥⲥⲓ
          </Text>
        ) : notoCopticLoaded ? (
          // Correct Coptic glyphs via Noto Sans Coptic — disambiguates from
          // Latin "Ecci" while the bespoke Sawarda font is sourced (PRD §6.2).
          <Text style={{ fontFamily: 'NotoSansCoptic', fontSize: 170, color: colors.ink, lineHeight: 170 }}>
            ⲉⲥⲥⲓ
          </Text>
        ) : (
          // Last-resort fallback if even Noto fails to load — never a broken character.
          <Text style={{ fontFamily: 'Inter-Bold', fontWeight: '800', fontSize: 96, color: colors.ink, letterSpacing: -2 }}>
            essi
          </Text>
        )}
        <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 11, color: colors.ink3, letterSpacing: 6, marginTop: 14 }}>
          ESSI · إيسي · WATER
        </Text>

        <View style={{ marginTop: 48, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 30, color: colors.terra, marginBottom: 8 }}>
            اسقي جذورك
          </Text>
          <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 20, color: colors.ink2, fontStyle: 'italic' }}>
            Water your roots.
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
        <Pressable
          onPress={() => router.push('/onboarding/context')}
          style={{
            height: 60, backgroundColor: colors.ink, borderRadius: 16,
            alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 12,
          }}
        >
          <Text style={{ color: colors.lime, fontFamily: 'Inter-Bold', fontSize: 17 }}>ابدأ</Text>
          <View style={{ width: 1, height: 18, backgroundColor: 'rgba(245,240,232,0.3)' }} />
          <Text style={{ color: colors.lime, fontFamily: 'Inter-Bold', fontSize: 17 }}>Begin →</Text>
        </Pressable>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 11, color: colors.ink3, paddingBottom: insets.bottom + 16 }}>
        Free forever · No ads · The language belongs to the community.
      </Text>
    </View>
  );
}
