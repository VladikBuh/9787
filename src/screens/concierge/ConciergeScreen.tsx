import React, { useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, Layout, Radius, Spacing, Typography } from '../../theme';
import { conciergeFaqs } from '../../data/conciergeFaq';
import { ConciergeFaq } from '../../types';

import { useFadeSlideIn } from '../../hooks/useFadeSlideIn';
import { GuestCodeBar } from '../../components/common/GuestCodeBar';
import { FaqRow } from '../../components/concierge/FaqRow';

const ConciergeScreen: React.FC = () => {
  const [history, setHistory] = useState<ConciergeFaq[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const lastFaq = history[history.length - 1] ?? null;
  const entrance = useFadeSlideIn();

  const handleAsk = (faq: ConciergeFaq) => {
    setHistory(prev => [...prev, faq]);
    setShowPicker(false);
  };

  const handleClear = () => {
    setHistory([]);
    setShowPicker(false);
  };

  const handleShare = () => {
    if (!lastFaq) return;
    Share.share({ message: `${lastFaq.question}\n\n${lastFaq.answer}` });
  };

  return (
    <View style={styles.ConciergeScreenRoot}>
      <ScrollView
        style={styles.ConciergeScreenScroll}
        showsVerticalScrollIndicator={false}
      >
        <GuestCodeBar />
        <Animated.View style={[styles.ConciergeScreenContent, entrance]}>
          <View style={styles.ConciergeScreenHeaderRow}>
            <Text style={styles.ConciergeScreenTitle}>Concierge</Text>
            {history.length > 0 && (
              <Pressable
                style={styles.ConciergeScreenClearButton}
                onPress={handleClear}
              >
                <Text style={styles.ConciergeScreenClearIcon}>🗑</Text>
                <Text style={styles.ConciergeScreenClearLabel}>Clear</Text>
              </Pressable>
            )}
          </View>
          <Text style={styles.ConciergeScreenSubtitle}>
            Instant answers · 24 hours a day
          </Text>

          {history.length === 0 && (
            <>
              <Text style={styles.ConciergeScreenPrompt}>
                Select a question to receive an instant answer:
              </Text>
              {conciergeFaqs.map((faq, index) => (
                <FaqRow
                  key={faq.id}
                  question={faq.question}
                  index={index}
                  onPress={() => handleAsk(faq)}
                />
              ))}
            </>
          )}

          {history.length > 0 && (
            <View style={styles.ConciergeScreenChat}>
              {history.map((faq, index) => (
                <View key={`${faq.id}-${index}`}>
                  <View style={styles.ConciergeScreenQuestionBubble}>
                    <Text style={styles.ConciergeScreenQuestionText}>
                      {faq.question}
                    </Text>
                  </View>

                  <View style={styles.ConciergeScreenAnswerRow}>
                    <View style={styles.ConciergeScreenAvatar}>
                      <Text style={styles.ConciergeScreenAvatarIcon}>H</Text>
                    </View>
                    <View style={styles.ConciergeScreenAnswerBubble}>
                      <Text style={styles.ConciergeScreenAnswerText}>
                        {faq.answer}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

              {showPicker ? (
                <>
                  <Text style={styles.ConciergeScreenPrompt}>
                    Select a question to receive an instant answer:
                  </Text>
                  {conciergeFaqs.map((faq, index) => (
                    <FaqRow
                      key={faq.id}
                      question={faq.question}
                      index={index}
                      onPress={() => handleAsk(faq)}
                    />
                  ))}
                </>
              ) : (
                <>
                  <Pressable
                    style={styles.ConciergeScreenActionButton}
                    onPress={handleShare}
                  >
                    <Text style={styles.ConciergeScreenActionIcon}>🔗</Text>
                    <Text style={styles.ConciergeScreenActionLabel}>
                      Share Answer
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.ConciergeScreenActionButton}
                    onPress={() => setShowPicker(true)}
                  >
                    <Text style={styles.ConciergeScreenActionIcon}>💬</Text>
                    <Text style={styles.ConciergeScreenActionLabel}>
                      Ask Another Question
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ConciergeScreenRoot: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  ConciergeScreenScroll: {
    flex: 1,
  },
  ConciergeScreenContent: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  ConciergeScreenHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ConciergeScreenTitle: {
    ...Typography.title,
    fontSize: 22,
    color: Colors.textPrimary,
  },

  ConciergeScreenClearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.offBg,
    borderWidth: 1,
    borderColor: Colors.offBorder,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ConciergeScreenClearIcon: {
    fontSize: 12,
  },
  ConciergeScreenClearLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.offAccent,
  },

  ConciergeScreenSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  ConciergeScreenPrompt: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: Spacing.md,
  },
  ConciergeScreenChat: {
    marginTop: Spacing.xs,
  },

  ConciergeScreenQuestionBubble: {
    alignSelf: 'flex-end',
    maxWidth: '85%',
    backgroundColor: Colors.accent,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: Spacing.md,
  },

  ConciergeScreenQuestionText: {
    fontSize: 14,
    color: Colors.white,
  },
  ConciergeScreenAnswerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: Spacing.lg,
  },

  ConciergeScreenAvatar: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ConciergeScreenAvatarIcon: {
    ...Typography.badgeGlyph,
    color: Colors.white,
  },
  ConciergeScreenAnswerBubble: {
    flex: 1,
    backgroundColor: Colors.cardSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  ConciergeScreenAnswerText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textPrimary,
  },

  ConciergeScreenActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.historyButtonBg,
    borderWidth: 1,
    borderColor: Colors.historyButtonBorder,
    borderRadius: Radius.full,
    paddingVertical: 13,
    marginBottom: 12,
  },

  ConciergeScreenActionIcon: {
    fontSize: 15,
  },
  ConciergeScreenActionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.accentLight,
  },
});

export default ConciergeScreen;
