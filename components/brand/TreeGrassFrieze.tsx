import React from 'react';
import Svg, { Line, G } from 'react-native-svg';

export function TreeGrassFrieze({
  width = 360, height = 28, color = '#3C342C', opacity = 1,
}: { width?: number; height?: number; color?: string; opacity?: number }) {
  const unit = 30;
  const count = Math.ceil(width / unit);
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} opacity={opacity}>
      <Line x1={0} y1={height - 2} x2={width} y2={height - 2} stroke={color} strokeWidth={1} />
      {Array.from({ length: count }).map((_, i) => {
        const x = i * unit + unit / 2;
        const tree = i % 2 === 0;
        return (
          <G key={i}>
            {tree ? (
              <>
                <Line x1={x} y1={height - 2} x2={x} y2={6} stroke={color} strokeWidth={1.2} />
                <Line x1={x} y1={10} x2={x - 6} y2={4} stroke={color} strokeWidth={1.2} />
                <Line x1={x} y1={10} x2={x + 6} y2={4} stroke={color} strokeWidth={1.2} />
                <Line x1={x} y1={16} x2={x - 5} y2={11} stroke={color} strokeWidth={1.2} />
                <Line x1={x} y1={16} x2={x + 5} y2={11} stroke={color} strokeWidth={1.2} />
              </>
            ) : (
              <>
                <Line x1={x} y1={height - 2} x2={x} y2={14} stroke={color} strokeWidth={1.2} />
                <Line x1={x - 4} y1={height - 2} x2={x - 4} y2={18} stroke={color} strokeWidth={1.2} />
                <Line x1={x + 4} y1={height - 2} x2={x + 4} y2={18} stroke={color} strokeWidth={1.2} />
              </>
            )}
          </G>
        );
      })}
    </Svg>
  );
}
