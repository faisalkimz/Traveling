/**
 * SearchingDriverScreen — Searching for driver state.
 *
 * Map with subtle search animation, selected ride info, cancel option.
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import { formatUGX } from '../../utils/helpers';

const SearchingDriverScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  // Auto-navigate to driver found after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('DriverFound');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Map area */}
      <View style={[styles.mapArea, { paddingTop: insets.top }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Search indicator */}
        <View style={styles.searchCenter}>
          <Animated.View style={[styles.searchPulse, { transform: [{ scale: pulseAnim }] }]} />
          <View style={styles.searchDot} />
        </View>
      </View>

      {/* Bottom info */}
      <View style={[styles.bottomSheet, shadows.bottomSheet]}>
        <View style={styles.dragHandle} />

        <Text style={styles.searchTitle}>Finding your driver...</Text>
        <Text style={styles.searchSubtitle}>This usually takes less than a minute</Text>

        <View style={styles.rideInfo}>
          <View style={styles.rideDetail}>
            <Text style={styles.rideLabel}>Tambula Standard</Text>
            <Text style={styles.rideValue}>{formatUGX(12000)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.routeInfo}>
            <View style={styles.routeRow}>
              <View style={[styles.dot, { backgroundColor: colors.success }]} />
              <Text style={styles.routeText} numberOfLines={1}>Ntinda, Kampala</Text>
            </View>
            <View style={styles.routeRow}>
              <View style={[styles.dot, { backgroundColor: colors.danger }]} />
              <Text style={styles.routeText} numberOfLines={1}>Kampala City Centre</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelText}>Cancel Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8E4D8' },
  mapArea: { flex: 1 },
  backBtn: {
    position: 'absolute', top: 50, left: 16, width: 40, height: 40,
    borderRadius: 20, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', zIndex: 10, ...shadows.md,
  },
  searchCenter: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
  searchPulse: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.primary, opacity: 0.15,
    position: 'absolute',
  },
  searchDot: {
    width: 16, height: 16, borderRadius: 8, backgroundColor: colors.primary,
  },
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.bottomSheet,
    borderTopRightRadius: radius.bottomSheet,
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: 24,
  },
  dragHandle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: colors.border, alignSelf: 'center',
    marginTop: 10, marginBottom: 16,
  },
  searchTitle: {
    ...typography.heading, color: colors.textPrimary, textAlign: 'center',
  },
  searchSubtitle: {
    ...typography.secondary, color: colors.textSecondary,
    textAlign: 'center', marginTop: 4, marginBottom: 16,
  },
  rideInfo: {
    backgroundColor: colors.offWhite, borderRadius: radius.card, padding: 14,
    marginBottom: 16,
  },
  rideDetail: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  rideLabel: { ...typography.subheading, color: colors.textPrimary },
  rideValue: { ...typography.subheading, color: colors.textPrimary },
  divider: {
    height: StyleSheet.hairlineWidth, backgroundColor: colors.border, marginBottom: 10,
  },
  routeInfo: { gap: 8 },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  routeText: { ...typography.bodySmall, color: colors.textPrimary, flex: 1 },
  cancelBtn: {
    alignItems: 'center', paddingVertical: 14,
  },
  cancelText: { ...typography.buttonSmall, color: colors.danger },
});

export default SearchingDriverScreen;
