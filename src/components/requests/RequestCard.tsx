import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors, Radius } from '../../theme';
import { GuestRequest } from '../../types';
import { getCategory } from '../../data/requestCategories';
import { StatusBadge } from '../common/StatusBadge';
import { useFadeSlideIn } from '../../hooks/useFadeSlideIn';

interface Props {
  request: GuestRequest;
  variant?: 'active' | 'history';
  index?: number;
}

export const RequestCard: React.FC<Props> = ({
  request,
  variant = 'active',
  index = 0,
}) => {
  const category = getCategory(request.categoryId);
  const entrance = useFadeSlideIn(index * 60);

  if (variant === 'history') {
    return (
      <Animated.View style={[styles.RequestCardCard, entrance]}>
        <View
          style={[styles.RequestCardIconTile, { backgroundColor: category.tint }]}
        >
          <Text style={styles.RequestCardIcon}>{category.icon}</Text>
        </View>
        <View style={styles.RequestCardBody}>
          <View style={styles.RequestCardTopRow}>
            <Text
              style={[styles.RequestCardDescription, styles.RequestCardDescriptionInline]}
              numberOfLines={2}
            >
              {request.description}
            </Text>
            <StatusBadge status={request.status} />
          </View>
          <Text style={styles.RequestCardMeta}>
            {request.categoryLabel} · Room {request.roomNumber} ·{' '}
            {request.timeLabel}
          </Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.RequestCardCard, entrance]}>
      <View style={styles.RequestCardBody}>
        <View style={styles.RequestCardTopRow}>
          <Text style={styles.RequestCardCategoryLabel}>
            {request.categoryLabel}
          </Text>
          <StatusBadge status={request.status} />
        </View>
        <Text style={styles.RequestCardDescription} numberOfLines={2}>
          {request.description}
        </Text>
        <Text style={styles.RequestCardMeta}>
          Room {request.roomNumber} · {request.timeLabel}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  RequestCardCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.lg,
    padding: 12,
    marginBottom: 12,
  },
  RequestCardIconTile: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  RequestCardIcon: {
    fontSize: 18,
  },
  RequestCardBody: {
    flex: 1,
  },
  RequestCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  RequestCardCategoryLabel: {
    fontSize: 11,
    color: Colors.textDim,
  },
  RequestCardDescription: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
    marginTop: 5,
  },
  RequestCardDescriptionInline: {
    marginTop: 0,
  },
  RequestCardMeta: {
    fontSize: 11,
    color: Colors.textDim,
    marginTop: 8,
  },
});
