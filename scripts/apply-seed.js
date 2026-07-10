#!/usr/bin/env node
/**
 * Essi — Seed Script for all Phase 0-3 tables (native fetch version).
 * Seeds: morphology_rules, lexicon_roots, lessons, exercises, and exercise_morpheme_map.
 *
 * Usage:
 *   EXPO_PUBLIC_SUPABASE_URL=... EXPO_PUBLIC_SUPABASE_ANON_KEY=... node scripts/apply-seed.js
 *
 * Or pass the service-role key via SUPABASE_SERVICE_ROLE_KEY to bypass RLS.
 * The script is idempotent — it upserts/cleans so re-running is safe.
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join('=').trim();
        process.env[key] = val;
      }
    }
  }
}

const URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!URL || !KEY) {
  console.error('\n❌  Missing EXPO_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/EXPO_PUBLIC_SUPABASE_ANON_KEY\n');
  process.exit(1);
}

// ── 1. Morphology rules ───────────────────────────────────────────────────────
const MORPHOLOGY_RULES = [
  {
    id: 'ACC_ALLOMORPH_TI',
    suffix: '-ti', family: 'accusative',
    phonological_condition: 'After alveolar stops (d, t, n, l)',
    example: 'id → it-ti (man-ACC)',
    description_ar: 'بعد الحروف السنية د، ت، ن، ل',
    description_en: 'Attached after alveolar stops. d→t assimilation occurs.',
    source: 'abdel-hafiz-1988', verified: true
  },
  {
    id: 'ACC_ALLOMORPH_GI',
    suffix: '-gi', family: 'accusative',
    phonological_condition: 'After vowels and sonorants (except r)',
    example: 'buru → buru-gi (girl-ACC)',
    description_ar: 'بعد حروف العلة والأصوات المجلجلة',
    description_en: 'The most common accusative allomorph.',
    source: 'abdel-hafiz-1988', verified: true
  },
  {
    id: 'ACC_ALLOMORPH_JI',
    suffix: '-ji', family: 'accusative',
    phonological_condition: 'After palatal stops (c, ɟ)',
    example: 'kaj → kaj-ji',
    description_ar: 'بعد الحروف الحنكية',
    description_en: 'Attached after palatal stops.',
    source: 'abdel-hafiz-1988', verified: true
  },
  {
    id: 'ACC_ALLOMORPH_KI',
    suffix: '-ki', family: 'accusative',
    phonological_condition: 'Elsewhere — default',
    example: 'saab → saab-ki (cat-ACC)',
    description_ar: 'في باقي الحالات',
    description_en: 'Default elsewhere — used when no other condition matches.',
    source: 'abdel-hafiz-1988', verified: true
  },
  {
    id: 'INDEF_SUFFIX_WER',
    suffix: '-we:r', family: 'indefinite',
    phonological_condition: 'After most consonants and vowels',
    example: 'essi → essi-we:r (a water)',
    description_ar: 'لاحقة النكرة',
    description_en: 'Marks an indefinite noun ("a water"). Zero-marked = definite.',
    source: 'abdel-hafiz-1988', verified: true
  },
  {
    id: 'INDEF_BILABIAL_BER',
    suffix: '-be:r', family: 'indefinite',
    phonological_condition: 'After bilabials — assimilation of w→b',
    example: 'kab → kab-be:r',
    description_ar: 'بعد الحروف الشفوية، w تصبح b',
    description_en: 'Allomorph of -we:r after bilabial consonants.',
    source: 'abdel-hafiz-1988', verified: true
  },
  {
    id: 'COPULA_MA',
    suffix: '-ma', family: 'tense',
    phonological_condition: 'Attaches to predicate noun',
    example: 'ay kenzi-ma (I am Nubian)',
    description_ar: 'لاحقة الكينونة — لا يوجد فعل يكون في المطوكي',
    description_en: 'Mattokki has no "to be" verb — this suffix does the work.',
    source: 'abdel-hafiz-1988', verified: true
  },
  {
    id: 'FUTURE_CIRCUMFIX_BI',
    suffix: 'bi-…-r', family: 'tense',
    phonological_condition: 'Circumfix around verb root',
    example: 'jom → bi-jom-r (will hit)',
    description_ar: 'صيغة المستقبل — قبل وبعد الفعل',
    description_en: 'Future tense: prefix bi- + suffix -r around the verb stem.',
    source: 'abdel-hafiz-1988', verified: true
  },
];

// ── 2. Lexicon roots ──────────────────────────────────────────────────────────
const LEXICON = [
  { lexeme_id: 'xnz_0001', root: 'ay',   old_nubian: 'ⲁⲩ',   latin: 'ay',   arabic: 'أَيْ', ipa: 'aj',      pos: 'pronoun', translation_ar: 'أنا',    translation_en: 'I',             source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0002', root: 'ir',   old_nubian: 'ⲓⲣ',   latin: 'ir',   arabic: 'إِرْ', ipa: 'ir',      pos: 'pronoun', translation_ar: 'إنت',   translation_en: 'you',           source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0003', root: 'tar',  old_nubian: 'ⲧⲁⲣ',  latin: 'tar',  arabic: 'تَرْ', ipa: 'tar',     pos: 'pronoun', translation_ar: 'هو/هي', translation_en: 'he / she / it', source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0010', root: 'id',   old_nubian: 'ⲓⲇ',   latin: 'id',   arabic: 'إيد',  ipa: 'id',      pos: 'noun',    translation_ar: 'راجل',  translation_en: 'man / person',  source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0011', root: 'buru', old_nubian: 'ⲃⲩⲣⲩ', latin: 'buru', arabic: 'بورو', ipa: 'ˈbu.ru',  pos: 'noun',    translation_ar: 'بنت',   translation_en: 'girl',          source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0012', root: 'éen',  old_nubian: 'ⲉⲉⲛ',  latin: 'éen',  arabic: 'إين',  ipa: 'eːn',     pos: 'noun',    translation_ar: 'أم',    translation_en: 'mother',        source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0013', root: 'baab', old_nubian: 'ⲃⲁⲁⲃ', latin: 'baab', arabic: 'باب',  ipa: 'baːb',    pos: 'noun',    translation_ar: 'أب',    translation_en: 'father',        source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0042', root: 'essi', old_nubian: 'ⲉⲥⲥⲓ', latin: 'essi', arabic: 'إيسي', ipa: 'ˈɛs.si', pos: 'noun',    translation_ar: 'ماء',   translation_en: 'water',         source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0043', root: 'ig',   old_nubian: 'ⲓⲅ',   latin: 'ig',   arabic: 'نار',  ipa: 'iɡ',      pos: 'noun',    translation_ar: 'نار',   translation_en: 'fire',          source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0044', root: 'seer', old_nubian: 'ⲥⲉⲉⲣ', latin: 'seer', arabic: 'حجر',  ipa: 'seːr',    pos: 'noun',    translation_ar: 'حجر',   translation_en: 'stone',         source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0050', root: 'nal',  old_nubian: 'ⲛⲁⲗ',  latin: 'nal',  arabic: 'نال',  ipa: 'nal',     pos: 'verb',    translation_ar: 'يشوف',  translation_en: 'to see',        source: 'abdel-hafiz-1988', verified: true },
  { lexeme_id: 'xnz_0051', root: 'jom',  old_nubian: 'ⳉⲟⲙ',  latin: 'jom',  arabic: 'جوم',  ipa: 'dʒom',    pos: 'verb',    translation_ar: 'يضرب',  translation_en: 'to hit',        source: 'abdel-hafiz-1988', verified: true },
];

// ── 3. Lessons ───────────────────────────────────────────────────────────────
const LESSONS = [
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
    cultural_note: 'Mattokki has no grammatical gender — unlike Arabic. The same pronouns refer to men, women, and objects.',
    cultural_note_ar: 'مفيش جنس نحوي في المطوكي — مختلف عن العربي.',
  },
  {
    id: 'L2',
    phase: 1,
    index: 2,
    title: 'My Family',
    title_ar: 'عيلتي',
    objectives: ['Kinship terms', 'Subject positioning'],
    cultural_note: 'Kinship is the centre of Nubian social life.',
    cultural_note_ar: 'العيلة هي أساس الحياة الاجتماعية النوبية.',
  },
  {
    id: 'L3',
    phase: 1,
    index: 3,
    title: 'The Indefinite',
    title_ar: 'النكرة',
    objectives: ['Indefinite suffix -we:r', 'Bilabial assimilation -be:r'],
    cultural_note: 'Animals in traditional Nubian agriculture.',
    cultural_note_ar: 'الحيوانات في الزراعة النوبية التقليدية.',
  },
  {
    id: 'L4',
    phase: 1,
    index: 4,
    title: 'The World Around Us',
    title_ar: 'العالم حوالينا',
    objectives: ['Zero-marked definiteness', 'Nile vocabulary: essi, ig, seer'],
    cultural_note: 'The Nile is the centre of Nubian civilization. The same word your grandmother used.',
    cultural_note_ar: 'النيل هو قلب الحضارة النوبية.',
  }
];

// ── 4. Exercises of Lesson 1 ──────────────────────────────────────────────────
const EXERCISES = [
  {
    id: 'L1_E1',
    lesson_id: 'L1',
    kind: 'audio_match',
    morpheme_map: { lexeme_ids: ['xnz_0001'], rule_ids: [], primary_layer: 'lexical' },
    data: {
      audio_url: 'https://cdn.essi.app/audio/placeholder-chime.wav',
      prompt_lexeme_id: 'xnz_0001',
      options: [
        { ar: 'أنا', en: 'I', correct: true },
        { ar: 'هو / هي', en: 'he / she', correct: false },
        { ar: 'إنت', en: 'you', correct: false },
        { ar: 'إحنا', en: 'we', correct: false },
      ]
    }
  },
  {
    id: 'L1_E2',
    lesson_id: 'L1',
    kind: 'mcq',
    morpheme_map: { lexeme_ids: ['xnz_0001'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
    data: {
      prompt_mattokki: 'ay kenzi-ma',
      prompt_old_nubian: 'ⲁⲩ ⲕⲉⲛⳉⲓ-ⲙⲁ',
      prompt_arabic_transliteration: 'آي كينزي-ما',
      morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
      options: [
        { ar: 'أنا نوبي', en: 'I am Nubian', correct: true },
        { ar: 'هو نوبي', en: 'He is Nubian', correct: false },
        { ar: 'إنت نوبي', en: 'You are Nubian', correct: false },
        { ar: 'أنا في الكنوز', en: 'I am in the treasures', correct: false },
      ]
    }
  },
  {
    id: 'L1_E3',
    lesson_id: 'L1',
    kind: 'audio_match',
    morpheme_map: { lexeme_ids: ['xnz_0002'], rule_ids: [], primary_layer: 'lexical' },
    data: {
      audio_url: 'https://cdn.essi.app/audio/placeholder-chime.wav',
      prompt_lexeme_id: 'xnz_0002',
      options: [
        { ar: 'إنت', en: 'you', correct: true },
        { ar: 'أنا', en: 'I', correct: false },
        { ar: 'هو / هي', en: 'he / she', correct: false },
        { ar: 'هم', en: 'they', correct: false },
      ]
    }
  },
  {
    id: 'L1_E4',
    lesson_id: 'L1',
    kind: 'mcq',
    morpheme_map: { lexeme_ids: ['xnz_0002'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
    data: {
      prompt_mattokki: 'ir kenzi-ma',
      prompt_old_nubian: 'ⲓⲣ ⲕⲉⲛⳉⲓ-ⲙⲁ',
      prompt_arabic_transliteration: 'إير كينزي-ما',
      morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
      options: [
        { ar: 'إنت نوبي', en: 'You are Nubian', correct: true },
        { ar: 'أنا نوبي', en: 'I am Nubian', correct: false },
        { ar: 'هو نوبي', en: 'He is Nubian', correct: false },
        { ar: 'هي نوبية', en: 'She is Nubian', correct: false },
      ]
    }
  },
  {
    id: 'L1_E5',
    lesson_id: 'L1',
    kind: 'word_arrange',
    morpheme_map: { lexeme_ids: ['xnz_0010', 'xnz_0011', 'xnz_0050'], rule_ids: [], primary_layer: 'lexical' },
    data: {
      prompt_en: 'The man sees the girl.',
      prompt_ar: 'الراجل بيشوف البنت.',
      solution: [
        { role: 'S', lexeme_id: 'xnz_0010', surface: 'id' },
        { role: 'O', lexeme_id: 'xnz_0011', surface: 'buru' },
        { role: 'V', lexeme_id: 'xnz_0050', surface: 'nal' },
      ]
    }
  },
  {
    id: 'L1_E6',
    lesson_id: 'L1',
    kind: 'audio_match',
    morpheme_map: { lexeme_ids: ['xnz_0003'], rule_ids: [], primary_layer: 'lexical' },
    data: {
      audio_url: 'https://cdn.essi.app/audio/placeholder-chime.wav',
      prompt_lexeme_id: 'xnz_0003',
      options: [
        { ar: 'هو / هي', en: 'he / she / it', correct: true },
        { ar: 'أنا', en: 'I', correct: false },
        { ar: 'إنت', en: 'you', correct: false },
        { ar: 'إحنا', en: 'we', correct: false },
      ]
    }
  },
  {
    id: 'L1_E7',
    lesson_id: 'L1',
    kind: 'mcq',
    morpheme_map: { lexeme_ids: ['xnz_0003'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
    data: {
      prompt_mattokki: 'tar id-ma',
      prompt_old_nubian: 'ⲧⲁⲣ ⲓⲇ-ⲙⲁ',
      prompt_arabic_transliteration: 'تار إيد-ما',
      morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
      options: [
        { ar: 'هو راجل', en: 'He is a man', correct: true },
        { ar: 'أنا راجل', en: 'I am a man', correct: false },
        { ar: 'هي راجلة', en: 'She is a woman', correct: false },
        { ar: 'إنت راجل', en: 'You are a man', correct: false },
      ]
    }
  },
  {
    id: 'L1_E8',
    lesson_id: 'L1',
    kind: 'word_arrange',
    morpheme_map: { lexeme_ids: ['xnz_0011', 'xnz_0042', 'xnz_0051'], rule_ids: [], primary_layer: 'lexical' },
    data: {
      prompt_en: 'The girl hits the water.',
      prompt_ar: 'البنت بتضرب الماية.',
      solution: [
        { role: 'S', lexeme_id: 'xnz_0011', surface: 'buru' },
        { role: 'O', lexeme_id: 'xnz_0042', surface: 'essi' },
        { role: 'V', lexeme_id: 'xnz_0051', surface: 'jom' },
      ]
    }
  },
  {
    id: 'L1_E9',
    lesson_id: 'L1',
    kind: 'suffix_snap',
    morpheme_map: { lexeme_ids: ['xnz_0010'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
    data: {
      root_lexeme_id: 'xnz_0010',
      correct_suffix_rule_id: 'COPULA_MA',
      distractor_suffix_rule_ids: ['INDEF_SUFFIX_WER', 'FUTURE_CIRCUMFIX_BI'],
      expected_surface: 'id-ma',
    }
  },
  {
    id: 'L1_E10',
    lesson_id: 'L1',
    kind: 'mcq',
    morpheme_map: { lexeme_ids: ['xnz_0001', 'xnz_0012'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
    data: {
      prompt_mattokki: 'ay éen-ma',
      prompt_old_nubian: 'ⲁⲩ ⲉⲉⲛ-ⲙⲁ',
      prompt_arabic_transliteration: 'آي إين-ما',
      morpheme_highlights: [{ surface: '-ma', rule_id: 'COPULA_MA' }],
      options: [
        { ar: 'أنا أم', en: 'I am a mother', correct: true },
        { ar: 'هو أب', en: 'He is a father', correct: false },
        { ar: 'أنا أب', en: 'I am a father', correct: false },
        { ar: 'إنت أم', en: 'You are a mother', correct: false },
      ]
    }
  },
  {
    id: 'L1_E11',
    lesson_id: 'L1',
    kind: 'suffix_snap',
    morpheme_map: { lexeme_ids: ['xnz_0011'], rule_ids: ['COPULA_MA'], primary_layer: 'morphological' },
    data: {
      root_lexeme_id: 'xnz_0011',
      correct_suffix_rule_id: 'COPULA_MA',
      distractor_suffix_rule_ids: ['INDEF_SUFFIX_WER', 'FUTURE_CIRCUMFIX_BI'],
      expected_surface: 'buru-ma',
    }
  },
  {
    id: 'L1_E12',
    lesson_id: 'L1',
    kind: 'audio_match',
    morpheme_map: { lexeme_ids: ['xnz_0042'], rule_ids: [], primary_layer: 'lexical' },
    data: {
      audio_url: 'https://cdn.essi.app/audio/placeholder-chime.wav',
      prompt_lexeme_id: 'xnz_0042',
      options: [
        { ar: 'ماء', en: 'water', correct: true },
        { ar: 'نار', en: 'fire', correct: false },
        { ar: 'راجل', en: 'man', correct: false },
        { ar: 'بنت', en: 'girl', correct: false },
      ]
    }
  }
];

// Helper to make native fetch Postgrest request
async function postgrestUpsert(table, data) {
  const endpoint = `${URL}/rest/v1/${table}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'apikey': KEY,
      'Authorization': `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    throw new Error(`Failed to upsert to ${table}: ${await res.text()}`);
  }
}

async function postgrestDelete(table, queryParams) {
  const endpoint = `${URL}/rest/v1/${table}?${queryParams}`;
  const res = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'apikey': KEY,
      'Authorization': `Bearer ${KEY}`
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to delete from ${table}: ${await res.text()}`);
  }
}

async function run() {
  console.log('\n🌊 Essi — Seeding Database via Postgrest...\n');

  // ── 1. Seed morphology_rules ─────────────────────────────────────────────
  console.log('Seeding morphology_rules...');
  await postgrestUpsert('morphology_rules', MORPHOLOGY_RULES);
  console.log(`  ✓ ${MORPHOLOGY_RULES.length} morphology rules upserted`);

  // ── 2. Seed lexicon_roots ────────────────────────────────────────────────
  console.log('Seeding lexicon_roots...');
  await postgrestUpsert('lexicon_roots', LEXICON);
  console.log(`  ✓ ${LEXICON.length} lexicon entries upserted`);

  // ── 3. Seed lessons ──────────────────────────────────────────────────────
  console.log('Seeding lessons...');
  await postgrestUpsert('lessons', LESSONS);
  console.log(`  ✓ ${LESSONS.length} lessons upserted`);

  // ── 4. Seed exercises ────────────────────────────────────────────────────
  console.log('Seeding exercises...');
  const upsertExercises = EXERCISES.map(e => ({
    id: e.id,
    lesson_id: e.lesson_id,
    kind: e.kind,
    data: e.data
  }));
  await postgrestUpsert('exercises', upsertExercises);
  console.log(`  ✓ ${upsertExercises.length} exercises upserted`);

  // ── 5. Seed exercise_morpheme_map ────────────────────────────────────────
  console.log('Seeding exercise_morpheme_map...');
  
  // Build query to clean existing mappings for L1 exercises
  const inParams = EXERCISES.map(e => `exercise_id.eq.${e.id}`).join(',');
  await postgrestDelete('exercise_morpheme_map', `or=(${inParams})`);

  // Build rows to insert
  const mapRows = [];
  for (const ex of EXERCISES) {
    const { lexeme_ids, rule_ids, primary_layer } = ex.morpheme_map;
    
    for (const lexId of lexeme_ids) {
      mapRows.push({
        exercise_id: ex.id,
        lexeme_id: lexId,
        rule_id: null,
        primary_layer: primary_layer
      });
    }
    
    for (const ruleId of rule_ids) {
      mapRows.push({
        exercise_id: ex.id,
        lexeme_id: null,
        rule_id: ruleId,
        primary_layer: primary_layer
      });
    }
  }

  // Insert mappings
  await postgrestUpsert('exercise_morpheme_map', mapRows);
  console.log(`  ✓ ${mapRows.length} exercise morpheme mapping rows inserted`);

  console.log('\n✅  Database seeding complete via Postgrest.\n');
}

run().catch((err) => {
  console.error('\n❌ Seed failed:');
  console.error(err.message || err);
  process.exit(1);
});
