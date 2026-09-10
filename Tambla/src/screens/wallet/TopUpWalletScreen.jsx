/**
 * TopUpWalletScreen — Add Funds to Tambla Wallet
 *
 * Presets (UGX 5k, 10k, 20k, 50k), mobile money sources (MTN/Airtel/Card),
 * and instant wallet top-up flow.
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
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const PRESET_AMOUNTS = [5000, 10000, 20000, 50000];

const PAYMENT_SOURCES = [
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    number: '0772 123 456',
    icon: 'phone-portrait-outline',
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
    number: '0752 987 654',
    icon: 'phone-portrait-outline',
  },
  {
    id: 'card',
    name: 'Visa / Mastercard',
    number: 'Card ending in 4242',
    icon: 'card-outline',
  },
];

const TopUpWalletScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('20000');
  const [selectedSource, setSelectedSource] = useState('mtn');

  const handleTopUp = () => {
    const num = parseInt(amount, 10) || 0;
    if (num < 1000) {
      Alert.alert('Invalid Amount', 'Minimum top-up is UGX 1,000.');
      return;
    }

    const source = PAYMENT_SOURCES.find((s) => s.id === selectedSource);
    Alert.alert(
      'Mobile Money Prompt Sent',
      `A prompt has been sent to your phone (${source.number}) to approve UGX ${num.toLocaleString()}.\nEnter your PIN to complete the top-up.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Top Up Wallet" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Reminder */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>CURRENT WALLET BALANCE</Text>
          <Text style={styles.balanceValue}>UGX 45,000</Text>
        </View>

        {/* Amount Input */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ENTER AMOUNT</Text>
          <View style={styles.amountInputRow}>
            <Text style={styles.currency}>UGX</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          {/* Presets */}
          <View style={styles.presetsRow}>
            {PRESET_AMOUNTS.map((val) => (
              <TouchableOpacity
                key={val}
                style={[
                  styles.presetBtn,
                  amount === val.toString() && styles.presetBtnSelected,
                ]}
                onPress={() => setAmount(val.toString())}
              >
                <Text
                  style={[
                    styles.presetText,
                    amount === val.toString() && styles.presetTextSelected,
                  ]}
                >
                  UGX {(val / 1000).toFixed(0)}k
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Source Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>TOP UP FROM</Text>
          {PAYMENT_SOURCES.map((source) => {
            const isSelected = selectedSource === source.id;
            return (
              <TouchableOpacity
                key={source.id}
                style={[styles.sourceRow, isSelected && styles.sourceRowSelected]}
                onPress={() => setSelectedSource(source.id)}
                activeOpacity={0.8}
              >
                <View style={styles.sourceRadio}>
                  {isSelected && <View style={styles.sourceRadioDot} />}
                </View>
                <View style={styles.sourceInfo}>
                  <Text style={styles.sourceName}>{source.name}</Text>
                  <Text style={styles.sourceNum}>{source.number}</Text>
                </View>
                <Icon name={source.icon} size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.ctaWrapper}>
          <TamblaButton
            title="Authorize Top-Up"
            variant="primary"
            onPress={handleTopUp}
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
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 20,
    ...shadows.sm,
  },
  balanceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textOnDarkSecondary,
    letterSpacing: 0.5,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 10,
  },
  currency: {
    ...typography.subheading,
    color: colors.textSecondary,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    ...typography.heading,
    color: colors.textPrimary,
  },
  presetsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  presetBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  presetBtnSelected: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  presetText: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  presetTextSelected: {
    color: colors.white,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },
  sourceRowSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFFDF5',
  },
  sourceRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.borderDarker,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sourceRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  sourceInfo: {
    flex: 1,
  },
  sourceName: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sourceNum: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ctaWrapper: {
    marginTop: 10,
  },
});

export default TopUpWalletScreen;
