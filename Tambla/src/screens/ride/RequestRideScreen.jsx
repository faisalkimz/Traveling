/**
 * RequestRideScreen — Ride Selection & Booking Flow
 *
 * Clean vector map canvas with simulated roads, vehicle markers,
 * Tambula ride options (Standard Cab, Tambula XL, Tambula Boda, Tambula Executive),
 * payment method selector, fare breakdown, and CTA. Zero stock imagery.
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
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import TamblaButton from '../../components/common/TamblaButton';
import RideTypeCard from '../../components/cards/RideTypeCard';
import { formatUGX } from '../../utils/helpers';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const RIDE_OPTIONS = [
  {
    id: 'standard',
    name: 'Standard Cab',
    type: 'standard',
    seats: 4,
    eta: '2 min away',
    price: 12000,
    description: 'Affordable, everyday rides',
  },
  {
    id: 'xl',
    name: 'Tambula XL',
    type: 'xl',
    seats: 6,
    eta: '5 min away',
    price: 18000,
    description: 'Extra space for groups & luggage',
  },
  {
    id: 'moto',
    name: 'Tambula Boda',
    type: 'moto',
    seats: 1,
    eta: '1 min away',
    price: 5000,
    description: 'Fastest through Kampala traffic',
  },
  {
    id: 'premium',
    name: 'Tambula Executive',
    type: 'premium',
    seats: 4,
    eta: '4 min away',
    price: 25000,
    description: 'Premium sedans with top drivers',
  },
];

const RequestRideScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const initialCategory = route?.params?.initialCategory;
  const destination = route?.params?.destination;

  const [selectedRide, setSelectedRide] = useState(
    initialCategory === 'moto' ? 'moto' : 'standard'
  );
  const selectedOption = RIDE_OPTIONS.find((r) => r.id === selectedRide) || RIDE_OPTIONS[0];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Vector map visualization */}
      <View style={[styles.mapArea, { paddingTop: insets.top + 8 }]}>
        {/* Decorative road lines */}
        <View style={styles.mapGridLine1} />
        <View style={styles.mapGridLine2} />
        <View style={styles.mapGridLine3} />

        {/* Floating back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Icon name="arrow-back" size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Simulated vehicle icons on map */}
        <View style={styles.carMarker1}>
          <Icon name="car-sport" size={20} color={colors.primaryDark} />
        </View>
        <View style={styles.carMarker2}>
          <Icon name="bicycle" size={18} color={colors.success} />
        </View>

        {/* Route visualization markers overlay */}
        <View style={styles.mapPinContainer}>
          <View style={styles.routePill}>
            <View style={styles.pickupDot} />
            <Text style={styles.routePillText}>Current Location</Text>
            <Icon name="arrow-forward" size={12} color={colors.textSecondary} style={{ marginHorizontal: 6 }} />
            <Icon name="location" size={14} color={colors.danger} />
            <Text style={styles.routePillText} numberOfLines={1}>
              {destination?.name || 'Kampala Central'}
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom sheet */}
      <View style={[styles.bottomSheet, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.dragHandle} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.sheetTitle}>Select Your Tambula Ride</Text>

          {/* Ride options list */}
          {RIDE_OPTIONS.map((option) => (
            <RideTypeCard
              key={option.id}
              name={option.name}
              type={option.type}
              seats={option.seats}
              eta={option.eta}
              price={option.price}
              description={option.description}
              selected={selectedRide === option.id}
              onPress={() => setSelectedRide(option.id)}
            />
          ))}

          {/* Payment method selector row */}
          <TouchableOpacity
            style={styles.paymentRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ChoosePayment')}
          >
            <View style={styles.paymentLeft}>
              <View style={styles.paymentIconBox}>
                <Icon name="phone-portrait" size={16} color={colors.dark} />
              </View>
              <View>
                <Text style={styles.paymentLabel}>MTN Mobile Money (*165#)</Text>
                <Text style={styles.paymentSub}>Tap to change payment method</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
          </TouchableOpacity>

          {/* Fare estimate row */}
          <TouchableOpacity
            style={styles.fareRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('FareBreakdown', { ride: selectedOption })}
          >
            <View>
              <Text style={styles.fareLabel}>ESTIMATED TOTAL FARE</Text>
              <Text style={styles.fareAmount}>{formatUGX(selectedOption?.price || 12000)}</Text>
            </View>
            <View style={styles.fareBreakdownBtn}>
              <Text style={styles.fareBreakdownText}>View Details</Text>
              <Icon name="information-circle" size={16} color={colors.dark} />
            </View>
          </TouchableOpacity>

          {/* Confirm booking CTA button */}
          <View style={styles.ctaContainer}>
            <TamblaButton
              title={`Confirm ${selectedOption.name}`}
              onPress={() =>
                navigation.navigate('SearchingDriver', {
                  ride: selectedOption,
                  destination: destination || { name: 'Kampala' },
                })
              }
              variant="primary"
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mapArea: {
    height: '40%',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#E5E7EB',
    position: 'relative',
    overflow: 'hidden',
  },
  mapGridLine1: {
    position: 'absolute',
    top: 60,
    left: -40,
    right: -40,
    height: 18,
    backgroundColor: '#D1D5DB',
    transform: [{ rotate: '-12deg' }],
  },
  mapGridLine2: {
    position: 'absolute',
    top: 130,
    left: -40,
    right: -40,
    height: 14,
    backgroundColor: '#D1D5DB',
    transform: [{ rotate: '8deg' }],
  },
  mapGridLine3: {
    position: 'absolute',
    top: -20,
    bottom: -20,
    left: '46%',
    width: 22,
    backgroundColor: '#D1D5DB',
    transform: [{ rotate: '5deg' }],
  },
  carMarker1: {
    position: 'absolute',
    top: 90,
    right: 50,
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: radius.full,
    ...shadows.sm,
  },
  carMarker2: {
    position: 'absolute',
    top: 120,
    left: 70,
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: radius.full,
    ...shadows.sm,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  mapPinContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  routePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    maxWidth: '92%',
    ...shadows.md,
  },
  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  routePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  // Bottom Sheet
  bottomSheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.screenHorizontal,
    marginTop: -20,
    ...shadows.lg,
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
  sheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 10,
  },

  // Payment Row
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: radius.md,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  paymentIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  paymentSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },

  // Fare Row
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    padding: 12,
    borderRadius: radius.md,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F3EDE2',
  },
  fareLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  fareAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  fareBreakdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  fareBreakdownText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.dark,
  },

  ctaContainer: {
    marginTop: 14,
    marginBottom: 6,
  },
});

export default RequestRideScreen;
