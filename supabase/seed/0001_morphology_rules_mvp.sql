-- Seed: morphology_rules — MVP scope only (indefinite, imperative, genitive).
-- Accusative allomorphs (ACC_ALLOMORPH_*) are deliberately NOT seeded here —
-- they're v1.5 content (Lessons 13-17), per PRD §6.4's MVP/v1.5 split.
--
-- ⚠️ LINGUISTIC INTEGRITY (PRD §14) — read before touching this file:
-- Every row is seeded with verified = false and a `source` placeholder.
-- **Do not flip verified to true** until each rule is confirmed against a
-- specific Abdel-Hafiz (1988) page citation AND signed off by the elder /
-- native-speaker advisory panel. This file exists to get the schema
-- populated for development, not to assert these forms are launch-ready.
--
-- What's deliberately MISSING: a present-tense suffix rule (curriculum L9
-- calls for one, but the PRD text only says "present/neutral tense
-- suffixes" without giving the actual suffix string). Rather than guess a
-- plausible-looking Mattokki suffix, this file leaves that row out. Add it
-- only once you have the real form from Abdel-Hafiz or a native speaker.

insert into morphology_rules (id, suffix, family, phonological_condition, example, description_ar, description_en, source, verified)
values
  (
    'INDEF_SUFFIX_WER', '-we:r', 'indefinite',
    'Default indefinite-article context (most environments)',
    'darbad-we:r (a chicken)',
    'أداة النكرة الافتراضية في المطوكي',
    'Default indefinite article suffix in Mattokki',
    'abdel-hafiz-1988 (page TBD)', false
  ),
  (
    'INDEF_BILABIAL_BER', '-be:r', 'indefinite',
    'After bilabial-final nouns (assimilation of -we:r)',
    'TBD — needs a concrete bilabial-final example from source',
    'صيغة النكرة بعد الحروف الشفوية (إبدال -وير لـ -بير)',
    'Indefinite suffix assimilates to -be:r after bilabial-final nouns',
    'abdel-hafiz-1988 (page TBD)', false
  ),
  (
    'IMPER_PLURAL', '-we / -be', 'tense',
    'Plural imperative (commands directed at more than one person) — L7',
    'TBD — needs a concrete example from source',
    'صيغة الأمر للجمع',
    'Plural imperative suffix (curriculum L7 — Plural Commands)',
    'essi-prd curriculum §11.2 L7 (needs Abdel-Hafiz page citation)', false
  ),
  (
    'IMPER_HABITUAL', '-ke / -ce', 'tense',
    'Habitual imperative (repeated/customary commands) — L8',
    'TBD — needs a concrete example from source',
    'صيغة الأمر المعتاد',
    'Habitual imperative suffix (curriculum L8 — Habitual Commands)',
    'essi-prd curriculum §11.2 L8 (needs Abdel-Hafiz page citation)', false
  ),
  (
    'GENITIVE', '-na / -in', 'genitive',
    'Possessive/genitive marking — L11',
    'TBD — needs a concrete example from source',
    'صيغة الملكية (المضاف إليه)',
    'Genitive/possessive suffix (curriculum L11 — Possession)',
    'essi-prd curriculum §11.2 L11 (needs Abdel-Hafiz page citation)', false
  );

-- NOT seeded (intentionally): a present-tense rule for curriculum L9.
-- The PRD only describes it as "present/neutral tense suffixes" without a
-- concrete suffix string — do not fabricate one. Source it from
-- Abdel-Hafiz (1988) or a native speaker, then add the row here.
