/**
 * DriverFoundScreen — Driver found / assigned state.
 */
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import LocationRow from '../../components/common/LocationRow';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import mockDrivers from '../../data/mockDrivers';
import { formatUGX, formatRating } from '../../utils/helpers';

const driver = mockDrivers[0];

const DriverFoundScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={[styles.mapArea, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.mapContent}>
          <View style={styles.carMarker}>
            <Icon name="car" size={24} color={colors.primary} />
          </View>
        </View>
      </View>

      <View style={[styles.bottomSheet, shadows.bottomSheet]}>
        <View style={styles.dragHandle} />

        {/* Driver details */}
        <View style={styles.driverSection}>
          <ProfileAvatar name={driver.fullName} size={56} />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.fullName}</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={14} color={colors.starFilled} />
              <Text style={styles.rating}>{formatRating(driver.rating)}</Text>
              <Text style={styles.trips}> • {driver.totalTrips} trips</Text>
            </View>
            <Text style={styles.vehicle}>
              {driver.vehicle.color} {driver.vehicle.make} {driver.vehicle.model}
            </Text>
            <Text style={styles.plate}>{driver.vehicle.plate}</Text>
          </View>
        </View>

        {/* ETA */}
        <View style={styles.etaRow}>
          <Text style={styles.etaLabel}>Arriving in</Text>
          <Text style={styles.etaValue}>3 min</Text>
        </View>

        {/* Route */}
        <View style={styles.routeSection}>
          <LocationRow type="pickup" label="Pickup" address="Ntinda, Kampala" />
          <LocationRow type="destination" label="Destination" address="Kampala City Centre" />
        </View>

        {/* Fare */}
        <View style={styles.fareRow}>
          <Text style={styles.fareLabel}>Estimated fare</Text>
          <Text style={styles.fareAmount}>{formatUGX(12000)}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SupportChat', { topic: 'Chat with Driver' })}
          >
            <View style={styles.actionIcon}>
              <Icon name="chatbubble-outline" size={18} color={colors.textPrimary} />
            </View>
            <Text style={styles.actionLabel}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SafetyToolkit')}
          >
            <View style={styles.actionIcon}>
              <Icon name="shield-outline" size={18} color={colors.textPrimary} />
            </View>
            <Text style={styles.actionLabel}>Safety</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.dangerLight }]}>
              <Icon name="close" size={18} color={colors.danger} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.danger }]}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 14 }}>
          <TamblaButton
            title="Track Driver / Driver Arriving"
            variant="primary"
            onPress={() => navigation.navigate('DriverArrived')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8E4D8' },
  mapArea: { flex: 1 },
  backBtn: {
    position: 'absolute', top: 50, left: 16, width: 40, height: 40,
    borderRadius: 20, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', zIndex: 10, ...shadows.md,
  },
  mapContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  carMarker: {
    backgroundColor: colors.white, padding: 10, borderRadius: 24, ...shadows.md,
  },
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.bottomSheet,
    borderTopRightRadius: radius.bottomSheet,
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: 24,
  },
  dragHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: colors.border, alignSelf: 'center',
    marginTop: 10, marginBottom: 16,
  },
  driverSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  driverInfo: { flex: 1, marginLeft: 14 },
  driverName: { ...typography.heading, color: colors.textPrimary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  rating: { ...typography.secondary, color: colors.textSecondary, marginLeft: 4 },
  trips: { ...typography.caption, color: colors.textTertiary },
  vehicle: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 4 },
  plate: { ...typography.bodySmall, color: colors.textPrimary, fontWeight: '600' },
  etaRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 12, borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  etaLabel: { ...typography.body, color: colors.textSecondary },
  etaValue: { ...typography.subheading, color: colors.textPrimary },
  routeSection: { paddingVertical: 8 },
  fareRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 12, borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  fareLabel: { ...typography.body, color: colors.textSecondary },
  fareAmount: { ...typography.heading, color: colors.textPrimary },
  actions: {
    flexDirection: 'row', justifyContent: 'center', gap: 28, paddingTop: 12,
  },
  actionBtn: { alignItems: 'center' },
  actionIcon: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.offWhite, alignItems: 'center',
    justifyContent: 'center', marginBottom: 4,
  },
  actionLabel: { ...typography.caption, color: colors.textPrimary, fontWeight: '500' },
});

export default DriverFoundScreen;
