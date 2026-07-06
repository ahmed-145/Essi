import React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../lib/colors';

type Variant = 'primary' | 'accent' | 'terra' | 'ghost' | 'ghostLime' | 'light' | 'ink';

interface Props {
  title?: string;
  arabicTitle?: string;
  variant?: Variant;
  size?: 'lg' | 'md' | 'sm';
  onPress?: () => void;
  full?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const VARIANTS: Record<Variant, { bg: string; fg: string; border: string }> = {
  primary:   { bg: colors.nile,  fg: colors.lime, border: 'transparent' },
  accent:    { bg: colors.ochre, fg: colors.ink,  border: 'transparent' },
  terra:     { bg: colors.terra, fg: colors.lime, border: 'transparent' },
  ink:       { bg: colors.ink,   fg: colors.lime, border: 'transparent' },
  ghost:     { bg: 'transparent', fg: colors.nile, border: colors.nile },
  ghostLime: { bg: 'transparent', fg: colors.lime, border: 'rgba(245,240,232,0.5)' },
  light:     { bg: colors.lime,   fg: colors.ink,  border: colors.hairline },
};
const HEIGHTS = { lg: 56, md: 48, sm: 36 };

export function EssiButton({
  title, arabicTitle, variant = 'primary', size = 'lg',
  onPress, full = true, disabled, style, children,
}: Props) {
  const v = VARIANTS[variant];
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
      }}
      disabled={disabled}
      style={({ pressed }) => [
        {
          height: HEIGHTS[size],
          width: full ? '100%' : undefined,
          backgroundColor: v.bg,
          borderColor: v.border,
          borderWidth: 1.5,
          borderRadius: 14,
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
          transform: [{ translateY: pressed ? 1 : 0 }],
        },
        style,
      ]}
    >
      {children ?? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {arabicTitle && (
            <Text style={{ color: v.fg, fontFamily: 'Cairo-Bold', fontSize: 16, writingDirection: 'rtl' }}>
              {arabicTitle}
            </Text>
          )}
          {arabicTitle && title && (
            <View style={{ width: 1, height: 16, backgroundColor: v.fg, opacity: 0.3 }} />
          )}
          {title && (
            <Text style={{ color: v.fg, fontFamily: 'Inter-SemiBold', fontSize: 16 }}>
              {title}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
