import React from 'react';
import { View, Text } from 'react-native';
import { AppTopBar } from '../../components/AppTopBar';
import { colors } from '../../lib/colors';

export default function Practice() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.lime }}>
      <AppTopBar />
      <View style={{ padding: 22 }}>
        <Text style={{ fontFamily: 'Fraunces-SemiBold', fontSize: 26 }}>Practice</Text>
        <Text style={{ color: colors.ink3, marginTop: 8 }}>
          Wire up this screen using the matching design-canvas artboard as the spec.
        </Text>
      </View>
    </View>
  );
}
