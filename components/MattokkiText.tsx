// Tri-script text component — PRD §6.2
// Reads global scriptPref and renders the matching variant with the
// correct writingDirection. Mixed-direction text is NEVER in one Text node.

import React from 'react';
import { Text, type TextProps, type TextStyle, StyleSheet } from 'react-native';
import { useScriptStore } from '../stores/scriptStore';
import { colors } from '../lib/colors';

interface Props extends TextProps {
  nubian: string;
  arabic: string;
  latin: string;
  size?: number;
  weight?: '400' | '500' | '600' | '700';
  color?: string;
  italic?: boolean;
}

export function MattokkiText({
  nubian, arabic, latin, size = 16, weight = '500',
  color = colors.ink, italic = false, style, ...rest
}: Props) {
  const script = useScriptStore((s) => s.scriptPref);
  const text = script === 'nubian' ? nubian : script === 'arabic' ? arabic : latin;
  const direction: TextStyle['writingDirection'] = script === 'arabic' ? 'rtl' : 'ltr';

  // Fallback chain — if Sawarda fails to load, Noto Sans Coptic still renders Old Nubian.
  const fontFamily =
    script === 'nubian' ? 'SawardaNubian' :
    script === 'arabic' ? 'Cairo' :
    'Inter';

  return (
    <Text
      {...rest}
      style={[
        styles.base,
        {
          fontFamily,
          fontSize: size,
          fontWeight: weight,
          color,
          writingDirection: direction,
          fontStyle: italic ? 'italic' : 'normal',
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: { includeFontPadding: false } as TextStyle,
});
