/**
 * DriverHomeScreen — Tambula Driver Operations Command Center
 *
 * Designed to the same high visual standard as the Passenger Home screen:
 * - Driver profile header with rating & switch to Rider mode
 * - Live Shift status card with pulse indicator & Kampala surge alert
 * - Today's Performance dashboard with live UGX earnings, trip count, hours & goal progress
 * - Interactive incoming dispatch card (Acacia Mall → Entebbe Airport)
 * - Real-time Kampala demand surge zones (Kololo, Entebbe Express, Ntinda)
 * - Driver operational tools & vehicle status
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
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import mockPayments from '../../data/mockPayments';
import { formatUGX } from '../../utils/helpers';

const SURGE_HOTSPOTS = [
  {
    id: 'h1',
    name: 'Kololo & Kisementi',
    surge: '+1.4x',
    bonus: '+UGX 3,500',
    demand: 'Very High Demand',
    icon: 'flame',
    color: '#EF4444',
  },
  {
    id: 'h2',
    name: 'Entebbe Expressway Hub',
    surge: '+1.2x',
    bonus: '+UGX 2,000',
    demand: 'High Demand',
    icon: 'airplane',
    color: '#F59E0B',
  },
  {
    id: 'h3',
    name: 'Acacia Mall & Kamwokya',
    surge: '+1.3x',
    bonus: '+UGX 2,500',
    demand: 'Busy Now',
    icon: 'cart',
    color: '#10B981',
  },
];

const DRIVER_TOOLS = [
  {
    id: 'earnings',
    title: 'Earnings Analytics',
    subtitle: 'Weekly payout reports',
    icon: 'cash-outline',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    screen: null,
    tab: 'Earnings',
  },
  {
    id: 'wallet',
    title: 'MoMo Cashout',
    subtitle: 'UGX 384,500 available',
    icon: 'wallet-outline',
    color: colors.primary,
    bgColor: 'rgba(255, 204, 0, 0.12)',
    screen: 'WithdrawFunds',
    tab: null,
  },
  {
    id: 'subscription',
    title: 'Weekly Pass',
    subtitle: 'Active • UGX 20,000/wk',
    icon: 'ribbon-outline',
    color: '#8B5CF6',
    bgColor: 'rgba(139, 92, 246, 0.12)',
    screen: 'DriverSubscription',
    tab: null,
  },
  {
    id: 'docs',
    title: 'My Documents',
    subtitle: '4/4 Verified by Tambula',
    icon: 'shield-checkmark-outline',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
    screen: 'DriverDocuments',
    tab: null,
  },
  {
    id: 'vehicle',
    title: 'Vehicle Details',
    subtitle: 'Toyota Corolla (UAX 123Z)',
    icon: 'car-outline',
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.12)',
    screen: 'VehicleDetails',
    tab: null,
  },
  {
    id: 'support',
    title: 'Driver Support',
    subtitle: '24/7 Priority Agent Chat',
    icon: 'chatbubbles-outline',
    color: '#14B8A6',
    bgColor: 'rgba(20, 184, 166, 0.12)',
    screen: 'SupportChat',
    tab: null,
  },
];

const DriverHomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(true);
  const earnings = mockPayments.driverEarnings;

  const handleToolPress = (tool) => {
    if (tool.screen) {
      navigation.navigate(tool.screen);
    } else if (tool.tab) {
      navigation.getParent()?.navigate(tool.tab);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F17" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.driverProfileRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DriverProfile')}
              activeOpacity={0.8}
            >
              <ProfileAvatar name="Musa Ssebufu" size={44} />
            </TouchableOpacity>
            <View style={styles.driverMeta}>
              <View style={styles.driverNameRow}>
                <Text style={styles.driverName}>Musa Ssebufu</Text>
                <Icon name="shield-checkmark" size={15} color={colors.primary} />
              </View>
              <Text style={styles.driverStatsText}>★ 4.96 • 1,248 Trips • Verified</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.passengerSwitch}
            onPress={() => navigation.navigate('Passenger')}
            activeOpacity={0.8}
          >
            <Icon name="swap-horizontal" size={14} color={colors.dark} />
            <Text style={styles.passengerSwitchText}>Rider Mode</Text>
          </TouchableOpacity>
        </View>

        {/* Live Status Command Card */}
        <View style={[styles.statusCard, isOnline ? styles.statusCardOnline : styles.statusCardOffline]}>
          <View style={styles.statusTopRow}>
            <View style={styles.statusIndicatorRow}>
              <View style={[styles.statusPulseDot, { backgroundColor: isOnline ? '#10B981' : '#F59E0B' }]} />
              <Text style={styles.statusTitle}>
                {isOnline ? 'YOU ARE ONLINE' : 'YOU ARE OFFLINE'}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.toggleBtn, isOnline ? styles.toggleBtnActive : styles.toggleBtnInactive]}
              onPress={() => {
                const next = !isOnline;
                setIsOnline(next);
                if (!next) navigation.navigate('Offline');
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.toggleBtnText, isOnline ? styles.toggleBtnTextActive : styles.toggleBtnTextInactive]}>
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Text>
            </TouchableOpacity>
          </View>

          {isOnline ? (
            <View style={styles.surgeNotice}>
              <Icon name="flash" size={14} color={colors.primary} />
              <Text style={styles.surgeNoticeText}>
                High surge demand active in Kampala Central & Kololo!
              </Text>
            </View>
          ) : (
            <Text style={styles.offlineNoticeText}>
              Go online now to start receiving ride and delivery dispatches.
            </Text>
          )}
        </View>

        {/* Today's Performance Dashboard Card */}
        <View style={styles.performanceCard}>
          <View style={styles.perfHeaderRow}>
            <View>
              <Text style={styles.perfLabel}>TODAY'S NET EARNINGS</Text>
              <Text style={styles.perfAmount}>{formatUGX(earnings.today.amount)}</Text>
            </View>
            <TouchableOpacity
              style={styles.cashoutBtn}
              onPress={() => navigation.navigate('WithdrawFunds')}
              activeOpacity={0.8}
            >
              <Text style={styles.cashoutBtnText}>Cashout</Text>
              <Icon name="arrow-forward" size={14} color={colors.dark} />
            </TouchableOpacity>
          </View>

          {/* Quick metric chips */}
          <View style={styles.metricsRow}>
            <View style={styles.metricChip}>
              <Text style={styles.metricVal}>{earnings.today.trips}</Text>
              <Text style={styles.metricLab}>Trips Done</Text>
            </View>
            <View style={styles.metricChip}>
              <Text style={styles.metricVal}>5.4h</Text>
              <Text style={styles.metricLab}>Online Time</Text>
            </View>
            <View style={styles.metricChip}>
              <Text style={styles.metricVal}>98%</Text>
              <Text style={styles.metricLab}>Acceptance</Text>
            </View>
          </View>

          {/* Daily Goal Bar */}
          <View style={styles.goalSection}>
            <View style={styles.goalHeaderRow}>
              <Text style={styles.goalTitle}>Daily Target (UGX 200,000)</Text>
              <Text style={styles.goalPercent}>74%</Text>
            </View>
            <View style={styles.goalTrack}>
              <View style={[styles.goalFill, { width: '74%' }]} />
            </View>
          </View>
        </View>

        {/* Live Incoming Dispatch Card (when online) */}
        {isOnline && (
          <View style={styles.dispatchCard}>
            <View style={styles.dispatchHeaderRow}>
              <View style={styles.dispatchBadge}>
                <Icon name="radio" size={12} color={colors.dark} />
                <Text style={styles.dispatchBadgeText}>NEW RIDE DISPATCH</Text>
              </View>
              <Text style={styles.dispatchTimer}>24s left</Text>
            </View>

            <View style={styles.passengerInfoRow}>
              <View style={styles.passengerAvatar}>
                <Text style={styles.passengerAvatarText}>B</Text>
              </View>
              <View style={styles.passengerMeta}>
                <Text style={styles.passengerName}>Brian Kigozi</Text>
                <Text style={styles.passengerSub}>★ 4.9 • 48 Previous Trips</Text>
              </View>
              <Text style={styles.dispatchFare}>UGX 44,000</Text>
            </View>

            <View style={styles.dispatchRoute}>
              <View style={styles.dispatchStop}>
                <View style={[styles.routeDot, { backgroundColor: colors.success }]} />
                <Text style={styles.dispatchStopText} numberOfLines={1}>
                  Acacia Mall, Kisementi (1.2 km away)
                </Text>
              </View>
              <View style={styles.dispatchStop}>
                <View style={[styles.routeDot, { backgroundColor: colors.danger }]} />
                <Text style={styles.dispatchStopText} numberOfLines={1}>
                  Entebbe International Airport (42 km)
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.acceptDispatchBtn}
              onPress={() => navigation.navigate('IncomingRequest')}
              activeOpacity={0.85}
            >
              <Text style={styles.acceptDispatchBtnText}>View & Accept Dispatch</Text>
              <Icon name="checkmark-circle" size={18} color={colors.dark} />
            </TouchableOpacity>
          </View>
        )}

        {/* Kampala Surge Hotspots Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Kampala Surge Zones</Text>
          <Text style={styles.sectionSub}>Live demand multipliers</Text>
        </View>

        <View style={styles.hotspotsContainer}>
          {SURGE_HOTSPOTS.map((spot) => (
            <View key={spot.id} style={styles.hotspotRow}>
              <View style={[styles.hotspotIconBox, { backgroundColor: 'rgba(255, 255, 255, 0.06)' }]}>
                <Icon name={spot.icon} size={18} color={spot.color} />
              </View>
              <View style={styles.hotspotInfo}>
                <Text style={styles.hotspotName}>{spot.name}</Text>
                <Text style={styles.hotspotDemand}>{spot.demand}</Text>
              </View>
              <View style={styles.hotspotSurgePill}>
                <Text style={styles.hotspotSurgeText}>{spot.surge}</Text>
                <Text style={styles.hotspotBonusText}>{spot.bonus}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Driver Operations Tools */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Driver Tools & Services</Text>
        </View>

        <View style={styles.toolsGrid}>
          {DRIVER_TOOLS.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={styles.toolCard}
              onPress={() => handleToolPress(tool)}
              activeOpacity={0.75}
            >
              <View style={[styles.toolIconBox, { backgroundColor: tool.bgColor }]}>
                <Icon name={tool.icon} size={22} color={tool.color} />
              </View>
              <Text style={styles.toolTitle}>{tool.title}</Text>
              <Text style={styles.toolSubtitle} numberOfLines={1}>
                {tool.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F17',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 12,
    paddingBottom: 16,
  },
  driverProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  driverMeta: {
    justifyContent: 'center',
  },
  driverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
  },
  driverStatsText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  passengerSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.full,
    gap: 5,
  },
  passengerSwitchText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.dark,
  },

  // Status Command Card
  statusCard: {
    marginHorizontal: spacing.screenHorizontal,
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  statusCardOnline: {
    backgroundColor: '#111A24',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  statusCardOffline: {
    backgroundColor: '#181B22',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statusTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusPulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  toggleBtnActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  toggleBtnInactive: {
    backgroundColor: colors.primary,
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  toggleBtnTextActive: {
    color: '#EF4444',
  },
  toggleBtnTextInactive: {
    color: colors.dark,
  },
  surgeNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  surgeNoticeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  offlineNoticeText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 8,
  },

  // Performance Dashboard Card
  performanceCard: {
    backgroundColor: '#131924',
    marginHorizontal: spacing.screenHorizontal,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
    ...shadows.md,
  },
  perfHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  perfLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  perfAmount: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.white,
    marginTop: 2,
  },
  cashoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    gap: 4,
  },
  cashoutBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.dark,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  metricChip: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: radius.md,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  metricVal: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.white,
  },
  metricLab: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
    fontWeight: '500',
  },
  goalSection: {
    marginTop: 14,
  },
  goalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  goalTitle: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  goalPercent: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  goalTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  goalFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },

  // Incoming Dispatch Card
  dispatchCard: {
    backgroundColor: '#1E2533',
    marginHorizontal: spacing.screenHorizontal,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginBottom: 20,
    ...shadows.lg,
  },
  dispatchHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dispatchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
    gap: 5,
  },
  dispatchBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.dark,
  },
  dispatchTimer: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
  passengerInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  passengerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  passengerAvatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.dark,
  },
  passengerMeta: {
    flex: 1,
  },
  passengerName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  passengerSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  dispatchFare: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  dispatchRoute: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: radius.md,
    padding: 10,
    gap: 8,
    marginBottom: 14,
  },
  dispatchStop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dispatchStopText: {
    fontSize: 12,
    color: colors.white,
    flex: 1,
  },
  acceptDispatchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: radius.full,
    gap: 6,
  },
  acceptDispatchBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.dark,
  },

  // Sections
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
  },
  sectionSub: {
    fontSize: 11,
    color: '#94A3B8',
  },

  // Hotspots
  hotspotsContainer: {
    paddingHorizontal: spacing.screenHorizontal,
    gap: 8,
    marginBottom: 20,
  },
  hotspotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131924',
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  hotspotIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  hotspotInfo: {
    flex: 1,
  },
  hotspotName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  hotspotDemand: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  hotspotSurgePill: {
    alignItems: 'flex-end',
  },
  hotspotSurgeText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
  },
  hotspotBonusText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '600',
  },

  // Tools Grid
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.screenHorizontal,
    gap: 10,
  },
  toolCard: {
    width: '48.5%',
    backgroundColor: '#131924',
    padding: 14,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  toolIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  toolTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  toolSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
});

export default DriverHomeScreen;
