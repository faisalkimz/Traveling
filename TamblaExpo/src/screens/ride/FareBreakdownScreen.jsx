/**
 * FareBreakdownScreen — Detailed fare breakdown.
 */
import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import ScreenHeader from '../../components/common/ScreenHeader';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import { formatUGX } from '../../utils/helpers';

const BREAKDOWN = [
  { label: 'Base fare', amount: 3000 },
  { label: 'Distance (6.2 km)', amount: 6200 },
  { label: 'Estimated duration (18 min)', amount: 1800 },
  { label: 'Booking fee', amount: 1000 },
  { label: 'Discount', amount: 0 },
];

const FareBreakdownScreen = ({ navigation }) => {
  const total = BREAKDOWN.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Fare Breakdown" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        {BREAKDOWN.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.amount}>
              {item.amount === 0 ? '—' : formatUGX(item.amount)}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{formatUGX(total)}</Text>
        </View>

        <Text style={styles.note}>
          Final fare may vary based on actual route and traffic conditions.
        </Text>
      </ScrollView>

      <View style={styles.cta}>
        <TamblaButton title="Continue" onPress={() => navigation.goBack()} variant="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: spacing.screenHorizontal, paddingTop: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: { ...typography.body, color: colors.textPrimary },
  amount: { ...typography.body, color: colors.textPrimary, fontWeight: '500' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 4 },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  totalLabel: { ...typography.heading, color: colors.textPrimary },
  totalAmount: { ...typography.monetary, color: colors.textPrimary },
  note: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
  cta: { paddingHorizontal: spacing.screenHorizontal, paddingBottom: 24 },
});

export default FareBreakdownScreen;
