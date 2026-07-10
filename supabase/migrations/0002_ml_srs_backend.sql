-- Essi — Phase 3 ML-SRS Backend Migration
-- Creates progress_events table, triggers to run update_srs_on_answer on insert,
-- generate_review_session RPC function, and user/aggregate metrics functions.

-- ── 1. Create progress_events Table ──────────────────────────────────────────
create table progress_events (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade default auth.uid(),
  exercise_id    text not null references exercises(id) on delete cascade,
  is_correct     boolean not null,
  wrong_rule_id  text references morphology_rules(id) on delete set null,
  ms_to_answer   int not null default 0,
  created_at     timestamptz not null default now()
);

-- Enable RLS on progress_events
alter table progress_events enable row level security;

-- Policies for progress_events
create policy "users can insert own progress_events" on progress_events 
  for insert with check (auth.uid() = user_id);

create policy "users can select own progress_events" on progress_events 
  for select using (auth.uid() = user_id);

-- ── 2. Trigger Function: update_srs_on_answer ───────────────────────────────
create or replace function trg_update_srs_on_answer()
returns trigger
language plpgsql
security definer
as $$
declare
  map_rec record;
  current_ef float;
  current_interval float;
  current_recall float;
  current_attempts int;
  current_streak int;
  
  current_ep jsonb;
  key_name text;
  current_count int;
  new_entry jsonb;
begin
  -- Loop through all lexemes and rules tested by this exercise
  for map_rec in (
    select lexeme_id, rule_id, primary_layer
    from exercise_morpheme_map
    where exercise_id = new.exercise_id
  ) loop
    
    -- A. Update Lexical SRS if lexeme_id is mapped
    if map_rec.lexeme_id is not null then
      -- Try to select current SRS state
      select ease_factor, interval_days, recall_prob, total_attempts, correct_streak
      into current_ef, current_interval, current_recall, current_attempts, current_streak
      from srs_lexical
      where user_id = new.user_id and lexeme_id = map_rec.lexeme_id;
      
      if found then
        if new.is_correct then
          current_ef := least(current_ef + 0.1, 3.0);
          current_interval := greatest(1, round(current_interval * current_ef));
          current_streak := current_streak + 1;
          current_recall := least(1.0, current_recall + 0.15);
        else
          current_ef := greatest(current_ef - 0.2, 1.3);
          current_interval := 1;
          current_streak := 0;
          current_recall := greatest(0.0, current_recall - 0.25);
        end if;
        current_attempts := current_attempts + 1;
        
        update srs_lexical
        set ease_factor = current_ef,
            interval_days = current_interval,
            next_review = now() + (current_interval * interval '1 day'),
            total_attempts = current_attempts,
            correct_streak = current_streak,
            recall_prob = current_recall
        where user_id = new.user_id and lexeme_id = map_rec.lexeme_id;
      else
        -- Insert new lexical item with default values
        if new.is_correct then
          insert into srs_lexical (user_id, lexeme_id, ease_factor, interval_days, next_review, total_attempts, correct_streak, recall_prob)
          values (new.user_id, map_rec.lexeme_id, 2.6, 3, now() + interval '3 day', 1, 1, 1.0);
        else
          insert into srs_lexical (user_id, lexeme_id, ease_factor, interval_days, next_review, total_attempts, correct_streak, recall_prob)
          values (new.user_id, map_rec.lexeme_id, 2.3, 1, now() + interval '1 day', 1, 0, 0.75);
        end if;
      end if;
    end if;

    -- B. Update Morphological SRS if rule_id is mapped
    if map_rec.rule_id is not null then
      select ease_factor, interval_days, recall_prob, error_pattern
      into current_ef, current_interval, current_recall, current_ep
      from srs_morphology
      where user_id = new.user_id and rule_id = map_rec.rule_id;
      
      if found then
        -- Force array type to object type to prevent parsing issues
        if jsonb_typeof(current_ep) = 'array' or current_ep is null then
          current_ep := '{}'::jsonb;
        end if;

        if new.is_correct then
          current_ef := least(current_ef + 0.1, 3.0);
          current_interval := greatest(1, round(current_interval * 1.8)); -- morphology reinforces slower
          current_recall := least(1.0, current_recall + 0.10);
        else
          current_ef := greatest(current_ef - 0.2, 1.3);
          current_interval := 1;
          current_recall := greatest(0.0, current_recall - 0.20);
          
          -- Log wrong_rule_id to error_pattern
          key_name := coalesce(new.wrong_rule_id, '__unknown__');
          if current_ep ? key_name then
            current_count := (current_ep -> key_name ->> 'count')::int + 1;
          else
            current_count := 1;
          end if;
          
          new_entry := jsonb_build_object(
            'confused_with', case when new.wrong_rule_id is null then null else new.wrong_rule_id end,
            'count', current_count
          );
          current_ep := current_ep || jsonb_build_object(key_name, new_entry);
        end if;
        
        update srs_morphology
        set ease_factor = current_ef,
            interval_days = current_interval,
            next_review = now() + (current_interval * interval '1 day'),
            recall_prob = current_recall,
            error_pattern = current_ep
        where user_id = new.user_id and rule_id = map_rec.rule_id;
      else
        -- Insert new rule
        if new.is_correct then
          insert into srs_morphology (user_id, rule_id, ease_factor, interval_days, next_review, recall_prob, error_pattern)
          values (new.user_id, map_rec.rule_id, 2.6, 2, now() + interval '2 day', 1.0, '{}'::jsonb);
        else
          key_name := coalesce(new.wrong_rule_id, '__unknown__');
          new_entry := jsonb_build_object(
            'confused_with', case when new.wrong_rule_id is null then null else new.wrong_rule_id end,
            'count', 1
          );
          current_ep := jsonb_build_object(key_name, new_entry);
          
          insert into srs_morphology (user_id, rule_id, ease_factor, interval_days, next_review, recall_prob, error_pattern)
          values (new.user_id, map_rec.rule_id, 2.3, 1, now() + interval '1 day', 0.80, current_ep);
        end if;
      end if;
    end if;

  end loop;
  
  return new;
