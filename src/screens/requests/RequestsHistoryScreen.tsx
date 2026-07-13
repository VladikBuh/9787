import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors, Layout, Spacing } from '../../theme';
import { useRequests } from '../../hooks/useRequests';
import { GuestCodeBar } from '../../components/common/GuestCodeBar';

import { RequestCard } from '../../components/requests/RequestCard';

const RequestsHistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const { requests } = useRequests();

  return (
    <View style={styles.RequestsHistoryScreenRoot}>
      <ScrollView
        style={styles.RequestsHistoryScreenScroll}
        showsVerticalScrollIndicator={false}
      >
        <GuestCodeBar />
        <View style={styles.RequestsHistoryScreenHeader}>
          <Pressable
            style={styles.RequestsHistoryScreenBack}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.RequestsHistoryScreenBackIcon}>‹</Text>
            <Text style={styles.RequestsHistoryScreenBackLabel}>Back</Text>
          </Pressable>
          <Text style={styles.RequestsHistoryScreenTitle} pointerEvents="none">
            My Requests
          </Text>
        </View>

        <View style={styles.RequestsHistoryScreenContent}>
          {requests.map(request => (
            <RequestCard key={request.id} request={request} variant="history" />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  RequestsHistoryScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  RequestsHistoryScreenHeader: {
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.screenPaddingH,
  },

  RequestsHistoryScreenBack: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: Layout.screenPaddingH,
  },

  RequestsHistoryScreenBackIcon: {
    fontSize: 22,
    color: Colors.accentLight,
    marginRight: 2,
    marginTop: -2,
  },
  RequestsHistoryScreenBackLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.accentLight,
  },
  RequestsHistoryScreenTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  RequestsHistoryScreenScroll: {
    flex: 1,
  },

  RequestsHistoryScreenContent: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
});

export default RequestsHistoryScreen;
