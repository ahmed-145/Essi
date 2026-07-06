import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../lib/colors';

export function Drop({ size = 18, color = colors.nile }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path d="M8 1.5 C 11 5 13 7.5 13 10 C 13 12.8 10.8 14.5 8 14.5 C 5.2 14.5 3 12.8 3 10 C 3 7.5 5 5 8 1.5 Z" fill={color} />
    </Svg>
  );
}
