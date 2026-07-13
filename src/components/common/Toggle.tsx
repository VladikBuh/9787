import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Colors, Radius } from '../../theme';

interface Props {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  activeColor?: string;
}

export const Toggle: React.FC<Props> = ({
  value,
  onValueChange,
  disabled,
  activeColor = Colors.toggleTrackOn,
}) => {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const trackColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.toggleTrackOff, activeColor],
  });
  const thumbLeft = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 24],
  });

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      style={disabled && styles.ToggleDisabled}
    >
      <Animated.View style={[styles.ToggleTrack, { backgroundColor: trackColor }]}>
        <Animated.View style={[styles.ToggleThumb, { left: thumbLeft }]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ToggleDisabled: {
    opacity: 0.4,
  },
  ToggleTrack: {
    width: 50,
    height: 30,
    borderRadius: Radius.full,
    justifyContent: 'center',
  },
  ToggleThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    backgroundColor: Colors.toggleThumb,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
});
