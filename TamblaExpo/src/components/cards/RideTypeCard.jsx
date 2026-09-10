/**
 * RideTypeCard — Ride option selector card.
 *
 * Matches reference: vehicle icon, name, capacity, ETA, price.
 * Used in Request Ride screen bottom sheet.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import { formatUGX } from '../../utils/helpers';

const RIDE_ICONS = {
  standard: 'car-outline',
  xl: 'car-sport-outline',
  moto: 'bicycle-outline',
  premium: 'car-outline',
};

const RideTypeCard = ({
  name,
  type = 'standard',
  seats,
  eta,
  price,
  description,
  selected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${seats} seats, ${eta}, ${formatUGX(price)}`}
    >
      <View style={styles.iconContainer}>
        <Icon
          name={RIDE_ICONS[type] || 'car-outline'}
          size={28}
          color={selected ? colors.primary : colors.textPrimary}
        />
      </View>

      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.eta}>{eta}</Text>
        </View>
        <Text style={styles.detail}>
          {seats} seats • {description}
        </Text>
      </View>

      <Text style={[styles.price, selected && styles.priceSelected]}>
        {formatUGX(price)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: spacing.screenHorizontal,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  selected: {
    backgroundColor: colors.offWhite,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  eta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  detail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  price: {
    ...typography.subheading,
    color: colors.textPrimary,
    minWidth: 70,
    textAlign: 'right',
  },
  priceSelected: {
    color: colors.primary,
  },
});

export default RideTypeCard;
