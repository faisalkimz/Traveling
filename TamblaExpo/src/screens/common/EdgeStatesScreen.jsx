/**
 * EdgeStatesScreen — System & Error State Visualizer
 *
 * Implements Sections 80-91 of specification:
 * - No drivers available
 * - Weak GPS
 * - Payment failed
 * - Outside service area
 * - Mobile money pending & success
 * - Server error & offline
 */
import React, { useState } from 'react';
import {
  View,
  Text,
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

const EDGE_STATES = {
  noDrivers: {
    icon: 'car-outline',
    title: 'No Drivers Available Nearby',
    subtitle: 'All Tambla drivers in your area are currently occupied. Please try again in 2–3 minutes or select Tambla Moto.',
    buttonText: 'Try Again',
    badge: 'High Demand',
    badgeColor: '#FEF3C7',
    badgeTextColor: '#92400E',
  },
  weakGps: {
    icon: 'locate-outline',
    title: 'Searching for Strong GPS Signal',
    subtitle: 'We are having trouble detecting your precise location. Please move near a window or outdoors.',
    buttonText: 'Set Pickup Manually',
    badge: 'Weak Signal',
    badgeColor: '#FEE2E2',
    badgeTextColor: colors.danger,
  },
  paymentFailed: {
    icon: 'alert-circle-outline',
    title: 'Mobile Money Payment Failed',
    subtitle: 'The MTN MoMo payment timed out or was rejected on the network. Your account was not debited.',
    buttonText: 'Retry with Cash or Airtel',
    badge: 'Transaction Error',
    badgeColor: '#FEE2E2',
    badgeTextColor: colors.danger,
  },
  outsideArea: {
    icon: 'map-outline',
    title: 'Outside Active Service Area',
    subtitle: 'Tambla currently operates in Kampala, Entebbe, Wakiso, and Mukono. We are expanding to other cities soon!',
    buttonText: 'Change Destination',
    badge: 'Limited Zone',
    badgeColor: '#E0E7FF',
    badgeTextColor: '#3730A3',
  },
  momoPending: {
    icon: 'time-outline',
    title: 'Waiting for Phone Approval (*165#)',
    subtitle: 'Please check your phone for the mobile money prompt and enter your PIN to approve UGX 14,000.',
    buttonText: 'I Have Approved',
    badge: 'Pending PIN',
    badgeColor: '#FEF3C7',
    badgeTextColor: '#92400E',
  },
  momoSuccess: {
    icon: 'checkmark-circle-outline',
    title: 'Mobile Money Payment Confirmed!',
    subtitle: 'Received UGX 44,000 via MTN MoMo. Receipt has been added to your transaction history.',
    buttonText: 'View Receipt',
    badge: 'Success',
    badgeColor: '#DCFCE7',
    badgeTextColor: colors.success,
  },
};

const EdgeStatesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeStateKey, setActiveStateKey] = useState('noDrivers');
  const activeState = EDGE_STATES[activeStateKey];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="System & Edge States" onBack={() => navigation.goBack()} />

      {/* State Switcher Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {Object.keys(EDGE_STATES).map((key) => {
          const isSelected = activeStateKey === key;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.stateTab, isSelected && styles.stateTabSelected]}
              onPress={() => setActiveStateKey(key)}
            >
              <Text style={[styles.stateTabText, isSelected && styles.stateTabTextSelected]}>
                {EDGE_STATES[key].badge}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Main Edge State Display */}
      <View style={[styles.content, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.stateCard}>
          <View style={styles.iconCircle}>
            <Icon name={activeState.icon} size={48} color={colors.dark} />
          </View>

          <View style={[styles.badge, { backgroundColor: activeState.badgeColor }]}>
            <Text style={[styles.badgeText, { color: activeState.badgeTextColor }]}>
              {activeState.badge}
            </Text>
          </View>

          <Text style={styles.stateTitle}>{activeState.title}</Text>
          <Text style={styles.stateSubtitle}>{activeState.subtitle}</Text>

          <View style={styles.ctaWrapper}>
            <TamblaButton
              title={activeState.buttonText}
              variant="primary"
              onPress={() => navigation.navigate('Home', { screen: 'PassengerHome' })}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabsContainer: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  stateTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSecondary,
  },
  stateTabSelected: {
    backgroundColor: colors.dark,
  },
  stateTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  stateTabTextSelected: {
    color: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenHorizontal,
    justifyContent: 'center',
  },
  stateCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  stateTitle: {
    ...typography.heading,
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  stateSubtitle: {
    ...typography.bodySecondary,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  ctaWrapper: {
    width: '100%',
  },
});

export default EdgeStatesScreen;
