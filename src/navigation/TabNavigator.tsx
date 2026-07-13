// Tab

import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors, Radius } from '../theme';
import { TabParamList } from '../types';

import { getImage } from '../assets/images';
import RequestsScreen from '../screens/requests/RequestsScreen';
import ClimateScreen from '../screens/climate/ClimateScreen';
import { DineStack } from './DineStack';

import ParkingScreen from '../screens/parking/ParkingScreen';

import ConciergeScreen from '../screens/concierge/ConciergeScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const tabIcon =
  (imageKey: string) =>
  ({ focused }: { focused: boolean }) =>
    (
      <View style={[tabStyles.iconTile, focused && tabStyles.iconTileActive]}>
        <Image
          source={getImage(imageKey)}
          style={[tabStyles.icon, !focused && tabStyles.iconInactive]}
        />
      </View>
    );

export const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="RequestsTab"
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.accentLight,
      tabBarInactiveTintColor: Colors.textMuted,
      tabBarStyle: tabStyles.bar,
      tabBarLabelStyle: tabStyles.label,
      tabBarItemStyle: tabStyles.item,
    }}
  >
    <Tab.Screen
      name="RequestsTab"
      component={RequestsScreen}
      options={{ tabBarLabel: 'Requests', tabBarIcon: tabIcon('TabRequests') }}
    />
    <Tab.Screen
      name="ClimateTab"
      component={ClimateScreen}
      options={{ tabBarLabel: 'Climate', tabBarIcon: tabIcon('TabClimate') }}
    />
    <Tab.Screen
      name="DineTab"
      component={DineStack}
      options={{ tabBarLabel: 'Dine', tabBarIcon: tabIcon('TabDine') }}
    />
    <Tab.Screen
      name="ParkingTab"
      component={ParkingScreen}
      options={{ tabBarLabel: 'Parking', tabBarIcon: tabIcon('TabParking') }}
    />
    <Tab.Screen
      name="ConciergeTab"
      component={ConciergeScreen}
      options={{
        tabBarLabel: 'Concierge',
        tabBarIcon: tabIcon('TabConcierge'),
      }}
    />
  </Tab.Navigator>
);

const tabStyles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.cardSurface,
    borderTopColor: Colors.guestCodeBarBorder,
    borderTopWidth: 1,
    height: 88,
    paddingTop: 8,
  },
  item: {
    paddingTop: 0,
  },

  label: {
    fontSize: 9.5,
    fontWeight: '500',
    letterSpacing: 0.2,
    marginTop: 6,
  },

  iconTile: {
    width: 34,
    height: 34,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTileActive: {
    backgroundColor: 'rgba(43,111,237,0.18)',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  iconInactive: {
    opacity: 0.4,
  },
});
