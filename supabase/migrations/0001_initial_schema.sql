-- Essi initial schema — PRD §6.3 (Core Database Tables)
-- Ready to run the moment a Supabase project exists: paste into the SQL
-- Editor (Supabase dashboard → SQL Editor → New query) or `supabase db push`
-- once the CLI is linked to a project. No live connection needed to write
-- or review this file — that's the point of preparing it now (Phase 0).
--
-- Field names mirror what the React Native app already expects
-- (Essi-fr/essi-rn/types/index.ts) so frontend and backend agree from day 1.

-- ─────────────────────────────────────────────────────────────────────────
-- Content tables (populated by the founder/admin tool — Phase 4 — not by
-- end users). RLS: public read, service-role write.
-- ─────────────────────────────────────────────────────────────────────────

create table lexicon_roots (
  lexeme_id              text primary key,          -- e.g. 'xnz_0001'
  root                    text not null,
  old_nubian              text,                       -- Coptic-script form, e.g. 'ⲉⲥⲥⲓ'
  latin                   text not null,
  arabic                  text,
  ipa                     text,
  pos                     text,                       -- part of speech
  translation_ar          text not null,
  translation_en          text not null,
  example_sentence        text,
  example_translation_ar  text,
  example_translation_en  text,
  -- §14 Content Governance gate: every row must cite its source and stay
  -- unverified until an elder/native speaker has confirmed it.
  source                  text not null,              -- e.g. 'abdel-hafiz-1988-p42'
  verified                boolean not null default false,
  created_at              timestamptz not null default now()
);

create table morphology_rules (
  id                      text primary key,           -- e.g. 'INDEF_SUFFIX_WER'
  suffix                  text not null,               -- e.g. '-we:r'
  family                  text not null check (family in
                            ('accusative','indefinite','tense','plural','genitive','locative')),
  phonological_condition  text not null,
  example                 text,
  description_ar          text,
  description_en          text,
  source                  text not null,
  verified                boolean not null default false,
  created_at              timestamptz not null default now()
);

create table lessons (
  id                text primary key,                 -- e.g. 'L1'
  phase             int not null,
  "index"           int not null,
  title             text not null,
  title_ar          text not null,
  objectives        text[] not null default '{}',
  cultural_note     text,
  cultural_note_ar  text,
  created_at        timestamptz not null default now()
);

create table exercises (
  id            text primary key,                     -- e.g. 'L1_E1'
  lesson_id     text not null references lessons(id) on delete cascade,
  kind          text not null check (kind in
                  ('audio_match','word_arrange','suffix_snap','mcq')),
  -- Kind-specific fields (audio_url, options, prompt_*, morpheme_highlights,
  -- etc.) vary by exercise type — stored as JSONB rather than many nullable
  -- columns. Shape must match the matching TS type in types/index.ts.
  data          jsonb not null default '{}',
  created_at    timestamptz not null default now()
);

-- Many-to-many: which lexemes/rules does each exercise test, and at what
-- primary layer. This is what generate_review_session() and
-- update_srs_on_answer() actually query (Phase 3).
create table exercise_morpheme_map (
  -- Surrogate key, not a composite one: lexeme_id/rule_id are nullable
  -- (a row tests EITHER a lexeme OR a rule, sometimes not both), and a
  -- PRIMARY KEY forces every one of its columns to be NOT NULL — so they
  -- can't be part of it. Uniqueness is instead enforced by the expression
  -- index below (Postgres allows expressions in an index, just not inline
  -- in a table-level PRIMARY KEY constraint — that was the bug).
  id             bigint generated always as identity primary key,
  exercise_id    text not null references exercises(id) on delete cascade,
  lexeme_id      text references lexicon_roots(lexeme_id),
  rule_id        text references morphology_rules(id),
  primary_layer  text not null check (primary_layer in ('lexical','morphological'))
);
create unique index exercise_morpheme_map_uniq
  on exercise_morpheme_map (exercise_id, coalesce(lexeme_id, ''), coalesce(rule_id, ''));
