import React from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { MenuItem } from '../../types';
import { getImage } from '../../assets/images';
import { AnimatedPressable } from '../common/AnimatedPressable';
import { useFadeSlideIn } from '../../hooks/useFadeSlideIn';

interface Props {
  item: MenuItem;
  onPress: () => void;
  index?: number;
}

export const MenuItemCard: React.FC<Props> = ({ item, onPress, index = 0 }) => {
  const entrance = useFadeSlideIn(index * 60);

  return (
    <Animated.View style={entrance}>
      <AnimatedPressable style={styles.MenuItemCardCard} onPress={onPress}>
        <Image source={getImage(item.image)} style={styles.MenuItemCardImage} />
        <View style={styles.MenuItemCardBody}>
          <View style={styles.MenuItemCardTopRow}>
            <Text style={styles.MenuItemCardName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.MenuItemCardPrice}>€{item.price.toFixed(2)}</Text>
          </View>
          <Text style={styles.MenuItemCardDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.MenuItemCardPrepTime}>🕐 {item.prepTime}</Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  MenuItemCardCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.xl,
    padding: 12,
    marginBottom: 12,
  },
  MenuItemCardImage: {
    width: 86,
    height: 86,
    borderRadius: 15,
    backgroundColor: Colors.surfaceInput,
    resizeMode: 'cover',
  },
  MenuItemCardBody: {
    flex: 1,
    marginLeft: 12,
  },
  MenuItemCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  MenuItemCardName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  MenuItemCardPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.accentLight,
  },
  MenuItemCardDescription: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textMuted,
    marginTop: 4,
  },
  MenuItemCardPrepTime: {
    fontSize: 11,
    color: Colors.textDim,
    marginTop: 10,
  },
});
