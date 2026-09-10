/**
 * DriverTripsScreen — Tambula Driver Trip History & Performance
 *
 * Full-featured driver trips dashboard:
 * - Weekly shift summary card (total trips, gross earnings, hours online)
 * - Category filter pills (All, Completed, Cancelled)
 * - Detailed trip cards with route pins, fare payout, customer rating,
 *   payment method, and issue reporting. Zero stock imagery.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import mockTrips from '../../data/mockTrips';
import { formatUGX } from '../../utils/helpers';

const DRIVER_TRIP_DETAILS = [
  {
    id: 'dt-1',
    passengerName: 'Grace Auma',
    passengerRating: '5.0',
    pickup: 'Acacia Mall, Kisementi',
    destination: 'Entebbe International Airport',
    date: '10 Sep 2026 • 10:15 AM',
    distance: '42.4 km',
    duration: '54 min',
    grossFare: 48000,
    netPayout: 43200,
    platformFee: 4800,
    paymentMethod: 'MTN Mobile Money',
    status: 'completed',
    type: 'cab',
  },
  {
    id: 'dt-2',
    passengerName: 'Patrick Mukasa',
    passengerRating: '4.9',
    pickup: 'Kampala Serena Hotel',
    destination: 'Kololo Airstrip',
    date: '10 Sep 2026 • 08:30 AM',
    distance: '3.8 km',
    duration: '12 min',
    grossFare: 14000,
    netPayout: 12600,
    platformFee: 1400,
    paymentMethod: 'Cash',
    status: 'completed',
    type: 'cab',
  },
  {
    id: 'dt-3',
    passengerName: 'Brenda Nalubega',
    passengerRating: '5.0',
    pickup: 'Ntinda Complex',
    destination: 'Bugolobi Village Mall',
    date: '09 Sep 2026 • 06:45 PM',
    distance: '5.2 km',
    duration: '18 min',
    grossFare: 18500,
    netPayout: 16650,
    platformFee: 1850,
    paymentMethod: 'Airtel Money',
    status: 'completed',
    type: 'boda',
  },
  {
    id: 'dt-4',
    passengerName: 'David Ssenyonjo',
    passengerRating: '4.8',
    pickup: 'Makerere University Main Gate',
    destination: 'Garden City Mall',
    date: '09 Sep 2026 • 02:10 PM',
    distance: '4.1 km',
    duration: '16 min',
    grossFare: 15000,
    netPayout: 13500,
    platformFee: 1500,
    paymentMethod: 'MTN Mobile Money',
    status: 'completed',
    type: 'cab',
  },
  {
    id: 'dt-5',
    passengerName: 'Rider Cancelled',
    passengerRating: '—',
    pickup: 'Kisementi, Cooper Rd',
    destination: 'Muyenga Hill',
    date: '08 Sep 2026 • 09:20 PM',
    distance: '0 km',
    duration: '0 min',
    grossFare: 4000,
    netPayout: 4000,
    platformFee: 0,
    paymentMethod: 'Cancellation Fee',
    status: 'cancelled',
    type: 'cab',
  },
];

const DriverTripsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTrips = DRIVER_TRIP_DETAILS.filter((trip) => {
    if (activeFilter === 'all') return true;
    return trip.status === activeFilter;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Driver Trip History" />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 16) + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Weekly Performance Summary Banner */}
        <View style={styles.summaryBanner}>
          <View style={styles.summaryTopRow}>
            <View>
              <Text style={styles.summaryLabel}>TOTAL FARES COMPLETED</Text>
              <Text style={styles.summaryAmount}>{formatUGX(384500)}</Text>
            </View>
            <View style={styles.summaryBadge}>
              <Icon name="checkmark-done" size={14} color={colors.dark} />
              <Text style={styles.summaryBadgeText}>24 Trips This Week</Text>
            </View>
          </View>

          <View style={styles.summaryStatsRow}>
            <View style={styles.summaryStatItem}>
              <Text style={styles.statVal}>96%</Text>
              <Text style={styles.statLab}>Completion</Text>
            </View>
            <View style={styles.summaryStatDivider} />
            <View style={styles.summaryStatItem}>
              <Text style={styles.statVal}>18.4h</Text>
              <Text style={styles.statLab}>Drive Time</Text>
            </View>
            <View style={styles.summaryStatDivider} />
            <View style={styles.summaryStatItem}>
              <Text style={styles.statVal}>★ 4.96</Text>
              <Text style={styles.statLab}>Avg Rating</Text>
            </View>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'all' && styles.filterPillActive]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[styles.filterText, activeFilter === 'all' && styles.filterTextActive]}>
              All Trips ({DRIVER_TRIP_DETAILS.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'completed' && styles.filterPillActive]}
            onPress={() => setActiveFilter('completed')}
          >
            <Text style={[styles.filterText, activeFilter === 'completed' && styles.filterTextActive]}>
              Completed (4)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'cancelled' && styles.filterPillActive]}
            onPress={() => setActiveFilter('cancelled')}
          >
            <Text style={[styles.filterText, activeFilter === 'cancelled' && styles.filterTextActive]}>
              Cancelled (1)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trips List */}
        {filteredTrips.map((trip) => (
          <View key={trip.id} style={styles.tripCard}>
            {/* Top row */}
            <View style={styles.cardHeader}>
              <View style={styles.passengerRow}>
                <View style={styles.passengerIconCircle}>
                  <Icon
                    name={trip.type === 'boda' ? 'bicycle' : 'car'}
                    size={16}
                    color={colors.dark}
                  />
                </View>
                <View>
                  <Text style={styles.passengerNameText}>{trip.passengerName}</Text>
                  <Text style={styles.tripDateText}>{trip.date}</Text>
                </View>
              </View>

              <View style={styles.fareColumn}>
                <Text style={styles.fareAmountText}>{formatUGX(trip.grossFare)}</Text>
                <Text style={styles.netPayoutText}>Payout: {formatUGX(trip.netPayout)}</Text>
              </View>
            </View>

            {/* Route */}
            <View style={styles.routeContainer}>
              <View style={styles.routeRow}>
                <View style={[styles.routeDot, { backgroundColor: colors.success }]} />
                <Text style={styles.routeText} numberOfLines={1}>
                  {trip.pickup}
                </Text>
              </View>
              <View style={styles.routeRow}>
                <View style={[styles.routeDot, { backgroundColor: colors.danger }]} />
                <Text style={styles.routeText} numberOfLines={1}>
                  {trip.destination}
                </Text>
              </View>
            </View>

            {/* Card footer */}
            <View style={styles.cardFooter}>
              <View style={styles.footerTags}>
                <View style={styles.methodTag}>
                  <Icon name="wallet-outline" size={12} color={colors.textSecondary} />
                  <Text style={styles.methodTagText}>{trip.paymentMethod}</Text>
                </View>
                {trip.status === 'completed' && (
                  <View style={styles.ratingTag}>
                    <Icon name="star" size={11} color="#F59E0B" />
                    <Text style={styles.ratingTagText}>{trip.passengerRating}</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() => navigation.navigate('HelpCenter')}
              >
                <Text style={styles.detailsBtnText}>Report Issue</Text>
                <Icon name="chevron-forward" size={12} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
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
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 12,
  },

  // Summary Banner
  summaryBanner: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 204, 0, 0.25)',
    ...shadows.md,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  summaryAmount: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.white,
    marginTop: 2,
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    gap: 4,
  },
  summaryBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.dark,
  },
  summaryStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  summaryStatItem: {
    alignItems: 'center',
  },
  summaryStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  statVal: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.white,
  },
  statLab: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },

  // Filter Pills
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: '#F3F4F6',
  },
  filterPillActive: {
    backgroundColor: colors.dark,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
  },

  // Trip Card
  tripCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  passengerIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengerNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tripDateText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  fareColumn: {
    alignItems: 'flex-end',
  },
  fareAmountText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  netPayoutText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '700',
    marginTop: 1,
  },

  // Route
  routeContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: radius.md,
    padding: 10,
    gap: 8,
    marginBottom: 12,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  routeText: {
    fontSize: 12,
    color: colors.textPrimary,
    flex: 1,
  },

  // Card Footer
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  methodTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
    gap: 4,
  },
  methodTagText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  ratingTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: radius.xs,
    gap: 3,
  },
  ratingTagText: {
    fontSize: 11,
    color: '#B45309',
    fontWeight: '700',
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  detailsBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});

export default DriverTripsScreen;
