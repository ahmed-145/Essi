// Font registry — referenced by app/_layout.tsx via useFonts().
//
// PRD §5.3 typography: Sawarda Nubian (Old Nubian script), Inter (Latin UI),
// Cairo (Arabic), Fraunces (display), JetBrains Mono (data/morpheme chips).
//
// Sawarda Nubian is a bespoke font (Hatim-Arbaab Eujayl / Union for Nubian
// Studies, unionfornubianstudies.org/projects/sawarda/) — not on Google Fonts,
// so it isn't bundled yet. Everything else below is real, freely-licensed
// (SIL Open Font License / Apache), and loaded via @expo-google-fonts.
//
// Coptic-script fallback ladder (PRD §6.2 — never show a broken/misread
// character): Sawarda (authentic, when added) > Noto Sans Coptic (correct
// Coptic glyphs, disambiguates ⲉⲥⲥⲓ from "Ecci") > plain Latin "essi" (last
// resort, if even Noto fails to load).

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { Cairo_400Regular, Cairo_700Bold } from '@expo-google-fonts/cairo';
import { NotoSansCoptic_400Regular } from '@expo-google-fonts/noto-sans-coptic';
import { Fraunces_600SemiBold, Fraunces_600SemiBold_Italic } from '@expo-google-fonts/fraunces';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';

// Keys match the fontFamily strings already used throughout the components —
// populating this map is the only change needed; no component code changes.
export const fontMap: Record<string, any> = {
  Inter: Inter_400Regular,
  'Inter-Medium': Inter_500Medium,
  'Inter-SemiBold': Inter_600SemiBold,
  'Inter-Bold': Inter_700Bold,
  Cairo: Cairo_400Regular,
  'Cairo-Bold': Cairo_700Bold,
  Fraunces: Fraunces_600SemiBold,
  'Fraunces-SemiBold': Fraunces_600SemiBold,
  'Fraunces-SemiBold-Italic': Fraunces_600SemiBold_Italic,
  NotoSansCoptic: NotoSansCoptic_400Regular,
  JetBrainsMono: JetBrainsMono_400Regular,
  // SawardaNubian intentionally absent — see note above. When the real file
  // is sourced: SawardaNubian: require('../assets/fonts/SawardaNubian.ttf').
};

export const sawardaLoaded = !!fontMap.SawardaNubian;
export const notoCopticLoaded = !!fontMap.NotoSansCoptic;

export type FontFamily = keyof typeof fontMap;
