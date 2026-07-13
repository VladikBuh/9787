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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Layout, Radius, Shadows, Spacing } from '../../theme';
import { DineStackParamList } from '../../types';

import { useCart } from '../../hooks/useCart';
import { getImage } from '../../assets/images';

import { GuestCodeBar } from '../../components/common/GuestCodeBar';

const parseUpperBound = (prepTime: string): number => {
  const matches = prepTime.match(/\d+/g);
  return matches ? Math.max(...matches.map(Number)) : 20;
};

const CartScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DineStackParamList>>();
  const { cart, subtotal, removeItem, clear } = useCart();
  const [roomNumber, setRoomNumber] = useState('');

  const canSubmit = roomNumber.trim().length > 0 && cart.length > 0;

  const maxPrep =
    cart.length > 0
      ? Math.max(...cart.map(line => parseUpperBound(line.item.prepTime)))
      : 20;
  const estimatedTime = `${maxPrep + 3}–${maxPrep + 13} min`;

  const handlePlaceOrder = () => {
    if (!canSubmit) {
      return;
    }
    clear();
    navigation.replace('OrderConfirmation', { estimatedTime });
  };

  return (
    <View style={styles.CartScreenRoot}>
      <ScrollView
        style={styles.CartScreenScroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <GuestCodeBar />
        <View style={styles.CartScreenHeader}>
          <Pressable
            style={styles.CartScreenBack}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.CartScreenBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.CartScreenTitle}>Your Order</Text>
        </View>

        <View style={styles.CartScreenBody}>
          {cart.map(line => (
            <View key={line.item.id} style={styles.CartScreenLineCard}>
              <Image
                source={getImage(line.item.image)}
                style={styles.CartScreenLineImage}
              />
              <View style={styles.CartScreenLineInfo}>
                <Text style={styles.CartScreenLineName} numberOfLines={1}>
                  {line.item.name}
                </Text>
                <Text style={styles.CartScreenLineMeta}>
                  x{line.quantity} · €{line.item.price.toFixed(2)}
                </Text>
              </View>
              <Pressable onPress={() => removeItem(line.item.id)}>
                <Text style={styles.CartScreenLineRemove}>🗑</Text>
              </Pressable>
            </View>
          ))}

          <View style={styles.CartScreenSummaryCard}>
            <Text style={styles.CartScreenSummaryLabel}>ORDER SUMMARY</Text>
            <View style={styles.CartScreenSummaryRow}>
              <Text style={styles.CartScreenSummaryKey}>Subtotal</Text>
              <Text style={styles.CartScreenSummaryValue}>
                €{subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.CartScreenSummaryRow}>
              <Text style={styles.CartScreenSummaryKey}>Delivery</Text>
              <Text style={styles.CartScreenSummaryValue}>Complimentary</Text>
            </View>
            <View style={styles.CartScreenSummaryRow}>
              <Text style={styles.CartScreenSummaryKey}>Estimated time</Text>
              <Text style={styles.CartScreenSummaryValue}>{estimatedTime}</Text>
            </View>
            <View style={styles.CartScreenDivider} />
            <View style={styles.CartScreenSummaryRow}>
              <Text style={styles.CartScreenTotalKey}>Total</Text>
              <Text style={styles.CartScreenTotalValue}>
                €{subtotal.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.CartScreenFieldGroup}>
            <Text style={styles.CartScreenFieldLabel}>ROOM NUMBER</Text>
            <TextInput
              style={styles.CartScreenInput}
              placeholder="e.g. 412"
              placeholderTextColor="rgba(240,244,255,0.5)"
              keyboardType="number-pad"
              value={roomNumber}
              onChangeText={setRoomNumber}
            />
          </View>

          <Pressable onPress={handlePlaceOrder} disabled={!canSubmit}>
            {canSubmit ? (
              <LinearGradient
                colors={[Colors.accent, Colors.accentDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.CartScreenSubmit, Shadows.button]}
              >
                <Text style={styles.CartScreenSubmitLabel}>
                  Place Order · €{subtotal.toFixed(2)}
                </Text>
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles.CartScreenSubmit,
                  styles.CartScreenSubmitDisabled,
                ]}
              >
                <Text style={styles.CartScreenSubmitLabel}>
                  Place Order · €{subtotal.toFixed(2)}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  CartScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  CartScreenScroll: {
    flex: 1,
  },

  CartScreenHeader: {
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.screenPaddingH,
  },
  CartScreenBack: {
    position: 'absolute',
    left: Layout.screenPaddingH,
    zIndex: 1,
  },
  CartScreenBackIcon: {
    fontSize: 24,
    color: Colors.accentLight,
  },

  CartScreenTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: Colors.textPrimary,
    marginLeft: 36,
  },
  CartScreenBody: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },

  CartScreenLineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.lg,
    padding: 12,
    marginBottom: Spacing.md,
  },
  CartScreenLineImage: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: Colors.surfaceInput,
    resizeMode: 'cover',
  },
  CartScreenLineInfo: {
    flex: 1,
    marginLeft: 12,
  },
  CartScreenLineName: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textPrimary,
  },

  CartScreenLineMeta: {
    fontSize: 12,
    color: Colors.textDim,
    marginTop: 4,
  },
  CartScreenLineRemove: {
    fontSize: 16,
  },
  CartScreenSummaryCard: {
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.lg,
    padding: 16,
    marginBottom: Spacing.md,
  },
  CartScreenSummaryLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  CartScreenSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  CartScreenSummaryKey: {
    fontSize: 13,
    color: Colors.textMuted,
  },

  CartScreenSummaryValue: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  CartScreenDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 8,
  },
  CartScreenTotalKey: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  CartScreenTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.accentLight,
  },
  CartScreenFieldGroup: {
    marginBottom: Spacing.lg,
  },
  CartScreenFieldLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  CartScreenInput: {
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderInput,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    height: 51,
    fontSize: 15,
    color: Colors.textPrimary,
  },

  CartScreenSubmit: {
    height: 51,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CartScreenSubmitDisabled: {
    backgroundColor: Colors.dotInactive,
    opacity: 0.45,
  },
  CartScreenSubmitLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default CartScreen;
