/**
 * ScheduleRideScreen — Reserve a Ride in Advance
 *
 * Pickup, destination, date & time picker, ride tier selection,
 * and scheduled ride confirmation.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
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

const DATES = [
  { id: 'd1', label: 'Today', sub: '10 Sep' },
  { id: 'd2', label: 'Tomorrow', sub: '11 Sep' },
  { id: 'd3', label: 'Fri', sub: '12 Sep' },
  { id: 'd4', label: 'Sat', sub: '13 Sep' },
];

const TIME_SLOTS = [
  '06:00 AM',
  '07:30 AM',
  '08:45 AM',
  '12:00 PM',
  '03:30 PM',
  '05:15 PM',
  '07:00 PM',
  '09:30 PM',
];

const RIDE_TYPES = [
  { id: 'std', title: 'Tambula Standard', capacity: '4 seats', fare: 'UGX 14,000', icon: 'car' },
  { id: 'xl', title: 'Tambula XL', capacity: '6 seats', fare: 'UGX 22,000', icon: 'bus' },
  { id: 'moto', title: 'Tambula Moto', capacity: '1 passenger', fare: 'UGX 6,000', icon: 'bicycle' },
];

const ScheduleRideScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState('d2');
  const [selectedTime, setSelectedTime] = useState('07:30 AM');
  const [selectedRide, setSelectedRide] = useState('std');
  const [pickup, setPickup] = useState('Acacia Mall, Kololo');
  const [destination, setDestination] = useState('Entebbe International Airport');

  const handleConfirmSchedule = () => {
    const chosenRide = RIDE_TYPES.find((r) => r.id === selectedRide);
    Alert.alert(
      'Ride Scheduled Successfully!',
      `Your ${chosenRide.title} is reserved for tomorrow at ${selectedTime}.\nYour driver will arrive 10 minutes early.`,
      [
        {
          text: 'View in Trips',
          onPress: () => {
            navigation.navigate('History');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Schedule a Ride" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Route Card */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>TRIP LOCATIONS</Text>
          <TouchableOpacity
            style={styles.locationRow}
            onPress={() => navigation.navigate('SelectLocationMap', { type: 'pickup' })}
          >
            <View style={[styles.dot, { backgroundColor: colors.primary }]} />
            <View style={styles.locationTextCol}>
              <Text style={styles.locLabel}>PICKUP LOCATION</Text>
              <Text style={styles.locAddress}>{pickup}</Text>
            </View>
            <Icon name="pencil" size={16} color={colors.textTertiary} />
          </TouchableOpacity>

          <View style={styles.routeDivider} />

          <TouchableOpacity
            style={styles.locationRow}
            onPress={() => navigation.navigate('SelectLocationMap', { type: 'destination' })}
          >
            <View style={[styles.dot, { backgroundColor: colors.dark }]} />
            <View style={styles.locationTextCol}>
              <Text style={styles.locLabel}>DESTINATION</Text>
              <Text style={styles.locAddress}>{destination}</Text>
            </View>
            <Icon name="pencil" size={16} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Date Selector */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>SELECT DATE</Text>
          <View style={styles.datesRow}>
            {DATES.map((item) => {
              const isSelected = selectedDate === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.dateBtn, isSelected && styles.dateBtnSelected]}
                  onPress={() => setSelectedDate(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dateBtnLabel, isSelected && styles.dateBtnLabelSelected]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.dateBtnSub, isSelected && styles.dateBtnSubSelected]}>
                    {item.sub}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Time Slots */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>PICKUP TIME</Text>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity
                  key={time}
                  style={[styles.timeBtn, isSelected && styles.timeBtnSelected]}
                  onPress={() => setSelectedTime(time)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.timeBtnText, isSelected && styles.timeBtnTextSelected]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Ride Tier Selection */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>CHOOSE RIDE TYPE</Text>
          {RIDE_TYPES.map((ride) => {
            const isSelected = selectedRide === ride.id;
            return (
              <TouchableOpacity
                key={ride.id}
                style={[styles.rideRow, isSelected && styles.rideRowSelected]}
                onPress={() => setSelectedRide(ride.id)}
                activeOpacity={0.8}
              >
                <View style={styles.rideIconContainer}>
                  <Icon name={ride.icon} size={22} color={colors.dark} />
                </View>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideTitle}>{ride.title}</Text>
                  <Text style={styles.rideCap}>{ride.capacity}</Text>
                </View>
                <Text style={styles.rideFare}>{ride.fare}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Bottom CTA */}
        <View style={styles.ctaWrapper}>
          <TamblaButton
            title="Confirm Scheduled Ride"
            variant="primary"
            onPress={handleConfirmSchedule}
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
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    ...shadows.xs,
  },
  cardSectionTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  locationTextCol: {
    flex: 1,
  },
  locLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textTertiary,
  },
  locAddress: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  routeDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
    marginLeft: 22,
  },
  datesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dateBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: radius.sm,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateBtnSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateBtnLabel: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  dateBtnLabelSelected: {
    color: colors.dark,
  },
  dateBtnSub: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dateBtnSubSelected: {
    color: colors.dark,
    fontWeight: '600',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeBtn: {
    width: '23%',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: radius.xs,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeBtnSelected: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  timeBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  timeBtnTextSelected: {
    color: colors.white,
  },
  rideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  rideRowSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFFDF5',
  },
  rideIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rideInfo: {
    flex: 1,
  },
  rideTitle: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  rideCap: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rideFare: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  ctaWrapper: {
    marginTop: 8,
  },
});

export default ScheduleRideScreen;
