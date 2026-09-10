/**
 * ShareTripScreen — Share Live Trip Tracking
 *
 * Allows passengers to share their live trip link, driver identity,
 * vehicle plate, and ETA via WhatsApp, SMS, or system share sheet.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Share,
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

const ShareTripScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const trip = route?.params?.trip || {
    driverName: 'Musa Ssebufu',
    rating: 4.8,
    vehicle: 'Toyota Corolla (White)',
    plate: 'UAX 123Z',
    pickup: 'Acacia Mall, Kololo',
    destination: 'Entebbe International Airport',
    eta: '18 mins',
    trackingUrl: 'https://tambla.ug/track/TRIP-9842',
  };

  const [copied, setCopied] = useState(false);

  const handleNativeShare = async () => {
    try {
      await Share.share({
        message: `I'm on my way in a Tambula ride with driver ${trip.driverName} (${trip.vehicle}, ${trip.plate}). Track my live trip to ${trip.destination}: ${trip.trackingUrl}`,
        title: 'Tambula Trip Tracking',
      });
    } catch (error) {
      Alert.alert('Share Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Share Trip Status" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View style={styles.card}>
          <View style={styles.driverHeader}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitial}>
                {trip.driverName?.charAt(0) || 'M'}
              </Text>
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{trip.driverName}</Text>
              <View style={styles.ratingBadge}>
                <Icon name="star" size={13} color={colors.starYellow} />
                <Text style={styles.ratingText}>{trip.rating}</Text>
              </View>
            </View>
            <View style={styles.etaContainer}>
              <Text style={styles.etaLabel}>ETA</Text>
              <Text style={styles.etaValue}>{trip.eta}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Vehicle info */}
          <View style={styles.infoRow}>
            <Icon name="car-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.infoText}>{trip.vehicle}</Text>
            <View style={styles.plateBadge}>
              <Text style={styles.plateText}>{trip.plate}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Route info */}
          <View style={styles.routeContainer}>
            <View style={styles.routeRow}>
              <View style={[styles.routeDot, { backgroundColor: colors.primary }]} />
              <View style={styles.routeTextCol}>
                <Text style={styles.routeLabel}>PICKUP</Text>
                <Text style={styles.routeAddress} numberOfLines={1}>{trip.pickup}</Text>
              </View>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routeRow}>
              <View style={[styles.routeDot, { backgroundColor: colors.dark }]} />
              <View style={styles.routeTextCol}>
                <Text style={styles.routeLabel}>DESTINATION</Text>
                <Text style={styles.routeAddress} numberOfLines={1}>{trip.destination}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tracking Link Preview */}
        <View style={styles.linkCard}>
          <View style={styles.linkIconBg}>
            <Icon name="link" size={18} color={colors.dark} />
          </View>
          <View style={styles.linkTextCol}>
            <Text style={styles.linkLabel}>Live Tracking Link</Text>
            <Text style={styles.linkUrl} numberOfLines={1}>{trip.trackingUrl}</Text>
          </View>
          <TouchableOpacity
            style={styles.copyBtn}
            onPress={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2500);
            }}
          >
            <Text style={styles.copyBtnText}>{copied ? 'Copied!' : 'Copy'}</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Send Options */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>QUICK SHARE WITH</Text>
        </View>

        <TouchableOpacity
          style={styles.contactRow}
          activeOpacity={0.8}
          onPress={handleNativeShare}
        >
          <View style={[styles.contactAvatar, { backgroundColor: '#25D366' }]}>
            <Icon name="logo-whatsapp" size={20} color={colors.white} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>WhatsApp</Text>
            <Text style={styles.contactSub}>Send tracking link directly to chat</Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactRow}
          activeOpacity={0.8}
          onPress={handleNativeShare}
        >
          <View style={[styles.contactAvatar, { backgroundColor: colors.dark }]}>
            <Icon name="chatbubble-ellipses" size={20} color={colors.white} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>SMS Text Message</Text>
            <Text style={styles.contactSub}>Send via regular carrier SMS</Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
        </TouchableOpacity>

        <View style={styles.buttonWrapper}>
          <TamblaButton
            title="Share with Other Apps"
            variant="primary"
            icon={<Icon name="share-social-outline" size={18} color={colors.dark} />}
            onPress={handleNativeShare}
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
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    ...shadows.sm,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  driverInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.dark,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    ...typography.subheading,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  etaContainer: {
    alignItems: 'flex-end',
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.xs,
  },
  etaLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textTertiary,
  },
  etaValue: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    ...typography.bodySecondary,
    color: colors.textPrimary,
    flex: 1,
  },
  plateBadge: {
    backgroundColor: colors.dark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
  },
  plateText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  routeContainer: {
    paddingLeft: 4,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: colors.borderDarker,
    marginLeft: 4,
    marginVertical: 2,
  },
  routeTextCol: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textTertiary,
  },
  routeAddress: {
    ...typography.bodySecondary,
    color: colors.textPrimary,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  linkIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  linkTextCol: {
    flex: 1,
  },
  linkLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  linkUrl: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  copyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.xs,
  },
  copyBtnText: {
    ...typography.captionBold,
    color: colors.dark,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textTertiary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  contactAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  contactSub: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  buttonWrapper: {
    marginTop: 16,
  },
});

export default ShareTripScreen;
