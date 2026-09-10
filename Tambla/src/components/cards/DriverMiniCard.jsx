/**
 * DriverMiniCard — Compact driver info card.
 *
 * Matches reference: photo, name, rating, vehicle info.
 * Used in Track Driver and Trip In Progress screens.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import ProfileAvatar from '../common/ProfileAvatar';
import { formatRating } from '../../utils/helpers';

const DriverMiniCard = ({ driver, showVehicle = true, compact = false, style }) => {
  if (!driver) return null;

  return (
    <View style={[styles.container, compact && styles.compact, style]}>
      <ProfileAvatar
        name={driver.fullName}
        imageUri={driver.avatar}
        size={compact ? 40 : 48}
      />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {driver.fullName}
        </Text>
        <View style={styles.ratingRow}>
          <Icon name="star" size={14} color={colors.starFilled} />
          <Text style={styles.rating}>{formatRating(driver.rating)}</Text>
          {showVehicle && driver.vehicle && (
            <Text style={styles.vehicle} numberOfLines={1}>
               • {driver.vehicle.make} {driver.vehicle.model} — {driver.vehicle.plate}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.cardPadding,
  },
  compact: {
    padding: spacing.md,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  rating: {
    ...typography.secondary,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  vehicle: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
});

export default DriverMiniCard;
