import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';
import { getImage } from '../../assets/images';
import { onboardingSlides } from '../../data/onboarding';
import { GradientButton } from '../../components/common/GradientButton';
import { ProgressDots } from '../../components/common/ProgressDots';

const TRANSITION_OUT_MS = 150;
const TRANSITION_IN_MS = 240;
const SLIDE_TRANSLATE_Y = 10;

interface Props {
  onFinish: () => void;
}

const OnboardingScreen: React.FC<Props> = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const slide = onboardingSlides[currentIndex];
  const isLast = currentIndex === onboardingSlides.length - 1;
  const transition = useRef(new Animated.Value(1)).current;

  const goToIndex = (nextIndex: number) => {
    Animated.timing(transition, {
      toValue: 0,
      duration: TRANSITION_OUT_MS,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(nextIndex);
      Animated.timing(transition, {
        toValue: 1,
        duration: TRANSITION_IN_MS,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleContinue = () => {
    if (isLast) {
      onFinish();
      return;
    }
    goToIndex(currentIndex + 1);
  };

  const slideStyle = {
    flex: 1,
    opacity: transition,
    transform: [
      {
        translateY: transition.interpolate({
          inputRange: [0, 1],
          outputRange: [SLIDE_TRANSLATE_Y, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.OnboardingScreenRoot}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Animated.View style={slideStyle}>
          <View style={styles.OnboardingScreenHero}>
            <Image
              source={getImage(slide.image)}
              style={styles.OnboardingScreenHeroImage}
            />
          </View>

          <View style={styles.OnboardingScreenBody}>
            <View style={styles.OnboardingScreenBadgeRow}>
              <LinearGradient
                colors={[Colors.accent, Colors.accentDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.OnboardingScreenBadge}
              >
                <Text style={styles.OnboardingScreenBadgeGlyph}>H</Text>
              </LinearGradient>
              <Text style={styles.OnboardingScreenIndexLabel}>
                {currentIndex + 1} / {onboardingSlides.length}
              </Text>
            </View>

            <Text style={styles.OnboardingScreenTitle}>{slide.title}</Text>
            <Text style={styles.OnboardingScreenDescription}>
              {slide.description}
            </Text>

            <View style={styles.OnboardingScreenSpacer} />

            <ProgressDots
              count={onboardingSlides.length}
              activeIndex={currentIndex}
            />

            <View style={styles.OnboardingScreenButtonWrap}>
              <GradientButton
                label={isLast ? 'Enter App' : 'Continue'}
                onPress={handleContinue}
              />
            </View>
          </View>
        </Animated.View>

        <Pressable
          onPress={onFinish}
          style={[styles.OnboardingScreenSkip, { top: insets.top + 16 }]}
        >
          <Text style={styles.OnboardingScreenSkipLabel}>Skip</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  OnboardingScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  OnboardingScreenHero: {
    height: 482,
  },
  OnboardingScreenHeroImage: {
    ...StyleSheet.absoluteFill,
    resizeMode: 'cover',
    width: '100%',
  },

  OnboardingScreenHeroOverlay: {
    ...StyleSheet.absoluteFill,
  },

  OnboardingScreenSkip: {
    position: 'absolute',
    right: Layout.screenPaddingH,
    backgroundColor: Colors.skipBg,
    borderRadius: Radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  OnboardingScreenSkipLabel: {
    ...Typography.skip,
    color: Colors.textMuted,
  },

  OnboardingScreenBody: {
    flex: 1,
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: 54,
    paddingBottom: Spacing.lg,
  },
  OnboardingScreenBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  OnboardingScreenBadge: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  OnboardingScreenBadgeGlyph: {
    ...Typography.badgeGlyph,
    color: Colors.white,
  },

  OnboardingScreenIndexLabel: {
    ...Typography.label,
    color: Colors.textMuted,
    marginLeft: Spacing.sm,
  },
  OnboardingScreenTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginTop: Spacing.md,
  },
  OnboardingScreenDescription: {
    ...Typography.body,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
    marginBottom: 5,
  },
  OnboardingScreenSpacer: {
    flex: 1,
  },
  OnboardingScreenButtonWrap: {
    marginTop: Spacing.lg,
    marginBottom: 30,
  },
});

export default OnboardingScreen;
