// Profile screen — PRD §8 Feature 10: Progress Dashboard
// AC: streak / XP / level / words learned / lessons completed / accuracy rate.
//     weakest_rule surfaced from ML-SRS.
//     Zero-state encouraging copy + CTA.
//     Data from server (Supabase) with local store as fast path.

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AppTopBar } from '../../components/AppTopBar';
import { OilLampFlame } from '../../components/brand/OilLampFlame';
import { Drop } from '../../components/brand/Drop';
import { SquareCross } from '../../components/brand/SquareCross';
import { EssiButton } from '../../components/EssiButton';
import { colors } from '../../lib/colors';
import { useUserStore } from '../../stores/userStore';
import { useSrsStore } from '../../stores/srsStore';
import { getUserMetrics } from '../../lib/api';
import { useRouter } from 'expo-router';

// PRD §8 Feature 10 AC: XP level names in Mattokki
const LEVEL_NAMES: Record<number, { mat: string; ar: string }> = {
  1:  { mat: 'Weer',   ar: 'واحد — المبتدئ' },
  2:  { mat: 'Owwi',   ar: 'اتنين — المتعلم' },
  3:  { mat: 'Tosku',  ar: 'تلاتة — المتمكن' },
  4:  { mat: 'Kemso',  ar: 'أربعة — الحافظ' },
  5:  { mat: 'Digir',  ar: 'خمسة — الناطق' },
};

function levelFromXp(xp: number): number {
  if (xp < 200)  return 1;
  if (xp < 500)  return 2;
  if (xp < 1000) return 3;
  if (xp < 2000) return 4;
  return 5;
}

function xpToNextLevel(xp: number): { needed: number; current: number } {
  const thresholds = [200, 500, 1000, 2000, Infinity];
  const prev = [0, 200, 500, 1000, 2000];
  const lvl = levelFromXp(xp) - 1;
  return {
    needed: thresholds[lvl] - prev[lvl],
    current: xp - prev[lvl],
  };
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon, value, label, sub,
}: {
  icon: React.ReactNode; value: string | number; label: string; sub?: string;
}) {
  return (
    <View style={{
      flex: 1, backgroundColor: '#fff', borderRadius: 20,
      padding: 16, borderWidth: 1, borderColor: colors.hairline,
      alignItems: 'center', minHeight: 100,
    }}>
      <View style={{ marginBottom: 8 }}>{icon}</View>
      <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink }}>{value}</Text>
      <Text style={{ fontSize: 11, color: colors.ink3, letterSpacing: 1.2, fontFamily: 'Inter-Bold', textTransform: 'uppercase', marginTop: 2, textAlign: 'center' }}>
        {label}
      </Text>
      {sub && <Text style={{ fontSize: 10, color: colors.ink4, marginTop: 2 }}>{sub}</Text>}
    </View>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <Text style={{
      fontSize: 11, letterSpacing: 2, color: colors.ink3, fontFamily: 'Inter-Bold',
      textTransform: 'uppercase', marginTop: 26, marginBottom: 10,
    }}>
      {text}
    </Text>
  );
}

