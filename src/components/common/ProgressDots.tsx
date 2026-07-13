import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../theme';

interface Props {
  count: number;
  activeIndex: number;
}

export const ProgressDots: React.FC<Props> = ({ count, activeIndex }) => (
  <View style={styles.ProgressDotsRow}>
    {Array.from({ length: count }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.ProgressDotsDot,
          index === activeIndex && styles.ProgressDotsDotActive,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  ProgressDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  ProgressDotsDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.dotInactive,
  },
  ProgressDotsDotActive: {
    width: 28,
    backgroundColor: Colors.accent,
  },
});
