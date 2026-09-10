/**
 * WithdrawFundsScreen — Driver Wallet Cashout
 *
 * Withdraw earnings to MTN Mobile Money, Airtel Money, or Stanbic Bank,
 * with quick amount chips, balance validation, and instant confirmation.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
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

const QUICK_AMOUNTS = [50000, 100000, 200000, 384500];

const WITHDRAW_METHODS = [
  {
    id: 'mtn',
    title: 'MTN Mobile Money',
    number: '0772 123 456 (Musa Ssebufu)',
    icon: 'phone-portrait-outline',
    badge: 'Instant',
  },
  {
    id: 'airtel',
    title: 'Airtel Money',
    number: '0752 987 654 (Musa Ssebufu)',
    icon: 'phone-portrait-outline',
    badge: 'Instant',
  },
  {
    id: 'bank',
    title: 'Stanbic Bank Uganda',
    number: 'Acct ending in 9812',
    icon: 'business-outline',
    badge: '2-4 hrs',
  },
];

const WithdrawFundsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const availableBalance = 384500;
  const [selectedMethod, setSelectedMethod] = useState('mtn');
  const [amount, setAmount] = useState('100000');

  const handleWithdraw = () => {
    const numAmount = parseInt(amount, 10) || 0;
    if (numAmount < 5000) {
      Alert.alert('Invalid Amount', 'Minimum withdrawal amount is UGX 5,000.');
      return;
    }
    if (numAmount > availableBalance) {
      Alert.alert('Insufficient Balance', 'You cannot withdraw more than your available balance.');
      return;
    }

    const method = WITHDRAW_METHODS.find((m) => m.id === selectedMethod);
    Alert.alert(
      'Withdrawal Initiated!',
      `UGX ${numAmount.toLocaleString()} will be sent to your ${method.title} (${method.number}).\nYou will receive an SMS confirmation shortly.`,
      [
        {
          text: 'Done',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Withdraw Earnings" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>AVAILABLE FOR CASHOUT</Text>
          <Text style={styles.balanceAmount}>UGX {availableBalance.toLocaleString()}</Text>
          <Text style={styles.balanceHint}>No hold period • Ready to disburse</Text>
        </View>

        {/* Withdrawal Method */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SELECT DESTINATION</Text>
        </View>

        {WITHDRAW_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <TouchableOpacity
              key={method.id}
              style={[styles.methodCard, isSelected && styles.methodCardSelected]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.8}
            >
              <View style={styles.methodRadio}>
                {isSelected && <View style={styles.radioDot} />}
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodNumber}>{method.number}</Text>
              </View>
              <View style={styles.speedBadge}>
                <Text style={styles.speedText}>{method.badge}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Amount Input */}
        <View style={styles.amountSection}>
          <Text style={styles.sectionTitle}>WITHDRAWAL AMOUNT</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencyPrefix}>UGX</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          {/* Quick Amount Chips */}
          <View style={styles.chipsRow}>
            {QUICK_AMOUNTS.map((val) => (
              <TouchableOpacity
                key={val}
                style={[
                  styles.chip,
                  amount === val.toString() && styles.chipSelected,
                ]}
                onPress={() => setAmount(val.toString())}
              >
                <Text
                  style={[
                    styles.chipText,
                    amount === val.toString() && styles.chipTextSelected,
                  ]}
                >
                  {val === availableBalance ? 'All' : `UGX ${(val / 1000).toFixed(0)}k`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaWrapper}>
          <TamblaButton
            title="Confirm Withdrawal"
            variant="primary"
            onPress={handleWithdraw}
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
  balanceCard: {
    backgroundColor: colors.dark,
    borderRadius: radius.lg,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    ...shadows.sm,
  },
  balanceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textOnDarkSecondary,
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginVertical: 4,
  },
  balanceHint: {
    ...typography.caption,
    color: colors.textOnDarkSecondary,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textTertiary,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  methodCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFFDF5',
  },
  methodRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.borderDarker,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  methodNumber: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  speedBadge: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
  },
  speedText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  amountSection: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 12,
  },
  currencyPrefix: {
    ...typography.subheading,
    color: colors.textSecondary,
    marginRight: 8,
  },
  input: {
    flex: 1,
    ...typography.heading,
    color: colors.textPrimary,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  chipText: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  chipTextSelected: {
    color: colors.white,
  },
  ctaWrapper: {
    marginTop: 4,
  },
});

export default WithdrawFundsScreen;
