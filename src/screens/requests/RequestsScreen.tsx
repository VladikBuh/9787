import React from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';

import { RootStackParamList } from '../../types';
import { requestCategories } from '../../data/requestCategories';
import { useRequests } from '../../hooks/useRequests';
import { useFadeSlideIn } from '../../hooks/useFadeSlideIn';

import { GuestCodeBar } from '../../components/common/GuestCodeBar';
import { CategoryRow } from '../../components/requests/CategoryRow';

import { RequestCard } from '../../components/requests/RequestCard';

const RequestsScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { activeRequests } = useRequests();
  const entrance = useFadeSlideIn();

  return (
    <View style={styles.RequestsScreenRoot}>
      <ScrollView
        style={styles.RequestsScreenScroll}
        showsVerticalScrollIndicator={false}
      >
        <GuestCodeBar />
        <Animated.View style={[styles.RequestsScreenContent, entrance]}>
          <View style={styles.RequestsScreenHeaderRow}>
            <Text style={styles.RequestsScreenTitle}>Guest Requests</Text>
            <Pressable
              style={styles.RequestsScreenHistoryButton}
              onPress={() => navigation.navigate('RequestsHistory')}
            >
              <Text style={styles.RequestsScreenHistoryLabel}>History</Text>
            </Pressable>
          </View>

          <Text style={styles.RequestsScreenSubtitle}>
            How can we help you today?
          </Text>

          {requestCategories.map((category, index) => (
            <CategoryRow
              key={category.id}
              category={category}
              index={index}
              onPress={() =>
                navigation.navigate('RequestForm', { categoryId: category.id })
              }
            />
          ))}

          {activeRequests.length > 0 && (
            <View style={styles.RequestsScreenActiveSection}>
              <Text style={styles.RequestsScreenSectionLabel}>
                ACTIVE REQUESTS
              </Text>
              {activeRequests.map((request, index) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  variant="active"
                  index={index}
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
  RequestsScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  RequestsScreenScroll: {
    flex: 1,
  },

  RequestsScreenContent: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },

  RequestsScreenHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  RequestsScreenTitle: {
    ...Typography.title,
    fontSize: 22,
    color: Colors.textPrimary,
  },
  RequestsScreenHistoryButton: {
    backgroundColor: Colors.historyButtonBg,
    borderWidth: 1,
    borderColor: Colors.historyButtonBorder,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  RequestsScreenHistoryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.accentLight,
  },

  RequestsScreenSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },

  RequestsScreenActiveSection: {
    marginTop: Spacing.sm,
  },

  RequestsScreenSectionLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
});

export default RequestsScreen;