end;
$$;

-- Attach Trigger to progress_events
create trigger trg_after_progress_insert
  after insert on progress_events
  for each row
  execute function trg_update_srs_on_answer();

-- ── 3. RPC: generate_review_session ──────────────────────────────────────────
-- p_user_id is intentionally NOT a parameter — we infer the caller from auth.uid()
-- to prevent any user from querying another user's review session.
create or replace function generate_review_session(p_session_length int default 15)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_now timestamptz := now();
  v_due_lex text[];
  v_due_rules text[];
  v_queue jsonb[] := '{}';
  v_session_focus text[] := '{}';
  v_used_exercises text[] := '{}';
  
  v_rec_rule record;
  v_rec_lex text;
  
  v_primary_ex record;
  v_contrast_ex record;
  v_lex_ex record;
  
  v_confusion_key text;
  v_confusion_val jsonb;
  v_confused_rule_id text;
begin
  -- 1. Fetch due lexical items (lexeme_id) up to 8
  select array_agg(lexeme_id) into v_due_lex
  from (
    select lexeme_id
    from srs_lexical
    where user_id = auth.uid() and next_review <= v_now
    order by recall_prob asc
    limit 8
  ) due_l;

  -- 2. Fetch due morphological rules (rule_id) up to 4
  for v_rec_rule in (
    select rule_id, error_pattern
    from srs_morphology
    where user_id = auth.uid() and next_review <= v_now
    order by recall_prob asc
    limit 4
  ) loop
    v_session_focus := array_append(v_session_focus, v_rec_rule.rule_id);
    
    -- Select 1 exercise primarily testing this rule
    select e.* into v_primary_ex
    from exercises e
    join exercise_morpheme_map emm on e.id = emm.exercise_id
    where emm.rule_id = v_rec_rule.rule_id and not (e.id = any(v_used_exercises))
    limit 1;
    
    if v_primary_ex.id is not null then
      v_queue := array_append(v_queue, jsonb_build_object(
        'id', v_primary_ex.id,
        'lesson_id', v_primary_ex.lesson_id,
        'kind', v_primary_ex.kind,
        'morpheme_map', (
          select jsonb_build_object(
            'lexeme_ids', coalesce(jsonb_agg(distinct lexeme_id) filter (where lexeme_id is not null), '[]'::jsonb),
            'rule_ids', coalesce(jsonb_agg(distinct rule_id) filter (where rule_id is not null), '[]'::jsonb),
            'primary_layer', max(primary_layer)
          )
          from exercise_morpheme_map
          where exercise_id = v_primary_ex.id
        ),
        'data', v_primary_ex.data
      ));
      v_used_exercises := array_append(v_used_exercises, v_primary_ex.id);
    end if;

    -- Check error_pattern for confusion threshold (3+)
    v_confused_rule_id := null;
    for v_confusion_key, v_confusion_val in select * from jsonb_each(coalesce(v_rec_rule.error_pattern, '{}'::jsonb)) loop
      if (v_confusion_val->>'count')::int >= 3 and v_confusion_key <> '__unknown__' then
        v_confused_rule_id := v_confusion_key;
        exit; -- take the most confused one
      end if;
    end loop;

    -- If a confused rule is found, try to add a contrastive exercise
    if v_confused_rule_id is not null then
      select e.* into v_contrast_ex
      from exercises e
      join exercise_morpheme_map emm on e.id = emm.exercise_id
      where emm.rule_id = v_confused_rule_id and not (e.id = any(v_used_exercises))
      limit 1;
      
      if v_contrast_ex.id is not null then
        v_queue := array_append(v_queue, jsonb_build_object(
          'id', v_contrast_ex.id,
          'lesson_id', v_contrast_ex.lesson_id,
          'kind', v_contrast_ex.kind,
          'morpheme_map', (
            select jsonb_build_object(
              'lexeme_ids', coalesce(jsonb_agg(distinct lexeme_id) filter (where lexeme_id is not null), '[]'::jsonb),
              'rule_ids', coalesce(jsonb_agg(distinct rule_id) filter (where rule_id is not null), '[]'::jsonb),
              'primary_layer', max(primary_layer)
            )
            from exercise_morpheme_map
            where exercise_id = v_contrast_ex.id
          ),
          'data', v_contrast_ex.data
        ));
        v_used_exercises := array_append(v_used_exercises, v_contrast_ex.id);
      end if;
    end if;
  end loop;

  -- 4. Fill remaining slots with lexical review items
  if v_due_lex is not null then
    foreach v_rec_lex in array v_due_lex loop
      if array_length(v_queue, 1) >= p_session_length then
        exit;
      end if;
      
      select e.* into v_lex_ex
      from exercises e
      join exercise_morpheme_map emm on e.id = emm.exercise_id
      where emm.lexeme_id = v_rec_lex and not (e.id = any(v_used_exercises))
      limit 1;
      
      if v_lex_ex.id is not null then
        v_queue := array_append(v_queue, jsonb_build_object(
          'id', v_lex_ex.id,
          'lesson_id', v_lex_ex.lesson_id,
          'kind', v_lex_ex.kind,
          'morpheme_map', (
            select jsonb_build_object(
              'lexeme_ids', coalesce(jsonb_agg(distinct lexeme_id) filter (where lexeme_id is not null), '[]'::jsonb),
              'rule_ids', coalesce(jsonb_agg(distinct rule_id) filter (where rule_id is not null), '[]'::jsonb),
              'primary_layer', max(primary_layer)
            )
            from exercise_morpheme_map
            where exercise_id = v_lex_ex.id
          ),
          'data', v_lex_ex.data
        ));
        v_used_exercises := array_append(v_used_exercises, v_lex_ex.id);
      end if;
    end loop;
  end if;

  return jsonb_build_object(
    'queue', coalesce(to_jsonb(v_queue), '[]'::jsonb),
    'session_focus', coalesce(to_jsonb(v_session_focus), '[]'::jsonb)
  );
