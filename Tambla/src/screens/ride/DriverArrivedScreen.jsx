/**
 * DriverArrivedScreen — Driver has arrived at pickup.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import mockDrivers from '../../data/mockDrivers';
import { formatRating } from '../../utils/helpers';
import TamblaButton from '../../components/common/TamblaButton';

const driver = mockDrivers[0];

const DriverArrivedScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <View style={[styles.mapArea, { paddingTop: insets.top }]}>
        <View style={styles.arrivedBanner}>
          <Icon name="checkmark-circle" size={20} color={colors.success} />
          <Text style={styles.arrivedText}>Your driver has arrived</Text>
        </View>
      </View>

      <View style={[styles.bottomSheet, shadows.bottomSheet]}>
        <View style={styles.dragHandle} />

        {/* Driver */}
        <View style={styles.driverRow}>
          <ProfileAvatar name={driver.fullName} size={50} />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.fullName}</Text>
            <Text style={styles.vehicleText}>
              {driver.vehicle.color} {driver.vehicle.make} {driver.vehicle.model}
            </Text>
            <Text style={styles.plateText}>{driver.vehicle.plate}</Text>
          </View>
        </View>

        {/* PIN */}
        <View style={styles.pinSection}>
          <Text style={styles.pinLabel}>Pickup PIN</Text>
          <View style={styles.pinRow}>
            {['4', '7', '2', '1'].map((digit, i) => (
              <View key={i} style={styles.pinDigit}>
                <Text style={styles.pinDigitText}>{digit}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.pinHint}>Share this PIN with your driver to start the trip</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SafetyToolkit')}
          >
            <View style={styles.actionIcon}>
              <Icon name="shield-outline" size={20} color={colors.textPrimary} />
            </View>
            <Text style={styles.actionLabel}>Safety</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SupportChat', { topic: 'Chat with Driver' })}
          >
            <View style={styles.actionIcon}>
              <Icon name="chatbubble-outline" size={20} color={colors.textPrimary} />
            </View>
            <Text style={styles.actionLabel}>Message</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 14 }}>
          <TamblaButton
            title="Start Trip (Ride In Progress)"
            variant="primary"
            onPress={() => navigation.navigate('TripInProgress')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8E4D8' },
  mapArea: { flex: 1, alignItems: 'center' },
  arrivedBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.white, paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: radius.pill, marginTop: 12, ...shadows.md,
  },
  arrivedText: { ...typography.subheading, color: colors.textPrimary },
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.bottomSheet,
    borderTopRightRadius: radius.bottomSheet,
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: 28,
  },
  dragHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: colors.border, alignSelf: 'center',
    marginTop: 10, marginBottom: 16,
  },
  driverRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  driverInfo: { flex: 1, marginLeft: 14 },
  driverName: { ...typography.heading, color: colors.textPrimary },
  vehicleText: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 2 },
  plateText: { ...typography.bodySmall, color: colors.textPrimary, fontWeight: '600', marginTop: 1 },
  pinSection: { alignItems: 'center', marginBottom: 20 },
  pinLabel: { ...typography.secondary, color: colors.textSecondary, marginBottom: 10 },
  pinRow: { flexDirection: 'row', gap: 10 },
  pinDigit: {
    width: 48, height: 56, borderRadius: radius.md,
    backgroundColor: colors.offWhite, alignItems: 'center',
    justifyContent: 'center', borderWidth: 1, borderColor: colors.border,
  },
  pinDigitText: { ...typography.title, color: colors.textPrimary, fontWeight: '700' },
  pinHint: { ...typography.caption, color: colors.textSecondary, marginTop: 10, textAlign: 'center' },
  actions: { flexDirection: 'row', justifyContent: 'center', gap: 32 },
  actionBtn: { alignItems: 'center' },
  actionIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.offWhite, alignItems: 'center',
    justifyContent: 'center', marginBottom: 6,
  },
  actionLabel: { ...typography.caption, color: colors.textPrimary, fontWeight: '500' },
});

export default DriverArrivedScreen;
