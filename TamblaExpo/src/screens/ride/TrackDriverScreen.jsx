/**
 * TrackDriverScreen — Golden Reference #4
 *
 * Map dominant, "Driver is on the way" header, driver card, Chat/Call/Cancel actions.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import mockDrivers from '../../data/mockDrivers';
import { formatRating } from '../../utils/helpers';

const driver = mockDrivers[0];

const TrackDriverScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Map area */}
      <View style={[styles.mapArea, { paddingTop: insets.top }]}>
        {/* Header overlay */}
        <View style={styles.headerOverlay}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Driver is on the way</Text>
            <Text style={styles.headerEta}>Arriving in 3 min</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Map placeholder */}
        <View style={styles.mapContent}>
          <View style={styles.routeLine} />
          <View style={styles.driverMarker}>
            <Icon name="car" size={20} color={colors.primary} />
          </View>
          <View style={styles.pickupMarker}>
            <Icon name="location" size={20} color={colors.success} />
          </View>
        </View>
      </View>

      {/* Bottom card */}
      <View style={[styles.bottomCard, shadows.bottomSheet]}>
        <View style={styles.dragHandle} />

        {/* Driver info */}
        <View style={styles.driverRow}>
          <ProfileAvatar name={driver.fullName} size={50} />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.fullName}</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={14} color={colors.starFilled} />
              <Text style={styles.ratingText}>{formatRating(driver.rating)}</Text>
            </View>
            <Text style={styles.vehicleText}>
              {driver.vehicle.make} {driver.vehicle.model} — {driver.vehicle.plate}
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <View style={styles.actionIconContainer}>
              <Icon name="chatbubble-outline" size={20} color={colors.textPrimary} />
            </View>
            <Text style={styles.actionLabel}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <View style={styles.actionIconContainer}>
              <Icon name="call-outline" size={20} color={colors.textPrimary} />
            </View>
            <Text style={styles.actionLabel}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <View style={[styles.actionIconContainer, styles.cancelIconContainer]}>
              <Icon name="close-outline" size={20} color={colors.danger} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.danger }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E4D8',
  },
  mapArea: {
    flex: 1,
  },
  headerOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  headerEta: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
  mapContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeLine: {
    position: 'absolute',
    width: 3,
    height: 120,
    backgroundColor: colors.primary,
    opacity: 0.3,
    transform: [{ rotate: '-30deg' }],
  },
  driverMarker: {
    position: 'absolute',
    top: '30%',
    left: '35%',
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 20,
    ...shadows.md,
  },
  pickupMarker: {
    position: 'absolute',
    bottom: '35%',
    right: '35%',
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 20,
    ...shadows.md,
  },

  // Bottom card
  bottomCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.bottomSheet,
    borderTopRightRadius: radius.bottomSheet,
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: 24,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverInfo: {
    flex: 1,
    marginLeft: 14,
  },
  driverName: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    ...typography.secondary,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  vehicleText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Actions
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  cancelIconContainer: {
    backgroundColor: colors.dangerLight,
  },
  actionLabel: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});

export default TrackDriverScreen;
