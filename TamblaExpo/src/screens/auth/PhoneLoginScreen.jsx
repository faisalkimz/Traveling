/**
 * PhoneLoginScreen — Uganda Phone Number Authentication
 *
 * Defaults to Uganda prefix +256 with phone input, network badge,
 * terms notice, and Continue button.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const PhoneLoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState('772 123 456');

  const handleContinue = () => {
    if (phoneNumber.trim().length < 9) {
      return;
    }
    navigation.navigate('OtpVerify', { phone: `+256 ${phoneNumber}` });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your phone number</Text>
        <Text style={styles.subtitle}>
          We will send a 6-digit verification code to confirm your account.
        </Text>

        {/* Phone Input with +256 */}
        <View style={styles.inputRow}>
          <View style={styles.countryCodeBadge}>
            <Text style={styles.flagEmoji}>🇺🇬</Text>
            <Text style={styles.countryCode}>+256</Text>
          </View>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholder="7XX XXX XXX"
            placeholderTextColor={colors.textTertiary}
            autoFocus
          />
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to the{' '}
          <Text style={styles.termsLink}>Tambla Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>

        <View style={styles.btnWrapper}>
          <TamblaButton
            title="Continue"
            variant="primary"
            onPress={handleContinue}
          />
        </View>

        {/* Switch Role Option */}
        <View style={styles.roleSwitch}>
          <Text style={styles.roleSwitchText}>Want to drive with Tambla?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Driver')}>
            <Text style={styles.roleSwitchLink}>Open Driver Mode</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 16,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderDarker,
    borderRadius: radius.md,
    height: 56,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: colors.white,
  },
  countryCodeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 12,
    borderRightWidth: 1,
    borderColor: colors.border,
    marginRight: 12,
  },
  flagEmoji: {
    fontSize: 18,
  },
  countryCode: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  input: {
    flex: 1,
    ...typography.subheading,
    color: colors.textPrimary,
  },
  termsText: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 24,
  },
  termsLink: {
    color: colors.textPrimary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  btnWrapper: {
    marginBottom: 20,
  },
  roleSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 'auto',
    marginBottom: 24,
  },
  roleSwitchText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  roleSwitchLink: {
    ...typography.captionBold,
    color: colors.primaryDark,
  },
});

export default PhoneLoginScreen;
