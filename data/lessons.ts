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

  // ═══════════════════════════════════════════════════════════════════════════
  // L13 — NUMBERS (Phase 2 · Lesson 13)
  // The Mattokki numeral system, 1–10. we:r = 1, which doubles as the indefinite suffix.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L13',
    phase: 2,
    index: 13,
    title: 'Count Like a Nubian',
    title_ar: 'عد بالنوبي',
    objectives: [
      'Learn numerals 1–10 in Mattokki',
      'Recognise that we:r (one) is also the indefinite suffix — the same root!',
      'Use owwi weerkeg aalo: "Two are better than one" (famous Nubian proverb)',
    ],
    cultural_note:
      'The word for "one" in Mattokki is we:r — the exact same root used as the indefinite article -we:r. This is not coincidence: in ancient Nubian thought, saying "a chicken" was literally saying "one chicken". Language carries logic.',
    cultural_note_ar:
      'كلمة "واحد" في المطوكي هي we:r — نفس الجذر بالظبط اللي بنستخدمه كأداة نكرة -we:r. ده مش صدفة: في الفكر النوبي القديم، قولك "فرخة" معناه "فرخة واحدة". اللغة بتحمل منطق.',
    exercises: [
      {
        id: 'L13_E1', lesson_id: 'L13', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0100'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0100',
        options: [
          { ar: 'واحد', en: 'one', correct: true },
          { ar: 'اتنين', en: 'two', correct: false },
          { ar: 'تلاتة', en: 'three', correct: false },
          { ar: 'عشرة', en: 'ten', correct: false },
        ],
      },
      {
        id: 'L13_E2', lesson_id: 'L13', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0100', 'xnz_0042'], rule_ids: ['INDEF_SUFFIX_WER'], primary_layer: 'morphological' },
        prompt_mattokki: 'essi-we:r', prompt_old_nubian: 'ⲉⲥⲥⲓ-ⲟⲩⲏⲣ',
        prompt_arabic_transliteration: 'إيسي-ويير',
        morpheme_highlights: [{ surface: '-we:r', rule_id: 'INDEF_SUFFIX_WER' }],
        options: [
          { ar: 'ماية واحدة / ماية (نكرة)', en: 'a water / one water', correct: true },
          { ar: 'مياه كتير', en: 'many waters', correct: false },
          { ar: 'الماية (معرفة)', en: 'the water (definite)', correct: false },
          { ar: 'مياه اتنين', en: 'two waters', correct: false },
        ],
      },
      {
        id: 'L13_E3', lesson_id: 'L13', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0101'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0101',
        options: [
          { ar: 'اتنين', en: 'two', correct: true },
          { ar: 'واحد', en: 'one', correct: false },
          { ar: 'تلاتة', en: 'three', correct: false },
          { ar: 'أربعة', en: 'four', correct: false },
        ],
      },
      {
        id: 'L13_E4', lesson_id: 'L13', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0102', 'xnz_0103', 'xnz_0104'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'kemiso', prompt_old_nubian: 'ⲕⲉⲙⲓⲥⲟ',
        prompt_arabic_transliteration: 'كيميسو',
        morpheme_highlights: [],
        options: [
          { ar: 'أربعة', en: 'four', correct: true },
          { ar: 'تلاتة', en: 'three', correct: false },
          { ar: 'خمسة', en: 'five', correct: false },
          { ar: 'ستة', en: 'six', correct: false },
        ],
      },
      {
        id: 'L13_E5', lesson_id: 'L13', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0104'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0104',
        options: [
          { ar: 'خمسة', en: 'five', correct: true },
          { ar: 'ستة', en: 'six', correct: false },
          { ar: 'أربعة', en: 'four', correct: false },
          { ar: 'سبعة', en: 'seven', correct: false },
        ],
      },
      {
        id: 'L13_E6', lesson_id: 'L13', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0109'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'dimen', prompt_old_nubian: 'ⲇⲓⲙⲉⲛ',
        prompt_arabic_transliteration: 'ديمين',
        morpheme_highlights: [],
        options: [
          { ar: 'عشرة', en: 'ten', correct: true },
          { ar: 'تسعة', en: 'nine', correct: false },
          { ar: 'تمانية', en: 'eight', correct: false },
          { ar: 'سبعة', en: 'seven', correct: false },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L14 — COLORS & DESCRIPTIONS (Phase 2 · Lesson 14)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L14',
    phase: 2,
    index: 14,
    title: 'Colors of the Nile',
    title_ar: 'ألوان النيل',
    objectives: [
      'Learn color adjectives in Mattokki',
      'Apply adjectives after the noun (Mattokki: noun + adjective order)',
      'Use fala (good) and gurri (bad) in simple descriptive sentences',
    ],
    cultural_note:
      'Nubian villages along the Nile were famous for their brightly painted houses — white walls with blue doors, red borders, and green palm trees. Each color carried meaning. When the Aswan Dam submerged the villages in 1964, the colors of those walls were lost forever. Learning them is a small act of remembrance.',
    cultural_note_ar:
      'قرى النوبة على النيل كانت مشهورة ببيوتها الملونة — حيطان بيضا وأبواب زرقا وحدود حمرا وشجر نخيل أخضر. كل لون كان له معنى.',
    exercises: [
      {
        id: 'L14_E1', lesson_id: 'L14', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0120'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0120',
        options: [
          { ar: 'أبيض', en: 'white', correct: true },
          { ar: 'أسود', en: 'black', correct: false },
          { ar: 'أحمر', en: 'red', correct: false },
          { ar: 'أخضر', en: 'green', correct: false },
        ],
      },
      {
        id: 'L14_E2', lesson_id: 'L14', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0121'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0121',
        options: [
          { ar: 'أسود', en: 'black', correct: true },
          { ar: 'أبيض', en: 'white', correct: false },
          { ar: 'أحمر', en: 'red', correct: false },
          { ar: 'أصفر', en: 'yellow', correct: false },
        ],
      },
      {
        id: 'L14_E3', lesson_id: 'L14', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0122'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'gaile', prompt_old_nubian: 'ⲅⲁⲓⲗⲉ',
        prompt_arabic_transliteration: 'جيلي',
        morpheme_highlights: [],
        options: [
          { ar: 'أحمر', en: 'red', correct: true },
          { ar: 'أخضر', en: 'green', correct: false },
          { ar: 'أصفر', en: 'yellow', correct: false },
          { ar: 'أبيض', en: 'white', correct: false },
        ],
      },
      {
        id: 'L14_E4', lesson_id: 'L14', kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0165', 'xnz_0120', 'xnz_0012'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'The house is white.',
        prompt_ar: 'البيت أبيض.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0165', surface: 'ka' },
          { role: 'O', lexeme_id: 'xnz_0120', surface: 'aroo' },
          { role: 'V', lexeme_id: 'xnz_0012', surface: '-ma' },
        ],
      },
      {
        id: 'L14_E5', lesson_id: 'L14', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0127'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0127',
        options: [
          { ar: 'كويس / حلو', en: 'good / nice', correct: true },
          { ar: 'وحش / بايظ', en: 'bad', correct: false },
          { ar: 'جميل', en: 'beautiful', correct: false },
          { ar: 'كبير', en: 'big', correct: false },
        ],
      },
      {
        id: 'L14_E6', lesson_id: 'L14', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0125', 'xnz_0126'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'dool / kinna', prompt_old_nubian: 'ⲇⲟⲟⲗ / ⲕⲓⲛⲛⲁ',
        prompt_arabic_transliteration: 'دول / كينا',
        morpheme_highlights: [],
        options: [
          { ar: 'كبير / صغير', en: 'big / small', correct: true },
          { ar: 'أحمر / أبيض', en: 'red / white', correct: false },
          { ar: 'كويس / وحش', en: 'good / bad', correct: false },
          { ar: 'سخن / بارد', en: 'hot / cold', correct: false },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L15 — BODY PARTS (Phase 2 · Lesson 15)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L15',
    phase: 2,
    index: 15,
    title: 'Your Body in Mattokki',
    title_ar: 'جسمك بالنوبي',
    objectives: [
      'Name 10 body parts in Mattokki',
      'Understand the genitive construction: ay missi = my eye',
      'Recognise the proverb: "Korti tanna koroogi nalemen" — The camel doesn\'t see its own crooked neck',
    ],
    cultural_note:
      'aa (heart) is one of the most culturally loaded words in Mattokki. In Nubian oral tradition, the heart is the seat of both emotion and wisdom — not the brain. The phrase "aa-ma" (it is heart) is used to describe someone with true courage and generosity.',
    cultural_note_ar:
      'كلمة aa (قلب) من أكثر الكلمات حمولة ثقافية في المطوكي. في التراث النوبي الشفهي، القلب هو مقر العاطفة والحكمة — مش الدماغ.',
    exercises: [
      {
        id: 'L15_E1', lesson_id: 'L15', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0140'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0140',
        options: [
          { ar: 'راس', en: 'head', correct: true },
          { ar: 'عين', en: 'eye', correct: false },
          { ar: 'إيد', en: 'hand', correct: false },
          { ar: 'رجل', en: 'foot', correct: false },
        ],
      },
      {
        id: 'L15_E2', lesson_id: 'L15', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0141'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0141',
        options: [
          { ar: 'عين', en: 'eye', correct: true },
          { ar: 'ودن', en: 'ear', correct: false },
          { ar: 'أنف', en: 'nose', correct: false },
          { ar: 'بق', en: 'mouth', correct: false },
        ],
      },
      {
        id: 'L15_E3', lesson_id: 'L15', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0147'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'aa', prompt_old_nubian: 'ⲁⲁ',
        prompt_arabic_transliteration: 'آ',
        morpheme_highlights: [],
        options: [
          { ar: 'قلب', en: 'heart', correct: true },
          { ar: 'راس', en: 'head', correct: false },
          { ar: 'عين', en: 'eye', correct: false },
          { ar: 'إيد', en: 'hand', correct: false },
        ],
      },
      {
        id: 'L15_E4', lesson_id: 'L15', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0145'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0145',
        options: [
          { ar: 'إيد / يد', en: 'hand / arm', correct: true },
          { ar: 'رجل', en: 'foot', correct: false },
          { ar: 'ضهر', en: 'back', correct: false },
          { ar: 'رقبة', en: 'neck', correct: false },
        ],
      },
      {
        id: 'L15_E5', lesson_id: 'L15', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0142', 'xnz_0143', 'xnz_0144'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ouloug', prompt_old_nubian: 'ⲟⲩⲗⲟⲩⲅ',
        prompt_arabic_transliteration: 'أولوج',
        morpheme_highlights: [],
        options: [
          { ar: 'ودن / أذن', en: 'ear', correct: true },
          { ar: 'أنف', en: 'nose', correct: false },
          { ar: 'بق', en: 'mouth', correct: false },
          { ar: 'عين', en: 'eye', correct: false },
        ],
      },
      {
        id: 'L15_E6', lesson_id: 'L15', kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0147', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'I feel / I see (with my heart).',
        prompt_ar: 'أنا بحس / بشوف بقلبي.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0001', surface: 'ay' },
          { role: 'O', lexeme_id: 'xnz_0147', surface: 'aa' },
          { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L16 — DAILY ACTIONS & VERBS (Phase 2 · Lesson 16)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L16',
    phase: 2,
    index: 16,
    title: 'What Do You Do?',
    title_ar: 'بتعمل إيه؟',
    objectives: [
      'Learn 8 core action verbs: go, come, eat, drink, sleep, give, take, walk',
      'Build simple SOV sentences with these verbs',
      'Understand the verb root (before tense suffixes are added)',
    ],
    cultural_note:
      'In Mattokki oral tradition, many verbs have poetic alternative forms used in songs and proverbs. The verb ni (to drink) in the context of the Nile becomes symbolic — "drinking the Nile" meant belonging to the land. Displaced Nubians in Cairo say: "We drank the Nile\'s water — it runs in our blood."',
    cultural_note_ar:
      'في التراث الشفهي المطوكي، كلمة ni (يشرب) في سياق النيل بتبقى رمزية — "شرب مية النيل" معناه الانتماء للأرض.',
    exercises: [
      {
        id: 'L16_E1', lesson_id: 'L16', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0054'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0054',
        options: [
          { ar: 'ياكل', en: 'to eat', correct: true },
          { ar: 'يشرب', en: 'to drink', correct: false },
          { ar: 'ينام', en: 'to sleep', correct: false },
          { ar: 'يروح', en: 'to go', correct: false },
        ],
      },
      {
        id: 'L16_E2', lesson_id: 'L16', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0055'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0055',
        options: [
          { ar: 'يشرب', en: 'to drink', correct: true },
          { ar: 'ياكل', en: 'to eat', correct: false },
          { ar: 'يجي', en: 'to come', correct: false },
          { ar: 'يحب', en: 'to love', correct: false },
        ],
      },
      {
        id: 'L16_E3', lesson_id: 'L16', kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0042', 'xnz_0055'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'I drink water.',
        prompt_ar: 'أنا باشرب مايه.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0001', surface: 'ay' },
          { role: 'O', lexeme_id: 'xnz_0042', surface: 'essi' },
          { role: 'V', lexeme_id: 'xnz_0055', surface: 'ni' },
        ],
      },
      {
        id: 'L16_E4', lesson_id: 'L16', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0052', 'xnz_0053'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ge\'ou / ta', prompt_old_nubian: 'ⲅⲉⲟⲩ / ⲧⲁ',
        prompt_arabic_transliteration: 'جيو / تا',
        morpheme_highlights: [],
        options: [
          { ar: 'يروح / يجي', en: 'go / come', correct: true },
          { ar: 'ياكل / يشرب', en: 'eat / drink', correct: false },
          { ar: 'ينام / يصحى', en: 'sleep / wake', correct: false },
          { ar: 'يحب / يكره', en: 'love / hate', correct: false },
        ],
      },
      {
        id: 'L16_E5', lesson_id: 'L16', kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0011', 'xnz_0170', 'xnz_0054'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'The girl eats meat.',
        prompt_ar: 'البنت باتاكل لحمة.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0011', surface: 'buru' },
          { role: 'O', lexeme_id: 'xnz_0170', surface: 'kousoo' },
          { role: 'V', lexeme_id: 'xnz_0054', surface: 'kul' },
        ],
      },
      {
        id: 'L16_E6', lesson_id: 'L16', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0061'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0061',
        options: [
          { ar: 'يحب', en: 'to love', correct: true },
          { ar: 'ياخد', en: 'to take', correct: false },
          { ar: 'يعرف', en: 'to know', correct: false },
          { ar: 'يتكلم', en: 'to speak', correct: false },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L17 — NATURE & THE NILE (Phase 2 · Lesson 17)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L17',
    phase: 2,
    index: 17,
    title: 'The River & the Sky',
    title_ar: 'النهر والسما',
    objectives: [
      'Learn vocabulary for nature: sun, moon, star, tree, earth, wind, rain',
      'Understand han-essi (rain = sky-water) — a compound word showing Nubian logic',
      'Practice descriptive sentences: ounatti fala-ma (the moon is beautiful)',
    ],
    cultural_note:
      'han-essi literally translates to "sky water" — it is the Mattokki compound word for rain. This kind of transparent compound is a hallmark of the language: meaning is built from smaller meaningful pieces. When you learn "essi" (water) and "han" (sky), you already know "rain" for free.',
    cultural_note_ar:
      'han-essi بالحرف معناها "مية السما" — وهي الكلمة المركبة للمطر في المطوكي. ده نوع من الشفافية اللغوية اللي بتميز المطوكي: المعنى بيتبنى من قطع صغيرة معروفة.',
    exercises: [
      {
        id: 'L17_E1', lesson_id: 'L17', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0045'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0045',
        options: [
          { ar: 'شمس', en: 'sun', correct: true },
          { ar: 'قمر', en: 'moon', correct: false },
          { ar: 'نجمة', en: 'star', correct: false },
          { ar: 'مطر', en: 'rain', correct: false },
        ],
      },
      {
        id: 'L17_E2', lesson_id: 'L17', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0046'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0046',
        options: [
          { ar: 'قمر', en: 'moon', correct: true },
          { ar: 'شمس', en: 'sun', correct: false },
          { ar: 'نجمة', en: 'star', correct: false },
          { ar: 'ريح', en: 'wind', correct: false },
        ],
      },
      {
        id: 'L17_E3', lesson_id: 'L17', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0049c'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'han-essi', prompt_old_nubian: 'ⲁⲛ-ⲉⲥⲥⲓ',
        prompt_arabic_transliteration: 'هان-إيسي',
        morpheme_highlights: [{ surface: 'essi', rule_id: 'INDEF_SUFFIX_WER' }],
        options: [
          { ar: 'مطر (ماية السما)', en: 'rain (sky-water)', correct: true },
          { ar: 'نهر', en: 'river', correct: false },
          { ar: 'بحر', en: 'sea', correct: false },
          { ar: 'بئر', en: 'well', correct: false },
        ],
      },
      {
        id: 'L17_E4', lesson_id: 'L17', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0047'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0047',
        options: [
          { ar: 'نجمة', en: 'star', correct: true },
          { ar: 'شمس', en: 'sun', correct: false },
          { ar: 'قمر', en: 'moon', correct: false },
          { ar: 'ريح', en: 'wind', correct: false },
        ],
      },
      {
        id: 'L17_E5', lesson_id: 'L17', kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0046', 'xnz_0129'], rule_ids: ['COPULA_MA'], primary_layer: 'lexical' },
        prompt_en: 'The moon is beautiful.',
        prompt_ar: 'القمر جميل.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0046', surface: 'ounatti' },
          { role: 'O', lexeme_id: 'xnz_0129', surface: 'tonge\'il' },
          { role: 'V', lexeme_id: 'xnz_0046', surface: '-ma' },
        ],
      },
      {
        id: 'L17_E6', lesson_id: 'L17', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0048', 'xnz_0049', 'xnz_0049b'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'tooroug', prompt_old_nubian: 'ⲧⲟⲟⲣⲟⲩⲅ',
        prompt_arabic_transliteration: 'تورج',
        morpheme_highlights: [],
        options: [
          { ar: 'ريح / هوا', en: 'wind', correct: true },
          { ar: 'تراب / أرض', en: 'earth / soil', correct: false },
          { ar: 'شجرة', en: 'tree', correct: false },
          { ar: 'حجر', en: 'stone', correct: false },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L18 — DOGO DAMO: Money, Market & Daily Life (Phase 2 · Lesson 18)
  // THE CULTURAL HOOK LESSON — inspired by Black Theama's viral song
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L18',
    phase: 2,
    index: 18,
    title: 'Dogo Damo — No Money!',
    title_ar: 'دوجو دامو — مافيش فلوس!',
    objectives: [
      'Learn the viral phrase: dougoo damo (no money / مافيش فلوس)',
      'Understand damo as a negation particle (no / not / none)',
      'Learn to buy, sell, work in Mattokki',
    ],
    cultural_note:
      '"Dogo Damo" was used in a 2025 hit song by Egyptian band Black Theama, bringing a real Nubian phrase to millions of listeners across Egypt. Many Egyptians heard Nubian for the first time through that song. Words like these — ones that cross into pop culture — are the bridge between an endangered language and the next generation.',
    cultural_note_ar:
      '"دوجو دامو" ظهرت في أغنية لفرقة بلاك ثيما عام 2025 وأسمعت ملايين المصريين النوبية لأول مرة. الكلمات اللي بتعدي لثقافة البوب — دي الجسر بين اللغة المهددة بالانقراض والجيل الجديد.',
    exercises: [
      {
        id: 'L18_E1', lesson_id: 'L18', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0180', 'xnz_0183'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'dougoo damo', prompt_old_nubian: 'ⲇⲟⲩⲅⲟⲟ ⲇⲁⲙⲟ',
        prompt_arabic_transliteration: 'دوجو دامو',
        morpheme_highlights: [],
        options: [
          { ar: 'مافيش فلوس / بلاش فلوس', en: 'no money / zero money', correct: true },
          { ar: 'عندي فلوس', en: 'I have money', correct: false },
          { ar: 'الفلوس كتير', en: 'lots of money', correct: false },
          { ar: 'إيه الفلوس دي؟', en: 'what is this money?', correct: false },
        ],
      },
      {
        id: 'L18_E2', lesson_id: 'L18', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0180'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0180',
        options: [
          { ar: 'فلوس / مصاري', en: 'money', correct: true },
          { ar: 'شغل', en: 'work', correct: false },
          { ar: 'سوق', en: 'market', correct: false },
          { ar: 'بيت', en: 'house', correct: false },
        ],
      },
      {
        id: 'L18_E3', lesson_id: 'L18', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0183'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0183',
        options: [
          { ar: 'لأ / مفيش', en: 'no / none / not', correct: true },
          { ar: 'أيوه', en: 'yes', correct: false },
          { ar: 'ربما', en: 'maybe', correct: false },
          { ar: 'كتير', en: 'a lot', correct: false },
        ],
      },
      {
        id: 'L18_E4', lesson_id: 'L18', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0181'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ge\'an', prompt_old_nubian: 'ⲅⲉⲁⲛ',
        prompt_arabic_transliteration: 'جيان',
        morpheme_highlights: [],
        options: [
          { ar: 'يشتري', en: 'to buy', correct: true },
          { ar: 'يبيع', en: 'to sell', correct: false },
          { ar: 'يشتغل', en: 'to work', correct: false },
          { ar: 'يدفع', en: 'to pay', correct: false },
        ],
      },
      {
        id: 'L18_E5', lesson_id: 'L18', kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0010', 'xnz_0174', 'xnz_0063'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'The man speaks about work.',
        prompt_ar: 'الراجل بيتكلم عن الشغل.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0010', surface: 'id' },
          { role: 'O', lexeme_id: 'xnz_0174', surface: 'gelli' },
          { role: 'V', lexeme_id: 'xnz_0063', surface: 'buy' },
        ],
      },
      {
        id: 'L18_E6', lesson_id: 'L18', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0183', 'xnz_0180', 'xnz_0174'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'gelli damo', prompt_old_nubian: 'ⲅⲉⲗⲗⲓ ⲇⲁⲙⲟ',
        prompt_arabic_transliteration: 'جيلي دامو',
        morpheme_highlights: [],
        options: [
          { ar: 'مافيش شغل', en: 'no work', correct: true },
          { ar: 'الشغل كتير', en: 'lots of work', correct: false },
          { ar: 'بحب شغلي', en: 'I love my work', correct: false },
          { ar: 'الشغل كويس', en: 'work is good', correct: false },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L19 — FOOD & HOSPITALITY (Phase 2 · Lesson 19)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L19',
    phase: 2,
    index: 19,
    title: 'Nubian Hospitality',
    title_ar: 'الكرم النوبي',
    objectives: [
      'Learn food vocabulary: meat, milk, egg, salt, fish',
      'Use ter (give) in the context of Nubian hospitality culture',
      'Learn: eski (can / to be able) — a key capability verb',
    ],
    cultural_note:
      'Nubian hospitality is legendary. In the traditional Kenzi village, no guest ever left a house without being fed. The act of "giving" (ter) food was not generosity — it was obligation, culture, identity. The proverb "Owwi weerkeg aalo" (Two are better than one) reflects this: sharing is the default mode.',
    cultural_note_ar:
      'الكرم النوبي مشهور جداً. في القرية الكنزية التقليدية، ما كانش فيه ضيف بيخرج من بيت من غير ما يتغدى. فعل "الإعطاء" (ter) ما كانش كرم — كان واجب، ثقافة، هوية.',
    exercises: [
      {
        id: 'L19_E1', lesson_id: 'L19', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0170'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0170',
        options: [
          { ar: 'لحمة', en: 'meat', correct: true },
          { ar: 'سمك', en: 'fish', correct: false },
          { ar: 'لبن', en: 'milk', correct: false },
          { ar: 'بيض', en: 'egg', correct: false },
        ],
      },
      {
        id: 'L19_E2', lesson_id: 'L19', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0038'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0038',
        options: [
          { ar: 'سمكة', en: 'fish', correct: true },
          { ar: 'لحمة', en: 'meat', correct: false },
          { ar: 'بيضة', en: 'egg', correct: false },
          { ar: 'ملح', en: 'salt', correct: false },
        ],
      },
      {
        id: 'L19_E3', lesson_id: 'L19', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0057'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'ter', prompt_old_nubian: 'ⲧⲉⲣ',
        prompt_arabic_transliteration: 'تير',
        morpheme_highlights: [],
        options: [
          { ar: 'يدي / يعطي', en: 'to give', correct: true },
          { ar: 'ياخد', en: 'to take', correct: false },
          { ar: 'يبيع', en: 'to sell', correct: false },
          { ar: 'يشتري', en: 'to buy', correct: false },
        ],
      },
      {
        id: 'L19_E4', lesson_id: 'L19', kind: 'word_arrange',
        morpheme_map: { lexeme_ids: ['xnz_0013', 'xnz_0038', 'xnz_0057'], rule_ids: [], primary_layer: 'lexical' },
        prompt_en: 'Father gives fish.',
        prompt_ar: 'أبويا بيدي سمك.',
        solution: [
          { role: 'S', lexeme_id: 'xnz_0013', surface: 'baab' },
          { role: 'O', lexeme_id: 'xnz_0038', surface: 'kare' },
          { role: 'V', lexeme_id: 'xnz_0057', surface: 'ter' },
        ],
      },
      {
        id: 'L19_E5', lesson_id: 'L19', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0172'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0172',
        options: [
          { ar: 'بيضة', en: 'egg', correct: true },
          { ar: 'لبن', en: 'milk', correct: false },
          { ar: 'لحمة', en: 'meat', correct: false },
          { ar: 'ملح', en: 'salt', correct: false },
        ],
      },
      {
        id: 'L19_E6', lesson_id: 'L19', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0184'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'eski', prompt_old_nubian: 'ⲉⲥⲕⲓ',
        prompt_arabic_transliteration: 'إيسكي',
        morpheme_highlights: [],
        options: [
          { ar: 'يقدر / يستطيع', en: 'can / to be able', correct: true },
          { ar: 'يعرف', en: 'to know', correct: false },
          { ar: 'يشوف', en: 'to see', correct: false },
          { ar: 'يحاول', en: 'to try', correct: false },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // L20 — PROVERBS: WISDOM IN MATTOKKI (Phase 2 · Lesson 20)
  // The cultural capstone lesson — Mattokki wisdom tradition
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'L20',
    phase: 2,
    index: 20,
    title: 'Words of the Elders',
    title_ar: 'كلام الأجداد',
    objectives: [
      'Read and understand 5 traditional Mattokki proverbs',
      'Recognise vocabulary from all previous lessons in context',
      'Understand how Mattokki SOV structure appears in real proverbs',
    ],
    cultural_note:
      'Proverbs are the highest form of Nubian oral literature. In the Kenzi tradition, a person who cannot cite proverbs is considered uneducated regardless of formal schooling. The Nubian elder Said Sirr Elkhatem composed much of the 20th-century Nubian poetic canon, preserving hundreds of traditional wisdoms. His recordings are among the most important cultural artifacts in existence.',
    cultural_note_ar:
      'الأمثال هي أعلى أشكال الأدب الشفهي النوبي. في التراث الكنزي، اللي ما يعرفش يقول أمثال بيتعتبر قليل الثقافة. الشاعر النوبي سعيد سر الختم حافظ على مئات الحكم التقليدية في أشعاره.',
    exercises: [
      {
        id: 'L20_E1', lesson_id: 'L20', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0101', 'xnz_0100'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'owwi weerkeg aalo', prompt_old_nubian: 'ⲟⲩⲟⲩⲓ ⲟⲩⲏⲣⲕⲉⲅ ⲁⲁⲗⲟ',
        prompt_arabic_transliteration: 'أووي ويركيج آلو',
        morpheme_highlights: [],
        options: [
          { ar: 'الاتنين أحسن من الواحد', en: 'Two are better than one', correct: true },
          { ar: 'واحد أحسن من اتنين', en: 'One is better than two', correct: false },
          { ar: 'الاتنين متساويين', en: 'Two are equal', correct: false },
          { ar: 'الثلاثة أحسن من الاتنين', en: 'Three are better than two', correct: false },
        ],
      },
      {
        id: 'L20_E2', lesson_id: 'L20', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0043', 'xnz_0042'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'eshki gaa iskingi', prompt_old_nubian: 'ⲉⲥⲕⲓ ⲅⲁⲁ ⲓⲥⲕⲓⲛⲅⲓ',
        prompt_arabic_transliteration: 'إيشكي جا إسكينجي',
        morpheme_highlights: [],
        options: [
          { ar: 'الماية بتطفي النار (الهدوء بيحل الخناقة)', en: 'Water extinguishes fire (patience resolves conflict)', correct: true },
          { ar: 'النار أقوى من الماية', en: 'Fire is stronger than water', correct: false },
          { ar: 'الماية والنار متساويين', en: 'Water and fire are equal', correct: false },
          { ar: 'الماية بتشعل النار', en: 'Water ignites fire', correct: false },
        ],
      },
      {
        id: 'L20_E3', lesson_id: 'L20', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0127'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'gindi jaagi fenti kammun', prompt_old_nubian: 'ⲅⲓⲛⲇⲓ ⲓⲁⲁⲅⲓ ⲫⲉⲛⲧⲓ ⲕⲁⲙⲙⲟⲩⲛ',
        prompt_arabic_transliteration: 'جيندي جاجي فينتي كامون',
        morpheme_highlights: [],
        options: [
          { ar: 'اللي بيخاف من الشوك ما ياكلش تمر', en: 'He who fears thorns won\'t eat dates', correct: true },
          { ar: 'التمر أحلى من الشوك', en: 'Dates are sweeter than thorns', correct: false },
          { ar: 'الشوك في كل مكان', en: 'Thorns are everywhere', correct: false },
          { ar: 'الخوف بيحمي من الشوك', en: 'Fear protects from thorns', correct: false },
        ],
      },
      {
        id: 'L20_E4', lesson_id: 'L20', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'gaa nalli, gaa kalli', prompt_old_nubian: 'ⲅⲁⲁ ⲛⲁⲗⲗⲓ, ⲅⲁⲁ ⲕⲁⲗⲗⲓ',
        prompt_arabic_transliteration: 'جا نالي، جا كالي',
        morpheme_highlights: [],
        options: [
          { ar: 'اللي بيشوف بياكل (المتيقظ بيلاقي)', en: 'He who sees, eats (the vigilant seizes opportunity)', correct: true },
          { ar: 'اللي بياكل بيشوف', en: 'He who eats, sees', correct: false },
          { ar: 'الأكل للجميع', en: 'Food is for everyone', correct: false },
          { ar: 'اللي بيشوف بيتعلم', en: 'He who sees, learns', correct: false },
        ],
      },
      {
        id: 'L20_E5', lesson_id: 'L20', kind: 'audio_match',
        morpheme_map: { lexeme_ids: ['xnz_0101'], rule_ids: [], primary_layer: 'lexical' },
        audio_url: PLACEHOLDER_AUDIO, prompt_lexeme_id: 'xnz_0101',
        options: [
          { ar: 'اتنين', en: 'two', correct: true },
          { ar: 'واحد', en: 'one', correct: false },
          { ar: 'تلاتة', en: 'three', correct: false },
          { ar: 'عشرة', en: 'ten', correct: false },
        ],
      },
      {
        id: 'L20_E6', lesson_id: 'L20', kind: 'mcq',
        morpheme_map: { lexeme_ids: ['xnz_0063', 'xnz_0062'], rule_ids: [], primary_layer: 'lexical' },
        prompt_mattokki: 'tood inin baabkeg aawin', prompt_old_nubian: 'ⲧⲟⲟⲇ ⲓⲛⲓⲛ ⲃⲁⲁⲃⲕⲉⲅ ⲁⲁⲟⲩⲓⲛ',
        prompt_arabic_transliteration: 'تود إنين بابكيج آوين',
        morpheme_highlights: [],
        options: [
          { ar: 'الولد بيعمل زي أبوه (الشبه يجيب من الأجداد)', en: 'The boy does what his father does (like father, like son)', correct: true },
          { ar: 'الأب أحسن من الولد', en: 'The father is better than the son', correct: false },
          { ar: 'الولد بيعلم أبوه', en: 'The son teaches the father', correct: false },
          { ar: 'الأب والولد متختلفوش', en: 'Father and son are different', correct: false },
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
