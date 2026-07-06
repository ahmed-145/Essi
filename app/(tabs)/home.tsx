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

type NodeState = 'done' | 'active' | 'locked';

const nodes = lessons.map((l, i): { lesson: typeof l; state: NodeState; pos: 'L' | 'R' } => ({
  lesson: l,
  state: i < 3 ? 'done' : i === 3 ? 'active' : 'locked',
  pos: i % 2 === 0 ? 'L' : 'R',
}));

const SECTION_H = 116;

export default function Home() {
  const router = useRouter();

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
            This language lives in your blood. 3 of 12 lessons watered.
          </Text>
          <View style={{ height: 8, borderRadius: 6, backgroundColor: colors.hairline2, marginTop: 14, overflow: 'hidden' }}>
            <View style={{ width: '25%', height: '100%', backgroundColor: colors.nile, borderRadius: 6 }} />
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
            const left = n.pos === 'L' ? 32 : 240;
            return (
              <Pressable
                key={i}
                onPress={() => n.state !== 'locked' && router.push(`/lesson/${n.lesson.id}` as any)}
                style={{ position: 'absolute', top: y - 48, left, width: 96, height: 96 }}
              >
                <View style={{
                  width: 96, height: 96, borderRadius: 48,
                  backgroundColor: n.state === 'done' ? colors.ochre : '#fff',
                  borderWidth: n.state === 'active' ? 3 : 1.5,
                  borderColor: n.state === 'active' ? colors.terra : colors.hairline,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  {n.state === 'done' && <CheckIcon size={36} color={colors.lime} />}
                  {n.state === 'locked' && <LockIcon size={26} color={colors.ink4} />}
                  {n.state === 'active' && (
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 28, color: colors.terra }}>{n.lesson.id}</Text>
                      <Text style={{ fontSize: 9, letterSpacing: 2, color: colors.terra, marginTop: 2, fontFamily: 'Inter-Bold' }}>START</Text>
                    </View>
                  )}
                </View>
                <View style={{
                  position: 'absolute',
                  ...(n.pos === 'L' ? { left: 110 } : { right: 110 }),
                  top: 16, width: 160,
                }}>
                  <Text style={{
                    fontSize: 14, color: n.state === 'locked' ? colors.ink4 : colors.ink,
                    fontFamily: 'Inter-Bold',
                    textAlign: n.pos === 'L' ? 'left' : 'right',
                  }}>{n.lesson.title}</Text>
                  <Text style={{
                    fontSize: 11, color: colors.ink3, marginTop: 2,
                    textAlign: n.pos === 'L' ? 'left' : 'right',
                  }}>{n.lesson.title_ar}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
