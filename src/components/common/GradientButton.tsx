import React from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Radius, Shadows, Typography } from '../../theme';
import { AnimatedPressable } from './AnimatedPressable';

interface Props {
  label: string;
  onPress: () => void;
}

export const GradientButton: React.FC<Props> = ({ label, onPress }) => (
  <AnimatedPressable onPress={onPress} style={styles.GradientButtonPressWrap}>
    <LinearGradient
      colors={[Colors.accent, Colors.accentDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.GradientButtonFill}
    >
      <Text style={styles.GradientButtonLabel}>{label}</Text>
    </LinearGradient>
  </AnimatedPressable>
);

const styles = StyleSheet.create({
  GradientButtonPressWrap: {
    ...Shadows.button,
  },
  GradientButtonFill: {
    height: 51,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  GradientButtonLabel: {
    ...Typography.button,
    color: Colors.white,
  },
});
