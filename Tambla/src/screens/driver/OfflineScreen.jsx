/**
 * OfflineScreen — Golden Reference #10
 *
 * Dark background, WiFi/car icon, offline message, Go Online / Keep Offline buttons.
 */
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';

const OfflineScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Offline Mode</Text>
      </View>

      {/* Center content */}
      <View style={styles.center}>
        <View style={styles.iconContainer}>
          <Icon name="wifi-outline" size={48} color={colors.primary} />
          <View style={styles.carIconOverlay}>
            <Icon name="car" size={24} color={colors.textOnDarkSecondary} />
          </View>
        </View>

        <Text style={styles.title}>You're offline</Text>
        <Text style={styles.description}>
          You can still accept nearby{'\n'}rides and your location will be{'\n'}saved. Once you're back online,{'\n'}trips will be updated.
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TamblaButton
          title="Go Online"
          onPress={() => navigation.goBack()}
          variant="primary"
          style={styles.goOnlineBtn}
        />
        <TamblaButton
          title="Keep Offline"
          onPress={() => navigation.goBack()}
          variant="outlined"
          style={styles.keepOfflineBtn}
          textStyle={styles.keepOfflineText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    paddingHorizontal: spacing.xl,
  },

  header: {
    alignItems: 'flex-end',
    paddingTop: 8,
  },
  headerTitle: {
    ...typography.secondary,
    color: colors.textOnDarkSecondary,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.darkCard,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  carIconOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  title: {
    ...typography.title,
    color: colors.textOnDark,
    marginBottom: 12,
  },
  description: {
    ...typography.body,
    color: colors.textOnDarkSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  actions: {
    width: '100%',
  },
  goOnlineBtn: {
    marginBottom: 12,
  },
  keepOfflineBtn: {
    borderColor: colors.textOnDarkSecondary,
  },
  keepOfflineText: {
    color: colors.textOnDark,
  },
});

export default OfflineScreen;
