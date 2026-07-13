import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, Radius, Shadows } from '../../theme';

import { getImage } from '../../assets/images';

interface Props {
  visible: boolean;
  code: string;
  onClose: () => void;
}

export const GuestCodeModal: React.FC<Props> = ({ visible, code, onClose }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.GuestCodeModalOverlay}>
      <ScrollView contentContainerStyle={styles.GuestCodeModalScrollContent}>
        <Pressable style={styles.GuestCodeModalClose} onPress={onClose}>
          <Text style={styles.GuestCodeModalCloseIcon}>✕</Text>
        </Pressable>

        <View style={styles.GuestCodeModalIconBox}>
          <Image
            source={getImage('LoaderIcon')}
            style={styles.GuestCodeModalIconImage}
          />
        </View>

        <Text style={styles.GuestCodeModalEyebrow}>YOUR GUEST CODE</Text>
        <Text style={styles.GuestCodeModalCode}>{code}</Text>

        <View style={styles.GuestCodeModalInfoBox}>
          <Text style={styles.GuestCodeModalInfoText}>
            Show this code to hotel staff or scan at any self-service terminal
            in the lobby.
          </Text>
        </View>

        <View style={styles.GuestCodeModalRefreshRow}>
          <View style={styles.GuestCodeModalRefreshDot} />
          <Text style={styles.GuestCodeModalRefreshLabel}>
            REFRESHES EVERY 30 SECONDS
          </Text>
        </View>
      </ScrollView>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  GuestCodeModalOverlay: {
    flex: 1,
    backgroundColor: Colors.modalOverlayBg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  GuestCodeModalScrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  GuestCodeModalClose: {
    position: 'absolute',
    top: 60,
    right: 24,
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.cardSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  GuestCodeModalCloseIcon: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  GuestCodeModalIconBox: {
    width: 125,
    height: 125,
    borderRadius: Radius.md,
    backgroundColor: Colors.black,
    overflow: 'hidden',
    marginBottom: 32,
    ...Shadows.glowBlue,
    shadowColor: Colors.modalGlow,
  },
  GuestCodeModalIconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  GuestCodeModalEyebrow: {
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  GuestCodeModalCode: {
    fontSize: 34,
    fontWeight: '600',
    letterSpacing: 5,
    color: Colors.textPrimary,
  },
  GuestCodeModalInfoBox: {
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.modalInfoBoxBorder,
    borderRadius: Radius.md,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: 40,
  },
  GuestCodeModalInfoText: {
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    color: Colors.textMuted,
  },
  GuestCodeModalRefreshRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  GuestCodeModalRefreshDot: {
    width: 7,
    height: 7,
    borderRadius: Radius.full,
    backgroundColor: Colors.onlineDot,
    marginRight: 8,
    ...Shadows.onlineDot,
  },
  GuestCodeModalRefreshLabel: {
    fontSize: 11,
    letterSpacing: 0.5,
    color: Colors.onlineDot,
  },
});
