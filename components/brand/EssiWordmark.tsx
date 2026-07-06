import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../lib/colors';
import { sawardaLoaded, notoCopticLoaded } from '../../lib/fonts';

export function EssiWordmark({
  size = 56, color = colors.lime, sub = true, subColor,
}: { size?: number; color?: string; sub?: boolean; subColor?: string }) {
  // PRD §6.2 fallback ladder — Sawarda (authentic) > Noto Sans Coptic (correct
  // glyphs, disambiguates from Latin "Ecci") > plain Latin "essi" (last resort).
  const fontFamily = sawardaLoaded
    ? 'SawardaNubian'
    : notoCopticLoaded
    ? 'NotoSansCoptic'
    : null;

  if (!fontFamily) {
    return (
      <Text
        style={{
          fontFamily: 'Inter-Bold', fontWeight: '800',
          fontSize: size * 0.7, color,
          letterSpacing: -size * 0.02,
        }}
      >essi</Text>
    );
  }
  return (
    <View style={{ alignItems: 'center', gap: 4 }}>
      <Text
        style={{
          fontFamily,
          fontSize: size, color,
          lineHeight: size, letterSpacing: -size * 0.02,
        }}
      >ⲉⲥⲥⲓ</Text>
      {sub && (
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: size * 0.18,
            color: subColor ?? color,
            letterSpacing: size * 0.18 * 0.4,
            opacity: 0.7,
            paddingLeft: size * 0.18 * 0.4,
            textTransform: 'uppercase',
          }}
        >essi</Text>
      )}
    </View>
  );
}
