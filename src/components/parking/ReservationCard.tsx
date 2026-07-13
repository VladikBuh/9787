import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { ParkingReservation } from '../../types';
import { AnimatedPressable } from '../common/AnimatedPressable';
import { useFadeSlideIn } from '../../hooks/useFadeSlideIn';

interface Props {
  reservation: ParkingReservation;
  onEdit: () => void;
  onCancel: () => void;
  index?: number;
}

export const ReservationCard: React.FC<Props> = ({
  reservation,
  onEdit,
  onCancel,
  index = 0,
}) => {
  const active = reservation.status === 'Active';
  const entrance = useFadeSlideIn(index * 60);

  return (
    <Animated.View style={[styles.ReservationCardCard, entrance]}>
      <View style={styles.ReservationCardTopRow}>
        <View>
          <Text style={styles.ReservationCardSpot}>
            Spot {reservation.spotLabel}
          </Text>
          <Text style={styles.ReservationCardFloor}>
            Floor {reservation.floor}
          </Text>
        </View>
        <View
          style={[
            styles.ReservationCardBadge,
            active
              ? styles.ReservationCardBadgeActive
              : styles.ReservationCardBadgeCompleted,
          ]}
        >
          <Text
            style={[
              styles.ReservationCardBadgeLabel,
              active
                ? styles.ReservationCardBadgeLabelActive
                : styles.ReservationCardBadgeLabelCompleted,
            ]}
          >
            {reservation.status}
          </Text>
        </View>
      </View>

      <View style={styles.ReservationCardRow}>
        <Text style={styles.ReservationCardRowKey}>Start</Text>
        <Text style={styles.ReservationCardRowValue}>{reservation.start}</Text>
      </View>
      <View style={styles.ReservationCardRow}>
        <Text style={styles.ReservationCardRowKey}>End</Text>
        <Text style={styles.ReservationCardRowValue}>{reservation.end}</Text>
      </View>

      {active && (
        <View style={styles.ReservationCardActions}>
          <AnimatedPressable
            style={styles.ReservationCardEditButton}
            onPress={onEdit}
          >
            <Text style={styles.ReservationCardEditLabel}>Edit</Text>
          </AnimatedPressable>
          <AnimatedPressable
            style={styles.ReservationCardCancelButton}
            onPress={onCancel}
          >
            <Text style={styles.ReservationCardCancelLabel}>Cancel</Text>
          </AnimatedPressable>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ReservationCardCard: {
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  ReservationCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  ReservationCardSpot: {
    fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 20,
    letterSpacing: 1,
    color: Colors.textPrimary,
  },
  ReservationCardFloor: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  ReservationCardBadge: {
    borderRadius: Radius.full,
    paddingHorizontal: 9,
    paddingVertical: 2,
  },
  ReservationCardBadgeActive: {
    backgroundColor: Colors.statusCompletedBg,
  },
  ReservationCardBadgeCompleted: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  ReservationCardBadgeLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  ReservationCardBadgeLabelActive: {
    color: Colors.statusCompleted,
  },
  ReservationCardBadgeLabelCompleted: {
    color: Colors.textDim,
  },
  ReservationCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ReservationCardRowKey: {
    fontSize: 12,
    color: Colors.textDim,
  },
  ReservationCardRowValue: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  ReservationCardActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  ReservationCardEditButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.historyButtonBg,
    borderWidth: 1,
    borderColor: 'rgba(96,165,250,0.22)',
    paddingHorizontal: 10,
  },
  ReservationCardEditLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.accentLight,
  },
  ReservationCardCancelButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.18)',
    paddingHorizontal: 10,
  },
  ReservationCardCancelLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.offAccent,
  },
});
