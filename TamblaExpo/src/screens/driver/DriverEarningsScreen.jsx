/**
 * DriverEarningsScreen — Golden Reference #7
 *
 * White bg, "This week" earnings, subscription card, recent trips list.
 */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import StatusBadge from '../../components/common/StatusBadge';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import mockPayments from '../../data/mockPayments';
import mockTrips from '../../data/mockTrips';
import { formatUGX } from '../../utils/helpers';

const earnings = mockPayments.driverEarnings;

const DriverEarningsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Earnings" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* This week summary */}
        <View style={styles.weekSummary}>
          <Text style={styles.weekLabel}>This week</Text>
          <Text style={styles.weekAmount}>{formatUGX(earnings.thisWeek.amount)}</Text>
          <View style={styles.weekMeta}>
            <Text style={styles.weekTrips}>{earnings.thisWeek.trips} trips</Text>
            <TouchableOpacity onPress={() => navigation.navigate('WithdrawFunds')}>
              <Text style={styles.viewDetails}>Cash Out / Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subscription card */}
        <TouchableOpacity
          style={styles.subscriptionCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('DriverSubscription')}
        >
          <View style={styles.subIconRow}>
            <Icon name="ribbon-outline" size={20} color={colors.textPrimary} />
            <Text style={styles.subTitle}>Pay a small weekly fee</Text>
          </View>
          <Text style={styles.subDescription}>Keep more of what you earn.</Text>
        </TouchableOpacity>

        {/* Weekly subscription details */}
        <TouchableOpacity
          style={styles.subscriptionDetails}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('DriverSubscription')}
        >
          <Text style={styles.detailLabel}>Weekly subscription</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailAmount}>{formatUGX(earnings.subscription.amount)}</Text>
            <StatusBadge status="active" label="Active" />
          </View>
          <Text style={styles.detailMeta}>
            Next payment: {earnings.subscription.nextPayment}
          </Text>
        </TouchableOpacity>

        {/* Recent trips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent trips</Text>
        </View>

        {mockTrips.driverTrips.map((trip) => (
          <TouchableOpacity key={trip.id} style={styles.tripRow} activeOpacity={0.6}>
            <View style={styles.tripIcon}>
              <Icon name="location-outline" size={18} color={colors.textSecondary} />
            </View>
            <View style={styles.tripInfo}>
              <Text style={styles.tripRoute} numberOfLines={1}>
                {trip.pickup} → {trip.destination}
              </Text>
              <Text style={styles.tripDate}>{trip.date}</Text>
            </View>
            <Text style={styles.tripFare}>{formatUGX(trip.fare)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  // Week summary
  weekSummary: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: 16,
  },
  weekLabel: {
    ...typography.secondary,
    color: colors.textSecondary,
  },
  weekAmount: {
    ...typography.monetary,
    color: colors.textPrimary,
    marginTop: 4,
  },
  weekMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  weekTrips: {
    ...typography.secondary,
    color: colors.textSecondary,
  },
  viewDetails: {
    ...typography.buttonSmall,
    color: colors.primary,
  },

  // Subscription card
  subscriptionCard: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.screenHorizontal,
    borderRadius: radius.card,
    padding: spacing.cardPadding,
    marginTop: 8,
  },
  subIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subTitle: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  subDescription: {
    ...typography.caption,
    color: colors.textPrimary,
    opacity: 0.7,
    marginTop: 4,
  },

  // Subscription details
  subscriptionDetails: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    ...typography.secondary,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailAmount: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  detailMeta: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },

  // Section
  sectionHeader: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.textPrimary,
  },

  // Trip rows
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: spacing.screenHorizontal,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tripIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tripInfo: {
    flex: 1,
    marginRight: 8,
  },
  tripRoute: {
    ...typography.body,
    color: colors.textPrimary,
  },
  tripDate: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
  tripFare: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
});

export default DriverEarningsScreen;
