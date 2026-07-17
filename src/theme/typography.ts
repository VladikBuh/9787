import { Platform } from 'react-native';

const playfair = (weight: 'Regular' | 'Medium' | 'SemiBold' | 'Bold' | 'ExtraBold') =>
  Platform.select({
    ios: `PlayfairDisplay-${weight}`,
    android: `PlayfairDisplay-${weight}`,
    default: `PlayfairDisplay-${weight}`,
  });

export const Typography = {
  // Splash wordmark ("Hippodrome")
  brand: {
    fontFamily: playfair('SemiBold'),
    fontSize: 34,
    letterSpacing: 0.4,
  },
  // Onboarding slide headline
  title: {
    fontFamily: playfair('Bold'),
    fontSize: 26,
    letterSpacing: 0,
  },
  // "H" badge glyph
  badgeGlyph: {
    fontFamily: playfair('Bold'),
    fontSize: 17,
  },
  // Slide description
  body: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  // Continue / Enter App button label
  button: {
    fontSize: 15,
    fontWeight: '600' as const,
  },
  // Skip button label
  skip: {
    fontSize: 13,
    fontWeight: '500' as const,
  },
  // Badge index ("1 / 5"), eyebrow ("ROOM HUB"), "LOADING" — mono-style label
  label: {
    fontSize: 11,
    fontWeight: '400' as const,
    letterSpacing: 2,
  },
};
