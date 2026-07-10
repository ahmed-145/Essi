// Mock React Native asset require calls for non-JS files under standard Node
require.extensions['.ogg'] = function () { return 42; };
require.extensions['.wav'] = function () { return 42; };

import fs from 'fs';
import path from 'path';

// Require data modules dynamically after the require mocks are registered
const { morphologyRules } = require('../data/morphology-rules');
const { lexicon } = require('../data/lexicon');
const { lessons } = require('../data/lessons');

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

// Helper to make native fetch Postgrest request
async function postgrestUpsert(table: string, data: any[]) {
  const endpoint = `${URL}/rest/v1/${table}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'apikey': KEY!,
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

async function postgrestDelete(table: string, queryParams: string) {
  const endpoint = `${URL}/rest/v1/${table}?${queryParams}`;
  const res = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'apikey': KEY!,
      'Authorization': `Bearer ${KEY}`
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to delete from ${table}: ${await res.text()}`);
  }
}

async function run() {
  console.log('\n🌊 Essi — Seeding Database via TypeScript source imports...\n');

  // 1. Seed morphology_rules
  console.log('Seeding morphology_rules...');
  const rulesToUpsert = morphologyRules.map((r: any) => ({
    id: r.id,
    suffix: r.suffix,
    family: r.family,
    phonological_condition: r.phonological_condition,
    example: r.example,
    description_ar: r.description_ar,
    description_en: r.description_en,
    source: 'abdel-hafiz-1988',
    verified: true
  }));
  await postgrestUpsert('morphology_rules', rulesToUpsert);
  console.log(`  ✓ ${rulesToUpsert.length} morphology rules upserted`);

  // 2. Seed lexicon_roots
  console.log('Seeding lexicon_roots...');
  const lexiconToUpsert = lexicon.map((l: any) => ({
    lexeme_id: l.id,
    root: l.root,
    old_nubian: l.old_nubian,
    latin: l.latin,
    arabic: l.arabic,
    ipa: l.ipa,
    pos: l.pos,
    translation_ar: l.translation_ar,
    translation_en: l.translation_en,
    source: l.source,
    verified: l.verified
  }));
  await postgrestUpsert('lexicon_roots', lexiconToUpsert);
  console.log(`  ✓ ${lexiconToUpsert.length} lexicon entries upserted`);

  // 3. Seed lessons
  console.log('Seeding lessons...');
  const lessonsToUpsert = lessons.map((l: any) => ({
    id: l.id,
    phase: l.phase,
    index: l.index,
    title: l.title,
    title_ar: l.title_ar,
    objectives: l.objectives,
    cultural_note: l.cultural_note,
    cultural_note_ar: l.cultural_note_ar
  }));
  await postgrestUpsert('lessons', lessonsToUpsert);
  console.log(`  ✓ ${lessonsToUpsert.length} lessons upserted`);

  // 4. Seed exercises
  console.log('Seeding exercises...');
  const exercisesToUpsert: any[] = [];
  const exerciseMorphemeMaps: any[] = [];

  for (const lesson of lessons) {
    for (const ex of lesson.exercises) {
      // Destructure kind, id, lesson_id, morpheme_map, and store the rest as data
      const { id, lesson_id, kind, morpheme_map, ...extra } = ex as any;

      // Handle ogg audio requires (which are local numbers or URLs)
      let data = { ...extra };
      if (data.audio_url && typeof data.audio_url === 'number') {
        // If it's a static require, map it to a placeholder or a synthetic CDN link
        data.audio_url = `https://cdn.essi.app/audio/${id}.ogg`;
      }

      exercisesToUpsert.push({
        id,
        lesson_id,
        kind,
        data
      });

      // Prepare morpheme mappings
      const { lexeme_ids = [], rule_ids = [], primary_layer = 'lexical' } = morpheme_map || {};
      for (const lexId of lexeme_ids) {
        exerciseMorphemeMaps.push({
          exercise_id: id,
          lexeme_id: lexId,
          rule_id: null,
          primary_layer
        });
      }
      for (const ruleId of rule_ids) {
        exerciseMorphemeMaps.push({
          exercise_id: id,
          lexeme_id: null,
          rule_id: ruleId,
          primary_layer
        });
      }
    }
  }

  await postgrestUpsert('exercises', exercisesToUpsert);
  console.log(`  ✓ ${exercisesToUpsert.length} exercises upserted`);

  // 5. Seed exercise_morpheme_map
  console.log('Seeding exercise_morpheme_map...');
  // Delete all existing mapping rows for the exercises we are seeding to avoid duplicates
  const chunkedDelete = async () => {
    // Delete in batches of 30 to not hit URL length limits in GET/DELETE query params
    const batchSize = 30;
    for (let i = 0; i < exercisesToUpsert.length; i += batchSize) {
      const batch = exercisesToUpsert.slice(i, i + batchSize);
      const orParams = batch.map(e => `exercise_id.eq.${e.id}`).join(',');
      await postgrestDelete('exercise_morpheme_map', `or=(${orParams})`);
    }
  };
  await chunkedDelete();

  // Insert mapping rows
  await postgrestUpsert('exercise_morpheme_map', exerciseMorphemeMaps);
  console.log(`  ✓ ${exerciseMorphemeMaps.length} exercise morpheme mapping rows inserted`);

  console.log('\n✅  Supabase database seeding successfully completed from local sources!\n');
}

run().catch((err) => {
  console.error('\n❌ Seed failed:');
  console.error(err.message || err);
  process.exit(1);
});
