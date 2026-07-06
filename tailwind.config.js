/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        nile: { DEFAULT: '#1B6CA8', deep: '#144F7C' },
        lime: { DEFAULT: '#F5F0E8', deep: '#EBE3D4' },
        ochre: { DEFAULT: '#D4A017', deep: '#B0830D' },
        terra: { DEFAULT: '#C2522D', deep: '#9A3F22' },
        lapis: '#2C4A8C',
        palm: '#4A7C59',
        sand: '#C8B89A',
        ink: { DEFAULT: '#1B1815', 2: '#3C342C', 3: '#7A6E60', 4: '#B7AC9C' },
      },
      fontFamily: {
        sans: ['Inter'],
        display: ['Fraunces'],
        coptic: ['SawardaNubian', 'NotoSansCoptic'],
        arab: ['Cairo'],
        mono: ['JetBrainsMono'],
      },
    },
  },
};
