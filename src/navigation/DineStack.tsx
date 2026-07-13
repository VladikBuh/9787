import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DineStackParamList } from '../types';

import DineScreen from '../screens/dine/DineScreen';
import MenuItemDetailScreen from '../screens/dine/MenuItemDetailScreen';
import CartScreen from '../screens/dine/CartScreen';

import OrderConfirmationScreen from '../screens/dine/OrderConfirmationScreen';

const Stack = createNativeStackNavigator<DineStackParamList>();

export const DineStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DineHome" component={DineScreen} />
    <Stack.Screen name="MenuItemDetail" component={MenuItemDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen
      name="OrderConfirmation"
      component={OrderConfirmationScreen}
    />
  </Stack.Navigator>
);
