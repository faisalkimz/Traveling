/**
 * SafetyToolkitScreen — Rider & Driver Safety Hub
 *
 * Restrained, reassuring UI for emergency assistance, trusted contacts,
 * trip sharing, and safety reporting.
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
import Icon from '@expo/vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const SafetyToolkitScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const trip = route?.params?.trip || {
    driverName: 'Musa Ssebufu',
    vehicle: 'Toyota Corolla (White)',
    plate: 'UAX 123Z',
    pickup: 'Acacia Mall, Kololo',
    destination: 'Entebbe Airport',
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Assistance',
      'Do you want to call the Uganda Police Emergency Service (999 / 112)?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call 999',
          style: 'destructive',
          onPress: () => Alert.alert('Simulated Call', 'Calling 999 Emergency Dispatch...'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader
        title="Safety Toolkit"
        onBack={() => navigation.goBack()}
        rightIcon="shield-checkmark"
        rightIconColor={colors.success}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Reassurance Banner */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerIconBg}>
            <Icon name="shield-half" size={24} color={colors.primary} />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Your Safety is Our Priority</Text>
            <Text style={styles.bannerSubtitle}>
              Every Tambula trip is GPS-tracked with verified drivers and 24/7 incident support.
            </Text>
          </View>
        </View>

        {/* Current Trip Context */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CURRENT TRIP DETAILS</Text>
        </View>
        <View style={styles.tripCard}>
          <View style={styles.tripRow}>
            <Icon name="person" size={16} color={colors.textSecondary} />
            <Text style={styles.tripLabel}>Driver:</Text>
            <Text style={styles.tripValue}>{trip.driverName}</Text>
          </View>
          <View style={styles.tripRow}>
            <Icon name="car" size={16} color={colors.textSecondary} />
            <Text style={styles.tripLabel}>Vehicle:</Text>
            <Text style={styles.tripValue}>{trip.vehicle}</Text>
          </View>
          <View style={styles.tripRow}>
            <Icon name="pricetag" size={16} color={colors.textSecondary} />
            <Text style={styles.tripLabel}>Plate:</Text>
            <Text style={styles.tripValueBadge}>{trip.plate}</Text>
          </View>
        </View>

        {/* Action Items */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SAFETY ACTIONS</Text>
        </View>

        {/* Emergency Assistance */}
        <TouchableOpacity
          style={[styles.actionCard, styles.emergencyCard]}
          activeOpacity={0.8}
          onPress={handleEmergencyCall}
        >
          <View style={[styles.actionIconBg, { backgroundColor: '#FEE2E2' }]}>
            <Icon name="call" size={20} color={colors.danger} />
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.danger }]}>
              Emergency Assistance (999 / 112)
            </Text>
            <Text style={styles.actionDesc}>
              Direct connection to Uganda emergency services and police dispatch.
            </Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.danger} />
        </TouchableOpacity>

        {/* Share Trip */}
        <TouchableOpacity
          style={styles.actionCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ShareTrip', { trip })}
        >
          <View style={[styles.actionIconBg, { backgroundColor: colors.primaryLight }]}>
            <Icon name="share-social" size={20} color={colors.dark} />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Share Trip Status</Text>
            <Text style={styles.actionDesc}>
              Send live tracking link and driver details to friends or family.
            </Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
        </TouchableOpacity>

        {/* Trusted Contacts */}
        <TouchableOpacity
          style={styles.actionCard}
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert('Trusted Contacts', '2 contacts currently configured to receive trip updates.');
          }}
        >
          <View style={[styles.actionIconBg, { backgroundColor: colors.backgroundSecondary }]}>
            <Icon name="people" size={20} color={colors.dark} />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Manage Trusted Contacts</Text>
            <Text style={styles.actionDesc}>
              Choose who automatically gets notified when you ride late at night.
            </Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
        </TouchableOpacity>

        {/* Report Safety Concern */}
        <TouchableOpacity
          style={styles.actionCard}
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert(
              'Report Safety Issue',
              'Tambula 24/7 Safety Team will review your report immediately.',
              [{ text: 'OK' }]
            );
          }}
        >
          <View style={[styles.actionIconBg, { backgroundColor: colors.backgroundSecondary }]}>
            <Icon name="alert-circle" size={20} color={colors.textSecondary} />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Report a Safety Concern</Text>
            <Text style={styles.actionDesc}>
              Report reckless driving, vehicle condition, or uncomfortable behavior.
            </Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
        </TouchableOpacity>
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
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark,
    padding: 16,
    borderRadius: radius.lg,
    marginBottom: 20,
    ...shadows.sm,
  },
  bannerIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 204, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    ...typography.subheading,
    color: colors.white,
    marginBottom: 4,
  },
  bannerSubtitle: {
    ...typography.caption,
    color: colors.textOnDarkSecondary,
    lineHeight: 16,
  },
  sectionHeader: {
    marginBottom: 8,
    marginTop: 4,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textTertiary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tripCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
    gap: 8,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tripLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    width: 60,
  },
  tripValue: {
    ...typography.bodySecondary,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  tripValueBadge: {
    ...typography.captionBold,
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
    ...shadows.xs,
  },
  emergencyCard: {
    borderColor: '#FECACA',
    backgroundColor: '#FFF8F8',
  },
  actionIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  actionDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});

export default SafetyToolkitScreen;
