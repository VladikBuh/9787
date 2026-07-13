import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { RequestCategory } from '../../types';
import { AnimatedPressable } from '../common/AnimatedPressable';
import { useFadeSlideIn } from '../../hooks/useFadeSlideIn';

interface Props {
  category: RequestCategory;
  onPress: () => void;
  index?: number;
}

export const CategoryRow: React.FC<Props> = ({ category, onPress, index = 0 }) => {
  const entrance = useFadeSlideIn(index * 60);

  return (
    <Animated.View style={entrance}>
      <AnimatedPressable style={styles.CategoryRowCard} onPress={onPress}>
        <View style={[styles.CategoryRowIconTile, { backgroundColor: category.tint }]}>
          <Text style={styles.CategoryRowIcon}>{category.icon}</Text>
        </View>
        <Text style={styles.CategoryRowLabel} numberOfLines={1}>
          {category.label}
        </Text>
        <Text style={styles.CategoryRowChevron}>›</Text>
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  CategoryRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.lg,
    padding: 14,
    marginBottom: 12,
  },
  CategoryRowIconTile: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CategoryRowIcon: {
    fontSize: 22,
  },
  CategoryRowLabel: {
    flex: 1,
    marginLeft: 14,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  CategoryRowChevron: {
    fontSize: 22,
    color: Colors.textDim,
  },
});
