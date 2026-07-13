import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Layout, Radius, Shadows, Spacing } from '../../theme';

import { RootStackParamList } from '../../types';
import { getCategory } from '../../data/requestCategories';
import { useRequests } from '../../hooks/useRequests';

import { GuestCodeBar } from '../../components/common/GuestCodeBar';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestForm'>;

const RequestFormScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<Props['route']>();
  const category = getCategory(route.params.categoryId);
  const { addRequest } = useRequests();

  const [description, setDescription] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const canSubmit =
    description.trim().length > 0 && roomNumber.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }
    addRequest(category.id, description.trim(), roomNumber.trim());
    navigation.goBack();
  };

  return (
    <View style={styles.RequestFormScreenRoot}>
      <ScrollView
        style={styles.RequestFormScreenScroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <GuestCodeBar />
        <View style={styles.RequestFormScreenHeader}>
          <Pressable
            style={styles.RequestFormScreenBack}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.RequestFormScreenBackIcon}>‹</Text>
            <Text style={styles.RequestFormScreenBackLabel}>Back</Text>
          </Pressable>
          <Text
            style={styles.RequestFormScreenTitle}
            numberOfLines={1}
            pointerEvents="none"
          >
            {category.label}
          </Text>
        </View>

        <View style={styles.RequestFormScreenBody}>
          <View style={styles.RequestFormScreenCard}>
            <View style={styles.RequestFormScreenCategoryRow}>
              <View
                style={[
                  styles.RequestFormScreenCategoryIconTile,
                  { backgroundColor: category.tint },
                ]}
              >
                <Text style={styles.RequestFormScreenCategoryIcon}>
                  {category.icon}
                </Text>
              </View>
              <Text
                style={styles.RequestFormScreenCategoryLabel}
                numberOfLines={1}
              >
                {category.label}
              </Text>
            </View>

            <TextInput
              style={styles.RequestFormScreenTextArea}
              placeholder="Describe your request in detail..."
              placeholderTextColor="rgba(240,244,255,0.5)"
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.RequestFormScreenFieldGroup}>
            <Text style={styles.RequestFormScreenFieldLabel}>ROOM NUMBER</Text>
            <TextInput
              style={styles.RequestFormScreenInput}
              placeholder="e.g. 412"
              placeholderTextColor="rgba(240,244,255,0.5)"
              keyboardType="number-pad"
              value={roomNumber}
              onChangeText={setRoomNumber}
            />
          </View>

          <Pressable onPress={handleSubmit} disabled={!canSubmit}>
            {canSubmit ? (
              <LinearGradient
                colors={[Colors.accent, Colors.accentDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.RequestFormScreenSubmit, Shadows.button]}
              >
                <Text style={styles.RequestFormScreenSubmitLabel}>
                  Submit Request
                </Text>
              </LinearGradient>
            ) : (
              <View
                style={[
                  styles.RequestFormScreenSubmit,
                  styles.RequestFormScreenSubmitDisabled,
                ]}
              >
                <Text style={styles.RequestFormScreenSubmitLabel}>
                  Submit Request
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  RequestFormScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  RequestFormScreenScroll: {
    flex: 1,
  },

  RequestFormScreenHeader: {
    height: 41,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.screenPaddingH,
  },

  RequestFormScreenBack: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: Layout.screenPaddingH,
    zIndex: 1,
  },
  RequestFormScreenBackIcon: {
    fontSize: 22,
    color: Colors.accentLight,
    marginRight: 2,
    marginTop: -2,
  },
  RequestFormScreenBackLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.accentLight,
  },
  RequestFormScreenTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  RequestFormScreenBody: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: Spacing.md,
  },

  RequestFormScreenCard: {
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.lg,
    padding: 16,
  },

  RequestFormScreenCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  RequestFormScreenCategoryIconTile: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RequestFormScreenCategoryIcon: {
    fontSize: 20,
  },
  RequestFormScreenCategoryLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  RequestFormScreenTextArea: {
    backgroundColor: Colors.surfaceInput,
    borderWidth: 1,
    borderColor: Colors.borderInput,
    borderRadius: Radius.md,
    padding: 12,
    minHeight: 113,
    fontSize: 14,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
  },

  RequestFormScreenFieldGroup: {
    marginTop: Spacing.lg,
  },

  RequestFormScreenFieldLabel: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  RequestFormScreenInput: {
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderInput,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    height: 51,
    fontSize: 15,
    color: Colors.textPrimary,
  },

  RequestFormScreenSubmit: {
    height: 51,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },

  RequestFormScreenSubmitDisabled: {
    backgroundColor: Colors.dotInactive,
    opacity: 0.45,
  },

  RequestFormScreenSubmitLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default RequestFormScreen;
