import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { TabNavigator } from './TabNavigator';

import RequestFormScreen from '../screens/requests/RequestFormScreen';

import RequestsHistoryScreen from '../screens/requests/RequestsHistoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen name="RequestForm" component={RequestFormScreen} />
    <Stack.Screen name="RequestsHistory" component={RequestsHistoryScreen} />
  </Stack.Navigator>
);
