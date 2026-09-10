/**
 * WalletScreen — Uber Cash-inspired Tambula Financial Hub.
 *
 * Features:
 * - Brand hero balance card with balance privacy toggle and quick action buttons
 * - 1-Tap Quick Top-Up chips (+10k, +25k, +50k, +100k)
 * - Saved payment methods with carrier branding (MTN MoMo, Airtel, Bank, Visa)
 * - Recent transaction statement preview with credit/debit indicators
 * - Animated Skeleton Loading state on pull-to-refresh
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import WalletCard from '../../components/wallet/WalletCard';
import PaymentMethodRow from '../../components/wallet/PaymentMethodRow';
import { WalletSkeleton } from '../../components/common/SkeletonLoader';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import mockPayments from '../../data/mockPayments';
import { formatUGX } from '../../utils/helpers';

const QUICK_AMOUNTS = [10000, 25000, 50000, 100000];

const WalletScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [balance, setBalance] = useState(mockPayments.walletBalance || 45000);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 750);
  };

  const handleQuickTopUp = (amount) => {
    navigation.navigate('TopUpWallet', { initialAmount: amount });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader
        title="Wallet & Payments"
        rightIcon="time-outline"
        onRightPress={() => navigation.navigate('TransactionHistory')}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primaryDark]}
            tintColor={colors.primaryDark}
          />
        }
      >
        {refreshing ? (
          <View style={{ paddingTop: 8 }}>
            <WalletSkeleton />
          </View>
        ) : (
          <>
            {/* Hero Balance Card */}
            <View style={styles.balanceSection}>
              <WalletCard
                balance={balance}
                onTopUp={() => navigation.navigate('TopUpWallet')}
                onPaymentMethods={() => navigation.navigate('ChoosePayment')}
              />
            </View>

            {/* 1-Tap Quick Top-Up Chips */}
            <View style={styles.quickChipsWrapper}>
              <Text style={styles.quickTopUpLabel}>QUICK TOP-UP</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickChipsContent}
              >
                {QUICK_AMOUNTS.map((amt) => (
                  <TouchableOpacity
                    key={amt}
                    style={styles.quickChip}
                    activeOpacity={0.7}
                    onPress={() => handleQuickTopUp(amt)}
                  >
                    <Icon name="add" size={12} color={colors.dark} style={{ marginRight: 2 }} />
                    <Text style={styles.quickChipText}>+{formatUGX(amt)}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Promo / Auto-Reload Perk Banner (Uber style) */}
            <View style={styles.perksBanner}>
              <View style={styles.perkIconBox}>
                <Icon name="shield-checkmark" size={22} color="#15803D" />
              </View>
              <View style={styles.perkTextCol}>
                <Text style={styles.perkTitle}>Instant MoMo Auto-Refill</Text>
                <Text style={styles.perkSub}>
                  Never get stuck without fare. Automatic top-up when balance is low.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('TopUpWallet')}
                style={styles.perkActionBtn}
              >
                <Text style={styles.perkActionText}>Set Up</Text>
              </TouchableOpacity>
            </View>

            {/* Payment Methods Section Header */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ChoosePayment')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.addMethodText}>+ Add New</Text>
              </TouchableOpacity>
            </View>

            {/* Saved Payment Methods List */}
            <View style={styles.methodsCard}>
              {mockPayments.methods
                .filter((m) => m.type === 'mobile_money' || m.type === 'card')
                .map((method) => (
                  <PaymentMethodRow
                    key={method.id}
                    type={method.type}
                    label={method.label}
                    detail={method.phone || method.detail}
                    isDefault={method.isDefault}
                    onPress={() => navigation.navigate('ChoosePayment')}
                  />
                ))}

              <PaymentMethodRow
                type="bank"
                label="Stanbic Bank Uganda"
                detail="Direct account link •••• 4821"
                onPress={() => navigation.navigate('ChoosePayment')}
              />
            </View>

            {/* Recent Transactions Section Header */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('TransactionHistory')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={styles.seeAllText}>See All →</Text>
              </TouchableOpacity>
            </View>

            {/* Mini Transaction Statement Preview */}
            <View style={styles.transactionsCard}>
              {mockPayments.transactions.slice(0, 4).map((tx, idx) => {
                const isCredit = tx.amount > 0;
                let txIcon = 'car-sport-outline';
                let iconBg = '#FEF3C7';
                let iconColor = '#B45309';

                if (tx.type === 'topup') {
                  txIcon = 'arrow-down-outline';
                  iconBg = '#DCFCE7';
                  iconColor = '#15803D';
                } else if (tx.type === 'refund') {
                  txIcon = 'refresh-outline';
                  iconBg = '#E0E7FF';
                  iconColor = '#4338CA';
                }

                return (
                  <TouchableOpacity
                    key={tx.id}
                    style={[
                      styles.txRow,
                      idx < 3 && styles.txBorderBottom,
                    ]}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('TransactionHistory')}
                  >
                    <View style={[styles.txIconSquircle, { backgroundColor: iconBg }]}>
                      <Icon name={txIcon} size={18} color={iconColor} />
                    </View>

                    <View style={styles.txInfoCol}>
                      <Text style={styles.txTitle} numberOfLines={1}>
                        {tx.description}
                      </Text>
                      <Text style={styles.txMeta}>
                        {tx.date} • {tx.time}
                      </Text>
                    </View>

                    <View style={styles.txAmountCol}>
                      <Text
                        style={[
                          styles.txAmount,
                          isCredit ? styles.txCredit : styles.txDebit,
                        ]}
                      >
                        {isCredit ? `+${formatUGX(tx.amount)}` : `-${formatUGX(Math.abs(tx.amount))}`}
                      </Text>
                      <Text style={styles.txStatusText}>
                        {tx.paymentMethod || 'Completed'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
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
    paddingBottom: 36,
  },
  balanceSection: {
    paddingHorizontal: spacing.screenHorizontal,
    marginTop: 10,
  },
  quickChipsWrapper: {
    marginTop: 14,
  },
  quickTopUpLabel: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 0.6,
    paddingHorizontal: spacing.screenHorizontal,
    marginBottom: 8,
  },
  quickChipsContent: {
    paddingHorizontal: spacing.screenHorizontal,
    gap: 8,
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  quickChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.dark,
  },
  perksBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    marginHorizontal: spacing.screenHorizontal,
    marginTop: 16,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  perkIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  perkTextCol: {
    flex: 1,
  },
  perkTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#15803D',
  },
  perkSub: {
    fontSize: 11,
    color: '#166534',
    opacity: 0.85,
    marginTop: 2,
    lineHeight: 15,
  },
  perkActionBtn: {
    backgroundColor: '#15803D',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    marginLeft: 6,
  },
  perkActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.white,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenHorizontal,
    marginTop: 22,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  addMethodText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  methodsCard: {
    marginHorizontal: spacing.screenHorizontal,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECECEC',
    ...shadows.sm,
  },
  transactionsCard: {
    marginHorizontal: spacing.screenHorizontal,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECECEC',
    ...shadows.sm,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  txBorderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F0F0F0',
  },
  txIconSquircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  txInfoCol: {
    flex: 1,
  },
  txTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  txMeta: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 2,
  },
  txAmountCol: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  txCredit: {
    color: '#15803D',
  },
  txDebit: {
    color: colors.textPrimary,
  },
  txStatusText: {
    fontSize: 10.5,
    color: colors.textTertiary,
    marginTop: 2,
  },
});

export default WalletScreen;
