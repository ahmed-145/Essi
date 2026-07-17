// Skill tree — vertical Nile path. Tap an unlocked node to start.
// Mirrors design canvas screen 09.

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { AppTopBar } from '../../components/AppTopBar';
import { TreeGrassFrieze } from '../../components/brand/TreeGrassFrieze';
import { CheckIcon, LockIcon } from '../../components/icons';
import { colors } from '../../lib/colors';
import { lessons } from '../../data/lessons';
import { useLessonProgressStore } from '../../stores/lessonProgressStore';
import { useUserStore } from '../../stores/userStore';

type NodeState = 'done' | 'active' | 'locked';

const SECTION_H = 116;
const TOTAL = lessons.length;

export default function Home() {
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);
  const xp = profile?.xp ?? 0;

  // Derive completed lessons from XP:
  // 50 XP per lesson + 10 XP per correct answer (6 exercises × 10 = 60 bonus max)
  // Use 50 XP as the base unit — every 50 XP = one lesson completed
  const completedCount = Math.min(Math.floor(xp / 50), TOTAL - 1);

  const nodes = lessons.map((l, i): { lesson: typeof l; state: NodeState; pos: 'L' | 'R' } => {
    let state: NodeState;
    if (i < completedCount) state = 'done';
    else if (i === completedCount) state = 'active';
    else if (i <= completedCount + 2) state = 'active'; // unlock next 2 as preview
    else state = 'locked';
    return { lesson: l, state, pos: i % 2 === 0 ? 'L' : 'R' };
  });

  const activeCount = nodes.filter((n) => n.state !== 'locked').length;
  const progressPct = Math.min((completedCount / TOTAL) * 100, 100);

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime }}>
      <AppTopBar />
      <ScrollView>
        <View style={{ padding: 22, paddingBottom: 6 }}>
          <Text style={{ fontSize: 11, letterSpacing: 4, color: colors.terra, fontFamily: 'Inter-Bold', textTransform: 'uppercase' }}>
            Phase 1 · Core Identification
          </Text>
          <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink, marginTop: 6 }}>
            You are not starting from zero.
          </Text>
          <Text style={{ fontSize: 13, color: colors.ink3, marginTop: 4 }}>
            This language lives in your blood. {completedCount} of {TOTAL} lessons watered.
          </Text>
          <View style={{ height: 8, borderRadius: 6, backgroundColor: colors.hairline2, marginTop: 14, overflow: 'hidden' }}>
            <View style={{ width: `${Math.max(progressPct, 3)}%`, height: '100%', backgroundColor: colors.nile, borderRadius: 6 }} />
          </View>
        </View>

        <View style={{ paddingTop: 12, opacity: 0.18 }}>
          <TreeGrassFrieze width={390} height={22} color={colors.terra} />
        </View>

        {/* Path */}
        <View style={{ height: nodes.length * SECTION_H + 60, position: 'relative' }}>
          <Svg
            width="100%" height={nodes.length * SECTION_H + 60}
            viewBox={`0 0 390 ${nodes.length * SECTION_H + 60}`}
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <Defs>
              <LinearGradient id="r" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={colors.nile} stopOpacity={0.45} />
                <Stop offset="1" stopColor={colors.nile} stopOpacity={0.15} />
              </LinearGradient>
            </Defs>
            <Path
              d={(() => {
                let d = 'M 195 20';
                for (let i = 0; i < nodes.length; i++) {
                  const y = 40 + i * SECTION_H;
                  const x = nodes[i].pos === 'L' ? 100 : 290;
                  d += ` Q ${nodes[i].pos === 'L' ? 110 : 280} ${y - 40} ${x} ${y}`;
                }
                return d;
              })()}
              stroke="url(#r)" strokeWidth={8} fill="none" strokeLinecap="round"
            />
          </Svg>

          {nodes.map((n, i) => {
            const y = 40 + i * SECTION_H;
            // Node circle: left side = left:32, right side = left:262
            const nodeLeft = n.pos === 'L' ? 32 : 262;
            // Label: always rendered inside a fixed-width box beside the node
            const labelLeft = n.pos === 'L' ? 136 : 16;
            const labelRight = n.pos === 'L' ? undefined : 140;
            const isActive = n.state !== 'locked';

            return (
              <View key={i} style={{ position: 'absolute', top: y - 48, left: 0, right: 0 }}>
                {/* Node circle */}
                <Pressable
                  onPress={() => isActive && router.push(`/lesson/${n.lesson.id}` as any)}
                  style={{ position: 'absolute', left: nodeLeft, width: 96, height: 96 }}
                >
                  <View style={{
                    width: 96, height: 96, borderRadius: 48,
                    backgroundColor: n.state === 'done' ? colors.ochre : '#fff',
                    borderWidth: n.state === 'active' ? 3 : 1.5,
                    borderColor: n.state === 'active' ? colors.terra : n.state === 'done' ? colors.ochre : colors.hairline,
                    alignItems: 'center', justifyContent: 'center',
                    elevation: isActive ? 4 : 1,
                    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isActive ? 0.15 : 0.05, shadowRadius: 6,
                  }}>
                    {n.state === 'done' && <CheckIcon size={36} color={colors.lime} />}
                    {n.state === 'locked' && <LockIcon size={26} color={colors.ink4} />}
                    {n.state === 'active' && (
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 22, color: colors.terra }}>{n.lesson.id}</Text>
                        <Text style={{ fontSize: 8, letterSpacing: 1.5, color: colors.terra, marginTop: 1, fontFamily: 'Inter-Bold' }}>TAP</Text>
                      </View>
                    )}
                  </View>
                </Pressable>

                {/* Label — rendered beside node, WITHIN screen bounds */}
                <View style={{
                  position: 'absolute',
                  left: n.pos === 'L' ? 136 : 16,
                  right: n.pos === 'L' ? 16 : 142,
                  top: 24,
                }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 13,
                      color: n.state === 'locked' ? colors.ink4 : colors.ink,
                      fontFamily: 'Inter-Bold',
                      textAlign: n.pos === 'L' ? 'left' : 'right',
                    }}
                  >
                    {n.lesson.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 11,
                      color: colors.ink3,
                      marginTop: 2,
                      textAlign: n.pos === 'L' ? 'left' : 'right',
                    }}
                  >
                    {n.lesson.title_ar}
                  </Text>
                  {n.state === 'active' && (
                    <Text style={{
                      fontSize: 10, color: colors.terra, fontFamily: 'Inter-SemiBold',
                      marginTop: 4, textAlign: n.pos === 'L' ? 'left' : 'right',
                    }}>
                      → Start
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
