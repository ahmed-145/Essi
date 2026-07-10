// Lesson complete screen — real dynamic metrics from the lesson player.
// PRD §21 Phase 2: "XP earned, words learned, streak update, continue."

import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue, useAnimatedStyle,
  withDelay, withSpring, withTiming, Easing,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Sunburst } from '../../components/brand/Sunburst';
import { OilLampFlame } from '../../components/brand/OilLampFlame';
import { EssiButton } from '../../components/EssiButton';
import { colors } from '../../lib/colors';
import { useUserStore } from '../../stores/userStore';

export default function LessonComplete() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ xp?: string; accuracy?: string; words?: string }>();
  const streak = useUserStore((s) => s.profile?.streak ?? 0);

  // Read from params (passed by lesson player) or fall back to sensible defaults
  const xpEarned = params.xp ? parseInt(params.xp, 10) : 50;
  const accuracy = params.accuracy ? parseInt(params.accuracy, 10) : 0;
  const words = params.words ? parseInt(params.words, 10) : 0;

  // Celebration haptic on mount
  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  // Staggered entrance animations for the metric cards
  const card1 = useSharedValue(0);
  const card2 = useSharedValue(0);
  const card3 = useSharedValue(0);
  useEffect(() => {
    card1.value = withDelay(100, withSpring(1, { damping: 14, stiffness: 120 }));
    card2.value = withDelay(200, withSpring(1, { damping: 14, stiffness: 120 }));
    card3.value = withDelay(300, withSpring(1, { damping: 14, stiffness: 120 }));
  }, []);

  const metricAnimStyle = (sv: SharedValue<number>) =>
    useAnimatedStyle(() => ({
      opacity: sv.value,
      transform: [{ translateY: (1 - sv.value) * 24 }],
    }));

  const metrics = [
    { label: 'XP', value: `+${xpEarned}` },
    { label: 'Words', value: words > 0 ? `${words} new` : '—' },
    { label: 'Accuracy', value: accuracy > 0 ? `${accuracy}%` : '—' },
  ];
  const cardAnims = [metricAnimStyle(card1), metricAnimStyle(card2), metricAnimStyle(card3)];

  return (
    <View style={{ flex: 1, backgroundColor: colors.terra, paddingTop: insets.top }}>
      {/* Background sunburst */}
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

        {/* Animated metric cards */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 22 }}>
          {metrics.map((m, i) => (
            <Animated.View
              key={i}
              style={[{
                flex: 1, padding: 14, borderRadius: 16, alignItems: 'center',
                backgroundColor: 'rgba(245,240,232,0.10)',
                borderWidth: 1, borderColor: 'rgba(245,240,232,0.2)',
              }, cardAnims[i]]}
            >
              <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.lime }}>{m.value}</Text>
              <Text style={{ fontSize: 10, color: colors.lime, opacity: 0.7, marginTop: 2, letterSpacing: 1.6 }}>
                {m.label.toUpperCase()}
              </Text>
            </Animated.View>
          ))}
        </View>

        {/* Streak card */}
        <View style={{
          padding: 14, borderRadius: 18, flexDirection: 'row', alignItems: 'center', gap: 14, width: '100%',
          backgroundColor: 'rgba(245,240,232,0.10)',
          borderWidth: 1, borderColor: 'rgba(245,240,232,0.2)',
        }}>
          <OilLampFlame size={34} color={colors.ochre} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.lime, fontFamily: 'Inter-Bold', fontSize: 15 }}>
              {streak > 0 ? `${streak}-day streak` : 'Streak continues'}
            </Text>
            <Text style={{ color: colors.lime, opacity: 0.75, fontSize: 12, marginTop: 2 }}>
              The lamp is still lit. · الفانوس لسه شعلان.
            </Text>
          </View>
        </View>

        {/* Accuracy encouragement */}
        {accuracy > 0 && (
          <Text style={{ color: colors.lime, opacity: 0.6, fontSize: 13, marginTop: 18, textAlign: 'center' }}>
            {accuracy >= 90
              ? '🌊 Near-perfect — you\'re watering deep roots.'
              : accuracy >= 70
              ? '🌿 Solid progress. Keep going.'
              : '💧 Every drop counts. The SRS will bring those words back.'}
          </Text>
        )}
      </View>

      <View style={{ padding: 24, paddingBottom: insets.bottom + 16 }}>
        <EssiButton
          title="Continue →"
          arabicTitle="كمل"
          variant="light"
          onPress={() => router.replace('/(tabs)/home' as any)}
        />
      </View>
    </View>
  );
}
