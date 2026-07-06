import React from 'react';
import { View, type ViewProps } from 'react-native';
import { colors } from '../lib/colors';

export function Card({ style, children, ...rest }: ViewProps) {
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: '#fff',
          borderRadius: 18,
          borderWidth: 1,
          borderColor: colors.hairline,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
