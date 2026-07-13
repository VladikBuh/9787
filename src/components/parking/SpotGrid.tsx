import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../theme';
import { ParkingSpot } from '../../types';

interface Props {
  spots: ParkingSpot[];
  selectedSpotId: string | null;
  onSelect: (spot: ParkingSpot) => void;
}

export const SpotGrid: React.FC<Props> = ({
  spots,
  selectedSpotId,
  onSelect,
}) => (
  <View style={styles.SpotGridWrap}>
    {spots.map(spot => {
      const selected = spot.id === selectedSpotId;
      const occupied = spot.status === 'Occupied';
      return (
        <Pressable
          key={spot.id}
          disabled={occupied}
          onPress={() => onSelect(spot)}
          style={[
            styles.SpotGridCell,
            occupied && styles.SpotGridCellOccupied,
            !occupied && !selected && styles.SpotGridCellAvailable,
            selected && styles.SpotGridCellSelected,
          ]}
        >
          <Text
            style={[
              styles.SpotGridLabel,
              occupied && styles.SpotGridLabelOccupied,
              !occupied && !selected && styles.SpotGridLabelAvailable,
              selected && styles.SpotGridLabelSelected,
            ]}
          >
            {spot.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  SpotGridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SpotGridCell: {
    flexBasis: '18.4%',
    aspectRatio: 1,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SpotGridCellAvailable: {
    backgroundColor: 'rgba(16,185,129,0.1)',
    borderColor: 'rgba(16,185,129,0.28)',
  },
  SpotGridCellOccupied: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderColor: 'rgba(239,68,68,0.25)',
  },
  SpotGridCellSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  SpotGridLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  SpotGridLabelAvailable: {
    color: Colors.statusCompleted,
  },
  SpotGridLabelOccupied: {
    color: Colors.offAccent,
  },
  SpotGridLabelSelected: {
    color: Colors.white,
  },
});
