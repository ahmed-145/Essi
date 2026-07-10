// MVP lesson definitions.
// L1 is fully populated with 12 exercises covering all 4 types (PRD §8 Feature 2).
// Lessons L2–L4 stubbed for Phase 4 content loading.
// In production these come from Supabase 'lessons' + 'exercises' tables.

import type { Lesson } from '../types';
import { lexById } from './lexicon';

// Phase -1 prototype only: a synthetic chime standing in for real native-speaker
// audio (PRD §13.5). Swapped for real CDN URLs once Track B delivers recordings.
const PLACEHOLDER_AUDIO = require('../assets/audio/placeholder-chime.wav');

const rawLessons: Lesson[] = [
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
      // ── E1 · Audio Match ────────────────────────────────────────────────
      {
        id: 'L1_E1',
        lesson_id: 'L1',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0001'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0001',
        options: [
          { ar: 'أنا', en: 'I', correct: true },
          { ar: 'هو / هي', en: 'he / she', correct: false },
          { ar: 'إنت', en: 'you', correct: false },
          { ar: 'إحنا', en: 'we', correct: false },
        ],
      },
      // ── E2 · MCQ ─────────────────────────────────────────────────────────
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
          { ar: 'هو نوبي', en: 'He is Nubian', correct: false },
          { ar: 'إنت نوبي', en: 'You are Nubian', correct: false },
          { ar: 'أنا في الكنوز', en: 'I am in the treasures', correct: false },
        ],
      },
      // ── E3 · Audio Match ─────────────────────────────────────────────────
      {
        id: 'L1_E3',
        lesson_id: 'L1',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0002'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0002',
        options: [
          { ar: 'إنت', en: 'you', correct: true },
          { ar: 'أنا', en: 'I', correct: false },
          { ar: 'هو / هي', en: 'he / she', correct: false },
          { ar: 'هم', en: 'they', correct: false },
        ],
      },
      // ── E4 · MCQ ─────────────────────────────────────────────────────────
      {
        id: 'L1_E4',
        lesson_id: 'L1',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0002'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        prompt_mattokki: 'ir kenzi-ma',
        prompt_old_nubian: 'ⲓⲣ ⲕⲉⲛⳉⲓ-ⲙⲁ',
        prompt_arabic_transliteration: 'إير كينزي-ما',
        morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
        options: [
          { ar: 'إنت نوبي', en: 'You are Nubian', correct: true },
          { ar: 'أنا نوبي', en: 'I am Nubian', correct: false },
          { ar: 'هو نوبي', en: 'He is Nubian', correct: false },
          { ar: 'هي نوبية', en: 'She is Nubian', correct: false },
        ],
      },
      // ── E5 · Word Arrange (SOV) ───────────────────────────────────────────
      {
        id: 'L1_E5',
        lesson_id: 'L1',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0010', 'xnz_0011', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'The man sees the girl.',
        prompt_ar: 'الراجل بيشوف البنت.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0010', surface: 'id' },
          { role: 'O', lexeme_id: 'xnz_0011', surface: 'buru' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal' },
        ],
      },
      // ── E6 · Audio Match ─────────────────────────────────────────────────
      {
        id: 'L1_E6',
        lesson_id: 'L1',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0003'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0003',
        options: [
          { ar: 'هو / هي', en: 'he / she / it', correct: true },
          { ar: 'أنا', en: 'I', correct: false },
          { ar: 'إنت', en: 'you', correct: false },
          { ar: 'إحنا', en: 'we', correct: false },
        ],
      },
      // ── E7 · MCQ ─────────────────────────────────────────────────────────
      {
        id: 'L1_E7',
        lesson_id: 'L1',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0003'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        prompt_mattokki: 'tar id-ma',
        prompt_old_nubian: 'ⲧⲁⲣ ⲓⲇ-ⲙⲁ',
        prompt_arabic_transliteration: 'تار إيد-ما',
        morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
        options: [
          { ar: 'هو راجل', en: 'He is a man', correct: true },
          { ar: 'أنا راجل', en: 'I am a man', correct: false },
          { ar: 'هي راجلة', en: 'She is a woman', correct: false },
          { ar: 'إنت راجل', en: 'You are a man', correct: false },
        ],
      },
      // ── E8 · Word Arrange (SOV) ───────────────────────────────────────────
      {
        id: 'L1_E8',
        lesson_id: 'L1',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0011', 'xnz_0042', 'xnz_0051'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'The girl hits the water.',
        prompt_ar: 'البنت بتضرب الماية.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0011', surface: 'buru' },
          { role: 'O', lexeme_id: 'xnz_0042', surface: 'essi' },
          { role: 'V', lexeme_id: 'xnz_0051', surface: 'jom' },
        ],
      },
      // ── E9 · Suffix Snap ─────────────────────────────────────────────────
      // Teaching the copula suffix -ma before accusative allomorphs (per PRD MVP scope)
      {
        id: 'L1_E9',
        lesson_id: 'L1',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0010'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0010',
        correct_suffix_rule_id: 'COPULA_MA',
        distractor_suffix_rule_ids: ['INDEF_SUFFIX_WER', 'FUTURE_CIRCUMFIX_BI'],
        expected_surface: 'id-ma',
      },
      // ── E10 · MCQ ────────────────────────────────────────────────────────
      {
        id: 'L1_E10',
        lesson_id: 'L1',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0012'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        prompt_mattokki: 'ay éen-ma',
        prompt_old_nubian: 'ⲁⲩ ⲉⲉⲛ-ⲙⲁ',
        prompt_arabic_transliteration: 'آي إين-ما',
        morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
        options: [
          { ar: 'أنا أم', en: 'I am a mother', correct: true },
          { ar: 'هو أب', en: 'He is a father', correct: false },
          { ar: 'أنا أب', en: 'I am a father', correct: false },
          { ar: 'إنت أم', en: 'You are a mother', correct: false },
        ],
      },
      // ── E11 · Suffix Snap ─────────────────────────────────────────────────
      {
        id: 'L1_E11',
        lesson_id: 'L1',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0011'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0011',
        correct_suffix_rule_id: 'COPULA_MA',
        distractor_suffix_rule_ids: ['INDEF_SUFFIX_WER', 'FUTURE_CIRCUMFIX_BI'],
        expected_surface: 'buru-ma',
      },
      // ── E12 · Audio Match (review) ────────────────────────────────────────
      {
        id: 'L1_E12',
        lesson_id: 'L1',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0042'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0042',
        options: [
          { ar: 'ماء', en: 'water', correct: true },
          { ar: 'نار', en: 'fire', correct: false },
          { ar: 'راجل', en: 'man', correct: false },
          { ar: 'بنت', en: 'girl', correct: false },
        ],
      },
    ],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // L2 — My Family  (Phase 1 · Lesson 2)
  // PRD: kinship terms, subject positioning. id, buru, éen, baab, wer-i, kege-di, assi
  // Abdel-Hafiz (1988), Massenbach (1933)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L2',
    phase: 1,
    index: 2,
    title: 'My Family',
    title_ar: 'عيلتي',
    objectives: [
      'Name immediate family members in Mattokki',
      'Use the copula suffix -ma to identify family roles',
      'Practice SOV subject positioning with kinship nouns',
    ],
    cultural_note:
      'Kinship is the centre of Nubian social life. In traditional Kenzi villages, the extended family (the daabia) lived in connected courtyard houses around a shared well. After the 1964 displacement, rebuilding these kinship networks in Cairo and Aswan became the most powerful act of cultural resistance.',
    cultural_note_ar:
      'العيلة هي قلب الحياة الاجتماعية النوبية. في القرى الكنزية التقليدية، العيلة الممتدة كانت بتعيش في بيوت الحوش المتجاورة حوالين بئر مشتركة.',
    exercises: [
      // ── L2_E1 · Audio Match — id (man / father figure) ─────────────────────
      {
        id: 'L2_E1',
        lesson_id: 'L2',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0010'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0010',
        options: [
          { ar: 'راجل', en: 'man / person', correct: true },
          { ar: 'بنت', en: 'girl', correct: false },
          { ar: 'أم', en: 'mother', correct: false },
          { ar: 'جد', en: 'grandfather', correct: false },
        ],
      },
      // ── L2_E2 · Audio Match — éen (mother) ────────────────────────────────
      {
        id: 'L2_E2',
        lesson_id: 'L2',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0012'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0012',
        options: [
          { ar: 'أم', en: 'mother', correct: true },
          { ar: 'أب', en: 'father', correct: false },
          { ar: 'جد', en: 'grandfather', correct: false },
          { ar: 'ولد', en: 'boy / son', correct: false },
        ],
      },
      // ── L2_E3 · Audio Match — baab (father) ───────────────────────────────
      {
        id: 'L2_E3',
        lesson_id: 'L2',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0013'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0013',
        options: [
          { ar: 'أب', en: 'father', correct: true },
          { ar: 'أم', en: 'mother', correct: false },
          { ar: 'راجل', en: 'man', correct: false },
          { ar: 'عمة', en: 'aunt', correct: false },
        ],
      },
      // ── L2_E4 · MCQ — ay éen-ma (I am a mother) ──────────────────────────
      {
        id: 'L2_E4',
        lesson_id: 'L2',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0012'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        prompt_mattokki: 'ay éen-ma',
        prompt_old_nubian: 'ⲁⲩ ⲉⲉⲛ-ⲙⲁ',
        prompt_arabic_transliteration: 'آي إين-ما',
        morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
        options: [
          { ar: 'أنا أم', en: 'I am a mother', correct: true },
          { ar: 'هي أم', en: 'She is a mother', correct: false },
          { ar: 'أنا أب', en: 'I am a father', correct: false },
          { ar: 'إنت أم', en: 'You are a mother', correct: false },
        ],
      },
      // ── L2_E5 · MCQ — tar baab-ma (he is a father) ───────────────────────
      {
        id: 'L2_E5',
        lesson_id: 'L2',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0003', 'xnz_0013'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        prompt_mattokki: 'tar baab-ma',
        prompt_old_nubian: 'ⲧⲁⲣ ⲃⲁⲁⲃ-ⲙⲁ',
        prompt_arabic_transliteration: 'تار باب-ما',
        morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
        options: [
          { ar: 'هو أب', en: 'He is a father', correct: true },
          { ar: 'هي أم', en: 'She is a mother', correct: false },
          { ar: 'أنا أب', en: 'I am a father', correct: false },
          { ar: 'هو ولد', en: 'He is a boy', correct: false },
        ],
      },
      // ── L2_E6 · MCQ — tar buru-ma (she is a girl) ────────────────────────
      {
        id: 'L2_E6',
        lesson_id: 'L2',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0003', 'xnz_0011'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        prompt_mattokki: 'tar buru-ma',
        prompt_old_nubian: 'ⲧⲁⲣ ⲃⲩⲣⲩ-ⲙⲁ',
        prompt_arabic_transliteration: 'تار بورو-ما',
        morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
        options: [
          { ar: 'هي بنت', en: 'She is a girl', correct: true },
          { ar: 'هو ولد', en: 'He is a boy', correct: false },
          { ar: 'هي أم', en: 'She is a mother', correct: false },
          { ar: 'إنت بنت', en: 'You are a girl', correct: false },
        ],
      },
      // ── L2_E7 · Word Arrange — ay baab nal (I see father — SOV) ───────────
      {
        id: 'L2_E7',
        lesson_id: 'L2',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0013', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'I see father',
        prompt_ar: 'أنا شايف أبويا',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0001', surface: 'ay' },
          { role: 'O', lexeme_id: 'xnz_0013', surface: 'baab' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal' },
        ],
      },
      // ── L2_E8 · Word Arrange — ir éen nal (you see mother — SOV) ──────────
      {
        id: 'L2_E8',
        lesson_id: 'L2',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0002', 'xnz_0012', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'You see mother',
        prompt_ar: 'إنت شايف أمك',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0002', surface: 'ir' },
          { role: 'O', lexeme_id: 'xnz_0012', surface: 'éen' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal' },
        ],
      },
      // ── L2_E9 · Audio Match — buru (girl / daughter) ──────────────────────
      {
        id: 'L2_E9',
        lesson_id: 'L2',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0011'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0011',
        options: [
          { ar: 'بنت', en: 'girl / daughter', correct: true },
          { ar: 'ولد', en: 'boy / son', correct: false },
          { ar: 'أم', en: 'mother', correct: false },
          { ar: 'عمة', en: 'aunt', correct: false },
        ],
      },
      // ── L2_E10 · MCQ — ir kege-di-ma (you are grandfather) ───────────────
      {
        id: 'L2_E10',
        lesson_id: 'L2',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0002', 'xnz_0021'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        prompt_mattokki: 'ir kege-di-ma',
        prompt_old_nubian: 'ⲓⲣ ⲕⲉⲅⲉ-ⲇⲓ-ⲙⲁ',
        prompt_arabic_transliteration: 'إر كيجيدي-ما',
        morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
        options: [
          { ar: 'إنت جد', en: 'You are a grandfather', correct: true },
          { ar: 'هو جد', en: 'He is a grandfather', correct: false },
          { ar: 'أنا جد', en: 'I am a grandfather', correct: false },
          { ar: 'إنت أب', en: 'You are a father', correct: false },
        ],
      },
      // ── L2_E11 · Suffix Snap — kege-di-ma (grandfather + copula) ─────────
      {
        id: 'L2_E11',
        lesson_id: 'L2',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0021'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0021',
        correct_suffix_rule_id: 'COPULA_MA',
        distractor_suffix_rule_ids: ['INDEF_SUFFIX_WER', 'ACC_ALLOMORPH_GI'],
        expected_surface: 'kege-di-ma',
      },
      // ── L2_E12 · Suffix Snap — baab-ma (father + copula) ─────────────────
      {
        id: 'L2_E12',
        lesson_id: 'L2',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0013'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0013',
        correct_suffix_rule_id: 'COPULA_MA',
        distractor_suffix_rule_ids: ['INDEF_SUFFIX_WER', 'ACC_ALLOMORPH_GI'],
        expected_surface: 'baab-ma',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L3 — The Indefinite  (Phase 1 · Lesson 3)
  // PRD: indefinite suffix -we:r after most consonants, -be:r after bilabials.
  // First lesson that activates the INDEF_SUFFIX_WER and INDEF_BILABIAL_BER SRS rules.
  // Animals in traditional Nubian agriculture (Massenbach 1933).
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L3',
    phase: 1,
    index: 3,
    title: 'The Indefinite',
    title_ar: 'النكرة',
    objectives: [
      'Apply -we:r to mark indefinite nouns (\"a donkey\", \"a cow\")',
      'Recognise the bilabial allomorph -be:r after words ending in b, m, or w',
      'Understand the contrast: zero-marked = definite, -we:r = indefinite',
    ],
    cultural_note:
      'Donkeys, cows, and goats were the economic backbone of Kenzi farming along the Nile banks. After the 1964 displacement, most families lost their animals and farmland to Lake Nasser overnight. Preserving these words preserves economic memory.',
    cultural_note_ar:
      'الحمير والبقر والغنم كانوا أساس الاقتصاد الزراعي الكنزي على ضفاف النيل. بعد تهجير 1964، معظم العيلات خسروا حيواناتهم وأراضيهم تحت مياه بحيرة ناصر بين ليلة وضحاها.',
    exercises: [
      // ── L3_E1 · Audio Match — darbad (donkey) ─────────────────────────────
      {
        id: 'L3_E1',
        lesson_id: 'L3',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0030'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0030',
        options: [
          { ar: 'حمار', en: 'donkey', correct: true },
          { ar: 'بقرة', en: 'cow', correct: false },
          { ar: 'كلب', en: 'dog', correct: false },
          { ar: 'خروف', en: 'sheep', correct: false },
        ],
      },
      // ── L3_E2 · Audio Match — ewre (cow) ──────────────────────────────────
      {
        id: 'L3_E2',
        lesson_id: 'L3',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0031'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0031',
        options: [
          { ar: 'بقرة', en: 'cow', correct: true },
          { ar: 'حمار', en: 'donkey', correct: false },
          { ar: 'عجل', en: 'calf', correct: false },
          { ar: 'خروف', en: 'sheep', correct: false },
        ],
      },
      // ── L3_E3 · MCQ — darbad-we:r (a donkey — indefinite) ────────────────
      {
        id: 'L3_E3',
        lesson_id: 'L3',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0030'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        prompt_mattokki: 'darbad-we:r',
        prompt_old_nubian: 'ⲇⲁⲣⲃⲁⲇ-ⲟⲩⲏⲣ',
        prompt_arabic_transliteration: 'دارباد-ويير',
        morpheme_highlights: [{ surface: '-we:r', rule_id: 'INDEF_SUFFIX_WER' }],
        options: [
          { ar: 'حمار (نكرة)', en: 'a donkey (indefinite)', correct: true },
          { ar: 'الحمار (معرفة)', en: 'the donkey (definite)', correct: false },
          { ar: 'حمارين', en: 'two donkeys', correct: false },
          { ar: 'دون حمير', en: 'without donkeys', correct: false },
        ],
      },
      // ── L3_E4 · MCQ — sa:b-we:r (a dog) ─────────────────────────────────
      {
        id: 'L3_E4',
        lesson_id: 'L3',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0033'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        prompt_mattokki: 'sa:b-we:r',
        prompt_old_nubian: 'ⲥⲁⲁⲃ-ⲟⲩⲏⲣ',
        prompt_arabic_transliteration: 'ساب-ويير',
        morpheme_highlights: [{ surface: '-we:r', rule_id: 'INDEF_SUFFIX_WER' }],
        options: [
          { ar: 'كلب (نكرة)', en: 'a dog (indefinite)', correct: true },
          { ar: 'الكلب (معرفة)', en: 'the dog (definite)', correct: false },
          { ar: 'كلاب كتير', en: 'many dogs', correct: false },
          { ar: 'كلب وبقرة', en: 'dog and cow', correct: false },
        ],
      },
      // ── L3_E5 · Suffix Snap — darbad + -we:r ─────────────────────────────
      {
        id: 'L3_E5',
        lesson_id: 'L3',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0030'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0030',
        correct_suffix_rule_id: 'INDEF_SUFFIX_WER',
        distractor_suffix_rule_ids: ['COPULA_MA', 'INDEF_BILABIAL_BER'],
        expected_surface: 'darbad-we:r',
      },
      // ── L3_E6 · Suffix Snap — ewre + -we:r ───────────────────────────────
      {
        id: 'L3_E6',
        lesson_id: 'L3',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0031'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0031',
        correct_suffix_rule_id: 'INDEF_SUFFIX_WER',
        distractor_suffix_rule_ids: ['COPULA_MA', 'INDEF_BILABIAL_BER'],
        expected_surface: 'ewre-we:r',
      },
      // ── L3_E7 · MCQ — gur-be:r (a calf — bilabial assimilation) ──────────
      // KEY: gur ends in -r but gur itself preceded by a consonant cluster ending in bilabial
      // In Abdel-Hafiz: after roots with bilabial consonants or nasal resonant, -be:r used.
      // For teaching: gur-be:r is the form used per Massenbach 1933 community recordings.
      {
        id: 'L3_E7',
        lesson_id: 'L3',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0034'], rule_ids: ['INDEF_BILABIAL_BER'], primary_layer: 'morphological' },
        prompt_mattokki: 'gur-be:r',
        prompt_old_nubian: 'ⲅⲩⲣ-ⲃⲏⲣ',
        prompt_arabic_transliteration: 'جور-بيير',
        morpheme_highlights: [{ surface: '-be:r', rule_id: 'INDEF_BILABIAL_BER' }],
        options: [
          { ar: 'عجل (نكرة)', en: 'a calf (indefinite)', correct: true },
          { ar: 'العجل (معرفة)', en: 'the calf (definite)', correct: false },
          { ar: 'عجل كبير', en: 'big calf', correct: false },
          { ar: 'جور-ويير هو الصح', en: 'gur-we:r is correct', correct: false },
        ],
      },
      // ── L3_E8 · MCQ — contrast: darbad vs darbad-we:r ────────────────────
      {
        id: 'L3_E8',
        lesson_id: 'L3',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0030'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        prompt_mattokki: 'darbad',
        prompt_old_nubian: 'ⲇⲁⲣⲃⲁⲇ',
        prompt_arabic_transliteration: 'دارباد',
        morpheme_highlights: [],
        options: [
          { ar: 'الحمار (معرفة — بدون لاحقة)', en: 'the donkey (definite — no suffix)', correct: true },
          { ar: 'حمار (نكرة)', en: 'a donkey (indefinite)', correct: false },
          { ar: 'مش كلمة مطوكي', en: 'not a Mattokki word', correct: false },
          { ar: 'حمارين اتنين', en: 'two donkeys', correct: false },
        ],
      },
      // ── L3_E9 · Suffix Snap — kaj + -we:r ────────────────────────────────
      {
        id: 'L3_E9',
        lesson_id: 'L3',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0032'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0032',
        correct_suffix_rule_id: 'INDEF_SUFFIX_WER',
        distractor_suffix_rule_ids: ['COPULA_MA', 'INDEF_BILABIAL_BER'],
        expected_surface: 'kaj-we:r',
      },
      // ── L3_E10 · Audio Match — sa:b (dog) ────────────────────────────────
      {
        id: 'L3_E10',
        lesson_id: 'L3',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0033'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0033',
        options: [
          { ar: 'كلب', en: 'dog', correct: true },
          { ar: 'حمار', en: 'donkey', correct: false },
          { ar: 'بقرة', en: 'cow', correct: false },
          { ar: 'خروف', en: 'sheep', correct: false },
        ],
      },
      // ── L3_E11 · Suffix Snap — sa:b + -we:r ──────────────────────────────
      {
        id: 'L3_E11',
        lesson_id: 'L3',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0033'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0033',
        correct_suffix_rule_id: 'INDEF_SUFFIX_WER',
        distractor_suffix_rule_ids: ['COPULA_MA', 'INDEF_BILABIAL_BER'],
        expected_surface: 'sa:b-we:r',
      },
      // ── L3_E12 · MCQ — ewre-we:r (a cow) — review ────────────────────────
      {
        id: 'L3_E12',
        lesson_id: 'L3',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0031'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        prompt_mattokki: 'ewre-we:r',
        prompt_old_nubian: 'ⲉⲟⲩⲣⲉ-ⲟⲩⲏⲣ',
        prompt_arabic_transliteration: 'إوري-ويير',
        morpheme_highlights: [{ surface: '-we:r', rule_id: 'INDEF_SUFFIX_WER' }],
        options: [
          { ar: 'بقرة (نكرة)', en: 'a cow (indefinite)', correct: true },
          { ar: 'البقرة (معرفة)', en: 'the cow (definite)', correct: false },
          { ar: 'حمار (نكرة)', en: 'a donkey (indefinite)', correct: false },
          { ar: 'خروف (نكرة)', en: 'a sheep (indefinite)', correct: false },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L4 — The World Around Us  (Phase 1 · Lesson 4)
  // PRD: zero-marked definiteness vs indefinite. Nile vocabulary: essi, ig, esked, seer, aman
  // Cultural frame: the Nile as the centre of Nubian civilization.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L4',
    phase: 1,
    index: 4,
    title: 'The World Around Us',
    title_ar: 'العالم حوالينا',
    objectives: [
      'Learn Nile valley natural vocabulary: essi, ig, seer, esked, aman',
      'Consolidate the zero-marked definite vs -we:r indefinite contrast',
      'Practice audio recognition with the sounds of the Nubian natural world',
    ],
    cultural_note:
      'The Nile is not merely a river to the Nubian people — it is the source of all life, the boundary between the living and the dead, and the cultural artery that connected 3,000 years of Kenzi civilization. When Lake Nasser flooded the homeland, it did not just drown land. It drowned the vocabulary of daily life — the names of river banks, fish, water channels, and flood seasons. Saying "essi" today is an act of remembrance.',
    cultural_note_ar:
      'النيل مش مجرد نهر بالنسبة للنوبيين — هو أصل الحياة وحدود بين الحياة والموت. لما بحيرة ناصر غرقت المنطقة، غرق معاها مفردات الحياة اليومية كلها.',
    exercises: [
      // ── L4_E1 · Audio Match — essi (water) ────────────────────────────────
      {
        id: 'L4_E1',
        lesson_id: 'L4',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0042'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0042',
        options: [
          { ar: 'ماء', en: 'water', correct: true },
          { ar: 'نار', en: 'fire', correct: false },
          { ar: 'شمس', en: 'sun', correct: false },
          { ar: 'حجر', en: 'stone', correct: false },
        ],
      },
      // ── L4_E2 · Audio Match — ig (fire) ───────────────────────────────────
      {
        id: 'L4_E2',
        lesson_id: 'L4',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0043'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0043',
        options: [
          { ar: 'نار', en: 'fire', correct: true },
          { ar: 'ماء', en: 'water', correct: false },
          { ar: 'حجر', en: 'stone', correct: false },
          { ar: 'سما', en: 'sky', correct: false },
        ],
      },
      // ── L4_E3 · Audio Match — seer (stone) ────────────────────────────────
      {
        id: 'L4_E3',
        lesson_id: 'L4',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0044'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0044',
        options: [
          { ar: 'حجر', en: 'stone', correct: true },
          { ar: 'ماء', en: 'water', correct: false },
          { ar: 'نار', en: 'fire', correct: false },
          { ar: 'شمس', en: 'sun', correct: false },
        ],
      },
      // ── L4_E4 · MCQ — essi-we:r (a water — indefinite) ───────────────────
      {
        id: 'L4_E4',
        lesson_id: 'L4',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0042'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        prompt_mattokki: 'essi-we:r',
        prompt_old_nubian: 'ⲉⲥⲥⲓ-ⲟⲩⲏⲣ',
        prompt_arabic_transliteration: 'إيسي-ويير',
        morpheme_highlights: [{ surface: '-we:r', rule_id: 'INDEF_SUFFIX_WER' }],
        options: [
          { ar: 'ماء (نكرة)', en: 'a water (indefinite)', correct: true },
          { ar: 'الماء (معرفة)', en: 'the water (definite)', correct: false },
          { ar: 'مياه كتير', en: 'a lot of water', correct: false },
          { ar: 'بدون ماء', en: 'without water', correct: false },
        ],
      },
      // ── L4_E5 · MCQ — ig-we:r (a fire) ──────────────────────────────────
      {
        id: 'L4_E5',
        lesson_id: 'L4',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0043'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        prompt_mattokki: 'ig-we:r',
        prompt_old_nubian: 'ⲓⲅ-ⲟⲩⲏⲣ',
        prompt_arabic_transliteration: 'إج-ويير',
        morpheme_highlights: [{ surface: '-we:r', rule_id: 'INDEF_SUFFIX_WER' }],
        options: [
          { ar: 'نار (نكرة)', en: 'a fire (indefinite)', correct: true },
          { ar: 'النار (معرفة)', en: 'the fire (definite)', correct: false },
          { ar: 'ماء (نكرة)', en: 'a water (indefinite)', correct: false },
          { ar: 'حجر (نكرة)', en: 'a stone (indefinite)', correct: false },
        ],
      },
      // ── L4_E6 · Suffix Snap — seer + -we:r ──────────────────────────────
      {
        id: 'L4_E6',
        lesson_id: 'L4',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0044'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0044',
        correct_suffix_rule_id: 'INDEF_SUFFIX_WER',
        distractor_suffix_rule_ids: ['COPULA_MA', 'INDEF_BILABIAL_BER'],
        expected_surface: 'seer-we:r',
      },
      // ── L4_E7 · Suffix Snap — ig + -we:r ────────────────────────────────
      {
        id: 'L4_E7',
        lesson_id: 'L4',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0043'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0043',
        correct_suffix_rule_id: 'INDEF_SUFFIX_WER',
        distractor_suffix_rule_ids: ['COPULA_MA', 'INDEF_BILABIAL_BER'],
        expected_surface: 'ig-we:r',
      },
      // ── L4_E8 · Audio Match — esked (sun) ────────────────────────────────
      {
        id: 'L4_E8',
        lesson_id: 'L4',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0045'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0045',
        options: [
          { ar: 'شمس', en: 'sun', correct: true },
          { ar: 'سما', en: 'sky', correct: false },
          { ar: 'نار', en: 'fire', correct: false },
          { ar: 'ماء', en: 'water', correct: false },
        ],
      },
      // ── L4_E9 · MCQ — esked-ma (it is the sun — copula review) ──────────
      {
        id: 'L4_E9',
        lesson_id: 'L4',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0045'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
        prompt_mattokki: 'esked-ma',
        prompt_old_nubian: 'ⲉⲥⲕⲉⲇ-ⲙⲁ',
        prompt_arabic_transliteration: 'إيسكيد-ما',
        morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
        options: [
          { ar: 'هي الشمس', en: 'It is the sun', correct: true },
          { ar: 'هي نار', en: 'It is fire', correct: false },
          { ar: 'شمس (نكرة)', en: 'a sun (indefinite)', correct: false },
          { ar: 'اتكسرت الشمس', en: 'the sun broke', correct: false },
        ],
      },
      // ── L4_E10 · Word Arrange — ay essi nal (I see water — SOV) ──────────
      {
        id: 'L4_E10',
        lesson_id: 'L4',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0042', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'I see water',
        prompt_ar: 'أنا شايف ماء',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0001', surface: 'ay' },
          { role: 'O', lexeme_id: 'xnz_0042', surface: 'essi' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal' },
        ],
      },
      // ── L4_E11 · Suffix Snap — essi + -we:r ─────────────────────────────
      {
        id: 'L4_E11',
        lesson_id: 'L4',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0042'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0042',
        correct_suffix_rule_id: 'INDEF_SUFFIX_WER',
        distractor_suffix_rule_ids: ['COPULA_MA', 'INDEF_BILABIAL_BER'],
        expected_surface: 'essi-we:r',
      },
      // ── L4_E12 · MCQ — seer-we:r (a stone) — review ─────────────────────
      {
        id: 'L4_E12',
        lesson_id: 'L4',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0044'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        prompt_mattokki: 'seer-we:r',
        prompt_old_nubian: 'ⲥⲉⲉⲣ-ⲟⲩⲏⲣ',
        prompt_arabic_transliteration: 'سيير-ويير',
        morpheme_highlights: [{ surface: '-we:r', rule_id: 'INDEF_SUFFIX_WER' }],
        options: [
          { ar: 'حجر (نكرة)', en: 'a stone (indefinite)', correct: true },
          { ar: 'الحجر (معرفة)', en: 'the stone (definite)', correct: false },
          { ar: 'نار (نكرة)', en: 'a fire (indefinite)', correct: false },
          { ar: 'ماء (نكرة)', en: 'a water (indefinite)', correct: false },
        ],
      },
    ],
  },
  {
    id: 'L5',
    phase: 2,
    index: 5,
    title: 'Question Words',
    title_ar: 'أدوات الاستفهام',
    objectives: [
      'Ask questions using who (nay), what (min), and where (sido)',
      'Construct simple question sentences in Mattokki',
      'Recognise that questions maintain the SOV order',
    ],
    cultural_note:
      'In Nubian villages, greetings and inquiries about well-being are extended and poetic. Asking about family, health, and neighbors is an essential social ritual before any business is discussed.',
    cultural_note_ar:
      'في القرى النوبية، السؤال عن الحال والترحيب بيكون طويل وشاعري ومهم جداً.',
    exercises: [
      {
        id: 'L5_E1',
        lesson_id: 'L5',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0001'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0001',
        options: [
          { ar: 'أنا', en: 'I', correct: true },
          { ar: 'إنت', en: 'you', correct: false },
          { ar: 'هو', en: 'he', correct: false },
          { ar: 'مين', en: 'who', correct: false },
        ],
      },
      {
        id: 'L5_E2',
        lesson_id: 'L5',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0002'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ir sido ju?',
        prompt_old_nubian: 'ⲓⲣ ⲥⲓⲇⲟ ⳝⲟⲩ?',
        prompt_arabic_transliteration: 'إير سيدو جو؟',
        morpheme_highlights: [],
        options: [
          { ar: 'إنت رايح فين؟', en: 'Where are you going?', correct: true },
          { ar: 'أنا رايح فين؟', en: 'Where am I going?', correct: false },
          { ar: 'مين اللي جه؟', en: 'Who came?', correct: false },
          { ar: 'إنت بتعمل إيه؟', en: 'What are you doing?', correct: false },
        ],
      },
      {
        id: 'L5_E3',
        lesson_id: 'L5',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0003'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'tar nay-la?',
        prompt_old_nubian: 'ⲧⲁⲣ ⲛⲁⲓ̈-ⲗⲁ?',
        prompt_arabic_transliteration: 'تار ناي-لا؟',
        morpheme_highlights: [],
        options: [
          { ar: 'من هو؟', en: 'Who is he?', correct: true },
          { ar: 'من أنا؟', en: 'Who am I?', correct: false },
          { ar: 'من أنت؟', en: 'Who are you?', correct: false },
          { ar: 'أين هو؟', en: 'Where is he?', correct: false },
        ],
      },
      {
        id: 'L5_E4',
        lesson_id: 'L5',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0002', 'xnz_0042', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'Do you see water?',
        prompt_ar: 'هل ترى ماء؟',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0002', surface: 'ir' },
          { role: 'O', lexeme_id: 'xnz_0042', surface: 'essi' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal' },
        ],
      },
      {
        id: 'L5_E5',
        lesson_id: 'L5',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0010'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'id-ma?',
        prompt_old_nubian: 'ⲓⲇ-ⲙⲁ?',
        prompt_arabic_transliteration: 'إيد-ما؟',
        morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
        options: [
          { ar: 'هل هو رجل؟', en: 'Is he a man?', correct: true },
          { ar: 'هل هي بنت؟', en: 'Is she a girl?', correct: false },
          { ar: 'رجل طيب', en: 'A good man', correct: false },
          { ar: 'رجل (نكرة)', en: 'a man (indefinite)', correct: false },
        ],
      },
      {
        id: 'L5_E6',
        lesson_id: 'L5',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0042'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0042',
        options: [
          { ar: 'ماء', en: 'water', correct: true },
          { ar: 'نار', en: 'fire', correct: false },
          { ar: 'شمس', en: 'sun', correct: false },
          { ar: 'سما', en: 'sky', correct: false },
        ],
      },
    ],
  },
  {
    id: 'L6',
    phase: 2,
    index: 6,
    title: 'Direct Objects (Accusative)',
    title_ar: 'المفعول به (حالة النصب)',
    objectives: [
      'Recognise the accusative case suffix -ka / -ga',
      'Observe phonological allomorphic variations (-ti after alveolar stops)',
      'Construct sentences with explicit direct object markings',
    ],
    cultural_note:
      'The Mattokki grammatical structure is rich in suffixes. Every case role (nominative, accusative, genitive) is explicitly marked. This allows flexible phrasing, though SOV remains the classical norm.',
    cultural_note_ar:
      'القواعد النوبية غنية باللواحق. كل حالة إعرابية ليها لاحقة مخصصة.',
    exercises: [
      {
        id: 'L6_E1',
        lesson_id: 'L6',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0010'], rule_ids: ['ACC_ALLOMORPH_TI'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0010',
        correct_suffix_rule_id: 'ACC_ALLOMORPH_TI',
        distractor_suffix_rule_ids: ['ACC_ALLOMORPH_GI', 'COPULA_MA'],
        expected_surface: 'it-ti',
      },
      {
        id: 'L6_E2',
        lesson_id: 'L6',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0010', 'xnz_0051'], rule_ids: ['ACC_ALLOMORPH_TI'], primary_layer: 'morphological' },
        prompt_mattokki: 'ay it-ti jomr',
        prompt_old_nubian: 'ⲁⲩ ⲓⲧ-ⲧⲓ ⳝⲟⲙⲣ',
        prompt_arabic_transliteration: 'آي إت-تي جومر',
        morpheme_highlights: [{ surface: '-ti', rule_id: 'ACC_ALLOMORPH_TI' }],
        options: [
          { ar: 'أنا بضرب الراجل', en: 'I hit the man', correct: true },
          { ar: 'الراجل بيضربني', en: 'The man hits me', correct: false },
          { ar: 'أنا راجل', en: 'I am a man', correct: false },
          { ar: 'أنا شفت الراجل', en: 'I saw the man', correct: false },
        ],
      },
      {
        id: 'L6_E3',
        lesson_id: 'L6',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0011'], rule_ids: ['ACC_ALLOMORPH_GI'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0011',
        correct_suffix_rule_id: 'ACC_ALLOMORPH_GI',
        distractor_suffix_rule_ids: ['ACC_ALLOMORPH_TI', 'COPULA_MA'],
        expected_surface: 'buru-gi',
      },
      {
        id: 'L6_E4',
        lesson_id: 'L6',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0011', 'xnz_0050'], rule_ids: ['ACC_ALLOMORPH_GI'], primary_layer: 'morphological' },
        prompt_mattokki: 'ay buru-gi nalr',
        prompt_old_nubian: 'ⲁⲩ ⲃⲩⲣⲩ-ⲅⲓ ⲛⲁⲗⲣ',
        prompt_arabic_transliteration: 'آي بورو-جي نالر',
        morpheme_highlights: [{ surface: '-gi', rule_id: 'ACC_ALLOMORPH_GI' }],
        options: [
          { ar: 'أنا بشوف البنت', en: 'I see the girl', correct: true },
          { ar: 'البنت بتشوفني', en: 'The girl sees me', correct: false },
          { ar: 'أنا بنت', en: 'I am a girl', correct: false },
          { ar: 'أنا ضربت البنت', en: 'I hit the girl', correct: false },
        ],
      },
      {
        id: 'L6_E5',
        lesson_id: 'L6',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0003', 'xnz_0042', 'xnz_0050'], rule_ids: ['ACC_ALLOMORPH_GI'], primary_layer: 'morphological' },
        prompt_en: 'He sees the water.',
        prompt_ar: 'هو يرى الماء.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0003', surface: 'tar' },
          { role: 'O', lexeme_id: 'xnz_0042', surface: 'essi-gi' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal' },
        ],
      },
      {
        id: 'L6_E6',
        lesson_id: 'L6',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0042'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0042',
        options: [
          { ar: 'ماء', en: 'water', correct: true },
          { ar: 'نار', en: 'fire', correct: false },
          { ar: 'حجر', en: 'stone', correct: false },
          { ar: 'سما', en: 'sky', correct: false },
        ],
      },
    ],
  },
  {
    id: 'L7',
    phase: 2,
    index: 7,
    title: 'Plurals',
    title_ar: 'الجمع',
    objectives: [
      'Identify the plural suffix -gu / -rgu',
      'Observe plural agreement in noun phrases',
      'Practice pluralising pronouns and nouns',
    ],
    cultural_note:
      'Collective identity is central to Nubian society. Expressions of cooperation, like "faza" (community support in construction and harvests), are prominent, and plurals reflect a culture built on togetherness.',
    cultural_note_ar:
      'الهوية الجماعية جزء أساسي في الثقافة النوبية. التعاون والمشاركة بيظهروا في اللغة وتصريفات الجمع.',
    exercises: [
      {
        id: 'L7_E1',
        lesson_id: 'L7',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0010'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'id-gu',
        prompt_old_nubian: 'ⲓⲇ-ⲅⲩ',
        prompt_arabic_transliteration: 'إيد-جو',
        morpheme_highlights: [],
        options: [
          { ar: 'رجال', en: 'men', correct: true },
          { ar: 'راجل', en: 'a man', correct: false },
          { ar: 'بنات', en: 'girls', correct: false },
          { ar: 'أمهات', en: 'mothers', correct: false },
        ],
      },
      {
        id: 'L7_E2',
        lesson_id: 'L7',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0011'], rule_ids: [], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0011',
        correct_suffix_rule_id: 'COPULA_MA',
        distractor_suffix_rule_ids: ['ACC_ALLOMORPH_TI', 'INDEF_BILABIAL_BER'],
        expected_surface: 'buru-ma',
      },
      {
        id: 'L7_E3',
        lesson_id: 'L7',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0011'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'buru-gu',
        prompt_old_nubian: 'ⲃⲩⲣⲩ-ⲅⲩ',
        prompt_arabic_transliteration: 'بورو-جو',
        morpheme_highlights: [],
        options: [
          { ar: 'بنات', en: 'girls', correct: true },
          { ar: 'بنت', en: 'a girl', correct: false },
          { ar: 'رجال', en: 'men', correct: false },
          { ar: 'آباء', en: 'fathers', correct: false },
        ],
      },
      {
        id: 'L7_E4',
        lesson_id: 'L7',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0023', 'xnz_0011', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'We see girls.',
        prompt_ar: 'نحن نرى بنات.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0023', surface: 'ar' },
          { role: 'O', lexeme_id: 'xnz_0011', surface: 'buru-gu-gi' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal' },
        ],
      },
      {
        id: 'L7_E5',
        lesson_id: 'L7',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0042'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'essi-gu',
        prompt_old_nubian: 'ⲉⲥⲥⲓ-ⲅⲩ',
        prompt_arabic_transliteration: 'إيسي-جو',
        morpheme_highlights: [],
        options: [
          { ar: 'مياه (جمع)', en: 'waters', correct: true },
          { ar: 'ماء (مفرد)', en: 'water', correct: false },
          { ar: 'نار', en: 'fire', correct: false },
          { ar: 'سماوات', en: 'skies', correct: false },
        ],
      },
      {
        id: 'L7_E6',
        lesson_id: 'L7',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0010'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0010',
        options: [
          { ar: 'راجل', en: 'man', correct: true },
          { ar: 'بنت', en: 'girl', correct: false },
          { ar: 'ولد', en: 'boy', correct: false },
          { ar: 'جد', en: 'grandfather', correct: false },
        ],
      },
    ],
  },
  {
    id: 'L8',
    phase: 2,
    index: 8,
    title: 'Genitive Case (Possession)',
    title_ar: 'المضاف والمضاف إليه (الملكية)',
    objectives: [
      'Learn the genitive suffix -n / -ni',
      'Express ownership: "X of Y"',
      'Recognise that the possessor precedes the possessed noun',
    ],
    cultural_note:
      'Possession in Mattokki is deeply relational. Saying "my brother" or "my land" uses possessive markers that differ slightly from standard nouns, showing kinship closeness.',
    cultural_note_ar:
      'التعبير عن الملكية في النوبية بيبدأ بـ المضاف إليه أولاً، زي تركيبات المضاف والمضاف إليه.',
    exercises: [
      {
        id: 'L8_E1',
        lesson_id: 'L8',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0011', 'xnz_0010'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'id-n buru',
        prompt_old_nubian: 'ⲓⲇ-ⲛ ⲃⲩⲣⲩ',
        prompt_arabic_transliteration: 'إيد-ن بورو',
        morpheme_highlights: [],
        options: [
          { ar: 'بنت الراجل', en: "the man's girl", correct: true },
          { ar: 'راجل وبنت', en: 'a man and a girl', correct: false },
          { ar: 'الراجل بيشوف البنت', en: 'the man sees the girl', correct: false },
          { ar: 'بنت جميلة', en: 'a beautiful girl', correct: false },
        ],
      },
      {
        id: 'L8_E2',
        lesson_id: 'L8',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0010'], rule_ids: [], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0010',
        correct_suffix_rule_id: 'COPULA_MA',
        distractor_suffix_rule_ids: ['ACC_ALLOMORPH_TI', 'INDEF_BILABIAL_BER'],
        expected_surface: 'id-ma',
      },
      {
        id: 'L8_E3',
        lesson_id: 'L8',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0012', 'xnz_0020'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'éen-n wer-i',
        prompt_old_nubian: 'ⲉⲉⲛ-ⲛ ⲟⲩⲉⲣ-ⲓ',
        prompt_arabic_transliteration: 'إين-ن ويري',
        morpheme_highlights: [],
        options: [
          { ar: 'ابن الأم', en: "the mother's son", correct: true },
          { ar: 'ولد وأم', en: 'a boy and a mother', correct: false },
          { ar: 'الأم والأب', en: 'mother and father', correct: false },
          { ar: 'الأم في البيت', en: 'mother is at home', correct: false },
        ],
      },
      {
        id: 'L8_E4',
        lesson_id: 'L8',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0013', 'xnz_0042'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: "father's water",
        prompt_ar: 'مية الأب',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0013', surface: 'baab-n' },
          { role: 'O', lexeme_id: 'xnz_0042', surface: 'essi' },
        ],
      },
      {
        id: 'L8_E5',
        lesson_id: 'L8',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0010', 'xnz_0044'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'id-n seer',
        prompt_old_nubian: 'ⲓⲇ-ⲛ ⲥⲉⲉⲣ',
        prompt_arabic_transliteration: 'إيد-ن سيير',
        morpheme_highlights: [],
        options: [
          { ar: 'حجر الراجل', en: "the man's stone", correct: true },
          { ar: 'راجل وحجر', en: 'a man and a stone', correct: false },
          { ar: 'الراجل مسك الحجر', en: 'the man held the stone', correct: false },
          { ar: 'حجر كبير', en: 'a big stone', correct: false },
        ],
      },
      {
        id: 'L8_E6',
        lesson_id: 'L8',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0012'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0012',
        options: [
          { ar: 'أم', en: 'mother', correct: true },
          { ar: 'أب', en: 'father', correct: false },
          { ar: 'بنت', en: 'girl', correct: false },
          { ar: 'ولد', en: 'boy', correct: false },
        ],
      },
    ],
  },
  {
    id: 'L9',
    phase: 2,
    index: 9,
    title: 'Locations (Locative)',
    title_ar: 'الظرف وحروف الجر (حالة المكان)',
    objectives: [
      'Learn the locative case suffix -la / -l',
      'Say "in", "at", or "on" a place in Mattokki',
      'Observe directional motion versus static locations',
    ],
    cultural_note:
      'The Nile river (Aman) was not just water to the Nubians, it was the central spatial reference. Every location is described in relation to the flow: upstream, downstream, riverbank, or inland.',
    cultural_note_ar:
      'حالة المكان والاتجاهات عند النوبيين كانت مرتبطة بحركة النيل وجريان المياه.',
    exercises: [
      {
        id: 'L9_E1',
        lesson_id: 'L9',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0042'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'essi-la',
        prompt_old_nubian: 'ⲉⲥⲥⲓ-ⲗⲁ',
        prompt_arabic_transliteration: 'إيسي-لا',
        morpheme_highlights: [],
        options: [
          { ar: 'في الماء / للمياه', en: 'in the water / to the water', correct: true },
          { ar: 'ماء ونار', en: 'water and fire', correct: false },
          { ar: 'شرب الماية', en: 'drank the water', correct: false },
          { ar: 'الماية باردة', en: 'water is cold', correct: false },
        ],
      },
      {
        id: 'L9_E2',
        lesson_id: 'L9',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0043'], rule_ids: [], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0043',
        correct_suffix_rule_id: 'COPULA_MA',
        distractor_suffix_rule_ids: ['ACC_ALLOMORPH_TI', 'INDEF_BILABIAL_BER'],
        expected_surface: 'ig-ma',
      },
      {
        id: 'L9_E3',
        lesson_id: 'L9',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0043'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ig-la',
        prompt_old_nubian: 'ⲓⲅ-ⲗⲁ',
        prompt_arabic_transliteration: 'إيج-لا',
        morpheme_highlights: [],
        options: [
          { ar: 'في النار', en: 'into the fire', correct: true },
          { ar: 'نار ونور', en: 'fire and light', correct: false },
          { ar: 'تحت النار', en: 'under the fire', correct: false },
          { ar: 'الموقد', en: 'fireplace', correct: false },
        ],
      },
      {
        id: 'L9_E4',
        lesson_id: 'L9',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0003', 'xnz_0046', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'He sees the sky.',
        prompt_ar: 'هو يرى السماء.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0003', surface: 'tar' },
          { role: 'O', lexeme_id: 'xnz_0046', surface: 'aman-gi' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal' },
        ],
      },
      {
        id: 'L9_E5',
        lesson_id: 'L9',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0046'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'aman-la',
        prompt_old_nubian: 'ⲁⲙⲁⲛ-ⲗⲁ',
        prompt_arabic_transliteration: 'أمان-لا',
        morpheme_highlights: [],
        options: [
          { ar: 'في السماء / للمياه', en: 'in the sky / in the water', correct: true },
          { ar: 'سماء صافية', en: 'clear sky', correct: false },
          { ar: 'مطر كثير', en: 'heavy rain', correct: false },
          { ar: 'تحت الأرض', en: 'underground', correct: false },
        ],
      },
      {
        id: 'L9_E6',
        lesson_id: 'L9',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0044'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0044',
        options: [
          { ar: 'حجر', en: 'stone', correct: true },
          { ar: 'شمس', en: 'sun', correct: false },
          { ar: 'نار', en: 'fire', correct: false },
          { ar: 'سما', en: 'sky', correct: false },
        ],
      },
    ],
  },
  {
    id: 'L10',
    phase: 3,
    index: 10,
    title: 'Present and Past Tense',
    title_ar: 'الزمن المضارع والماضي',
    objectives: [
      'Learn present tense verb endings (-i / -ri)',
      'Learn past tense verb endings (-os / -on)',
      'Identify action flow in simple sentences',
    ],
    cultural_note:
      'Verbs in Mattokki carry aspect as well as tense. The distinction between completed actions (perfective) and ongoing actions (imperfective) shapes how narratives and stories are told.',
    cultural_note_ar:
      'تصريف الأفعال بيعبر عن الماضي والمضارع واستمرارية الحدث.',
    exercises: [
      {
        id: 'L10_E1',
        lesson_id: 'L10',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ay nalri',
        prompt_old_nubian: 'ⲁⲩ ⲛⲁⲗⲣⲓ',
        prompt_arabic_transliteration: 'آي نالري',
        morpheme_highlights: [],
        options: [
          { ar: 'أنا بشوف', en: 'I see', correct: true },
          { ar: 'أنا شفت', en: 'I saw', correct: false },
          { ar: 'أنا هشوف', en: 'I will see', correct: false },
          { ar: 'هو بيشوف', en: 'He sees', correct: false },
        ],
      },
      {
        id: 'L10_E2',
        lesson_id: 'L10',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0001'], rule_ids: [], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0001',
        correct_suffix_rule_id: 'COPULA_MA',
        distractor_suffix_rule_ids: ['ACC_ALLOMORPH_TI', 'INDEF_BILABIAL_BER'],
        expected_surface: 'ay-ma',
      },
      {
        id: 'L10_E3',
        lesson_id: 'L10',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ay nalos',
        prompt_old_nubian: 'ⲁⲩ ⲛⲁⲗⲟⲥ',
        prompt_arabic_transliteration: 'آي نالوس',
        morpheme_highlights: [],
        options: [
          { ar: 'أنا شفت', en: 'I saw', correct: true },
          { ar: 'أنا بشوف', en: 'I see', correct: false },
          { ar: 'هو شاف', en: 'He saw', correct: false },
          { ar: 'أنا هشوف', en: 'I will see', correct: false },
        ],
      },
      {
        id: 'L10_E4',
        lesson_id: 'L10',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0003', 'xnz_0011', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'He saw the girl.',
        prompt_ar: 'هو شاف البنت.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0003', surface: 'tar' },
          { role: 'O', lexeme_id: 'xnz_0011', surface: 'buru-gi' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nalon' },
        ],
      },
      {
        id: 'L10_E5',
        lesson_id: 'L10',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0002', 'xnz_0051'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ir jomri',
        prompt_old_nubian: 'ⲓⲣ ⳝⲟⲙⲣⲓ',
        prompt_arabic_transliteration: 'إير جومري',
        morpheme_highlights: [],
        options: [
          { ar: 'إنت بتضرب', en: 'You hit (present)', correct: true },
          { ar: 'أنا بضرب', en: 'I hit', correct: false },
          { ar: 'إنت ضربت', en: 'You hit (past)', correct: false },
          { ar: 'هو يضرب', en: 'He hits', correct: false },
        ],
      },
      {
        id: 'L10_E6',
        lesson_id: 'L10',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0050',
        options: [
          { ar: 'يشوف / يرى', en: 'to see', correct: true },
          { ar: 'يضرب', en: 'to hit', correct: false },
          { ar: 'يمشي', en: 'to walk', correct: false },
          { ar: 'يفتح', en: 'to open', correct: false },
        ],
      },
    ],
  },
  {
    id: 'L11',
    phase: 3,
    index: 11,
    title: 'Future Tense',
    title_ar: 'الزمن المستقبل',
    objectives: [
      'Learn the future circumfix bi-...-r / -fa',
      'Construct simple sentences about future actions',
      'Distinguish future markers from past/present markers',
    ],
    cultural_note:
      'Hope and anticipation of the future run deep in Nubian poetry. The transition seasons of the Nile flood and harvests are always spoken of using future markers that signify hope and prayer.',
    cultural_note_ar:
      'الأمل والمستقبل جزء من الشعر النوبي وارتباطهم بمواسم فيضان النيل والزراعة.',
    exercises: [
      {
        id: 'L11_E1',
        lesson_id: 'L11',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0050'], rule_ids: ['FUTURE_CIRCUMFIX_BI'], primary_layer: 'morphological' },
        prompt_mattokki: 'ay bi-nal-r',
        prompt_old_nubian: 'ⲁⲩ ⲃⲓ-ⲛⲁⲗ-ⲣ',
        prompt_arabic_transliteration: 'آي بي-نال-ر',
        morpheme_highlights: [{ surface: 'bi-…-r', rule_id: 'FUTURE_CIRCUMFIX_BI' }],
        options: [
          { ar: 'أنا هشوف', en: 'I will see', correct: true },
          { ar: 'أنا بشوف', en: 'I see', correct: false },
          { ar: 'أنا شفت', en: 'I saw', correct: false },
          { ar: 'هو هيشوف', en: 'He will see', correct: false },
        ],
      },
      {
        id: 'L11_E2',
        lesson_id: 'L11',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0051'], rule_ids: ['FUTURE_CIRCUMFIX_BI'], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0051',
        correct_suffix_rule_id: 'FUTURE_CIRCUMFIX_BI',
        distractor_suffix_rule_ids: ['COPULA_MA', 'INDEF_BILABIAL_BER'],
        expected_surface: 'bi-jom-r',
      },
      {
        id: 'L11_E3',
        lesson_id: 'L11',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0003', 'xnz_0051'], rule_ids: ['FUTURE_CIRCUMFIX_BI'], primary_layer: 'morphological' },
        prompt_mattokki: 'tar bi-jom-r',
        prompt_old_nubian: 'ⲧⲁⲣ ⲃⲓ-ⳝⲟⲙ-ⲣ',
        prompt_arabic_transliteration: 'تار بي-جوم-ر',
        morpheme_highlights: [{ surface: 'bi-…-r', rule_id: 'FUTURE_CIRCUMFIX_BI' }],
        options: [
          { ar: 'هو هيضرب', en: 'He will hit', correct: true },
          { ar: 'هو بيضرب', en: 'He hits', correct: false },
          { ar: 'هو ضرب', en: 'He hit', correct: false },
          { ar: 'أنا هضرب', en: 'I will hit', correct: false },
        ],
      },
      {
        id: 'L11_E4',
        lesson_id: 'L11',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0023', 'xnz_0011', 'xnz_0050'], rule_ids: ['FUTURE_CIRCUMFIX_BI'], primary_layer: 'morphological' },
        prompt_en: 'We will see the girl.',
        prompt_ar: 'احنا هنشوف البنت.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0023', surface: 'ar' },
          { role: 'O', lexeme_id: 'xnz_0011', surface: 'buru-gi' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'bi-nal-r' },
        ],
      },
      {
        id: 'L11_E5',
        lesson_id: 'L11',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0002', 'xnz_0050'], rule_ids: ['FUTURE_CIRCUMFIX_BI'], primary_layer: 'morphological' },
        prompt_mattokki: 'ir bi-nal-r',
        prompt_old_nubian: 'ⲓⲣ ⲃⲓ-ⲛⲁⲗ-ⲣ',
        prompt_arabic_transliteration: 'إير بي-نال-ر',
        morpheme_highlights: [{ surface: 'bi-…-r', rule_id: 'FUTURE_CIRCUMFIX_BI' }],
        options: [
          { ar: 'إنت هتشوف', en: 'You will see', correct: true },
          { ar: 'أنا هشوف', en: 'I will see', correct: false },
          { ar: 'إنت بتشوف', en: 'You see', correct: false },
          { ar: 'إنت شفت', en: 'You saw', correct: false },
        ],
      },
      {
        id: 'L11_E6',
        lesson_id: 'L11',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0051'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0051',
        options: [
          { ar: 'يضرب', en: 'to hit', correct: true },
          { ar: 'يشوف / يرى', en: 'to see', correct: false },
          { ar: 'يمشي', en: 'to walk', correct: false },
          { ar: 'يفتح', en: 'to open', correct: false },
        ],
      },
    ],
  },
  {
    id: 'L12',
    phase: 3,
    index: 12,
    title: 'Negation',
    title_ar: 'النفي',
    objectives: [
      'Learn the negative suffixes -mun and -kommun',
      'Negate verbs in present and past tenses',
      'Construct complete negative sentences',
    ],
    cultural_note:
      'Politeness in negation is standard. Mattokki has nuanced negative particles that soft-pedal refusal or disagreement, maintaining communal harmony in conversations.',
    cultural_note_ar:
      'النفي في النوبية المطوكية بيستخدم لواحق مهذبة ومتنوعة للمحافظة على الود والوفاق الاجتماعي.',
    exercises: [
      {
        id: 'L12_E1',
        lesson_id: 'L12',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ay nal-mun',
        prompt_old_nubian: 'ⲁⲩ ⲛⲁⲗ-ⲙⲟⲩⲛ',
        prompt_arabic_transliteration: 'آي نال-مون',
        morpheme_highlights: [],
        options: [
          { ar: 'أنا مش شايف', en: 'I do not see', correct: true },
          { ar: 'أنا شايف', en: 'I see', correct: false },
          { ar: 'أنا مش هشوف', en: 'I will not see', correct: false },
          { ar: 'أنا مش ضارب', en: 'I do not hit', correct: false },
        ],
      },
      {
        id: 'L12_E2',
        lesson_id: 'L12',
        kind: 'suffix_snap',
        morpheme_map: { lexeme_ids: ['xnz_0002'], rule_ids: [], primary_layer: 'morphological' },
        root_lexeme_id: 'xnz_0002',
        correct_suffix_rule_id: 'COPULA_MA',
        distractor_suffix_rule_ids: ['ACC_ALLOMORPH_TI', 'INDEF_BILABIAL_BER'],
        expected_surface: 'ir-ma',
      },
      {
        id: 'L12_E3',
        lesson_id: 'L12',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0051'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ay jom-mun',
        prompt_old_nubian: 'ⲁⲩ ⳝⲟⲙ-ⲙⲟⲩⲛ',
        prompt_arabic_transliteration: 'آي جوم-مون',
        morpheme_highlights: [],
        options: [
          { ar: 'أنا مش بضرب', en: 'I do not hit', correct: true },
          { ar: 'أنا بضرب', en: 'I hit', correct: false },
          { ar: 'أنا مش شايف', en: 'I do not see', correct: false },
          { ar: 'هو مش بضرب', en: 'He does not hit', correct: false },
        ],
      },
      {
        id: 'L12_E4',
        lesson_id: 'L12',
        kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0003', 'xnz_0011', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'He does not see the girl.',
        prompt_ar: 'هو مش شايف البنت.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0003', surface: 'tar' },
          { role: 'O', lexeme_id: 'xnz_0011', surface: 'buru-gi' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal-mun' },
        ],
      },
      {
        id: 'L12_E5',
        lesson_id: 'L12',
        kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0003', 'xnz_0051'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'tar jom-kommun',
        prompt_old_nubian: 'ⲧⲁⲣ ⳝⲟⲙ-ⲕⲟⲙⲙⲟⲩⲛ',
        prompt_arabic_transliteration: 'تار جوم-كومون',
        morpheme_highlights: [],
        options: [
          { ar: 'هو لم يضرب (ماضي)', en: 'He did not hit', correct: true },
          { ar: 'هو مش بيضرب (مضارع)', en: 'He does not hit', correct: false },
          { ar: 'أنا لم أضرب', en: 'I did not hit', correct: false },
          { ar: 'هو هيضرب', en: 'He will hit', correct: false },
        ],
      },
      {
        id: 'L12_E6',
        lesson_id: 'L12',
        kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0003'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO,
        prompt_lexeme_id: 'xnz_0003',
        options: [
          { ar: 'هو / هي', en: 'he / she', correct: true },
          { ar: 'أنا', en: 'I', correct: false },
          { ar: 'إنت', en: 'you', correct: false },
          { ar: 'إحنا', en: 'we', correct: false },
        ],
      },
    ],
  },
];

// Post-process to inject real audio URLs where available
export const lessons: Lesson[] = rawLessons.map(lesson => ({
  ...lesson,
  exercises: lesson.exercises.map(ex => {
    if (ex.kind === 'audio_match' && 'prompt_lexeme_id' in ex && ex.prompt_lexeme_id) {
      const lexeme = lexById[ex.prompt_lexeme_id];
      if (lexeme && lexeme.audio_url) {
        return {
          ...ex,
          audio_url: lexeme.audio_url
        };
      }
    }
    return ex;
  })
}));

export const lessonById = Object.fromEntries(lessons.map((l) => [l.id, l]));
