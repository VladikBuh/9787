import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Colors, Radius } from '../../theme';

import { DineStackParamList } from '../../types';

type Props = NativeStackScreenProps<DineStackParamList, 'OrderConfirmation'>;

const AUTO_RETURN_MS = 2500;

const OrderConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({ index: 0, routes: [{ name: 'DineHome' }] });
    }, AUTO_RETURN_MS);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.OrderConfirmationScreenRoot}>
      <View style={styles.OrderConfirmationScreenBadge}>
        <Text style={styles.OrderConfirmationScreenCheck}>✓</Text>
      </View>
      <Text style={styles.OrderConfirmationScreenTitle}>Order Placed!</Text>
      <Text style={styles.OrderConfirmationScreenMessage}>
        Your order is being prepared. Estimated delivery time:{' '}
        {route.params.estimatedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  OrderConfirmationScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  OrderConfirmationScreenBadge: {
    width: 88,
    height: 88,
    borderRadius: Radius.full,
    backgroundColor: Colors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  OrderConfirmationScreenCheck: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.statusCompleted,
  },

  OrderConfirmationScreenTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: 16,
  },

  OrderConfirmationScreenMessage: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

export default OrderConfirmationScreen;
