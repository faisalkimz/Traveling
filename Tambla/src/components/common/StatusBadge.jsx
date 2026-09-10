/**
 * StatusBadge — Small rounded pill badge.
 *
 * Used for "Active", "Verified", "Default", "Pending" indicators.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import radius from '../../theme/radius';

const STATUS_THEMES = {
  active: { bg: colors.successLight, text: colors.success },
  verified: { bg: colors.successLight, text: colors.success },
  default: { bg: colors.primaryLight + '40', text: colors.primaryDark },
  pending: { bg: colors.warningLight, text: colors.warning },
  expiring: { bg: colors.warningLight, text: colors.warning },
  rejected: { bg: colors.dangerLight, text: colors.danger },
  cancelled: { bg: colors.dangerLight, text: colors.danger },
  completed: { bg: colors.successLight, text: colors.success },
};

const StatusBadge = ({ status, label, style }) => {
  const displayLabel = label || status;
  const theme = STATUS_THEMES[status?.toLowerCase()] || STATUS_THEMES.active;

  return (
    <View style={[styles.badge, { backgroundColor: theme.bg }, style]}>
      <Text style={[styles.text, { color: theme.text }]}>
        {displayLabel.charAt(0).toUpperCase() + displayLabel.slice(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.badge,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.badge,
    textTransform: 'capitalize',
  },
});

export default StatusBadge;
