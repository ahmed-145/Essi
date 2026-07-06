import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { colors } from '../lib/colors';

export const CheckIcon = ({ size = 18, color = colors.lime }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 18 18">
    <Path d="M4 9.5 L 7.5 13 L 14 5.5" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const LockIcon = ({ size = 18, color = colors.ink3 }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 18 18">
    <Rect x={3} y={8} width={12} height={8} rx={1.5} fill={color} />
    <Path d="M5.5 8 V 5.5 C 5.5 3 7 2 9 2 C 11 2 12.5 3 12.5 5.5 V 8" stroke={color} strokeWidth={1.5} fill="none" />
  </Svg>
);

export const ChevronIcon = ({ size = 16, color = colors.ink3, dir = 'right' }: { size?: number; color?: string; dir?: 'left'|'right'|'up'|'down' }) => {
  const rot = { right: 0, left: 180, down: 90, up: -90 }[dir];
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" style={{ transform: [{ rotate: `${rot}deg` }] }}>
      <Path d="M6 3 L 11 8 L 6 13" stroke={color} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};
