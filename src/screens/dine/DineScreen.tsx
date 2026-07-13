import React, { useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';

import { DineStackParamList, MenuCategory } from '../../types';
import { menuCategories, menuItems } from '../../data/menu';
import { useCart } from '../../hooks/useCart';
import { useFadeSlideIn } from '../../hooks/useFadeSlideIn';

import { GuestCodeBar } from '../../components/common/GuestCodeBar';
import { CategoryTabs } from '../../components/dine/CategoryTabs';

import { MenuItemCard } from '../../components/dine/MenuItemCard';

const DineScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DineStackParamList>>();
  const { itemCount } = useCart();
  const [category, setCategory] = useState<MenuCategory>(menuCategories[0]);

  const items = menuItems.filter(item => item.category === category);
  const entrance = useFadeSlideIn();

  return (
    <View style={styles.DineScreenRoot}>
      <ScrollView
        style={styles.DineScreenScroll}
        showsVerticalScrollIndicator={false}
      >
        <GuestCodeBar />
        <Animated.View style={[styles.DineScreenContent, entrance]}>
          <View style={styles.DineScreenHeaderRow}>
            <Text style={styles.DineScreenTitle}>Room Service</Text>
            {itemCount > 0 && (
              <Pressable
                style={styles.DineScreenCartButton}
                onPress={() => navigation.navigate('Cart')}
              >
                <Text style={styles.DineScreenCartIcon}>🛍️</Text>
                <Text style={styles.DineScreenCartCount}>{itemCount}</Text>
              </Pressable>
            )}
          </View>

          <CategoryTabs
            categories={menuCategories}
            selected={category}
            onSelect={setCategory}
          />

          <View style={styles.DineScreenList}>
            {items.map((item, index) => (
              <MenuItemCard
                key={item.id}
                item={item}
                index={index}
                onPress={() =>
                  navigation.navigate('MenuItemDetail', { itemId: item.id })
                }
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  DineScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  DineScreenScroll: {
    flex: 1,
  },
  DineScreenContent: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },

  DineScreenHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  DineScreenTitle: {
    ...Typography.title,
    fontSize: 22,
    color: Colors.textPrimary,
  },
  DineScreenCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.pillBg,
    borderWidth: 1,
    borderColor: Colors.pillBorder,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },

  DineScreenCartIcon: {
    fontSize: 15,
  },

  DineScreenCartCount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.accentLight,
  },

  DineScreenList: {
    marginTop: Spacing.md,
  },
});

export default DineScreen;
