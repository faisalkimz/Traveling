/**
 * ScreenHeader — Standard screen title header.
 *
 * Used for white-background screens like Wallet, Profile, Earnings.
 * Optional back button and right action.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';

const ScreenHeader = ({
  title,
  onBack,
  rightAction,
  rightLabel,
  onRightPress,
  dark = false,
  transparent = false,
}) => {
  const insets = useSafeAreaInsets();
  const bgColor = dark ? colors.dark : transparent ? 'transparent' : colors.white;
  const textColor = dark ? colors.textOnDark : colors.textPrimary;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, backgroundColor: bgColor }]}>
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Icon name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {title}
        </Text>

        {onRightPress ? (
          <TouchableOpacity onPress={onRightPress} style={styles.rightAction}>
            {rightAction || (
              <Text style={[styles.rightLabel, { color: colors.primary }]}>{rightLabel}</Text>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: spacing.screenHorizontal,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  backButton: {
    width: 40,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backPlaceholder: {
    width: 40,
  },
  title: {
    ...typography.title,
    flex: 1,
    textAlign: 'center',
  },
  rightAction: {
    width: 40,
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightLabel: {
    ...typography.buttonSmall,
  },
});

export default ScreenHeader;
