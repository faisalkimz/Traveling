/**
 * SettingRow — Tappable list row for profile/settings menus.
 *
 * Matches reference: icon, label, optional detail/badge, chevron.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import StatusBadge from '../common/StatusBadge';

const SettingRow = ({
  icon,
  iconColor,
  label,
  detail,
  badge,
  badgeStatus,
  onPress,
  showChevron = true,
  danger = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.6}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {icon && (
        <View style={[styles.iconContainer, danger && styles.iconContainerDanger]}>
          <Icon
            name={icon}
            size={20}
            color={iconColor || (danger ? colors.danger : colors.textSecondary)}
          />
        </View>
      )}

      <View style={styles.content}>
        <Text style={[styles.label, danger && styles.labelDanger]} numberOfLines={1}>
          {label}
        </Text>
        {detail && (
          <Text style={styles.detail} numberOfLines={1}>
            {detail}
          </Text>
        )}
      </View>

      {badge && <StatusBadge status={badgeStatus || 'active'} label={badge} />}

      {showChevron && !danger && (
        <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
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
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconContainerDanger: {
    backgroundColor: colors.dangerLight,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
  },
  labelDanger: {
    color: colors.danger,
  },
  detail: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default SettingRow;