create index idx_emm_lexeme on exercise_morpheme_map(lexeme_id);
create index idx_emm_rule    on exercise_morpheme_map(rule_id);

create table speakers (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  age_group          text,                             -- 'elder' | 'younger_fluent' | ...
  region             text,
  consent_status     text not null default 'pending' check (consent_status in
                       ('pending','consented','withdrawn')),
  consent_date       date,
  credit_name        text,                              -- public-facing name for Sources section
  compensation_notes text,
  created_at         timestamptz not null default now()
);
-- Speaker PII (name, region, consent) is sensitive — service-role only, never
-- exposed to the public/anon client role. See RLS section below.

create table media_assets (
  id                  uuid primary key default gen_random_uuid(),
  lexeme_id           text references lexicon_roots(lexeme_id),
  exercise_id         text references exercises(id),
  storage_url         text not null,                    -- Supabase Storage path/URL
  speaker_id          uuid references speakers(id),
  speaker_demographic text,
  take_number         int default 1,
  created_at          timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- User tables. RLS: a user can only read/write their own row(s).
-- ─────────────────────────────────────────────────────────────────────────

create table user_profiles (
  user_id             uuid primary key references auth.users(id) on delete cascade,
  auth_provider       text,
  streak              int not null default 0,
  xp                  int not null default 0,
  script_preference   text not null default 'latin' check (script_preference in ('nubian','arabic','latin')),
  language_preference text not null default 'ar',
  daily_goal          int default 3,                    -- minutes: 3 / 10 / 20 (drop/cup/river)
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table srs_lexical (
  user_id        uuid not null references auth.users(id) on delete cascade,
  lexeme_id      text not null references lexicon_roots(lexeme_id),
  recall_prob    float not null default 1.0,
  interval_days  float not null default 1,
  ease_factor    float not null default 2.5,
  next_review    timestamptz not null default now(),
  total_attempts int not null default 0,
  correct_streak int not null default 0,
  primary key (user_id, lexeme_id)
);
create index idx_srs_lexical_due on srs_lexical(user_id, next_review);

create table srs_morphology (
  user_id        uuid not null references auth.users(id) on delete cascade,
  rule_id        text not null references morphology_rules(id),
  recall_prob    float not null default 1.0,
  interval_days  float not null default 1,
  ease_factor    float not null default 2.5,
  next_review    timestamptz not null default now(),
  error_pattern  jsonb not null default '[]',            -- log of wrong-suffix/confused-rule entries
  primary key (user_id, rule_id)
);
create index idx_srs_morphology_due on srs_morphology(user_id, next_review);

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────────────

alter table lexicon_roots         enable row level security;
alter table morphology_rules      enable row level security;
alter table lessons               enable row level security;
alter table exercises             enable row level security;
alter table exercise_morpheme_map enable row level security;
alter table media_assets          enable row level security;
alter table user_profiles         enable row level security;
alter table srs_lexical           enable row level security;
alter table srs_morphology        enable row level security;
-- speakers: NOT given a public-read policy below — service-role only, by omission.
alter table speakers              enable row level security;

-- Public content: anyone (incl. anon) can read; only service-role can write.
create policy "public read" on lexicon_roots         for select using (true);
create policy "public read" on morphology_rules       for select using (true);
create policy "public read" on lessons                for select using (true);
create policy "public read" on exercises              for select using (true);
create policy "public read" on exercise_morpheme_map  for select using (true);
create policy "public read" on media_assets           for select using (true);

-- User data: a user can only see/modify their own rows.
create policy "own profile"      on user_profiles  for all using (auth.uid() = user_id);
create policy "own srs_lexical"  on srs_lexical     for all using (auth.uid() = user_id);
create policy "own srs_morphology" on srs_morphology for all using (auth.uid() = user_id);

-- speakers: no policy created → RLS blocks all client access by default.
-- Read/write only via service-role key (server-side / admin tool, Phase 4).
