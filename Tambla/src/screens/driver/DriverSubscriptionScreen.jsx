/**
 * DriverSubscriptionScreen — Weekly Platform Subscription
 *
 * Driver subscription plan status, 0% commission benefits, expiry timer,
 * and direct renewal via MTN MoMo / Airtel / Wallet.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const DriverSubscriptionScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState('weekly');

  const handleRenew = () => {
    Alert.alert(
      'Renew Subscription',
      'Confirm renewal of Tambla Weekly Driver Pass for UGX 20,000 using your Tambla Wallet / MTN MoMo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Payment',
          onPress: () => {
            Alert.alert('Success', 'Your driver subscription has been extended by 7 days!');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Driver Subscription" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Active Status Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.heroSub}>CURRENT STATUS</Text>
              <Text style={styles.heroTitle}>Weekly Pass Active</Text>
            </View>
            <View style={styles.activePill}>
              <View style={styles.activeDot} />
              <Text style={styles.activePillText}>Active</Text>
            </View>
          </View>
          <Text style={styles.expiryText}>Expires in 4 days (Sunday, 11:59 PM)</Text>
          <View style={styles.commissionTag}>
            <Icon name="sparkles" size={16} color={colors.primary} />
            <Text style={styles.commissionText}>0% Commission • Keep 100% of your fares</Text>
          </View>
        </View>

        {/* Benefits List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>SUBSCRIPTION PERKS</Text>

          <View style={styles.benefitRow}>
            <View style={styles.checkBg}>
              <Icon name="checkmark" size={16} color={colors.success} />
            </View>
            <View style={styles.benefitTextCol}>
              <Text style={styles.benefitTitle}>Zero Commission</Text>
              <Text style={styles.benefitDesc}>You keep 100% of passenger cash and mobile money.</Text>
            </View>
          </View>

          <View style={styles.benefitRow}>
            <View style={styles.checkBg}>
              <Icon name="checkmark" size={16} color={colors.success} />
            </View>
            <View style={styles.benefitTextCol}>
              <Text style={styles.benefitTitle}>Priority Dispatch</Text>
              <Text style={styles.benefitDesc}>First priority on airport and high-fare trips.</Text>
            </View>
          </View>

          <View style={styles.benefitRow}>
            <View style={styles.checkBg}>
              <Icon name="checkmark" size={16} color={colors.success} />
            </View>
            <View style={styles.benefitTextCol}>
              <Text style={styles.benefitTitle}>24/7 Roadside Assistance</Text>
              <Text style={styles.benefitDesc}>Emergency towing and medical dispatch included.</Text>
            </View>
          </View>
        </View>

        {/* Plan Choices */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RENEWAL PLANS</Text>
        </View>

        <TouchableOpacity
          style={[styles.planCard, selectedPlan === 'weekly' && styles.planCardSelected]}
          activeOpacity={0.8}
          onPress={() => setSelectedPlan('weekly')}
        >
          <View style={styles.planRadio}>
            {selectedPlan === 'weekly' && <View style={styles.radioInner} />}
          </View>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>Weekly Pass (7 Days)</Text>
            <Text style={styles.planDesc}>Most popular choice for full-time drivers</Text>
          </View>
          <Text style={styles.planPrice}>UGX 20,000</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.planCard, selectedPlan === 'monthly' && styles.planCardSelected]}
          activeOpacity={0.8}
          onPress={() => setSelectedPlan('monthly')}
        >
          <View style={styles.planRadio}>
            {selectedPlan === 'monthly' && <View style={styles.radioInner} />}
          </View>
          <View style={styles.planInfo}>
            <Text style={styles.planName}>Monthly Pass (30 Days)</Text>
            <Text style={styles.planDesc}>Save UGX 10,000 over weekly renewal</Text>
          </View>
          <Text style={styles.planPrice}>UGX 70,000</Text>
        </TouchableOpacity>

        <View style={styles.ctaWrapper}>
          <TamblaButton
            title="Renew Subscription Now"
            variant="primary"
            onPress={handleRenew}
          />
        </View>
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
  heroCard: {
    backgroundColor: colors.dark,
    borderRadius: radius.lg,
    padding: 20,
    marginBottom: 16,
    ...shadows.md,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  heroSub: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textOnDarkSecondary,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    marginTop: 2,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  activePillText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: '700',
  },
  expiryText: {
    ...typography.bodySecondary,
    color: colors.textOnDarkSecondary,
    marginBottom: 16,
  },
  commissionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.darkCard,
    padding: 10,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.darkBorder,
  },
  commissionText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
    ...shadows.xs,
  },
  cardTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkBg: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  benefitTextCol: {
    flex: 1,
  },
  benefitTitle: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  benefitDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textTertiary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  planCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFFDF5',
  },
  planRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.borderDarker,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  planDesc: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  planPrice: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  ctaWrapper: {
    marginTop: 12,
  },
});

export default DriverSubscriptionScreen;
