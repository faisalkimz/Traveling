/**
 * DeliveryTrackingScreen — Live Parcel Tracking & Courier Dispatch
 *
 * Real-time parcel transit tracking on map, recipient delivery verification PIN,
 * courier details, and delivery completion flow.
 */
import React from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const DeliveryTrackingScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const delivery = route?.params?.delivery || {
    trackingNumber: 'DEL-UG-8821',
    sender: 'Acacia Mall, Kololo',
    recipient: 'Bugolobi Village Mall, Spring Road',
    recipientPhone: '0752 987 654',
    fare: 'UGX 8,500',
    otp: '5924',
    courier: {
      name: 'Ronald Kato',
      vehicle: 'Bajaj Boxer Boda (UGX 882M)',
      rating: 4.9,
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader
        title="Delivery Tracking"
        onBack={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('Home', { screen: 'PassengerHome' });
          }
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Tracking Code & Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <View>
              <Text style={styles.trackingNum}>{delivery.trackingNumber}</Text>
              <Text style={styles.statusMain}>Courier on the way to dropoff</Text>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>In Transit</Text>
            </View>
          </View>

          {/* Delivery OTP Box */}
          <View style={styles.otpBox}>
            <View>
              <Text style={styles.otpLabel}>DELIVERY CONFIRMATION PIN</Text>
              <Text style={styles.otpSub}>Recipient gives this PIN to courier on arrival</Text>
            </View>
            <Text style={styles.otpCode}>{delivery.otp}</Text>
          </View>
        </View>

        {/* Courier Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>COURIER DETAILS</Text>
          <View style={styles.courierRow}>
            <View style={styles.courierAvatar}>
              <Text style={styles.courierInitial}>
                {delivery.courier.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.courierInfo}>
              <Text style={styles.courierName}>{delivery.courier.name}</Text>
              <Text style={styles.courierVehicle}>{delivery.courier.vehicle}</Text>
            </View>
            <View style={styles.actionBtns}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => Alert.alert('Call Courier', `Calling ${delivery.courier.name}...`)}
              >
                <Icon name="call" size={18} color={colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => Alert.alert('Chat', 'Opening chat with courier...')}
              >
                <Icon name="chatbubble" size={18} color={colors.dark} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Route Card */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>PARCEL ROUTE</Text>
          <View style={styles.routeRow}>
            <View style={[styles.dot, { backgroundColor: colors.primary }]} />
            <View style={styles.routeCol}>
              <Text style={styles.routeType}>PICKUP</Text>
              <Text style={styles.routeAddress}>{delivery.sender}</Text>
            </View>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeRow}>
            <View style={[styles.dot, { backgroundColor: colors.dark }]} />
            <View style={styles.routeCol}>
              <Text style={styles.routeType}>DROPOFF</Text>
              <Text style={styles.routeAddress}>{delivery.recipient}</Text>
            </View>
          </View>
        </View>

        <View style={styles.ctaWrapper}>
          <TamblaButton
            title="Back to Home"
            variant="primary"
            onPress={() => navigation.navigate('Home', { screen: 'PassengerHome' })}
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
  statusCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    ...shadows.sm,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  trackingNum: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
  },
  statusMain: {
    ...typography.subheading,
    color: colors.textPrimary,
    marginTop: 2,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  otpBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark,
    padding: 14,
    borderRadius: radius.md,
  },
  otpLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  otpSub: {
    fontSize: 11,
    color: colors.textOnDarkSecondary,
    marginTop: 2,
    maxWidth: 200,
  },
  otpCode: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 2,
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
  courierRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courierAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  courierInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.dark,
  },
  courierInfo: {
    flex: 1,
  },
  courierName: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  courierVehicle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actionBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  routeCol: {
    flex: 1,
  },
  routeType: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textTertiary,
  },
  routeAddress: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: colors.borderDarker,
    marginLeft: 4,
    marginVertical: 2,
  },
  ctaWrapper: {
    marginTop: 8,
  },
});

export default DeliveryTrackingScreen;
