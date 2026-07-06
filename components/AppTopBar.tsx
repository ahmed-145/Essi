import React from 'react';
import { View, Text } from 'react-native';
import { useUserStore } from '../stores/userStore';
import { ScriptToggle } from './ScriptToggle';
import { OilLampFlame } from './brand/OilLampFlame';
import { Drop } from './brand/Drop';
import { colors } from '../lib/colors';

export function AppTopBar() {
  const profile = useUserStore((s) => s.profile);
  return (
    <View style={{
      paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 10,
      borderBottomWidth: 1, borderBottomColor: colors.hairline2,
    }}>
      <Pill icon={<OilLampFlame size={16} color={colors.ochreDeep} />} text={String(profile?.streak ?? 0)} color={colors.ochreDeep} />
      <Pill icon={<Drop size={14} color={colors.nile} />} text={`${profile?.xp ?? 0} XP`} color={colors.nile} />
      <View style={{ flex: 1 }} />
      <ScriptToggle small />
    </View>
  );
}

function Pill({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', gap: 6,
      paddingHorizontal: 10, paddingVertical: 6,
      backgroundColor: colors.limeDeep, borderRadius: 999,
    }}>
      {icon}
      <Text style={{ color, fontFamily: 'Inter-Bold', fontSize: 13 }}>{text}</Text>
    </View>
  );
}