end;
$$;

-- ── 4. RPC: get_user_metrics ─────────────────────────────────────────────────
-- No p_user_id param — caller's identity is inferred from auth.uid() for security.
create or replace function get_user_metrics()
returns jsonb
language plpgsql
security definer
as $$
declare
  v_lexical_recall_avg float;
  v_morphological_recall_avg float;
  v_weakest_rule text;
  v_most_confused_pair jsonb;
  v_avg_recall_time_ms float;
  v_rules_practiced int;
begin
  -- Average lexical recall
  select coalesce(avg(recall_prob), 0.0) into v_lexical_recall_avg
  from srs_lexical
  where user_id = auth.uid();

  -- Average morphological recall
  select coalesce(avg(recall_prob), 0.0) into v_morphological_recall_avg
  from srs_morphology
  where user_id = auth.uid();

  -- Weakest rule
  select rule_id into v_weakest_rule
  from srs_morphology
  where user_id = auth.uid()
  order by recall_prob asc
  limit 1;

  -- Most confused pair
  select jsonb_build_object(
    'target_rule', rule_id,
    'confused_with', confused_with,
    'count', count
  ) into v_most_confused_pair
  from (
    select rule_id, 
           key_name as confused_with, 
           (val_obj->>'count')::int as count
    from srs_morphology,
    lateral jsonb_each(error_pattern) as ep(key_name, val_obj)
    where user_id = auth.uid() and key_name <> '__unknown__'
    order by (val_obj->>'count')::int desc
    limit 1
  ) c_pair;

  -- Average recall time
  select coalesce(avg(ms_to_answer), 0.0) into v_avg_recall_time_ms
  from progress_events
  where user_id = auth.uid() and is_correct = true;

  -- Rules practiced
  select count(*) into v_rules_practiced
  from srs_morphology
  where user_id = auth.uid();

  return jsonb_build_object(
    'lexical_recall_avg', v_lexical_recall_avg,
    'morphological_recall_avg', v_morphological_recall_avg,
    'weakest_rule', coalesce(v_weakest_rule, ''),
    'most_confused_pair', coalesce(v_most_confused_pair, 'null'::jsonb),
    'avg_recall_time_ms', v_avg_recall_time_ms,
    'rules_practiced', v_rules_practiced
  );
end;
$$;

-- ── 5. RPC: get_aggregate_metrics ────────────────────────────────────────────
create or replace function get_aggregate_metrics()
returns jsonb
language plpgsql
security definer
as $$
declare
  v_rankings jsonb;
begin
  select coalesce(jsonb_agg(r), '[]'::jsonb) into v_rankings
  from (
    select rule_id,
           avg(recall_prob) as avg_recall_prob,
           count(distinct user_id) as active_users
    from srs_morphology
    group by rule_id
    order by avg_recall_prob asc
  ) r;

  return jsonb_build_object(
    'rule_difficulty_rankings', v_rankings
  );
end;
$$;

-- ── 6. Schema Adjustments ────────────────────────────────────────────────────
alter table user_profiles add column if not exists motivation text default 'casual';

