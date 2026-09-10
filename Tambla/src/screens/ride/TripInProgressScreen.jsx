/**
 * TripInProgressScreen — Golden Reference #5
 *
 * Map top, "Trip in progress" header with timer, driver mini card,
 * From/To location rows, fare, payment, Safety/Share actions.
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import LocationRow from '../../components/common/LocationRow';
import TamblaButton from '../../components/common/TamblaButton';
import mockDrivers from '../../data/mockDrivers';
import mockTrips from '../../data/mockTrips';
import { formatUGX, formatRating, formatElapsedTime } from '../../utils/helpers';

const driver = mockDrivers[0];
const trip = mockTrips.current;

const TripInProgressScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [elapsed, setElapsed] = useState(165); // 2:45

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Map area */}
      <View style={[styles.mapArea, { paddingTop: insets.top }]}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>Trip in progress</Text>
          <View style={styles.timerBadge}>
            <Text style={styles.timerText}>{formatElapsedTime(elapsed)}</Text>
          </View>
        </View>
        <View style={styles.mapContent}>
          <View style={styles.routeVisualization}>
            <View style={styles.routeDot} />
            <View style={styles.routePath} />
            <View style={[styles.routeDot, { backgroundColor: colors.danger }]} />
          </View>
        </View>
      </View>

      {/* Bottom info */}
      <View style={[styles.bottomSheet, shadows.bottomSheet]}>
        <View style={styles.dragHandle} />

        {/* Driver mini card */}
        <View style={styles.driverRow}>
          <ProfileAvatar name={driver.fullName} size={42} />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.fullName}</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={12} color={colors.starFilled} />
              <Text style={styles.ratingText}>{formatRating(driver.rating)}</Text>
            </View>
          </View>
        </View>

        {/* Route info */}
        <View style={styles.routeInfo}>
          <LocationRow
            type="pickup"
            label="From"
            address={trip.pickup.name}
          />
          <LocationRow
            type="destination"
            label="To"
            address={trip.destination.name}
          />
        </View>

        {/* Fare & payment */}
        <View style={styles.fareRow}>
          <View>
            <Text style={styles.fareAmount}>{formatUGX(trip.fare)}</Text>
            <Text style={styles.paymentMethod}>{trip.paymentLabel}</Text>
          </View>
        </View>

        {/* Safety actions */}
        <View style={styles.safetyRow}>
          <TouchableOpacity
            style={styles.safetyBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SafetyToolkit', { trip })}
          >
            <Icon name="shield-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.safetyText}>Safety</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.safetyBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ShareTrip', { trip })}
          >
            <Icon name="share-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.safetyText}>Share Trip</Text>
          </TouchableOpacity>
        </View>

        {/* Arrive CTA */}
        <View style={{ marginTop: 14 }}>
          <TamblaButton
            title="Arrive at Destination"
            variant="primary"
            onPress={() => navigation.navigate('TripCompleted', { trip })}
          />
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
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  headerTitle: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  timerBadge: {
    backgroundColor: colors.dark,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  timerText: {
    ...typography.heading,
    color: colors.textOnDark,
    fontSize: 18,
    fontWeight: '700',
  },
  mapContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeVisualization: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
  },
  routePath: {
    width: 100,
    height: 3,
    backgroundColor: colors.primary,
    opacity: 0.4,
  },

  // Bottom sheet
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.bottomSheet,
    borderTopRightRadius: radius.bottomSheet,
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: 20,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 12,
  },

  // Driver
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  driverInfo: {
    marginLeft: 12,
  },
  driverName: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  ratingText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: 3,
  },

  // Route
  routeInfo: {
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },

  // Fare
  fareRow: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  fareAmount: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  paymentMethod: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Safety
  safetyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    paddingTop: 14,
  },
  safetyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  safetyText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});

export default TripInProgressScreen;
