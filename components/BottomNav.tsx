import React from 'react';
import { View, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../lib/colors';
import { AnimatedPressable } from './AnimatedPressable';

const items = [
  { k: 'home',     label: 'Home',     route: '/(tabs)/home'    as const },
  { k: 'practice', label: 'Practice', route: '/(tabs)/practice'as const },
  { k: 'profile',  label: 'Profile',  route: '/(tabs)/profile' as const },
  { k: 'settings', label: 'Settings', route: '/(tabs)/settings'as const },
];

const Icon = ({ k, c }: { k: string; c: string }) => {
  if (k === 'home') return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Path d="M3 11 L11 4 L19 11 V18 H14 V13 H8 V18 H3 Z" fill="none" stroke={c} strokeWidth={1.8} strokeLinejoin="round" />
    </Svg>
  );
  if (k === 'practice') return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx={11} cy={11} r={7.5} fill="none" stroke={c} strokeWidth={1.8} />
      <Path d="M11 11 L 15 8" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={11} cy={11} r={1.5} fill={c} />
    </Svg>
  );
  if (k === 'profile') return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx={11} cy={8} r={3.5} fill="none" stroke={c} strokeWidth={1.8} />
      <Path d="M4 19 C 4 14 18 14 18 19" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx={11} cy={11} r={3} fill="none" stroke={c} strokeWidth={1.8} />
      <Path d="M11 3 V 5 M11 17 V 19 M3 11 H 5 M17 11 H 19" stroke={c} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
};

export function BottomNav() {
  const router = useRouter();
  const path = usePathname();
  return (
    <View style={{
      flexDirection: 'row', justifyContent: 'space-around',
      paddingTop: 8, paddingBottom: 4, paddingHorizontal: 8,
      backgroundColor: colors.lime,
      borderTopWidth: 1, borderTopColor: colors.hairline,
    }}>
      {items.map((it) => {
        const active = path?.includes(it.k) ?? false;
        const c = active ? colors.nile : colors.ink3;
        return (
          <AnimatedPressable key={it.k} onPress={() => router.push(it.route)}
            style={{ flex: 1, alignItems: 'center', paddingVertical: 4 }}>
            <Icon k={it.k} c={c} />
            <Text style={{ fontSize: 10.5, color: c, fontFamily: active ? 'Inter-Bold' : 'Inter-Medium', marginTop: 2 }}>
              {it.label}
            </Text>
          </AnimatedPressable>
        );
      })}
    </View>
  );
}
