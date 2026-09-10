/**
 * LocationRow — Pickup/destination row with colored dot indicator.
 *
 * Used in Trip In Progress and ride detail views.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';

const LocationRow = ({ type = 'pickup', label, address, style }) => {
  const dotColor = type === 'pickup' ? colors.success : type === 'destination' ? colors.danger : colors.primary;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.dotColumn}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        {type === 'pickup' && <View style={styles.connector} />}
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{label || (type === 'pickup' ? 'From' : 'To')}</Text>
        <Text style={styles.address} numberOfLines={1}>{address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 6,
  },
  dotColumn: {
    width: 24,
    alignItems: 'center',
    paddingTop: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  connector: {
    width: 2,
    height: 20,
    backgroundColor: colors.border,
    marginTop: 4,
  },
  content: {
    flex: 1,
    marginLeft: 8,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  address: {
    ...typography.body,
    color: colors.textPrimary,
    marginTop: 1,
  },
});

export default LocationRow;
