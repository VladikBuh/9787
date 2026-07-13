import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { Colors, Radius } from '../../theme';
import { AnimatedPressable } from '../common/AnimatedPressable';
import { useFadeSlideIn } from '../../hooks/useFadeSlideIn';

interface Props {
  question: string;
  onPress: () => void;
  index?: number;
}

export const FaqRow: React.FC<Props> = ({ question, onPress, index = 0 }) => {
  const entrance = useFadeSlideIn(index * 60);

  return (
    <Animated.View style={entrance}>
      <AnimatedPressable style={styles.FaqRowCard} onPress={onPress}>
        <Text style={styles.FaqRowIcon}>💬</Text>
        <Text style={styles.FaqRowLabel} numberOfLines={2}>
          {question}
        </Text>
        <Text style={styles.FaqRowChevron}>›</Text>
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  FaqRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  FaqRowIcon: {
    fontSize: 16,
    color: Colors.accentLight,
  },
  FaqRowLabel: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  FaqRowChevron: {
    fontSize: 20,
    color: Colors.textDim,
  },
});
