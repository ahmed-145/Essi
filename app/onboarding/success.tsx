// Screen 7 — Success Moment
// PRD §7 Screen 7: "You have spoken the language of the ancestors", 3 words, Day 1 streak,
// oil lamp flame, and the peak emotional trigger redirecting to Screen 8 (Account creation).

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { colors } from '../../lib/colors';
import { EssiButton } from '../../components/EssiButton';
import { OilLampFlame } from '../../components/brand/OilLampFlame';

export default function Success() {
  const r = useRouter();
  const insets = useSafeAreaInsets();

  // Animation values
  const flameScale = useSharedValue(0);
  const flameRotate = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);
  const cardScale = useSharedValue(0.9);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Play success haptics sequence
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // 2. Animate Flame (Pop up and subtle initial sway)
    flameScale.value = withSpring(1, { damping: 10, stiffness: 80 });
    flameRotate.value = withDelay(
      500,
      withSequence(
        withTiming(-5, { duration: 150 }),
        withTiming(5, { duration: 300 }),
        withTiming(0, { duration: 150 })
      )
    );

    // 3. Staggered text entrances
    textOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
    textTranslateY.value = withDelay(300, withSpring(0, { damping: 12 }));

    // 4. Staggered stats card entrance
    cardOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    cardScale.value = withDelay(600, withSpring(1, { damping: 12 }));
  }, []);

  const flameStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: flameScale.value },
      { rotate: `${flameRotate.value}deg` }
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ scale: cardScale.value }],
  }));

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    r.push('/onboarding/auth' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.nileDeep, paddingTop: insets.top }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 28 }}>
        
        {/* Animated Oil Lamp Flame */}
        <Animated.View style={[flameStyle, { marginBottom: 30 }]}>
          <View style={{
            width: 110, height: 110, borderRadius: 55,
            backgroundColor: 'rgba(245,240,232,0.08)',
            alignItems: 'center', justifyContent: 'center',
            borderWidth: 1, borderColor: 'rgba(245,240,232,0.15)',
          }}>
            <OilLampFlame size={60} color={colors.ochre} />
          </View>
        </Animated.View>

        {/* Text Area */}
        <Animated.View style={[textStyle, { alignItems: 'center' }]}>
          <Text style={{
            fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.lime,
            textAlign: 'center', lineHeight: 32, marginBottom: 8,
          }}>
            You have spoken the language of the ancestors.
          </Text>
          <Text style={{
            fontFamily: 'Cairo-Bold', fontSize: 20, color: colors.ochre,
            textAlign: 'center', marginBottom: 24,
          }}>
            اتكلمت بلغة الأجداد.
          </Text>
        </Animated.View>

        {/* Stat/Streak summary card */}
        <Animated.View style={[cardStyle, styles.statsCard]}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>3</Text>
            <Text style={styles.statLabel}>Words Learned</Text>
            <Text style={styles.statLabelAr}>كلمات اتعلمتها</Text>
          </View>
          <View style={{ width: 1, height: '60%', backgroundColor: 'rgba(245,240,232,0.15)' }} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>Day 1</Text>
            <Text style={styles.statLabel}>Streak Started</Text>
            <Text style={styles.statLabelAr}>بداية الاستمرار</Text>
          </View>
        </Animated.View>

      </View>

      {/* Button CTA container */}
      <View style={{ padding: 24, paddingBottom: insets.bottom + 16 }}>
        <EssiButton
          title="Save your progress →"
          arabicTitle="احفظ تقدمك"
          variant="ghostLime"
          style={{ borderColor: 'rgba(245,240,232,0.25)', borderWidth: 1.5 }}
          onPress={handleSave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    backgroundColor: 'rgba(245,240,232,0.06)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(245,240,232,0.15)',
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 340,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 28,
    color: colors.lime,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: 'rgba(245,240,232,0.85)',
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  statLabelAr: {
    fontSize: 11,
    fontFamily: 'Cairo-Bold',
    color: colors.ochre,
    marginTop: 2,
    textAlign: 'center',
  },
});
