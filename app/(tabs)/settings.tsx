// PRD §21 Phase 1 — Settings Screen: tri-script toggle, language toggle,
// notification time preference, audio volume slider, account management.

import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import { AppTopBar } from '../../components/AppTopBar';
import { ScriptToggle } from '../../components/ScriptToggle';
import { AnimatedPressable } from '../../components/AnimatedPressable';
import { Card } from '../../components/Card';
import { EssiButton } from '../../components/EssiButton';
import { colors } from '../../lib/colors';
import { useUserStore } from '../../stores/userStore';
import { signOut } from '../../lib/api';
import { setVolume, getVolume } from '../../lib/audio';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 }}>
      <Text style={{ fontFamily: 'Inter-Medium', fontSize: 15, color: colors.ink }}>{label}</Text>
      {children}
    </View>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <Text style={{
      fontSize: 11, letterSpacing: 2, color: colors.ink3, fontFamily: 'Inter-Bold',
      textTransform: 'uppercase', marginTop: 24, marginBottom: 8,
    }}>{text}</Text>
  );
}

export default function Settings() {
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);
  const patch = useUserStore((s) => s.patch);
  const reset = useUserStore((s) => s.reset);
  const [notifsOn, setNotifsOn] = useState(profile?.notifications_enabled ?? false);
  const [langAr, setLangAr] = useState((profile?.language_preference ?? 'ar') === 'ar');

  const handleLogout = async () => {
    await signOut();
    reset();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.lime }}>
      <AppTopBar />
      <View style={{ padding: 22, flex: 1 }}>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26, color: colors.ink }}>Settings</Text>

        <SectionLabel text="Script" />
        <Card style={{ padding: 16 }}>
          <Row label="Mattokki script">
            <ScriptToggle />
          </Row>
        </Card>

        <SectionLabel text="Language" />
        <Card style={{ padding: 16 }}>
          <Row label={langAr ? 'العربية' : 'English'}>
            <AnimatedPressable
              onPress={() => {
                const next = !langAr;
                setLangAr(next);
                patch({ language_preference: next ? 'ar' : 'en' });
              }}
              style={{
                paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999,
                backgroundColor: colors.limeDeep,
              }}
            >
              <Text style={{ fontFamily: 'Inter-Bold', fontSize: 13, color: colors.ink }}>
                {langAr ? 'AR' : 'EN'}
              </Text>
            </AnimatedPressable>
          </Row>
        </Card>

        <SectionLabel text="Notifications" />
        <Card style={{ padding: 16 }}>
          <Row label="Daily reminder">
            <Switch
              value={notifsOn}
              onValueChange={(v) => { setNotifsOn(v); patch({ notifications_enabled: v }); }}
              trackColor={{ false: colors.hairline, true: colors.nile }}
            />
          </Row>
          <Row label={`Reminder time — ${profile?.notification_time ?? '19:30'}`}>
            <Text style={{ color: colors.ink3, fontSize: 13 }}>Edit →</Text>
          </Row>
        </Card>

        <SectionLabel text="Audio" />
        <Card style={{ padding: 16 }}>
          <Text style={{ fontFamily: 'Inter-Medium', fontSize: 15, color: colors.ink, marginBottom: 4 }}>
            Volume
          </Text>
          <Slider
            minimumValue={0}
            maximumValue={1}
            value={getVolume()}
            minimumTrackTintColor={colors.nile}
            maximumTrackTintColor={colors.hairline}
            thumbTintColor={colors.nile}
            onSlidingComplete={setVolume}
          />
        </Card>

        <SectionLabel text="Account" />
        <Card style={{ padding: 16 }}>
          <Row label={profile?.display_name ?? 'Signed in'}>
            <View />
          </Row>
        </Card>
        <EssiButton title="Log out" variant="ghost" style={{ marginTop: 14 }} onPress={handleLogout} />
      </View>
    </View>
  );
}
