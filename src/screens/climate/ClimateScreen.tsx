import React, { useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';
import { ClimateMode, FanSpeed } from '../../types';

import { useFadeSlideIn } from '../../hooks/useFadeSlideIn';
import { GuestCodeBar } from '../../components/common/GuestCodeBar';

import { Toggle } from '../../components/common/Toggle';

const MODE_OPTIONS: Array<{
  key: ClimateMode;
  label: string;
  icon: string;
  accent: string;
  bg: string;
  border: string;
}> = [
  {
    key: 'Cool',
    label: 'cool',
    icon: '❄️',
    accent: Colors.coolAccent,
    bg: Colors.coolBg,
    border: Colors.coolBorder,
  },
  {
    key: 'Heat',
    label: 'heat',
    icon: '🔥',
    accent: Colors.heatAccent,
    bg: Colors.heatBg,
    border: Colors.heatBorder,
  },
  {
    key: 'Auto',
    label: 'auto',
    icon: '⚙️',
    accent: Colors.autoAccent,
    bg: Colors.autoBg,
    border: Colors.autoBorder,
  },
];

const FAN_OPTIONS: FanSpeed[] = ['Low', 'Medium', 'High'];

const MODE_VERB: Record<ClimateMode, string> = {
  Cool: 'Cooling',
  Heat: 'Heating',
  Auto: 'Auto',
};

const MIN_TEMP = 16;
const MAX_TEMP = 30;

const ClimateScreen: React.FC = () => {
  const [active, setActive] = useState(true);
  const [mode, setMode] = useState<ClimateMode>('Auto');
  const [fanSpeed, setFanSpeed] = useState<FanSpeed>('Medium');
  const [targetTemp, setTargetTemp] = useState(21);
  const [sleepMode, setSleepMode] = useState(false);

  const subtitle = `${MODE_VERB[mode]} · Fan ${fanSpeed.toLowerCase()}`;
  const entrance = useFadeSlideIn();

  return (
    <View style={styles.ClimateScreenRoot}>
      <ScrollView
        style={styles.ClimateScreenScroll}
        showsVerticalScrollIndicator={false}
      >
        <GuestCodeBar />
        <Animated.View style={[styles.ClimateScreenContent, entrance]}>
          <View style={styles.ClimateScreenHeaderRow}>
            <Text style={styles.ClimateScreenTitle}>Climate</Text>
            <Pressable
              style={[
                styles.ClimateScreenPowerPill,
                active
                  ? styles.ClimateScreenPowerPillActive
                  : styles.ClimateScreenPowerPillOff,
              ]}
              onPress={() => setActive(prev => !prev)}
            >
              <Text style={styles.ClimateScreenPowerIcon}>⚡</Text>
              <Text
                style={[
                  styles.ClimateScreenPowerLabel,
                  { color: active ? Colors.accentLight : Colors.offAccent },
                ]}
              >
                {active ? 'Active' : 'Off'}
              </Text>
            </Pressable>
          </View>

          <LinearGradient
            colors={[Colors.cardSurface, Colors.surfaceInput]}
            style={styles.ClimateScreenTempCard}
          >
            <View style={styles.ClimateScreenTempCardInner}>
              <View style={styles.ClimateScreenTempRow}>
                <Text
                  style={[
                    styles.ClimateScreenTempValue,
                    !active && styles.ClimateScreenDimText,
                  ]}
                >
                  {targetTemp}
                </Text>
                <Text
                  style={[
                    styles.ClimateScreenTempUnit,
                    !active && styles.ClimateScreenDimText,
                  ]}
                >
                  °C
                </Text>
              </View>
              <Text style={styles.ClimateScreenSubtitle}>{subtitle}</Text>

              <View style={styles.ClimateScreenTempButtons}>
                <Pressable
                  disabled={!active}
                  style={[
                    styles.ClimateScreenTempButton,
                    !active && styles.ClimateScreenDimmed,
                  ]}
                  onPress={() => setTargetTemp(t => Math.max(MIN_TEMP, t - 1))}
                >
                  <Text style={styles.ClimateScreenTempButtonLabel}>−</Text>
                </Pressable>
                <Pressable
                  disabled={!active}
                  style={[
                    styles.ClimateScreenTempButton,
                    !active && styles.ClimateScreenDimmed,
                  ]}
                  onPress={() => setTargetTemp(t => Math.min(MAX_TEMP, t + 1))}
                >
                  <Text style={styles.ClimateScreenTempButtonLabel}>+</Text>
                </Pressable>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.ClimateScreenSection}>
            <Text style={styles.ClimateScreenSectionLabel}>MODE</Text>
            <View style={styles.ClimateScreenModeRow}>
              {MODE_OPTIONS.map(option => {
                const selected = mode === option.key;
                return (
                  <Pressable
                    key={option.key}
                    disabled={!active}
                    onPress={() => setMode(option.key)}
                    style={[
                      styles.ClimateScreenModeButton,
                      selected && {
                        backgroundColor: option.bg,
                        borderColor: option.border,
                      },
                      !active && styles.ClimateScreenDimmed,
                    ]}
                  >
                    <Text style={styles.ClimateScreenModeIcon}>
                      {option.icon}
                    </Text>
                    <Text
                      style={[
                        styles.ClimateScreenModeLabel,
                        selected && styles.ClimateScreenModeLabelSelected,
                        selected && { color: option.accent },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.ClimateScreenSection}>
            <Text style={styles.ClimateScreenSectionLabel}>FAN SPEED</Text>
            <View style={styles.ClimateScreenFanRow}>
              {FAN_OPTIONS.map(option => {
                const selected = fanSpeed === option;
                return (
                  <Pressable
                    key={option}
                    disabled={!active}
                    onPress={() => setFanSpeed(option)}
                    style={[
                      styles.ClimateScreenFanButton,
                      selected && styles.ClimateScreenFanButtonSelected,
                      !active && styles.ClimateScreenDimmed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.ClimateScreenFanLabel,
                        selected && styles.ClimateScreenFanLabelSelected,
                      ]}
                    >
                      {option.toLowerCase()}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View
            style={[
              styles.ClimateScreenCard,
              styles.ClimateScreenSleepCard,
              !active && styles.ClimateScreenDimmed,
            ]}
          >
            <View style={styles.ClimateScreenSleepInfo}>
              <View style={styles.ClimateScreenSleepIconTile}>
                <Text style={styles.ClimateScreenSleepIcon}>🌙</Text>
              </View>
              <View style={styles.ClimateScreenSleepTextGroup}>
                <Text style={styles.ClimateScreenSleepTitle}>Sleep Mode</Text>
                <Text style={styles.ClimateScreenSleepDescription}>
                  Gradual temperature adjustment
                </Text>
              </View>
            </View>
            <Toggle
              value={sleepMode}
              onValueChange={setSleepMode}
              disabled={!active}
            />
          </View>

          <View
            style={[styles.ClimateScreenCard, styles.ClimateScreenSensorsCard]}
          >
            <Text style={styles.ClimateScreenSectionLabel}>ROOM SENSORS</Text>
            <View style={styles.ClimateScreenSensorsRow}>
              <View style={styles.ClimateScreenSensorTile}>
                <Text
                  style={[
                    styles.ClimateScreenSensorValue,
                    { color: Colors.sensorCyan },
                  ]}
                >
                  47%
                </Text>
                <Text style={styles.ClimateScreenSensorLabel}>Humidity</Text>
              </View>
              <View style={styles.ClimateScreenSensorTile}>
                <Text
                  style={[
                    styles.ClimateScreenSensorValue,
                    { color: Colors.autoAccent },
                  ]}
                >
                  Good
                </Text>
                <Text style={styles.ClimateScreenSensorLabel}>Air Quality</Text>
              </View>
              <View style={styles.ClimateScreenSensorTile}>
                <Text
                  style={[
                    styles.ClimateScreenSensorValue,
                    { color: Colors.accent },
                  ]}
                >
                  {targetTemp}°C
                </Text>
                <Text style={styles.ClimateScreenSensorLabel}>Set Temp</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ClimateScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  ClimateScreenScroll: {
    flex: 1,
  },

  ClimateScreenContent: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },

  ClimateScreenHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  ClimateScreenTitle: {
    ...Typography.title,
    fontSize: 22,
    color: Colors.textPrimary,
  },

  ClimateScreenPowerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.full,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
  },
  ClimateScreenPowerPillActive: {
    backgroundColor: Colors.activeBg,
    borderColor: Colors.activeBorder,
  },

  ClimateScreenPowerPillOff: {
    backgroundColor: Colors.offBg,
    borderColor: Colors.offBorder,
  },
  ClimateScreenPowerIcon: {
    fontSize: 13,
  },

  ClimateScreenPowerLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  ClimateScreenTempCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.guestCodeBarBorder,
    alignItems: 'center',
  },
  ClimateScreenTempCardInner: {
    padding: 20,
    alignItems: 'center',
  },
  ClimateScreenTempRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  ClimateScreenTempValue: {
    fontSize: 88,
    fontWeight: '200',

    color: Colors.textPrimary,
  },
  ClimateScreenTempUnit: {
    fontSize: 28,
    fontWeight: '300',
    color: Colors.textMuted,
    marginTop: 16,
  },
  ClimateScreenDimText: {
    color: Colors.textDim,
  },
  ClimateScreenSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 8,
  },
  ClimateScreenTempButtons: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 20,
  },
  ClimateScreenTempButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ClimateScreenTempButtonLabel: {
    fontSize: 22,
    fontWeight: '300',
    color: Colors.textPrimary,
  },
  ClimateScreenDimmed: {
    opacity: 0.4,
  },
  ClimateScreenSection: {
    marginTop: Spacing.lg,
  },
  ClimateScreenSectionLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  ClimateScreenModeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ClimateScreenModeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: Radius.lg,
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  ClimateScreenModeIcon: {
    fontSize: 22,
  },
  ClimateScreenModeLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 8,
    textTransform: 'capitalize',
  },
  ClimateScreenModeLabelSelected: {
    fontWeight: '600',
  },
  ClimateScreenFanRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ClimateScreenFanButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  ClimateScreenFanButtonSelected: {
    backgroundColor: Colors.fanSelectedBg,
    borderColor: Colors.fanSelectedBorder,
  },
  ClimateScreenFanLabel: {
    fontSize: 13,
    color: Colors.textMuted,
    textTransform: 'capitalize',
  },
  ClimateScreenFanLabelSelected: {
    color: Colors.accentLight,
    fontWeight: '600',
  },
  ClimateScreenCard: {
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.lg,
  },
  ClimateScreenSleepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginTop: Spacing.lg,
  },
  ClimateScreenSleepInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ClimateScreenSleepIconTile: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.surfaceInput,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ClimateScreenSleepIcon: {
    fontSize: 20,
  },
  ClimateScreenSleepTextGroup: {
    marginLeft: 12,
    flex: 1,
  },
  ClimateScreenSleepTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  ClimateScreenSleepDescription: {
    fontSize: 11,
    color: Colors.textDim,
    marginTop: 2,
  },
  ClimateScreenSensorsCard: {
    padding: 16,
    marginTop: Spacing.lg,
  },
  ClimateScreenSensorsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: Spacing.sm,
  },
  ClimateScreenSensorTile: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.sensorTileBg,
  },
  ClimateScreenSensorValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  ClimateScreenSensorLabel: {
    fontSize: 10,
    color: Colors.textDim,
    marginTop: 2,
  },
});

export default ClimateScreen;
