/**
 * SkeletonLoader — Smooth animated pulse skeleton loader.
 *
 * Built with pure React Native Animated API for 100% Expo Go & native compatibility.
 */
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import radius from '../../theme/radius';

export const SkeletonLoader = ({
  width = '100%',
  height = 20,
  borderRadius = 6,
  style,
}) => {
  const opacityAnim = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.85,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.35,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacityAnim]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity: opacityAnim,
        },
        style,
      ]}
    />
  );
};

/**
 * TripCardSkeleton — Simulates an Uber-style trip card.
 */
export const TripCardSkeleton = () => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <SkeletonLoader width={40} height={40} borderRadius={12} />
        <View style={{ gap: 6 }}>
          <SkeletonLoader width={140} height={15} borderRadius={4} />
          <SkeletonLoader width={90} height={12} borderRadius={4} />
        </View>
      </View>
      <SkeletonLoader width={65} height={18} borderRadius={4} />
    </View>
    <View style={styles.routeBox}>
      <SkeletonLoader width="80%" height={12} borderRadius={4} />
      <SkeletonLoader width="65%" height={12} borderRadius={4} style={{ marginTop: 6 }} />
    </View>
    <View style={styles.cardFooter}>
      <SkeletonLoader width={80} height={20} borderRadius={10} />
      <SkeletonLoader width={70} height={26} borderRadius={radius.pill} />
    </View>
  </View>
);

/**
 * WalletSkeleton — Simulates the Uber Cash / Tambula Wallet balance & payment methods.
 */
export const WalletSkeleton = () => (
  <View style={{ paddingHorizontal: 16 }}>
    {/* Hero Card Skeleton */}
    <View style={[styles.card, { backgroundColor: '#F8F9FA', height: 160, justifyContent: 'space-between' }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <SkeletonLoader width={110} height={16} borderRadius={4} />
        <SkeletonLoader width={24} height={24} borderRadius={12} />
      </View>
      <SkeletonLoader width={180} height={32} borderRadius={6} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <SkeletonLoader width={90} height={32} borderRadius={8} />
        <SkeletonLoader width={90} height={32} borderRadius={8} />
      </View>
    </View>

    {/* Quick Chips Skeleton */}
    <View style={{ flexDirection: 'row', gap: 8, marginVertical: 14 }}>
      <SkeletonLoader width={85} height={34} borderRadius={radius.pill} />
      <SkeletonLoader width={85} height={34} borderRadius={radius.pill} />
      <SkeletonLoader width={85} height={34} borderRadius={radius.pill} />
    </View>

    {/* Section header */}
    <SkeletonLoader width={140} height={18} borderRadius={4} style={{ marginVertical: 12 }} />

    {/* Payment method rows */}
    {[1, 2, 3].map((i) => (
      <View key={i} style={styles.row}>
        <SkeletonLoader width={36} height={36} borderRadius={10} />
        <View style={{ flex: 1, marginLeft: 12, gap: 6 }}>
          <SkeletonLoader width="60%" height={14} borderRadius={4} />
          <SkeletonLoader width="40%" height={11} borderRadius={4} />
        </View>
        <SkeletonLoader width={20} height={20} borderRadius={10} />
      </View>
    ))}
  </View>
);

/**
 * ListItemSkeleton — Generic row with avatar/icon and two lines of text.
 */
export const ListItemSkeleton = () => (
  <View style={styles.row}>
    <SkeletonLoader width={40} height={40} borderRadius={12} />
    <View style={{ flex: 1, marginLeft: 12, gap: 6 }}>
      <SkeletonLoader width="70%" height={15} borderRadius={4} />
      <SkeletonLoader width="45%" height={12} borderRadius={4} />
    </View>
    <SkeletonLoader width={16} height={16} borderRadius={4} />
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E5E7EB',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeBox: {
    backgroundColor: '#F9FAFB',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F0F0F0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
});

export default SkeletonLoader;
