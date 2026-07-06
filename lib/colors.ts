// Nubian palette — PRD §5.3
// Mirrors components/tokens.jsx in the design canvas.

export const colors = {
  nile:     '#1B6CA8',
  nileDeep: '#144F7C',
  lime:     '#F5F0E8',
  limeDeep: '#EBE3D4',
  ochre:    '#D4A017',
  ochreDeep:'#B0830D',
  terra:    '#C2522D',
  terraDeep:'#9A3F22',
  lapis:    '#2C4A8C',
  palm:     '#4A7C59',
  sand:     '#C8B89A',
  ink:      '#1B1815',
  ink2:     '#3C342C',
  ink3:     '#7A6E60',
  ink4:     '#B7AC9C',
  hairline: 'rgba(27,24,21,0.10)',
  hairline2:'rgba(27,24,21,0.06)',
} as const;

export type ColorKey = keyof typeof colors;
