/**
 * DriverActiveTripScreen — Driver Trip in Progress & Trip End
 *
 * Live route navigation, destination details, safety trigger,
 * and completion flow with fare summary and passenger rating.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const DriverActiveTripScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const passenger = route?.params?.passenger || {
    name: 'Sarah Namukasa',
    rating: 4.9,
    destination: 'Entebbe International Airport',
    fare: 'UGX 44,000',
    payment: 'MTN Mobile Money',
  };

  const [tripEnded, setTripEnded] = useState(false);
  const [rating, setRating] = useState(5);

  const handleFinish = () => {
    setTripEnded(false);
    navigation.navigate('DriverHome');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      {/* Map simulation */}
      <View style={styles.map}>
        <View style={styles.highwayRoad} />
        <View style={styles.carMarker}>
          <Icon name="navigate" size={24} color={colors.primary} />
        </View>
      </View>

      {/* Top Navigation Banner */}
      <View style={[styles.navBanner, { paddingTop: insets.top + 8 }]}>
        <View style={styles.turnIconBg}>
          <Icon name="git-commit-outline" size={24} color={colors.dark} />
        </View>
        <View style={styles.navTextCol}>
          <Text style={styles.turnDistance}>Follow Expressway • 28 km</Text>
          <Text style={styles.turnInstruction}>Continue straight to Entebbe Airport exit</Text>
        </View>
        <View style={styles.speedBadge}>
          <Text style={styles.speedValue}>72</Text>
          <Text style={styles.speedUnit}>km/h</Text>
        </View>
      </View>

      {/* Bottom Floating Control Card */}
      <View style={[styles.bottomCard, { paddingBottom: Math.max(insets.bottom + 16, 24) }]}>
        <View style={styles.sheetHandle} />

        {/* Trip Stats */}
        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>ESTIMATED ARRIVAL</Text>
            <Text style={styles.statTime}>28 mins (10:42 AM)</Text>
          </View>
          <View style={styles.remainingBadge}>
            <Text style={styles.remainingText}>31.2 km left</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Destination & Passenger */}
        <View style={styles.destinationRow}>
          <View style={styles.destDot} />
          <View style={styles.destCol}>
            <Text style={styles.destLabel}>DROPOFF</Text>
            <Text style={styles.destAddress} numberOfLines={1}>
              {passenger.destination}
            </Text>
            <Text style={styles.passengerMeta}>
              Passenger: {passenger.name} • {passenger.fare}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.safetyBtn}
            onPress={() => navigation.navigate('SafetyToolkit', { trip: passenger })}
          >
            <Icon name="shield-outline" size={20} color={colors.danger} />
          </TouchableOpacity>
        </View>

        {/* Complete Trip CTA */}
        <View style={styles.ctaWrapper}>
          <TamblaButton
            title="Complete Trip"
            variant="primary"
            onPress={() => setTripEnded(true)}
          />
        </View>
      </View>

      {/* Trip Completed Summary Modal */}
      <Modal visible={tripEnded} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { paddingBottom: Math.max(insets.bottom + 16, 24) }]}>
            <View style={styles.modalIconBg}>
              <Icon name="checkmark-circle" size={48} color={colors.success} />
            </View>
            <Text style={styles.modalTitle}>Trip Completed!</Text>
            <Text style={styles.modalSub}>Fare automatically collected</Text>

            <View style={styles.fareBox}>
              <Text style={styles.fareBoxLabel}>TOTAL EARNED</Text>
              <Text style={styles.fareBoxAmount}>{passenger.fare}</Text>
              <Text style={styles.fareBoxPayment}>Paid via {passenger.payment}</Text>
            </View>

            {/* Rate Passenger */}
            <Text style={styles.rateLabel}>Rate passenger {passenger.name}</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Icon
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={32}
                    color={star <= rating ? colors.starYellow : colors.borderDarker}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ width: '100%', marginTop: 24 }}>
              <TamblaButton
                title="Back to Online"
                variant="primary"
                onPress={handleFinish}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1E293B',
  },
  highwayRoad: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '48%',
    width: 32,
    backgroundColor: '#334155',
  },
  carMarker: {
    position: 'absolute',
    top: '45%',
    left: '49%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  navBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkCard,
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBorder,
    ...shadows.md,
  },
  turnIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  navTextCol: {
    flex: 1,
  },
  turnDistance: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  turnInstruction: {
    ...typography.caption,
    color: colors.white,
    marginTop: 2,
  },
  speedBadge: {
    backgroundColor: colors.dark,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.darkBorder,
    alignItems: 'center',
  },
  speedValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.white,
  },
  speedUnit: {
    fontSize: 9,
    color: colors.textOnDarkSecondary,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.darkCard,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.darkBorder,
    ...shadows.lg,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.darkBorder,
    alignSelf: 'center',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textOnDarkSecondary,
    letterSpacing: 0.5,
  },
  statTime: {
    ...typography.subheading,
    color: colors.white,
    marginTop: 2,
  },
  remainingBadge: {
    backgroundColor: colors.dark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.darkBorder,
  },
  remainingText: {
    ...typography.captionBold,
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.darkBorder,
    marginVertical: 12,
  },
  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  destDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginRight: 12,
  },
  destCol: {
    flex: 1,
  },
  destLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textOnDarkSecondary,
  },
  destAddress: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.white,
  },
  passengerMeta: {
    ...typography.caption,
    color: colors.textOnDarkSecondary,
    marginTop: 2,
  },
  safetyBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  ctaWrapper: {
    marginTop: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: 24,
    alignItems: 'center',
  },
  modalIconBg: {
    marginBottom: 10,
  },
  modalTitle: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  modalSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  fareBox: {
    width: '100%',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.md,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  fareBoxLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    fontWeight: '700',
  },
  fareBoxAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    marginVertical: 4,
  },
  fareBoxPayment: {
    ...typography.captionBold,
    color: colors.success,
  },
  rateLabel: {
    ...typography.bodySecondary,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 10,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default DriverActiveTripScreen;
