/**
 * OtpVerifyScreen — 6-Digit SMS Verification
 *
 * OTP input cells, countdown timer for resend, and verification CTA.
 */
import React, { useState, useEffect } from 'react';
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

const OtpVerifyScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const phone = route?.params?.phone || '+256 772 123 456';
  const [code, setCode] = useState('482109');
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleVerify = () => {
    // Verified successfully -> navigate to Passenger main home
    navigation.reset({
      index: 0,
      routes: [{ name: 'Passenger' }],
    });
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
        <Text style={styles.title}>Enter verification code</Text>
        <Text style={styles.subtitle}>
          A 6-digit code was sent via SMS to{' '}
          <Text style={styles.phoneHighlight}>{phone}</Text>
        </Text>

        {/* OTP Input display */}
        <View style={styles.otpContainer}>
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const digit = code[index] || '';
            return (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                  index === code.length ? styles.otpBoxActive : null,
                ]}
              >
                <Text style={styles.otpDigit}>{digit}</Text>
              </View>
            );
          })}
        </View>

        {/* Hidden or direct text input for keyboard */}
        <TextInput
          style={styles.hiddenInput}
          value={code}
          onChangeText={(val) => {
            if (val.length <= 6) setCode(val);
          }}
          keyboardType="numeric"
          maxLength={6}
          autoFocus
        />

        {/* Resend row */}
        <View style={styles.resendRow}>
          {resendTimer > 0 ? (
            <Text style={styles.timerText}>Resend code in {resendTimer}s</Text>
          ) : (
            <TouchableOpacity onPress={() => setResendTimer(30)}>
              <Text style={styles.resendAction}>Resend code</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.btnWrapper}>
          <TamblaButton
            title="Verify & Continue"
            variant="primary"
            disabled={code.length < 4}
            onPress={handleVerify}
          />
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
    marginBottom: 28,
  },
  phoneHighlight: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 46,
    height: 54,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.borderDarker,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxFilled: {
    borderColor: colors.dark,
    backgroundColor: colors.white,
  },
  otpBoxActive: {
    borderColor: colors.primary,
  },
  otpDigit: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  resendRow: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    ...typography.caption,
    color: colors.textTertiary,
  },
  resendAction: {
    ...typography.captionBold,
    color: colors.primaryDark,
  },
  btnWrapper: {
    marginBottom: 20,
  },
});

export default OtpVerifyScreen;
