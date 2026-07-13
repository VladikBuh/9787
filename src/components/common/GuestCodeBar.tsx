import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Layout, Radius, Shadows } from '../../theme';
import { GuestCodeModal } from './GuestCodeModal';

const GUEST_CODE = 'Hippo-1863';

export const GuestCodeBar: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.GuestCodeBarRoot, { paddingTop: insets.top + 8 }]}>
      <View style={styles.GuestCodeBarStatusGroup}>
        <View style={styles.GuestCodeBarDot} />
        <Text style={styles.GuestCodeBarLabel}>GUEST CODE</Text>
      </View>

      <Pressable
        style={styles.GuestCodeBarPill}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.GuestCodeBarPillLabel}>{GUEST_CODE}</Text>
        <Text style={styles.GuestCodeBarPillIcon}>↗</Text>
      </Pressable>

      <GuestCodeModal
        visible={modalVisible}
        code={GUEST_CODE}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  GuestCodeBarRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.screenPaddingH,
    paddingBottom: 8,
    backgroundColor: Colors.guestCodeBarBg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.guestCodeBarBorder,
  },
  GuestCodeBarStatusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  GuestCodeBarDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.full,
    backgroundColor: Colors.onlineDot,
    marginRight: 8,
    ...Shadows.onlineDot,
  },
  GuestCodeBarLabel: {
    fontSize: 10,
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  GuestCodeBarPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.pillBg,
    borderWidth: 1,
    borderColor: Colors.pillBorder,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  GuestCodeBarPillLabel: {
    fontSize: 13,
    letterSpacing: 1.5,
    fontWeight: '500',
    color: Colors.accentLight,
  },
  GuestCodeBarPillIcon: {
    fontSize: 13,
    color: Colors.accentLight,
  },
});
