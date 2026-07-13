import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { RequestStatus } from '../../types';

const STATUS_STYLES: Record<RequestStatus, { color: string; bg: string }> = {
  Submitted: { color: Colors.statusSubmitted, bg: Colors.statusSubmittedBg },
  'In Progress': {
    color: Colors.statusInProgress,
    bg: Colors.statusInProgressBg,
  },
  Accepted: { color: Colors.statusAccepted, bg: Colors.statusAcceptedBg },
  Completed: { color: Colors.statusCompleted, bg: Colors.statusCompletedBg },
};

interface Props {
  status: RequestStatus;
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const style = STATUS_STYLES[status];
  return (
    <View
      style={[styles.StatusBadgePill, { backgroundColor: style.bg }]}
    >
      <Text style={[styles.StatusBadgeLabel, { color: style.color }]}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  StatusBadgePill: {
    borderRadius: Radius.full,
    paddingHorizontal: 9,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  StatusBadgeLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
