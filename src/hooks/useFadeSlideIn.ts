import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const DURATION_MS = 380;
const TRANSLATE_Y = 14;

export const useFadeSlideIn = (delay: number = 0) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: DURATION_MS,
      delay,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, delay]);

  return {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [TRANSLATE_Y, 0],
        }),
      },
    ],
  };
};
