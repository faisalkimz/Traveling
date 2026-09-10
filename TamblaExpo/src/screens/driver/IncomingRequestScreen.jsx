/**
 * IncomingRequestScreen — Driver Ride Dispatch State
 *
 * Full-screen dispatch alert with countdown progress, pickup distance,
 * route destinations, net earnings in UGX, and Accept/Decline actions.
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const { width } = Dimensions.get('window');

const IncomingRequestScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [countdown, setCountdown] = useState(15);
  const progressAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 15000,
      useNativeDriver: false,
    }).start();

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigation.goBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigation, progressAnim]);

  const handleAccept = () => {
    navigation.replace('DriverNavigating', {
      passenger: {
        name: 'Sarah Namukasa',
        rating: 4.9,
        rides: 34,
        pickup: 'Acacia Mall, Kisementi, Kololo',
        destination: 'Entebbe International Airport',
        fare: 'UGX 44,000',
        payment: 'MTN Mobile Money',
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      {/* Map simulation */}
      <View style={styles.map}>
        <View style={styles.mapRoad1} />
        <View style={styles.mapRoad2} />
        <View style={styles.pickupPinContainer}>
          <View style={styles.pinBubble}>
            <Text style={styles.pinBubbleText}>Pickup (2.1 km away)</Text>
          </View>
          <View style={styles.pinCircle}>
            <Icon name="person" size={18} color={colors.dark} />
          </View>
        </View>
      </View>

      {/* Top Banner Alert */}
      <View style={[styles.topBanner, { paddingTop: insets.top + 8 }]}>
        <View style={styles.bannerRow}>
          <View style={styles.pulseDot} />
          <Text style={styles.bannerTitle}>NEW RIDE REQUEST</Text>
        </View>
        <Text style={styles.countdownNumber}>{countdown}s</Text>
      </View>

      {/* Bottom Dispatch Card */}
      <View style={[styles.bottomCard, { paddingBottom: Math.max(insets.bottom + 16, 24) }]}>
        {/* Countdown Progress Bar */}
        <View style={styles.progressBarBg}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        {/* Earnings & Tier Row */}
        <View style={styles.earningsRow}>
          <View>
            <Text style={styles.earningsLabel}>ESTIMATED EARNINGS</Text>
            <Text style={styles.earningsValue}>UGX 44,000</Text>
          </View>
          <View style={styles.rideBadge}>
            <Text style={styles.rideBadgeText}>Standard (4 seats)</Text>
          </View>
        </View>

        {/* Passenger mini info */}
        <View style={styles.passengerRow}>
          <View style={styles.passengerAvatar}>
            <Text style={styles.passengerInitial}>S</Text>
          </View>
          <View style={styles.passengerDetails}>
            <Text style={styles.passengerName}>Sarah Namukasa</Text>
            <View style={styles.passengerRating}>
              <Icon name="star" size={12} color={colors.starYellow} />
              <Text style={styles.ratingText}>4.9 (34 trips)</Text>
            </View>
          </View>
          <View style={styles.paymentMethod}>
            <Text style={styles.paymentText}>MTN MoMo</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Route Details */}
        <View style={styles.routeContainer}>
          <View style={styles.routeRow}>
            <View style={[styles.dot, { backgroundColor: colors.primary }]} />
            <View style={styles.routeCol}>
              <Text style={styles.routeType}>PICKUP • 5 mins away</Text>
              <Text style={styles.routeText} numberOfLines={1}>
                Acacia Mall, Kisementi, Kololo
              </Text>
            </View>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeRow}>
            <View style={[styles.dot, { backgroundColor: colors.white }]} />
            <View style={styles.routeCol}>
              <Text style={styles.routeType}>DESTINATION • 38.5 km</Text>
              <Text style={styles.routeText} numberOfLines={1}>
                Entebbe International Airport
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.declineBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={handleAccept}
            activeOpacity={0.8}
          >
            <Text style={styles.acceptText}>Accept Ride</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    backgroundColor: '#1C2430',
  },
  mapRoad1: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    height: 16,
    backgroundColor: '#2A3444',
  },
  mapRoad2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '45%',
    width: 20,
    backgroundColor: '#2A3444',
  },
  pickupPinContainer: {
    position: 'absolute',
    top: '25%',
    left: '42%',
    alignItems: 'center',
  },
  pinBubble: {
    backgroundColor: colors.darkCard,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 6,
  },
  pinBubbleText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  pinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  topBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: 12,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  bannerTitle: {
    ...typography.captionBold,
    color: colors.white,
    letterSpacing: 0.8,
  },
  countdownNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
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
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  earningsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textOnDarkSecondary,
    letterSpacing: 0.5,
  },
  earningsValue: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  rideBadge: {
    backgroundColor: 'rgba(255,204,0,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.xs,
  },
  rideBadgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  passengerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.darkBorder,
  },
  passengerInitial: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  passengerDetails: {
    flex: 1,
  },
  passengerName: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.white,
  },
  passengerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    ...typography.caption,
    color: colors.textOnDarkSecondary,
  },
  paymentMethod: {
    backgroundColor: colors.dark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.darkBorder,
  },
  paymentText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.darkBorder,
    marginBottom: 12,
  },
  routeContainer: {
    marginBottom: 16,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  routeCol: {
    flex: 1,
  },
  routeType: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textOnDarkSecondary,
  },
  routeText: {
    ...typography.bodySecondary,
    color: colors.white,
  },
  routeLine: {
    width: 2,
    height: 14,
    backgroundColor: colors.darkBorder,
    marginLeft: 3,
    marginVertical: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  declineBtn: {
    flex: 1,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.dark,
    borderWidth: 1,
    borderColor: colors.darkBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineText: {
    ...typography.bodyBold,
    color: colors.textOnDarkSecondary,
  },
  acceptBtn: {
    flex: 2,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptText: {
    ...typography.bodyBold,
    color: colors.dark,
  },
});

export default IncomingRequestScreen;
