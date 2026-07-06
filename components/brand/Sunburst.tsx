import React from 'react';
import Svg, { Line } from 'react-native-svg';

export function Sunburst({
  size = 200, color, rays = 24, innerR = 0.15, outerR = 0.5,
}: { size?: number; color: string; rays?: number; innerR?: number; outerR?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {Array.from({ length: rays }).map((_, i) => {
        const a = (i / rays) * Math.PI * 2;
        const x1 = 50 + Math.cos(a) * innerR * 100;
        const y1 = 50 + Math.sin(a) * innerR * 100;
        const x2 = 50 + Math.cos(a) * outerR * 100;
        const y2 = 50 + Math.sin(a) * outerR * 100;
        return <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.2} strokeLinecap="round" />;
      })}
    </Svg>
  );
}
