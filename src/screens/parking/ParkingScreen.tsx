// Parking screen

import React, { useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Colors,
  Layout,
  Radius,
  Shadows,
  Spacing,
  Typography,
} from '../../theme';
import { ParkingFloor, ParkingReservation, ParkingSpot } from '../../types';

import { getSpot, parkingSpotsByFloor } from '../../data/parkingSpots';

import { useParkingReservations } from '../../hooks/useParkingReservations';
import { useFadeSlideIn } from '../../hooks/useFadeSlideIn';
import { GuestCodeBar } from '../../components/common/GuestCodeBar';
import { SpotGrid } from '../../components/parking/SpotGrid';

import { ReservationCard } from '../../components/parking/ReservationCard';

const FLOORS: ParkingFloor[] = [1, 2, 3];

type ActiveView = 'Map' | 'MySpots';

const ParkingScreen: React.FC = () => {
  const { reservations, addReservation, updateReservation, cancelReservation } =
    useParkingReservations();

  const [activeView, setActiveView] = useState<ActiveView>('Map');
  const [selectedFloor, setSelectedFloor] = useState<ParkingFloor>(1);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [showReserveForm, setShowReserveForm] = useState(false);
  const [startText, setStartText] = useState('');
  const [endText, setEndText] = useState('');
  const [editingReservationId, setEditingReservationId] = useState<
    string | null
  >(null);

  const spots = parkingSpotsByFloor[selectedFloor];
  const availableCount = spots.filter(s => s.status === 'Available').length;
  const occupiedCount = spots.filter(s => s.status === 'Occupied').length;
  const selectedSpot = selectedSpotId
    ? getSpot(selectedFloor, selectedSpotId)
    : undefined;
  const canConfirm = startText.trim().length > 0 && endText.trim().length > 0;
  const entrance = useFadeSlideIn();

  const resetSelection = () => {
    setSelectedSpotId(null);
    setShowReserveForm(false);
    setStartText('');
    setEndText('');
    setEditingReservationId(null);
  };

  const handleSelectFloor = (floor: ParkingFloor) => {
    setSelectedFloor(floor);
    resetSelection();
  };

  const handleSelectSpot = (spot: ParkingSpot) => {
    setSelectedSpotId(spot.id);
    setShowReserveForm(false);
    setStartText('');
    setEndText('');
    setEditingReservationId(null);
  };

  const handleConfirm = () => {
    if (!canConfirm || !selectedSpot) {
      return;
    }
    if (editingReservationId) {
      updateReservation(editingReservationId, startText.trim(), endText.trim());
    } else {
      addReservation(selectedSpot, startText.trim(), endText.trim());
    }
    resetSelection();
    setActiveView('MySpots');
  };

  const handleEdit = (reservation: ParkingReservation) => {
    setActiveView('Map');
    setSelectedFloor(reservation.floor);
    setSelectedSpotId(reservation.spotId);
    setShowReserveForm(true);
    setStartText(reservation.start);
    setEndText(reservation.end);
    setEditingReservationId(reservation.id);
  };

  return (
    <View style={styles.ParkingScreenRoot}>
      <ScrollView
        style={styles.ParkingScreenScroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <GuestCodeBar />
        <Animated.View style={[styles.ParkingScreenContent, entrance]}>
          <View style={styles.ParkingScreenHeaderRow}>
            <Text style={styles.ParkingScreenTitle}>Parking</Text>
            <View style={styles.ParkingScreenViewToggle}>
              <Pressable
                style={[
                  styles.ParkingScreenViewToggleButton,
                  activeView === 'Map' &&
                    styles.ParkingScreenViewToggleButtonActive,
                ]}
                onPress={() => setActiveView('Map')}
              >
                <Text
                  style={[
                    styles.ParkingScreenViewToggleLabel,
                    activeView === 'Map' &&
                      styles.ParkingScreenViewToggleLabelActive,
                  ]}
                >
                  Map
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.ParkingScreenViewToggleButton,
                  activeView === 'MySpots' &&
                    styles.ParkingScreenViewToggleButtonActive,
                ]}
                onPress={() => setActiveView('MySpots')}
              >
                <Text
                  style={[
                    styles.ParkingScreenViewToggleLabel,
                    activeView === 'MySpots' &&
                      styles.ParkingScreenViewToggleLabelActive,
                  ]}
                >
                  My Spots
                </Text>
              </Pressable>
            </View>
          </View>

          {activeView === 'Map' ? (
            <>
              <View style={styles.ParkingScreenFloorRow}>
                {FLOORS.map(floor => {
                  const active = floor === selectedFloor;
                  return (
                    <Pressable
                      key={floor}
                      style={[
                        styles.ParkingScreenFloorButton,
                        active && styles.ParkingScreenFloorButtonActive,
                      ]}
                      onPress={() => handleSelectFloor(floor)}
                    >
                      <Text
                        style={[
                          styles.ParkingScreenFloorLabel,
                          active && styles.ParkingScreenFloorLabelActive,
                        ]}
                      >
                        Floor {floor}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.ParkingScreenStatsRow}>
                <View
                  style={[
                    styles.ParkingScreenStatCard,
                    styles.ParkingScreenStatCardAvailable,
                  ]}
                >
                  <Text
                    style={[
                      styles.ParkingScreenStatValue,
                      { color: Colors.statusCompleted },
                    ]}
                  >
                    {availableCount}
                  </Text>
                  <Text style={styles.ParkingScreenStatLabel}>Available</Text>
                </View>
                <View
                  style={[
                    styles.ParkingScreenStatCard,
                    styles.ParkingScreenStatCardOccupied,
                  ]}
                >
                  <Text
                    style={[
                      styles.ParkingScreenStatValue,
                      { color: Colors.offAccent },
                    ]}
                  >
                    {occupiedCount}
                  </Text>
                  <Text style={styles.ParkingScreenStatLabel}>Occupied</Text>
                </View>
              </View>

              <View style={styles.ParkingScreenGridCard}>
                <Text style={styles.ParkingScreenGridLabel}>
                  FLOOR {selectedFloor} · TAP TO SELECT A SPOT
                </Text>
                <SpotGrid
                  spots={spots}
                  selectedSpotId={selectedSpotId}
                  onSelect={handleSelectSpot}
                />
                <View style={styles.ParkingScreenLegendRow}>
                  <View style={styles.ParkingScreenLegendItem}>
                    <View
                      style={[
                        styles.ParkingScreenLegendSwatch,
                        styles.ParkingScreenLegendSwatchAvailable,
                      ]}
                    />
                    <Text style={styles.ParkingScreenLegendLabel}>
                      Available
                    </Text>
                  </View>
                  <View style={styles.ParkingScreenLegendItem}>
                    <View
                      style={[
                        styles.ParkingScreenLegendSwatch,
                        styles.ParkingScreenLegendSwatchOccupied,
                      ]}
                    />
                    <Text style={styles.ParkingScreenLegendLabel}>
                      Occupied
                    </Text>
                  </View>
                  <View style={styles.ParkingScreenLegendItem}>
                    <View
                      style={[
                        styles.ParkingScreenLegendSwatch,
                        styles.ParkingScreenLegendSwatchSelected,
                      ]}
                    />
                    <Text style={styles.ParkingScreenLegendLabel}>
                      Selected
                    </Text>
                  </View>
                </View>
              </View>

              {selectedSpot && (
                <View style={styles.ParkingScreenSelectionSection}>
                  <View style={styles.ParkingScreenSelectionBar}>
                    <Text style={styles.ParkingScreenSelectionText}>
                      Selected: Spot {selectedSpot.label} on Floor{' '}
                      {selectedFloor}
                    </Text>
                  </View>

                  {showReserveForm ? (
                    <View style={styles.ParkingScreenFormGroup}>
                      <View style={styles.ParkingScreenFieldGroup}>
                        <Text style={styles.ParkingScreenFieldLabel}>
                          START DATE & TIME
                        </Text>
                        <TextInput
                          style={styles.ParkingScreenInput}
                          placeholder="DD.MM.YYYY   HH:MM"
                          placeholderTextColor="rgba(240,244,255,0.5)"
                          value={startText}
                          onChangeText={setStartText}
                        />
                      </View>
                      <View style={styles.ParkingScreenFieldGroup}>
                        <Text style={styles.ParkingScreenFieldLabel}>
                          END DATE & TIME
                        </Text>
                        <TextInput
                          style={styles.ParkingScreenInput}
                          placeholder="DD.MM.YYYY   HH:MM"
                          placeholderTextColor="rgba(240,244,255,0.5)"
                          value={endText}
                          onChangeText={setEndText}
                        />
                      </View>

                      <Pressable onPress={handleConfirm} disabled={!canConfirm}>
                        {canConfirm ? (
                          <LinearGradient
                            colors={[Colors.accent, Colors.accentDark]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[styles.ParkingScreenSubmit, Shadows.button]}
                          >
                            <Text style={styles.ParkingScreenSubmitLabel}>
                              Confirm Reservation
                            </Text>
                          </LinearGradient>
                        ) : (
                          <View
                            style={[
                              styles.ParkingScreenSubmit,
                              styles.ParkingScreenSubmitDisabled,
                            ]}
                          >
                            <Text style={styles.ParkingScreenSubmitLabel}>
                              Confirm Reservation
                            </Text>
                          </View>
                        )}
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable onPress={() => setShowReserveForm(true)}>
                      <LinearGradient
                        colors={[Colors.accent, Colors.accentDark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[styles.ParkingScreenSubmit, Shadows.button]}
                      >
                        <Text style={styles.ParkingScreenSubmitLabel}>
                          Reserve This Spot
                        </Text>
                      </LinearGradient>
                    </Pressable>
                  )}
                </View>
              )}
            </>
          ) : (
            <View style={styles.ParkingScreenList}>
              {reservations.map((reservation, index) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  index={index}
                  onEdit={() => handleEdit(reservation)}
                  onCancel={() => cancelReservation(reservation.id)}
                />
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ParkingScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  ParkingScreenScroll: {
    flex: 1,
  },
  ParkingScreenContent: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  ParkingScreenHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  ParkingScreenTitle: {
    ...Typography.title,
    fontSize: 22,
    color: Colors.textPrimary,
  },
  ParkingScreenViewToggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    overflow: 'hidden',
  },

  ParkingScreenViewToggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  ParkingScreenViewToggleButtonActive: {
    backgroundColor: Colors.accent,
  },
  ParkingScreenViewToggleLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  ParkingScreenViewToggleLabelActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  ParkingScreenFloorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Spacing.md,
  },

  ParkingScreenFloorButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  ParkingScreenFloorButtonActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },

  ParkingScreenFloorLabel: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  ParkingScreenFloorLabelActive: {
    color: Colors.white,
    fontWeight: '600',
  },

  ParkingScreenStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Spacing.md,
  },
  ParkingScreenStatCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
  },

  ParkingScreenStatCardAvailable: {
    backgroundColor: 'rgba(16,185,129,0.1)',
    borderColor: 'rgba(16,185,129,0.22)',
  },

  ParkingScreenStatCardOccupied: {
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderColor: 'rgba(239,68,68,0.18)',
  },
  ParkingScreenStatValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  ParkingScreenStatLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },

  ParkingScreenGridCard: {
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: 18,
    padding: 14,
  },
  ParkingScreenGridLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },

  ParkingScreenLegendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: Spacing.md,
  },
  ParkingScreenLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  ParkingScreenLegendSwatch: {
    width: 10,
    height: 10,
    borderRadius: 2.5,
    borderWidth: 1,
  },
  ParkingScreenLegendSwatchAvailable: {
    backgroundColor: 'rgba(16,185,129,0.16)',
    borderColor: 'rgba(16,185,129,0.38)',
  },

  ParkingScreenLegendSwatchOccupied: {
    backgroundColor: 'rgba(239,68,68,0.16)',
    borderColor: 'rgba(239,68,68,0.38)',
  },

  ParkingScreenLegendSwatchSelected: {
    backgroundColor: 'rgba(43,111,237,0.16)',
    borderColor: 'rgba(43,111,237,0.38)',
  },
  ParkingScreenLegendLabel: {
    fontSize: 10,
    color: Colors.textDim,
  },
  ParkingScreenSelectionSection: {
    marginTop: Spacing.md,
  },
  ParkingScreenSelectionBar: {
    backgroundColor: Colors.historyButtonBg,
    borderWidth: 1,
    borderColor: 'rgba(96,165,250,0.25)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  ParkingScreenSelectionText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.accentLight,
  },
  ParkingScreenFormGroup: {
    marginTop: Spacing.md,
  },
  ParkingScreenFieldGroup: {
    marginBottom: Spacing.md,
  },
  ParkingScreenFieldLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  ParkingScreenInput: {
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderInput,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 46,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  ParkingScreenSubmit: {
    height: 51,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  ParkingScreenSubmitDisabled: {
    backgroundColor: Colors.dotInactive,
    opacity: 0.45,
  },
  ParkingScreenSubmitLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },

  ParkingScreenList: {
    marginTop: Spacing.sm,
  },
});

export default ParkingScreen;
