import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Layout, Radius, Shadows, Spacing } from '../../theme';
import { DineStackParamList } from '../../types';

import { getMenuItem } from '../../data/menu';
import { useCart } from '../../hooks/useCart';

import { getImage } from '../../assets/images';

type Props = NativeStackScreenProps<DineStackParamList, 'MenuItemDetail'>;

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 9;

const MenuItemDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<Props['route']>();
  const item = getMenuItem(route.params.itemId);
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const [note, setNote] = useState('');

  const handleAddToOrder = () => {
    addItem(item, quantity, note.trim());
    navigation.goBack();
  };

  return (
    <View style={styles.MenuItemDetailScreenRoot}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.MenuItemDetailScreenHero}>
          <Image source={getImage(item.image)} style={{ height: 250 }} />
          <LinearGradient
            colors={['rgba(0,0,0,0.28)', 'rgba(6,10,18,0.95)']}
            style={styles.MenuItemDetailScreenHeroOverlay}
          />
          <Pressable
            style={styles.MenuItemDetailScreenBack}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.MenuItemDetailScreenBackIcon}>‹</Text>
          </Pressable>
        </View>

        <View style={styles.MenuItemDetailScreenBody}>
          <View style={styles.MenuItemDetailScreenCard}>
            <View style={styles.MenuItemDetailScreenTitleRow}>
              <Text style={styles.MenuItemDetailScreenName}>{item.name}</Text>
              <Text style={styles.MenuItemDetailScreenPrice}>
                €{item.price.toFixed(2)}
              </Text>
            </View>
            <Text style={styles.MenuItemDetailScreenDescription}>
              {item.description}
            </Text>
            <View style={styles.MenuItemDetailScreenMetaRow}>
              <Text style={styles.MenuItemDetailScreenPrepTime}>
                🕐 {item.prepTime} preparation
              </Text>
              <Text style={styles.MenuItemDetailScreenStars}>★★★★★</Text>
            </View>
          </View>

          <View style={styles.MenuItemDetailScreenCard}>
            <Text style={styles.MenuItemDetailScreenLabel}>INGREDIENTS</Text>
            <View style={styles.MenuItemDetailScreenIngredientsWrap}>
              {item.ingredients.map(ingredient => (
                <View
                  key={ingredient}
                  style={styles.MenuItemDetailScreenIngredientPill}
                >
                  <Text style={styles.MenuItemDetailScreenIngredientLabel}>
                    {ingredient}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.MenuItemDetailScreenCard}>
            <View style={styles.MenuItemDetailScreenQuantityRow}>
              <Text style={styles.MenuItemDetailScreenQuantityLabel}>
                Quantity
              </Text>
              <View style={styles.MenuItemDetailScreenStepper}>
                <Pressable
                  style={styles.MenuItemDetailScreenStepperButton}
                  onPress={() =>
                    setQuantity(q => Math.max(MIN_QUANTITY, q - 1))
                  }
                >
                  <Text style={styles.MenuItemDetailScreenStepperGlyph}>−</Text>
                </Pressable>
                <Text style={styles.MenuItemDetailScreenQuantityValue}>
                  {quantity}
                </Text>
                <Pressable
                  style={[
                    styles.MenuItemDetailScreenStepperButton,
                    styles.MenuItemDetailScreenStepperButtonAccent,
                  ]}
                  onPress={() =>
                    setQuantity(q => Math.min(MAX_QUANTITY, q + 1))
                  }
                >
                  <Text style={styles.MenuItemDetailScreenStepperGlyphAccent}>
                    +
                  </Text>
                </Pressable>
              </View>
            </View>

            <TextInput
              style={styles.MenuItemDetailScreenNoteInput}
              placeholder="Special requests, allergies..."
              placeholderTextColor="rgba(240,244,255,0.5)"
              value={note}
              onChangeText={setNote}
            />
          </View>

          <Pressable onPress={handleAddToOrder}>
            <LinearGradient
              colors={[Colors.accent, Colors.accentDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.MenuItemDetailScreenSubmit, Shadows.button]}
            >
              <Text style={styles.MenuItemDetailScreenSubmitLabel}>
                Add to Order · €{(item.price * quantity).toFixed(2)}
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  MenuItemDetailScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  MenuItemDetailScreenHero: {},

  MenuItemDetailScreenHeroOverlay: {
    ...StyleSheet.absoluteFill,
  },

  MenuItemDetailScreenBack: {
    position: 'absolute',
    top: 54,
    left: 14,
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  MenuItemDetailScreenBackIcon: {
    fontSize: 24,
    color: Colors.white,
    marginTop: -2,
  },
  MenuItemDetailScreenBody: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  MenuItemDetailScreenCard: {
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: 18,
    padding: 16,
    marginBottom: Spacing.md,
  },
  MenuItemDetailScreenTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  MenuItemDetailScreenName: {
    flex: 1,
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 19,
    color: Colors.textPrimary,
  },
  MenuItemDetailScreenPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.accentLight,
  },

  MenuItemDetailScreenDescription: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 10,
    lineHeight: 20,
  },
  MenuItemDetailScreenMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  MenuItemDetailScreenPrepTime: {
    fontSize: 12,
    color: Colors.textDim,
  },
  MenuItemDetailScreenStars: {
    fontSize: 12,
    color: Colors.statusSubmitted,
    letterSpacing: 2,
  },

  MenuItemDetailScreenLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  MenuItemDetailScreenIngredientsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  MenuItemDetailScreenIngredientPill: {
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  MenuItemDetailScreenIngredientLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  MenuItemDetailScreenQuantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },

  MenuItemDetailScreenQuantityLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  MenuItemDetailScreenStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  MenuItemDetailScreenStepperButton: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  MenuItemDetailScreenStepperButtonAccent: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  MenuItemDetailScreenStepperGlyph: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  MenuItemDetailScreenStepperGlyphAccent: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },

  MenuItemDetailScreenQuantityValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },

  MenuItemDetailScreenNoteInput: {
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.borderInput,
    borderRadius: 12,
    paddingHorizontal: 13,
    height: 44,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  MenuItemDetailScreenSubmit: {
    height: 51,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  MenuItemDetailScreenSubmitLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default MenuItemDetailScreen;
