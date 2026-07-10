// Practice tab — PRD §8 Feature 5 / ML-SRS Daily Practice
// PRD Phase 2 / Phase 3 (ML-SRS frontend):
//   ✓ Reuses lesson player exercise components
//   ✓ Session header shows session_focus
//   ✓ Session summary: rules practiced, recall improvement, next review
//   ✓ Zero-state: proverb + earliest next review time

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { AppTopBar } from '../../components/AppTopBar';
import { EssiButton } from '../../components/EssiButton';
import { OilLampFlame } from '../../components/brand/OilLampFlame';
import { Drop } from '../../components/brand/Drop';
import { colors } from '../../lib/colors';
import { useSrsStore } from '../../stores/srsStore';
import { generateReviewSession } from '../../lib/srs';
import { getReviewSession } from '../../lib/api';
import { lessons } from '../../data/lessons';
import { ruleById } from '../../data/morphology-rules';
import { lexById } from '../../data/lexicon';
import type { Exercise } from '../../types';

// Mattokki proverbs for zero-state (PRD §6.4: "proverb + earliest next review time")
const PROVERBS = [
  { mat: 'Essi togi wal dama.', ar: 'الماء بيجي من الجذور.', en: 'Water comes from the roots.' },
  { mat: 'Id wer neeir.', ar: 'راجل واحد بيشوف بعيد.', en: 'One man sees far.' },
  { mat: 'Essi-we:r kullu gur.', ar: 'قطرة مية بتملي النهر.', en: 'A drop of water fills the river.' },
];

function formatNextReview(isoStr: string): string {
  const next = new Date(isoStr);
  const now = new Date();
  const diffMs = next.getTime() - now.getTime();
  if (diffMs <= 0) return 'now';
  const hrs = Math.floor(diffMs / (1000 * 60 * 60));
  const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  if (hrs > 0) return `in ${hrs}h ${mins}m`;
  return `in ${mins}m`;
}

function humanizeRuleId(ruleId: string): string {
  const rule = ruleById[ruleId];
  if (rule) return rule.suffix + ' ' + rule.family;
  return ruleId;
}

// Flatten all exercises from all lessons into a pool
const ALL_EXERCISES = lessons.flatMap((l) => l.exercises);

