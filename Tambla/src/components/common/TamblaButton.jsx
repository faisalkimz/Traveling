/**
 * TamblaButton — Primary and secondary button component.
 *
 * Matches reference: full-width, 50px height, 10px radius.
 * Yellow primary, outlined/dark secondary.
 */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import radius from '../../theme/radius';

const TamblaButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outlined' | 'danger' | 'dark'
  size = 'large', // 'large' | 'medium' | 'small'
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.textPrimary : colors.white}
        />
      ) : (
        <>
          {icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.button,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.textPrimary,
  },
  outlined: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  dark: {
    backgroundColor: colors.dark,
  },

  // Sizes
  size_large: {
    height: 50,
    paddingHorizontal: 24,
  },
  size_medium: {
    height: 44,
    paddingHorizontal: 20,
  },
  size_small: {
    height: 36,
    paddingHorizontal: 16,
  },

  // Disabled
  disabled: {
    opacity: 0.5,
  },

  // Text
  text: {
    ...typography.button,
  },
  text_primary: {
    color: colors.textPrimary,
  },
  text_secondary: {
    color: colors.textPrimary,
  },
  text_outlined: {
    color: colors.textPrimary,
  },
  text_danger: {
    color: colors.white,
  },
  text_dark: {
    color: colors.white,
  },

  // Text sizes
  textSize_large: {
    fontSize: 16,
  },
  textSize_medium: {
    fontSize: 15,
  },
  textSize_small: {
    fontSize: 13,
  },

  textDisabled: {
    opacity: 0.7,
  },
});

export default TamblaButton;
