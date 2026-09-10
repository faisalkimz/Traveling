/**
 * TripDetailsScreen — Comprehensive Trip Details & Receipt
 *
 * Detailed trip receipt, route summary, fare breakdown, driver details,
 * and support actions (Report issue, Lost item, Download receipt).
 */
import React from 'react';
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
import Icon from '@expo/vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const TripDetailsScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const trip = route?.params?.trip || {
    id: 'TRIP-9842',
    date: '10 Sep 2026, 09:14 AM',
    driver: 'Musa Ssebufu',
    rating: 4.8,
    car: 'Toyota Corolla',
    plate: 'UAX 123Z',
    pickup: 'Acacia Mall, Kololo',
    destination: 'Entebbe International Airport',
    distance: '38.5 km',
    duration: '42 mins',
    fare: 'UGX 55,000',
    paymentMethod: 'MTN Mobile Money',
    status: 'Completed',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader
        title="Trip Receipt"
        onBack={() => navigation.goBack()}
        rightIcon="share-outline"
        onRightPress={() => {
          Alert.alert('Share Receipt', 'Sharing receipt for ' + trip.id);
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Uber-Style Route Map Snapshot Header */}
        <View style={styles.mapSnapshotCard}>
          <View style={styles.mapGridPattern}>
            <View style={styles.mapGridLine1} />
            <View style={styles.mapGridLine2} />
          </View>
          <View style={styles.mapRouteDisplay}>
            <View style={styles.mapPinOrigin}>
              <Icon name="radio-button-on" size={16} color={colors.primaryDark} />
            </View>
            <View style={styles.mapPathDashed} />
            <View style={styles.mapPinDest}>
              <Icon name="location" size={18} color={colors.dark} />
            </View>
          </View>
          <View style={styles.mapStatPill}>
            <Icon name="navigate-outline" size={12} color={colors.dark} style={{ marginRight: 4 }} />
            <Text style={styles.mapStatText}>{trip.distance} • {trip.duration}</Text>
          </View>
        </View>

        {/* Status & Fare Header */}
        <View style={styles.headerCard}>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{trip.status}</Text>
          </View>
          <Text style={styles.fareAmount}>{trip.fare}</Text>
          <Text style={styles.dateText}>{trip.date} • {trip.id}</Text>
        </View>

        {/* Route Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ROUTE SUMMARY</Text>
          <View style={styles.timelineRow}>
            <View style={[styles.timelineDot, { backgroundColor: colors.primary }]} />
            <View style={styles.timelineTextCol}>
              <Text style={styles.timelineLabel}>PICKUP</Text>
              <Text style={styles.timelineAddress}>{trip.pickup}</Text>
            </View>
          </View>
          <View style={styles.timelineConnector} />
          <View style={styles.timelineRow}>
            <View style={[styles.timelineDot, { backgroundColor: colors.dark }]} />
            <View style={styles.timelineTextCol}>
              <Text style={styles.timelineLabel}>DESTINATION</Text>
              <Text style={styles.timelineAddress}>{trip.destination}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="speedometer-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.statLabel}>Distance</Text>
              <Text style={styles.statValue}>{trip.distance}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Icon name="time-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>{trip.duration}</Text>
            </View>
          </View>
        </View>

        {/* Driver Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>DRIVER & VEHICLE</Text>
          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitial}>
                {trip.driver?.charAt(0) || 'M'}
              </Text>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{trip.driver}</Text>
              <Text style={styles.driverSub}>
                {trip.car} • <Text style={styles.plate}>{trip.plate}</Text>
              </Text>
            </View>
            <View style={styles.driverRating}>
              <Icon name="star" size={13} color={colors.starYellow} />
              <Text style={styles.ratingValue}>{trip.rating}</Text>
            </View>
          </View>
        </View>

        {/* Fare Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>PAYMENT BREAKDOWN</Text>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Base Fare</Text>
            <Text style={styles.feeVal}>UGX 4,000</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Distance & Time</Text>
            <Text style={styles.feeVal}>UGX 48,000</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Service Fee</Text>
            <Text style={styles.feeVal}>UGX 3,000</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.feeRowTotal}>
            <Text style={styles.feeTotalLabel}>Total Paid</Text>
            <Text style={styles.feeTotalVal}>{trip.fare}</Text>
          </View>

          <View style={styles.paymentMethodNotice}>
            <Icon name="phone-portrait-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.paymentMethodText}>
              Paid via {trip.paymentMethod}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => Alert.alert('Receipt Downloaded', `Official tax receipt for ${trip.id} has been saved.`)}
          >
            <Icon name="download-outline" size={20} color={colors.textPrimary} />
            <Text style={styles.actionRowText}>Download PDF Receipt</Text>
            <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('LostItem', { trip })}
          >
            <Icon name="help-buoy-outline" size={20} color={colors.textPrimary} />
            <Text style={styles.actionRowText}>Find Lost Item</Text>
            <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionRow}
            onPress={() => navigation.navigate('HelpCenter')}
          >
            <Icon name="chatbubble-ellipses-outline" size={20} color={colors.textPrimary} />
            <Text style={styles.actionRowText}>Report an Issue with this Trip</Text>
            <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBtn}>
          <TamblaButton
            title="Book This Trip Again"
            variant="primary"
            onPress={() => {
              // Navigate to RequestRide with destination pre-populated
              navigation.navigate('Home', {
                screen: 'RequestRide',
                params: {
                  destination: {
                    id: 'rebook_' + trip.id,
                    name: trip.destination,
                    address: trip.destination,
                  },
                },
              });
            }}
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
  mapSnapshotCard: {
    height: 110,
    backgroundColor: '#E8ECEF',
    borderRadius: radius.lg,
    marginBottom: 14,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8DEE4',
    position: 'relative',
  },
  mapGridPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.35,
  },
  mapGridLine1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 45,
    height: 14,
    backgroundColor: '#CBD5E1',
    transform: [{ rotate: '-8deg' }],
  },
  mapGridLine2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 90,
    width: 14,
    backgroundColor: '#CBD5E1',
    transform: [{ rotate: '25deg' }],
  },
  mapRouteDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.pill,
    ...shadows.sm,
  },
  mapPinOrigin: {
    marginRight: 8,
  },
  mapPathDashed: {
    width: 60,
    height: 2,
    backgroundColor: colors.primary,
    marginRight: 8,
  },
  mapPinDest: {
    marginLeft: 0,
  },
  mapStatPill: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  mapStatText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.dark,
  },
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    ...shadows.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginBottom: 10,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.success,
  },
  fareAmount: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  dateText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    ...shadows.xs,
  },
  cardTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  timelineConnector: {
    width: 2,
    height: 18,
    backgroundColor: colors.borderDarker,
    marginLeft: 4,
    marginVertical: 2,
  },
  timelineTextCol: {
    flex: 1,
  },
  timelineLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textTertiary,
  },
  timelineAddress: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: colors.border,
    marginTop: 14,
    paddingTop: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.border,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  statValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  driverInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.dark,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  driverSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  plate: {
    fontWeight: '700',
    color: colors.dark,
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.xs,
  },
  ratingValue: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  feeLabel: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
  },
  feeVal: {
    ...typography.bodySecondary,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },
  feeRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  feeTotalLabel: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  feeTotalVal: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  paymentMethodNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.backgroundSecondary,
    padding: 10,
    borderRadius: radius.xs,
  },
  paymentMethodText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  actionsSection: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  actionRowText: {
    flex: 1,
    ...typography.bodySecondary,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  bottomBtn: {
    marginTop: 4,
  },
});

export default TripDetailsScreen;
