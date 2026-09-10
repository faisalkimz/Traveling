/**
 * TripCompletedScreen — Trip arrival confirmation.
 */
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import TamblaButton from '../../components/common/TamblaButton';
import LocationRow from '../../components/common/LocationRow';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import { formatUGX } from '../../utils/helpers';

const TripCompletedScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Success icon */}
      <View style={styles.successSection}>
        <View style={styles.checkCircle}>
          <Icon name="checkmark" size={32} color={colors.white} />
        </View>
        <Text style={styles.title}>You've arrived!</Text>
        <Text style={styles.subtitle}>Trip completed successfully</Text>
      </View>

      {/* Fare */}
      <View style={styles.fareCard}>
        <Text style={styles.fareLabel}>Amount</Text>
        <Text style={styles.fareAmount}>{formatUGX(12000)}</Text>
        <Text style={styles.paymentMethod}>Paid with MTN Mobile Money</Text>
      </View>

      {/* Trip details */}
      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Distance</Text>
          <Text style={styles.detailValue}>6.2 km</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Duration</Text>
          <Text style={styles.detailValue}>18 min</Text>
        </View>
        <View style={styles.divider} />
        <LocationRow type="pickup" label="From" address="Ntinda, Kampala" />
        <LocationRow type="destination" label="To" address="Kampala City Centre" />
      </View>

      {/* CTA */}
      <View style={styles.ctaArea}>
        <TamblaButton
          title="Rate your trip"
          onPress={() => navigation.navigate('RateDriver')}
          variant="primary"
          style={styles.primaryBtn}
        />
        <TamblaButton
          title="Done"
          onPress={() => navigation.popToTop()}
          variant="outlined"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white, paddingHorizontal: spacing.screenHorizontal },
  successSection: { alignItems: 'center', marginBottom: 28 },
  checkCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: colors.success, alignItems: 'center',
    justifyContent: 'center', marginBottom: 16,
  },
  title: { ...typography.title, color: colors.textPrimary },
  subtitle: { ...typography.secondary, color: colors.textSecondary, marginTop: 4 },
  fareCard: {
    alignItems: 'center', paddingVertical: 20,
    borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border,
    marginBottom: 16,
  },
  fareLabel: { ...typography.caption, color: colors.textSecondary },
  fareAmount: { ...typography.monetary, color: colors.textPrimary, marginTop: 4 },
  paymentMethod: { ...typography.caption, color: colors.textSecondary, marginTop: 4 },
  detailsCard: { marginBottom: 24 },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 10,
  },
  detailLabel: { ...typography.body, color: colors.textSecondary },
  detailValue: { ...typography.body, color: colors.textPrimary, fontWeight: '500' },
  divider: {
    height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginVertical: 8,
  },
  ctaArea: { marginTop: 'auto' },
  primaryBtn: { marginBottom: 10 },
});

export default TripCompletedScreen;
