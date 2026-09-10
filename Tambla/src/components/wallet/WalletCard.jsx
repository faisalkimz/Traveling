/**
 * WalletCard — Uber Cash-inspired Tambula Balance Hero Card.
 *
 * Features:
 * - Brand yellow (#FFCC00) background with high-contrast dark accents
 * - Eye toggle to show/hide balance for privacy
 * - Large monetary typography
 * - Integrated Quick Actions: "+ Add Funds" and "Withdraw"
 */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import { formatUGX } from '../../utils/helpers';

const WalletCard = ({ balance = 45000, onWithdraw, onTopUp, onPaymentMethods, style }) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <View style={[styles.container, style]}>
      {/* Top row: Label + Eye Privacy Toggle */}
      <View style={styles.topRow}>
        <View style={styles.brandBadge}>
          <View style={styles.brandDot} />
          <Text style={styles.brandLabel}>Tambula Cash</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowBalance(!showBalance)}
          style={styles.eyeBtn}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            name={showBalance ? 'eye-outline' : 'eye-off-outline'}
            size={18}
            color={colors.dark}
          />
        </TouchableOpacity>
      </View>

      {/* Hero Monetary Display */}
      <View style={styles.amountSection}>
        <Text style={styles.amountText}>
          {showBalance ? formatUGX(balance) : 'UGX ••••••••'}
        </Text>
        <Text style={styles.balanceSubtitle}>Available for Rides, Boda & Deliveries</Text>
      </View>

      {/* Action Buttons Row */}
      <View style={styles.actionRow}>
        {onTopUp && (
          <TouchableOpacity
            style={styles.topUpBtn}
            onPress={onTopUp}
            activeOpacity={0.8}
          >
            <Icon name="add" size={16} color={colors.white} style={{ marginRight: 4 }} />
            <Text style={styles.topUpBtnText}>Add Funds</Text>
          </TouchableOpacity>
        )}

        {onPaymentMethods && (
          <TouchableOpacity
            style={styles.withdrawBtn}
            onPress={onPaymentMethods}
            activeOpacity={0.8}
          >
            <Icon name="card-outline" size={15} color={colors.dark} style={{ marginRight: 4 }} />
            <Text style={styles.withdrawBtnText}>Manage Methods</Text>
          </TouchableOpacity>
        )}

        {!onPaymentMethods && onWithdraw && (
          <TouchableOpacity
            style={styles.withdrawBtn}
            onPress={onWithdraw}
            activeOpacity={0.8}
          >
            <Icon name="arrow-up-outline" size={15} color={colors.dark} style={{ marginRight: 4 }} />
            <Text style={styles.withdrawBtnText}>Withdraw</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 18,
    ...shadows.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.dark,
    marginRight: 6,
  },
  brandLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.dark,
    letterSpacing: 0.3,
  },
  eyeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountSection: {
    marginBottom: 16,
  },
  amountText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.dark,
    letterSpacing: -0.5,
  },
  balanceSubtitle: {
    fontSize: 11.5,
    color: colors.dark,
    opacity: 0.75,
    marginTop: 3,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topUpBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
    paddingVertical: 10,
    borderRadius: radius.pill,
    ...shadows.sm,
  },
  topUpBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  withdrawBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.07)',
    paddingVertical: 10,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
  },
  withdrawBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.dark,
  },
});

export default WalletCard;
