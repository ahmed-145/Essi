// Mattokki accusative allomorphs + indefinite + tense markers.
// PRD §6.4 (rule IDs) + Appendix B (phonological conditions).

import type { MorphologyRule } from '../types';

export const morphologyRules: MorphologyRule[] = [
  {
    id: 'ACC_ALLOMORPH_TI',
    suffix: '-ti',
    family: 'accusative',
    phonological_condition: 'After alveolar stops (d, t, n, l)',
    example: 'id → it-ti (man-ACC)',
    description_ar: 'بعد الحروف السنية د، ت، ن، ل',
    description_en: 'Attached after alveolar stops. d→t assimilation occurs.',
  },
  {
    id: 'ACC_ALLOMORPH_GI',
    suffix: '-gi',
    family: 'accusative',
    phonological_condition: 'After vowels and sonorants (except r)',
    example: 'buru → buru-gi (girl-ACC)',
    description_ar: 'بعد حروف العلة والأصوات المجلجلة',
    description_en: 'The most common accusative allomorph.',
  },
  {
    id: 'ACC_ALLOMORPH_JI',
    suffix: '-ji',
    family: 'accusative',
    phonological_condition: 'After palatal stops (c, ɟ)',
    example: 'kaj → kaj-ji',
    description_ar: 'بعد الحروف الحنكية',
    description_en: 'Attached after palatal stops.',
  },
  {
    id: 'ACC_ALLOMORPH_KI',
    suffix: '-ki',
    family: 'accusative',
    phonological_condition: 'Elsewhere — default',
    example: 'sa:b → sa:b-ki (cat-ACC)',
    description_ar: 'في باقي الحالات',
    description_en: 'Default elsewhere — used when no other condition matches.',
  },
  {
    id: 'INDEF_SUFFIX_WER',
    suffix: '-we:r',
    family: 'indefinite',
    phonological_condition: 'After most consonants and vowels',
    example: 'essi → essi-we:r (a water)',
    description_ar: 'لاحقة النكرة',
    description_en: 'Marks an indefinite noun ("a water"). Zero-marked = definite.',
  },
  {
    id: 'INDEF_BILABIAL_BER',
    suffix: '-be:r',
    family: 'indefinite',
    phonological_condition: 'After bilabials — assimilation of w→b',
    example: 'kab → kab-be:r',
    description_ar: 'بعد الحروف الشفوية، w تصبح b',
    description_en: 'Allomorph of -we:r after bilabial consonants.',
  },
  {
    id: 'COPULA_MA',
    suffix: '-ma',
    family: 'tense',
    phonological_condition: 'Attaches to predicate noun',
    example: 'ay kenzi-ma (I am Nubian)',
    description_ar: 'لاحقة الكينونة — لا يوجد فعل يكون في المطوكي',
    description_en: 'Mattokki has no "to be" verb — this suffix does the work.',
  },
  {
    id: 'FUTURE_CIRCUMFIX_BI',
    suffix: 'bi-…-r',
    family: 'tense',
    phonological_condition: 'Circumfix around verb root',
    example: 'jom → bi-jom-r (will hit)',
    description_ar: 'صيغة المستقبل — قبل وبعد الفعل',
    description_en: 'Future tense: prefix bi- + suffix -r around the verb stem.',
  },
];

export const ruleById = Object.fromEntries(morphologyRules.map((r) => [r.id, r]));
