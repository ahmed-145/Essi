// Essi — shared TypeScript types
// Maps closely to the Supabase schema in PRD §6.2

export type ScriptPref = 'nubian' | 'arabic' | 'latin';
export type LangPref = 'ar' | 'en';

export type POS = 'noun' | 'verb' | 'pronoun' | 'adj' | 'adv' | 'particle';

/** A base lexical root (lexeme) — PRD lexicon_roots */
export interface Lexeme {
  id: string;                  // e.g. 'xnz_0042'
  root: string;                // 'essi'
  old_nubian: string;          // 'ⲉⲥⲥⲓ'
  latin: string;
  arabic: string;
  ipa: string;
  pos: POS;
  translation_ar: string;
  translation_en: string;
  // number = a local require()'d asset — prototype-only placeholder audio (Phase -1).
  // Production audio is always a remote Supabase Storage/CDN URL (string).
  audio_url?: string | number;
  example_sentence?: string;
  example_translation_ar?: string;
  example_translation_en?: string;
  source: string;              // 'abdel-hafiz-1988' | 'massenbach-1933' | ...
  verified: boolean;
}

/** Grammatical / morphological rule — PRD morphology_rules */
export interface MorphologyRule {
  id: string;                  // 'ACC_ALLOMORPH_TI'
  suffix: string;              // '-ti'
  family: 'accusative' | 'indefinite' | 'tense' | 'plural' | 'genitive' | 'locative';
  phonological_condition: string;  // 'after alveolar stops'
  example: string;             // 'id → it-ti'
  description_ar: string;
  description_en: string;
}

export type ExerciseKind = 'audio_match' | 'word_arrange' | 'suffix_snap' | 'mcq';

export interface ExerciseBase {
  id: string;
  lesson_id: string;
  kind: ExerciseKind;
  /** Which morphemic layers this exercise tests — drives the ML-SRS */
  morpheme_map: { lexeme_ids: string[]; rule_ids: string[]; primary_layer: 'lexical' | 'morphological' };
}

export interface AudioMatchExercise extends ExerciseBase {
  kind: 'audio_match';
  // number = local placeholder asset (Phase -1 prototype); string = production CDN URL.
  audio_url: string | number;
  prompt_lexeme_id: string;
  options: Array<{ ar: string; en: string; correct: boolean }>;
}

export interface WordArrangeExercise extends ExerciseBase {
  kind: 'word_arrange';
  prompt_en: string;
  prompt_ar: string;
  /** Solution in SOV order; blocks are labelled by role */
  solution: Array<{ role: 'S' | 'O' | 'V'; lexeme_id: string; surface: string }>;
}

export interface SuffixSnapExercise extends ExerciseBase {
  kind: 'suffix_snap';
  root_lexeme_id: string;
  correct_suffix_rule_id: string;
  distractor_suffix_rule_ids: string[];
  /** The expected surface form after assimilation (e.g. 'it-ti') */
  expected_surface: string;
}

export interface McqExercise extends ExerciseBase {
  kind: 'mcq';
  prompt_mattokki: string;       // 'ay kenzi-ma'
  prompt_old_nubian: string;     // 'ⲁⲩ ⲕⲉⲛⳉⲓ-ⲙⲁ'
  prompt_arabic_transliteration: string;
  /** Underlined morphemes & their grammar-tooltip rule_ids */
  morpheme_highlights: Array<{ surface: string; rule_id: string }>;
  options: Array<{ ar: string; en: string; correct: boolean }>;
}

export type Exercise = AudioMatchExercise | WordArrangeExercise | SuffixSnapExercise | McqExercise;

export interface Lesson {
  id: string;                  // 'L4'
  phase: 1 | 2 | 3 | 4 | 5;
  index: number;               // 1-30
  title: string;
  title_ar: string;
  objectives: string[];
  cultural_note: string;
  cultural_note_ar: string;
  exercises: Exercise[];
}

export interface UserProfile {
  id: string;
  display_name: string | null;
  streak: number;
  xp: number;
  level: number;
  script_preference: ScriptPref;
  language_preference: LangPref;
  daily_goal_minutes: 3 | 10 | 20;
  motivation: 'heritage_primary' | 'heritage_urgent' | 'cultural_explorer' | 'casual';
  notifications_enabled: boolean;
  notification_time: string;   // 'HH:mm'
}

/** Per-user SRS state for one lexeme — PRD srs_lexical */
export interface LexicalSrs {
  lexeme_id: string;
  recall_prob: number;     // 0–1
  interval_days: number;
  ease_factor: number;     // 1.3 .. 3.0
  next_review: string;     // ISO timestamp
  total_attempts: number;
  correct_streak: number;
}

/** Per-user SRS state for one morphological rule — PRD srs_morphology */
export interface MorphologicalSrs {
  rule_id: string;
  recall_prob: number;
  interval_days: number;
  ease_factor: number;
  next_review: string;
  /** wrong → confused-with rule_id, count */
  error_pattern: Record<string, { confused_with: string | null; count: number }>;
}
