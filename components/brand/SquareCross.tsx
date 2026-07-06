import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { colors } from '../../lib/colors';

export function SquareCross({ size = 24, color = colors.terra }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={9} y={2} width={6} height={20} fill={color} />
      <Rect x={2} y={9} width={20} height={6} fill={color} />
      <Rect x={9} y={9} width={6} height={6} fill={colors.lime} />
    </Svg>
  );
}
