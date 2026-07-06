// Morpheme-Level Spaced Repetition System (ML-SRS) — PRD §6.4
// SM-2 extended to track lexical roots AND grammatical morphemes as
// independent knowledge items, plus contrastive-pair detection.

import type { Exercise, LexicalSrs, MorphologicalSrs } from '../types';

const NOW = () => new Date();
const DAYS = (n: number) => n * 24 * 60 * 60 * 1000;

const DEFAULT_LEX: Omit<LexicalSrs, 'lexeme_id'> = {
  recall_prob: 0.0,
  interval_days: 1,
  ease_factor: 2.5,
  next_review: NOW().toISOString(),
  total_attempts: 0,
  correct_streak: 0,
};
const DEFAULT_RULE: Omit<MorphologicalSrs, 'rule_id'> = {
  recall_prob: 0.0,
  interval_days: 1,
  ease_factor: 2.5,
  next_review: NOW().toISOString(),
  error_pattern: {},
};

/** Confusion threshold — after this many mix-ups, inject a contrastive exercise. */
export const CONFUSION_THRESHOLD = 3;

interface UpdateInput {
  exercise: Exercise;
  isCorrect: boolean;
  /** For wrong answers on suffix_snap / mcq, what did the user pick? */
  wrongRuleId?: string | null;
  prevLex: Record<string, LexicalSrs>;
  prevRule: Record<string, MorphologicalSrs>;
}
interface UpdateOutput {
  lex: Record<string, LexicalSrs>;
  rule: Record<string, MorphologicalSrs>;
  /** Pairs of (target_rule, confused_with) that just hit the threshold */
  contrastive_flags: Array<{ target: string; confused_with: string }>;
}

/** PRD §6.4 update_srs_on_answer */
export function updateSrsOnAnswer(input: UpdateInput): UpdateOutput {
  const { exercise, isCorrect, wrongRuleId } = input;
  const lex = { ...input.prevLex };
  const rule = { ...input.prevRule };
  const flags: UpdateOutput['contrastive_flags'] = [];
  const now = NOW();

  // 1) Update lexical SRS for every lexeme this exercise referenced.
  for (const lid of exercise.morpheme_map.lexeme_ids) {
    const prev = lex[lid] ?? { lexeme_id: lid, ...DEFAULT_LEX };
    if (isCorrect) {
      const ef = Math.min(prev.ease_factor + 0.1, 3.0);
      const interval = Math.max(1, Math.round(prev.interval_days * ef));
      lex[lid] = {
        ...prev,
        ease_factor: ef,
        interval_days: interval,
        next_review: new Date(now.getTime() + DAYS(interval)).toISOString(),
        total_attempts: prev.total_attempts + 1,
        correct_streak: prev.correct_streak + 1,
        recall_prob: Math.min(1, prev.recall_prob + 0.15),
      };
    } else {
      lex[lid] = {
        ...prev,
        ease_factor: Math.max(prev.ease_factor - 0.2, 1.3),
        interval_days: 1,
        next_review: new Date(now.getTime() + DAYS(1)).toISOString(),
        total_attempts: prev.total_attempts + 1,
        correct_streak: 0,
        recall_prob: Math.max(0, prev.recall_prob - 0.25),
      };
    }
  }

  // 2) Update morphological SRS for every rule this exercise tested.
  for (const rid of exercise.morpheme_map.rule_ids) {
    const prev = rule[rid] ?? { rule_id: rid, ...DEFAULT_RULE };
    if (isCorrect) {
      const ef = Math.min(prev.ease_factor + 0.1, 3.0);
      // Morphology reinforces slower than vocab: ×1.8 vs ×ef
      const interval = Math.max(1, Math.round(prev.interval_days * 1.8));
      rule[rid] = {
        ...prev,
        ease_factor: ef,
        interval_days: interval,
        next_review: new Date(now.getTime() + DAYS(interval)).toISOString(),
        recall_prob: Math.min(1, prev.recall_prob + 0.10),
      };
    } else {
      // Log the wrong rule into error_pattern; identify confusion.
      const confusedWith = wrongRuleId ?? null;
      const ep = { ...prev.error_pattern };
      const key = confusedWith ?? '__unknown__';
      const prevEntry = ep[key] ?? { confused_with: confusedWith, count: 0 };
      ep[key] = { confused_with: confusedWith, count: prevEntry.count + 1 };
      if (confusedWith && ep[key].count === CONFUSION_THRESHOLD) {
        flags.push({ target: rid, confused_with: confusedWith });
      }
      rule[rid] = {
        ...prev,
        ease_factor: Math.max(prev.ease_factor - 0.2, 1.3),
        interval_days: 1,
        next_review: new Date(now.getTime() + DAYS(1)).toISOString(),
        recall_prob: Math.max(0, prev.recall_prob - 0.20),
        error_pattern: ep,
      };
    }
  }

  return { lex, rule, contrastive_flags: flags };
}

interface SessionInput {
  lex: Record<string, LexicalSrs>;
  rule: Record<string, MorphologicalSrs>;
  pool: Exercise[];          // every exercise the user has unlocked
  size?: number;             // session length, default 15
}

/** PRD §6.4 generate_review_session */
export function generateReviewSession(input: SessionInput) {
  const { lex, rule, pool } = input;
  const size = input.size ?? 15;
  const now = NOW();

  // Items "due" right now
  const dueLex = Object.values(lex)
    .filter((l) => new Date(l.next_review) <= now)
    .sort((a, b) => a.recall_prob - b.recall_prob)
    .slice(0, 8);

  const dueRules = Object.values(rule)
    .filter((r) => new Date(r.next_review) <= now)
    .sort((a, b) => a.recall_prob - b.recall_prob)
    .slice(0, 4);

  // Build queue
  const queue: Exercise[] = [];
  const used = new Set<string>();
  const sessionFocus: string[] = [];

  for (const r of dueRules) {
    sessionFocus.push(r.rule_id);
    const primary = pool.find((e) => !used.has(e.id) && e.morpheme_map.rule_ids.includes(r.rule_id));
    if (primary) { queue.push(primary); used.add(primary.id); }

    // Contrastive pair?
    const confusion = Object.values(r.error_pattern)
      .filter((p) => p.confused_with && p.count >= CONFUSION_THRESHOLD)
      .sort((a, b) => b.count - a.count)[0];
    if (confusion?.confused_with) {
      const contrast = pool.find(
        (e) => !used.has(e.id) && e.morpheme_map.rule_ids.includes(confusion.confused_with!),
      );
      if (contrast) { queue.push(contrast); used.add(contrast.id); }
    }
  }

  // Fill remaining slots with lexical-focused items
  for (const l of dueLex) {
    if (queue.length >= size) break;
    const ex = pool.find((e) => !used.has(e.id) && e.morpheme_map.lexeme_ids.includes(l.lexeme_id));
    if (ex) { queue.push(ex); used.add(ex.id); }
  }

  // Shuffle (interleave) — Fisher-Yates
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  return { queue, sessionFocus };
}
