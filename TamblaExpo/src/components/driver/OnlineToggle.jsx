/**
 * OnlineToggle — Driver online/offline switch.
 *
 * Matches reference: green toggle with "Online" label.
 */
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import typography from '../../theme/typography';

const OnlineToggle = ({ isOnline, onToggle, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, isOnline ? styles.labelOnline : styles.labelOffline]}>
        {isOnline ? 'Online' : 'Offline'}
      </Text>
      <Switch
        value={isOnline}
        onValueChange={onToggle}
        trackColor={{ false: '#555', true: colors.onlineGreen }}
        thumbColor={colors.white}
        ios_backgroundColor="#555"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.subheading,
    marginRight: 10,
  },
  labelOnline: {
    color: colors.onlineGreen,
  },
  labelOffline: {
    color: colors.textOnDarkSecondary,
  },
});

export default OnlineToggle;
