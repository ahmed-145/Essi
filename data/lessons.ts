// MVP lesson definitions. Lesson 1 fully populated; later lessons stubbed.
// In production these are seeded from the Supabase 'lessons' + 'exercises' tables.

import type { Lesson } from '../types';

// Phase -1 prototype only: a synthetic chime standing in for real native-speaker
// audio (which doesn't exist yet — see PRD §13.5, audio comes from community
// recording/partnership, never scraped). Proves the playback pipeline end-to-end
// without shipping any real or fake Mattokki speech. Swapped for real CDN URLs
// once Track B (audio) delivers verified recordings.
const PLACEHOLDER_AUDIO = require('../assets/audio/placeholder-chime.wav');

export const lessons: Lesson[] = [
  {
    id: 'L1',
    phase: 1,
    index: 1,
    title: 'Who Am I?',
    title_ar: 'مين أنا؟',
    objectives: [
      'Recognise the personal-pronoun paradigm (ay, ir, tar)',
      'Use the copula suffix -ma to say "I am X"',
      'Notice that Mattokki has no grammatical gender',
    ],
    cultural_note:
      'Mattokki has no grammatical gender — unlike Arabic. The same pronouns refer to men, women, and objects. This reflects a more egalitarian linguistic structure.',
    cultural_note_ar:
      'مفيش جنس نحوي في المطوكي — مختلف عن العربي. نفس الضمائر بتستخدم للرجل والست والحاجة.',
    exercises: [
      {
        id: 'L1_E1',
        lesson_id: 'L1',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0001'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0001',
        options: [
          { ar: 'أنا', en: 'I', correct: true },
          { ar: 'هو',  en: 'he', correct: false },
        ],
      },
      {
        id: 'L1_E2',
        lesson_id: 'L1',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0001'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        prompt_mattokki: 'ay kenzi-ma',
        prompt_old_nubian: 'ⲁⲩ ⲕⲉⲛⳉⲓ-ⲙⲁ',
        prompt_arabic_transliteration: 'آي كينزي-ما',
        morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
        options: [
          { ar: 'أنا نوبي', en: 'I am Nubian', correct: true },
          { ar: 'هو نوبي',  en: 'He is Nubian', correct: false },
          { ar: 'إنت نوبي', en: 'You are Nubian', correct: false },
          { ar: 'أنا في الكنوز', en: 'I am in the treasures', correct: false },
        ],
      },
    ],
  },
  {
    id: 'L2', phase: 1, index: 2, title: 'My Family', title_ar: 'عيلتي',
    objectives: ['Kinship terms', 'Subject positioning'],
    cultural_note: 'Kinship is the centre of Nubian social life.',
    cultural_note_ar: 'العيلة هي أساس الحياة الاجتماعية النوبية.',
    exercises: [], // Populate similarly to L1
  },
  {
    id: 'L3', phase: 1, index: 3, title: 'The Indefinite', title_ar: 'النكرة',
    objectives: ['Indefinite suffix -we:r', 'Bilabial assimilation -be:r'],
    cultural_note: 'Animals in traditional Nubian agriculture.',
    cultural_note_ar: 'الحيوانات في الزراعة النوبية التقليدية.',
    exercises: [],
  },
  {
    id: 'L4', phase: 1, index: 4, title: 'The World Around Us', title_ar: 'العالم حوالينا',
    objectives: ['Zero-marked definiteness', 'Nile vocabulary: essi, ig, seer'],
    cultural_note: 'The Nile is the centre of Nubian civilization. The same word your grandmother used.',
    cultural_note_ar: 'النيل هو قلب الحضارة النوبية.',
    exercises: [],
  },
];

export const lessonById = Object.fromEntries(lessons.map((l) => [l.id, l]));
