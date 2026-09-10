/**
 * EarningsCard — Driver earnings summary card.
 *
 * Matches reference: yellow-accent card with earnings amount, trip count, and action.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import { formatUGX } from '../../utils/helpers';

const EarningsCard = ({ label, amount, trips, onPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.amount}>{formatUGX(amount)}</Text>
      <Text style={styles.trips}>{trips} trips</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress} style={styles.action}>
          <Text style={styles.actionText}>View details</Text>
          <Icon name="chevron-forward" size={14} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkCard,
    borderRadius: radius.card,
    padding: spacing.cardPadding,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  label: {
    ...typography.caption,
    color: colors.textOnDarkSecondary,
    marginBottom: 4,
  },
  amount: {
    ...typography.monetary,
    color: colors.textOnDark,
  },
  trips: {
    ...typography.secondary,
    color: colors.textOnDarkSecondary,
    marginTop: 2,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  actionText: {
    ...typography.buttonSmall,
    color: colors.primary,
    marginRight: 4,
  },
});

export default EarningsCard;