export default function Profile() {
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);
  const srsLex = useSrsStore((s) => s.lex);
  const srsRule = useSrsStore((s) => s.rule);

  const xp = profile?.xp ?? 0;
  const streak = profile?.streak ?? 0;
  const level = levelFromXp(xp);
  const levelName = LEVEL_NAMES[level] ?? LEVEL_NAMES[1];
  const { needed, current } = xpToNextLevel(xp);
  const levelProgress = needed > 0 ? Math.min(1, current / needed) : 1;

  // Derived: lessons completed (approximate from XP)
  const lessonsCompleted = Math.floor(xp / 60);

  // Server metrics: weakest rule from the authoritative ML-SRS backend.
  // Hydrated on mount; falls back to local SRS store while loading or offline.
  const [serverMetrics, setServerMetrics] = useState<any | null>(null);
  useEffect(() => {
    getUserMetrics()
      .then((m) => { if (m) setServerMetrics(m); })
      .catch(() => {}); // fail silently — local store is the fallback
  }, []);

  // Weakest rule: server is authoritative, local SRS is fast-path fallback
  const serverWeakestRule = serverMetrics?.weakest_rule as string | undefined;
  const localWeakestRule = Object.values(srsRule)
    .sort((a, b) => a.recall_prob - b.recall_prob)[0];
  const weakestRuleId = serverWeakestRule || localWeakestRule?.rule_id;
  const weakestRecall = serverMetrics?.morphological_recall_avg ?? localWeakestRule?.recall_prob ?? 1;

  // Total lexemes learned (have been attempted)
  const lexLearned = Object.values(srsLex).filter((l) => l.total_attempts > 0).length;

  // Overall accuracy
  const allLex = Object.values(srsLex);
  const avgAccuracy = allLex.length > 0
    ? Math.round((allLex.reduce((s, l) => s + l.recall_prob, 0) / allLex.length) * 100)
    : 0;

  const isZeroState = xp === 0 && streak === 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime }}>
      <AppTopBar />
      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 40 }}>
        {/* Greeting */}
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 28, color: colors.ink }}>
          {isZeroState ? 'Your journey starts here.' : 'Your roots, watered.'}
        </Text>
        <Text style={{ fontFamily: 'Cairo', fontSize: 15, color: colors.ink3, marginTop: 4 }}>
          {isZeroState ? 'أول خطوة في رحلة الألف ميل.' : 'جذورك اتسقت.'}
        </Text>

        {/* Zero state CTA */}
        {isZeroState && (
          <View style={{ marginTop: 20, backgroundColor: '#fff', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: colors.hairline }}>
            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: colors.ink, marginBottom: 8 }}>
              Start your first lesson to see your progress here.
            </Text>
            <EssiButton
              title="Go to Lesson 1 →"
              variant="primary"
              size="md"
              onPress={() => router.push('/lesson/L1' as any)}
            />
          </View>
        )}

        {/* Level + XP progress */}
        {!isZeroState && (
          <View style={{ backgroundColor: colors.nileDeep, borderRadius: 20, padding: 20, marginTop: 18 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <View>
                <Text style={{ fontSize: 11, letterSpacing: 2, color: 'rgba(245,240,232,0.6)', fontFamily: 'Inter-Bold', textTransform: 'uppercase' }}>
                  Level {level}
                </Text>
                <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.lime, marginTop: 2 }}>
                  {levelName.mat}
                </Text>
                <Text style={{ fontFamily: 'Cairo', fontSize: 13, color: 'rgba(245,240,232,0.7)', marginTop: 2 }}>
                  {levelName.ar}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 24, color: colors.ochre, fontWeight: '700' }}>
                  {xp} XP
                </Text>
                {level < 5 && (
                  <Text style={{ fontSize: 11, color: 'rgba(245,240,232,0.5)', marginTop: 2 }}>
                    {needed - current} to Level {level + 1}
                  </Text>
                )}
              </View>
            </View>

            {/* XP progress bar */}
            {level < 5 && (
              <View style={{ height: 6, borderRadius: 3, backgroundColor: 'rgba(245,240,232,0.15)', marginTop: 12, overflow: 'hidden' }}>
                <View style={{ width: `${levelProgress * 100}%`, height: '100%', backgroundColor: colors.ochre, borderRadius: 3 }} />
              </View>
            )}
          </View>
        )}

        {/* Stat grid */}
        {!isZeroState && (
          <>
            <SectionLabel text="Your numbers" />
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
              <StatCard
                icon={<OilLampFlame size={22} color={colors.ochreDeep} />}
                value={streak}
                label="Day streak"
                sub={streak >= 7 ? '🔥 On fire!' : streak > 0 ? 'Keep watering' : 'Start today'}
              />
              <StatCard
                icon={<Drop size={20} color={colors.nile} />}
                value={lexLearned}
                label="Words"
                sub="roots learned"
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <StatCard
                icon={<SquareCross size={20} color={colors.terra} />}
                value={lessonsCompleted}
                label="Lessons"
                sub="completed"
              />
              <StatCard
                icon={<Text style={{ fontSize: 18 }}>🎯</Text>}
                value={avgAccuracy > 0 ? `${avgAccuracy}%` : '—'}
                label="Accuracy"
                sub="overall recall"
              />
            </View>
          </>
        )}

        {/* Weakest rule insight — PRD §8 Feature 10 AC */}
        {weakestRuleId && weakestRecall < 0.7 && (
          <>
            <SectionLabel text="Needs water 💧" />
            <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: colors.hairline }}>
              <Text style={{ fontFamily: 'Inter-Bold', fontSize: 13, color: colors.terra, letterSpacing: 0.5 }}>
                {weakestRuleId === 'INDEF_SUFFIX_WER' || weakestRuleId === 'INDEF_BILABIAL_BER'
                  ? 'Your indefinite endings need some water 💧'
                  : weakestRuleId === 'COPULA_MA'
                  ? 'The copula -ma is slipping away 💧'
                  : 'Your grammar rules need some water 💧'}
              </Text>
              <Text style={{ fontSize: 13, color: colors.ink2, marginTop: 6, lineHeight: 20 }}>
                Practice tab has a session ready to fix this.
              </Text>
              <EssiButton
                title="Practice now →"
                variant="ghost"
                size="sm"
                style={{ marginTop: 12 }}
                onPress={() => router.push('/(tabs)/practice' as any)}
              />
            </View>
          </>
        )}

        {/* Streak milestones */}
        {streak > 0 && (
          <>
            <SectionLabel text="Milestones" />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {[
                { days: 7, label: '7 days', emoji: '🌿' },
                { days: 30, label: '30 days', emoji: '🌳' },
                { days: 100, label: '100 days', emoji: '🌊' },
              ].map((m) => (
                <View
                  key={m.days}
                  style={{
                    flex: 1, borderRadius: 16, padding: 14, alignItems: 'center',
                    backgroundColor: streak >= m.days ? colors.ochre : '#fff',
                    borderWidth: 1.5,
                    borderColor: streak >= m.days ? 'transparent' : colors.hairline,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{m.emoji}</Text>
                  <Text style={{
                    fontSize: 12, fontFamily: 'Inter-Bold', color: streak >= m.days ? colors.nileDeep : colors.ink3,
                    marginTop: 4,
                  }}>
                    {m.label}
                  </Text>
                  {streak >= m.days && (
                    <Text style={{ fontSize: 9, color: colors.nileDeep, marginTop: 2 }}>✓ achieved</Text>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}
