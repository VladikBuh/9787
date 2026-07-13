import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { MenuCategory } from '../../types';
import { AnimatedPressable } from '../common/AnimatedPressable';

interface Props {
  categories: MenuCategory[];
  selected: MenuCategory;
  onSelect: (category: MenuCategory) => void;
}

export const CategoryTabs: React.FC<Props> = ({
  categories,
  selected,
  onSelect,
}) => (
  <View style={styles.CategoryTabsRow}>
    {categories.map(category => {
      const active = category === selected;
      return (
        <AnimatedPressable
          key={category}
          style={[
            styles.CategoryTabsPill,
            active && styles.CategoryTabsPillActive,
          ]}
          onPress={() => onSelect(category)}
        >
          <Text
            style={[
              styles.CategoryTabsLabel,
              active && styles.CategoryTabsLabelActive,
            ]}
          >
            {category}
          </Text>
        </AnimatedPressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  CategoryTabsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  CategoryTabsPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: Radius.full,
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 10,
  },
  CategoryTabsPillActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  CategoryTabsLabel: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.2,
    color: Colors.textMuted,
  },
  CategoryTabsLabelActive: {
    color: Colors.white,
    fontWeight: '600',
  },
});
