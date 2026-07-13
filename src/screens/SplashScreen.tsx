import React, { useEffect, useRef } from 'react';

import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Radius, Typography } from '../theme';

import { getImage } from '../assets/images';

const LOADER_DURATION_MS = 4000;

interface Props {
  onFinish: () => void;
}

const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: LOADER_DURATION_MS,
      useNativeDriver: false,
    });
    animation.start(({ finished }) => {
      if (finished) {
        onFinish();
      }
    });
    return () => animation.stop();
  }, [progress, onFinish]);

  const maskWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  });

  return (
    <View style={styles.SplashScreenRoot}>
      <Image
        source={getImage('LoaderBackground')}
        style={styles.SplashScreenBackgroundImage}
      />
      <LinearGradient
        colors={[Colors.overlayTop, Colors.overlayBottom]}
        style={styles.SplashScreenOverlay}
      />

      <View style={styles.SplashScreenContent}>
        <View style={styles.SplashScreenIconBox}>
          <Image
            source={getImage('LoaderIcon')}
            style={styles.SplashScreenIconImage}
          />
        </View>

        <View style={styles.SplashScreenWordmark}>
          <Text style={styles.SplashScreenBrand}>Hippodrome</Text>
          <Text style={styles.SplashScreenEyebrow}>CASINO HOTEL</Text>
        </View>

        <View style={styles.SplashScreenLoaderBlock}>
          <View style={styles.SplashScreenProgressTrack}>
            <LinearGradient
              colors={[Colors.accent, Colors.accentLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.SplashScreenProgressFill}
            />
            <Animated.View
              style={[styles.SplashScreenProgressMask, { width: maskWidth }]}
            />
          </View>
          <Text style={styles.SplashScreenLoadingLabel}>LOADING</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SplashScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  SplashScreenBackgroundImage: {
    ...StyleSheet.absoluteFill,
    resizeMode: 'cover',
    width: '100%',
  },
  SplashScreenOverlay: {
    ...StyleSheet.absoluteFill,
  },

  SplashScreenContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 203,
    paddingBottom: 56,
  },

  SplashScreenIconBox: {},
  SplashScreenIconImage: {
    resizeMode: 'cover',
  },
  SplashScreenWordmark: {
    alignItems: 'center',
    marginTop: 32,
  },

  SplashScreenBrand: {
    ...Typography.brand,
    color: Colors.textPrimary,
  },
  SplashScreenEyebrow: {
    ...Typography.label,
    color: Colors.textMuted,
    marginTop: 8,
  },

  SplashScreenLoaderBlock: {
    width: 243,
    alignItems: 'center',
  },

  SplashScreenProgressTrack: {
    width: '100%',
    height: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.progressTrack,
    overflow: 'hidden',
  },
  SplashScreenProgressFill: {
    width: '100%',
    height: 4,
    borderRadius: Radius.full,
  },

  SplashScreenProgressMask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.progressTrack,
  },

  SplashScreenLoadingLabel: {
    ...Typography.label,
    color: Colors.textMuted,
    marginTop: 16,
  },
});

export default SplashScreen;
