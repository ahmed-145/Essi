import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../lib/colors';

export function OilLampFlame({ size = 18, color = colors.ochre }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path d="M8 1.5 C 9 4 11 5 11 8 C 11 10.5 9.5 12 8 12 C 6.5 12 5 10.5 5 8 C 5 5 7 4 8 1.5 Z" fill={color} />
      <Path d="M8 5 C 8.5 6.5 9.5 7 9.5 8.5 C 9.5 9.5 8.8 10.5 8 10.5" fill={colors.lime} opacity={0.4} />
    </Svg>
  );
}