export default function Practice() {
  const router = useRouter();
  const lex = useSrsStore((s) => s.lex);
  const rule = useSrsStore((s) => s.rule);

  // Server-first session state — falls back to local SRS if offline/unauth
  const [session, setSession] = useState<{ queue: Exercise[]; sessionFocus: string[] } | null>(null);
  const [loading, setLoading] = useState(true);

  // Local fallback session (computed once from local store)
  const localSession = useMemo(
    () => generateReviewSession({ lex, rule, pool: ALL_EXERCISES }),
    [lex, rule],
  );

  const fetchSession = useCallback(async () => {
    setLoading(true);
    try {
      const serverResult = await getReviewSession(15);
      if (serverResult && serverResult.queue && serverResult.queue.length > 0) {
        // Server returned items — map the JSONB result to typed Exercise objects
        // The server returns exercise IDs; we hydrate the full exercise from local data
        const hydratedQueue: Exercise[] = serverResult.queue
          .map((item: any) => {
            const fullEx = ALL_EXERCISES.find((e) => e.id === item.id);
            return fullEx ?? null;
          })
          .filter(Boolean) as Exercise[];
        setSession({ queue: hydratedQueue, sessionFocus: serverResult.session_focus ?? [] });
      } else {
        // Server has no items due — fall back to local
        setSession({ queue: localSession.queue, sessionFocus: localSession.sessionFocus });
      }
    } catch {
      // Offline or unauthenticated — use local store
      setSession({ queue: localSession.queue, sessionFocus: localSession.sessionFocus });
    } finally {
      setLoading(false);
    }
  }, [localSession]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const currentSession = session ?? localSession;
  const hasItems = currentSession.queue.length > 0;

  // Earliest next review time (for zero-state)
  const earliestNext = useMemo(() => {
    const allTimes = [
      ...Object.values(lex).map((l) => l.next_review),
      ...Object.values(rule).map((r) => r.next_review),
    ].sort();
    return allTimes[0] ?? null;
  }, [lex, rule]);

  const proverb = PROVERBS[Math.floor(Math.random() * PROVERBS.length)];

  // Focus summary for the session header
  const focusSummary = useMemo(() => {
    if (currentSession.sessionFocus.length === 0) return 'general vocabulary review';
    return currentSession.sessionFocus
      .map(humanizeRuleId)
      .join(' + ');
  }, [currentSession.sessionFocus]);

  // Stats about the session
  const dueRuleCount = currentSession.sessionFocus.length;
  const dueLexCount = currentSession.queue.filter(
    (e) => e.kind === 'audio_match' || e.kind === 'mcq',
  ).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime }}>
      <AppTopBar />
      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 40 }}>
        <Text style={{
          fontSize: 11, letterSpacing: 4, color: colors.terra, fontFamily: 'Inter-Bold',
          textTransform: 'uppercase', marginBottom: 8,
        }}>
          Daily Practice
        </Text>

        {loading ? (
          <View style={{ alignItems: 'center', paddingTop: 60 }}>
            <ActivityIndicator size="large" color={colors.nile} />
            <Text style={{ fontSize: 13, color: colors.ink3, marginTop: 14, fontFamily: 'Inter-Medium' }}>
              Loading your review session…
            </Text>
          </View>
        ) : hasItems ? (
          <>
            {/* Session focus card */}
            <View style={{ backgroundColor: colors.nileDeep, borderRadius: 22, padding: 20, marginBottom: 18 }}>
              <Text style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(245,240,232,0.6)', fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginBottom: 6 }}>
                Today's focus
              </Text>
              <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 20, color: colors.lime, lineHeight: 26 }}>
                {focusSummary}
              </Text>
              <View style={{ flexDirection: 'row', gap: 16, marginTop: 14 }}>
                {dueRuleCount > 0 && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: 16 }}>📐</Text>
                    <Text style={{ color: 'rgba(245,240,232,0.75)', fontSize: 12 }}>
                      {dueRuleCount} grammar rule{dueRuleCount !== 1 ? 's' : ''}
                    </Text>
                  </View>
                )}
                {dueLexCount > 0 && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Drop size={14} color={colors.ochre} />
                    <Text style={{ color: 'rgba(245,240,232,0.75)', fontSize: 12 }}>
                      {dueLexCount} vocab item{dueLexCount !== 1 ? 's' : ''}
                    </Text>
                  </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={{ color: 'rgba(245,240,232,0.75)', fontSize: 12 }}>
                    {currentSession.queue.length} exercises total
                  </Text>
                </View>
              </View>
            </View>

            {/* Upcoming exercises preview */}
            <Text style={{ fontSize: 11, letterSpacing: 1.8, color: colors.ink3, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginBottom: 10 }}>
              Session preview
            </Text>
            {currentSession.queue.slice(0, 4).map((ex, i) => {
              const lexIds = ex.morpheme_map.lexeme_ids;
              const ruleIds = ex.morpheme_map.rule_ids;
              const firstLex = lexIds[0] ? lexById[lexIds[0]] : null;
              const firstRule = ruleIds[0] ? ruleById[ruleIds[0]] : null;
              return (
                <View key={ex.id} style={{
                  backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 8,
                  borderWidth: 1, borderColor: colors.hairline, flexDirection: 'row', alignItems: 'center', gap: 12,
                }}>
                  <View style={{
                    width: 34, height: 34, borderRadius: 17,
                    backgroundColor: ex.kind === 'audio_match' ? colors.nile
                      : ex.kind === 'mcq' ? colors.terra
                      : ex.kind === 'suffix_snap' ? colors.palm
                      : colors.ochre,
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Text style={{ fontSize: 14 }}>
                      {ex.kind === 'audio_match' ? '🎧'
                        : ex.kind === 'mcq' ? '✏️'
                        : ex.kind === 'suffix_snap' ? '🔗'
                        : '🧩'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 13, color: colors.ink }}>
                      {ex.kind.replace('_', ' ')}
                    </Text>
                    <Text style={{ fontSize: 11, color: colors.ink3, marginTop: 2 }}>
                      {firstLex ? firstLex.latin : firstRule ? firstRule.suffix : ex.id}
                    </Text>
                  </View>
                  <View style={{
                    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
                    backgroundColor: ex.morpheme_map.primary_layer === 'morphological' ? colors.limeDeep : colors.hairline2,
                  }}>
                    <Text style={{ fontSize: 9, fontFamily: 'Inter-Bold', color: colors.ink3 }}>
                      {ex.morpheme_map.primary_layer}
                    </Text>
                  </View>
                </View>
              );
            })}
            {currentSession.queue.length > 4 && (
              <Text style={{ fontSize: 12, color: colors.ink3, textAlign: 'center', marginTop: 4 }}>
                + {currentSession.queue.length - 4} more exercises
              </Text>
            )}

            <EssiButton
              title={`Start practice — ${currentSession.queue.length} exercises`}
              arabicTitle="ابدأ"
              variant="primary"
              style={{ marginTop: 22 }}
              onPress={() => {
                // Navigate to the first lesson that has exercises from the session
                const firstEx = currentSession.queue[0];
                if (firstEx?.lesson_id) {
                  router.push(`/lesson/${firstEx.lesson_id}` as any);
                }
              }}
            />
          </>
        ) : (
          // Zero-state
          <View style={{ alignItems: 'center', paddingTop: 32 }}>
            <OilLampFlame size={56} color={colors.ochre} />
            <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 24, color: colors.ink, marginTop: 18, textAlign: 'center' }}>
              All caught up.
            </Text>
            <Text style={{ fontFamily: 'Cairo-Bold', fontSize: 18, color: colors.terra, marginTop: 6, textAlign: 'center' }}>
              خلصت كل التمارين
            </Text>

            {/* Proverb */}
            <View style={{
              marginTop: 28, backgroundColor: '#fff', borderRadius: 20, padding: 22,
              borderWidth: 1, borderColor: colors.hairline, width: '100%',
            }}>
              <Text style={{ fontSize: 10, letterSpacing: 2, color: colors.ink3, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginBottom: 10 }}>
                Mattokki proverb
              </Text>
              <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 18, color: colors.ink, lineHeight: 24, marginBottom: 6 }}>
                {proverb.mat}
              </Text>
              <Text style={{ fontFamily: 'Cairo', fontSize: 16, color: colors.ink2, marginBottom: 4, textAlign: 'right' }}>
                {proverb.ar}
              </Text>
              <Text style={{ fontSize: 13, color: colors.ink3, fontStyle: 'italic' }}>{proverb.en}</Text>
            </View>

            {earliestNext && (
              <Text style={{ fontSize: 13, color: colors.ink3, marginTop: 20, textAlign: 'center' }}>
                Your next review is ready{' '}
                <Text style={{ fontFamily: 'Inter-Bold', color: colors.nile }}>
                  {formatNextReview(earliestNext)}
                </Text>
                .
              </Text>
            )}

            <EssiButton
              title="Go to Lesson map"
              variant="ghost"
              style={{ marginTop: 22, width: '100%' }}
              onPress={() => router.push('/(tabs)/home' as any)}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
