/**
 * DriverProfileScreen — Dedicated Driver Account & Vehicle Hub.
 *
 * Exclusively contains driver features:
 * - Driver verification, rating, and vehicle summary
 * - Vehicle Details & Inspection status
 * - Driver Documents & Compliance (Driving Permit, PSV, ID)
 * - Weekly Dispatch Subscription status
 * - Driver Payout Accounts (MTN MoMo, Airtel, Bank)
 * - Driver Safety, Support & Navigation settings
 * - Clean "Switch to Rider App" action
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import SettingRow from '../../components/common/SettingRow';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const DriverProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader
        title="Driver Account"
        rightIcon="settings-outline"
        onRightPress={() => navigation.navigate('Settings')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Driver Profile Header Card */}
        <TouchableOpacity
          style={styles.profileHeaderCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <ProfileAvatar name="Musa Ssebufu" size={64} />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>Musa Ssebufu</Text>
              <Icon name="shield-checkmark" size={17} color={colors.primary} />
            </View>
            <Text style={styles.partnerBadge}>Gold Partner Driver • ★ 4.96</Text>
            <Text style={styles.vehicleSubtitle}>Toyota Corolla — UAX 123Z (Silver)</Text>
          </View>
        </TouchableOpacity>

        {/* Driver Performance Metrics Bar */}
        <View style={styles.metricsBar}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>1,248</Text>
            <Text style={styles.metricLabel}>Trips Done</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>98.4%</Text>
            <Text style={styles.metricLabel}>Acceptance</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>4.96</Text>
            <Text style={styles.metricLabel}>Rating</Text>
          </View>
        </View>

        {/* Switch to Passenger Mode Card */}
        <View style={styles.switchModeCard}>
          <View style={styles.switchTextCol}>
            <Text style={styles.switchTitle}>Need a Ride Today?</Text>
            <Text style={styles.switchSubtitle}>Switch to Rider Mode to book a cab or boda</Text>
          </View>
          <TouchableOpacity
            style={styles.switchBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Passenger')}
          >
            <Icon name="swap-horizontal" size={15} color={colors.dark} style={{ marginRight: 4 }} />
            <Text style={styles.switchBtnText}>Rider Mode</Text>
          </TouchableOpacity>
        </View>

        {/* DRIVER OPERATIONS & VEHICLE SECTION */}
        <Text style={styles.sectionHeaderTitle}>VEHICLE & COMPLIANCE</Text>
        <View style={styles.menuSection}>
          <SettingRow
            icon="car-outline"
            label="Vehicle Details"
            detail="Toyota Corolla — UAX 123Z"
            onPress={() => navigation.navigate('VehicleDetails')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="document-text-outline"
            label="Driver Documents"
            detail="Permit, PSV, ID"
            badge="Verified"
            badgeStatus="verified"
            onPress={() => navigation.navigate('DriverDocuments')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="ribbon-outline"
            label="Weekly Driver Subscription"
            detail="UGX 20,000 / week"
            badge="Active"
            badgeStatus="active"
            onPress={() => navigation.navigate('DriverSubscription')}
          />
        </View>

        {/* DRIVER FINANCES & PAYOUTS */}
        <Text style={styles.sectionHeaderTitle}>FINANCIAL & EARNINGS</Text>
        <View style={styles.menuSection}>
          <SettingRow
            icon="cash-outline"
            label="Cash Out & Payout Accounts"
            detail="MTN MoMo, Stanbic Bank"
            onPress={() => navigation.navigate('WithdrawFunds')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="trending-up-outline"
            label="Weekly Earnings Statements"
            detail="View revenue breakdown"
            onPress={() => navigation.navigate('EarningsMain')}
          />
        </View>

        {/* DRIVER SAFETY & SUPPORT */}
        <Text style={styles.sectionHeaderTitle}>SAFETY & DRIVER SUPPORT</Text>
        <View style={styles.menuSection}>
          <SettingRow
            icon="shield-outline"
            label="Driver Safety Toolkit & SOS"
            detail="24/7 Roadside emergency"
            onPress={() => navigation.navigate('SafetyToolkit')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="help-circle-outline"
            label="Driver Help & Fare Disputes"
            detail="Tolls, cancellations, tips"
            onPress={() => navigation.navigate('HelpCenter')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="chatbubbles-outline"
            label="Driver Support Chat"
            onPress={() => navigation.navigate('SupportChat', { topic: 'Driver Partner Support' })}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="settings-outline"
            label="Navigation & App Settings"
            detail="Maps, audio alerts"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>

        {/* Log Out */}
        <View style={styles.logoutSection}>
          <SettingRow
            icon="log-out-outline"
            label="Log Out of Driver Account"
            danger
            showChevron={false}
            onPress={() => {
              Alert.alert('Log Out', 'Are you sure you want to go offline and log out?', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Log Out',
                  style: 'destructive',
                  onPress: () => navigation.navigate('Auth'),
                },
              ]);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.dark,
  },
  partnerBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 2,
  },
  vehicleSubtitle: {
    fontSize: 11.5,
    color: colors.textTertiary,
    marginTop: 2,
    fontWeight: '500',
  },
  metricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.screenHorizontal,
    marginTop: 12,
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    ...shadows.sm,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.dark,
  },
  metricLabel: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 2,
    fontWeight: '600',
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
  },
  switchModeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF3C7',
    marginHorizontal: spacing.screenHorizontal,
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  switchTextCol: {
    flex: 1,
    marginRight: 10,
  },
  switchTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#92400E',
  },
  switchSubtitle: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2,
  },
  switchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    ...shadows.sm,
  },
  switchBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.dark,
  },
  sectionHeaderTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.textTertiary,
    letterSpacing: 0.8,
    marginHorizontal: spacing.screenHorizontal,
    marginTop: 20,
    marginBottom: 8,
  },
  menuSection: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.screenHorizontal,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECECEC',
    ...shadows.sm,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#F0F0F0',
    marginLeft: 54,
  },
  logoutSection: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.screenHorizontal,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    marginTop: 24,
  },
});

export default DriverProfileScreen;
