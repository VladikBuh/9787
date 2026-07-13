import React, { useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Colors } from '../theme';

import { Phase } from '../types';
import SplashScreen from '../screens/SplashScreen';

import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import { RootNavigator } from './RootNavigator';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    card: Colors.cardSurface,
    text: Colors.textPrimary,
    border: Colors.guestCodeBarBorder,
    primary: Colors.accent,
    notification: Colors.accent,
  },
};

export default function AppNavigator() {
  const [phase, setPhase] = useState<Phase>('splash');

  if (phase === 'splash') {
    return <SplashScreen onFinish={() => setPhase('onboarding')} />;
  }

  if (phase === 'onboarding') {
    return <OnboardingScreen onFinish={() => setPhase('main')} />;
  }

  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
