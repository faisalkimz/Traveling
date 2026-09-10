/**
 * ProfileScreen — Dedicated Passenger (Client) Account & Preferences.
 *
 * 100% Passenger-focused:
 * - Rider personal info, rating, and trip statistics
 * - Saved places (Home, Work, Favorites)
 * - Payment methods & Wallet shortcut
 * - Passenger Safety Toolkit & Emergency contacts
 * - Parcel delivery access
 * - Help Center & Lost Item reporting
 * - Uber-style "Drive with Tambula" recruitment card to switch to Driver Mode
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
import Icon from '@expo/vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import ProfileAvatar from '../../components/common/ProfileAvatar';
import SettingRow from '../../components/common/SettingRow';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader
        title="Account"
        rightIcon="settings-outline"
        onRightPress={() => navigation.navigate('Settings')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Passenger Profile Header Card */}
        <TouchableOpacity
          style={styles.profileHeaderCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <ProfileAvatar name="Sarah Namukasa" size={64} />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>Sarah Namukasa</Text>
              <View style={styles.riderPill}>
                <Text style={styles.riderPillText}>Rider</Text>
              </View>
            </View>
            <Text style={styles.profileRole}>★ 4.95 Rating • Member since 2024</Text>
            <Text style={styles.phoneText}>+256 772 123 456</Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
        </TouchableOpacity>

        {/* Passenger Stats Bar */}
        <View style={styles.metricsBar}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>38</Text>
            <Text style={styles.metricLabel}>Rides Taken</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>★ 4.95</Text>
            <Text style={styles.metricLabel}>Rider Score</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>Level 2</Text>
            <Text style={styles.metricLabel}>Rewards</Text>
          </View>
        </View>

        {/* Uber-style "Drive with Tambula" Opportunity Banner */}
        <View style={styles.driveBanner}>
          <View style={styles.driveIconSquircle}>
            <Icon name="car-sport" size={24} color={colors.dark} />
          </View>
          <View style={styles.driveTextCol}>
            <Text style={styles.driveTitle}>Want to Earn in Kampala?</Text>
            <Text style={styles.driveSubtitle}>
              Drive your car or boda with Tambula. Flexible hours & weekly payouts.
            </Text>
            <TouchableOpacity
              style={styles.driveBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Driver')}
            >
              <Text style={styles.driveBtnText}>Switch to Driver Mode →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PASSENGER PREFERENCES & TRIPS */}
        <Text style={styles.sectionHeaderTitle}>MY PLACES & PAYMENTS</Text>
        <View style={styles.menuSection}>
          <SettingRow
            icon="bookmark-outline"
            label="Saved Places"
            detail="Home, Work, Acacia Mall"
            onPress={() => navigation.navigate('SavedPlaces')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="wallet-outline"
            label="Payment Methods"
            detail="MTN MoMo, Airtel, Cards"
            onPress={() => navigation.navigate('ChoosePayment')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="cube-outline"
            label="Send a Parcel (Courier)"
            detail="Door-to-door delivery"
            onPress={() => navigation.navigate('DeliveryHome')}
          />
        </View>

        {/* PASSENGER SAFETY & SUPPORT */}
        <Text style={styles.sectionHeaderTitle}>SAFETY & SUPPORT</Text>
        <View style={styles.menuSection}>
          <SettingRow
            icon="shield-checkmark-outline"
            label="Safety Toolkit & Trusted Contacts"
            detail="Share trip status, Emergency SOS"
            onPress={() => navigation.navigate('SafetyToolkit')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="help-buoy-outline"
            label="Find Lost Item"
            detail="Contact driver about items left behind"
            onPress={() => navigation.navigate('LostItem')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="help-circle-outline"
            label="Help & Customer Support"
            detail="FAQs, fare review, receipts"
            onPress={() => navigation.navigate('HelpCenter')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="chatbubbles-outline"
            label="Tambula Support Chat"
            onPress={() => navigation.navigate('SupportChat', { topic: 'Customer Support' })}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="settings-outline"
            label="Settings"
            detail="Language, notifications, privacy"
            onPress={() => navigation.navigate('Settings')}
          />
          <View style={styles.separator} />
          <SettingRow
            icon="sparkles-outline"
            label="App Tour & Features"
            detail="Revisit the Tambula onboarding guide"
            onPress={() => navigation.navigate('Auth', { screen: 'Onboarding' })}
          />
        </View>

        {/* Log Out */}
        <View style={styles.logoutSection}>
          <SettingRow
            icon="log-out-outline"
            label="Log Out"
            danger
            showChevron={false}
            onPress={() => {
              Alert.alert('Log Out', 'Are you sure you want to log out of Tambula?', [
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
    gap: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.dark,
  },
  riderPill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  riderPillText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  profileRole: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 3,
  },
  phoneText: {
    fontSize: 11.5,
    color: colors.textTertiary,
    marginTop: 2,
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
  driveBanner: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    marginHorizontal: spacing.screenHorizontal,
    marginTop: 14,
    padding: 16,
    borderRadius: 16,
    ...shadows.sm,
  },
  driveIconSquircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  driveTextCol: {
    flex: 1,
  },
  driveTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.dark,
  },
  driveSubtitle: {
    fontSize: 12,
    color: colors.dark,
    opacity: 0.82,
    marginTop: 3,
    lineHeight: 16,
  },
  driveBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.dark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    marginTop: 10,
  },
  driveBtnText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: colors.white,
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

export default ProfileScreen;
