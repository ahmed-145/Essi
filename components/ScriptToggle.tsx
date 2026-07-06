import React from 'react';
import { Text, View } from 'react-native';
import { useScriptStore } from '../stores/scriptStore';
import { colors } from '../lib/colors';
import type { ScriptPref } from '../types';
import { AnimatedPressable } from './AnimatedPressable';

const OPTIONS: Array<{ k: ScriptPref; l: string; font: string }> = [
  { k: 'nubian', l: 'ⲁ', font: 'SawardaNubian' },
  { k: 'arabic', l: 'ع', font: 'Cairo' },
  { k: 'latin',  l: 'A', font: 'Inter-SemiBold' },
];

export function ScriptToggle({ small = false }: { small?: boolean }) {
  const pref = useScriptStore((s) => s.scriptPref);
  const set = useScriptStore((s) => s.setScript);
  const w = small ? 24 : 30;
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.limeDeep,
        borderRadius: 999,
        padding: 3,
        borderWidth: 1,
        borderColor: colors.hairline2,
      }}
    >
      {OPTIONS.map((o) => {
        const active = pref === o.k;
        return (
          <AnimatedPressable
            key={o.k}
            onPress={() => set(o.k)}
            style={{
              width: w, height: small ? 22 : 26, borderRadius: 999,
              backgroundColor: active ? colors.nile : 'transparent',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: active ? colors.lime : colors.ink2, fontFamily: o.font, fontSize: small ? 12 : 14 }}>
              {o.l}
            </Text>
          </AnimatedPressable>
        );
      })}
    </View>
  );
}
