/**
 * DriverNavigatingScreen — Driver En Route to Pickup
 *
 * GPS turn-by-turn simulation banner, route map, passenger contact actions,
 * and "Arrived at Pickup" / "Start Trip" transitions.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const DriverNavigatingScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const passenger = route?.params?.passenger || {
    name: 'Sarah Namukasa',
    rating: 4.9,
    pickup: 'Acacia Mall, Kisementi, Kololo',
    destination: 'Entebbe International Airport',
    fare: 'UGX 44,000',
    payment: 'MTN Mobile Money',
  };

  const [hasArrived, setHasArrived] = useState(false);

  const handleStartTrip = () => {
    navigation.replace('DriverActiveTrip', { passenger });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      {/* Map simulation */}
      <View style={styles.map}>
        <View style={styles.mapRoad1} />
        <View style={styles.mapRoad2} />
        <View style={styles.carMarker}>
          <Icon name="navigate" size={24} color={colors.primary} />
        </View>
        <View style={styles.pickupTarget}>
          <Icon name="location" size={30} color={colors.white} />
        </View>
      </View>

      {/* Top Turn-by-Turn Navigation Banner */}
      <View style={[styles.navBanner, { paddingTop: insets.top + 8 }]}>
        <View style={styles.turnIconBg}>
          <Icon name="arrow-up-outline" size={26} color={colors.dark} />
        </View>
        <View style={styles.navTextCol}>
          <Text style={styles.turnDistance}>
            {hasArrived ? 'Arrived at pickup location' : 'In 250 m'}
          </Text>
          <Text style={styles.turnInstruction}>
            {hasArrived ? 'Wait for passenger Sarah Namukasa' : 'Turn right on Kira Road towards Acacia Mall'}
          </Text>
        </View>
      </View>

      {/* Bottom Passenger Card */}
      <View style={[styles.bottomCard, { paddingBottom: Math.max(insets.bottom + 16, 24) }]}>
        <View style={styles.sheetHandle} />

        {/* Passenger Info & Actions */}
        <View style={styles.passengerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{passenger.name.charAt(0)}</Text>
          </View>
          <View style={styles.passengerInfo}>
            <Text style={styles.passengerName}>{passenger.name}</Text>
            <Text style={styles.pickupSub} numberOfLines={1}>{passenger.pickup}</Text>
          </View>

          {/* Call & Message Actions */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => Alert.alert('Call Passenger', `Calling ${passenger.name}...`)}
            >
              <Icon name="call" size={18} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => Alert.alert('Chat', `Opening message thread with ${passenger.name}`)}
            >
              <Icon name="chatbubble" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Status Indicator */}
        <View style={styles.statusRow}>
          <View style={styles.statusIndicator}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: hasArrived ? colors.success : colors.primary },
              ]}
            />
            <Text style={styles.statusText}>
              {hasArrived ? 'Arrived • Passenger Notified' : 'En Route to Pickup • 3 mins ETA'}
            </Text>
          </View>
          <Text style={styles.fareTag}>{passenger.fare}</Text>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaWrapper}>
          {!hasArrived ? (
            <TamblaButton
              title="I Have Arrived at Pickup"
              variant="primary"
              onPress={() => setHasArrived(true)}
            />
          ) : (
            <TamblaButton
              title="Start Trip (PIN: 4821)"
              variant="primary"
              onPress={handleStartTrip}
            />
          )}
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
    backgroundColor: '#1E293B',
  },
  mapRoad1: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    height: 18,
    backgroundColor: '#334155',
  },
  mapRoad2: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 22,
    backgroundColor: '#334155',
  },
  carMarker: {
    position: 'absolute',
    top: '48%',
    left: '48%',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  pickupTarget: {
    position: 'absolute',
    top: '35%',
    left: '49%',
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
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.dark,
    borderWidth: 1,
    borderColor: colors.darkBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerName: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.white,
  },
  pickupSub: {
    ...typography.caption,
    color: colors.textOnDarkSecondary,
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.dark,
    borderWidth: 1,
    borderColor: colors.darkBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.darkBorder,
    marginVertical: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    ...typography.captionBold,
    color: colors.white,
  },
  fareTag: {
    ...typography.captionBold,
    color: colors.primary,
  },
  ctaWrapper: {
    marginTop: 4,
  },
});

export default DriverNavigatingScreen;
