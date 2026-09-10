/**
 * TransactionHistoryScreen — Wallet Activity & Detailed Receipts
 *
 * Filter tabs (All, Rides, Top-Ups, Refunds), transaction records with UGX values,
 * and expandable receipt details.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
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

const TRANSACTIONS = [
  {
    id: 'TX-9901',
    title: 'Ride to Entebbe Airport',
    date: '10 Sep 2026, 09:14 AM',
    amount: '- UGX 55,000',
    isDebit: true,
    category: 'ride',
    method: 'MTN Mobile Money',
    status: 'Completed',
  },
  {
    id: 'TX-9844',
    title: 'Wallet Top-Up via MTN MoMo',
    date: '09 Sep 2026, 04:30 PM',
    amount: '+ UGX 50,000',
    isDebit: false,
    category: 'topup',
    method: 'MTN MoMo (*165#)',
    status: 'Successful',
  },
  {
    id: 'TX-9720',
    title: 'Ride to Acacia Mall',
    date: '08 Sep 2026, 08:20 PM',
    amount: '- UGX 12,000',
    isDebit: true,
    category: 'ride',
    method: 'Tambla Wallet',
    status: 'Completed',
  },
  {
    id: 'TX-9611',
    title: 'Trip Cancellation Refund',
    date: '06 Sep 2026, 02:15 PM',
    amount: '+ UGX 4,000',
    isDebit: false,
    category: 'refund',
    method: 'Tambla Wallet',
    status: 'Refunded',
  },
  {
    id: 'TX-9502',
    title: 'Parcel Delivery to Bugolobi',
    date: '04 Sep 2026, 11:00 AM',
    amount: '- UGX 8,500',
    isDebit: true,
    category: 'ride',
    method: 'Airtel Money',
    status: 'Completed',
  },
];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'ride', label: 'Rides' },
  { id: 'topup', label: 'Top-Ups' },
  { id: 'refund', label: 'Refunds' },
];

const TransactionHistoryScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTx, setSelectedTx] = useState(null);

  const filtered = TRANSACTIONS.filter((tx) => {
    if (activeTab === 'all') return true;
    return tx.category === activeTab;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Transaction History" onBack={() => navigation.goBack()} />

      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        {TABS.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabBtn, isSelected && styles.tabBtnSelected]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((tx) => (
          <TouchableOpacity
            key={tx.id}
            style={styles.txCard}
            onPress={() => setSelectedTx(tx)}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.iconBg,
                { backgroundColor: tx.isDebit ? colors.backgroundSecondary : '#DCFCE7' },
              ]}
            >
              <Icon
                name={tx.isDebit ? 'arrow-up' : 'arrow-down'}
                size={18}
                color={tx.isDebit ? colors.textPrimary : colors.success}
              />
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txTitle}>{tx.title}</Text>
              <Text style={styles.txDate}>{tx.date}</Text>
            </View>
            <View style={styles.amountCol}>
              <Text
                style={[
                  styles.txAmount,
                  { color: tx.isDebit ? colors.textPrimary : colors.success },
                ]}
              >
                {tx.amount}
              </Text>
              <Text style={styles.txMethod}>{tx.method}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Transaction Details Modal */}
      <Modal visible={!!selectedTx} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeading}>Receipt Details</Text>
              <TouchableOpacity onPress={() => setSelectedTx(null)}>
                <Icon name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {selectedTx && (
              <View>
                <View style={styles.receiptAmountRow}>
                  <Text style={styles.receiptAmount}>{selectedTx.amount}</Text>
                  <View style={styles.statusPill}>
                    <Text style={styles.statusPillText}>{selectedTx.status}</Text>
                  </View>
                </View>

                <View style={styles.receiptDivider} />

                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Transaction ID</Text>
                  <Text style={styles.receiptVal}>{selectedTx.id}</Text>
                </View>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Description</Text>
                  <Text style={styles.receiptVal}>{selectedTx.title}</Text>
                </View>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Payment Method</Text>
                  <Text style={styles.receiptVal}>{selectedTx.method}</Text>
                </View>
                <View style={styles.receiptRow}>
                  <Text style={styles.receiptLabel}>Date & Time</Text>
                  <Text style={styles.receiptVal}>{selectedTx.date}</Text>
                </View>

                <View style={{ marginTop: 20 }}>
                  <TamblaButton
                    title="Done"
                    variant="primary"
                    onPress={() => setSelectedTx(null)}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSecondary,
  },
  tabBtnSelected: {
    backgroundColor: colors.dark,
  },
  tabText: {
    ...typography.captionBold,
    color: colors.textSecondary,
  },
  tabTextSelected: {
    color: colors.white,
  },
  content: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 12,
  },
  txCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txInfo: {
    flex: 1,
  },
  txTitle: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  txDate: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  amountCol: {
    alignItems: 'flex-end',
  },
  txAmount: {
    ...typography.bodyBold,
  },
  txMethod: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 20,
    ...shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalHeading: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  receiptAmountRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
  receiptAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statusPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    marginTop: 6,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },
  receiptDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 14,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  receiptLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  receiptVal: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
});

export default TransactionHistoryScreen;
