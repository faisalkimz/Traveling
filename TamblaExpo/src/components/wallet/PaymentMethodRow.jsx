/**
 * PaymentMethodRow — Payment method list item.
 *
 * Matches reference: icon, label, detail, optional "Default" badge.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import StatusBadge from '../common/StatusBadge';

const PAYMENT_ICONS = {
  mobile_money: 'phone-portrait-outline',
  cash: 'cash-outline',
  wallet: 'wallet-outline',
  card: 'card-outline',
  bank: 'business-outline',
};

const PaymentMethodRow = ({
  type,
  label,
  detail,
  isDefault = false,
  selected = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected, style]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={styles.iconContainer}>
        <Icon
          name={PAYMENT_ICONS[type] || 'ellipse-outline'}
          size={20}
          color={colors.textPrimary}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        {detail && <Text style={styles.detail}>{detail}</Text>}
      </View>

      {isDefault && <StatusBadge status="default" label="Default" />}

      {selected && (
        <Icon name="checkmark-circle" size={22} color={colors.success} style={{ marginLeft: 8 }} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.screenHorizontal,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  selected: {
    backgroundColor: colors.offWhite,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
  },
  detail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
});

export default PaymentMethodRow;
