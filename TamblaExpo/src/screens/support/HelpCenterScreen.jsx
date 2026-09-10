/**
 * HelpCenterScreen — Customer Support & FAQ Hub
 *
 * Searchable help topics, categories (Trips, Mobile Money, Safety),
 * and direct ticket/chat access.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const HELP_CATEGORIES = [
  { id: 'trips', title: 'Trips & Fares', icon: 'car-outline', count: '12 articles' },
  { id: 'momo', title: 'Mobile Money & Wallet', icon: 'cash-outline', count: '8 articles' },
  { id: 'safety', title: 'Safety & Security', icon: 'shield-checkmark-outline', count: '6 articles' },
  { id: 'account', title: 'Account & Settings', icon: 'person-outline', count: '5 articles' },
  { id: 'lost', title: 'Lost & Found Items', icon: 'search-outline', count: '4 articles' },
  { id: 'driver', title: 'Driver Feedback', icon: 'star-outline', count: '7 articles' },
];

const FAQS = [
  { q: 'How does Mobile Money payment work?', a: 'When you select MTN MoMo or Airtel Money, a prompt appears on your phone to approve the fare with your network PIN.' },
  { q: 'Can I cancel a ride after requesting?', a: 'Yes. Free cancellation applies within the first 2 minutes of driver assignment.' },
  { q: 'What should I do if I forgot an item?', a: 'Use the "Lost & Found" tool in the app to call your driver or notify Tambula support immediately.' },
];

const HelpCenterScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Help Centre" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchBar}>
          <Icon name="search" size={18} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search help topics..."
            placeholderTextColor={colors.textTertiary}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Live Support Banner */}
        <View style={styles.supportBanner}>
          <View style={styles.supportIconBg}>
            <Icon name="chatbubbles" size={24} color={colors.dark} />
          </View>
          <View style={styles.supportTextCol}>
            <Text style={styles.supportTitle}>Need human support?</Text>
            <Text style={styles.supportSub}>Our Kampala team is available 24/7 to assist.</Text>
          </View>
          <TouchableOpacity
            style={styles.chatBtn}
            onPress={() => navigation.navigate('SupportChat')}
          >
            <Text style={styles.chatBtnText}>Chat Now</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>BROWSE BY TOPIC</Text>
        </View>
        <View style={styles.grid}>
          {HELP_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.gridCard}
              activeOpacity={0.8}
              onPress={() => {
                if (cat.id === 'lost') {
                  navigation.navigate('LostItem');
                } else {
                  navigation.navigate('SupportChat', { topic: cat.title });
                }
              }}
            >
              <View style={styles.catIconBg}>
                <Icon name={cat.icon} size={22} color={colors.dark} />
              </View>
              <Text style={styles.catTitle}>{cat.title}</Text>
              <Text style={styles.catCount}>{cat.count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Accordion */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</Text>
        </View>
        {FAQS.map((faq, index) => {
          const isExpanded = expandedFaq === index;
          return (
            <TouchableOpacity
              key={index}
              style={styles.faqCard}
              activeOpacity={0.8}
              onPress={() => setExpandedFaq(isExpanded ? null : index)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.q}</Text>
                <Icon
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={colors.textSecondary}
                />
              </View>
              {isExpanded && <Text style={styles.faqAnswer}>{faq.a}</Text>}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    ...typography.bodySecondary,
    color: colors.textPrimary,
  },
  supportBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: radius.md,
    marginBottom: 20,
    ...shadows.sm,
  },
  supportIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  supportTextCol: {
    flex: 1,
  },
  supportTitle: {
    ...typography.bodyBold,
    color: colors.dark,
  },
  supportSub: {
    fontSize: 11,
    color: colors.dark,
    opacity: 0.85,
  },
  chatBtn: {
    backgroundColor: colors.dark,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.xs,
  },
  chatBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textTertiary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  gridCard: {
    width: '48%',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  catIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  catTitle: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  catCount: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  faqCard: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
    paddingRight: 8,
  },
  faqAnswer: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 10,
    lineHeight: 18,
  },
});

export default HelpCenterScreen;
